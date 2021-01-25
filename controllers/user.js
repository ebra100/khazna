const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validations } = require("../validators/user")

class UserController {

    async register(req, res) {

        try {

            await validations.validateRegisterRequest(req.body);

            let email = req.body.email;
            let password = req.body.password;
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;

            let user = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })

            let token = jwt.sign({ id: user.id }, '123456');

            return res.send({ status: "OK", result: token });

        } catch (error) {

            console.log(error);

            return res.send({ status: "BAD_REQUEST", message: error.message })
        }
    }

    async login(req, res) {

        try {

            await validations.validateLoginRequest(req.body);

            let email = req.body.email;
            let password = req.body.password;

            let user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.send({ status: "BAD_REQUEST", message: "wrong username or password" })
            }

            let isMatched = await bcrypt.compareSync(password, user.password);

            if (!isMatched) {
                return res.send({ status: "BAD_REQUEST", message: "wrong username or password" })
            }

            let token = jwt.sign({ id: user.id }, '123456');

            return res.send({ status: "OK", result: token });

        } catch (error) {

            console.log(error);

            return res.send({ status: "BAD_REQUEST", message: error.message })

        }

    }
}


module.exports.userController = new UserController()