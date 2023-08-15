import { z } from 'zod'
import { r } from 'rype'
function check(label, fn) {
  const start = Date.now()
  for (let i = 0; i < 1000_000; i++) fn()
  const end = Date.now()
  const diff = end - start
  console.log(label + ':', diff + 'ms')
  return diff
}
const input = { name: 'John Doe', age: 0 }

function test() {
  const zod = check('Zod', () => {
    z.string().parse(input.name)
    z.object({ name: z.string() }).parse(input)
  })

  const rype = check('Rype', () => {
    r.string().parse(input.name)
    r.object({ name: r.string() }).parse(input)
  })

  console.log('Rype is', +(zod / rype).toFixed(2), 'times faster than Zod')
  console.log()
}

test()
test()
test()
test()
