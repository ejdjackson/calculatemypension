

document.addEventListener('DOMContentLoaded', function() {
    
    
    initialiseInputsAndCheckboxes(); 
    checkAllCheckboxesAndToggleInputs(); 
    
    var planAsCouple = false;
    if (localStorage.getItem('planAsCouple') === "true") {
        planAsCouple = true;
    } 
     var alreadyRetired = false;
    if (localStorage.getItem('alreadyRetired') === "true") {
        alreadyRetired = true;
    } 

    validateInputs(planAsCouple,alreadyRetired,false);
    calculateMyPension(false);

   
    
});



// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('#pensionFormLeft input, #pensionFormRight input');


// Add event listeners to hide results on input change
inputFields.forEach(function(input) {
        input.addEventListener('input', calculateMyPension);
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
    localStorage.setItem('fundGrowthPre', document.getElementById("fundGrowthPre").value);
    localStorage.setItem('fundGrowthPost', document.getElementById("fundGrowthPost").value);
    localStorage.setItem('fundCharges', document.getElementById("fundCharges").value);
    localStorage.setItem('taxFreeCashPercent', document.getElementById("taxFreeCashPercent").value);
    localStorage.setItem('inflation', document.getElementById("inflation").value);
    localStorage.setItem('applyInflationAdjustment', document.getElementById("applyInflationAdjustment").checked);
    localStorage.setItem('frequencySlider', document.getElementById("frequencySlider").checked);
    localStorage.setItem('marketCrashAge', document.getElementById("marketCrashAge").value);
    localStorage.setItem('marketCrashPercent', document.getElementById("marketCrashPercent").value);
    
    
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
        document.getElementById('monthlyISAContributionPartner').value = localStorage.getItem('monthlyISAContributionPartner');
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

   
   

}


function checkAllCheckboxesAndToggleInputs() {
    
    // Plan As A Couple Inputs
    const planAsCouple =  (localStorage.getItem('planAsCouple') === 'true');
    if (planAsCouple) {
        showPartnerContributionInputs();
    } else {
        hidePartnerContributionInputs();
    }

    const alreadyRetired =  (localStorage.getItem('alreadyRetired') === 'true');
    if (alreadyRetired) {
        showAlreadyRetiredInputs(planAsCouple);
    } else {
        hideAlreadyRetiredInputs(planAsCouple);
    }
    

    // Contribution Increase Inputs
    /* const contributionIncreaseCheckbox = document.getElementById('contributionIncreaseCheckbox');
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
    } */

  
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
/* document.querySelectorAll('input[type="checkbox"]:not(.switch)').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            playCheckSound(); 
        }
    });
}); */




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
    calculateMyPension(false);
     
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
    calculateMyPension(false);
     
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
});

// Partners Final Fund Increment
document.querySelector('.partnersFinalFundIncrement').addEventListener('click', function() {
    let input = document.getElementById('partnersFinalFund');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let maxValue = parseInt(input.max) || Infinity;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    saveToLocalStorage("partnersFinalFund", input.value);
    calculateMyPension(false);
});

// Final Fund Decrement
document.querySelector('.partnersFinalFundDecrement').addEventListener('click', function() {
    let input = document.getElementById('partnersFinalFund');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1;
    let minValue = parseInt(input.min) || 0;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    saveToLocalStorage("partnersFinalFund", input.value);
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
});

// Fund Growth Pre Decrement
document.querySelector('.fundGrowthPreDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPre');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = -100;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = (currentValue - stepValue).toFixed(2);
    }
    saveToLocalStorage("fundGrowthPre", input.value);
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
});

// Fund Growth Post Decrement
document.querySelector('.fundGrowthPostDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPost');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1;
    let minValue = parseFloat(input.min) || -100;

    // Snap to nearest multiple of stepValue
    currentValue = Math.round(currentValue / stepValue) * stepValue;

    if (currentValue - stepValue >= minValue) {
        input.value = (currentValue - stepValue).toFixed(2);
    }
    saveToLocalStorage("fundGrowthPost", input.value);
    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
});


