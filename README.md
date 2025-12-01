# OSINT Map Tracker

Open Source Intelligence Map Tracker - A full-stack application for tracking and visualizing intelligence data.

## Project Structure

```
.
├── backend/          # Python backend (FastAPI)
├── frontend/         # React frontend
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Installation

1. Copy `.env.example` to `.env` and update values:
   ```bash
   cp .env.example .env
   ```

2. Start with Docker Compose:
   ```bash
   docker-compose up -d
   ```

### Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432

## Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## License

MIT
