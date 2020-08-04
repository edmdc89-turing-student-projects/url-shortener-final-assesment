export const getUrls = async () => {
  const response = await fetch('http://localhost:3001/api/v1/urls')

  if(response.ok) {
    return response.json()
  }
}

export const shortenNewUrl = async (url, title) => {
  const apiUrl = 'http://localhost:3001/api/v1/urls'
  const requestBody = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: { title, long_url: url }
  }
  const response = await fetch(apiUrl, requestBody)

  if(response.ok) {
    return response.json()
  }
}
