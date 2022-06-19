const db = require('./../models/model.js');
const { isCorrectId, isCorrectUser } = require('./../utils')
async function getAllUsers(req, resp) {

    try {
        const users = await db.getAllUsers();
        resp.writeHead(200, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify(users))
    } catch (error) {
        resp.writeHead(500, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify({ message: "Server error!" }))
    }

}
async function getUserById(req, resp, id) {

    try {

        const [user] = await db.findById(id);

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
        resp.writeHead(500, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify({ message: "Server error!" }))
    }

}
async function addUser(req, resp) {

    try {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            if (body !== '') {
                const { username, age, hobbies } = JSON.parse(body);
                const user = { username, age, hobbies };

                if (!isCorrectUser(user)) {
                    resp.writeHead(400, { 'Content-Type': 'application/json' })
                    resp.end(JSON.stringify({ message: "User not saved: not all required fields have been entered or some field is incorrect" }))
                } else {
                    const newUser = await db.create(user);
                    resp.writeHead(201, { 'Content-Type': 'application/json' })
                    resp.end(JSON.stringify(newUser))
                }
            } else {
                resp.writeHead(400, { 'Content-Type': 'application/json' })
                resp.end(JSON.stringify({ message: "User not saved: not all required fields have been entered or some field is incorrect" }))
            }

        })


    } catch (error) {
        resp.writeHead(500, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify({ message: "Server error!" }))
    }

}

async function updateUserById(req, resp, id) {

    try {
        const [user, index] = await db.findById(id);
        if (!isCorrectId(id)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ message: "ID is invalid" }))
        } else if (!user) {
            resp.writeHead(404, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ message: "User Not Found" }))
        } else {

            try {
                let body = ''
                req.on('data', (chunk) => {
                    body += chunk.toString()
                })
                req.on('end', async () => {
                    if (body !== '') {
                        const { username, age, hobbies } = JSON.parse(body);
                        const newData = { username, age, hobbies };

                        if (!isCorrectUser(newData)) {
                            resp.writeHead(400, { 'Content-Type': 'application/json' })
                            resp.end(JSON.stringify({ message: "User doesn't update: not all required fields have been entered or some field is incorrect" }))
                        } else {
                            newData.id = id;
                            const newUser = await db.update(newData, index);
                            resp.writeHead(201, { 'Content-Type': 'application/json' })
                            resp.end(JSON.stringify(newUser))
                        }
                    } else {
                        resp.writeHead(400, { 'Content-Type': 'application/json' })
                        resp.end(JSON.stringify({ message: "User doesn't update: not all required fields have been entered or some field is incorrect" }))
                    }
                })

            } catch (error) {
                resp.writeHead(500, { 'Content-Type': 'application/json' })
                resp.end(JSON.stringify({ message: "Server error!" }))
            }

        }

    } catch (error) {
        resp.writeHead(500, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify({ message: "Server error!" }))
    }

}

async function deleteUserById(request, resp, id) {

    try {
        const [user, index] = await db.findById(id);
        if (!isCorrectId(id)) {
            resp.writeHead(400, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ message: "ID is invalid" }))
        } else if (!user) {
            resp.writeHead(404, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ message: "User Not Found" }))
        } else {
            await db.deleteUser(id);
            resp.writeHead(201, { 'Content-Type': 'application/json' })
            resp.end(JSON.stringify({ message: "User deleted sucsessfull" }))
        }

    } catch (error) {
        resp.writeHead(500, { 'Content-Type': 'application/json' })
        resp.end(JSON.stringify({ message: "Server error!" }))
    }

}
module.exports = {
    getAllUsers, getUserById, addUser, updateUserById, deleteUserById
}