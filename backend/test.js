const puppeteer = require("puppeteer");

async function testPuppeteer() {
    const browser = await puppeteer.launch();
    console.log("✅ Puppeteer launched successfully!");
    await browser.close();
}

testPuppeteer();
