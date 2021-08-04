import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getLogoText(): Promise<string> {
    return element(by.id('app-logo')).getText();
  }

  async getnthUlElText(i):Promise<string> {
    let ul = await element(by.css(`ul:nth-child(${i})`))
    console.log(ul)
    return await ul.getText();
  }


  putMockedResponsesToLS(locationNames:string[]){
    browser.executeScript('window.localStorage.clear();')
    locationNames.map((locationName,i) => {
      let mockedResponse = this._mockResponse(locationName);
      browser.executeScript(`
           let nItem = {item:${JSON.stringify(mockedResponse)}};
           window.localStorage.setItem('search-${mockedResponse.name}',JSON.stringify(nItem));
          `
          );
    })
    
  }
  
  async inputFilter(text:string): Promise<void>{
       await element(by.id('filter-searches')).clear()
       await element(by.id('filter-searches')).sendKeys(text);
    }

    async getSearchesDisplayedCount():Promise<unknown>{
      return element.all(by.css('tr')).count()
    }

   private _mockResponse(name){
      return   {
        coord:{lon:30,lat:30},
            base: null,
            main: {
              temp: 15.0,
            },
            dt:1234567895,
            name:name
     }
  }

  
  async clickMenuItemMainPage() : Promise<void>{
    await element(by.id('menu-item-main-page')).click();
  }

  async clickMenuItemSearchesHistory(): Promise<void>{
    await element(by.id('menu-item-searches-history')).click();
  }

   
  }
  