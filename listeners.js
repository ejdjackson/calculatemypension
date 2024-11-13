
document.addEventListener('DOMContentLoaded', function() {
    
    
    initialiseInputsAndCheckboxes(); 
    checkAllCheckboxesAndToggleInputs(); 
    
    var planAsCouple = false;
    if (localStorage.getItem('planAsCouple') === "true") {
        planAsCouple = true;
    } 
    
    checkRequiredInputs(planAsCouple);
    calculateSinglesPension();
    /* playCalcSound(); */
});



// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('#pensionFormLeft input, #pensionFormRight input');
var firstCalc = true;

// Add event listeners to hide results on input change
inputFields.forEach(function(input) {
        input.addEventListener('input', checkFirstCalc);
    }
);

// Load the sound once for use with all checkboxes
/* const calcSound = new Audio('Sounds/flashlight-switch-102792.mp3.mp3');
calcSound.load(); // Preload the sound */

// Function to play the sound if a checkbox is checked
/* function playCalcSound() {
    calcSound.currentTime = 0; // Reset to the beginning
    calcSound.play();
} */

function saveToLocalStorage(key, value) {
    // Store the value in localStorage, converting booleans for checkboxes
    localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
  }



function storeInputsInLocalStorage() {
    // Store values in localStorage
    localStorage.setItem('retirementAge', document.getElementById("retirementAge").value);
    localStorage.setItem('endAge', document.getElementById("endAge").value);
    localStorage.setItem('monthlyContribution', document.getElementById("monthlyContribution").value);
    localStorage.setItem('stepUpAge', document.getElementById("stepUpAge").value);
    localStorage.setItem('stepUpContribution', document.getElementById("stepUpContribution").value);
    localStorage.setItem('desiredIncome', document.getElementById("desiredIncome").value); // Store without multiplying by 12
    localStorage.setItem('monthlyISAContribution', document.getElementById("monthlyISAContribution").value);
    localStorage.setItem('minISABalance', document.getElementById("minISABalance").value);
    localStorage.setItem('finalFund', document.getElementById("finalFund").value);
    localStorage.setItem('useScottishTax', document.getElementById("useScottishTax").checked);
    localStorage.setItem('fundGrowthPre', document.getElementById("fundGrowthPre").value);
    localStorage.setItem('fundGrowthPost', document.getElementById("fundGrowthPost").value);
    localStorage.setItem('fundCharges', document.getElementById("fundCharges").value);
    localStorage.setItem('taxFreeCashPercent', document.getElementById("taxFreeCashPercent").value);
    localStorage.setItem('inflation', document.getElementById("inflation").value);
    localStorage.setItem('applyInflationAdjustment', document.getElementById("applyInflationAdjustment").checked);
    localStorage.setItem('frequencySlider', document.getElementById("frequencySlider").checked);
    localStorage.setItem('marketCrashAge', document.getElementById("marketCrashAge").value);
    localStorage.setItem('marketCrashPercent', document.getElementById("marketCrashPercent").value);
    localStorage.setItem('minISABalanceCheckbox', document.getElementById("minISABalanceCheckbox").checked);
    localStorage.setItem('finalFundCheckbox', document.getElementById("finalFundCheckbox").checked);
    localStorage.setItem('contributionIncreaseCheckbox', document.getElementById("contributionIncreaseCheckbox").checked);
    localStorage.setItem('useScottishTax', document.getElementById("useScottishTax").checked);
    localStorage.setItem('inflationCheckBox', document.getElementById("inflationCheckBox").checked);
    localStorage.setItem('fundGrowthCheckbox', document.getElementById("fundGrowthCheckbox").checked);
    localStorage.setItem('lowerGrowthCheckbox', document.getElementById("lowerGrowthCheckbox").checked);
    localStorage.setItem('fundChargesCheckbox', document.getElementById("fundChargesCheckbox").checked);
    localStorage.setItem('modelMarketCrashCheckbox', document.getElementById("modelMarketCrashCheckbox").checked);
    
    localStorage.setItem('desiredCombinedIncome', document.getElementById("desiredCombinedIncome").value);
    localStorage.setItem('monthlyContributionPartner', document.getElementById("monthlyContributionPartner").value);
    localStorage.setItem('monthlyISAContributionPartner', document.getElementById("monthlyISAContributionPartner").value);

}



  function initialiseInputsAndCheckboxes() {
    // Check for each input field, if no localStorage value exists, use the initial HTML value
    
    if (!localStorage.getItem('monthlyContribution')) {
        document.getElementById('monthlyContribution').value = '0'; // Initial value
    } else {
        document.getElementById('monthlyContribution').value = localStorage.getItem('monthlyContribution');
    }

    if (!localStorage.getItem('monthlyISAContribution')) {
        document.getElementById('monthlyISAContribution').value = '0'; // Initial value
    } else {
        document.getElementById('monthlyISAContribution').value = localStorage.getItem('monthlyISAContribution');
    }

    if (!localStorage.getItem('desiredCombinedIncome')) {
        document.getElementById('desiredCombinedIncome').value = '0'; // Initial value
    } else {
        document.getElementById('desiredCombinedIncome').value = localStorage.getItem('desiredCombinedIncome');
    }

    if (!localStorage.getItem('monthlyContributionPartner')) {
        document.getElementById('monthlyContributionPartner').value = '0'; // Initial value
    } else {
        document.getElementById('monthlyContributionPartner').value = localStorage.getItem('monthlyContributionPartner');
    }

    if (!localStorage.getItem('monthlyISAContributionPartner')) {
        document.getElementById('monthlyISAContributionPartner').value = '0'; // Initial value
    } else {
        document.getElementById('monthlyISAContributionPartner').value = localStorage.getItem('monthlyContributionPartner');
    }

    if (!localStorage.getItem('finalFund')) {
        document.getElementById('finalFund').value = '0'; // Initial value
    } else {
        document.getElementById('finalFund').value = localStorage.getItem('finalFund');
    }
    
    if (!localStorage.getItem('minISABalance')) {
        document.getElementById('minISABalance').value = '0'; // Initial value
    } else {
        document.getElementById('minISABalance').value = localStorage.getItem('minISABalance');
    }

    if (!localStorage.getItem('stepUpAge')) {
        document.getElementById('stepUpAge').value = '0'; // Initial value
    } else {
        document.getElementById('stepUpAge').value = localStorage.getItem('stepUpAge');
    }

    if (!localStorage.getItem('stepUpContribution')) {
        document.getElementById('stepUpContribution').value = '0'; // Initial value
    } else {
        document.getElementById('stepUpContribution').value = localStorage.getItem('stepUpContribution');
    }

    if (!localStorage.getItem('retirementAge')) {
        document.getElementById('retirementAge').value = '65'; // Initial value
    } else {
        document.getElementById('retirementAge').value = localStorage.getItem('retirementAge');
    }

    if (!localStorage.getItem('desiredIncome')) {
        document.getElementById('desiredIncome').value = '0'; // Initial value
    } else {
        document.getElementById('desiredIncome').value = localStorage.getItem('desiredIncome');
    }

    if (!localStorage.getItem('endAge')) {
        document.getElementById('endAge').value = '95'; // Initial value
    } else {
        document.getElementById('endAge').value = localStorage.getItem('endAge');
    }

    if (!localStorage.getItem('taxFreeCashPercent')) {
        document.getElementById('taxFreeCashPercent').value = '0'; // Initial value
    } else {
        document.getElementById('taxFreeCashPercent').value = localStorage.getItem('taxFreeCashPercent') ;
    }

    if (!localStorage.getItem('inflation')) {
        document.getElementById('inflation').value = '3'; // Initial value
    } else {
        document.getElementById('inflation').value = localStorage.getItem('inflation');
    }

    if (!localStorage.getItem('fundGrowthPre')) {
        document.getElementById('fundGrowthPre').value = '7'; // Initial value
    } else {
        document.getElementById('fundGrowthPre').value = localStorage.getItem('fundGrowthPre');
    }

    if (!localStorage.getItem('marketCrashAge')) {
        document.getElementById('marketCrashAge').value = '0'; // Initial value
    } else {
        document.getElementById('marketCrashAge').value = localStorage.getItem('marketCrashAge');
    }
    
    if (!localStorage.getItem('marketCrashPercent')) {
        document.getElementById('marketCrashPercent').value = '0'; // Initial value
    } else {
        var test =  localStorage.getItem('marketCrashPercent');
        document.getElementById('marketCrashPercent').value = localStorage.getItem('marketCrashPercent');
    }
   
    

    if (!localStorage.getItem('fundGrowthPost')) {
        document.getElementById('fundGrowthPost').value = '4'; // Initial value
    } else {
        var test2= localStorage.getItem('fundGrowthPost');
        document.getElementById('fundGrowthPost').value = localStorage.getItem('fundGrowthPost');
    }

    if (!localStorage.getItem('fundCharges')) {
        document.getElementById('fundCharges').value = '0'; // Initial value
    } else {
        document.getElementById('fundCharges').value = localStorage.getItem('fundCharges');
    }

    // Checkboxes
    document.getElementById('finalFundCheckbox').checked = (localStorage.getItem('finalFundCheckbox') === 'true');
    document.getElementById('minISABalanceCheckbox').checked = (localStorage.getItem('minISABalanceCheckbox') === 'true');
    document.getElementById('contributionIncreaseCheckbox').checked = (localStorage.getItem('contributionIncreaseCheckbox') === 'true');
    document.getElementById('useScottishTax').checked = (localStorage.getItem('useScottishTax') === 'true');
    document.getElementById('inflationCheckBox').checked = (localStorage.getItem('inflationCheckBox') === 'true');
    document.getElementById('fundGrowthCheckbox').checked = (localStorage.getItem('fundGrowthCheckbox') === 'true');
    document.getElementById('lowerGrowthCheckbox').checked = (localStorage.getItem('lowerGrowthCheckbox') === 'true');
    document.getElementById('fundChargesCheckbox').checked = (localStorage.getItem('fundChargesCheckbox') === 'true');
    document.getElementById('applyInflationAdjustment').checked = (localStorage.getItem('applyInflationAdjustment') === 'true');
    document.getElementById('modelMarketCrashCheckbox').checked = (localStorage.getItem('modelMarketCrashCheckbox') === 'true');
    document.getElementById('frequencySlider').checked = (localStorage.getItem('frequencySlider') === 'true');

}


