const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

test("check slash at the end", () => {
  const input = "https://wagslane.dev/path/";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("check capitals", () => {
  const input = "https://WaGsLane.Dev/path";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("check http", () => {
  const input = "http://wagslane.dev/path";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("check normal input", () => {
  const input = "https://wagsLane.dev/path";
  const actual = normalizeURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("get absolute url", () => {
  const htmlBody =
    '<html><body><a href="https://developer.mozilla.org"><span>mdn</span></a></body></html>';
  const baseURL = "https://developer.mozilla.org";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://developer.mozilla.org/"];
  expect(actual).toEqual(expected);
});

test("get relative url", () => {
  const htmlBody =
    '<html><body><section><a href="/en-US/docs/Web/API/URL/URL">MDN URL</section></body></html>';
  const baseURL = "https://developer.mozilla.org";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = ["https://developer.mozilla.org/en-US/docs/Web/API/URL/URL"];
  expect(actual).toEqual(expected);
});

test("multiple absolute url in body", () => {
  const htmlBody =
    '<section class="latest-news"><h2>Latest news</h2><ul class="news-list"><li class="news-item"><p class="news-title"><span><a href="https://hacks.mozilla.org/?p=47930">Revamp of MDN Web Docs Contribution Docs</a> <span class="badge">New</span></span><span><a class="news-source" href="https://hacks.mozilla.org/category/mdn/">hacks.mozilla.org</a></span></p><span class="news-date">2 days ago</span></li><li class="news-item"><p class="news-title"><span><a href="https://hacks.mozilla.org/?p=47919">The 100% Markdown Expedition</a></span></li></ul></section>';
  const baseURL = "https://hacks.mozilla.org";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = [
    "https://hacks.mozilla.org/?p=47930",
    "https://hacks.mozilla.org/category/mdn/",
    "https://hacks.mozilla.org/?p=47919",
  ];
  expect(actual).toEqual(expected);
});

test("multiple relative url", () => {
  const htmlBody =
    '<div class="section-content"><p>Learn how to use HTTP with guides and tutorials.</p><dl><dt id="overview_of_http"><a href="/en-US/docs/Web/HTTP/Overview">Overview of HTTP</a></dt><dt id="http_cache"><a href="/en-US/docs/Web/HTTP/Caching">HTTP Cache</a></dt><dt id="http_cookies"><a href="/en-US/docs/Web/HTTP/Cookies">HTTP Cookies</a></dt><dt id="cross-origin_resource_sharing_cors"><a href="/en-US/docs/Web/HTTP/CORS">Cross-Origin Resource Sharing (CORS)</a></dt></div>';
  const baseURL = "https://developer.mozilla.org";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = [
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching",
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies",
    "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML handle error", () => {
  const htmlBody =
    '<html><body><a href="relative/path/"><span>Click here</span></a></body></html>';
  const baseURL = "https://baseurl.com";
  const actual = getURLsFromHTML(htmlBody, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
