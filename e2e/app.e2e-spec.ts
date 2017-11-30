import { BingAutosuggestAngularPage } from './app.po';

describe('bing-autosuggest-angular App', () => {
  let page: BingAutosuggestAngularPage;

  beforeEach(() => {
    page = new BingAutosuggestAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