function showAlreadyRetiredInputs(planAsCouple) {
    const retirementAgeDiv = document.getElementById('retirementAgeDiv');
    /* const contributionIncreaseCheckboxDiv = document.getElementById('contributionIncreaseCheckboxDiv');
    const lowerGrowthCheckboxDiv = document.getElementById('lowerGrowthCheckboxDiv');
    const finalFundCheckboxDiv = document.getElementById('finalFundCheckboxDiv'); */
    const partnersFinalFundDiv = document.getElementById('partnersFinalFundDiv');
    
    retirementAgeDiv.classList.remove('visible');
    retirementAgeDiv.classList.add('hidden');

   /*  contributionIncreaseCheckboxDiv.classList.remove('visible');
    contributionIncreaseCheckboxDiv.classList.add('hidden');

    lowerGrowthCheckboxDiv.classList.remove('visible');
    lowerGrowthCheckboxDiv.classList.add('hidden');

    finalFundCheckboxDiv.classList.remove('hidden');
    finalFundCheckboxDiv.classList.add('visible'); */

    if (planAsCouple) {
        partnersFinalFundDiv.classList.remove('hidden');
        partnersFinalFundDiv.classList.add('visible');
    }
    
}

function hideAlreadyRetiredInputs (planAsCouple) {
    const retirementAgeDiv = document.getElementById('retirementAgeDiv');
/*     const contributionIncreaseCheckboxDiv = document.getElementById('contributionIncreaseCheckboxDiv');
    const lowerGrowthCheckboxDiv = document.getElementById('lowerGrowthCheckboxDiv');
    const finalFundCheckboxDiv = document.getElementById('finalFundCheckboxDiv'); */
    const partnersFinalFundDiv = document.getElementById('partnersFinalFundDiv');
   
    retirementAgeDiv.classList.remove('hidden');
    retirementAgeDiv.classList.add('visible');

  /*   contributionIncreaseCheckboxDiv.classList.remove('hidden');
    contributionIncreaseCheckboxDiv.classList.add('visible');

    lowerGrowthCheckboxDiv.classList.remove('hidden');
    lowerGrowthCheckboxDiv.classList.add('visible');

    finalFundCheckboxDiv.classList.remove('hidden');
    finalFundCheckboxDiv.classList.add('visible'); */

    if (planAsCouple) {
        partnersFinalFundDiv.classList.remove('visible');
        partnersFinalFundDiv.classList.add('hidden');
    }
}



//SHOW ADDITIONAL FEATURES

// Global Function to show Partner's Monthly Contribution inputs
function showPartnerContributionInputs() {
    
    const desiredIncomeDiv = document.getElementById('desiredIncomeDiv');
    const desiredCombinedIncomeDiv = document.getElementById('desiredCombinedIncomeDiv');
    const monthlyContributionPartnerDiv = document.getElementById('monthlyContributionPartnerDiv');
    const monthlyISAContributionPartnerDiv = document.getElementById('monthlyISAContributionPartnerDiv');
    const endAgePartnerDiv = document.getElementById('endAgePartnerDiv');

    const pensionFundCashFlowTableContainerYour = document.getElementById("pensionFundCashFlowTableContainerYourLink");
    const ISACashFlowTableContainerYour = document.getElementById("ISACashFlowTableContainerYourLink");
    const retirementIncomeTableContainerYour = document.getElementById("retirementIncomeTableContainerYourLink");
    const pensionFundCashFlowTableContainerYourPartner = document.getElementById("pensionFundCashFlowTableContainerYourPartnerLink");
    const ISACashFlowTableContainerYourPartner = document.getElementById("ISACashFlowTableContainerYourPartnerLink");
    const retirementIncomeTableContainerYourPartner = document.getElementById("retirementIncomeTableContainerYourPartnerLink");
    
    desiredIncomeDiv.classList.remove('visible');
    desiredIncomeDiv.classList.add('hidden');

    desiredCombinedIncomeDiv.classList.remove('hidden');
    desiredCombinedIncomeDiv.classList.add('visible');

    monthlyContributionPartnerDiv.classList.remove('hidden');
    monthlyContributionPartnerDiv.classList.add('visible');

    monthlyISAContributionPartnerDiv.classList.remove('hidden');
    monthlyISAContributionPartnerDiv.classList.add('visible');

    pensionFundCashFlowTableContainerYour.classList.remove('hidden');
    pensionFundCashFlowTableContainerYour.classList.add('visible');

    ISACashFlowTableContainerYour.classList.remove('hidden');
    ISACashFlowTableContainerYour.classList.add('visible');

    retirementIncomeTableContainerYour.classList.remove('hidden');
    retirementIncomeTableContainerYour.classList.add('visible');

    pensionFundCashFlowTableContainerYourPartner.classList.remove('hidden');
    pensionFundCashFlowTableContainerYourPartner.classList.add('visible');

    ISACashFlowTableContainerYourPartner.classList.remove('hidden');
    ISACashFlowTableContainerYourPartner.classList.add('visible');

    retirementIncomeTableContainerYourPartner.classList.remove('hidden');
    retirementIncomeTableContainerYourPartner.classList.add('visible');

   /*  endAgePartnerDiv.classList.remove('hidden');
    endAgePartnerDiv.classList.add('visible'); */

    calculateMyPension(false);
}

