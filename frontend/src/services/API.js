export function APIGet(resource, errorCallback, dataCallback, query = null) {
  const endpoint = new URL(`${process.env.REACT_APP_API_BASE_URL}/${resource}/`)

  if (query !== null) {
    const queryParams = new URLSearchParams(query)
    endpoint.search = queryParams.toString()
  }

  const r = fetch(endpoint)

  r.then(response => {
    if (response.status <= 300) {
      response.json().then(dataCallback)
    }
    else {
      response.json().then((data) => {
        errorCallback(response.status, data)
      })
    }
  })
}
