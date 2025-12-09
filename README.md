# 🏦 LoanLink - Microloan Request & Approval System

**LoanLink** is a comprehensive full-stack web application designed to bridge the gap between financial organizations and borrowers. It streamlines the entire microloan process, from application submission to approval and payment processing.

---

## 🔗 Live Links
- **Live Site:** [LIVE LINK]
- **Client Repository:** [CLIENT LINK]
- **Server Repository:** [SERVER LINK]

---

## 🔑 Admin & Manager Credentials (For Testing)
To explore the Admin and Manager dashboards, please use the following credentials:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `[admin@email.com]` | `[admin123]` |
| **Manager** | `[manager@email.com]` | `[manager123]` |

---

## 🚀 Key Features

### 🌐 General
- **Responsive Design:** Fully responsive UI/UX for Mobile, Tablet, and Desktop using **Tailwind CSS** & **DaisyUI**.
- **Authentication:** Secure Email/Password & Google Login using **Firebase**.
- **Security:** JWT (JSON Web Token) implemented for secure API access with HttpOnly Cookies.
- **Theme:** Dark & Light mode toggle.
- **Animations:** Smooth transitions using **Framer Motion**.

### 👤 User (Borrower) Dashboard
- **Apply for Loans:** Users can browse available loans and apply with auto-filled basic information.
- **My Loans:** Track application status (Pending, Approved, Rejected).
- **Withdraw Application:** Cancel loan requests if the status is still pending.
- **Payment Integration:** Secure application fee payment using **Stripe Payment Gateway**.
- **Transaction History:** View history of all payments made.

### 👨‍💼 Manager (Loan Officer) Dashboard
- **Add Loan Offers:** Managers can create new loan packages with interest rates and EMI plans.
- **Manage Loans:** Edit or delete posted loan offers.
- **Process Applications:** View user applications and take actions (**Approve** or **Reject**).
- **Statistics:** Visual charts (**Recharts**) for loan summaries and application status.

### 👮‍♂️ Admin Dashboard
- **User Management:** View all users, search by username/email.
- **Role Management:** Promote users to Manager/Admin or Demote them.
- **Account Suspension:** Suspend users with a reason and reactivate accounts.
- **System Overview:** View total system stats (Users, Cash Flow, Applications).

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS, DaisyUI
- **State Management:** Context API
- **Routing:** React Router DOM
- **Data Fetching:** Axios (with Interceptors)
- **Visualization:** Recharts
- **Forms:** React Hook Form
- **Payment:** Stripe.js & React Stripe.js

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (CRUD Operations)
- **Authentication:** JWT (JSON Web Token), Cookie Parser
- **Payment:** Stripe Backend SDK

---

## 📦 NPM Packages Used

### Client Side
- `react-router-dom`
- `firebase`
- `axios`
- `react-hook-form`
- `react-helmet-async`
- `framer-motion`
- `sweetalert2`
- `react-hot-toast`
- `recharts`
- `@stripe/react-stripe-js`
- `@stripe/stripe-js`

### Server Side
- `express`
- `cors`
- `dotenv`
- `mongodb`
- `jsonwebtoken`
- `cookie-parser`
- `stripe`

---

## ⚙️ Environment Variables (.env) Setup

To run this project locally, create `.env` files in both client and server directories.

### Client Side (`.env.local`)
```bash
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_IMGBB_API_KEY=YOUR_IMGBB_API_KEY
VITE_PAYMENT_GATEWAY_PK=YOUR_STRIPE_PUBLISHABLE_KEY