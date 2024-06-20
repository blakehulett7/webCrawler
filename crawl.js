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
        <a href="/creeds/nicene">recite the Nicene Creed</a>
    </body>
</html>
`;
const baseURL = 'jesusislord.com'
getURLsFromHTML(htmlBody, baseURL)
*/

export { normalizeURL, getURLsFromHTML };
