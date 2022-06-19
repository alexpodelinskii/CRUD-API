const db = require('./../db.json');
const { v4: uuidv4 } = require('uuid');

const getAllUsers = () => {
    return new Promise((resolve, rejrct) => {
        resolve(db);
    })
}
const findById = (id) => {

    return new Promise((resolve, reject) => {
        const result = db.find(user => user.id == id);
        resolve(result);
    })
}
module.exports = {
    getAllUsers, findById
}