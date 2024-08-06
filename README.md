# Beer Challenge 

## Description
This is a frontend application developed with Next.js for a work challenge. The application is designed to provide a robust and scalable platform using the latest web technologies. Server-side rendering is used to enhance the user experience, especially for e-commerce, by preloading product information before the pages are rendered.
### Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
```

### Node version:
It is recommended to use the latest versions of node, version 20 was used for development

# Frontend

 1. Navigate to the project directory: 

 `cd frontend`

 2. Install the dependencies:

`npm install`

## Usage
To start the application in development mode, use the following command:

    npm run dev

To build the application for production:

    npm run build
    
To start the application in production:

    npm run start
To run the tests:

    npm run tests

## Routing
 - `/` redirects to `/products`.
 - `/products` is the Product List Page (PLP).
 - Any invalid route like `/something-else` redirects to a 404 page.
 - `/product/[id]` is the Product Detail Page (PDP).

## Views
- **PLP:**

![image](https://github.com/user-attachments/assets/319992ec-b9fb-4193-8fd4-4fde5c4b6de1)

- **PDP:**

![image](https://github.com/user-attachments/assets/79949605-0b8a-4a84-b279-f826c66f111b)


- **404:**

![image](https://github.com/user-attachments/assets/954b4fdd-1712-4764-a5a8-f02d8549d9f1)


## Features

-   **Next.js** for server-side rendering React applications.
-   **React 18** for building user interfaces.
-   **Jest** and **Testing Library** for unit and integration tests.
-   **ESLint** for code quality assurance.
-   **Sass** for CSS preprocessing.

## Technologies Used

-   [Next.js](https://nextjs.org/) (v14.2.5)
-   [React](https://reactjs.org/) (v18)
-   [Jest](https://jestjs.io/) (v29.7.0)
-   [Testing Library](https://testing-library.com/) (v16.0.0)
-   [Sass](https://sass-lang.com/) (v1.77.8)
-   [ESLint](https://eslint.org/) (v8)

## License

This project is licensed under the MIT License. For more details, see the LICENSE file.

## Authors

-   **Guillermo Forero** - _ Senior Frontend Developer_ - https://github.com/GuillermoForero

# Backend

Backend for the React Beer E-Commerce Challenge.

## Description

This is the backend service for the Beer Challenge application, a project designed to provide an e-commerce platform for selling beer. The backend is built with Node.js and Express.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/GuillermoForero/React-Beer-E-Commerce-Challenge/

2. Navigate to the project directory:

   ```sh
   cd backend

3. Install the dependencies:

   ```sh
   npm install

4. Running the Application:
You can run the application in two modes: development and production.

Development Mode
To run the application in development mode with automatic restarts on file changes, use:

 

    npm run dev

Production Mode
To run the application in production mode, use:

    npm run start

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
