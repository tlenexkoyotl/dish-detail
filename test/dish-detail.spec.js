/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../dish-detail.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<dish-detail></dish-detail>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
