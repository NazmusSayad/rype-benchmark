import j from 'joi'
import { z } from 'zod'
import { r } from 'rype'
import * as y from 'yup'
import * as v from 'valibot'
import { compare } from './core.js'

const input = { name: 'John Doe' }
compare({
  Zod() {
    z.string().parse(input.name)
    z.object({ name: z.string().default('none') }).parse(input)
  },

  Yup() {
    y.string().validateSync(input.name)
    y.object()
      .shape({ name: y.string().default('none') })
      .validateSync(input)
  },

  Joi() {
    j.string().validate(input.name)
    j.object({ name: j.string().default('none') }).validate(input)
  },

  Valibot() {
    v.parse(v.string(), input.name)
    v.parse(v.object({ name: v.withDefault(v.string(), 'none') }), input)
  },

  Rype() {
    r.string().parse(input.name)
    r.object({ name: r.string().default('none') }).parse(input)
  },
})
