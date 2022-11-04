const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(link) {
  let url = link.toLowerCase();

  if (url[url.length - 1] === "/") {
    url = url.slice(0, -1);
  }

  let urlObj = new URL(url);
  return `${urlObj.host}${urlObj.pathname}`;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urlArr = [];
  const dom = new JSDOM(htmlBody);
  const aLinks = dom.window.document.querySelectorAll("a");
  for (const aLink of aLinks) {
    console.log(new URL(aLink.href, baseURL));
    if (aLink.href[0] === "/") {
      try {
        urlArr.push(new URL(aLink.href, baseURL).href);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        urlArr.push(new URL(aLink.href).href);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  return urlArr;
}

async function crawlPage(baseURL) {
  try {
    const response = await fetch(baseURL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "text/html",
      },
    });
    return response.text();
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};
