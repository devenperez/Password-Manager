let generatedPasswords = [];

let length = 10;
let allowLetters = true;
let allowNumbers = true;
let allowSymbols = true;

// let minLowerCase = 1;
// let minUpperCase = 1;
// let minNumbers = 1;
// let minSymbols = 1;

const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const symbols = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";

function generate() {
    // Securely get random values
    let randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);

    // Combine symbols
    let validSymbols = "";
    if (allowLetters) validSymbols += lowerCase + upperCase;
    if (allowNumbers) validSymbols += numbers;
    if (allowSymbols) validSymbols += symbols;

    // Generate random password
    let pwd = "";
    for (let i = 0; i < length; i++) {
        pwd += validSymbols[randomValues[i] % validSymbols.length]
        randomValues[i] = 0;
    }

    return pwd;
}


document.getElementById("letters").checked = allowLetters;
document.getElementById("numbers").checked = allowNumbers;
document.getElementById("symbols").checked = allowSymbols;

document.getElementById("letters").onclick = function() {
    allowLetters = !allowLetters;
}

document.getElementById("numbers").onclick = function() {
    allowNumbers = !allowNumbers;
}

document.getElementById("symbols").onclick = function() {
    allowSymbols = !allowSymbols;
}

document.getElementById("copy").onclick = function() {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
}

document.getElementById("back").onclick = function() {
    document.location.href = "popup.html";
}

document.getElementById("generate").onclick = function() {
    let pwd = generate();
    document.getElementById("output").textContent = pwd;
    if (generatedPasswords.length == 3) {
        generatedPasswords.shift();
    }
    generatedPasswords.push([pwd, Date.now()]);
    document.getElementById("ub" + generatedPasswords.length).hidden = false;

    let passwordFields = document.getElementsByClassName("used-password");
    let timeFields = document.getElementsByClassName("used-time");
    generatedPasswords.forEach((ptPair, i) => {
        passwordFields[generatedPasswords.length - 1 - i].innerText = ptPair[0];
        timeFields[generatedPasswords.length - 1 - i].innerText = new Date(ptPair[1]).toUTCString();
    });
    
}

document.getElementById("save").onclick = function() {
    chrome.storage.local.get(["logins"])
    .then(data => { 
        if (data.logins == undefined) {
            chrome.storage.local.set({ logins: [] });
        }

        chrome.storage.session.get(["unlockKey"])
        .then(sessionData => {
            data.logins.push({
                title: document.getElementById("login-title").value,
                email: document.getElementById("login-email").value,
                password: CryptoJS.AES.encrypt(
                    document.getElementById("output").value,
                    sessionData.unlockKey)
                    .toString()
            });
            chrome.storage.local.set({logins: data.logins})
            .then(() => { document.location.href = "popup.html"; });
        })
    });
};

console.log(CryptoJS.AES.encrypt("Test", "password"));