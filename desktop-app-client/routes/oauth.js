const express = require('express')
const oauth = require('../services/oauth')

const router = express.Router()

// GET /oauth/callback
router.get('/callback', function(req, res, next) {
  const { code } = req.query
  const realmId = 'acme'

  oauth.exchangeCodeWithToken({ code, realmId }).then(result => {
    const refreshToken = result['refresh_token']
    return oauth.refreshAccessToken({ refreshToken, realmId }).then(result => {
      // console.log(result)
    })
  }).finally(() => {
    res.render('index', { title: 'Express' })
  })
})

module.exports = router
