import axios from 'axios'
const baseUrl = `http://rskseo.pythonanywhere.com`

let token = null

const setToken = newToken => {
  token = newToken
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/base/terminal/login/`, credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/base/services/`)
  return response.data
}

const chosen = async newObject => {
  const objectToSend = {...newObject, auth_token: token}

  const response = await axios.post(`${baseUrl}/base/terminal/queue/`, objectToSend)
  return response.data
}

const printDocuments = async serviceName => {
  const response = await axios.post(`${baseUrl}/documents`, serviceName)
  return response.data
}

const mainService = { setToken, login, getAll, chosen, printDocuments }

export default mainService