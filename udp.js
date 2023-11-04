const udp = require('dgram');

// Creates a UDP socket
const udpServer = udp.createSocket('udp4');

// Emits when any error occurs
udpServer.on('error', (error) => {
  console.log('Error: ' + error);
  udpServer.close();
});

// Emits when socket is ready and listening for datagram messages
udpServer.on('listening', () => {
  const address = udpServer.address();
  const port = address.port;
  const ip = address.address;
  const ipVersion = address.family;
  console.log(`UDP-Server is listening at ${ip}(${ipVersion}) on port ${port}`);
});

// Emits after the socket is closed
udpServer.on('close', () => console.log('Socket is closed !'));

module.exports = udpServer;