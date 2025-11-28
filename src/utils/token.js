const tokenName = 'hootToken'

export const setToken = (token) => {
  localStorage.setItem(tokenName, token)
}

export const getToken = () => {
  return localStorage.getItem(tokenName)
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

export const getUserFromToken = () => {
  // 1. get token from local storage
  const token = getToken()
  // 2. if there is not token, return null
  if (!token) return null
  // 3. Get the middle payload string from the token
  const payloadString = token.split('.')[1]
  // 4. Decode from b64, using the `atob()` method - this will give us back a JSON string containing our user info
  const payloadJSON = atob(payloadString)
  // 5. Use `JSON.parse()` to convert the JSON string to a JS object
  const { user, exp } = JSON.parse(payloadJSON)
  // 6. Before returning the user, check expiry has not passed
  if (exp < Date.now() / 1000) {
    // Remove token from storage so it can't be used again as it has expired
    removeToken()
    return null
  }
  // 7. If we're happy, we'll return the user object to set to state
  return user
}