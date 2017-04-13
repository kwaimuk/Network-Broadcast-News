/*jshint esversion: 6 */
const users = [];


const net = require('net');

const server = net.createServer((connection) => {

console.log(`CONNECTED: ${connection.localAddress}:${connection.remotePort}`);
users.push(connection);
connection.write(`Hello there are ${users.length} of Users!`);

  connection.on('data', (data)=> {

    console.log(`SERVER BCAST FROM${connection.localAddress}:${connection.remotePort}: ${data}`);
    for (var i = 0; i < users.length; i++) {
        users[i].write(`${connection.localAddress}:${connection.remotePort}: ${data}`);
        }
      });

  connection.on ('end', () => {
    console.log('connection from client is closed');
  });
});

server.listen(6969,() => {
  console.log('server started on port 6969');
});