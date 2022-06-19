require('dotenv').config();
const http = require('http');
const { getAllUsers, getUserById, addUser, updateUserById, deleteUserById } = require('./controllers/controller.js')

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
    } else if (request.url.match(/\/api\/users\//) && request.method === 'DELETE') {
        const id = request.url.split('/')[3];
        deleteUserById(request, response, id);
    } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Wrong path' }));
    }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server started in port: ${PORT}`))