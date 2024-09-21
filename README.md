
# Certificate Management System (CMS)

The Certificate Management System (CMS) is a web-based application designed for managing and verifying certificates. It allows administrators to upload certificates in bulk using Excel files, manage (update/delete) certificate records, and allows users to search for their certificates using a unique certificate ID. Users can view and download their certificates directly from the system.

# 📜 Project Summary

In the CMS:

Admins can upload certificates in bulk through Excel files, update, or delete certificates.
Users can search for their certificates by entering a unique certificate ID, view their certificate, and download it.
The application includes secure authentication and role-based authorization, where only admins have access to certificate management features, while both users and admins can view certificates.




## 📜 Project Features

- Admins can upload certificates in bulk through Excel files, update, or delete certificates.
- Users can search for their certificates by entering a unique certificate ID, view their certificate, and download it.

- The application includes secure authentication and role-based authorization, where only admins have access to certificate management features, while both users and admins can view certificates.

## 🔧 Building Stack:
- Frontend: React.js, Tailwind CSS, Material UI, Redux, Redux-Toolki
- Backend: Node.js, Express
- Database: MongoDB
- Version Control: Git

## 🛣️ API Reference

#### Authentication Endpoints (/auth):
- Register a new user (Admin/User):

```http
POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email address |
| `password` | `string` | **Required**. Password for authentication|
| `role` | `string` | **Optional**. Role of the user (admin, user) |

- User Login (Admin/User)

```http
POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Email address |
| `password` | `string` | **Required**. Password for authentication|

- Get All Users (Admin Only)

```http
GET /auth/all-users
```

#### Certificate Endpoints (/certificate):

- Upload Certificate (Admin Only)

```http
POST /certificate/upload-certificate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file` | `file` | **Required**. Excel file containing certificates to upload |

- ### Excel file contains
   - certificateId
   - studentName
   - internshipDomain
   - startDate
   - endDate


- Get All Certificates (Admin Only)

```http
GET /certificate/all-certificates
```

- Get Certificate by ID (Admin/User)

```http
GET /certificate/:certificate_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `certificate_id` | `string` | **Required**. Unique ID of the certificate |


```http
PATCH /certificate/:certificate_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `certificate_id` | `string` | **Required**. Unique ID of the certificate (this is databse generate unique id) |


```http
DELETE /certificate/:certificate_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `certificate_id` | `string` | **Required**. Unique ID of the certificate (this is databse generate unique id) |


#### This reference provides a clear structure for API endpoints, including the necessary parameters and descriptions for each route in the Certificate Management System

## 🚀 Installation & Setup

### Backend Setup (Node.js & Express)

- #### Clone the repository:

```bash
  git clone https://github.com/your-repo/certificate-management-system.git
```

- #### Navigate to the backend folder:

```bash
  cd certificate-management-system/backend
```


- #### Install the required dependencies:

```bash
  npm install
```


- #### Create a .env file in the root of your backend directory and add the following:

```bash
  PORT=5000
  MONGO_URI=your-mongodb-connection-string
  JWT_SECRET=your-jwt-secret
```


- #### Start the backend server:

```bash
  npm start
```
    
## 🤝 Contributions


### We welcome contributions to improve the project! Here's how you can get involved:

 #### 1. Fork the project.
 #### 2. Create a new feature branch:

```bash
  git checkout -b my-new-feature
```

 #### 3. Make your changes.
 #### 4. Commit your changes:.

 
```bash
  git commit -m "Add some feature"
```

#### 5. Push to the branch.

```bash
git push origin my-new-feature
```

#### 6. Open a pull request.

##### Feel free to reach out if you want to improve the project. Contributions are welcome! 😊
