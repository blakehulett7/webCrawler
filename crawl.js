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
    if (ref.startsWith('/')) {
      ref = baseURL + ref
    };
    finalArray.push(ref)
  })
  return finalArray
}

async function crawlPage(currentURL) {
  try {
    const resp = await fetch(currentURL, {
      method: 'GET',
      mode: 'cors',
      })
    if ((400 <= resp.status) && (resp.status < 500)) {
      console.log(`Client Error ${resp.status}`)
      return
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')) {
      console.log('Error: Response data is not html text...')
      return
    }
    const contents = await resp.text()
    return contents
  } catch {
    console.log('Unknown Error occurred, get absolutely wrecked!')
  }
}

async function getLinksFromURL(baseURL, currentURL) {
  const html = await crawlPage(currentURL);
  const links = await getURLsFromHTML(html, baseURL)
  return links
}


async function crawlPageR(baseURL, currentURL = baseURL, pages = {}) {
  console.log(baseURL, currentURL, pages)
  const baseURLObject = new URL(baseURL)
  const currentURLObject = new URL(currentURL)
  if (!(baseURLObject.hostname === currentURLObject.hostname)) {
    return pages
  }
  const normalURL = normalizeURL(currentURL);
  if (pages[normalURL]) {
    pages[normalURL]++
    return pages
  } else {
    pages[normalURL] = 1
  }
  const linkArray = await getLinksFromURL(baseURL, currentURL)
  for (let link of linkArray) {
    crawlPageR(baseURL, link, pages)
  }
  return pages
}




console.log(crawlPageR('https://wagslane.dev'))


export { normalizeURL, getURLsFromHTML, crawlPage };
