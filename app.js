
const puppeteer = require('puppeteer');
const phone = ""
const password = ""
const credit_three = ""

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://www.momoshop.com.tw/main/Main.jsp');
    await page.click("#LOGINSTATUS")
    await page.waitForSelector('#loginForm')
    await page.type('input[id="memId"]', phone)

    await page.type('input[id="passwd_show"]', password)
    await page.click("#LOGINSTATUS")
    await page.click(".loginBtn")
    await page.waitForSelector('#bt_0_150_01 > ul.rightMenu > li.membername.loginTxt.loginselected')
    await page.goto('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8267514&Area=search&mdiv=403&oid=1_1&cid=index&kw=ps5');
   
    while(!await page.$('#buy_yes > a')){
        await page.reload()
    }
    await page.click("#buy_yes")
    await page.waitForSelector('#shpSumm > div > ul > li.checkoutBtn > a')
    await page.click("#shpSumm > div > ul > li.checkoutBtn > a")
    await page.waitForSelector('#cardCVV')
    await page.type('input[id="cardCVV"]', credit_three)
    await page.click("#orderSave")
    
  })();


  