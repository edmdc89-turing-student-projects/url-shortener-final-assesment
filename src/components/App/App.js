import React, {useState, useEffect} from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App() {
  const [urls, setUrls] = useState([])
  const [error, setError] = useState({})

  useEffect(() => {
    const findShortenedUrls = async() => {
      try {
        const { urls } = await getUrls()
        setUrls(urls)
      } catch (err) {
        setError({...err})
      }
    }
    findShortenedUrls()
  })

    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm />
        </header>

        <UrlContainer urls={urls}/>
      </main>
    );
  }

export default App;
