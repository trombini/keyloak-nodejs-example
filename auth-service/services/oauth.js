const authServerUrl = 'http://localhost:8081'
const scope = 'openid'

// http://localhost:8081/auth/realms/acme/protocol/openid-connect/auth?
//  client_id=auth-demo
//  state=0b64dce3-51f0-4579-99a0-074a05c7a667
//  redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsecured%3Fauth_callback%3D1&
//  scope=openid&response_type=code
const oauthEndpointUrl = ({ realmId, clientId, redirectUri, responseType }) => {
  const params = [
    `client_id=${clientId}`,
    `redirect_uri=${redirectUri}`,
    `scope=${scope}`,
    `response_type=${responseType}`
  ]
  return `${authServerUrl}/auth/realms/${realmId}/protocol/openid-connect/auth?${params.join('&')}`
}

const getRealmByWorkspace = (workspace) => {
  return 'acme'
}

module.exports = {
  oauthEndpointUrl,
  getRealmByWorkspace
}
