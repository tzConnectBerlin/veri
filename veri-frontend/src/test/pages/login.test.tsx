import { Login } from '../../Pages';
import { render } from '../utils/test-utils';

describe('Login Page tests', () => {
  it('renders <Login /> component', async () => {
    const { getByText } = render(<Login />);
    const loginText = getByText('VERI Admin Login');
    expect(loginText).toBeTruthy();
  });
  // it('should show validation on blur', async () => {
  //   const { getByLabelText, getByTestId } = render(<Login />);

  //   const input = getByLabelText('Email');
  //   fireEvent.blur(input);

  //   await waitFor(() => {
  //     expect(getByTestId('emailError')).not.toBe(null);
  //     expect(getByTestId('emailError')).toHaveTextContent('Required');
  //   });
  // });
});
