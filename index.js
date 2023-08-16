import { z } from 'zod'
import { r } from 'rype'
import * as y from 'yup'
import * as v from 'valibot'
import { check, compare } from './core.js'
const input = { name: 'John Doe' }

for (let i = 0; i < 5; i++) {
  const yup = check('Yup', () => {
    y.string().validateSync(input.name)
    y.object()
      .shape({ name: y.string().default('none') })
      .validateSync(input)
  })

  const zod = check('Zod', () => {
    z.string().parse(input.name)
    z.object({ name: z.string().default('none') }).parse(input)
  })

  const valibot = check('Valibot', () => {
    v.parse(v.string(), input.name)
    v.parse(v.object({ name: v.withDefault(v.string(), 'none') }), input)
  })

  const rype = check('Rype', () => {
    r.string().parse(input.name)
    r.object({ name: r.string().default('none') }).parse(input)
  })

  compare('Yup', yup, rype)
  compare('Zod', zod, rype)
  compare('Valibot', valibot, rype)
  console.log()
}
