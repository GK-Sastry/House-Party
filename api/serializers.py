# Importing the 'serializers' module from the Django Rest Framework (DRF),
# which is used to define serializers for converting complex data types
# (like Django models) into JSON and vice versa.
from rest_framework import serializers

# Importing the Room model from the current app's models.
from .models import Room

# Defining a serializer to convert Room model instances into JSON format
# and vice versa.
class RoomSerializer(serializers.ModelSerializer):
    # Meta class specifies additional options for the serializer.
    class Meta:
        # Specify the model the serializer is based on.
        model = Room
        # Define the fields from the model that will be included in the serialized output.
        fields = ('id', 'code', 'host', 'guest_can_pause', 
                  'votes_to_skip', 'created_at')


# Defining a serializer for creating new Room objects.
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model the serializer is based on.
        model = Room
        # Define the fields that will be used when creating a Room.
        # These fields represent the input data expected from the user.
        fields = ('guest_can_pause', 'votes_to_skip')


# Defining a serializer for updating an existing Room object.
class UpdateRoomSerializer(serializers.ModelSerializer):
    # Overrides the validation for the 'code' field, disabling any validators.
    # This allows the 'code' field to bypass default validation (e.g., unique constraint)
    # during updates.
    code = serializers.CharField(validators=[])

    class Meta:
        # Specify the model the serializer is based on.
        model = Room
        # Define the fields that can be updated in a Room object.
        fields = ('guest_can_pause', 'votes_to_skip', 'code')
