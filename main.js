const { crawlPage } = require("./crawl.js");

async function main() {
  var args = process.argv;
  const baseURL = args[2];
  if (args.length === 2) {
    console.log("error less than 1 argument");
  } else if (args.length === 4) {
    console.log("error more than 1 argument");
  } else {
    console.log(`crawling: ${baseURL}`);
  }
  console.log(await crawlPage(baseURL));
}

main();
