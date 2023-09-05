/*
We want to separate our app logic from actually running the app in production - you would want to use something else that is more robusts such as unitech - but each app has its own best way to do it - so it really depends on each app
*/
const { normalize } = require('path');
const app = require('../app');
const http = require('http');
const debug = require('debug')('exer:server')
// define a port for the server to listen to and it is convention of setting it in the .env file
const port= normalizePort(process.env.PORT) || 3000;
app.set('port', port);
/*
    Create a http server
*/

const server = http.createServer(app);

// listen on provided port on all network interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// normalize a port into a number, string, or false

function normalizePort(val){
    var port = parseInt(val, 10);
    if(isNaN(port)){
        return val;
    }
    if(port>=0){
        return port;
    }
    return false;
}
// error event
function onError(error){
    if(error.syscall!=='listen'){
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;
    switch(error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default: throw error;
    }
}
// listen event for the server
function onListening(){
    const addr = server.address();
    var bind = typeof port === 'string' ? 'Pipe' + addr : 'Port' + addr;
    debug('Listening on ', bind);
}