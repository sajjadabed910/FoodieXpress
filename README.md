# 🍔 FoodieXpress - Quick and Tasty Food at Your Fingertips

FoodieXpress is a full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) food delivery web application that allows users to select dishes, place orders, and pay securely via **Stripe**.  
The platform offers a seamless and intuitive user experience, with authentication, image uploads, and secure payment processing.

---

## 🚀 Features

- **User Authentication** (JWT-based login & registration)
- **Secure Password Hashing** with bcrypt
- **Food Menu Browsing** and detailed product pages
- **Add to Cart** and checkout functionality
- **Stripe Payment Gateway** integration
- **Image Uploads** with Multer
- **Responsive UI** for mobile and desktop
- **Environment Variable Management** with dotenv

---

## 📦 Tech Stack

**Frontend:**
- React.js  
- Axios  
- CSS

**Backend:**
- Node.js  
- Express.js  
- MongoDB Atlas

**Payment:**
- Stripe API

---

## 🛠 Dependencies

The project uses the following main NPM packages:

| Package | Purpose |
|---------|---------|
| express | Backend server framework |
| mongoose | MongoDB object modeling |
| jsonwebtoken | JWT authentication |
| bcrypt | Password hashing |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| body-parser | Request body parsing |
| multer | File/image uploads |
| stripe | Payment processing |
| nodemon | Development server auto-restart |

---

## 📋 Requirements

- **Node.js** v14+  
- **MongoDB** (local or cloud via MongoDB Atlas)  
- **Stripe account** (for payment processing)  

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sajjadabed910/FoodieXpress
cd FoodieXpress
```

### 2️⃣ Install dependencies for backend
```bash
cd backend
npm install
```

### 3️⃣ Install dependencies for frontend
```bash
cd ../frontend
npm install
```
---

## ▶️ Running the Application Locally

### 1️⃣ Start the Backend Server
```bash
cd backend
npm run server
```
The backend will run on http://localhost:4000

### 2️⃣ Start the Frontend

Open the frontend Folder in Integrated Terminal!

```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

### 3️⃣ Start the Admin Panel

Open the admin Folder in Integrated Terminal!

```bash
cd admin
npm run dev
```
The Admin Panel will run on http://localhost:5173


