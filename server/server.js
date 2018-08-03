const fs = require('fs')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./server/db.json')
const userdb = JSON.parse(fs.readFileSync('./server/db.json', 'UTF-8'))


server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'
const expiresIn = '1h'


// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function getAuthenticated({email, password}){
  return userdb.users.find(user =>
    (user.email === email && user.password === password)
      ? user
      : null
  )
}

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body
  if (!getAuthenticated({email, password})) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  res.status(200).json({
    access_token: access_token,
    user: getAuthenticated({email, password})
  })
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})

server.use(router);

server.listen(3000, () => {
  console.log('Run Auth API Server')
})


