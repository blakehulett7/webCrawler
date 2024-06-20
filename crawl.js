import { JSDOM } from 'jsdom'

function normalizeURL(url) {
  let strippedURL = url
  if (url.endsWith('/')) {
    strippedURL = url.substring(0, url.length - 1);
  };
  const urlObject = new URL(strippedURL)
  return urlObject.hostname + urlObject.pathname
}

function getURLsFromHTML(htmlBody, baseURL) {
  let finalArray = []
  const objectModel = new JSDOM(htmlBody)
  const anchorArray = objectModel.window.document.querySelectorAll('a')
  anchorArray.forEach(anchor => {
    let ref = anchor.href
    if (!ref.startsWith(baseURL)) {
      ref = baseURL + ref
    };
    finalArray.push(ref)
  })
  return finalArray
}

/*
const htmlBody = `
<html>
    <body>
        <a href="jesusislord.com/creeds/nicene">recite the Nicene Creed</a>
        <a href="jesusislord.com/gospels/luke">The Gospel According to Luke</a>
        <a href="jesusislord.com/gospels/john">The Gospel According to John</a>
    </body>
</html>
`;
const baseURL = 'jesusislord.com'
getURLsFromHTML(htmlBody, baseURL)
*/

export { normalizeURL, getURLsFromHTML };
