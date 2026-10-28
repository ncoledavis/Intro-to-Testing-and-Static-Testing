// Program requirements:
// Items can be added to the grocery list.
// Items can be deleted from the grocery list.
// The subtotal is calculated without tax.
// The total is calculated with tax.
// A receipt can be printed.

type Item = { name: string; price: number };

const ITEMS: Item[] = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  { name: "avocado oil", price: 10.0 },
];

// Items can be added to the grocery list.
export function addItem(name: string, price: number): Item[] {
  if (price < 0) {
    throw new Error("price cannot be negative");
  }
  const newItem: Item = { name: name, price: price };
  ITEMS.push(newItem);
  return ITEMS;
}

// Items can be deleted from the grocery list (by name).
export function deleteItem(name: string): Item[] {
  const idx = ITEMS.findIndex((item) => item.name === name);
  if (idx !== -1) {
    ITEMS.splice(idx, 1);
  }
  return ITEMS;
}

// The subtotal is calculated WITHOUT tax.
export function total(): number {
  let subtotal = 0;
  for (const item of ITEMS) {
    subtotal = subtotal + item.price;
  }
  return subtotal;
}

// The total is calculated WITH tax.
export function tax(taxRate: number): number {
  return total() * (1 + taxRate);
}

// A receipt can be printed.
export function printReceipt(taxRate: number): void {
  console.log("************************");

  for (const item of ITEMS) {
    console.log(`${item.name} : $${item.price}`);
  }

  console.log("************************");
  console.log(`Subtotal: $${String(total())}`);
  console.log(`Tax: $${String(total() * taxRate)}`);
  console.log(`Total: $${String(tax(taxRate))}`);
}