// Global Function to hide Partner's Monthly Contribution inputs
function hidePartnerContributionInputs() {
    const desiredIncomeDiv = document.getElementById('desiredIncomeDiv');
    const desiredCombinedIncomeDiv = document.getElementById('desiredCombinedIncomeDiv');
    const monthlyContributionPartnerDiv = document.getElementById('monthlyContributionPartnerDiv');
    const monthlyISAContributionPartnerDiv = document.getElementById('monthlyISAContributionPartnerDiv');
    const endAgePartnerDiv = document.getElementById('endAgePartnerDiv');

    const pensionFundCashFlowTableContainerYour = document.getElementById("pensionFundCashFlowTableContainerYourLink");
    const ISACashFlowTableContainerYour = document.getElementById("ISACashFlowTableContainerYourLink");
    const retirementIncomeTableContainerYour = document.getElementById("retirementIncomeTableContainerYourLink");
    const pensionFundCashFlowTableContainerYourPartner = document.getElementById("pensionFundCashFlowTableContainerYourPartnerLink");
    const ISACashFlowTableContainerYourPartner = document.getElementById("ISACashFlowTableContainerYourPartnerLink");
    const retirementIncomeTableContainerYourPartner = document.getElementById("retirementIncomeTableContainerYourPartnerLink");

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

    pensionFundCashFlowTableContainerYour.classList.remove('visible');
    pensionFundCashFlowTableContainerYour.classList.add('hidden');

    ISACashFlowTableContainerYour.classList.remove('visible');
    ISACashFlowTableContainerYour.classList.add('hidden');

    retirementIncomeTableContainerYour.classList.remove('visible');
    retirementIncomeTableContainerYour.classList.add('hidden');

    pensionFundCashFlowTableContainerYourPartner.classList.remove('visible');
    pensionFundCashFlowTableContainerYourPartner.classList.add('hidden');

    ISACashFlowTableContainerYourPartner.classList.remove('visible');
    ISACashFlowTableContainerYourPartner.classList.add('hidden');

    retirementIncomeTableContainerYourPartner.classList.remove('visible');
    retirementIncomeTableContainerYourPartner.classList.add('hidden');

    calculateMyPension(false);
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
    calculateMyPension(false);
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
    calculateMyPension(false);
}

// Function to show Market Crash inputs
function showMarketCrashInputs() {
    const inputMarketCrashAgeDiv = document.getElementById('inputMarketCrashAgeDiv');
    const inputMarketCrashPercentDiv = document.getElementById('inputMarketCrashPercentDiv');
    const retirementAge = localStorage.getItem("retirementAge");
    const currentAge = localStorage.getItem("currentAge");
    const initialMarketCrashAge = Math.max(parseInt(retirementAge)-1,parseInt(currentAge)+1);

    inputMarketCrashAgeDiv.classList.remove('hidden');
    inputMarketCrashAgeDiv.classList.add('visible');
    inputMarketCrashPercentDiv.classList.remove('hidden');
    inputMarketCrashPercentDiv.classList.add('visible');
   
    document.getElementById('marketCrashAge').value = initialMarketCrashAge; // Set default age to current age
    document.getElementById('marketCrashPercent').value = 25;
    
    calculateMyPension(false);
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
    
    calculateMyPension(false);
}



// Global Function to show LowerGrowth input
function showLowerGrowthInput() {
    const inputLowerGrowthDiv = document.getElementById('inputLowerGrowthDiv');
    const lowerGrowthInput = document.getElementById('fundGrowthPost');
    lowerGrowthInput.value = document.getElementById('fundGrowthPre').value;
    inputLowerGrowthDiv.classList.remove('hidden');
    inputLowerGrowthDiv.classList.add('visible');
    calculateMyPension(false);
}

// Global Function to hide LowerGrowth input
function hideLowerGrowthInput() {
    const inputLowerGrowthDiv = document.getElementById('inputLowerGrowthDiv');
    const lowerGrowthInput = document.getElementById('fundGrowthPost');
    inputLowerGrowthDiv.classList.remove('visible');
    inputLowerGrowthDiv.classList.add('hidden');
    lowerGrowthInput.value = document.getElementById('fundGrowthPre').value;
    calculateMyPension(false);
}

