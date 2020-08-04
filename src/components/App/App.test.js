import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import { getUrls, shortenNewUrl } from '../../apiCalls'

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
    getUrls.mockResolvedValueOnce({
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

  it('should get shortened url from api and render on DOM', async () => {
    shortenNewUrl.mockResolvedValueOnce({
      id: 1,
      long_url: "http://some.lengthy.gibberish.com",
      short_url: "http://localhost:3001/useshorturl/1",
      title: "New Url"
    })

    const {
      getByRole,
      getByText,
      getByPlaceholderText,
      findByRole,
      findByText
    } = render(
      <App />
    )

    const appMessage = getByText('No urls yet! Find some to shorten!')
    expect(appMessage).toBeInTheDocument()

    const titleInput = getByPlaceholderText('Title...')
    const newUrlInput = getByPlaceholderText('URL to Shorten...')
    const submitButton = getByRole('button', {name: 'Shorten Please!'})

    fireEvent.change(titleInput, {target: {value: 'New Url'}})
    fireEvent.change(newUrlInput, {target: {value: "http://some.lengthy.gibberish.com"}})
    fireEvent.click(submitButton)

    const urlTitle = await findByRole('heading', {name: 'New Url'})
    const shortUrlLink = await findByRole('link', {name: "http://localhost:3001/useshorturl/1"})
    const longUrlText = await findByText("http://some.lengthy.gibberish.com")

    expect(urlTitle).toBeInTheDocument()
    expect(shortUrlLink).toBeInTheDocument()
    expect(longUrlText).toBeInTheDocument()
  })
})
