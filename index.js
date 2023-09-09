import http from 'node:http'

const PORT = 8000

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World!!!!!!!!!')
  })
  .listen(PORT)

console.log(`Server running at http://localhost:${PORT}/`)
console.log('Hello World')
