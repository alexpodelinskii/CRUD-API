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
        if (!isCorrectId(id)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ message: "ID is invalid" }))
        } else if (!user) {
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




function isCorrectId(id) {
    if (id.length !== 36) return false;
    const regexp = (/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/);
    if (!regexp1.test(id)) return false;
    return true;
}

module.exports = {
    getAllUsers, getUserById
}