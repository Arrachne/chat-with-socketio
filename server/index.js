const {server, port} = require('./server.js');

// starting server
server.listen(port, () => console.log(`Listening on port ${port}`));
