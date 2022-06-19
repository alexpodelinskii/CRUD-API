const fs = require('fs');

async function writeDataToFileS(fileName, user) {
    await fs.writeFile(fileName, JSON.stringify(user), { 'encoding': 'utf-8' }, (error) => {
        if (error) {
            console.log(error);
        }
    })
}

function isCorrectId(id) {
    if (id.length !== 36) return false;
    const regexp = (/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/);
    if (!regexp.test(id)) return false;
    return true;
}

function isCorrectUser(user) {

    if (!user.username || !user.age || !user.hobbies || Object.keys(user).length !== 3) return false;
    if (typeof user.username !== 'string' || user.username.length === 0) return false;
    if (typeof user.age !== 'number' || user.age <= 0) return false;
    if (!Array.isArray(user.hobbies)) return false;

    if (user.hobbies.length > 0) {
        for (let i = 0; i < user.hobbies.length; i++) {
            if (typeof user.hobbies[i] !== 'string') return false
        }
    }
    return true
}


module.exports = {
    writeDataToFileS, isCorrectId, isCorrectUser
}