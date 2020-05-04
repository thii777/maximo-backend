const connection = require('../../database/connection')
const bcrypt = require('bcrypt')

class SessionController {
    async create(req, res) {
        try {
            const { email, senha } = req.body

            const user = await connection('users')
                .where({ 'email': email })
                .select('*')
                .first()

            if (!user) {
                return res.status(401).json({ message: 'User not exist' })
            }

            const match = await bcrypt.compare(String(senha), user.senha);

            if (match === false) {
                return res.json({ message: "password do not math" })
            }

            if (match) {
                return res.json({ message: "login success" })
            }
            
        } catch (e) {
            console.error({
                message: e.message,
                stack: e.stack
            })
        }
    }
}

module.exports = new SessionController()