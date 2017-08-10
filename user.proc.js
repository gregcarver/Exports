var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, 'user.json');

function insertUser(user) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading user.json');
            }

            var parsed = JSON.parse(file);

            parsed.push(user);

            fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                if (err) {
                    reject('Error writing to user.json');
                }

                resolve('Created');
            });
        });
    });
}

function getUsers() {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading user.json');
            }

            resolve(JSON.parse(file));
        });
    });
}





module.exports = {
    create: insertUser,
    all: getUsers,
    // read: getUser,
    // destroy: deleteUser,
};