// Global Function to show Final Fund inputs
function showFinalFundInputs() {
    const finalFundDiv = document.getElementById('finalFundDiv');
    const partnersFinalFundDiv = document.getElementById('partnersFinalFundDiv');
    finalFundDiv.classList.remove('hidden');
    finalFundDiv.classList.add('visible');
    partnersFinalFundDiv.classList.remove('hidden');
    partnersFinalFundDiv.classList.add('visible');
    calculateMyPension(false);
}

// Global Function to hide Final Fund inputs
function hideFinalFundInputs() {
    const finalFundDiv = document.getElementById('finalFundDiv');
    const partnersFinalFundDiv = document.getElementById('partnersFinalFundDiv');
    
    finalFundDiv.classList.remove('visible');
    finalFundDiv.classList.add('hidden');
    partnersFinalFundDiv.classList.remove('visible');
    partnersFinalFundDiv.classList.add('hidden');
    document.getElementById('finalFund').value = 0;
    calculateMyPension(false);
}


// Global Function to show Minimum ISA Balance inputs
function showMinISABalanceInputs() {
    const inputMinISABalanceDiv = document.getElementById('inputMinISABalance');
    inputMinISABalanceDiv.classList.remove('hidden');
    inputMinISABalanceDiv.classList.add('visible');
    calculateMyPension(false);
}

// Global Function to hide Minimum ISA Balance inputs
function hideMinISABalanceInputs() {
    const inputMinISABalanceDiv = document.getElementById('inputMinISABalance');
    inputMinISABalanceDiv.classList.remove('visible');
    inputMinISABalanceDiv.classList.add('hidden');
    document.getElementById('minISABalance').value = 0;
    calculateMyPension(false);
}

// Global Function to show DB Pension inputs
function showDBPensionInputs() {
    const inputDBPensionDiv = document.getElementById('inputDBPensionAmount');
    const inputDBPAgeDiv = document.getElementById('inputDBPensionAge');
    inputDBPensionDiv.classList.remove('hidden');
    inputDBPensionDiv.classList.add('visible');
    inputDBPAgeDiv.classList.remove('hidden');
    inputDBPAgeDiv.classList.add('visible');
    calculateMyPension(false);
}

// Global Function to hide DB Pension inputs
function hideDBPensionInputs() {
    const inputDBPensionDiv = document.getElementById('inputDBPensionAmount');
    const inputDBPAgeDiv = document.getElementById('inputDBPensionAge');
    inputDBPensionDiv.classList.remove('visible');
    inputDBPensionDiv.classList.add('hidden');
    inputDBPAgeDiv.classList.remove('visible');
    inputDBPAgeDiv.classList.add('hidden');
    calculateMyPension(false);
}

// Global Function to show Fund Charges input
function showFundChargesInput() {
    const inputFundChargesDiv = document.getElementById('inputFundChargesDiv');
    inputFundChargesDiv.classList.remove('hidden');
    inputFundChargesDiv.classList.add('visible');
    document.getElementById('fundCharges').value = 1;
    calculateMyPension(false);
}

// Global Function to hide Fund Charges input
function hideFundChargesInput() {
    const inputFundChargesDiv = document.getElementById('inputFundChargesDiv');
    inputFundChargesDiv.classList.remove('visible');
    inputFundChargesDiv.classList.add('hidden');
    document.getElementById('fundCharges').value = 1;
    calculateMyPension(false);
}

// Global Function to show Tax Free Cash input
function showTaxFreeCashInput() {
    const inputTaxFreeCashDiv = document.getElementById('inputTFCDiv');
    inputTaxFreeCashDiv.classList.remove('hidden');
    inputTaxFreeCashDiv.classList.add('visible');
    calculateMyPension(false);
}

// Global Function to hide Tax Free Cash input
function hideTaxFreeCashInput() {
    const inputTaxFreeCashDiv = document.getElementById('inputTFCDiv');
    inputTaxFreeCashDiv.classList.remove('visible');
    inputTaxFreeCashDiv.classList.add('hidden');
    document.getElementById('taxFreeCashPercent').value = 0;
    calculateMyPension(false);
}

// Global Function to show Inflation input
function showInflationInput() {
    const inputInflationDiv = document.getElementById('inputInflationDiv');
    inputInflationDiv.classList.remove('hidden');
    inputInflationDiv.classList.add('visible');
    calculateMyPension(false);
}

