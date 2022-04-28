import {render, screen, fireEvent} from '@testing-library/react'
import moment from 'moment';
import { Dashboard } from './dashboard';
import { rest } from 'msw';
import {server} from '../../mocks/server';

const setup = () => render(<Dashboard />)

describe('Dashboard', () => {
    it('the app should show the Picture of the Day', async () => {
        setup()
        const dayOfToday = moment(new Date()).format("YYYY-MM-DD");
        const imgResult = await screen.findByRole('img', {altText: dayOfToday})
        expect(imgResult).toBeInTheDocument();
        
    })
    it('the app should show the picture of the day for the given date when the user selects a date', async () => {
        setup()
        const input = await screen.findByLabelText(/fecha/i)
        fireEvent.change(input, {target: {value: '2021-02-12'}})
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        const imgResult = await screen.findByRole('img', {altText: '2021-02-12'})
        expect(input.value).toMatch(regex)
        expect(imgResult).toBeInTheDocument();
    })
    it('the app should show a message: "There was an error, please try again." when the app fetches the API, and there is an unexpected error,', async () => {
        server.use(
            rest.get("https://api.nasa.gov/planetary/apod", (req, res, ctx) => {
              return res.once(
                ctx.status(500),
                ctx.json({
                  error: "error"
                })
              );
            })
        );
        setup();
        const msgUnexError = await screen.getByText(/There was an error, please try again./i);
        expect(msgUnexError).toBeInTheDocument();
    })
    it('the app should show a message from the API response when the user selects an invalid date value ', async () => {
        setup()
        const firstMsgError = screen.queryByText(/Date must be between Jun 16, 1995 and Apr 27, 2022./i)
        expect(firstMsgError).not.toBeInTheDocument();
        const input = await screen.findByLabelText(/fecha/i)
        fireEvent.change(input, {target: {value: '2024-02-12'}})
        const msgError = screen.getByText(/Date must be between Jun 16, 1995 and Apr 27, 2022./i)
        expect(msgError).toBeInTheDocument();
    })
})