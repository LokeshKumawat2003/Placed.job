# Placed.Job - Job Portal for Job Applications, Assessments, and Interviews
## App Demo link
[Placed.Job Live App](https://jocular-medovik-69cd7e.netlify.app/)
## Overview

Placed.Job is a job portal platform designed for both job seekers and employers. It allows users to apply for jobs, complete skill assessments, and attend interviews in one seamless process. The application connects job seekers with employers, offering them an efficient way to manage job applications and assessments. For employers, it provides tools to review candidates, assess their skills, and schedule interviews.

This platform is designed with modern web technologies to ensure a fast and responsive experience.

## Features

### For Job Seekers:
- **Browse Job Listings**: Explore job opportunities across various industries and locations.
- **Apply for Jobs**: Submit your applications with relevant documents and personal details.
- **Skill Assessments**: Complete assessments to showcase your skills and improve your chances of getting hired.
- **Track Application Status**: View the status of your job applications, assessments, and interview invitations.
- **Notifications**: Get notified when your application status changes, or an interview is scheduled.

### For Employers:
- **Job Posting**: Post new job openings for potential candidates to apply.
- **Review Applications**: View job applications and assessments submitted by job seekers.
- **Interview Scheduling**: Schedule interviews with candidates that passed their assessments.
- **Manage Job Listings**: Edit or delete job postings as needed.
- **Notifications**: Receive notifications for application submissions and interview confirmations.

### General Features:
- **User Authentication**: Secure registration, login, and authentication via JWT tokens.
- **Role-based Access**: Different access levels for job seekers and employers.
- **Responsive Design**: The application is mobile-friendly and adapts to different screen sizes.
- **Real-time Notifications**: Stay up-to-date with real-time alerts for job applications and interview schedules.

## Technologies Used

### Frontend
- **React**: A powerful JavaScript library for building the user interface.
- **React Router**: For managing navigation and routing between pages.
- **Axios**: For making HTTP requests to interact with the backend API.
- **React Toastify**: To display notifications such as success and error messages.
- **Vite**: A fast development and build tool for React, providing hot module replacement (HMR) and fast rebuilds.

### Backend
- **Express.js**: A minimalist web framework for Node.js used for creating the server and handling HTTP requests.
- **MongoDB (Mongoose)**: A NoSQL database to store job, user, and application data. Mongoose ODM is used to interact with MongoDB.
- **JWT (JSON Web Tokens)**: Used for secure authentication and authorization of users.
- **Bcrypt**: A hashing library used to securely hash user passwords.
- **CORS**: Middleware to handle cross-origin requests and ensure the frontend and backend can communicate securely.
  
### Dev Tools
- **Nodemon**: For automatically restarting the backend server during development when file changes are detected.
- **ESLint**: For maintaining code quality and enforcing coding standards.
  
## Installation

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (preferably LTS version): For running the backend and frontend.
- **MongoDB** (or MongoDB Atlas if you prefer a cloud-based database).

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/placed-job.git
   cd placed-job
