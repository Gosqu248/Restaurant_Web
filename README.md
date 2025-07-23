# 🍽️ Restaurant_Web – Fullstack Web App for Restaurants

Restaurant_Web is a fullstack monorepo application tailored for modern restaurants. It provides a seamless customer and administrator experience, enabling everything from menu browsing and ordering to secure payments and admin product/order management. The system is containerized using Docker and reverse-proxied via NGINX for efficient deployment.
- Project from December 2024
---

## 🧩 Architecture Overview

This monorepo contains:

- **Frontend** – Angular SPA for customers and admins (port `4200`)
- **Backend** – Spring Boot REST API (port `8080`)
- **Database** – PostgreSQL
- **Reverse Proxy** – NGINX (port `80`) handling route forwarding
- **Docker Compose** – Orchestrates all services

---

## 🚀 Key Features

### 👥 Customer Panel

- Responsive UI for **menu browsing**
- **Food ordering system**
- **PayU** integration for secure payments
- **Google OAuth2** login and traditional email login with **2FA** and account lockout
- **Address management** and **order history**

### 🛠️ Admin Panel

- Add/edit/remove products (images saved as BLOBs in DB)
- Manage all customer orders in real time

---

## 🛠️ Tech Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Frontend   | Angular, Angular Material, SCSS, tsParticles |
| Backend    | Spring Boot, Java 21, JPA, JWT, OAuth2, Mail |
| Database   | PostgreSQL                                   |
| Payments   | PayU Sandbox                                 |
| Deployment | Docker, Docker Compose, NGINX                |

---

## 🧪 Security

- **JWT**-based stateless authentication
- **Two-Factor Authentication (2FA)** via email
- **Account lockout** after 5 failed login attempts
- **OAuth2** login via Google

---

## 📁 Repository Structure

```
.
├── backend/           # Spring Boot backend
├── frontend/          # Angular frontend
├── nginx/             # NGINX reverse proxy
├── docker-compose.yml # Multi-container deployment
└── README.md
```

---

## 🧰 How to Run Locally (Using Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/Gosqu248/Restaurant_Web.git
cd Restaurant_Web
```

### 2. Build and Start All Services

```bash
docker-compose up --build
```

This will:
- Build the **Angular frontend**
- Build the **Spring Boot backend**
- Start **NGINX**, **Maildev**

Then open your browser at:  
🔗 `http://localhost`

> 🔒 All frontend API calls are routed to `/api/**` and proxied to the backend via NGINX.

---

## 🌐 NGINX Configuration

The NGINX server serves the frontend on `/` and proxies:

- `/api/**` → `backend:8080`

It also handles CORS and preflight OPTIONS requests.

Example config snippet:
```nginx
location /api {
    rewrite ^/api/?(.*)$ /$1 break;
    proxy_pass http://backend:8080;
    add_header 'Access-Control-Allow-Origin' $http_origin always;
    
}
```

---

## 🔑 Environment Configuration

Backend properties (`application.properties`) include:

- Google OAuth2 client and secret
- PostgreSQL URL and schema
- PayU credentials
- Maildev for email testing
- JWT expiration and 2FA mail settings

---

## 💡 Tips

- Admin and customer panels are both integrated in the Angular app, shown based on user roles.
- Email testing is enabled through MailDev at:  
  🔗 `http://localhost:1080`

---

## ✨ UI Libraries

### tsParticles

The project uses **tsParticles** to create beautiful particle effects (e.g., for landing pages or backgrounds). It's highly customizable and adds an interactive, visually appealing layer to the user experience without impacting performance.

- Documentation: [https://particles.js.org/](https://particles.js.org/)
- Configurable via Angular services and JSON options

### Angular Material

The frontend is styled with **Angular Material**, providing:

- Prebuilt and responsive UI components (buttons, dialogs, tooltips, etc.)
- Accessibility features and mobile-friendly design
- Consistent look and feel across the application

> Angular Material enables fast development of modern and clean UIs with full integration into Angular’s reactive forms and routing systems.
