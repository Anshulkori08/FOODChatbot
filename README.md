FOODchatbot - AI-Powered Food Ordering System

FOODchatbot is a full-stack web application that combines an AI-powered chatbot interface with a traditional food ordering system. Built with modern technologies, it provides customers with an intuitive way to browse menus, place orders, and track deliveries through natural language conversations.

🚀 Key Features
AI-Powered Ordering: Dialogflow-integrated chatbot for natural language order processing

Dual Backend Support: Both FastAPI (Python) and Express.js (Node.js) implementations

Real-time Order Tracking: Live order status updates and management

Admin Dashboard: Secure admin interface for order monitoring and customer management

Responsive Frontend: Mobile-friendly interface with menu browsing and contact forms

MySQL Database: Robust data storage with stored procedures and functions

🛠️ Technology Stack
Frontend
HTML5/CSS3 with responsive design

Dialogflow Messenger for chatbot interface

Google Fonts (Roboto) for typography

Backend Options
Python/FastAPI: High-performance async API with MySQL connector

Node.js/Express: RESTful API with middleware security (Helmet, CORS, Rate Limiting)

Database
MySQL with stored procedures and custom functions

Database helper utilities for both Python and Node.js

Deployment & Tools
Ngrok for secure tunneling during development

Environment configuration management

📁 Project Structure
text
FOODchatbot/
├── Backend/
│   ├── main.py                 # FastAPI application (Python)
│   ├── db_helper.py           # MySQL database operations (Python)
│   ├── generic_helper.py      # Utility functions
│   ├── server.js              # Express.js application (Node.js)
│   ├── new_server.js          # Alternative Express.js implementation
│   ├── admin.html             # Admin dashboard interface
│   ├── package.json           # Node.js dependencies
│   ├── requirements.txt       # Python dependencies
│   └── backend.env            # Environment variables template
├── Frontend/
│   ├── index.html             # Main customer interface
│   ├── banner.jpg             # Hero banner image
│   ├── menu1.jpg              # Menu page 1
│   ├── menu2.jpg              # Menu page 2
│   └── menu3.jpg              # Menu page 3
├── db/
│   └── koriji_eatery.sql      # Database schema and sample data
└── External Libraries/        # Additional dependencies
🚦 Getting Started
Prerequisites
Python 3.8+ and Node.js 16+

MySQL Server 8.0+

Git

Installation
Clone the repository

bash
git clone https://github.com/your-username/FOODchatbot.git
cd FOODchatbot
Set up the database

bash
mysql -u root -p < db/koriji_eatery.sql
Configure environment variables

bash
cp Backend/backend.env Backend/.env
# Edit .env with your database credentials
Install Python dependencies

bash
pip install -r Backend/requirements.txt
Install Node.js dependencies

bash
cd Backend
npm install
Running the Application
Option 1: Python/FastAPI Backend

bash
cd Backend
uvicorn main:app --reload
Option 2: Node.js/Express Backend

bash
cd Backend
npm start
# or for development
npm run dev
Serve the Frontend

bash
# Using Python HTTP server
cd Frontend
python -m http.server 8000

# Using Node.js serve
npx serve Frontend
Access the application at http://localhost:8000 (frontend) and API at http://localhost:8000/api/ (backend).

🔧 Configuration
Database Setup
Update the database connection settings in either:

db_helper.py (Python) or

server.js (Node.js)

Default configuration:

Host: localhost

Database: pandeyji_eatery

User: root

Password: Set your MySQL password

Dialogflow Integration
Update the Dialogflow agent ID in Frontend/index.html:

html
<df-messenger
  agent-id="YOUR-AGENT-ID-HERE"
  ...>
</df-messenger>
📊 API Endpoints
FastAPI (Python) Endpoints
POST / - Main webhook for Dialogflow fulfillment

Order management endpoints through Dialogflow intents

Express.js (Node.js) Endpoints
GET /api/health - Health check

POST /api/contact - Contact form submission

GET /api/submissions - Admin access to submissions (Basic Auth protected)

GET /admin - Admin dashboard

👥 Admin Access
The admin dashboard is available at /admin with Basic Authentication:

Default username: admin

Default password: password123

Update these credentials in the environment variables for production use.

🗃️ Database Schema
Key tables include:

food_items - Menu items with prices

orders - Order records with quantities

order_tracking - Order status tracking

Stored procedures:

insert_order_item - Adds items to orders

get_total_order_price - Calculates order totals

get_price_for_item - Retrieves item pricing

🔒 Security Features
Helmet.js for security headers

CORS configuration

Rate limiting on contact form submissions

Basic authentication for admin routes

Environment variable protection for credentials

SQL injection prevention through parameterized queries

🤖 Dialogflow Integration
The chatbot handles several intents:

order.add - Add items to current order

order.remove - Remove items from order

order.complete - Finalize and place order

track.order - Check order status

🚀 Deployment
Production Considerations
Update all environment variables for production

Use process manager (PM2 for Node.js, Gunicorn for Python)

Set up proper SSL certificates

Configure database connection pooling

Implement proper logging and monitoring

Set up backup procedures for database

Using Ngrok for Testing
bash
./ngrok.exe http 8000
📈 Future Enhancements
Payment gateway integration

Real-time notifications (WebSockets)

Mobile application

Advanced analytics dashboard

Multi-language support

Integration with food delivery platforms

Inventory management system

Customer loyalty programs

👨‍💻 Development Team
Anshul Kori - Full Stack Developer

Contact: anshulkori500@gmail.com

Phone: +91 88786 53232

📄 License
This project is proprietary software. All rights reserved.

🆘 Support
For technical support or questions about this application, please contact:

Email: anshulkori500@gmail.com

Issue tracking: GitHub Issues (if public repository)

