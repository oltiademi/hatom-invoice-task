# Installation and Setup Guide

## Prerequisites
Ensure you have the following installed:

- **Node.js** (LTS version recommended) - [Download](https://nodejs.org/)
- **MongoDB** (local or cloud-based via MongoDB Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (for version control) - [Download](https://git-scm.com/)
- **Postman** (optional, for API testing) - [Download](https://www.postman.com/)

## Project Setup

### 1. Clone the Repository
git clone <repository-url>
cd <project-folder>
or use GitHub Desktop

### 2. Install Dependencies
npm install


### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
PORT=3000
MONGO_URI=mongodb://localhost:27017/invoice_db  # Update if using MongoDB Atlas
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=smtp.example.com  # Configure your email provider
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password (for gmail use App Passwords)

### 4. Run MongoDB Locally (If Not Using Atlas)
Ensure MongoDB is running:

Alternatively, if using **MongoDB Atlas**, update `MONGO_URI` with the connection string.

### 5. Start the Server
npm start or node index.js

The server should now be running on `http://localhost:3000` or whatever port you specify in the .env variable.

## API Endpoints
Refer to `docs/api-documentation.md` (or Postman collection) for details on available endpoints.

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - Login and receive a JWT token

### CRUD Operations
#### Invoices
- `POST /api/v1/invoices/create` - Create an invoice
- `GET /api/v1/invoices/all` - Get all invoices
- `GET /api/v1/invoices?invoiceNumber=` - Get a specific invoice
- `PUT /api/invoices/:id` - Update an invoice
- `DELETE /api/invoices/:id` - Delete an invoice

#### Clients
- `POST /api/v1/clients/create`
- `GET /api/v1/clients/all`
- `GET /api/v1/clients/:businessId`
- `PUT /api/v1/clients/:businessId`
- `DELETE /api/v1/clients/:businessId`

#### Services
- `POST /api/v1/services/create`
- `GET /api/v1/services/all`
- `GET /api/v1/services/:serviceId`
- `PUT /api/v1/services/:serviceId`
- `DELETE /api/v1/services/:serviceId`


## Documentation
- **Swagger UI**: `http://localhost:5000/api-docs`

