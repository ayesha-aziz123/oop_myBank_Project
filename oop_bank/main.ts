#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

///customer
class Customer {
  fName: string;
  lName: string;
  age: number;
  gender: string;
  mobNumber: number;
  accoNumber: string;
  balance: number;

  constructor(
    a: string,
    b: string,
    c: number,
    d: string,
    e: number,
    f: string,
    g: number
  ) {
    this.fName = a;
    this.lName = b;
    this.age = c;
    this.gender = d;
    this.mobNumber = e;
    this.accoNumber = f;
    this.balance = g;
  }
}
console.log(
  chalk.italic.bold.magenta(
    "<------------------------------------------------------->"
  )
);
console.log(
  chalk.italic.bold.magenta(
    "<------------------  WELCOME MY BANK ------------------->"
  )
);
console.log(
  chalk.italic.bold.magenta(
    "<------------------------------------------------------->"
  )
);

class myBank {
  customers: Customer[] = [];

  async createAcc() {
    const {
      firstName,
      lastName,
      Age,
      Gender,
      mobilenumber,
      accountNumber,
      Balance,
    } = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your name :"),
      },
      {
        name: "lastName",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your lastName :"),
      },
      {
        name: "Age",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your age :"),
      },
      {
        name: "Gender",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your Gender :"),
      },
      {
        name: "mobilenumber",
        type: "input",
        message: chalk.italic.bold.blueBright("Enter your mobile Number :"),
      },
      {
        name: "accountNumber",
        type: "input",
        message: chalk.italic.bold.blueBright(
          "Enter your new account number :"
        ),
      },
      {
        name: "Balance",
        type: "input",
        message: chalk.italic.bold.blueBright("Add initial balance :"),
      },
    ]);
    const cus = new Customer(
      firstName,
      lastName,
      Age,
      Gender,
      mobilenumber,
      accountNumber,
      parseFloat(Balance)
    );
    this.customers.push(cus);

    console.log(
      chalk.italic.bold.yellow(
        `\n🎉congratulations, Mr/s ${cus.fName} ${cus.lName} your account has been created successfully.😊\n`
      )
    );
  }

  //// Details ///
  async details() {
    const { AccountNumber } = await inquirer.prompt({
      name: "AccountNumber",
      type: "input",
      message: "Enter your account number:",
    });

    const cus = this.customers.find((x) => x.accoNumber == AccountNumber);
    if (cus) {
      console.log(
        chalk.italic.bold.greenBright.underline(`Account Details :💰
            Name: ${cus.fName} ${cus.lName} 
            Age: ${cus.age}
            Gender: ${cus.gender}
            MobileNo: ${cus.mobNumber}
            AccountNumber: ${cus.accoNumber}
            Balance: ${cus.balance}`)
      );
    } else {
      console.log(chalk.italic.bold.red("Account Not Found !"));
    }
  }

  ///// Deposit Amount ///
  async debit() {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        type: "input",
        name: "accountNumber",
        message: chalk.bold.greenBright("Enter your account number:"),
      },
      {
        type: "input",
        name: "amount",
        message: chalk.bold.greenBright("Enter amount to debit:"),
      },
    ]);
    const cus = this.customers.find((z) => z.accoNumber === accountNumber);
    if (cus) {
      if (cus.balance >= parseFloat(amount)) {
        cus.balance -= parseFloat(amount);
        console.log(
          chalk.bold.italic.magenta(
            `<---- Debited ${amount} from account ${accountNumber}. New balance: ${cus.balance} ---->`
          )
        );
      } else {
        console.log(chalk.bold.red("Insufficient balance"));
      }
    } else {
      console.log(chalk.red.bold("Account not found:"));
    }
  }
  //// Add Amount  ///
  async credit() {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        name: "accountNumber",
        type: "input",
        message: "Enter your account Number :",
      },
      {
        name: "amount",
        type: "input",
        message: "Enter amount to credit:",
      },
    ]);
    const cus = this.customers.find((z) => z.accoNumber == accountNumber);
    if (cus) {
      cus.balance += parseFloat(amount);
      console.log(
        chalk.bold.italic.magenta(
          `<---- Credited ${amount} to account ${accountNumber}. New balance: ${cus.balance} ---->`
        )
      );
    } else {
      console.log(chalk.italic.bold.red("Account Not Found !"));
    }
  }
  async start() {
    while (true) {
      const { Choices } = await inquirer.prompt({
        name: "Choices",
        type: "list",
        message: "Select an option",
        choices: [
          "Create Account",
          "View Account Details",
          "Debit",
          "Credit",
          "Exit",
        ],
      });
      if (Choices === "Create Account") {
        await this.createAcc();
      } else if (Choices === "View Account Details") {
        await this.details();
      } else if (Choices === "Debit") {
        await this.debit();
      } else if (Choices === "Credit") {
        await this.credit();
      } else if ("Exit") {
        console.log(chalk.underline.red.italic("Yor are exit..."));
        process.exit();
      }
    }
  }
}

const a = new myBank();
a.start();
