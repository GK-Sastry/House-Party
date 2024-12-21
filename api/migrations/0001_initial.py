# Generated by Django 3.1.1 on 2020-11-05 02:22
# This file was automatically generated by Django during the migration process.
# It defines the migration needed to create the Room model in the database.

from django.db import migrations, models
# Importing Django's migrations module to define database operations and models module for field types.

class Migration(migrations.Migration):
    # A subclass of `migrations.Migration` which defines database migration logic.

    initial = True
    # Indicates that this is the first migration for the app (creates the initial schema).

    dependencies = [
        # Specifies any migration files that this migration depends on. 
        # Empty here because this is the initial migration with no prior dependencies.
    ]

    operations = [
        # List of operations to apply in this migration.
        migrations.CreateModel(
            # Defines the creation of a new database table for the `Room` model.
            name='Room',  # The name of the database table (Django model).
            fields=[
                # List of fields/columns in the Room table.
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                # AutoField: An automatically incrementing primary key for the table.
                # `auto_created=True`: Automatically managed by Django.
                # `primary_key=True`: This field serves as the unique identifier for each record.
                # `serialize=False`: Prevents serialization in migrations.
                # `verbose_name`: Human-readable name for the field, defaulting to "ID".

                ('code', models.CharField(default='', max_length=8, unique=True)),
                # CharField: A field for storing short text strings.
                # `default=''`: If no value is provided, defaults to an empty string.
                # `max_length=8`: Limits the length of the code to 8 characters.
                # `unique=True`: Ensures each code in the table is unique.

                ('host', models.CharField(max_length=50, unique=True)),
                # CharField: Stores the session key or identifier for the host.
                # `max_length=50`: Limits the length of the host string to 50 characters.
                # `unique=True`: Ensures only one room is associated with a given host.

                ('guest_can_pause', models.BooleanField(default=False)),
                # BooleanField: Stores a True/False value.
                # `default=False`: The default value is False if not provided.

                ('votes_to_skip', models.IntegerField(default=1)),
                # IntegerField: Stores an integer value.
                # `default=1`: If not specified, defaults to 1 (e.g., the minimum number of votes needed to skip).

                ('created_at', models.DateTimeField(auto_now_add=True)),
                # DateTimeField: Stores a date and time.
                # `auto_now_add=True`: Automatically sets the field to the current date and time when the object is created.
            ],
        ),
    ]
