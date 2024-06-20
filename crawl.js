import { JSDOM } from 'jsdom'

function normalizeURL(url) {
  let strippedURL = url
  if (url.endsWith('/')) {
    strippedURL = url.substring(0, url.length - 1);
  };
  const urlObject = new URL(strippedURL)
  return urlObject.hostname + urlObject.pathname
}

function getURLsFromHTML(htmlBody, baseURL) {}

export { normalizeURL, getURLsFromHTML };
