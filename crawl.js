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
  const objectModel = new JSDOM(htmlBody)
  const anchorArray = objectModel.window.document.querySelectorAll('a')
  anchorArray.forEach(anchor => {
    console.log(anchor.href)
  })
}


const htmlBody = `
<html>
    <body>
        <a href="/creeds/nicene">recite the Nicene Creed</a>
    </body>
</html>
`;
const baseURL = 'jesusislord.com'
getURLsFromHTML(htmlBody, baseURL)


export { normalizeURL, getURLsFromHTML };
