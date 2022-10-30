const { test, expect } = require("@jest/globals");
const { normaliseURL, getURLsFromHTML } = require("./crawl.js");

test("check slash at the end", () => {
  const input = "https://wagslane.dev/path/";
  const actual = normaliseURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("check capitals", () => {
  const input = "https://WaGsLane.Dev/path";
  const actual = normaliseURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("check http", () => {
  const input = "http://wagslane.dev/path";
  const actual = normaliseURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("check normal input", () => {
  const input = "https://wagsLane.dev/path";
  const actual = normaliseURL(input);
  const expected = "wagslane.dev/path";
  expect(actual).toEqual(expected);
});

test("get absolute url from html", () => {
  const inputOne =
    '<html><body><a href="https://blog.boot.dev/hello"><span>Go to Boot.dev</span></a></body></html>';
  const inputTwo = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputOne, inputTwo);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});
