# Music Controller Application

This is a music controller web application built using Django and React. It allows users to create and join rooms where they can control music playback collectively.

---

## Features

- Create and join music rooms.
- Control music playback (play, pause, skip).
- Vote-based song skipping mechanism.
- Spotify integration for music playback.
- Live synchronization of music for all participants in a room.

---

## Requirements

### Backend (Django):
- Python 3.10+
- Django 4.2+
- Spotipy for Spotify API integration

### Frontend (React):
- Node.js 16+
- npm or yarn package manager
- Material-UI for UI components

---

## Installation

### 1. Clone the Repository
```bash
$ git clone https://github.com/your-repo/music-controller.git
$ cd music-controller
```

### 2. Set Up Backend
#### Create a Virtual Environment:
```bash
$ python -m venv venv
$ source venv/bin/activate  # For Windows: venv\Scripts\activate
```

#### Install Dependencies:
```bash
$ pip install -r requirements.txt
```

#### Set Up Django:
```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

#### Create a Superuser:
```bash
$ python manage.py createsuperuser
```

#### Start the Server:
```bash
$ python manage.py runserver
```

### 3. Set Up Frontend
#### Install Dependencies:
Navigate to the `frontend` directory and install required dependencies:
```bash
$ cd frontend
$ npm install
```

#### Build Frontend:
```bash
$ npm run build
```

---

## File Structure

### Django Backend:
- **`api/`**: Contains all API-related files.
  - `urls.py`: Defines API routes.
  - `views.py`: Handles API logic.
- **`frontend/`**: Contains the React frontend code.
  - `src/components/`: React components.
  - `src/App.js`: Main React application.
- **`music_controller/`**: Django project settings.

### Static Files:
- Stored in the `static/` folder after running the frontend build.
- Includes CSS, JS, and images.

---

## Environment Variables
Create a `.env` file in the root directory and add the following:
```
SPOTIFY_CLIENT_ID=<Your Spotify Client ID>
SPOTIFY_CLIENT_SECRET=<Your Spotify Client Secret>
REDIRECT_URI=http://localhost:8000/spotify/redirect
```

---

## Running the Application
1. Start the backend server:
   ```bash
   $ python manage.py runserver
   ```
2. Ensure the frontend is built and served via Django.
3. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000/
   ```

---

## Troubleshooting

1. **Blank Screen Issue:**
   - Check the browser console for errors.
   - Ensure all frontend dependencies are installed.

2. **API Issues:**
   - Verify the backend server is running.
   - Check API endpoints in `api/urls.py`.

3. **Spotify Integration Issues:**
   - Ensure `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are correctly set in `.env`.
   - Verify the redirect URI matches Spotify app settings.

---


