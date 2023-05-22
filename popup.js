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


document.getElementById("generate").onclick = function() {
    document.getElementById("output").textContent = generate();
}

document.getElementById("copy").onclick = function() {
    navigator.clipboard.writeText(document.getElementById("output").textContent);
}