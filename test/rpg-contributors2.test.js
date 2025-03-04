import { html, fixture, expect } from '@open-wc/testing';
import "../rpg-contributors2.js";

describe("RpgContributors2 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <rpg-contributors2
        title="title"
      ></rpg-contributors2>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
