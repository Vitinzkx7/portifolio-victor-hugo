# Professional Data Engineering Portfolio

Welcome to my professional Data Engineering and Development portfolio! This project is a modern, responsive, and fully dockerized Fullstack web application designed to showcase my skills, projects, and professional background.

## Live Demo

- **Frontend:** *[Link soon]*

# Technology Stack

This application is built with a modern technology stack separated into three main layers:

### Frontend
- **Framework:** React.js + TypeScript
- **Build Tool:** Vite
- **Styling:** Custom CSS (Modern Aesthetic, Dark Theme, Animations)

### Backend
- **Framework:** Java Spring Boot 3.x
- **Build Tool:** Maven
- **Features:** RESTful API, SMTP Email Integration (Contact Form), CORS enabled for Web integration.

### Database & Environment
- **Database:** MySQL 8.0 (Managed via Docker locally, Aiven in production)
- **Containerization:** Docker & Docker Compose

## Project Structure

The repository is structured as a Monorepo:

```text
portifolio/
│
├── Backend/                 # Java Spring Boot API
│   ├── src/                 # Controllers, Services, Configs (CORS, Email)
│   ├── pom.xml              # Maven dependencies
│   └── Dockerfile           # Multistage Dockerfile (Maven build + JRE)
│
├── Frontend/                # React.js application
│   ├── src/                 # React Components, Hooks, i18n
│   ├── public/              # Static assets (images, resumes)
│   ├── .env                 # Environment variables configuration
│   └── Dockerfile           # Multistage Dockerfile (Node build + Nginx)
│
└── docker-compose.yml       # Orchestrates Database, Backend, and Frontend automatically
```

# Contact Form & API Features
The portfolio features a fully functional Contact Form that sends an email directly to my professional inbox using Spring Boot's SMTP configuration (`JavaMailSender`). It also fetches skills and project highlights dynamically via the API.
