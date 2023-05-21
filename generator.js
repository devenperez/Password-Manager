var length = 10;
var allowLetters = true;
var allowNumbers = true;
var allowSymbols = true;

var minLowerCase = 1;
var minUpperCase = 1;
var minNumbers = 1;
var minSymbols = 1;

const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const symbols = "~`!@#$%^&*()_-+={[}]|\\:;\"'<,>.?/";

function generate() {
    // Securely get random values
    var randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);

    // Combine symbols
    var validSymbols = "";
    if (allowLetters) validSymbols += lowerCase + upperCase;
    if (allowNumbers) validSymbols += numbers;
    if (allowSymbols) validSymbols += symbols;

    // Generate random password
    var pwd = "";
    for (var i = 0; i < length; i++) {
        pwd += validSymbols[randomValues[i] % validSymbols.length]
        randomValues[i] = 0;
    }

    return pwd;
}

