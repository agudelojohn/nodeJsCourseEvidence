const fs = require("fs");

setTimeout(() => console.log("2. Tiemr 1 finished", 0));
setImmediate(() => console.log("3. Immediate 1 finished"));

fs.readFile("text.txt", () => {
  console.log("4. I/O finished");
  setTimeout(() => console.log("Tiemr 2 finished", 0));
  setTimeout(() => console.log("Tiemr 3 finished", 3000));
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process->NextTick"));
});

console.log("1. Hello from top level code");
