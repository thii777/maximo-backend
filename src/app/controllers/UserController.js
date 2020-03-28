const crypto = require('crypto')

const connection = require('../../database/connection')

class UserController {
    async create(req, res) {
        try {
            const {
                name,
                email,
                senha
            } = req.body

            const id = crypto.randomBytes(4).toString('HEX')

            await connection('users').insert({
                id,
                name,
                email,
                senha
            })
            return res.json({ id })

        } catch (e) {
            console.error({
                message: e.message,
                stack: e.stack
            })
        }
    }

    async show(req, res) {
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