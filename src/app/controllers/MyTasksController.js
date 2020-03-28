const connection = require('../../database/connection')

class MyTasksController {
    async index(req, res) {
        try {
            const user_id = req.headers.authorization
            const { page = 1 } = req.query

            const tasks = await connection('tasks')
                .limit(2)
                .offset((page - 1) * 2)
                .where('user_id', user_id)
                .select('*')

            if (tasks.length == [0]) {
                return res.json({ message: "You have no tasks" })
            }

            return res.json(tasks)
        } catch (e) {
            console.error({
                message: e.message,
                stack: e.stack
            });
        }
    }
}

module.exports = new MyTasksController()