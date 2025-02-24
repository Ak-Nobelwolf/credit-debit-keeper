
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { useLocalization } from "@/contexts/LocalizationContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { 
    currency, 
    setCurrency, 
    language, 
    setLanguage, 
    currencies, 
    languages 
  } = useLocalization();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          
          <Card className="p-6 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle dark mode on or off
                  </p>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>

              <div className="space-y-3">
                <div className="space-y-0.5">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred language
                  </p>
                </div>
                <Select value={language.code} onValueChange={(code) => {
                  const newLanguage = languages.find(lang => lang.code === code);
                  if (newLanguage) setLanguage(newLanguage);
                }}>
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="space-y-0.5">
                  <Label>Currency</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred currency
                  </p>
                </div>
                <Select value={currency.code} onValueChange={(code) => {
                  const newCurrency = currencies.find(curr => curr.code === code);
                  if (newCurrency) setCurrency(newCurrency);
                }}>
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol} {curr.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Settings;
