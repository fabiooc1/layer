import Link from "next/link";
import { ShippingCartButton } from "./shipping-cart-button";
import { ToggleThemeButton } from "./toggle-theme-button";
import { UserDropdown } from "./user-dropdown";

export function Header() {
  const isLogged = false;

  return (
    <header className="sticky top-0 z-40 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="flex justify-between items-center py-4 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-8 md:gap-12">
          <Link href="/" className="group">
            <h1 className="font-extrabold text-3xl">Layer</h1>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {!isLogged ? (
            <Link
              href="/authentication"
              className="text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
            >
              Entrar
            </Link>
          ) : (
            <UserDropdown />
          )}

          <div className="flex items-center gap-1 md:gap-2 border-l border-slate-200 dark:border-slate-800 pl-3 md:pl-4">
            <ToggleThemeButton />
            <ShippingCartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
