# Hawkeye - Financial Fraud Detection Platform

Hawkeye is an advanced financial fraud detection platform designed to protect businesses from fraudulent transactions. The platform leverages AI and machine learning to provide real-time fraud detection, comprehensive analytics, and actionable insights to help businesses save millions in potential losses.

## Features

### 🔍 Fraud Detection
- **AI-Powered Detection**: Machine learning models (Random Forest) analyze transactions in real-time
- **Transaction Monitoring**: Continuous monitoring of payment, transfer, cash-in, cash-out, and debit transactions
- **Risk Scoring**: Automated risk assessment for each transaction
- **Fraud Categories**: Detection across multiple fraud types and patterns

### 📊 Analytics Dashboard
- **Real-time Metrics**: Track total transactions, fraud detected, risk scores, and active alerts
- **Interactive Charts**: Visualize fraud trends, transaction volumes, risk distribution, and fraud by category
- **Activity Feed**: Monitor recent transactions and alerts
- **Custom Reports**: Generate detailed fraud detection reports

### 🔐 Authentication & Security
- **Multiple Login Methods**: 
  - Google Sign-In
  - Ethereum Wallet Authentication
  - Aptos Wallet Authentication
- **Secure Session Management**: Firebase-based authentication with custom tokens
- **User Profiles**: Manage account settings and preferences

### 💬 AI Chatbot
- **Hawkeye Chatbot**: AI-powered financial copilot powered by Google Gemini
- **Fraud Insights**: Get guidance on fraud trends, risk mitigation, and compliance
- **Real-time Assistance**: Interactive chatbot for financial fraud queries

### 💳 Pricing & Subscriptions
- **Flexible Plans**: Starter, Professional, and Enterprise tiers
- **Mock Payment Gateway**: Integrated payment processing for subscription management
- **Billing Options**: Monthly and annual billing with savings on annual plans
- **Feature Comparison**: Transparent feature comparison across plans

### 🚨 Alerts & Notifications
- **Multi-channel Alerts**: Email, SMS, and push notifications
- **Real-time Alerts**: Instant notifications for suspicious transactions
- **Alert Management**: View and manage fraud alerts from the dashboard

## Tech Stack

### Frontend
- **Framework**: Next.js 16.0.3
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts 3.4.1
- **Authentication**: Firebase 11.0.0

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.21.1
- **Authentication**: Firebase Admin SDK 13.0.0
- **Blockchain**: Ethers.js 6.13.0 (for wallet authentication)
- **CORS**: CORS middleware for cross-origin requests

### Machine Learning
- **API Framework**: FastAPI
- **ML Library**: scikit-learn
- **Model**: Random Forest Classifier
- **Data Processing**: NumPy, Pandas
- **Model Persistence**: Joblib

### AI Integration
- **Chatbot**: Google Gemini 2.5 Flash API

### Infrastructure
- **Database**: Firebase (Firestore)
- **Hosting**: Vercel-ready (Next.js)
- **API Server**: Uvicorn (for FastAPI)

## Project Structure

```
kodekalesh-2025/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app router pages
│   │   ├── dashboard/        # Analytics dashboard
│   │   ├── pricing/         # Pricing plans page
│   │   ├── profile/          # User profile page
│   │   └── login/            # Login page
│   ├── components/           # React components
│   │   ├── Chatbot/          # Hawkeye chatbot
│   │   ├── Dashboard/        # Dashboard components
│   │   ├── Profile/          # Profile components
│   │   └── login/            # Login components
│   ├── lib/                  # Utility libraries
│   └── public/               # Static assets
├── backend/                  # Node.js backend server
│   └── auth/                 # Authentication server
│       ├── server.js         # Express server
│       └── auth.js            # Auth handlers
└── Fraud-Detection/          # ML fraud detection service
    ├── app.py                # FastAPI application
    ├── model/                # ML model files
    └── requirements.txt      # Python dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Firebase project with authentication enabled
- Google Gemini API key (for chatbot)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
FIREBASE_ADMIN_SDK_PATH=path/to/serviceAccountKey.json
PORT=3001
```

4. Start the server:
```bash
npm start
```

### ML Service Setup

1. Navigate to the Fraud-Detection directory:
```bash
cd Fraud-Detection
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Ensure the model file (`model4_random_forest.pkl`) is in the directory.

5. Run the FastAPI server:
```bash
uvicorn app:app --reload --port 8000
```

## API Endpoints

### Authentication API
- `POST /api/auth/wallet` - Wallet-based authentication (Ethereum/Aptos)

### Fraud Detection API
- `GET /health` - Health check endpoint
- `POST /predict` - Predict fraud probability for a transaction

### Request Example (Fraud Detection)
```json
{
  "step": 1,
  "type": "PAYMENT",
  "amount": 1499.43,
  "oldbalanceOrg": 0.00,
  "oldbalanceDest": 0.00
}
```

### Response Example
```json
{
  "prediction": 0,
  "probabilities": [0.95, 0.05]
}
```

## Payment Gateway

The platform includes a **mock payment gateway** for subscription management. The payment gateway supports:
- Credit/Debit cards
- UPI payments
- Bank transfers
- Invoice-based payments (Enterprise)

*Note: This is a mock implementation for demonstration purposes.*

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email support@hawkeye.com or open an issue in the repository.

---

Built with ❤️ by the Hawkeye team

