
(function styleSliderDisplayValue() {
    document.getElementById("mainSlider").addEventListener("input", (e) => {
        let value = (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100;
        e.target.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) 0%, hsl(127, 100%, 82%) ${value}%, hsl(248, 15%, 11%) ${value}%, hsl(248, 15%, 11%) 100%)`;
        document.getElementById("sliderValue").textContent = e.target.value;
    });
})();

(function AtLeastOneCheckBoxCheck() {
    const lowercaseInput = document.getElementById("lowercase");
    const uppercaseInput = document.getElementById("uppercase");
    const symbolsInput = document.getElementById("symbols");
    const numbersInput = document.getElementById("numbers");
    let numberSelected = 3;

    lowercaseInput.addEventListener("change", leastOneSelected);
    uppercaseInput.addEventListener("change", leastOneSelected);
    symbolsInput.addEventListener("change", leastOneSelected);
    numbersInput.addEventListener("change", leastOneSelected);

    function leastOneSelected(e) {
        if (!e.target.checked && numberSelected === 1) {
            e.target.checked = true;
        } else if (!e.target.checked) {
            numberSelected--;
        } else {
            numberSelected++;
        }
    }
})();

(function formSubmissionProcess() {
    const form = document.getElementById("form");
    const passwordOutput = document.getElementById("passwordOutput");
    const strengthOutput = document.getElementById("strengthOutput");

    let password = 'PTx1f5DaFX(Don\'t use this as your password idiot!)';

    let meterRating1 = document.getElementById("meterRating1");
    let meterRating2 = document.getElementById("meterRating2");
    let meterRating3 = document.getElementById("meterRating3");
    let meterRating4 = document.getElementById("meterRating4");

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
            password = generatePassword(lowercaseInput.checked, uppercaseInput.checked, symbolsInput.checked, numbersInput.checked);

            passwordOutput.textContent = password;
            const passwordStrength = setPasswordStrength(password);
            clearBackgroundColorMeters();
            fillPasswordStrengthMeter(passwordStrength);
        });
    })();

    function setPasswordStrength(password) {
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
        switch (passwordStrength) {
            case "STRONG":
                meterRating4.style.backgroundColor = backgroundColor;
                meterRating4.style.border = `2px solid ${backgroundColor}`;
            case "MEDIUM":
                meterRating3.style.backgroundColor = backgroundColor;
                meterRating3.style.border = `2px solid ${backgroundColor}`;
            case "WEAK":
                meterRating2.style.backgroundColor = backgroundColor;
                meterRating2.style.border = `2px solid ${backgroundColor}`;
            case "TOO WEAK!":
                meterRating1.style.backgroundColor = backgroundColor;
                meterRating1.style.border = `2px solid ${backgroundColor}`;
                break;
        }
    }

    function strengthBackgroundColor(passwordStrength) {
        const tooWeakBackgroundColor = "hsl(0,91%,63%)";
        const weakBackgroundColor = "hsl(13,95%,66%)";
        const mediumBackgroundColor = "hsl(42,91%,68%)";
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
        debugger;
        meterRating1.style.backgroundColor = "transparent";
        meterRating1.style.border = "2px solid hsl(252, 11%, 91%)"
        meterRating2.style.backgroundColor = "transparent";
        meterRating2.style.border = "2px solid hsl(252, 11%, 91%)"
        meterRating3.style.backgroundColor = "transparent";
        meterRating3.style.border = "2px solid hsl(252, 11%, 91%)"
        meterRating4.style.backgroundColor = "transparent";
        meterRating4.style.border = "2px solid hsl(252, 11%, 91%)"
    }

    function checkPasswordStrength(password) {
        return zxcvbn(password).score;
    }
    // Password generation process 

    //Forces the password to have an equal probability depending on the available options (For passwords greater than or equal to 8 characters it's guaranteed to have all the options (if all options are selected by the user))
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
    //Chooses a random character based on the option given
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
        const passwordLength = Number(document.getElementById("mainSlider").value);

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
    // password copy functionality
    // accesses the password stored in this module
    (function attachCopyEventListener() {
        const copyStatus = document.getElementById("copyStatus");
        const copySVG = document.getElementById("copy");
        copySVG.addEventListener("click", () => {
            copyStatus.style.opacity = '1';
            copySVG.style.pointerEvents = 'none';
            debugger;
            setTimeout(() => {
                debugger;
                copyStatus.style.opacity = '0';
                copySVG.style.pointerEvents = 'auto';
            }, 4000);
            window.navigator.clipboard.writeText(password).catch((err) => {
                copyStatus.textContent = 'Unsuccessful Copy';
            });
        });
    })();
})();