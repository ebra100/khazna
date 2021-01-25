const Joi = require('joi');

class Validations {

    async  validateLoginRequest(data) {

        try {

            const schema = Joi.object({

                password: Joi.string().required().min(6),
                email: Joi.string().required().email()
            })


            await schema.validateAsync(data);

        }

        catch (err) {

            throw { message: err.details[0].message }

        }

    }


    async  validateRegisterRequest(data) {

        try {

            const schema = Joi.object({

                password: Joi.string().required().min(6),
                email: Joi.string().required().email(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required()
            })


            await schema.validateAsync(data);

        }

        catch (err) {

            throw { message: err.details[0].message }

        }

    }
}

module.exports.validations = new Validations()
