
# Finance Management Application

A comprehensive finance management application built with React, TypeScript, and Supabase for backend services. This application helps users manage their finances by tracking income, expenses, and providing financial calculators.

![Home Screen](/public/Home%20Page.png)

## Overview

This application offers an all-in-one solution for personal finance management, allowing users to:
- Track income and expenses
- Analyze spending patterns
- Use financial calculators for loans, savings, and currency conversion
- Manage their user profile
- Customize application settings

## Features

### Authentication
- Secure user registration and login with email/password
- Password reset functionality
- Protected routes for authenticated users

![Authentication Screen](/public/Login%20Page.png)
![SignUp Screen](/public/Create%20Account%20Page.png)

### Dashboard
- Overview of financial status with key metrics:
  - Total balance
  - Monthly income
  - Monthly expenses
  - Savings rate
- Transaction management:
  - Add new income/expense transactions
  - View transaction history
  - Filter transactions by category and type
  - Sort transactions by date, amount, or category

![Dashboard Overview](/public/Dashboard%20Page.png)

### Financial Analytics
The application provides detailed analytics to help users understand their spending patterns:
- Income vs. expenses comparison
- Spending by category
- Savings trend over time

![Financial Analytics](/public/Analytics%20Page.png)

### Financial Calculators
Three specialized calculators to assist with financial planning:
1. **Loan Calculator**: Calculate monthly payments, total payments, and total interest
2. **Savings Calculator**: Project savings growth with regular deposits
3. **Currency Converter**: Convert between different currencies

![Financial Calculators](/public/Calculators%20Page.png)

### Profile Management
- User profile customization
- Account settings
- Profile picture upload

![Profile Screen](/public/Profile%20Page.png)

### Settings
- Light/dark mode toggle
- Currency preference selection

![Settings Screen](/public/Settings%20Page.png)

### Contact Support
- Easy communication with support team through a built-in contact form

![Contact Screen](/public/Contact%20Us%20Page.png)

## Technology Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- React Router for navigation
- Framer Motion for animations
- Tanstack React Query for data fetching

### Backend
- Supabase for authentication and database
- PostgreSQL database with Row Level Security
- Real-time data synchronization

## Live Demo

Visit the live application at: [Finance App - Credit and Debit Keeper](https://ak-nobelwolf.github.io/credit-debit-keeper/)

## Getting Started

### Prerequisites
- Node.js & npm installed

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Deployment

### GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy your application
3. Your application will be available at `https://[your-username].github.io/[repository-name]/`

### Manual Deployment

To deploy manually:

```sh
npm run build
```

The built files will be in the `dist` directory, which can be deployed to any static hosting service.

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/contexts` - React context providers
  - `/hooks` - Custom React hooks
  - `/integrations` - Third-party service integrations (Supabase)
  - `/lib` - Utility functions
  - `/pages` - Application pages

## Future Enhancements

- Budget planning tools
- Expense categorization with more detailed charts
- Financial goals tracking
- Investment portfolio management
- Bill reminders and recurring transactions
