const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const Keycloak = require('./services/keycloak')

const app = express()

// session and keycloak setup
var memoryStore = new session.MemoryStore()
app.use(session({
  secret:'secrret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}))

// keycloak setup
const keycloak = Keycloak.init({ store: memoryStore }, {
  "realm": "acme",
  "auth-server-url": "http://localhost:8081/auth",
  "ssl-required": "external",
  "resource": "auth-demo",
  "public-client": true,
  "confidential-port": 0
})
app.use(keycloak.middleware())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./routes/index')
const oauthRouter = require('./routes/oauth')
app.use('/', indexRouter)
app.use('/oauth', oauthRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
