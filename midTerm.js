/**
 *   @author Bloswick, John (bloswickj@student.ncmich.edu)
 *   @version 0.0.1
 *   @summary Project 1 || created: 09.17.2016
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let cardNumbers = [], cardPins = [], checkingBalances = [], savingsBalances = [];
let cardHolderNames = [];
let currentUserIndex, currentCardNumber, currentCardPin, currentMenuLength;
let currentCardHolderName, currentMenu;
let continueResponse, validLogin;

function main(){
    populateAccountInformation();
    if (continueResponse == null) {
        setContinueResponse();
    }
    setValidLogin();
    if(validLogin == 1){
        currentMenu = "MAIN";
        while (continueResponse == 1) {
            directUser();
        }
        printGoodbye();
    }
}

main();

function populateAccountInformation(){
    cardNumbers [0] = 1234123412341234;
    cardHolderNames [0] = "John Smith";
    cardPins [0] = 1234;
    checkingBalances [0] = 1000.00;
    savingsBalances [0] = 1000.00;
    cardNumbers [1] = 5678567856785678;
    cardHolderNames [1] = "Mary Jane";
    cardPins [1] = 5678;
    checkingBalances [1] = 1000.00;
    savingsBalances [1] = 1000.00;
}

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? \n1. Yes\n0. No\nPlease make a selection: `));
        }
    } else {
        continueResponse = 1;
    }
}

function setValidLogin() {
    let continueLogIn = 0;
    validLogin = 0;
    continueLogIn = setCurrentCardNumber();
    if (continueLogIn == 1) {
        continueLogIn = 0;
        continueLogIn = setCurrentCardHolderName();
        if (continueLogIn == 1){
            continueLogIn = 0;
            continueLogIn = setCurrentPin();
            if (continueLogIn == 1) {
                validLogin = 1;
            }
        }
    }
}

function setCurrentCardNumber(){
    process.stdout.write('\x1Bc');
    currentCardNumber = PROMPT.question("Please enter the card number: ");
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j <= cardNumbers.length; j++) {
            if (currentCardNumber == cardNumbers[j]) {
                currentUserIndex = j;
                return 1;
            }
        }
        process.stdout.write('\x1Bc');
        console.log("That is not a valid card number.");
        currentCardNumber = PROMPT.question("\nPlease enter the card number: ");
    }
    process.stdout.write('\x1Bc');
    console.log("Too many failed attempts.");
}

function setCurrentCardHolderName() {
    process.stdout.write('\x1Bc');
    currentCardHolderName = PROMPT.question("Please enter the card holders name: ");
    for (let i = 0; i < cardNumbers.length; i++) {
        if (i == 3){
            console.log("Too many failed attempts.");
        }
        else if (currentCardHolderName == cardHolderNames[currentUserIndex]) {
            return 1;
        }
        else {
            process.stdout.write('\x1Bc');
            currentCardHolderName = PROMPT.question("Please enter the card holders name: ");
            console.log("That name does not match the name on the account.");
        }
    }
    process.stdout.write('\x1Bc');
    console.log("Too many failed attempts.");
}

function setCurrentPin() {
    process.stdout.write('\x1Bc');
    currentCardPin = PROMPT.question("Please enter the cards pin: ");
    for (let i = 0; i < cardNumbers.length; i++) {
        if (i == 3){
            console.log("Too many failed attempts.");
        }
        else if (currentCardPin == cardPins[currentUserIndex]) {
            return 1;
        }
        else {
            process.stdout.write('\x1Bc');
            console.log("That pin is not valid.");
            currentCardPin = PROMPT.question("Please enter the cards pin: ");
        }
    }
    process.stdout.write('\x1Bc');
    console.log("Too many failed attempts.");
}

function getUserInput() {
    let userInput;
    let validChoice = 0;
    while (validChoice == 0) {
        userInput = PROMPT.question("Please make a selection: ");
        if (userInput < 0 || userInput > currentMenuLength) {
            console.log("That is not a valid selection.")
        }
        else {
            validChoice = 1;
        }
    }
    return userInput;
}

function directUser() {
    let userInput;
    if (continueResponse == 1) {
        process.stdout.write('\x1Bc');
        printCurrentMenu();
        userInput = getUserInput();
        if (currentMenu == "MAIN") {
            if (userInput == 0) {
                continueResponse = 0;
            }
            else if (userInput == 1) {
                currentMenu = "VIEW BALANCE";
                return directUser();
            }
            else if (userInput == 2){
                currentMenu = "WITHDRAW MENU";
                return directUser();
            }
            else if (userInput == 3){
                currentMenu = "DEPOSIT MENU";
                return directUser();
            }
            else if (userInput == 4){
                currentMenu = "TRANSFER MENU";
                return directUser();
            }

        }
        else if (currentMenu == "VIEW BALANCE") {
            if (userInput == 0) {
                currentMenu = "MAIN";
                return directUser();
            }
            else if (userInput == 1) {

                currentMenu = "VIEW BALANCE";
                viewSavingsBalance();
                return directUser();
            }
            else if (userInput == 2) {

                currentMenu = "VIEW BALANCE";
                viewCheckingBalance();
                return directUser();
            }
        }
        else if (currentMenu == "WITHDRAW MENU"){
            if (userInput == 0) {
                currentMenu = "MAIN";
                return directUser();
            }
            else if (userInput == 1) {
                withdrawSaving();
                return directUser();
            }
            else if (userInput == 2) {
                withdrawChecking();
                return directUser();
            }
        }
        else if (currentMenu == "DEPOSIT MENU"){
            if (userInput == 0) {
                currentMenu = "MAIN";
                return directUser();
            }
            else if (userInput == 1) {
                depositSavings();
                return directUser();
            }
            else if (userInput == 2) {
                depositChecking();
                return directUser();
            }
        }
        else if (currentMenu == "TRANSFER MENU"){
            if (userInput == 0) {
                currentMenu = "MAIN";
                return directUser();
            }
            else if (userInput == 1) {
                transferSavingsToChecking();
                return directUser();
            }
            else if (userInput == 2) {
                transferCheckingToSavings();
                return directUser();
            }
        }
    }
}

function printCurrentMenu() {
    if (currentMenu == "MAIN"){
        printMainMenu();
    }
    else if (currentMenu == "VIEW BALANCE"){
        printBalanceMenu();
    }
    else if (currentMenu == "WITHDRAW MENU"){
        printWithdrawMenu();
    }
    else if (currentMenu == "DEPOSIT MENU"){
        printDepositMenu();
    }
    else if (currentMenu == "TRANSFER MENU"){
        printTransferMenu();
    }
}

function printMainMenu() {
    currentMenuLength = 5;
    console.log("0. Exit");
    console.log("1. View Balance");
    console.log("2. Withdraw");
    console.log("3. Deposit");
    console.log("4. Transfer");
}

function printBalanceMenu(){
    currentMenuLength = 3;
    console.log("0. Main Menu");
    console.log("1. View savings balance.");
    console.log("2. View checking balance.");
}

function printWithdrawMenu() {
    currentMenuLength = 3;
    console.log("0. Cancel");
    console.log("1. Withdraw from savings.");
    console.log("2. Withdraw from checking.");
}

function printDepositMenu(){
    currentMenuLength = 3;
    console.log("0. Cancel");
    console.log("1. Deposit to savings.");
    console.log("2. Deposit to checking.");
}

function printTransferMenu(){
    currentMenuLength = 3;
    console.log("0. Cancel");
    console.log("1. Transfer from savings to checking.");
    console.log("2. Transfer from checking to savings.");
}

function printGoodbye() {
    process.stdout.write('\x1Bc');
    console.log("Goodbye.")
}

function viewSavingsBalance(){
    console.log(`Your Savings account balance is: \$${savingsBalances[currentUserIndex]}`);
    setContinueResponse();

}

function viewCheckingBalance(){
    console.log(`Your Checking account balance is: \$${checkingBalances[currentUserIndex]}`);
    setContinueResponse();
}

function withdrawSaving(){
    let withdrawAmount;
    withdrawAmount = PROMPT.question("How much do you want to withdraw from savings?\nAmount to withdraw: ");
    if (withdrawAmount > savingsBalances[currentUserIndex] || withdrawAmount < 0){
        console.log("You cannot withdraw that much.");
        return withdrawSaving();
    }
    else {
       savingsBalances[currentUserIndex] = parseFloat(savingsBalances[currentUserIndex]) - parseFloat(withdrawAmount);
    }
    setContinueResponse();
}

function withdrawChecking(){
    let withdrawAmount;
    withdrawAmount = PROMPT.question("How much do you want to withdraw from checking?\nAmount to withdraw: ");
    if (withdrawAmount > checkingBalances[currentUserIndex] || withdrawAmount < 0){
        console.log("You cannot withdraw that much.");
        return withdrawChecking();
    }
    else {
        checkingBalances[currentUserIndex] = parseFloat(checkingBalances[currentUserIndex]) - parseFloat(withdrawAmount);
    }
    setContinueResponse();
}

function depositSavings(){
    let depositAmount;
    depositAmount = PROMPT.question("How much do you want to deposit to savings?\nAmount to deposit: ");
    savingsBalances[currentUserIndex] = parseFloat(savingsBalances[currentUserIndex]) + parseFloat(depositAmount);
    setContinueResponse();
}

function depositChecking(){
    let depositAmount;
    depositAmount = PROMPT.question("How much do you want to deposit to checking?\nAmount to deposit: ");
    checkingBalances[currentUserIndex] = parseFloat(checkingBalances[currentUserIndex]) + parseFloat(depositAmount);
    setContinueResponse();
}

function transferSavingsToChecking(){
    let transferAmount;
    transferAmount = PROMPT.question("How much do you want to transfer from savings to checking?\nAmount to transfer: ");
        if (transferAmount > savingsBalances[currentUserIndex]){
        console.log("You cannot transfer that much.");
        return transferSavingsToChecking()
    }
    savingsBalances[currentUserIndex] = parseFloat(savingsBalances[currentUserIndex]) - parseFloat(transferAmount);
    checkingBalances[currentUserIndex] = parseFloat(checkingBalances[currentUserIndex]) + parseFloat(transferAmount);
    setContinueResponse();
}

function transferCheckingToSavings(){
    let transferAmount;
    transferAmount = PROMPT.question("How much do you want to transfer from checking to savings?\nAmount to transfer: ");
    if (transferAmount > checkingBalances[currentUserIndex]){
        console.log("You cannot transfer that much.");
        return transferCheckingToSavings()
    }
    checkingBalances[currentUserIndex] = parseFloat(checkingBalances[currentUserIndex]) - parseFloat(transferAmount);
    savingsBalances[currentUserIndex] = parseFloat(savingsBalances[currentUserIndex]) + parseFloat(transferAmount);
    setContinueResponse();
}


