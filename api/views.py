from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# This file defines the views for handling various API requests related to "Room" management.


# View to return a list of all Room objects.
class RoomView(generics.ListAPIView):
    # Fetches all Room objects from the database.
    queryset = Room.objects.all()
    # Specifies the serializer to convert Room objects to JSON.
    serializer_class = RoomSerializer


# View to retrieve information about a specific room by its code.
class GetRoom(APIView):
    # Specifies the serializer to convert Room objects to JSON.
    serializer_class = RoomSerializer
    # Defines the key in the request to look for the room code.
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        # Retrieve the room code from the request parameters.
        code = request.GET.get(self.lookup_url_kwarg)
        if code is not None:
            # Fetch the room with the matching code.
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                # Serialize the first matching room and include whether the user is the host.
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            # If no room is found, return a 404 response.
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        # If no code is provided, return a 400 response.
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)


# View to handle joining a room by its code.
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        # Ensure the user has a session key; create one if it doesn't exist.
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Retrieve the room code from the request data.
        code = request.data.get(self.lookup_url_kwarg)
        if code is not None:
            # Check if a room with the provided code exists.
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                # Store the room code in the session.
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            # If no room is found, return a 400 response.
            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        # If no code is provided, return a 400 response.
        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


# View to handle creating or updating a room.
class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # Ensure the user has a session key; create one if it doesn't exist.
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Validate the input data using the serializer.
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Retrieve validated data.
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            # Check if a room already exists for this host.
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                # Update the existing room's attributes.
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                # Store the room code in the session.
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                # Create a new room and save it to the database.
                room = Room(
                    host=host,
                    guest_can_pause=guest_can_pause,
                    votes_to_skip=votes_to_skip
                )
                room.save()
                # Store the room code in the session.
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        # If the input data is invalid, return a 400 response.
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


# View to check if a user is currently in a room.
class UserInRoom(APIView):
    def get(self, request, format=None):
        # Ensure the user has a session key; create one if it doesn't exist.
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Return the room code stored in the session, if any.
        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)


# View to handle leaving a room.
class LeaveRoom(APIView):
    def post(self, request, format=None):
        # Remove the room code from the session, if it exists.
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            # Check if the user is the host of any room and delete it if so.
            room_results = Room.objects.filter(host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()

        # Return a success response.
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)


# View to handle updating a room's attributes.
class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        # Ensure the user has a session key; create one if it doesn't exist.
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Validate the input data using the serializer.
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Retrieve validated data.
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            # Check if a room with the given code exists.
            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'msg': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            user_id = self.request.session.session_key
            # Check if the user is the host of the room.
            if room.host != user_id:
                return Response({'msg': 'You are not the host of this room.'}, status=status.HTTP_403_FORBIDDEN)

            # Update the room's attributes and save the changes.
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        # If the input data is invalid, return a 400 response.
        return Response({'Bad Request': "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)
