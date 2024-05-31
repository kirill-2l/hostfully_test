import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store } from './store.tsx';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
