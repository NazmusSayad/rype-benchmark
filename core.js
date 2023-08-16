export function check(label, fn) {
  const start = Date.now()
  for (let i = 0; i < 1_000_000; i++) fn()
  const end = Date.now()
  const diff = end - start
  console.log(label + ':', diff + 'ms')
  return diff
}

export function compare(name, NO, NRype) {
  console.log('Rype is', +(NO / NRype).toFixed(2), 'times faster than ' + name)
}
