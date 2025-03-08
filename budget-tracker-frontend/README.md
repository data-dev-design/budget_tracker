# Budget Tracker

A Django and React-based budget tracking application that allows users to:

- Add income and expenses.
- View a timeline graph of financial history.
- Filter entries by month and year.
- Make entries recurring on a monthly, weekly, or yearly basis.
- Duplicate entries by shifting them forward in time.

## 🛠️ Installation Guide
1. Clone the Repository

```bash
git clone <your-repo-url>
cd budget_tracker
```

2. Backend Setup (Django)
Install Python and Virtual Environment

Make sure you have Python installed. Then create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate     # On Windows
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Apply Migrations and Start the Server

```bash
python manage.py migrate
python manage.py runserver
```

The Django backend will be running at `http://localhost:8000`

3. Frontend Setup (React)

Open a new terminal window and navigate to the frontend directory:

```bash
cd budget-tracker-frontend
```

Install Dependencies

```bash
npm install
```

Start the React Development Server

```bash
npm start
```

The React frontend will be running at http://localhost:3000

## 🚀 Features

- Income & Expense Tracking: Add transactions with descriptions and amounts.
- Interactive Graph: View financial trends over time.
- Filtering: Filter entries by month and year.
- Recurring Transactions: Make transactions repeat automatically.
- Duplicate Entries: Easily copy past transactions to future months.

## 📂 Project Structure

```bash
budget-tracker/
│── budget/                # Django Backend
├── manage.py           # Django Entry Point
├── db.sqlite3          # SQLite Database
├── requirements.txt    # Python Dependencies
│── budget-tracker-frontend/               # React Frontend
│   ├── src/                # React Source Code
│   ├── package.json        # Frontend Dependencies
│   ├── App.js              # Main React Component
│── README.md               # Project Documentation
```

## 🛠 API Endpoints

| Method | Endpoint | Description |
|----------|----------|----------|
GET	| /api/entries/ | Get all budget entries
POST | /api/entries/ | Create a new entry
DELETE | /api/entries/{id}/ | Delete an entry
POST | /api/entries/{id}/make_recurring/ | Make an entry recurring


## 💡 Notes

If you encounter permission errors, try running:

```bash
chmod +x manage.py
```

If React doesn't start, try:

```bash
npm cache clean --force
```

## ✅ Next Steps

- Add authentication (user accounts)
- Export data as CSV or PDF
- Implement a mobile-friendly UI

Happy Budgeting! 🚀