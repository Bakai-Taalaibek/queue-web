import axios from 'axios'
const baseUrl = `http://rskseo.pythonanywhere.com`

let refresh_token = null

const setRefreshToken = newToken => {
  refresh_token = `${newToken}`
}

const setAccessToken = async (token ) => {
  const refreshToken = { refresh_token: token }

  const response = await axios.post(`${baseUrl}/client/token/refresh/`, refreshToken)

  const accessToken = `Bearer ${response.data.access_token}`
  return accessToken
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

const getBranches = async () => {
  const response = await axios.get(`${baseUrl}/branch/list/`)
  return response.data
}

const enqueue = async newObject => {
  const accessToken = await setAccessToken(refresh_token)
  const config = {
    headers: { Authorization: accessToken },
  }

  const response = await axios.post(`${baseUrl}/talon/`, newObject, config)
  return response.data
}

const removeTicket = async ticketId => {
  const accessToken = await setAccessToken(refresh_token)
  const config = {
    headers: { Authorization: accessToken },
  }

  const response = await axios.delete(`${baseUrl}/client/talon-delete/${ticketId}`, config)
  return response.data
}

const getMyTickets = async () => {
  const accessToken = await setAccessToken(refresh_token)
  const config = {
    headers: { Authorization: accessToken },
  }

  const response = await axios.get(`${baseUrl}/client/talons/`, config)
  return response.data
}

const printDocuments = async serviceName => {
  const response = await axios.post(`${baseUrl}/documents`, serviceName)
  return response.data
}

const mainService = { 
  removeTicket, 
  setRefreshToken, 
  login, 
  getServices, 
  getBranches, 
  enqueue, 
  printDocuments, 
  register, 
  activate, 
  getMyTickets 
}

export default mainService