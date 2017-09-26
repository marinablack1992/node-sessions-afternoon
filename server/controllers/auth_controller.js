const users = require('../models/users.js') //where the users are kept after registering.
//A user object looks like: { id: integer, username: string, password: string }
var id = 1;

module.exports = {
    // login: the username and password come in on the body. use an if statement to make sure the password/username matches.
    login: (req, res, next) => {
        const {session} = req;
        const {username, password} = req.body;

        //find the user where the user.username === username and the user.password === password.
        const user = users.find((user) => user.username === username && user.password === password);

        //if
        if (user) {
            session.user.username === user.username
            res.status(200).send(session.user);
        } else {
            res.status(500).send('Unauthorized.')
        }
    },

    // register: send the username and password on the body. push the id, username, and password to the users.js file (since we have no database), making sure to increment the id (normally the database would be set to auto increment the id). send back the session.user with a status of 200.
    register: (req, res, next) => {
        const { session } = req;
        const {username, password} = req.body;
        users.push({id, username, password})
        id++;
        session.user.username = username;
        res.status(200).send( session.user )
    },

    //This method is responsible for destroying the session and returning the session ( which should be undefined at that point ).
    signout: (req, res, next) => {
        const {session} = req;
        session.destroy();
        res.status(200).send( req.session )

    },

    //This method is responsible for reading the user object off of session and return it with a status of 200:
    getUser: (req, res, next) => {
        const {session} = req;
        res.status(200).send(session.user)

    }

}
