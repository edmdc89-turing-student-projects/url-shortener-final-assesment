import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import UrlForm from './UrlForm'

describe('Url form', () => {
  it('should have inputs for a title, url, and button for submit', () => {
    const { getByRole, getByPlaceholderText } = render(
      <UrlForm />
    )

    const titleInput = getByPlaceholderText('Title...')
    const newUrlInput = getByPlaceholderText('URL to Shorten...')
    const submitButton = getByRole('button', {name: 'Shorten Please!'})

    expect(titleInput).toBeInTheDocument()
    expect(newUrlInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
