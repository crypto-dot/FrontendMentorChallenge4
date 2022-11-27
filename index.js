
(function styleSliderDisplayValue() {
    document.getElementById("mainSlider").addEventListener("input", (e) => {
        let value = (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100;
        e.target.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) 0%, hsl(127, 100%, 82%) ${value}%, hsl(248, 15%, 11%) ${value}%, hsl(248, 15%, 11%) 100%)`;
        document.getElementById("sliderValue").textContent = e.target.value;
    });
})();


(function AtLeastOneCheckBoxCheck() {

})();



(function formSubmissionProcess() {
    const form = document.getElementById("form");
    const passwordOutput = document.getElementById("passwordOutput");
    const strengthOutput = document.getElementById("strengthOutput");
    const meterRating1 = document.getElementById("meterRating1");
    const meterRating2 = document.getElementById("meterRating2");
    const meterRating3 = document.getElementById("meterRating3");
    const meterRating4 = document.getElementById("meterRating4");
    const numbers = '1234567890';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', '\\', ':', ';', '"', "'", '<', ',', '>', '.', '?', '/', ' '];

    (function formSubmissionEventHandler() {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const lowercaseInput = document.getElementById("lowercase");
            const uppercaseInput = document.getElementById("uppercase");
            const symbolsInput = document.getElementById("symbols");
            const numbersInput = document.getElementById("numbers");
            const password = generatePassword(lowercaseInput.checked, uppercaseInput.checked, symbolsInput.checked, numbersInput.checked);

            passwordOutput.textContent = password;
            const passwordStrength = setPasswordStrength(password);
            clearBackgroundColorMeters();
            fillPasswordStrengthMeter(passwordStrength);
        });
    })();

    function setPasswordStrength(password) {
        debugger;
        const passwordStrength = checkPasswordStrength(password);
        if (passwordStrength >= 3) {
            strengthOutput.textContent = "STRONG";
            return "STRONG";
        } else if (passwordStrength === 2) {
            strengthOutput.textContent = "MEDIUM";
            return "MEDIUM";
        } else if (passwordStrength === 1) {
            strengthOutput.textContent = "WEAK";
            return "WEAK";
        } else if (passwordStrength === 0) {
            strengthOutput.textContent = "TOO WEAK!";
            return "TOO WEAK!"
        }
    }
    function fillPasswordStrengthMeter(passwordStrength) {
        let backgroundColor = strengthBackgroundColor(passwordStrength);
        debugger;
        switch (passwordStrength) {
            case "STRONG":
                meterRating4.style.backgroundColor = backgroundColor;
            case "MEDIUM":
                meterRating3.style.backgroundColor = backgroundColor;
            case "WEAK":
                meterRating2.style.backgroundColor = backgroundColor;
            case "TOO WEAK!":
                meterRating1.style.backgroundColor = backgroundColor;
                break;
        }
    }

    function strengthBackgroundColor(passwordStrength) {
        const tooWeakBackgroundColor = "hsl(0,91%,63%)";
        const weakBackgroundColor = "hsl(42,91%,68%)";
        const mediumBackgroundColor = "hsl(13,95%,66%)";
        const strongBackgroundColor = "hsl(127,100%,82%)";

        if (passwordStrength === "STRONG") {
            return strongBackgroundColor;
        } else if (passwordStrength === "MEDIUM") {
            return mediumBackgroundColor;
        } else if (passwordStrength === "WEAK") {
            return weakBackgroundColor;
        } else {
            return tooWeakBackgroundColor;
        }
    }

    function clearBackgroundColorMeters() {
        meterRating1.style.backgroundColor = "transparent";
        meterRating2.style.backgroundColor = "transparent";
        meterRating3.style.backgroundColor = "transparent";
        meterRating4.style.backgroundColor = "transparent";
    }

    function checkPasswordStrength(password) {
        return zxcvbn(password).score;
    }

    function generateOptions(options, hasLowercase, hasUppercase, hasSymbols, hasNumbers) {
        if (hasNumbers) {
            options.push("numbers");
        } if (hasLowercase) {
            options.push("lowercase");
        } if (hasSymbols) {
            options.push("symbols");
        } if (hasUppercase) {
            options.push("uppercase");
        }
        return options
    }

    function generateRandomCharacter(randomOption) {
        switch (randomOption) {
            case "symbols":
                {
                    const randomIndex = window.crypto.getRandomValues(new Uint8Array(1))[0] % symbols.length;
                    return symbols[randomIndex];
                }
            case 'uppercase':
                {
                    const randomIndex = window.crypto.getRandomValues(new Uint8Array(1))[0] % lowercase.length;
                    return lowercase[randomIndex].toUpperCase();
                }
            case 'lowercase':
                {
                    const randomIndex = window.crypto.getRandomValues(new Uint8Array(1))[0] % lowercase.length;
                    return lowercase[randomIndex];
                }
            case 'numbers':
                {
                    const randomIndex = window.crypto.getRandomValues(new Uint8Array(1))[0] % numbers.length;
                    return numbers[randomIndex];
                }
        }
    }
    function generatePassword(hasLowercase, hasUppercase, hasSymbols, hasNumbers) {
        const passwordLength = Number(document.getElementById("sliderValue").textContent);
        let options = [];
        options = generateOptions(options, hasLowercase, hasUppercase, hasSymbols, hasNumbers);
        let password = '';

        for (let i = 0; i < passwordLength; i++) {
            if (options.length === 0) {
                options = generateOptions(options, hasLowercase, hasUppercase, hasSymbols, hasNumbers);
            }
            const randomIndex = window.crypto.getRandomValues(new Uint8Array(1))[0] % options.length;
            password += generateRandomCharacter(options[randomIndex]);
            options.splice(randomIndex, 1);
        }
        return password;
    }
})();