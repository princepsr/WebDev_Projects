const inputSlider = document.querySelector("[atr-lengthSlider]"); //selecting using custom attribute i.e lengthSlider
const passLength = document.querySelector("[atr-pswrdLength]");
const pswrdDisplay = document.querySelector("[atr-pswrdDisplay]");

const copyBtn = document.querySelector("[atr-Copy]");
const copyMsg = document.querySelector("[atr-CopyMsg]");

const uppercaseCheck = document.getElementById("Uppercase");
const lowercaseCheck = document.getElementById("Lowercase");
const numbersCheck = document.getElementById("Numbers");
const symbolsCheck = document.getElementById("Symbols");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

const indicator = document.querySelector("[atr-strengthIndicator]");
const generateBtn = document.getElementsByClassName("generateButton");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

function handleSlider(num=10){
    inputSlider.value = num;
    passLength.innerText = inputSlider.value;

    // used to modify css property of slider
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passLength.innerText-min)*100/(max-min)) + "% 100%";
}
handleSlider();

// whenever there is a change in input of slider it fires event which calls handleSlider function
inputSlider.addEventListener('input', (event)=>{
    handleSlider(event.target.value);
})

async function copyContent() {
    try {
        await navigator.clipboard.writeText(pswrdDisplay.value); //method to copy content on clipboard
        copyMsg.innerText = "Copied"
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add('active');

    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000)
}

// when we click on copy Btn it calls copyContent() if pswrdDisplay is not empty
copyBtn.addEventListener("click", () => {
    if (pswrdDisplay.value)
        copyContent();
});

function handleCheckBoxChange() {
    checkCount = 0; // everytime a box is clicked it starts counting checked boxes from 0
    allCheckbox.forEach((checkBox) => {
        if (checkBox.checked)
            checkCount++;
    });

    if (passLength.innerText < checkCount) {
        handleSlider(checkCount);
    }
}

let checkCount = 1; // 1 box is checked by default
allCheckbox.forEach((checkBox) => {
    checkBox.addEventListener('change', handleCheckBoxChange); // call fn when any of the checkbox is clicked
})

function setIndicator(color='#ccc') {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}
setIndicator();

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passLength.innerText >= 8) {
        setIndicator("#0f0");
    }
    else if (hasNumber && hasSymbol && (hasLower || hasUpper) && passLength.innerText >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasLower || hasUpper) && (hasNumber || hasSymbol) && passLength.innerText >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

// shuffle array randomly by using the Fisher-Yates Algorithm (aka Knuth) Shuffle.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { // i is the last index
        const j = Math.floor(Math.random() * (i + 1)); // j is random index by help of random fn b/w 0 and i+1
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp; // swapping values of ith and jth index
    }
    let str = "";
    array.forEach((el) => (str += el)); // adding elements of array to empty string
    return str;
}


function getRndmInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateNumber() {
    return getRndmInt(0, 9);
}

function generateLowercase() {
    return String.fromCharCode(getRndmInt(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRndmInt(65, 91));
}

function generateSymbol() {
    const randNum = getRndmInt(0, symbols.length - 1);
    return symbols.charAt(randNum);
}

let password = "";

//getelement by class name gives array of elements of that class,thats why we using generateBtn[0] for 1st element
generateBtn[0].addEventListener('click',()=>{
    
    // none of the checkboxes are selected
    if(checkCount<=0) return;
    
    // if length of password is less than check count
    if (passLength.innerText < checkCount) {
        handleSlider(checkCount);
    }
    
    // remove previous generated password
    password="";

    let arrayOfCheckedFunction = [];
    
    if (uppercaseCheck.checked) arrayOfCheckedFunction.push(generateUppercase);
    if (lowercaseCheck.checked) arrayOfCheckedFunction.push(generateLowercase);
    if (numbersCheck.checked) arrayOfCheckedFunction.push(generateNumber);
    if (symbolsCheck.checked) arrayOfCheckedFunction.push(generateSymbol);

    // Compulsory Addition
    for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
        password += arrayOfCheckedFunction[i]();
    }

    // Additional addition
    for (let i = 0; i < passLength.innerText - arrayOfCheckedFunction.length; i++) {
        let randIndex = getRndmInt(0, arrayOfCheckedFunction.length);
        password += arrayOfCheckedFunction[randIndex]();
    }

    // Shuffle Password 
    password = shuffle(Array.from(password)); // creating array from password
    pswrdDisplay.value = password;
    calcStrength();
});