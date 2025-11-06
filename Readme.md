# Veridia Hiring Platform

This is a full-stack hiring platform designed to streamline and professionalize the recruitment process at Veridia. It replaces the previous system of using Google Forms with a dedicated, feature-rich application.

## Features Implemented

- **Candidate Registration and Login**: Candidates can create an account and log in securely.
- **Admin Registration and Login**: A separate registration and login system for the HR team.
- **Job Listings**: Publicly visible list of all open job positions.
- **Application Form**: Candidates can apply for jobs by uploading their resume and a cover letter.
- **Candidate Dashboard**: Authenticated candidates can view a list of their submitted applications and track their status.
- **Admin Dashboard**: A comprehensive dashboard for the HR team to:
  - Create, edit, and delete job postings.
  - View all applications submitted for a specific job.
  - Update the status of each application (e.g., 'In Review', 'Interviewing', 'Rejected').
- **Automated Email Notifications**: 
  - Candidates receive an email confirmation upon submitting an application.
  - Candidates are notified when the status of their application is updated by an admin.
  - Admins are notified when a new application is submitted.
- **Secure & Private Routes**: The application uses JWT authentication to protect sensitive routes and data.

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose for object data modeling.
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt.js
- **File Uploads**: Multer
- **Email Notifications**: Nodemailer

### Frontend

- **Framework**: React (with Vite)
- **UI Library**: Material-UI (`@mui/material`)
- **Routing**: React Router (`react-router-dom`)
- **HTTP Client**: Axios
- **Form Management**: Formik
- **Validation**: Yup
- **Styling**: Tailwind CSS (and Emotion with MUI)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm (or yarn)
- MongoDB (local instance or a MongoDB Atlas cluster)

### Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone (repository link)
   cd veridia-hiring-platform
   ```

2. **Set up the Backend:**
   - Navigate to the `backend` directory: `cd backend`
   - Install dependencies: `npm install`
   - Create a `.env` file in the root of the project and add the following environment variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_gmail_address
     EMAIL_PASS=your_gmail_app_password
     PORT=5000
     ```

3. **Set up the Frontend:**
   - Navigate to the `frontend` directory: `cd ../frontend`
   - Install dependencies: `npm install`

### Running the Application

1. **Start the Backend Server:**
   - From the `backend` directory, run: `npm start`
   - The server will start on `http://localhost:5000`.

2. **Start the Frontend Development Server:**
   - From the `frontend` directory, run: `npm run dev`
   - The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Screenshots

## Cloudinary Setup

Add these to your backend environment (local .env and Vercel Project Settings → Environment Variables):

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Notes:
- Backend reads env via `process.env` (see `backend/utils/cloudinary.js`).
- No frontend Cloudinary env needed. Resumes are uploaded server-side and the saved `secure_url` is used on the UI.
- Multer is configured with memory storage for serverless; files are uploaded to Cloudinary in `applicationController.applyForJob`.

## Deploying to Vercel

1. Push repo to GitHub.
2. Import the repo in Vercel.
3. Set Environment Variables in Vercel (Project → Settings → Environment Variables):
   - `MONGODB_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `PORT` (optional),
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
4. Set Build/Output:
   - Monorepo: set Root Directory to `backend` for the API if deploying backend separately, or use a single server if only API.
   - Frontend (Vite): Root Directory `frontend` and `VITE_API_URL` should point to your deployed backend `/api` base, e.g. `https://your-api.vercel.app/api`.
5. Re-deploy.

Local development env files:
- Backend: create `.env` at repo root used by the server (same variables as above).
- Frontend: `frontend/.env` with `VITE_API_URL=http://localhost:5000/api` for local.

### Home Page

![Home Page](./frontend/src/assets/images/home-page.png)

### Login Page

![Login Page](./frontend/src/assets/images/login-page.png)

### Candidate Dashboard

![Candidate Dashboard](./frontend/src/assets/images/candidate-dashboard.png)

### Admin Dashboard

![Admin Dashboard](./frontend/src/assets/images/admin-dashborad.png)

### Applications (Admin)

![Applications (Admin)](./frontend/src/assets/images/applications.png)

### Profile (Candidate)

![Profile (Candidate)](./frontend/src/assets/images/profile-page.png)

### Admin Applications (Filters & Detail)

![Admin Applications](./frontend/src/assets/images/admin-applications.png)

## License

This project is for demonstration and hiring evaluation purposes at Veridia.
