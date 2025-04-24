# 🍲 MEVN Recipe App – Fullstack CRUD with JWT Authentication
## 📸 Live Demo : https://fullstack-mevn-recipe-app-charif.vercel.app/

🧪 Test Account:
- Admin: admin  / 1234
- User: user1 / 1234

---

## 📚 Features

- ✅ ผู้ใช้เพิ่ม/ลบ/แก้ไขสูตรอาหารของตัวเองได้
- ✅ ผู้ใช้สามารถดูสูตรอาหารทั้งหมดได้
- ✅ ผู้ใช้สามารถดูสูตรอาหารเฉพาะของตัวเองได้
- ✅ แอดมินสามารถเข้าถึงและจัดการสูตรอาหารทั้งหมด
- ✅ ระบบแยก Role (Admin / User)
- ✅ RESTful API เชื่อมต่อระหว่าง Frontend และ Backend
- ✅ Register / Login พร้อมการเข้ารหัสรหัสผ่านด้วย bcrypt
- ✅ ระบบ Token-based Authentication ด้วย JWT
- ✅ Middleware ป้องกันการเข้าถึง route 

  
## 🧰 Tech Stack

| Frontend | Backend | Database | Auth | Deploy |
|----------|---------|----------|------|--------|
| Vue.js (Vite + Composition API) | Node.js + Express | MongoDB + Mongoose | JWT + Bcrypt | Vercel (FE) + Render (BE) |


## 🛠️ Installation

### 1. Backend

```bash
cd backend
npm install
npm run dev
````

สร้างไฟล์ .env ในโฟลเดอร์ backend:
```bash
PORT = 5000
JWT_SECRET = my-secret-key
CONNECTION_STRING = your_mongo_connection_string
````

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
````
สร้างไฟล์ .env ในโฟลเดอร์ frontend:
```bash
VITE_API_URL=http://localhost:5000
````

🔐 Authentication & Authorization
เข้ารหัสรหัสผ่านก่อนเก็บในฐานข้อมูลด้วย bcrypt

ใช้ jsonwebtoken สำหรับการตรวจสอบ Token และสิทธิ์

มี middleware ป้องกัน route ที่ต้อง login และเช็ค role ของผู้ใช้

## 🧪 API Overview

### 📦 Recipe Routes (`/api/recipe`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET    | `/`                  | ดูสูตรทั้งหมด (public) | Public |
| POST   | `/`                  | เพิ่มสูตรใหม่ | Authenticated Users |
| GET    | `/my`                | ดูสูตรของผู้ใช้คนนั้น | Authenticated Users |
| GET    | `/:id`               | ดูสูตรตาม ID | Public |
| PUT    | `/:id`               | แก้ไขสูตร | Owner only |
| DELETE | `/:id`               | ลบสูตร | Owner only |
| GET    | `/admin`             | ทดสอบ route เฉพาะแอดมิน | Admin only |
| GET    | `/user`              | ทดสอบ route user + admin | Admin & User |

### 🔐 Auth Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST   | `/register`          | สมัครสมาชิก | Public |
| POST   | `/login`             | เข้าสู่ระบบ | Public |

🔐 Middleware ที่ใช้
verifyToken – ตรวจสอบ JWT Token

authorizeRole("admin") – ตรวจสอบว่าเป็นแอดมิน

authorizeRole("admin", "user") – ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าใช้งาน


## 🚧 Future Improvements
- เพิ่มการรีวิวสูตรอาหารจากผู้ใช้
- เพิ่มการค้นหาสูตรตามหมวดหมู่
- รองรับการอัพโหลดรูปภาพสำหรับสูตรอาหาร



