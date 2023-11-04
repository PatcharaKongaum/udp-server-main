const http = require('http');
const socket = require('socket.io');
const path = require("path");
const fileSystem = require("fs");

const requestHandler = (req, response) => {
	const filePath = path.join(__dirname, 'index.html');
	const stat = fileSystem.statSync(filePath);

	response.writeHead(200, {
		'Content-Type': 'text/html',
		'Content-Length': stat.size
	});

	var readStream = fileSystem.createReadStream(filePath);
	readStream.pipe(response);
}

const httpServer = http.createServer(requestHandler);
const io = socket(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

io.on('connection', (socket) => {

});

httpServer.listen(8081, () => {
	const address = httpServer.address();
	const port = address.port;
	const ip = address.address;
	const ipVersion = address.family;
	console.log(`HTTP-Server is listening at ${ip}(${ipVersion}) on port ${port}`);
});

httpServer.on('error', (err) => {
	console.error(err);
});




module.exports = io;