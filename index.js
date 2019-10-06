/**
* Primary file for the API
*/

// Dependencies
var http = require('http')
var url = require('url')
var StringDecoder = require('string_decoder').StringDecoder

//  The server should respond to all request with a string
var server = http.createServer(function (req, res) {
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url, true)

    // Get the path
    var path = parsedUrl.pathname
    var trimedPath = path.replace(/^\/+|\/+$/g,'')

    // Get the query string as an object
    var queryStringObject = parsedUrl.query

    // Get the HTTP method
    var method = req.method.toLowerCase()

    // Get the headers as an object
    var headers = req.headers

    // Get the playload, if any
    var decoder = new StringDecoder('utf-8')
    var buffer = ''
    req.on('data', function (data) {
        buffer += decoder.write(data)
    })
    req.on('end', function () {
        buffer += decoder.end()
        // The request has finished
        // Send the response
        res.end('Hello World!\n')
        console.log('Request recieved wwith this playload: ', buffer)
        // Log the request path
        console.log('Request received on path: '+trimedPath+' - Method: '+method+' and with these query parameters', queryStringObject)
        console.log('Headers of the request', headers)
    })
})

// Start the server, and have it listen on port 3000
server.listen(3000, function () {
    console.log('The server is listening on port 3000 now')
    
})