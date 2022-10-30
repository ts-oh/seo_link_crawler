const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normaliseURL(link) {
  let url = link.toLowerCase();

  if (url[url.length - 1] === "/") {
    url = url.slice(0, -1);
  }

  let urlObj = new URL(url);
  return `${urlObj.host}${urlObj.pathname}`;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const linkArr = [];
  const dom = new JSDOM(htmlBody);
  const aLinks = dom.window.document.querySelectorAll("a");
  for (const aLink of aLinks) {
    console.log(aLink.href);
    linkArr.push(aLink.href);
  }
  return linkArr;
}

module.exports = {
  normaliseURL,
  getURLsFromHTML,
};
