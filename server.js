const port = process.env.PORT || 8081;

const udp = require('./udp');
const webSocket = require('./ws');

// Start UDP server
udp.bind(port);

// Emits on new datagram message
udp.on('message', (msg, info) => webSocket.emit('message', msg.toString()));