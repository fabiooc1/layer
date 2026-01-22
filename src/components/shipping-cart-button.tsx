import { ShoppingBagIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function ShippingCartButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ShoppingBagIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Meu carrinho</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
