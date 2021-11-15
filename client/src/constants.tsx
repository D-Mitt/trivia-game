let baseUrl = ""
if (process.env.REACT_APP_API_BASE_URL) {
  baseUrl = process.env.REACT_APP_API_BASE_URL
}

export const BASE_URL = baseUrl
