
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
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency, currencies } = useLocalization();

  const handleCurrencyChange = (code: string) => {
    const newCurrency = currencies.find(curr => curr.code === code);
    if (newCurrency) {
      setCurrency(newCurrency);
      toast.success(`Currency changed to ${newCurrency.name}`);
    }
  };

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
                  <Label>Currency</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred currency
                  </p>
                </div>
                <Select value={currency.code} onValueChange={handleCurrencyChange}>
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => {
                      const Icon = curr.icon;
                      return (
                        <SelectItem key={curr.code} value={curr.code}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{curr.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
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
