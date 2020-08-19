const https = require('https')
const http = require('http')
const express = require('express');
const fs = require('fs');
const util = require('util');
const { ExpressPeerServer } = require('peer');

const app = express();
app.get('/', (req, res, next) => res.send('Hello world!'));

const httpsOptions = {
    key: fs.readFileSync(__dirname + '/key.pem', "utf-8"),
    cert: fs.readFileSync(__dirname + '/cert.pem', "utf-8")
}

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp'
});

peerServer.on('connection', (client) => {
    console.log('Connect =>  ' + client.id);
    // console.log(util.inspect(client, {depth: null}));
});

peerServer.on('disconnect', (client) => {
    console.log('Disconnect => ' + client.id);
    // console.log(util.inspect(client, {depth: null}));
});

app.use('/peerjs', peerServer);


server.listen(9000, () => {
    console.log('Peer Server listening on 9000');
});

