from django.db import models
import random
import string


def generate_unique_code():
    length=8
    # Generate a random  and unique string of uppercase letters
    while True: 
     code=''.join(random.choices(string.ascii_uppercase, k=length))
     if Room.objects.filter(code=code).count()==0:
        break
    
    return code




# Create your models here.
class Room(models.Model):
    #code will uniquly identify the room
    code=models.CharField(max_length=8,default=generate_unique_code,unique=True)
    host=models.CharField(max_length=50,unique=True)
    guest_can_pause=models.BooleanField(null=False,default=False)#null= false means no null values are accepted.
    votes_to_skip=models.IntegerField(null=False,default=1)
    created_at=models.DateTimeField(auto_now_add=True)