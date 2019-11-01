const Keycloak = require('keycloak-connect')

let keycloakInstance

const init = function (config, keycloakConfig) {
  keycloakInstance = new Keycloak(config, keycloakConfig)
  return keycloakInstance
}

const getKeycloakInstance = function () {
  return keycloakInstance
}

module.exports = {
  init,
  getKeycloakInstance
}
