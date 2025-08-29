# FOODchatbot - AI Food Ordering System

AI-powered food ordering chatbot with dual backend support (Python/FastAPI and Node.js/Express) and modern web interface for seamless food ordering experiences.AI-powered food ordering chatbot with dual backend support (Python/FastAPI and Node.js/Express) and modern web interface for seamless food ordering experiences.

# Features
AI Chatbot: Dialogflow-integrated natural language ordering

Dual Backend: FastAPI (Python) + Express.js (Node.js) options

Real-time Tracking: Live order status updates

Admin Dashboard: Secure order management interface

MySQL Database: Robust data storage with stored procedures

Responsive Design: Mobile-friendly customer interface


# Tech Stack
Frontend: HTML5, CSS3, Dialogflow Messenger

Backend: FastAPI (Python) / Express.js (Node.js)

Database: MySQL with stored procedures

Tools: Ngrok for development tunneling

# Project Structure
```text
FOODchatbot/
├── Backend/                 # Python + Node.js backends
│   ├── main.py             # FastAPI application
│   ├── server.js           # Express.js application
│   ├── db_helper.py        # Database operations
│   └── requirements.txt    # Python dependencies
├── Frontend/               # Customer website
│   ├── index.html          # Main interface
│   └── menu images         # Menu visuals
└── db/
    └── koriji_eatery.sql   # Database schema
```
Clone & Setup

```bash
git clone https://github.com/your-username/FOODchatbot.git
cd FOODchatbot
```
Database Setup

```bash
mysql -u root -p < db/koriji_eatery.sql
Install Dependencies
```
```bash
# Python
pip install -r Backend/requirements.txt

# Node.js
cd Backend
npm install
Run Application
```
```bash
#Python backend
uvicorn main:app --reload

#Node.js backend
npm start

#Frontend 
python -m http.server 8000
```
# 📞 Contact
Developer: Anshul Kori 

Email: anshulkori500@gmail.com 

Phone: +91 88786 53232

