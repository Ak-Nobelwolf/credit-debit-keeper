
# Finance Management Application

A comprehensive finance management application built with React, TypeScript, and Supabase for backend services. This application helps users manage their finances by tracking income, expenses, and providing financial calculators.

![Finance Dashboard](https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60)

## Live Demo

Visit the live application at: [Finance App - Credit and Debit Keeper](https://ak-nobelwolf.github.io/credit-debit-keeper/)

## Features

### Authentication
- Secure user registration and login with email/password
- Password reset functionality
- Protected routes for authenticated users

![Authentication Screen](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60)

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

![Dashboard Overview](https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60)

### Financial Calculators
- Loan Calculator: Calculate monthly payments, total payments, and total interest
- Savings Calculator: Project savings growth with regular deposits
- Currency Converter: Convert between different currencies

![Financial Calculators](https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60)

### Profile Management
- User profile customization
- Account settings

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

![Tech Stack](https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60)

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

## Key Features In Detail

### Transaction Management
Users can add, view, and filter financial transactions. Each transaction includes:
- Type (income/expense)
- Amount
- Description
- Category
- Date

![Transaction Management](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60)

### Financial Calculators
The application includes three specialized calculators:
1. **Loan Calculator**: Users can calculate loan payments by entering:
   - Loan amount
   - Interest rate
   - Loan term
   
2. **Savings Calculator**: Projects future savings growth based on:
   - Initial deposit
   - Regular contributions
   - Interest rate
   - Time period

3. **Currency Converter**: Converts between different currencies with up-to-date exchange rates

### Responsive Design
The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## Security Features

- JWT-based authentication
- Row Level Security in database
- Password strength validation
- Secure password reset flow

## Future Enhancements

- Budget planning tools
- Expense categorization with charts
- Financial goals tracking
- Investment portfolio management
- Bill reminders and recurring transactions
