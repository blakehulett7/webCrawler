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
        <a href="/creeds/nicene">recite the Nicene Creed</a>
    </body>
</html>
`
  const baseURL = 'https://jesusislord.com'
  const result = ['https://jesusislord.com/creeds/nicene']
  expect(getURLsFromHTML(htmlBody, baseURL)).toStrictEqual(result)
})

test('multiple anchors', () => {
  const htmlBody = `
<html>
    <body>
        <a href="https://jesusislord.com/creeds/nicene">recite the Nicene Creed</a>
        <a href="https://jesusislord.com/gospels/luke">Go to the Gospel according to Luke</a>
        <a href="https://jesusislord.com/gospels/john">Go to the Gospel according to John</a>
    </body>
</html>
`
  const baseURL = 'https://jesusislord.com'
  const result = ['https://jesusislord.com/creeds/nicene',
                  'https://jesusislord.com/gospels/luke',
                  'https://jesusislord.com/gospels/john'
  ]
  expect(getURLsFromHTML(htmlBody, baseURL)).toStrictEqual(result)
})

