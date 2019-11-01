const express = require('express')
const debug = require('debug')('app:oauth')

const oauth = require('../services/oauth')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.get('/workspace', (req, res, next) => {
  const { source, version } = req.query
  res.render('workspace', { source, version })
})

router.post('/workspace', (req, res) => {
  const { workspace } = req.body

  const realmId = oauth.getRealmByWorkspace(workspace)
  const clientId = 'desktop-app'
  const redirectUri = 'http://localhost:3001/oauth/callback'
  const responseType = 'code'

  const redirectUrl = oauth.oauthEndpointUrl({ realmId, clientId, redirectUri, responseType })
  res.redirect(redirectUrl)
})

module.exports = router
