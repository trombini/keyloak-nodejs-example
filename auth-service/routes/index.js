var express = require('express')
var router = express.Router()

const keycloak = require('../services/keycloak').getKeycloakInstance()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.get('/secure', keycloak.protect(), (req, res) => {
  const { given_name : firstName } = req.kauth.grant.id_token.content
  res.render('secure', { firstName })
})

router.get('/admin', keycloak.protect(), (req, res) => {
  const { given_name : firstName } = req.kauth.grant.id_token.content
  res.render('admin', { firstName })
})

module.exports = router
