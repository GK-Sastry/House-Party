from django.urls import path
from .views import RoomView

urlpatterns = [
    path('room',RoomView.as_view())
]
# Importing the `path` function from Django's URL dispatcher, which is used to define URL patterns.
from django.urls import path

# Importing view classes from the current app's views module. 
# These views handle specific actions related to the Room functionality.
from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom, LeaveRoom, UpdateRoom

# Defining URL patterns for the application. Each URL pattern maps a URL to a specific view.
urlpatterns = [
    # Maps the URL 'room' to the RoomView class.
    # `as_view()` converts the class-based view into a callable view function.
    path('room', RoomView.as_view()),
    
    # Maps the URL 'create-room' to the CreateRoomView class.
    # This endpoint handles requests for creating new rooms.
    path('create-room', CreateRoomView.as_view()),
    
    # Maps the URL 'get-room' to the GetRoom class.
    # This endpoint handles requests for retrieving details of a specific room.
    path('get-room', GetRoom.as_view()),
    
    # Maps the URL 'join-room' to the JoinRoom class.
    # This endpoint handles requests for users to join an existing room.
    path('join-room', JoinRoom.as_view()),
    
    # Maps the URL 'user-in-room' to the UserInRoom class.
    # This endpoint checks if a user is currently in a room.
    path('user-in-room', UserInRoom.as_view()),
    
    # Maps the URL 'leave-room' to the LeaveRoom class.
    # This endpoint handles requests for users to leave a room.
    path('leave-room', LeaveRoom.as_view()),
    
    # Maps the URL 'update-room' to the UpdateRoom class.
    # This endpoint handles requests for updating room details.
    path('update-room', UpdateRoom.as_view())
]
