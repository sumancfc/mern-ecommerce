# MERN Stack Project

A full-stack web application built using the MERN (MongoDB, Express, React, Node.js) stack with TypeScript and JWT authentication.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

## Features

- RESTful API built with Express and TypeScript
- Secure authentication using JWT
- MongoDB integration for data persistence
- React frontend for a dynamic user interface

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- MongoDB

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/sumancfc/mern-ecommerce.git
    ```

2. Install dependencies for both backend and frontend:

    ```sh
   npm install
   cd client
   npm install
   ```

3. Setup environment variables:

    ```sh
    PORT=8000
    NODE_ENV=development or prodution
    DATABASE=mongodb://your-db-connection-string
    JWT_SECRET_KEY=your-jwt-secret
   ```

4. Run the project

    ```sh
    # Run frontend (:3000) & backend (:8000)
    npm run dev
    
    # Run backend only
    npm run server
   ```

## License

The MIT License

Copyright (c) 2025 Suman Shrestha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.