import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import UrlContainer from './UrlContainer'

describe('Url Container', () => {
  const urlList = [
  {
    id: 1,
    long_url: "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
    short_url: "http://localhost:3001/useshorturl/1",
    title: "Awesome photo"
  }, {
    id: 1,
    long_url: "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
    short_url: "http://localhost:3001/useshorturl/2",
    title: "Another Awesome photo"
  }]

  it('should display all url objects get rendered properly', () => {
    const { getByRole } = render(
      <UrlContainer urls={urlList} />
    )

    const firstUrlTitle = getByRole('heading', {name: 'Awesome photo'})
    const firstUrlLink = getByRole('link', {name: "http://localhost:3001/useshorturl/1"})
    const secondUrlTitle = getByRole('heading', {name: 'Another Awesome photo'})
    const secondUrlLink = getByRole('link', {name: "http://localhost:3001/useshorturl/2"})

    expect(firstUrlTitle).toBeInTheDocument();
    expect(firstUrlLink).toBeInTheDocument();
    expect(secondUrlLink).toBeInTheDocument();
    expect(secondUrlTitle).toBeInTheDocument();
  })
})
