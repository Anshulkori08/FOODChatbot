FOODchatbot - AI Food Ordering System

AI-powered food ordering chatbot with dual backend support (Python/FastAPI and Node.js/Express) and modern web interface for seamless food ordering experiences.AI-powered food ordering chatbot with dual backend support (Python/FastAPI and Node.js/Express) and modern web interface for seamless food ordering experiences.

Features
AI Chatbot: Dialogflow-integrated natural language ordering

Dual Backend: FastAPI (Python) + Express.js (Node.js) options

Real-time Tracking: Live order status updates

Admin Dashboard: Secure order management interface

MySQL Database: Robust data storage with stored procedures

Responsive Design: Mobile-friendly customer interface


Tech Stack
Frontend: HTML5, CSS3, Dialogflow Messenger
Backend: FastAPI (Python) / Express.js (Node.js)
Database: MySQL with stored procedures
Tools: Ngrok for development tunneling

Project Structure
FOODchatbot/
├── Backend/           # Both Python and Node.js implementations
├── Frontend/          # Customer-facing website
├── db/               # Database schema and data
└── External Libraries/

Clone & Setup
[clone.sh](https://github.com/user-attachments/files/22051863/clone.sh)
git clone https://github.com/your-username/FOODchatbot.git
cd FOODchatbot

Database Setup[Database Setup.sh](https://github.com/user-attachments/files/22051882/Database.Setup.sh)
mysql -u root -p < db/koriji_eatery.sql