function checkAllCheckboxesAndToggleInputs() {
    
    // Plan As A Couple Inputs
    const planAsCouple =  (localStorage.getItem('planAsCouple') === 'true');
    if (planAsCouple) {
        showPartnerContributionInputs();
    } else {
        hidePartnerContributionInputs();
    }
    

    // Contribution Increase Inputs
    const contributionIncreaseCheckbox = document.getElementById('contributionIncreaseCheckbox');
    if (contributionIncreaseCheckbox.checked) {
        showStepUpInputs();
    } else {
        hideStepUpInputs();
    }

    const modelMarketCrashCheckbox = document.getElementById('modelMarketCrashCheckbox');
    if (modelMarketCrashCheckbox.checked) {
        showMarketCrashInputs();
    } else {
        hideMarketCrashInputs();
    }
    

    // Lower Growth Inputs
    const lowerGrowthCheckbox = document.getElementById('lowerGrowthCheckbox');
    if (lowerGrowthCheckbox.checked) {
        showLowerGrowthInput();
    } else {
        hideLowerGrowthInput();
    }

    // Final Fund Inputs
    const finalFundCheckbox = document.getElementById('finalFundCheckbox');
    if (finalFundCheckbox.checked) {
        showFinalFundInputs();
    } else {
        hideFinalFundInputs();
    }

    // Minimum ISA Balance Inputs
    const minISABalanceCheckbox = document.getElementById('minISABalanceCheckbox');
    if (minISABalanceCheckbox.checked) {
        showMinISABalanceInputs();
    } else {
        hideMinISABalanceInputs();
    }

    

    // Fund Charges Inputs
    const fundChargesCheckbox = document.getElementById('fundChargesCheckbox');
    if (fundChargesCheckbox.checked) {
        showFundChargesInput();
    } else {
        hideFundChargesInput();
    }

   

    // Inflation Inputs
    const inflationCheckBox = document.getElementById('inflationCheckBox');
    if (inflationCheckBox.checked) {
        showInflationInput();
    } else {
        hideInflationInput();
    }

    // Fund Growth Inputs
    const fundGrowthCheckBox = document.getElementById('fundGrowthCheckbox');
    if (fundGrowthCheckBox.checked) {
        showFundGrowthInput();
    } else {
        hideFundGrowthInput();
    }

  
}







