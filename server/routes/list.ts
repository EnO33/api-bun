import { Hono } from "hono"
import { number, z } from "zod"
import { zValidator } from '@hono/zod-validator'

const listSchema = z.object({
    id: number().int().positive().min(1),
    title: z.string().min(3).max(100)
})

type List = z.infer<typeof listSchema>

const createPostSchema = listSchema.omit({ id: true })

const fakeList: List[] = [
    { id: 1, title: "Fromage" },
    { id: 2, title: "Salade" },
    { id: 3, title: "Pain" },
    { id: 4, title: "Lait" },
    { id: 5, title: "Oeufs" },
    { id: 6, title: "Jambon" },
    { id: 7, title: "Pommes" },
    { id: 8, title: "Bananes" },
    { id: 9, title: "Tomates" },
    { id: 10, title: "Pâtes" },
    { id: 11, title: "Riz" },
    { id: 12, title: "Café" },
    { id: 13, title: "Thé" },
    { id: 14, title: "Sucre" },
    { id: 15, title: "Sel" },
    { id: 16, title: "Poivre" },
    { id: 17, title: "Huile d'olive" },
    { id: 18, title: "Vinaigre balsamique" },
    { id: 19, title: "Farine" },
    { id: 20, title: "Chocolat" },
    { id: 21, title: "Beurre" },
    { id: 22, title: "Confiture" },
    { id: 23, title: "Yaourt" },
    { id: 24, title: "Crème fraîche" },
    { id: 25, title: "Pommes de terre" },
    { id: 26, title: "Carottes" },
    { id: 27, title: "Courgettes" },
    { id: 28, title: "Ail" },
    { id: 29, title: "Oignons" },
    { id: 30, title: "Miel" }
];

export const listRoutes = new Hono()
    .get('/', (c) => {
        return c.json({ list: fakeList })
    })
    .post('/', zValidator("json", createPostSchema), async (c) => {
        const data = await c.req.valid("json")
        const list = createPostSchema.parse(data)
        fakeList.push({ id: fakeList.length + 1, ...list })
        c.status(201)
        return c.json(list)
    })
    .get('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'))

        const list = fakeList.find(list => list.id === id)
        if (!list) {
            return c.notFound()
        }
        return c.json({ list })
    })
    .delete('/:id{[0-9]+}', (c) => {
        const id = Number.parseInt(c.req.param('id'))
        const index = fakeList.findIndex(list => list.id === id)
        if (index === -1) {
            return c.notFound()
        }
        const deletedList = fakeList.slice(index, 1)[0]
        return c.json({ list: deletedList })
    })