// Global Function to hide Inflation input
function hideInflationInput() {
    const inputInflationDiv = document.getElementById('inputInflationDiv');
    inputInflationDiv.classList.remove('visible');
    inputInflationDiv.classList.add('hidden');
    document.getElementById('inflation').value = 3;
    calculateMyPension(false);
}

// Global Function to show Fund Growth input
function showFundGrowthInput() {
    const inputFundGrowthDiv = document.getElementById('inputFundGrowthDiv');
    inputFundGrowthDiv.classList.remove('hidden');
    inputFundGrowthDiv.classList.add('visible');
    calculateMyPension(false);
}

// Global Function to hide Fund Growth input
function hideFundGrowthInput() {
    const inputFundGrowthDiv = document.getElementById('inputFundGrowthDiv');
    inputFundGrowthDiv.classList.remove('visible');
    inputFundGrowthDiv.classList.add('hidden');
    document.getElementById('fundGrowthPre').value = 7;
    hideLowerGrowthInput();
    /* document.getElementById('lowerGrowthCheckbox').checked = false; */
    calculateMyPension(false);
}




// Event listeners inside DOMContentLoaded
/* document.addEventListener('DOMContentLoaded', function() {
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


}); */







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

  

  // Function to show all specified inputs
function showContributionInputs() {
    const inputsToShow = [
        'monthlyContributionInput',
        'monthlyISAContributionInput',
        'monthlyContributionPartnerDiv',
        'monthlyISAContributionPartnerDiv',
        'inputTaxFreeCashPercent'
    ];

    inputsToShow.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.classList.remove('hidden');
            element.classList.add('visible');
        }
    });
}

// Function to hide all specified inputs
function hideContributionInputs() {
    const inputsToHide = [
        'monthlyContributionInput',
        'monthlyISAContributionInput',
        'monthlyContributionPartnerDiv',
        'monthlyISAContributionPartnerDiv',
        'inputTaxFreeCashPercent'
    ];

    inputsToHide.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.classList.remove('visible');
            element.classList.add('hidden');
        }
        // Reset the value of input fields if they exist
        const inputField = document.getElementById(inputId.replace('Div', '')); // Assumes IDs follow this naming convention
        if (inputField && inputField.tagName === 'INPUT') {
            inputField.value = 0;
        }
    });
}



function toggleContainer(header) {
    const arrow = header.querySelector('.arrow');
    const content = header.nextElementSibling;

    if (content.classList.contains('open')) {
        content.classList.remove('open');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('open');
        arrow.style.transform = 'rotate(90deg)';
        // Dynamically reveal hidden children
        const hiddenItems = content.querySelectorAll('.hidden');
        hiddenItems.forEach(item => {
            item.classList.remove('hidden');
            item.classList.add('visible');
        });
    }
    calculateMyPension(false);
}


function resetAdditionalFeatures() {
    // Retrieve the values from localStorage or set defaults if not found
    const retirementAge = parseInt(localStorage.getItem('retirementAge')) || 65; // Default to 65 if not set
    const currentAge = parseInt(localStorage.getItem('currentAge')) || 40; // Default to 40 if not set

    // Set the default values for the additional features
    const defaults = {
        marketCrashAge: Math.max(retirementAge + 1, currentAge + 1),
        marketCrashPercent: 0,
        fundGrowthPre: 7,
        fundGrowthPost: 7,
        inflation: 3,
        fundCharges: 1,
        minISABalance: 0,
        finalFund: 0,
        partnersFinalFund: 0,
        stepUpAge: currentAge + 5,
        stepUpContribution: 0
    };

    // Apply the defaults to the respective input elements
    document.getElementById("marketCrashAge").value = defaults.marketCrashAge;
    document.getElementById("marketCrashPercent").value = defaults.marketCrashPercent;
    document.getElementById("fundGrowthPre").value = defaults.fundGrowthPre;
    document.getElementById("fundGrowthPost").value = defaults.fundGrowthPost;
    document.getElementById("inflation").value = defaults.inflation;
    document.getElementById("fundCharges").value = defaults.fundCharges;
    document.getElementById("minISABalance").value = defaults.minISABalance;
    document.getElementById("finalFund").value = defaults.finalFund;
    document.getElementById("partnersFinalFund").value = defaults.partnersFinalFund;
    document.getElementById("stepUpAge").value = defaults.stepUpAge;
    document.getElementById("stepUpContribution").value = defaults.stepUpContribution;

    console.log("Additional features have been reset to their default values.");
    calculateMyPension(false);
}
