import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expensesRoutes } from './routes/expenses'
import { listRoutes } from './routes/list'

const app = new Hono()

app.use(logger())

app.get("/test", c => {
    return c.json({ message: "test" })
})

app.route('/api/expenses', expensesRoutes)
app.route('/api/list', listRoutes)

export default app