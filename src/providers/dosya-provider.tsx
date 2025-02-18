import React, { useEffect } from 'react';
import { useDosyaStore } from '../stores/dosya-store';
import config from '../dosya-config-loader';

type ConfigProviderProps = {
  children: React.ReactNode;
};

export const DosyaProvider = ({ children }: ConfigProviderProps) => {
  const store = useDosyaStore();

  useEffect(() => {
    store.config.set(config);
  }, [store.config.set]);

  return children;
};
