import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalize s and /', () => {
  expect(normalizeURL('https://jesusislord.com/path/')).toBe('jesusislord.com/path')
});

test('normalize s only', () => {
  expect(normalizeURL('https://jesusislord.com/path')).toBe('jesusislord.com/path')
});

test('normalize / only', () => {
  expect(normalizeURL('http://jesusislord.com/path/')).toBe('jesusislord.com/path')
});

test('normalize uppercase', () => {
  expect(normalizeURL('http://JESUSislord.com/path')).toBe('jesusislord.com/path')
});

test('relative to absolute url', () => {
  const htmlBody = `
<html>
    <body>
        <a href="/creeds/nicene"><span>recite the Nicene Creed</span></a>
    </body>
</html>
`
  const baseURL = 'jesusislord.com'
  const result = ['jesusislord.com/creeds/nicene']
  expect(getURLsFromHTML(htmlBody, baseURL)).toBe(result)
})

test('multiple anchors', () => {
  const htmlBody = `
<html>
    <body>
        <a href="https://jesusislord.com/creeds/nicene><span>recite the Nicene Creed</span></a>
        <a href="https://jesusislord.com/gospels/luke><span>Go to the Gospel according to Luke</span></a>
        <a href="https://jesusislord.com/gospels/john><span>Go to the Gospel according to John</span></a>
    </body>
</html>
`
  const baseURL = 'jesusislord.com'
  const result = ['jesusislord.com/creeds/nicene',
                  'jesusislord.com/gospels/luke',
                  'jesusislord.com/gospels/john'
  ]
  expect(getURLsFromHTML(htmlBody, baseURL)).toBe(result)
})

