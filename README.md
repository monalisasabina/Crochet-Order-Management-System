![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)

# Crochet Order Management System
A web-based system to manage and track crochet orders, designed to help artisans and small businesses efficiently manage client orders and maintain client information.

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Project Description

The **Crochet Order Management System** is a full-stack web application that allows crochet artisans to:

- Track client orders and order status
- Access a searchable client list
- Maintain organized records of past and ongoing projects
- Simplify the order management process with a clean and intuitive interface

This system is designed to be scalable, easy to maintain, and user-friendly.

---

## Features

- **Track Clients Orders:** Monitor the status of each client order from creation to completion.
- **Client List:** Quickly search and find clients with detailed information.
- **Order Management:** Create, update, and delete orders easily.
- **User-Friendly Interface:** Modern, responsive UI built for simplicity.
- **Notifications & Updates:** Receive timely updates on client orders.

---

## Technologies Used

- **Frontend:** Next.js (React framework)
- **Backend:** Node.js (or Next.js API routes)
- **Others:** Any relevant libraries or dependencies (e.g., database or state management)

---

## Installation

### Requirements

- **Node.js:** Version 20.9 or later (current LTS/latest recommended)
- **Package Manager:** npm, Yarn, pnpm, or Bun
- **Conceptual Knowledge:** Basic understanding of JavaScript and React

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd crochet-order-management-system
```

2. **Install dependencies for frontend and backend**
```bash
#Frontend
cd Client
npm install

# Backend
cd Server
npm install
```

3. **Run the application**
```bash
# Start backend
cd Server
npm run dev

# Start frontend
cd Client
PORT=4000 npm run dev
```
``` PORT=4000 npm run dev``` is to avoid conflicts when running on the frontend and backend on the two different terminal.

4. **Access the app**
- Frontend: ```http://localhost:4000```

- Backend API: ```http://localhost:3000```

### Usage
1. Open the app in your browser.

2. Navigate to the client list to view or search for clients.

3. Create new orders via the "New Order" section.

4. Update order status or details as needed.

5. View past and ongoing orders in a structured interface.


## Configuration
### - Environment Variables:
Create a .env file in the server directory to configure backend options:
```bash
PORT=4000
DATABASE_URL=<your-database-url>
```
### - Frontend Configuration:
Update API endpoint URLs in the frontend .env.local file if different from defaults.


## Troubleshooting
#### - Frontend does not start:
Ensure you are in the client directory and all dependencies are installed.

#### Backend API errors:
Check .env configuration and ensure the database is running.

#### Port conflicts:
Make sure the ports 3000 (frontend) and 5000 (backend) are free.


## Code Structure
```pgsql

crochet-order-management-system/
│
├── client/               # Frontend (Next.js)
│   ├── pages/
│   ├── components/
│   ├── styles/
│   └── package.json
│
├── server/               # Backend (Node.js / API)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
│
└── README.md

```


## Contributing
1. Fork the repository

2. Create a feature branch (git checkout -b feature-name)

3. Commit your changes (git commit -m "Add feature")

4. Push to the branch (git push origin feature-name)

5. Open a Pull Request

Please follow the code style and maintain clean, readable code.


## License
This project is licensed under the [MIT License](LICENSE).
