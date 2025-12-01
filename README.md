0S1NT-M4P

0S1NT-M4P is a minimal OSINT investigation web app with graph visualization similar in concept to Maltego or Osinttracker.
Stack: Node.js, Express, Prisma, PostgreSQL, Vanilla JS, vis.js, Docker.

Structure

- backend: Node.js API with JWT auth and Prisma
- frontend: Static HTML/CSS/JS UI with vis.js graph
- postgres: Database container
- docker-compose: Orchestrates all services

Requirements

- Docker
- Docker Compose

Setup

1. Copy environment file:

    cp .env.example .env

2. Start the stack:

    docker compose up --build

Services

- Frontend: http://localhost:8080
- Backend API: http://localhost:4000/api
- PostgreSQL: localhost:5432

Usage

1. Open http://localhost:8080 in a browser.
2. Use the Register form to create a new user.
3. Login with the same credentials.
4. Use the "New Entity" form to create entities of type Person, Location or Domain.
5. New entities appear on the graph in real time.

Notes

- Password reset endpoint logs reset token to backend console.
- JWT tokens are stored in localStorage and attached to API requests.
