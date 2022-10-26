import App from '../app';
import { render } from './utils/test-utils';

describe('Smoke Test', () => {
  it('renders <App /> component', async () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
