# Sample AspNet Core with React and Docker support application
    
![GitHub license](https://img.shields.io/github/license/SirCypkowskyy/SampleAspNetReactDockerApp)
![GitHub issues](https://img.shields.io/github/issues/SirCypkowskyy/SampleAspNetReactDockerApp)
![GitHub pull requests](https://img.shields.io/github/issues-pr/SirCypkowskyy/SampleAspNetReactDockerApp)

A sample .Net 8.0 web API with React and Docker support project for demonstration purposes and as a starting point for a fullstack application. 

This project utilizes the .Net 8.0 SDK, React, and Docker to create a development and production environment for a web application, with the addition of Nginx for routing between the React and .Net applications.

I recommend using this repository as a starter project for your fullstack application, as it provides a good starting point for a .Net application with a React frontend, and it is configured to run as a collection of Docker containers, ready for development and production.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Application](#running-the-application)
    - [Running the Application without Docker](#running-the-application-without-docker)
    - [Running the Application with Docker](#running-the-application-with-docker)
- [Tech stack](#tech-stack)
- [Authors](#authors)

## Getting Started

To get started, clone the repository and open the project in Visual Studio 2022. The project is configured to run in a Docker container, so you will need to have Docker Desktop installed. Once you have the project open, you can run the project in Visual Studio 2022 and the application will start in a Docker container.

### Prerequisites

- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [.Net 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

### Running the Application

You can run the application without Docker or as a collection of Docker containers. Generally, the docker-compose file was designed to run the application in a production environment, but it can also be used for development purposes.

Below are the steps to run the application in both environments:

#### Running the Application without Docker

To run the application without Docker, you can run the .Net application and the React application separately. To run the .Net application, open the project in Visual Studio 2022 and run the application. The client application should start by default, but if it does not, you can navigate to the `SampleAspNetReactDockerApp.Client` directory and run the following command:

```bash
npm install
npm run dev
```

**NOTE:** You will need to have Node.js installed to run the client application. The application requires connection to a PostgreSQL database, so you will need to have a PostgreSQL database running. You can configure the connection string in the `appsettings.json` file in the `SampleAspNetReactDockerApp.Server` directory, or you can set the `ASPNETCORE_CONNECTIONSTRING` environment variable to the connection string. You can also run the database in a Docker container (from docker-compose) by running the following command:

```bash
docker compose --env-file ./.env up -d app-db
```

#### Running the Application with Docker

To run the application with Docker, you can run the following command in the root directory of the project:

```bash
docker compose --env-file ./.env up -d
```

This will start the .Net application, the React-Vite application and the database in separate Docker containers. You can access the application at `http://localhost:8080`.

## Tech stack

- Backend
  - [.Net 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
  - [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Npgsql](https://www.npgsql.org/)
  - [Swagger](https://swagger.io/)
- Frontend
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
- [Nginx](https://www.nginx.com/)

## Authors

- **[Cyprian Gburek](https://github.com/SirCypkowskyy)**


