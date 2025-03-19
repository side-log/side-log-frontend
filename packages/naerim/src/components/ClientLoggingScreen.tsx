'use client';

import { LoggingScreen } from '@yeaaaah/shared';
import { ScreenParams } from '@yeaaaah/shared/src/logger/hooks/useLogger';
import React, { useEffect, useState } from 'react';

interface Props {
  id: number;
  params: ScreenParams;
  children: React.ReactNode;
}

const ClientLoggingScreen = React.memo(({ id, params, children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return children;
  }

  return (
    <LoggingScreen id={id} params={params}>
      {children}
    </LoggingScreen>
  );
});

ClientLoggingScreen.displayName = 'ClientLoggingScreen';

export { ClientLoggingScreen };
