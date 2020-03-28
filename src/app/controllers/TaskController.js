const connection = require('../../database/connection')

class TaskController {
    async create(req, res) {
        try {
            const { title, description } = req.body
            const user_id = req.headers.authorization

            const [id] = await connection('tasks').insert({
                title,
                description,
                user_id,
            })

            return res.json({ id })

        } catch (e) {
            console.error({
                message: e.message,
                stack: "Ops, algo deu errado, segundo o " + e.stack
            })
        }
    }

    async show(req, res) {
        try {
            const { page = 1 } = req.query

            const [count] = await connection('tasks').count()
            res.header('x-total-count', count['count(*)'])

            const tasks = await connection('tasks')
                .join('users', 'user_id', '=', 'tasks.user_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select(['tasks.id', 'users.name', 'tasks.title', 'tasks.description'])

            return res.json(tasks)

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
            const { title, description } = req.body
            const user_id = req.headers.authorization

            const task = await connection('tasks')
                .where('id', id)
                .select('user_id')
                .first()

            if (task.user_id !== user_id) {
                return res.status(401).json({ error: "forbbiden" })
            }

            await connection('tasks')
                .where('id', id)
                .update({ title, description }, ['id', 'title', 'description'])

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
            const user_id = req.headers.authorization

            const task = await connection('tasks')
                .where('id', id)
                .select('user_id')
                .first()

            if (task.user_id !== user_id) {
                return res.status(403).json({ error: "forbbiden" })
            }

            await connection('tasks')
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

module.exports = new TaskController()