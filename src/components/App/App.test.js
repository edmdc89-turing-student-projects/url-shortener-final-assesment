import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { getUrls } from '../../apiCalls'

jest.mock('../../apiCalls')

describe('App', () => {
  it('should render without crashing', () => {
    const { getByRole, getByPlaceholderText, getByText } = render(
      <App />
    )

    const appTitle = getByRole('heading', {name: 'URL Shortener'})
    const titleInput = getByPlaceholderText('Title...')
    const newUrlInput = getByPlaceholderText('URL to Shorten...')
    const submitButton = getByRole('button', {name: 'Shorten Please!'})
    const appMessage = getByText('No urls yet! Find some to shorten!')

    expect(appTitle).toBeInTheDocument()
    expect(titleInput).toBeInTheDocument()
    expect(newUrlInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(appMessage).toBeInTheDocument()
  })

  it('should get shortened url from api and render on DOM', async () => {
    getUrls.mockResolvedValue({
      urls: [
        {
          id: 1,
          long_url: "http://some.lengthy.gibberish.com",
          short_url: "http://localhost:3001/useshorturl/1",
          title: "Awesome photo"
        }
      ]
    })

    const { getByRole, getByText } = render(
      <App />
    )
    const urlTitle = await waitFor(() => getByRole('heading', {name: 'Awesome photo'}))
    const shortUrlLink = await waitFor(() => getByRole('link', {name: "http://localhost:3001/useshorturl/1"}))
    const longUrlText = await waitFor(() => getByText("http://some.lengthy.gibberish.com"))

    expect(urlTitle).toBeInTheDocument()
    expect(shortUrlLink).toBeInTheDocument()
    expect(longUrlText).toBeInTheDocument()
  })

})
