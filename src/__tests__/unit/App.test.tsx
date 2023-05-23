import App from '../../App'
import {render, screen} from '@testing-library/react'


describe('Basic App tests', () => {
    test('App renders', async () => {
        render(<App />)
        const btn = await screen.findByRole('button')
        expect(btn.innerHTML).toBe('count is 0');
    })
})