/* // Sound for checkboxes
const checkboxCheckSound = new Audio('Sounds/flashlight-switch-102792.mp3');
checkboxCheckSound.load(); // Preload the sound

// Function to play the sound if a checkbox is checked
function playCheckSound() {
    checkboxCheckSound.currentTime = 0; // Reset to the beginning
    checkboxCheckSound.play();
} */

// Select all checkboxes except those with the 'switch' class and add an event listener to each
document.querySelectorAll('input[type="checkbox"]:not(.switch)').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            /* playCheckSound(); */ // Play sound only if checkbox is checked and not a switch
        }
    });
});




// Preload the click sound
/* const clickSound = new Audio('Sounds/Notification - clicking.mp3');
 */
// Function to play the sound
/* function playClickSound() {
    clickSound.currentTime = 0; // Reset sound to the beginning
    clickSound.play();
} */


// Monthly Contribution Increment
document.querySelector('.contributionIncrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let maxValue = window.maxAnnualPensionContribution / 12;

    // Calculate the nearest multiple of the step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Increment from the nearest multiple
    if (nearestMultiple + stepValue <= maxValue) {
        input.value = nearestMultiple + stepValue;
    } else {
        input.value = maxValue; // Set to max if increment exceeds max value
    }


    saveToLocalStorage("monthlyContribution", input.value);
    /* playClickSound(); */
    checkFirstCalc();
     
});

// Monthly Contribution Decrement
document.querySelector('.contributionDecrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let minValue = parseInt(input.min) || 0;

    // Calculate the nearest multiple of the step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Decrement from the nearest multiple
    if (nearestMultiple - stepValue >= minValue) {
        input.value = nearestMultiple - stepValue;
    } else {
        input.value = minValue; // Set to min if decrement falls below min value
    }

    saveToLocalStorage("monthlyContribution", input.value);
    /* playClickSound(); */
    checkFirstCalc();
     
});



// ISA Conts
document.querySelector('.monthlyISAContributionIncrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyISAContribution');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step);
    let maxValue = window.maxAnnualISAContribution / 12;

    // Calculate the nearest multiple of step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Increment from the nearest multiple
    if (nearestMultiple + stepValue <= maxValue) {
        input.value = nearestMultiple + stepValue;
    } else {
        input.value = maxValue; // Set to max if increment exceeds max value
    }
    
    saveToLocalStorage("monthlyISAContribution", input.value);
    checkFirstCalc();
});


