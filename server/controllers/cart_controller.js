const swag = require('../models/swag.js');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query            //destructuring
        let { cart } = req.session.user;

        const index = cart.findIndex((swag) => swag.id == id); //check if the same item is in the cart

        if (index === -1) {  //if the item is in the cart already, add it to the cart and increase the price of that swag.
            const selectedSwag = swag.find((swag) => swag.id == id);

            cart.push(selectedSwag)
            req.session.user.total += selectedSwag.price; //push the swag in and add to the total of that selectedswags price.
        }

        res.status(200).send(req.session.user)

    },

    delete: (req, res, next) => {
        const { id } = req.query
        const { cart } = req.session.user;

        if (selectedSwag) {
            const i = cart.findIndex((swag) => swag.id == id)
            cart.splice(i, 1);
            req.session.user.total -= selectedSwag.price;

        } res.status(200).send(req.session.user)
    },

    checkout: (req, res, next) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(req.session.user)
    } 
}