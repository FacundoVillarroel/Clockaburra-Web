
# Clockaburra Web
A modern, responsive web application serving as the frontend for the Clockaburra platform. Built with React and integrated with the Clockaburra RESTful API, it offers a seamless user experience for managing time-related functionalities.​

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Author](#author)
- [Contact](#contact)

## Overview
Clockaburra Web serves as the user interface for the Clockaburra platform, allowing users to interact with the system's functionalities through a clean and intuitive design. It communicates with the Clockaburra RESTful API to perform operations such as user authentication, data retrieval, and management.​

## Features
- Responsive design optimized for various devices
- User authentication and authorization
- Integration with Clockaburra RESTful API
- Real-time data updates
- Form validations and error handling
- Modular and maintainable codebase​

## Technologies Used
- **Frontend Framework:** React
- **State Management:** Redux
- **Routing:** React Router
- **Styling:** CSS Modules
- **HTTP Client:** Axios

## Installation
1. Clone the repository:

```bash
git clone https://github.com/FacundoVillarroel/Clockaburra-Web.git
cd Clockaburra-Web
```

2. Install dependencies:

```bash
npm install
```

## Configuration
### Environment Variables:
Create a `.env` file in the root directory and add the following:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

Adjust the `REACT_APP_API_URL` to match the URL of your Clockaburra RESTful API.

## Running Locally
To start the development server:​

```bash
npm start
```

The application will run at `http://localhost:3000/` by default.​

## Available Scripts
- **Start Development Server:**

```bash
npm start
```

## Project Structure
```
Clockaburra-Web/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Author
Facundo Villarroel

[GitHub](https://github.com/FacundoVillarroel)

## Contact
For questions or suggestions pleasecontact:​

Email: facu.villarroel96@gmail.com
