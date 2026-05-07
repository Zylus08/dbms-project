# DBMS Project

This project contains a Node.js/Express backend and a React/Vite frontend.

## Prerequisites
- **Node.js**: (v14 or higher recommended)
- **MySQL Server**: Running locally or remotely.

## 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench).
2. You can either open the `Final.mwb` file or manually run the SQL scripts in this order:
   - `Schema.sql`
   - `Values.sql`
   - Any other needed files (`Procedure.sql`, `Trigger.sql`, `Function.sql`, `View.sql`, etc.)

## 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   PORT=5000 # Optional
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```

## 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The frontend will usually be accessible at `http://localhost:5173`.
