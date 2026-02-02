# MASIRAT Task 1

screenshots are provided in the screenshots directory

## Prerequisites

- Docker
- Docker Compose

## How to run locally

1. Clone the repo:
   git clone https://github.com/<yourusername>/Masirat_Assessment_Task_1.git

   > cd mern-docker-demo

2. Run docker-compose:

   > docker-compose up --build

3. Access the Application:
   Frontend: http://localhost:3000
   Backend API to fetch users: http://localhost:5000/api/users
   MongoDB: http://localhost:27017

4. Stopping the App
   - To stop the containers and keep the data:
     > docker-compose stop
   - To wipe the containers and the database (clean reset):
     > docker-compose down -v

**Tech Stack & Architecture**

- Frontend: React 19

- Backend: Node.js / Express

- Database: MongoDB 6.0

- Orchestration: Docker Compose
