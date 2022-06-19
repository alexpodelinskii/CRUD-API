const db = require('./../db.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFileS } = require('./../utils.js')

const getAllUsers = () => {
    return new Promise((resolve, rejrct) => {
        resolve(db);
    })
}
const findById = (id) => {

    return new Promise((resolve, reject) => {
        let index = 0
        const result = db.find((user, ind) => {
            index = ind;
            return user.id == id;
        });
        resolve([result, index]);
    })
}


function create(user) {

    return new Promise(async (resolve, reject) => {
        const newUser = { id: uuidv4(), ...user }

        db.push(newUser);
        await writeDataToFileS('./db.json', db);
        console.log(db);
        resolve(newUser);
    })
}
function update(user, index) {

    return new Promise(async (resolve, reject) => {

        db.splice(index, 1, user);

        await writeDataToFileS('./db.json', db);
        resolve(user);
    })
}
module.exports = {
    getAllUsers, findById, create, update
}