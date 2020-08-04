import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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
  it('should keep track of changes on the input', () => {
    const { getByRole, getByPlaceholderText } = render(
      <UrlForm />
    )

    const titleInput = getByPlaceholderText('Title...')
    const newUrlInput = getByPlaceholderText('URL to Shorten...')

    fireEvent.change(titleInput, {target: {value: 'New Url'}})
    fireEvent.change(newUrlInput, {target: {value: 'http://some.lengthy.miscellaneous.url.com'}})

    expect(titleInput.value).toMatch('New Url')
    expect(newUrlInput.value).toMatch('http://some.lengthy.miscellaneous.url.com')
  })
})
