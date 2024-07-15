<h1 align="center">GamerDen</h1>

## About
GamerDen is a web application designed to connect gamers based on their specific gaming preferences from all over the world.
Users can create accounts and update their gaming preferences.
By tailoring these preferences, users can search for and connect with other gamers who share similar interests and view their profiles.


## Features
- **User Registration:** Create an account with personal information and gaming preferences.
- **Profile Management:** Upload profile images and update personal details.
- **Game Search:** Find other gamers playing the same games by certain preferences such as games, gaming platforms (such as PC, PlayStation, and Xbox), region, age range, a preference for voice communication, and more.
- **Profile Viewing:** View other gamers' profiles to check out their details and preferences.

## Technology Stack
- **Frontend:** React, TypeScript, Material-UI, Tailwind CSS, Nginx
- **Backend:** Express, TypeScript, Prisma ORM
- **Database:** PostgreSQL
- **API Integration:** Twitch IGDB API for fetching over 500k games

## Security and File Handling
- **Password Encryption:** bcrypt is used for secure password encryption in the database.
- **JWT:** JSON Web Tokens (JWT) are used for secure data transmission between the frontend and backend.
- **Image Compression and Uploads:** Sharp is used for image compression, and Express Multer is used for handling file uploads.


## Getting Started
If you choose to run or deploy GamerDen, Dockerfiles and a docker-compose.yaml file are available to run the app in an isolated environment.
you need to clone the repository and ensure Docker and Docker Compose are installed on your system. Follow the steps below to set up the application.

### Prerequisites
- Docker
- Docker Compose

### Installation
1. **Clone the Repository:**

    ```bash
    git clone https://github.com/ItamarBarHod/GamerDen.git
    cd GamerDen
    ```
    
2. **Create the `.env` File:**
    In the root folder of the project, create a `.env` file and fill in the following fields:

    ```env
    POSTGRES_USER=YOUR_POSTGRES_USERNAME
    POSTGRES_PASSWORD=YOUR_POSTGRES_PASSWORD
    POSTGRES_DB=YOUR_POSTGRES_DATABASE_NAME
    
    PORT=YOUR_BACKEND_PORT
    
    DB_HOST=YOUR_DATABASE_HOST
    DB_PORT=YOUR_DATABASE_PORT
    
    JWT_SECRET_TOKEN=YOUR_JWT_SECRET_TOKEN
    
    CLIENT_ID=YOUR_TWITCH_CLIENT_ID
    IGDB_AUTHENTICATION_TOKEN="Bearer YOUR_IGDB_AUTHENTICATION_TOKEN"
    
    DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}
    
    VITE_API_ENDPOINT=http://localhost:${PORT}/api
    ```

    - **CLIENT_ID** and **IGDB_AUTHENTICATION_TOKEN** can be obtained from the [Twitch Developer Portal](https://dev.twitch.tv/console/apps/create).

3. **Run the Application:**
    Navigate to the project directory and run the following command:

    ```bash
    docker-compose up -d
    ```

    This will build and run GamerDen in Docker containers, allowing for easy deployment and isolation.

## Search Gaming Partners:
[![Search](https://i.postimg.cc/PxHC96RF/1.png)](https://postimg.cc/PL6f8Mhm)

[![Partners Found](https://i.postimg.cc/QC4VBjxR/2.png)](https://postimg.cc/RJtvy5tR)

## Automated Seeding

GamerDen includes an automated seed function that enables you to select how many games you want to fetch from the IGDB API.

## Contributing

Feel free to contribute, report issues, or suggest improvements to the GamerDen project!
