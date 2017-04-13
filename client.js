/*jshint esversion: 6 */

const net = require('net');

const client = net.connect ({port: 6969}, () => {
  client.on('data',(data) => {
    console.log(data.toString());
  });

process.stdin.on('data',(data) => {
 client.write(data.toString());
  });

    client.on ('end', () => {
    console.log('connection from server closed');
  });

});