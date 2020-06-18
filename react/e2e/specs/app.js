// See
// - https://blog.scottlogic.com/2020/01/22/react-app-puppeteer.html
// - https://michelenasti.com/2019/10/02/jest-and-puppeteer-from-the-barricades.html
// - search: react e2e puppeteer chrome headless

import { getIntroText, getLinkText } from "../pageObjects/app";
import { load } from "../pageObjects/index";

describe("React App", () => {
  beforeEach(async () => {
    await load();
  });

  it("should show the correct intro", async () => {
    expect(await getIntroText()).toBe("Edit src/App.js and save to reload.");
  });

  it("should show the correct link", async () => {
    expect(await getLinkText()).toBe("Learn React");
  });
});
