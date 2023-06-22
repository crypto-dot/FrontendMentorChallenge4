
## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshots


### Links

- Solution URL: [Click for soluton website](https://crypto-dot.github.io/FrontendMentorChallenge4/)

## My process
    I first tackled the hardest parts. How to style the HTML5 slider element and how to style checkboxes without sacrificing semantic HTML. Then I worked on the Javascript part looking for simple libraries that can function as password strength display. Zxcvbn was the only library I could find at the time and it seemed very simple and straightfoward to use.
### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- [Zxcvbn](https://github.com/dropbox/zxcvbn) - JS library

### What I learned

This was a lot. I learned a lot from this project. I came into this project not knowing how to style the HTML5 range element and how to style checkboxes. First the range element. Now this I spent a long time researching. I tried my hardest to find a way to style the range element using CSS only given the constraints, however there is no possible way (you can use overflow hidden with box shadow but you essentially lose the ability to make the thumb bigger than the slider itself). So I went with JS that styles the background of the slider based on it's position (essentially it's moving the linear gradient as the user moves the slider (pretty neat) ). After this I styled the slider thumb (lots of accounting for moz vs webkit browsers). Next the input checkboxs. I decided to make the input elements of the checkbox 'invisible' and stretch over the my custom made checkboxes (I made the input elements have position absolute so they wouldn't affect the flow of the website). The reason I stretched them over the custom checkboxes was due to the fact that I could not reliably click my custom checkboxes to check them(clicking the label worked). As for the custom checkboxes I used pseudo ::before elements on the labels to style them accordingly. Now for the tricky part. The project came with a custom SVG checkmark that needed to be displayed when the user clicked on the checkbox itself. So I added another pseudo element (::after) on the label. This pseudo element had the background color and the white border with a z-index of 1. (essentially it covers the checkmark the greenbackground of the customcheckbox!). Doing this ensures that no JS is needed for this nice cool custom animation! Additionally, the resulting output of the HTML is semantically correct (no need for divs within divs!).

```js
(function styleSliderAndDisplayValue() {
    document.getElementById("mainSlider").addEventListener("input", (e) => {
        let value = (e.target.value - e.target.min) / (e.target.max - e.target.min) * 100;
        e.target.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) 0%, hsl(127, 100%, 82%) ${value}%, hsl(248, 15%, 11%) ${value}%, hsl(248, 15%, 11%) 100%)`;
        document.getElementById("sliderValue").textContent = e.target.value;
    });
})();
```


### Continued development

I need to get more comfortable with making custom radio, checkboxes, and HTML5 range inputs.

### Useful resources

- [W3 tooltip CSS](https://www.w3schools.com/css/css_tooltip.asp) - Helped me with generating a tool tip
- [W3 clipboard](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_copy_clipboard) -  helped with copy to user's clipboard
- [Password strength](https://github.com/dropbox/zxcvbn) -  helped with password strength generation
- [CSS Triangle](https://css-tricks.com/snippets/css/css-triangle/) -  Useful for the tooltip
- [HTML5 range custom CSS/JS](https://stackoverflow.com/questions/18389224/how-to-style-html5-range-input-to-have-different-color-before-and-after-slider) - This helped expose me to several different ideas on how to customize the slider ultimately I went with the little bit of JS and CSS option.

## Author

- Website - [Carlos Arbizu](https://arbizu.dev)
- Frontend Mentor - [@crypto-dot](https://www.frontendmentor.io/profile/crypto-dot)