document.querySelector('.monthlyISAContributionDecrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyISAContribution');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step);
    let minValue = parseFloat(input.min) || 0;

    // Calculate the nearest multiple of step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Decrement from the nearest multiple
    if (nearestMultiple - stepValue >= minValue) {
        input.value = nearestMultiple - stepValue;
    } else {
        input.value = minValue; // Set to min if decrement falls below min value
    }
    
    saveToLocalStorage("monthlyISAContribution", input.value);
    checkFirstCalc();
});


// Monthly Contribution Partner Increment
document.querySelector('.contributionIncrementPartner').addEventListener('click', function() {
    let input = document.getElementById('monthlyContributionPartner');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let maxValue = window.maxAnnualPensionContribution / 12;

    // Calculate the nearest multiple of the step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Increment from the nearest multiple
    if (nearestMultiple + stepValue <= maxValue) {
        input.value = nearestMultiple + stepValue;
    } else {
        input.value = maxValue; // Set to max if increment exceeds max value
    }

    saveToLocalStorage("monthlyContributionPartner", input.value);
    checkFirstCalc();
});

// Monthly Contribution Partner Decrement
document.querySelector('.contributionDecrementPartner').addEventListener('click', function() {
    let input = document.getElementById('monthlyContributionPartner');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let minValue = parseInt(input.min) || 0;

    // Calculate the nearest multiple of the step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Decrement from the nearest multiple
    if (nearestMultiple - stepValue >= minValue) {
        input.value = nearestMultiple - stepValue;
    } else {
        input.value = minValue; // Set to min if decrement falls below min value
    }

    saveToLocalStorage("monthlyContributionPartner", input.value);
    checkFirstCalc();
});

// Monthly ISA Contribution Partner Increment
document.querySelector('.monthlyISAContributionIncrementPartner').addEventListener('click', function() {
    let input = document.getElementById('monthlyISAContributionPartner');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step);
    let maxValue = window.maxAnnualISAContribution / 12;

    // Calculate the nearest multiple of step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Increment from the nearest multiple
    if (nearestMultiple + stepValue <= maxValue) {
        input.value = nearestMultiple + stepValue;
    } else {
        input.value = maxValue; // Set to max if increment exceeds max value
    }
    
    saveToLocalStorage("monthlyISAContributionPartner", input.value);
    checkFirstCalc();
});

// Monthly ISA Contribution Partner Decrement
document.querySelector('.monthlyISAContributionDecrementPartner').addEventListener('click', function() {
    let input = document.getElementById('monthlyISAContributionPartner');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step);
    let minValue = parseFloat(input.min) || 0;

    // Calculate the nearest multiple of step
    let nearestMultiple = Math.round(currentValue / stepValue) * stepValue;

    // Decrement from the nearest multiple
    if (nearestMultiple - stepValue >= minValue) {
        input.value = nearestMultiple - stepValue;
    } else {
        input.value = minValue; // Set to min if decrement falls below min value
    }
    
    saveToLocalStorage("monthlyISAContributionPartner", input.value);
    checkFirstCalc();
});



// Tax-Free Cash Percent Increment
document.querySelector('.taxFreeCashIncrement').addEventListener('click', function() {
    let input = document.getElementById('taxFreeCashPercent');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let maxValue = parseFloat(input.max) || 25;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("taxFreeCashPercent", input.value);
    checkFirstCalc();
});

// Tax-Free Cash Percent Decrement
document.querySelector('.taxFreeCashDecrement').addEventListener('click', function() {
    let input = document.getElementById('taxFreeCashPercent');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = parseFloat(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("taxFreeCashPercent", input.value);
    checkFirstCalc();
});

// Retirement Age Increment
document.querySelector('.retirementAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('retirementAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("retirementAge", input.value);
    checkFirstCalc();
});

// Retirement Age Decrement
document.querySelector('.retirementAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('retirementAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("retirementAge", input.value);
    checkFirstCalc();
});

