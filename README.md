
# Paytm Clone

A full-stack application mimicking core functionalities of Paytm, built using modern technologies for backend and frontend development. The project ensures security, efficiency, and user-centric design.

## Tech Stack

### Backend
- **Node.js** (Runtime)
- **Typescript**(language)
- **Express.js** (Framework)
- **MongoDB** (Database)
- **CORS** (Cross-Origin Resource Sharing)
- **JWT** (Authentication)
- **Bcrypt** (Password Hashing)
- **Regex** (Advanced search logic in MongoDB)

### Frontend
- **React** (Library)
- **Vite** (Build Tool)
- Multiple libraries for UI enhancements and state management

---

## Features
- Secure authentication system with JWT.
- Advanced search functionality using **Regex logic** in MongoDB.
- User-friendly frontend interface powered by React.
- Backend API for handling user data and transactions.
- Password hashing for secure user data storage.
- **Secure payment integration** using session hooks to ensure no flaws in transaction security.
- Responsive design for all device sizes.

---

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v16 or above)
- MongoDB (local or cloud-based)
- Git

---

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/paytm.git
   cd paytm/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-url
   JWT_SECRET=your-jwt-secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend server should now be running on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend should now be running on `http://localhost:5173`.

---

### Project Structure

#### Backend
```
backend/
├── models/
├── routes/
├── utils/
├── server.js
└── .env
```

#### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
├── public/
└── vite.config.js
```

---

## Scripts

### Backend
- `npm start` - Start the backend server.
- `npm run dev` - Start the backend server in development mode (with nodemon).

### Frontend
- `npm run dev` - Start the development server.
- `npm run build` - Build the frontend for production.
- `npm run preview` - Preview the production build.

---

## Security Enhancements
- **Regex Search Logic**: Efficient and secure implementation of advanced search features in MongoDB.
- **Session Hooks for Payment Security**: Integrated secure payment flows using session hooks to detect and prevent any vulnerabilities or flaws during transactions.
- **JWT Authentication**: Robust token-based authentication to protect user data and sessions.
- **Bcrypt Password Hashing**: Ensures encrypted storage of user credentials.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For any inquiries or issues, feel free to contact:
- **Email:** your-email@example.com
- **GitHub:** [your-username](https://github.com/your-username)

