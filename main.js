import process from 'node:process'
import {crawlPage} from './crawl.js'

function main() {
  const input = process.argv
  const clArgs = input.slice(2, input.length)
  if (clArgs.length != 1) {
    console.log('Error: Incorrect number of arguments')
    return
  }
  const targetSite = clArgs[0]
  console.log(`Crawler starting at ${targetSite}...`)
  crawlPage(targetSite)
}

main()