// Desired Income Increment
document.querySelector('.incomeIncrement').addEventListener('click', function() {
    let input = document.getElementById('desiredIncome');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100;
    let maxValue = parseInt(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("desiredIncome", input.value);
    checkFirstCalc();
});

// Desired Income Decrement
document.querySelector('.incomeDecrement').addEventListener('click', function() {
    let input = document.getElementById('desiredIncome');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100;
    let minValue = parseInt(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("desiredIncome", input.value);
    checkFirstCalc();
});


// Combined Income Increment
document.querySelector('.combinedIncomeIncrement').addEventListener('click', function() {
    let input = document.getElementById('desiredCombinedIncome');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100;
    let maxValue = parseInt(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("desiredCombinedIncome", input.value);
    checkFirstCalc();
});

// Combined Income Decrement
document.querySelector('.combinedIncomeDecrement').addEventListener('click', function() {
    let input = document.getElementById('desiredCombinedIncome');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100;
    let minValue = parseInt(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("desiredCombinedIncome", input.value);
    checkFirstCalc();
});




// End Age Increment
document.querySelector('.endAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('endAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("endAge", input.value);
    checkFirstCalc();
});


// End Age Decrement
document.querySelector('.endAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('endAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("endAge", input.value);
    checkFirstCalc();
});

// Final Fund Increment
document.querySelector('.finalFundIncrement').addEventListener('click', function() {
    let input = document.getElementById('finalFund');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("finalFund", input.value);
    checkFirstCalc();
});

// Final Fund Decrement
document.querySelector('.finalFundDecrement').addEventListener('click', function() {
    let input = document.getElementById('finalFund');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("finalFund", input.value);
    checkFirstCalc();
});


// Min ISA Balance Increment
document.querySelector('.minISABalanceIncrement').addEventListener('click', function() {
    let input = document.getElementById('minISABalance');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("minISABalance", input.value);
    checkFirstCalc();
});

// Min ISA Balance Decrement
document.querySelector('.minISABalanceDecrement').addEventListener('click', function() {
    let input = document.getElementById('minISABalance');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("minISABalance", input.value);
    checkFirstCalc();
});


// Contribution Increase Age Increment
document.querySelector('.stepUpAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("stepUpAge", input.value);
    checkFirstCalc();
});

// Contribution Increase Age Decrement
document.querySelector('.stepUpAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("stepUpAge", input.value);
    checkFirstCalc();
});

// Contribution Increase Amount Increment
document.querySelector('.stepUpContributionIncrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("stepUpContribution", input.value);
    checkFirstCalc();
});

// Contribution Increase Amount Decrement
document.querySelector('.stepUpContributionDecrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("stepUpContribution", input.value);
    checkFirstCalc();
});


// Market Crash Age Increment
document.querySelector('.marketCrashAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('marketCrashAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("marketCrashAge", input.value);
    checkFirstCalc();
});

// Market Crash Age Decrement
document.querySelector('.marketCrashAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('marketCrashAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("marketCrashAge", input.value);
    checkFirstCalc();
});



// Inflation Increment
document.querySelector('.inflationIncrement').addEventListener('click', function() {
    let input = document.getElementById('inflation');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let maxValue = parseFloat(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = (currentValue + stepValue).toFixed(2);
    }
    saveToLocalStorage("inflation", input.value);
    checkFirstCalc();
});

// Inflation Decrement
document.querySelector('.inflationDecrement').addEventListener('click', function() {
    let input = document.getElementById('inflation');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = parseFloat(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = (currentValue - stepValue).toFixed(2);
    }
    saveToLocalStorage("inflation", input.value);
    checkFirstCalc();
});

// Fund Growth Pre Increment
document.querySelector('.fundGrowthPreIncrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPre');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let maxValue = parseFloat(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = (currentValue + stepValue).toFixed(2);
    }
    saveToLocalStorage("fundGrowthPre", input.value);
    checkFirstCalc();
});

// Fund Growth Pre Decrement
document.querySelector('.fundGrowthPreDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPre');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = parseFloat(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = (currentValue - stepValue).toFixed(2);
    }
    saveToLocalStorage("fundGrowthPre", input.value);
    checkFirstCalc();
});

// Market Crash Percent Increment
document.querySelector('.marketCrashPercentIncrement').addEventListener('click', function() {
    let input = document.getElementById('marketCrashPercent');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let maxValue = parseFloat(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("marketCrashPercent", input.value);
    checkFirstCalc();
});

// Market Crash Percent Decrement
document.querySelector('.marketCrashPercentDecrement').addEventListener('click', function() {
    let input = document.getElementById('marketCrashPercent');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = parseFloat(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("marketCrashPercent", input.value);
    checkFirstCalc();
});

// Fund Growth Post Increment
document.querySelector('.fundGrowthPostIncrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPost');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let maxValue = parseFloat(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = (currentValue + stepValue).toFixed(2);
    }
    saveToLocalStorage("fundGrowthPost", input.value);
    checkFirstCalc();
});

// Fund Growth Post Decrement
document.querySelector('.fundGrowthPostDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPost');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = parseFloat(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = (currentValue - stepValue).toFixed(2);
    }
    saveToLocalStorage("fundGrowthPost", input.value);
    checkFirstCalc();
});

// Fund Charges Increment
document.querySelector('.fundChargesIncrement').addEventListener('click', function() {
    let input = document.getElementById('fundCharges');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let maxValue = parseFloat(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = (currentValue + stepValue).toFixed(2);
    }
    saveToLocalStorage("fundCharges", input.value);
    checkFirstCalc();
});

// Fund Charges Decrement
document.querySelector('.fundChargesDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundCharges');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = parseFloat(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = (currentValue - stepValue).toFixed(2);
    }
    saveToLocalStorage("fundCharges", input.value);
    checkFirstCalc();
});






//SHOW ADDITIONAL FEATURES

