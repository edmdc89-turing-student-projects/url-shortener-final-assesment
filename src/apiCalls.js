export const getUrls = async () => {
  const response = await fetch('http://localhost:3001/api/v1/urls')

  if(response.ok) {
    return response.json()
  }
}

export const shortenNewUrl = async (url, title) => {
  const apiUrl = 'http://localhost:3001/api/v1/urls'
  const requestBody = { title, long_url: url }
  const request = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestBody)
  }
  const response = await fetch(apiUrl, request)

  console.log(response, 'whats wrong')
  if(response.ok) {
    return response.json()
  }
}
