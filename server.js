const http = require('http');
const { getAllUsers, getUserById, addUser, updateUserById } = require('./controllers/controller.js')

const server = http.createServer((request, response) => {

    if (request.url === '/api/users' && request.method === 'GET'
        || request.url === '/api/users/' && request.method === 'GET'
    ) {
        getAllUsers(request, response);

    } else if (request.url === '/api/users' && request.method === 'POST'
        || request.url === '/api/users/' && request.method === 'POST') {
        addUser(request, response);

    } else if (request.url.match(/\/api\/users\//) && request.method === 'GET') {
        const id = request.url.split('/')[3];
        getUserById(request, response, id);
    } else if (request.url.match(/\/api\/users\//) && request.method === 'PUT') {
        const id = request.url.split('/')[3];
        updateUserById(request, response, id);
    } else {
        console.log(request.url);
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Not found' }));
    }
});

const PORT = 8000;

server.listen(PORT, () => console.log('Server started'))