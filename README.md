# 🍔 FoodieXpress - Quick and Tasty Food at Your Fingertips

FoodieXpress is a full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) food delivery web application that allows users to select dishes, place orders, and pay securely via **Stripe**.  
The platform offers a seamless and intuitive user experience, with authentication, image uploads, and secure payment processing.

---

## 🌐 Live Demo

🚀 **Deployed Applications:**
- **Customer App**: [foodie-xpress-ruddy.vercel.app](https://foodie-xpress-ruddy.vercel.app/) - Browse and order food
- **Admin Panel**: [foodie-xpress-admin.vercel.app](https://foodie-xpress-admin.vercel.app/) - Manage orders and menu
- **Backend API**: Deployed on Render - Powers both applications

---

## 🚀 Features

### 🛍️ Customer Features
- **Browse Menu** - Explore food categories and items with detailed descriptions
- **Shopping Cart** - Add/remove items with quantity management
- **User Authentication** - Secure login and registration with JWT
- **Order Placement** - Complete checkout with delivery information
- **Payment Integration** - Secure payments powered by Stripe
- **Order Tracking** - Real-time order status updates
- **Order History** - View past orders and reorder favorite items

### 👨‍💼 Admin Features
- **Food Management** - Add, edit, and delete menu items with image uploads
- **Order Management** - View and update order statuses in real-time
- **Analytics Dashboard** - Monitor sales and order metrics
- **Inventory Control** - Manage food item availability

---

## 📦 Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Payment & External Services
- **Stripe** - Payment processing platform
- **Dotenv** - Environment variable management

---

## 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "Vercel Hosting"
        C[Customer App<br/>foodie-xpress-ruddy.vercel.app<br/>React + Vite]
        A[Admin Panel<br/>foodie-xpress-admin.vercel.app<br/>React + Vite]
    end
    
    subgraph "Backend Services"
        S[Express Server<br/>Render<br/>Node.js]
        DB[(MongoDB Atlas<br/>Cloud Database)]
        ST[Stripe<br/>Payment Gateway]
    end
    
    subgraph "External Services"
        IMG[Image Storage<br/>Multer + File System]
    end
    
    C --> S
    A --> S
    S --> DB
    S --> ST
    S --> IMG
    
    style C fill:#1F1D1D
    style A fill:#260808
    style S fill:#080926
    style DB fill:#26081E
    style ST fill:#082609
```

---

## 📊 Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant S as Server
    participant DB as MongoDB
    participant ST as Stripe
    
    U->>C: Browse Menu
    C->>S: GET /api/food
    S->>DB: Fetch Food Items
    DB-->>S: Return Food Data
    S-->>C: JSON Response
    C-->>U: Display Menu
    
    U->>C: Add to Cart
    C->>S: POST /api/cart/add
    S->>DB: Update User Cart
    
    U->>C: Place Order
    C->>S: POST /api/order/place
    S->>ST: Create Payment Intent
    alt Payment Successful
        ST-->>S: Payment Confirmation
        S->>DB: Save Order
        S-->>C: Order Success
    else Payment Failed
        ST-->>S: Payment Declined
        S-->>C: Order Failed
    end
```

---

## 🗂️ Project Structure

```
food-delivery-app/
├── 📁 backend/                # Backend API
│   ├── 📁 config/             # Database configuration
│   ├── 📁 controllers/        # Business logic
│   ├── 📁 middleware/         # Auth & validation
│   ├── 📁 models/             # Database schemas
│   ├── 📁 routes/             # API endpoints
│   ├── 📁 uploads/            # Food images
│   ├── 📄 server.js           # Main server file
│   └── 📄 .env.example        # Environment template
    └── 📄 package.json
├── 📁 frontend/               # Customer frontend
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   ├── 📁 pages/          # Page components
│   │   ├── 📁 context/        # Global state management
│   │   └── 📁 assets/         # Images & icons
│   └── 📄 package.json
├── 📁 admin/                  # Admin panel
│   ├── 📁 src/
│   │   ├── 📁 components/     # Admin UI components
│   │   └── 📁 pages/          # Admin pages
│   └── 📄 package.json
└── 📄 README.md
└── 📄 package.json
└── 📄 package-lock.json

```

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

---

## Development Environment
```env
JWT_SECRET=random#secret
MONGODB_URI=mongodb+srv://sajjadabed910:20701019@cluster0.jhzyvby.mongodb.net/FoodieXpress
FRONTEND_URL=http://localhost:5173
PORT=4000
```

### Client Environment (.env)
```env
VITE_SERVER_URL=http://localhost:4000
```

### Admin Environment (.env)
```env
VITE_SERVER_URL=http://localhost:4000
```

---

## 🎨 UI Components

### Customer App Components
- **Navbar** - Navigation with cart icon and user menu
- **Header** - Hero section with call-to-action
- **ExploreMenu** - Category-based food filtering
- **FoodDisplay** - Grid layout for food items
- **FoodItem** - Individual food card with add/remove functionality
- **Cart** - Shopping cart with checkout

### Admin Panel Components
- **Sidebar** - Navigation menu for admin functions
- **Add** - Food item creation form
- **List** - Food items management table
- **Orders** - Order status management interface

---

## 🔐 Security Features

- **JWT Authentication** - Secure user sessions
- **Password Hashing** - bcrypt encryption
- **Input Validation** - Server-side validation
- **CORS Protection** - Cross-origin request handling
- **Environment Variables** - Sensitive data protection

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 🙏 Acknowledgements
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Stripe](https://stripe.com/)