// Global Function to show Partner's Monthly Contribution inputs
function showPartnerContributionInputs() {
    
    const desiredIncomeDiv = document.getElementById('desiredIncomeDiv');
    const desiredCombinedIncomeDiv = document.getElementById('desiredCombinedIncomeDiv');
    const monthlyContributionPartnerDiv = document.getElementById('monthlyContributionPartnerDiv');
    const monthlyISAContributionPartnerDiv = document.getElementById('monthlyISAContributionPartnerDiv');
    const endAgePartnerDiv = document.getElementById('endAgePartnerDiv');
    
    desiredIncomeDiv.classList.remove('visible');
    desiredIncomeDiv.classList.add('hidden');

    desiredCombinedIncomeDiv.classList.remove('hidden');
    desiredCombinedIncomeDiv.classList.add('visible');

    monthlyContributionPartnerDiv.classList.remove('hidden');
    monthlyContributionPartnerDiv.classList.add('visible');

    monthlyISAContributionPartnerDiv.classList.remove('hidden');
    monthlyISAContributionPartnerDiv.classList.add('visible');

   /*  endAgePartnerDiv.classList.remove('hidden');
    endAgePartnerDiv.classList.add('visible'); */

    checkFirstCalc();
}

// Global Function to hide Partner's Monthly Contribution inputs
function hidePartnerContributionInputs() {
    const desiredIncomeDiv = document.getElementById('desiredIncomeDiv');
    const desiredCombinedIncomeDiv = document.getElementById('desiredCombinedIncomeDiv');
    const monthlyContributionPartnerDiv = document.getElementById('monthlyContributionPartnerDiv');
    const monthlyISAContributionPartnerDiv = document.getElementById('monthlyISAContributionPartnerDiv');
    const endAgePartnerDiv = document.getElementById('endAgePartnerDiv');

    desiredIncomeDiv.classList.remove('hidden');
    desiredIncomeDiv.classList.add('visible');

    desiredCombinedIncomeDiv.classList.remove('visible');
    desiredCombinedIncomeDiv.classList.add('hidden');

    monthlyContributionPartnerDiv.classList.remove('visible');
    monthlyContributionPartnerDiv.classList.add('hidden');

    monthlyISAContributionPartnerDiv.classList.remove('visible');
    monthlyISAContributionPartnerDiv.classList.add('hidden');

    endAgePartnerDiv.classList.remove('visible');
    endAgePartnerDiv.classList.add('hidden');

    checkFirstCalc();
}


// Global Function to show StepUp inputs
function showStepUpInputs() {
    const inputStepUpAgeDiv = document.getElementById('inputStepUpAge');
    const inputStepUpContributionDiv = document.getElementById('inputStepUpContribution');
    const currentAge = localStorage.getItem("currentAge");
    inputStepUpAgeDiv.classList.remove('hidden');
    inputStepUpAgeDiv.classList.add('visible');
    inputStepUpContributionDiv.classList.remove('hidden');
    inputStepUpContributionDiv.classList.add('visible');
    document.getElementById('stepUpAge').value = currentAge;
    checkFirstCalc();
}

// Global Function to hide StepUp inputs
function hideStepUpInputs() {
    const inputStepUpAgeDiv = document.getElementById('inputStepUpAge');
    const inputStepUpContributionDiv = document.getElementById('inputStepUpContribution');
    const stepUpAgeInput = document.getElementById('stepUpAge');
    const stepUpContributionInput = document.getElementById('stepUpContribution');
    inputStepUpAgeDiv.classList.remove('visible');
    inputStepUpAgeDiv.classList.add('hidden');
    inputStepUpContributionDiv.classList.remove('visible');
    inputStepUpContributionDiv.classList.add('hidden');
    if (stepUpAgeInput) stepUpAgeInput.value = 0;
    if (stepUpContributionInput) stepUpContributionInput.value = 0;
    checkFirstCalc();
}

// Function to show Market Crash inputs
function showMarketCrashInputs() {
    const inputMarketCrashAgeDiv = document.getElementById('inputMarketCrashAgeDiv');
    const inputMarketCrashPercentDiv = document.getElementById('inputMarketCrashPercentDiv');
    const retirementAge = localStorage.getItem("retirementAge");

    inputMarketCrashAgeDiv.classList.remove('hidden');
    inputMarketCrashAgeDiv.classList.add('visible');
    inputMarketCrashPercentDiv.classList.remove('hidden');
    inputMarketCrashPercentDiv.classList.add('visible');
   
    document.getElementById('marketCrashAge').value = parseInt(retirementAge) - 1; // Set default age to current age
    document.getElementById('marketCrashPercent').value = 25;
    
    checkFirstCalc();
}

// Function to hide Market Crash inputs
function hideMarketCrashInputs() {
    const inputMarketCrashAgeDiv = document.getElementById('inputMarketCrashAgeDiv');
    const inputMarketCrashPercentDiv = document.getElementById('inputMarketCrashPercentDiv');
    const marketCrashAgeInput = document.getElementById('marketCrashAge');
    const marketCrashPercentInput = document.getElementById('marketCrashPercent');
    
    inputMarketCrashAgeDiv.classList.remove('visible');
    inputMarketCrashAgeDiv.classList.add('hidden');
    inputMarketCrashPercentDiv.classList.remove('visible');
    inputMarketCrashPercentDiv.classList.add('hidden');
    
    marketCrashAgeInput.value = parseInt(marketCrashAgeInput.value); // Set default age to current age
    marketCrashPercentInput.value = 0;
    
    checkFirstCalc();
}



