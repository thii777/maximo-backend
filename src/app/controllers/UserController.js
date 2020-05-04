const connection = require('../../database/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10;

class UserController {
    create(req, res) {

        try {
            const {
                name,
                email,
                senha
            } = req.body


            bcrypt.hash(String(senha), saltRounds).then((hash) => {

                connection.select("users")
                    .from("users")
                    .andWhere("email", email)
                    .then(e => {
                        if (e.length === 0) {
                            return connection('users')
                                .insert([{
                                    name,
                                    email,
                                    senha: hash
                                }])
                        }
                        return res.status(400).json({ message: 'User already exist' });
                    });
                return res.json({ message: "Create success" })
            });


        } catch (e) {
            console.error({
                message: e.message,
                stack: e.stack
            })
        }
    }

    async getAll(req, res) {
        try {
            const users = await connection('users').select('*')
            return res.json(users)

        } catch (e) {
            console.log({
                message: e.message,
                stack: e.stack
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { name } = req.body

            await connection('users')
                .where('id', id)
                .update({ name }, ['id', 'name'])

            return res.json({ message: 'changed success' })

        } catch (e) {
            console.log({
                message: e.message,
                stack: e.stack
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params

            await connection('users')
                .where('id', id)
                .del()

            return res.json({ message: 'deleted success' })

        } catch (e) {
            console.log({
                message: e.message,
                stack: e.stack
            })
        }
    }
}

module.exports = new UserController()