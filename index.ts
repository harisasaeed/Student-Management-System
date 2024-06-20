#!/usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.magenta.bold("\n\t\t\tStudent Management System!\n\t\t"));

const validateLettersOnly = (input: string) => {
    const lettersRegex = /^[A-Za-z]+$/;
    if (lettersRegex.test(input)) {
        return true;
    }
    return "Oops! Use only letters.";
};

const validateDollars = (input: string) => {
    const amount = parseFloat(input);
    if (isNaN(amount)) {
        return 'Please enter a valid number.';
    }
    if (amount === 10) {
        return true;
    } else if (amount > 10) {
        return 'You are overpaying.';
    } else {
        return 'You are not paying enough.';
    }
};

const main = async () => {
    let userId: string;

    const info2 = await inquirer.prompt({
        name: "form2",
        type: "input",
        message: "Enter your userName",
        validate: validateLettersOnly,
    });

    const info6 = await inquirer.prompt({
        name: "form6",
        type: "list",
        message: "Select the given options.",
        choices: ["GenerateID", "Write id"],
    });

    if (info6.form6 === "GenerateID") {
        userId = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
        console.log(chalk.green(`Generated ID: ${userId}`));
    } else {
        const info7 = await inquirer.prompt({
            name: "form7",
            type: "input",
            message: "Alert! ID should be unique, including digits.",
        });
        userId = info7.form7;
        console.log(chalk.green(`Your ID is: ${userId}`));
    }

    const info4 = await inquirer.prompt({
        name: "form4",
        type: "list",
        message: "Select the course you wish to enroll in.",
        choices: ["Web development", "Web designing", "Cybersecurity"],
    });

    const info8 = await inquirer.prompt({
        name: "form8",
        type: "input",
        message: "Enter your balance:"
    });

    const info9 = await inquirer.prompt({
        name: "form9",
        type: "input",
        message: "Please pay $10 for tuition fees:",
        validate: validateDollars
    });

    const info10 = await inquirer.prompt({
        name: "form10",
        type: "list",
        message: "Select the given options.",
        choices: ["Show status", "Exit"]
    });

    if (info10.form10 === "Show status") {
        const userStatus = {
            user_Id: userId,
            user_Name: info2.form2,
            your_Balance: info8.form8,
            tuition_Fees: info9.form9,
            courses_you_enrolled: info4.form4
        };
        console.log(chalk.blue(JSON.stringify(userStatus, null, 2)));
    }

    console.log(chalk.yellowBright.bold("\n\tThank you for visiting us!!\n\t"));
};

main().catch((error) => console.error(chalk.red(error)));

