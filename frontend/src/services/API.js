//TODO: Reutilize most of the shared code between HTTP codes

const getJWT = function() {
  const jwt = window.localStorage.getItem('jwt')

  if(jwt === null) {
    return null
  }

  return JSON.parse(jwt).token
}

const getAuthHeaders = function() {
  const headers = {}
  const jwt = getJWT()

  if (jwt !== null) {
    headers['Authorization'] = `JWT ${getJWT()}`
  }

  headers['Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone

  return headers
}

export function APIGet(resource, errorCallback, dataCallback, query = null) {
  const headers = getAuthHeaders()
  const endpoint = new URL(`${process.env.REACT_APP_API_BASE_URL}/v1/${resource}/`)

  if (query !== null) {
    const queryParams = new URLSearchParams(query)
    endpoint.search = queryParams.toString()
  }

  const r = fetch(
    endpoint,
    {
      headers: headers
    }
  )

  r.then(response => {
    if (response.status === 401) {
      // TODO: this probably needs proper handling
      // right now when server responds with unauthorized we're just
      // dumping jwt and user and reloading the page
      window.localStorage.removeItem('jwt')
      window.localStorage.removeItem('user')
      window.location.reload()
    }
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

export function APIPost(resource, postData, errorCallback, successCallback) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders()
  }

  const r = fetch(
    `${process.env.REACT_APP_API_BASE_URL}/v1/${resource}/`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData)
    }
  )
  //.catch(error)
  r.then(response => {
    if (response.status === 401) {
      // TODO: this probably needs proper handling
      // right now when server responds with unauthorized we're just
      // dumping jwt and user and reloading the page
      window.localStorage.removeItem('jwt')
      window.localStorage.removeItem('user')
      window.location.reload()
    }
    if (response.status <= 300) {
      response.json().then(successCallback)
    }
    else {
      response.json().then((data) => {
        errorCallback(response.status, data)
      })
    }
  })
}

export function APIPut(resource, postData, errorCallback, successCallback) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders()
  }

  const r = fetch(
    `${process.env.REACT_APP_API_BASE_URL}/v1/${resource}/`,
    {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(postData)
    }
  )
  //.catch(error)
  r.then(response => {
    if (response.status === 401) {
      // TODO: this probably needs proper handling
      // right now when server responds with unauthorized we're just
      // dumping jwt and user and reloading the page
      window.localStorage.removeItem('jwt')
      window.localStorage.removeItem('user')
      window.location.reload()
    }
    if (response.status <= 300) {
      response.json().then(successCallback)
    }
    else {
      response.json().then((data) => {
        errorCallback(response.status, data)
      })
    }
  })
}

export function APIPatch(resource, postData, errorCallback, successCallback) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders()
  }

  const r = fetch(
    `${process.env.REACT_APP_API_BASE_URL}/v1/${resource}/`,
    {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(postData)
    }
  )
  //.catch(error)
  r.then(response => {
    if (response.status === 401) {
      // TODO: this probably needs proper handling
      // right now when server responds with unauthorized we're just
      // dumping jwt and user and reloading the page
      window.localStorage.removeItem('jwt')
      window.localStorage.removeItem('user')
      window.location.reload()
    }
    if (response.status <= 300) {
      response.json().then(successCallback)
    }
    else {
      response.json().then((data) => {
        errorCallback(response.status, data)
      })
    }
  })
}

export function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log(error);
    };
}
