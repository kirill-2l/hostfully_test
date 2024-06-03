import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { StateSchema } from './state.schema.ts';
import { createReduxStore } from './store.tsx';

interface StoreProviderProps {
  children: ReactNode;
  initialState?: StateSchema;
}

export const StoreProvider = ({
  children,
  initialState,
}: StoreProviderProps) => {
  const store = createReduxStore(initialState);
  return <Provider store={store}>{children}</Provider>;
};
