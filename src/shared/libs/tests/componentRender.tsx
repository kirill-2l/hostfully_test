import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from '../../../providers/StoreProvider/StoreProvider.tsx';
import { StateSchema } from '../../../providers/StoreProvider/state.schema.ts';

export interface ComponentRenderOptions {
  initialState?: StateSchema;
}

interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
}

export const TestProvider = (props: TestProviderProps) => {
  const { children, options = {} } = props;

  const { initialState } = options;

  return <StoreProvider initialState={initialState}>{children}</StoreProvider>;
};

export function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {},
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
