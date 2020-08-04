import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

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
})
