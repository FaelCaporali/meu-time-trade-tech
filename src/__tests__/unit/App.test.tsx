import App from '../../App';
import {render, screen} from '@testing-library/react';


describe('Basic App tests', () => {
  test('App renders', async () => {
    render(<App />);
    const navbar = await screen.findByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });
});