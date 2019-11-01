const axios = require('axios')



const authServerUrl = 'http://localhost:8081'

const headers = () => {
  return {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const url = (realmId) => `${authServerUrl}/auth/realms/${realmId}/protocol/openid-connect/token`

const refreshAccessToken = ({ refreshToken, realmId }) => {
  const body = [
    `grant_type=refresh_token`,
    `client_id=desktop-app`,
    `refresh_token=${refreshToken}`
  ]

  return axios.post(url(realmId), body.join('&'), headers())
    .then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
    })
}

const exchangeCodeWithToken = ({ code, realmId }) => {
  const body = [
    `code=${code}`,
    `grant_type=authorization_code`,
    `client_id=desktop-app`,
    `redirect_uri=http://localhost:3001/oauth/callback` //`redirect_uri=starmind://oauth/callback`
  ]

  return axios.post(url(realmId), body.join('&'), headers())
    .then(response => {
      return response.data
    }).catch(error => {
      console.log(error)
    })
}

module.exports = {
  exchangeCodeWithToken,
  refreshAccessToken
}
