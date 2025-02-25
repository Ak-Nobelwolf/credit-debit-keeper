
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLocalization } from "@/contexts/LocalizationContext";

export const LocalizationSelect = () => {
  const { currency, setCurrency, currencies } = useLocalization();
  const Icon = currency.icon;

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Icon className="w-4 h-4 mr-2" />
            {currency.code}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currencies.map((cur) => {
            const CurrencyIcon = cur.icon;
            return (
              <DropdownMenuItem
                key={cur.code}
                onClick={() => setCurrency(cur)}
              >
                <CurrencyIcon className="w-4 h-4 mr-2" />
                {cur.symbol} {cur.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
