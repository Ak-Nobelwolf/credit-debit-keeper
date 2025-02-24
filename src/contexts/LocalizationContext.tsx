
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface Language {
  code: string;
  name: string;
}

interface LocalizationContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  formatCurrency: (amount: number) => string;
  currencies: Currency[];
  languages: Language[];
}

const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
];

const languages: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
  { code: "hi", name: "हिन्दी" },
];

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('preferredCurrency');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return currencies[0];
      }
    }
    return currencies[0];
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return languages[0];
      }
    }
    return languages[0];
  });

  useEffect(() => {
    localStorage.setItem('preferredCurrency', JSON.stringify(currency));
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', JSON.stringify(language));
    document.documentElement.lang = language.code;
  }, [language]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language.code, {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <LocalizationContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        formatCurrency,
        currencies,
        languages,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};
