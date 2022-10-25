import { Landing } from '../../Pages';
import { render } from '../utils/test-utils';

describe('Landing Page tests', () => {
  it('renders <Landing /> component', async () => {
    const { getByText } = render(<Landing />);
    const landingTest = getByText('Landing Page');
    expect(landingTest).toBeTruthy();
  });
});
