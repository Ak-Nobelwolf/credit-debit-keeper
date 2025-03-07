

# Finance Management Application

A comprehensive finance management application built with React, TypeScript, and Supabase for backend services. This application helps users manage their finances by tracking income, expenses, and providing financial calculators.

![Finance Dashboard](/public/lovable-uploads/60b10a31-aa3d-432a-91f9-f261020ba81d.png)

## Live Demo

Visit the live application at: [Finance App - Credit and Debit Keeper](https://ak-nobelwolf.github.io/credit-debit-keeper/)

## Features

### Authentication
- Secure user registration and login with email/password
- Password reset functionality
- Protected routes for authenticated users

![Authentication Screen](/public/lovable-uploads/d2f7f242-668c-4503-9f22-96a7eeda5f48.png)

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

![Dashboard Overview](/public/lovable-uploads/e9c35175-8403-4a98-8ccb-042249589854.png)

### Financial Calculators
- Loan Calculator: Calculate monthly payments, total payments, and total interest
- Savings Calculator: Project savings growth with regular deposits
- Currency Converter: Convert between different currencies

![Financial Calculators](/public/lovable-uploads/23faeec7-f4ea-4c78-aaa1-e867546db587.png)

### Profile Management
- User profile customization
- Account settings

![Profile Screen](/public/lovable-uploads/86a31502-6363-4825-a9ef-9781c537ff4f.png)

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

![Transaction Management](/public/lovable-uploads/67c4f24b-c8fa-4316-b8af-ac7dd8ead104.png)

### Financial Analytics
The application provides detailed analytics to help users understand their spending patterns:
- Income vs. expenses comparison
- Spending by category
- Savings trend over time

![Financial Analytics](/public/lovable-uploads/b614e392-9703-4bf2-84ed-93535ef14c91.png)

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

## Additional Features

### Settings and Customization
Users can customize their experience with:
- Light/dark mode toggle
- Currency preference selection
- Notification settings

![Settings Screen](/public/lovable-uploads/1a1a2496-a745-4584-94f6-9f712437a762.png)

### Contact Us
Easy communication with support team through a built-in contact form:

![Contact Screen](/public/lovable-uploads/14e021c5-17ab-43fc-a4d6-a30b78b40913.png)

## Future Enhancements

- Budget planning tools
- Expense categorization with charts
- Financial goals tracking
- Investment portfolio management
- Bill reminders and recurring transactions

