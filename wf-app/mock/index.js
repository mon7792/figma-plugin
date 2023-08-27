const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080



let svgResp = [{
    id: "1234",
    name: "Coffee Time",
    url: "http://127.0.0.1:8080/svg/coffee.svg"
},
{
    id: "5678",
    name: "Expecting it",
    url: "http://127.0.0.1:8080/svg/expecting.svg"
},
{
    id: "9012",
    name: "Love It",
    url: "http://127.0.0.1:8080/svg/love.svg"
},
{
    id: "3456",
    name: "Walking",
    url: "http://127.0.0.1:8080/svg/walk.svg"
}]

let keys = {
  rKey: "read-dummy-key",
  wKey: "write-dummy-key"
}

let user = {
  key: "auth-key",
  authenticated: true
}

app.use(cors())
app.use('/svg', express.static('svg'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send('{"login":true}')
})

app.get('/keys', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(keys)
})

app.get('/keys/status', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  setTimeout((() => {
    res.send(user)
  }), 2000)
  
})

// generate get content in the body and return list of svg images
app.post('/generate', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(svgResp))
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})