/*jshint esversion: 6 */
const users = [];


const net = require('net');

const server = net.createServer((connection) => {

  console.log(`CONNECTED: ${connection.localAddress}:${connection.remotePort}`);
  users.push(connection);
  connection.write(`Hello there are ${users.length} of Users!`);
  connection.write(" Type /username to make a username");

  // connection.once('data', (data)=> {
  //   connection.name = data.toString().trim();
  // });

  connection.on('data', (data)=> {

    console.log(`SERVER BCAST FROM${connection.localAddress}:${connection.remotePort}: ${data}`);
    const defaultName = `${connection.localAddress}:${connection.remotePort}`;

    let displayName =connection.name;

    if(connection.name===undefined){
       displayName = defaultName;
    }
      const words=data.toString();
      const userNameTrimmed = words.slice(0,9);

    if(userNameTrimmed === '/username'){
      console.log("watup");
      const userNameTrims = words.slice(9);
      console.log(userNameTrims);
      connection.name= userNameTrims;
    }

    for (var i = 0; i < users.length; i++) {
      if(users[i].remotePort !== connection.remotePort){
                users[i].write(`${displayName}: ${data}`);
              }
            }
          });


  connection.on ('end', () => {
    console.log('connection from client is closed');
  });
});

server.listen(6969,() => {
  console.log('server started on port 6969');
});