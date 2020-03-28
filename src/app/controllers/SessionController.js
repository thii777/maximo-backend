const connection = require('../../database/connection')

class SessionController {
    async create(req, res) {
        try {
            const { id } = req.body
            
            const user = await connection('users')
            .where('id', id)
            .select('name')
            .first() 

            if(!user){
                return res.status(401).json({message: 'User not exist'})
            }

            return res.json(user)

        } catch (e) {
            console.error({
                message: e.message,
                stack: e.stack
            })
        }
    }
}

module.exports = new SessionController()