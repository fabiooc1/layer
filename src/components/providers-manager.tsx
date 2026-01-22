import { ThemeProvider } from "./theme-provider";

interface ProvidersHandleProps {
  children: React.ReactNode;
}

export function ProvidersManager({ children }: ProvidersHandleProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
