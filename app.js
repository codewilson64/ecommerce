document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "AEROREADY SHIRT", img: "product1.jpg", price: 25 },
      { id: 2, name: "WIRELESS EARBUDS", img: "product2.jpg", price: 100 },
      { id: 3, name: "HOODED PARKA", img: "product3.jpg", price: 45 },
      { id: 4, name: "STRAW METAL BOTTLE", img: "product4.jpg", price: 20 },
      { id: 5, name: "SUNGLASSES", img: "product5.jpg", price: 90 },
      { id: 6, name: "BACK HAT", img: "product6.jpg", price: 40 },
      { id: 7, name: "BACKPACK", img: "product7.jpg", price: 50 },
      { id: 8, name: "ULTRABOOST 22", img: "product8.jpg", price: 150 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // check if there is same item in cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // if no
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // if yes, check if item is same or different
        this.items = this.items.map((item) => {
          // if different item
          if (item.id !== newItem.id) {
            return item;
          } else {
            // if same item
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      // if item is more than 1
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Display dollar currency
const dollar = (number) => {
  return new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(number);
};
