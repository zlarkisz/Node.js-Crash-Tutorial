const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set heder content type
  res.setHeader('Content-Type', 'text/html')

  let path = './views/'

  switch (req.url) {
    case '/':
      path += 'index.html'
      res.statusCode = 200
      break
    case '/about':
      path += 'about.html'
      res.statusCode = 200
      break
    case '/about-me':
      res.setHeader('Location', '/about')
      res.statusCode = 301
      res.end()
      break
    default:
      path += '404.html'
      res.statusCode = 404
      break
  }

  // send html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // res.write(data)
      res.end(data)
    }
  })
})

server.listen(3000, 'localhost', () => {
  console.log('Listening for requesr on port 3000');
})