var express = require('express')
var router = express.Router()

const authUrl = 'http://localhost:3000/oauth/workspace'

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/start', (req, res) => {
  res.redirect(`${authUrl}?source=desktop-app&version=1.1`)
})

module.exports = router
