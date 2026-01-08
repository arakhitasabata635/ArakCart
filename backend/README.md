# ArakCart Backend

## 🚀 Overview

ArakCart Backend is the server-side application for the ArakCart e-commerce platform built with **Node.js**, **Express.js**, and **MongoDB**. It provides secure REST APIs for authentication, products, cart, orders, and integrates payment processing via **Stripe**.

---

## 🧠 Key Features

✔ JWT Authentication  
✔ Role-Based Access (User, Seller, Admin)  
✔ RESTful API Design  
✔ Stripe Payment Integration  
✔ Cloudinary Image Upload  
✔ Production-ready API responses  

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| MongoDB | Database |
| JWT | Authentication |
| Stripe | Payment |
| Cloudinary | Image hosting |
| Git | Version control |

---

## 📁 Folder Structure

backend/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
└── server.js


---

## 🔐 Authentication

- Users, sellers, and admins authenticate using JWT tokens
- Role-based protected routes
- Refresh tokens and secure password hashing

---

## 💳 Stripe Integration

- Supports secure payments
- Handles Stripe webhooks
- Order creation after successful payment

---

## 📦 Installation

1. Clone the repo:

```bash
git clone https://github.com/arakhitasabata635/ArakCart.git
cd ArakCart/backend

Install dependencies:
npm install
Create .env file with:
PORT=
MONGO_URI=
JWT_SECRET=
STRIPE_KEY=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Run server:

npm start

API Endpoints (Summary)
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/products	List products
POST	/api/cart	Add to cart
POST	/api/checkout	Stripe payment

📦 Models
. User
. Product
. Cart
. Order
Created by Arakhita Sabata
Portfolio:https://arakport.vercel.app
Email: work.arakhita@gmail.com

