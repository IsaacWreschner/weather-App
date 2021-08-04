import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display logo', async () => {
    await page.navigateTo();
    expect(await page.getLogoText()).toEqual('Weather App');
  });

  it(`should the menu item 1 show 'דף הראשי' (test works only on desktop and tablets screen sizes)`, async () => {
    await browser.driver.manage().window().setSize(1000, 1000);
    expect(await page.getnthUlElText(1)).toEqual('דף ראשי');
  });

  it(`should the menu item 2 show 'היסטורית חיפושים' (test works only of desktop and tablets screen sizes)`, async () => {
    await browser.driver.manage().window().setSize(1000, 1000);
    expect(await page.getnthUlElText(2)).toEqual('היסטורית חיפושים');
  });


 
it('should get the searches history results correctly (multiples scenarios)', async () => {
    page.putMockedResponsesToLS(['בית שמש','תל אביב','ירושלים','רמת גן'])
    await browser.get(`${browser.baseUrl}/#/searches-history`)
    expect(await page.getSearchesDisplayedCount()).toBe(5);
    await page.inputFilter('')
    expect(await page.getSearchesDisplayedCount()).toBe(5);
    await page.inputFilter('ב')
    expect(await page.getSearchesDisplayedCount()).toBe(3);
    await page.inputFilter('ג')
    expect(await page.getSearchesDisplayedCount()).toBe(2);
    await page.inputFilter('ג')
    expect(await page.getSearchesDisplayedCount()).toBe(2);
    await page.inputFilter('גב')
    expect(await page.getSearchesDisplayedCount()).toBe(1);
    await page.inputFilter('ת שמש')
    expect(await page.getSearchesDisplayedCount()).toBe(2);
    await page.inputFilter(' ת שמש')
    expect(await page.getSearchesDisplayedCount()).toBe(1);

    });

 /* it('should the temp column be a number', async () => {
   })*/

  
  it('should navigate correctly beetwen the 2 pages', async () => {
    await page.clickMenuItemSearchesHistory();
    browser.sleep(2000).then(async ()=>{
      expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/searches-history`);
      await page.clickMenuItemMainPage();
      browser.sleep(2000).then(async ()=>{
        expect(await browser.getCurrentUrl()).toEqual(`${browser.baseUrl}#/`);
      })
    })
    });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
