import axios from 'axios'
const baseUrl = `http://rskseo.pythonanywhere.com`

let token = null

const setToken = newToken => {
  token = newToken
}

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/client/registration/`, credentials )
  return response.data
}

const activate = async (credentials) => {
  const response = await axios.post(`${baseUrl}/client/activate/`, credentials )
  return response.data
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/client/login/`, credentials)
  return response.data
}

const getServices = async (branchId) => {
  const response = await axios.get(`${baseUrl}/branch/services/${branchId}`)
  return response.data
}

// const getServices = async () => {
//   const response = await axios.get(`${baseUrl}/base/services/`)
//   return response.data
// }

const getBranches = async () => {
  const response = await axios.get(`${baseUrl}/branch/list/`)
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

const mainService = { setToken, login, getServices, getBranches, chosen, printDocuments, register, activate }

export default mainService