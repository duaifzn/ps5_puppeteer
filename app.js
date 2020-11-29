
const puppeteer = require('puppeteer');
const phone = "";
const password = "";
const credit_three = "";

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    page.on('dialog', async dialog => {
        await dialog.accept();
    });

    await page.goto('https://www.momoshop.com.tw/', {waitUntil: 'networkidle2'});
    await page.waitForSelector('#LOGINSTATUS')
    await page.click("#LOGINSTATUS")
    await page.waitForSelector('#loginForm')
    await page.type('input[id="memId"]', phone)
    await page.type('input[id="passwd_show"]', password)
    await page.click(".loginBtn")
    await page.waitForSelector('#bt_0_150_01 > ul.rightMenu > li.membername.loginTxt.loginselected')
    await page.goto('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8267514&Area=search&mdiv=403&oid=1_1&cid=index&kw=ps5');
    //await page.goto('https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=7781576&Area=search&mdiv=403&oid=1_2&cid=index&kw=2077');

    await page.evaluate(() =>{
        let area = document.querySelector(".checkoutArea");
        area.innerHTML = `
        <dt id="buy_yes">
            <a class="buynow" onclick="javascript:OrderProcess('cart', '');">
                <img src="images/direct_purchase_btn.png" width="120" height="38" alt="直接購買" title="直接購買">
            </a>
        </dt>`
        
    })

    while(true){
        if(await page.$('#shpSumm')) break
        await page.click("#buy_yes").catch(err =>{console.log(err)})
        console.log("click!")
    }


    await page.waitForSelector('#shpSumm')
    await page.click("#shpSumm > div > ul > li.checkoutBtn > a")
    await page.waitForSelector('#cardCVV')
    await page.type('input[id="cardCVV"]', credit_three)
    await page.click("#orderSave")
    
  })();


  