const EventEmiiter = require("events");

const myEmitter = new EventEmiiter();

myEmitter.on("newSale", () => console.log("There was a new event , Sale!"));

myEmitter.on("newSale", () => console.log("Something else from other event"));

myEmitter.on("newSale", (stock) =>
  console.log(`Something from event with payload = ${stock}`)
);

myEmitter.emit("newSale", 99);
