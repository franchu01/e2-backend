const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function saveBillToFile(bill) {
  const fileName = "bills.json";

  fs.readFile(fileName, "utf8", (err, data) => {
    let bills = [];
    if (!err) {
      try {
        bills = JSON.parse(data);
      } catch (error) {
        console.log("Invalid JSON file. Creating a new one...");
      }
    }

    bills.push(bill);

    fs.writeFile(fileName, JSON.stringify(bills, null, 2), (err) => {
      if (err) throw err;
      console.log("Bill saved!");
    });
  });
}

function askForBill() {
  rl.question("Enter bill amount: ", (amount) => {
    rl.question("Enter bill description: ", (description) => {
      const bill = { amount, description };
      saveBillToFile(bill);
      rl.close();
    });
  });
}

askForBill();
