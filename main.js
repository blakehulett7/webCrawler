import process from 'node:process'

function main() {
  const input = process.argv
  const clArgs = input.slice(2, input.length)
  if (clArgs.length != 1) {
    console.log('Error: Incorrect number of arguments')
    return
  }
  console.log(`Crawler starting at ${clArgs[0]}...`)
}

main()
