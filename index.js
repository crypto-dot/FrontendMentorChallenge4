(function styleSliderDisplayValue() {
    document.getElementById("mainSlider").addEventListener("input", (e) => {
        let value = (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100;
        e.target.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) 0%, hsl(127, 100%, 82%) ${value}%, hsl(248, 15%, 11%) ${value}%, hsl(248, 15%, 11%) 100%)`;
        document.getElementById("sliderValue").textContent = e.target.value;
    });
})();

(function formSubmissionProcess() {
    const form = document.getElementById("form");
    const passwordOutput = document.getElementById("passwordOutput");
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', '\\', ':', ';', '"', "'", '<', ',', '>', '.', '?', '/', ' '];

    (function formSubmissionEventHandler() {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const lowercaseInput = document.getElementById("lowercase");
            const uppercaseInput = document.getElementById("uppercase");
            const symbolsInput = document.getElementById("symbols");
            const numbersInput = document.getElementById("numbers");
            const possibleEntries = generatePossibleEntries(lowercaseInput.checked, uppercaseInput.checked, symbolsInput.checked, numbersInput.checked);

            const password = generatePassword(possibleEntries);
            passwordOutput.textContent = password;
        });
    })();

    function generatePossibleEntries(hasLowercase, hasUppercase, hasSymbols, hasNumbers) {
        let possibleEntries = [];
        if (hasLowercase) {
            possibleEntries.push(...lowercase);
        }
        if (hasNumbers) {
            possibleEntries.push(...numbers);
        }
        if (hasUppercase) {
            possibleEntries.push(...uppercase);
        }
        if (hasSymbols) {
            possibleEntries.push(...symbols);
        }
        return possibleEntries;
    }
    function generatePassword(possibleEntries) {
        const passwordLength = Number(document.getElementById("sliderValue").textContent);
        let password = '';

        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * possibleEntries.length);
            password += possibleEntries[randomIndex];
        }
        return password;
    }
})();