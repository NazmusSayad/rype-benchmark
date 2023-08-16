const LOOP_COUNT = 10_000_000
const ACCURACY_LOOP_COUNT = 6

function calculateAverage(numbers) {
  const totalSum = numbers.reduce((sum, num) => sum + num, 0)
  const count = numbers.length
  const average = totalSum / count
  return average
}

function check(label, fn) {
  const timeTakes = []

  for (let i = 0; i < ACCURACY_LOOP_COUNT; i++) {
    const start = Date.now()
    for (let i = 0; i < LOOP_COUNT; i++) fn()
    const end = Date.now()
    const diff = end - start
    timeTakes.push(diff)
  }

  const avg = calculateAverage(timeTakes)
  console.log(label + ':', timeTakes)
  console.log('Average:', +avg.toFixed(3), 'ms')
  console.log()
  return avg
}

export function compare(checks) {
  const result = {}

  for (let name in checks) {
    const fn = checks[name]
    result[name] = check(name, fn)
  }

  const { Rype, ...others } = result
  for (let name in others) {
    const duration = others[name]

    if (Rype <= duration) {
      console.log(
        '+ Rype is',
        +(duration / Rype).toFixed(2),
        'times faster than ' + name
      )
    } else {
      console.log(
        '- Rype is',
        +(Rype / duration).toFixed(2),
        'times slower than ' + name
      )
    }
  }

  console.log()
  console.log()
  console.log()
}

console.clear()
console.log(new Date())
console.log()
