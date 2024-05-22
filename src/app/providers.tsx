import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <NextUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </NextUIProvider>
  );
}
