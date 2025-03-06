# Finance Management Application

A comprehensive finance management application built with React, TypeScript, and Supabase for backend services. This application helps users manage their finances by tracking income, expenses, and providing financial calculators.

## Live Demo

Visit the live application at: [https://lovable.dev/projects/bbd17021-f3f8-4333-9c3e-ff3d9f7d6b85](https://lovable.dev/projects/bbd17021-f3f8-4333-9c3e-ff3d9f7d6b85)

Or check out the GitHub Pages deployment: [https://yourusername.github.io/credit-debit-keeper/](https://yourusername.github.io/credit-debit-keeper/)

## Features

### Authentication
- Secure user registration and login with email/password
- Password reset functionality
- Protected routes for authenticated users

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

### Financial Calculators
- Loan Calculator: Calculate monthly payments, total payments, and total interest
- Savings Calculator: Project savings growth with regular deposits
- Currency Converter: Convert between different currencies

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.