// Global Function to show LowerGrowth input
function showLowerGrowthInput() {
    const inputLowerGrowthDiv = document.getElementById('inputLowerGrowthDiv');
    const lowerGrowthInput = document.getElementById('fundGrowthPost');
    lowerGrowthInput.value = document.getElementById('fundGrowthPre').value;
    inputLowerGrowthDiv.classList.remove('hidden');
    inputLowerGrowthDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide LowerGrowth input
function hideLowerGrowthInput() {
    const inputLowerGrowthDiv = document.getElementById('inputLowerGrowthDiv');
    const lowerGrowthInput = document.getElementById('fundGrowthPost');
    inputLowerGrowthDiv.classList.remove('visible');
    inputLowerGrowthDiv.classList.add('hidden');
    lowerGrowthInput.value = document.getElementById('fundGrowthPre').value;
    checkFirstCalc();
}

// Global Function to show Final Fund inputs
function showFinalFundInputs() {
    const finalFundDiv = document.getElementById('finalFundDiv');
    finalFundDiv.classList.remove('hidden');
    finalFundDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide Final Fund inputs
function hideFinalFundInputs() {
    const finalFundDiv = document.getElementById('finalFundDiv');
    finalFundDiv.classList.remove('visible');
    finalFundDiv.classList.add('hidden');
    document.getElementById('finalFund').value = 0;
    checkFirstCalc();
}


// Global Function to show Minimum ISA Balance inputs
function showMinISABalanceInputs() {
    const inputMinISABalanceDiv = document.getElementById('inputMinISABalance');
    inputMinISABalanceDiv.classList.remove('hidden');
    inputMinISABalanceDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide Minimum ISA Balance inputs
function hideMinISABalanceInputs() {
    const inputMinISABalanceDiv = document.getElementById('inputMinISABalance');
    inputMinISABalanceDiv.classList.remove('visible');
    inputMinISABalanceDiv.classList.add('hidden');
    document.getElementById('minISABalance').value = 0;
    checkFirstCalc();
}

// Global Function to show DB Pension inputs
function showDBPensionInputs() {
    const inputDBPensionDiv = document.getElementById('inputDBPensionAmount');
    const inputDBPAgeDiv = document.getElementById('inputDBPensionAge');
    inputDBPensionDiv.classList.remove('hidden');
    inputDBPensionDiv.classList.add('visible');
    inputDBPAgeDiv.classList.remove('hidden');
    inputDBPAgeDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide DB Pension inputs
function hideDBPensionInputs() {
    const inputDBPensionDiv = document.getElementById('inputDBPensionAmount');
    const inputDBPAgeDiv = document.getElementById('inputDBPensionAge');
    inputDBPensionDiv.classList.remove('visible');
    inputDBPensionDiv.classList.add('hidden');
    inputDBPAgeDiv.classList.remove('visible');
    inputDBPAgeDiv.classList.add('hidden');
    checkFirstCalc();
}

// Global Function to show Fund Charges input
function showFundChargesInput() {
    const inputFundChargesDiv = document.getElementById('inputFundChargesDiv');
    inputFundChargesDiv.classList.remove('hidden');
    inputFundChargesDiv.classList.add('visible');
    document.getElementById('fundCharges').value = 1;
    checkFirstCalc();
}

// Global Function to hide Fund Charges input
function hideFundChargesInput() {
    const inputFundChargesDiv = document.getElementById('inputFundChargesDiv');
    inputFundChargesDiv.classList.remove('visible');
    inputFundChargesDiv.classList.add('hidden');
    document.getElementById('fundCharges').value = 1;
    checkFirstCalc();
}

// Global Function to show Tax Free Cash input
function showTaxFreeCashInput() {
    const inputTaxFreeCashDiv = document.getElementById('inputTFCDiv');
    inputTaxFreeCashDiv.classList.remove('hidden');
    inputTaxFreeCashDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide Tax Free Cash input
function hideTaxFreeCashInput() {
    const inputTaxFreeCashDiv = document.getElementById('inputTFCDiv');
    inputTaxFreeCashDiv.classList.remove('visible');
    inputTaxFreeCashDiv.classList.add('hidden');
    document.getElementById('taxFreeCashPercent').value = 0;
    checkFirstCalc();
}

// Global Function to show Inflation input
function showInflationInput() {
    const inputInflationDiv = document.getElementById('inputInflationDiv');
    inputInflationDiv.classList.remove('hidden');
    inputInflationDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide Inflation input
function hideInflationInput() {
    const inputInflationDiv = document.getElementById('inputInflationDiv');
    inputInflationDiv.classList.remove('visible');
    inputInflationDiv.classList.add('hidden');
    document.getElementById('inflation').value = 3;
    checkFirstCalc();
}

// Global Function to show Fund Growth input
function showFundGrowthInput() {
    const inputFundGrowthDiv = document.getElementById('inputFundGrowthDiv');
    inputFundGrowthDiv.classList.remove('hidden');
    inputFundGrowthDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide Fund Growth input
function hideFundGrowthInput() {
    const inputFundGrowthDiv = document.getElementById('inputFundGrowthDiv');
    inputFundGrowthDiv.classList.remove('visible');
    inputFundGrowthDiv.classList.add('hidden');
    document.getElementById('fundGrowthPre').value = 7;
    hideLowerGrowthInput();
    document.getElementById('lowerGrowthCheckbox').checked = false;
    checkFirstCalc();
}




// Event listeners inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const contributionIncreaseCheckbox = document.getElementById('contributionIncreaseCheckbox');
    contributionIncreaseCheckbox.addEventListener('change', function() {
        this.checked ? showStepUpInputs() : hideStepUpInputs();
    });
    contributionIncreaseCheckbox.checked ? showStepUpInputs() : hideStepUpInputs();

    const lowerGrowthCheckbox = document.getElementById('lowerGrowthCheckbox');
    lowerGrowthCheckbox.addEventListener('change', function() {
        this.checked ? showLowerGrowthInput() : hideLowerGrowthInput();
    });
    lowerGrowthCheckbox.checked ? showLowerGrowthInput() : hideLowerGrowthInput();

    const finalFundCheckbox = document.getElementById('finalFundCheckbox');
    finalFundCheckbox.addEventListener('change', function() {
        this.checked ? showFinalFundInputs() : hideFinalFundInputs();
    });
    finalFundCheckbox.checked ? showFinalFundInputs() : hideFinalFundInputs();

    const minISABalanceCheckbox = document.getElementById('minISABalanceCheckbox');
    minISABalanceCheckbox.addEventListener('change', function() {
        this.checked ? showMinISABalanceInputs() : hideMinISABalanceInputs();
    });
    minISABalanceCheckbox.checked ? showMinISABalanceInputs() : hideMinISABalanceInputs();

    const fundChargesCheckbox = document.getElementById('fundChargesCheckbox');
    fundChargesCheckbox.addEventListener('change', function() {
        this.checked ? showFundChargesInput() : hideFundChargesInput();
    });
    fundChargesCheckbox.checked ? showFundChargesInput() : hideFundChargesInput();

    const inflationCheckBox = document.getElementById('inflationCheckBox');
    inflationCheckBox.addEventListener('change', function() {
        this.checked ? showInflationInput() : hideInflationInput();
    });
    inflationCheckBox.checked ? showInflationInput() : hideInflationInput();

    const fundGrowthCheckBox = document.getElementById('fundGrowthCheckbox');
    fundGrowthCheckBox.addEventListener('change', function() {
        this.checked ? showFundGrowthInput() : hideFundGrowthInput();
    });
    fundGrowthCheckBox.checked ? showFundGrowthInput() : hideFundGrowthInput();

    const modelMarketCrashCheckbox = document.getElementById('modelMarketCrashCheckbox');
    modelMarketCrashCheckbox.addEventListener('change', function() {
        this.checked ? showMarketCrashInputs() : hideMarketCrashInputs();
    });


});







// For handling the info popups:

document.addEventListener('DOMContentLoaded', function () {
    // Select all info icons
    const infoIcons = document.querySelectorAll('.info-icon');

    infoIcons.forEach(icon => {
        // Toggle popup on click/tap
        icon.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event from bubbling up
            togglePopup(this);
        });

        // Toggle popup on keyboard interaction (Enter or Space)
        icon.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePopup(this);
            }
        });
    });

    // Close popups when clicking outside
    document.addEventListener('click', function () {
        closeAllPopups();
    });

    // Close popup when pressing Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });

    // Function to toggle a specific popup
    function togglePopup(icon) {
        const popup = icon.nextElementSibling;
        const isActive = icon.classList.contains('active');

        closeAllPopups(); // Close any open popups first

        if (!isActive) {
            icon.classList.add('active');
            popup.setAttribute('aria-hidden', 'false');
        }
    }

    // Function to close all popups
    function closeAllPopups() {
        infoIcons.forEach(icon => {
            icon.classList.remove('active');
            const popup = icon.nextElementSibling;
            if (popup) {
                popup.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Close popup when clicking the close button
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event from bubbling up
            const popup = this.parentElement;
            const icon = popup.previousElementSibling;
            icon.classList.remove('active');
            popup.setAttribute('aria-hidden', 'true');
        });
    });
});


function toggleTable(element) {
    const tableContainer = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    
    if (tableContainer.classList.contains('open')) {
      tableContainer.classList.remove('open');
      arrow.innerHTML = "&#9654;"; // Change to ▶ when collapsed
    } else {
      tableContainer.classList.add('open');
      setTimeout(() => {
        tableContainer.scrollIntoView({ behavior: 'smooth' }); // Replace 'table-container-id' with the actual ID of the table section
      }, 300); // 500 milliseconds delay
      
      arrow.innerHTML = "&#9660;"; // Change to ▼ when expanded
    }
  }

  