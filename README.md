# Evently - Full Stack Event Finder

Evently is a clean and modern full-stack web application for finding and managing events. Users can browse upcoming and past events, search for specific events, and add new ones to the platform.

### ✨ Live Links

* **Frontend Demo:** [https://event-finder-o8ng.onrender.com](https://event-finder-o8ng.onrender.com)
* **Backend API:** [https://event-finder-backend-cdky.onrender.com](https://event-finder-backend-cdky.onrender.com)



## 🛠️ Tech Stack

### Frontend (Client)

* **React (Vite):** A fast, modern build tool and React framework.
* **TypeScript:** For static type-checking.
* **TailwindCSS:** A utility-first CSS framework for rapid UI development.
* **React Router:** For client-side routing.
* **Axios:** For making HTTP requests to the backend API.
* **Lucide React:** A clean and consistent icon library.

### Backend (Server)

* **Node.js:** A JavaScript runtime environment.
* **Express:** A minimal and flexible Node.js web application framework.
* **CORS:** Node.js package for enabling Cross-Origin Resource Sharing.
* **MongoDB / Mongoose:** (Assumed) Database and Object Data Modeling (ODM).
* **TypeScript:** (Assumed) Superset of JavaScript for static typing.

---

## 🚀 Setup and Running

To get the project running locally, you must set up both the backend and frontend.

### 1. Backend (Server)

First, get the server running.

1.  **Navigate to the `backend` directory:**
    ```sh
    cd backend
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `backend/` directory. Copy the contents of `backend/.env.example` into it and provide your local credentials (like your MongoDB URI).
    ```sh
    cp .env.example .env
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The API will now be running at `http://localhost:8000` (or your specified port).

### 2. Frontend (Client)

With the server running, you can start the client.

1.  **Navigate to the `frontend` directory:**
    ```sh
    cd frontend
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the `frontend/` directory. Copy the contents of `frontend/.env.example`. The `VITE_API_URL` should point to your **local backend server**.
    ```sh
    cp .env.example .env
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🔑 Environment Variables

You will need two separate `.env` files. Example templates are provided below.

### `backend/.env.example`
Place this in your `/backend` folder.

```.env.example
# Server port
PORT=8000

# MongoDB connection string (replace with your own)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/myDatabaseName

# Frontend origin for local development
CORS_ORIGIN=http://localhost:5173

```

## 🌐 API Documentation

All API endpoints are hosted at the backend URL and prefixed with `/api`.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/events` | Fetches a list of all events. |
| `GET` | `/events/:id` | Fetches details for a single event by its `_id`. |
| `POST` | `/events` | Creates a new event. Expects a JSON body with `title`, `date`, `location`, `description`, and `maxParticipants`. |
