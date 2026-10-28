// Tests for the functions in src/receipt.ts
//
// 3 written test for each dunctions in the src file.

import { addItem, deleteItem, total, tax, printReceipt } from "./src/fixed_receipt";

// addItem: Items can be added to the grocery list.

describe("addItem", () => {
  // Happy path
  test("happy:", () => {
    const list = addItem("milk", 3.5);
    expect(list).toContainEqual({ name: "milk", price: 3.5 });
  });

  // Unhappy path
  test("unhappy:", () => {
    expect(() => addItem("bread", -1)).toThrow();
  });

  // Edge case
  test("edge:", () => {
    const list = addItem("free sample", 0);
    expect(list).toContainEqual({ name: "free sample", price: 0 });
  });
});

// deleteItem: Items can be deleted from the grocery list.

describe("deleteItem", () => {
  // Happy path
  test("happy:", () => {
    const list = deleteItem("sandwich");
    expect(list).not.toContainEqual({ name: "sandwich", price: 8.75 });
  });

  // Unhappy path
  test("unhappy:", () => {
    const before = deleteItem("does-not-exist");
    const after = deleteItem("does-not-exist");
    expect(after).toEqual(before);
  });

  // Edge case
  test("edge:", () => {
    const before = deleteItem("");
    expect(before).not.toContainEqual({ name: "", price: undefined });
  });
});

// total: The subtotal is calculaed WITHOUT tax.

describe("total", () => {
  // Happy path
  test("happy:", () => {
    expect(typeof total()).toBe("number");
  });

  // Unhappy path
  test("unhappy:", () => {
    expect(Number.isNaN(total())).toBe(false);
  });

  // Edge case
  test("edge:", () => {
    expect(total()).toBeGreaterThanOrEqual(0);
  });
});

// tax: The total is calculated WITH tax.

describe("tax", () => {
  // Happy path
  test("happy:", () => {
    expect(tax(0.1)).toBeCloseTo(total() * 1.1, 2);
  });

  // Unhappy path
  test("unhappy:", () => {
    expect(tax(-0.1)).toBeLessThanOrEqual(total());
  });

  // Edge case
  test("edge:", () => {
    expect(tax(0)).toBeCloseTo(total(), 2);
  });
});

// printReceipt: A receipt can be printed.

describe("printReceipt", () => {
  // Happy path
  test("happy: prints to the console", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    printReceipt(0.1);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  // Unhappy path
  test("unhappy: does not throw on a bad tax rate", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    // @ts-expect-error passing a wrong type on purpose
    expect(() => printReceipt("abc")).not.toThrow();
    spy.mockRestore();
  });

  // Edge case: 
  test("edge: prints with a zero tax rate", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    printReceipt(0);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
