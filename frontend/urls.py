# Importing the `path` function from Django's URL handling module and the `index` view
# This will be used to define the URL patterns for the app
from django.urls import path
# Importing the `index` view from the `views.py` file
from .views import index

# The `app_name` helps to uniquely identify this app's URLs, useful for namespace management
# For example, it allows referencing URLs in templates using `{% url 'frontend:index' %}`
app_name = 'frontend'

# Defining the URL patterns for this app. Each URL pattern is linked to the `index` view.
urlpatterns = [
    # The first path is the root URL of this app (`/`), it will trigger the `index` view
    # The name for this path is left empty (default name), though it can be given a name for easy reverse URL lookup.
    path('', index, name=''),
    
    # This path will trigger the `index` view when accessing the `/info` URL
    path('info', index),
    
    # This path will trigger the `index` view when accessing the `/join` URL
    path('join', index),
    
    # This path will trigger the `index` view when accessing the `/create` URL
    path('create', index),
    
    # This path is dynamic and captures the `roomCode` from the URL. 
    # It will trigger the `index` view and pass the `roomCode` as a part of the URL.
    # For example, accessing `/room/abc123` will pass `abc123` as `roomCode` to the `index` view.
    path('room/<str:roomCode>', index)
]
