const db = require('./../models/model.js');

async function getAllUsers(req, resp) {

    try {
        const users = await db.getAllUsers();
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify(users))
    } catch (error) {
        console.log(error);
    }

}
async function getUserById(req, resp, id) {

    try {
        const user = await db.findById(id);
        if (!user) {
            resp.writeHead(404, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ message: "User Not Found" }))
        } else {
            resp.writeHead(200, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify(user))
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getAllUsers, getUserById
}