# Job Application Tracker

This project helps you track your job applications. It includes a backend API, a web interface, and a browser extension called "Scrape Job" to automatically extract job details from web pages.

## Features

*   **Backend API**: Manages job application data (built with ElysiaJS and Prisma).
*   **Web Interface**: Allows viewing and managing job applications (Next.js recommended).
*   **"Scrape Job" Browser Extension**: Automatically extracts job details from popular job boards.
*   **Data Persistence**: Stores application data using a PostgreSQL database (via Prisma).
*   **User Authentication**: Firebase integration in the Next.js frontend suggests user account capabilities.

## Project Structure

The project is organized into the following main directories:

*   **`/back-end`**: Contains the backend API built with [ElysiaJS](https://elysiajs.com/) and [Prisma ORM](https://www.prisma.io/). It handles data storage and business logic.
*   **`/nextjs-frontend`**: The primary web interface for users to view and manage their job applications. Built with [Next.js](https://nextjs.org/), React, Tailwind CSS, and integrated with [Firebase](https://firebase.google.com/) for authentication.
*   **`/front-end`**: An alternative/older web interface built with Vite, React, and Tailwind CSS. For most users, `/nextjs-frontend` is the recommended choice.
*   **`/extension`**: A browser extension named "Scrape Job" that allows users to automatically extract job posting details from web pages and send them to the backend.

## Installation and Setup

Follow these steps to set up and run the project components.

**Prerequisites:**

*   [Bun](https://bun.sh/) (for backend and potentially frontends)
*   [Node.js](https://nodejs.org/) (for frontends, if not using Bun exclusively)
*   A compatible browser for the extension (e.g., Google Chrome, Microsoft Edge)
*   A PostgreSQL database instance.

---

### 1. Backend (`/back-end`)

1.  **Navigate to the backend directory:**
    ```bash
    cd back-end
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **Set up Prisma and database:**
    *   Ensure your PostgreSQL server is running and accessible.
    *   Create a `.env` file in the `back-end/prisma` directory and configure your `DATABASE_URL`. Example:
        ```env
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
        ```
    *   Run database migrations:
        ```bash
        bunx prisma migrate dev
        ```
    *   Generate Prisma Client:
        ```bash
        bunx prisma generate
        ```
4.  **Run the development server (default port: 3000 or as configured):**
    ```bash
    bun run dev
    ```
    The API should now be running, typically at `http://localhost:3000`.

---

### 2. Next.js Frontend (`/nextjs-frontend`) - Recommended

1.  **Navigate to the Next.js frontend directory:**
    ```bash
    cd nextjs-frontend
    ```
2.  **Install dependencies:**
    ```bash
    bun install # or npm install / yarn install
    ```
3.  **Firebase Setup:**
    *   This project uses Firebase for authentication. You will need to set up a Firebase project and obtain your Firebase configuration credentials.
    *   Create a `.env.local` file in the `nextjs-frontend` root directory.
    *   Add your Firebase configuration keys to this file. Example structure:
        ```env
        NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain"
        NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
        NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
        ```
        (Refer to `nextjs-frontend/src/utility/firebase.ts` for the exact environment variables used if they differ from the example.)
4.  **Run the development server (default port: 3001 or as configured if 3000 is taken by backend):**
    ```bash
    bun run dev
    ```
    The frontend should now be accessible, typically at `http://localhost:3001`.

---

### 3. Browser Extension (`/extension`)

1.  **Open your browser's extension management page:**
    *   **Chrome/Edge:** Navigate to `chrome://extensions` or `edge://extensions`.
2.  **Enable Developer Mode:**
    *   Usually a toggle switch in the top right corner.
3.  **Load the extension:**
    *   Click on "Load unpacked."
    *   Select the `extension` directory from this project.
4.  **Configuration:**
    *   The extension is currently configured to communicate with the backend at `http://localhost:3000`. If your backend runs on a different port, you may need to adjust the `host_permissions` in `extension/manifest.json` and any fetch request URLs within the extension's JavaScript files (e.g., `background.js`).

---

### 4. Alternative Frontend (`/front-end`)

If you wish to run the Vite-based frontend:

1.  **Navigate to the frontend directory:**
    ```bash
    cd front-end
    ```
2.  **Install dependencies:**
    ```bash
    bun install # or npm install / yarn install
    ```
3.  **Run the development server:**
    ```bash
    bun run dev
    ```
    This frontend will likely run on a different port (e.g., `http://localhost:5173` by default for Vite).

## Usage

Once all components are installed and running:

1.  **Ensure the Backend API is running.**
2.  **Ensure the Next.js Frontend is running.**
3.  **Open the Frontend URL in your browser** (e.g., `http://localhost:3001`).
    *   You should be able to register/login if Firebase is configured correctly.
4.  **Using the "Scrape Job" Browser Extension:**
    *   Navigate to a job posting page on a supported website (e.g., LinkedIn, Indeed - *actual supported sites may vary and should be tested*).
    *   Click the "Scrape Job" extension icon in your browser's toolbar (or use the configured shortcut, e.g., `Ctrl+B` or `Cmd+B`).
    *   The extension should attempt to extract job details and send them to your backend.
5.  **View Scraped Data:**
    *   The scraped job applications should appear in the web interface. You can then view, manage, and track their status.

**Note:** The specific functionalities of the job scraper (e.g., which websites it supports, what data it extracts) are defined within the `extension`'s JavaScript files.
