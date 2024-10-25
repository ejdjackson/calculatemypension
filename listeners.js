
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the value from localStorage and check if it's the user's first visit
    initialiseInputsAndCheckboxes();
    checkAllCheckboxesAndToggleInputs();
    calculatePension();
   
});



function checkAllCheckboxesAndToggleInputs() {
    // ISA Inputs
    const ISACheckbox = document.getElementById('ISACheckbox');
    if (ISACheckbox.checked) {
        showISAInputs();
    } else {
        hideISAInputs();
    }

    // Contribution Increase Inputs
    const contributionIncreaseCheckbox = document.getElementById('contributionIncreaseCheckbox');
    if (contributionIncreaseCheckbox.checked) {
        showStepUpInputs();
    } else {
        hideStepUpInputs();
    }

    // Lower Growth Inputs
    const lowerGrowthCheckbox = document.getElementById('lowerGrowthCheckbox');
    if (lowerGrowthCheckbox.checked) {
        showLowerGrowthInput();
    } else {
        hideLowerGrowthInput();
    }

    // Minimum ISA Balance Inputs
    const minISABalanceCheckbox = document.getElementById('minISABalanceCheckbox');
    if (minISABalanceCheckbox.checked) {
        showMinISABalanceInputs();
    } else {
        hideMinISABalanceInputs();
    }

    // Defined Benefit Pension Inputs
    const dbPensionCheckbox = document.getElementById('DBPensionCheckbox');
    if (dbPensionCheckbox.checked) {
        showDBPensionInputs();
    } else {
        hideDBPensionInputs();
    }

    // Fund Charges Inputs
    const fundChargesCheckbox = document.getElementById('fundChargesCheckbox');
    if (fundChargesCheckbox.checked) {
        showFundChargesInput();
    } else {
        hideFundChargesInput();
    }

    // Tax Free Cash Inputs
    const TFCCheckbox = document.getElementById('TFCCheckbox');
    if (TFCCheckbox.checked) {
        showTaxFreeCashInput();
    } else {
        hideTaxFreeCashInput();
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




// Get all input fields
var inputFields = document.querySelectorAll('#pensionFormLeft input, #pensionFormRight input');
var firstCalc = true;

// Add event listeners to hide results on input change
inputFields.forEach(function(input) {
        input.addEventListener('input', checkFirstCalc);
    }
);

//Age buttons
document.querySelector('.ageIncrement').addEventListener('click', function() {
    let input = document.getElementById('currentAge');
    let currentValue = parseInt(input.value) || 0;
    let maxValue = parseInt(input.max);
    let stepValue = parseInt(input.step);
    if (currentValue < maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc();
});

document.querySelector('.ageDecrement').addEventListener('click', function() {
    let input = document.getElementById('currentAge');
    let currentValue = parseInt(input.value) || 0;
    let minValue = parseInt(input.min);
    let stepValue = parseInt(input.step);
    if (currentValue > minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc();
});

//Fund buttons
document.querySelector('.fundIncrement').addEventListener('click', function() {
    let input = document.getElementById('currentFund');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc();
});

document.querySelector('.fundDecrement').addEventListener('click', function() {
    let input = document.getElementById('currentFund');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc();
});

// Monthly Contribution buttons
document.querySelector('.contributionIncrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc();
});

document.querySelector('.contributionDecrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step);
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc();
});


// Retirement Age buttons
document.querySelector('.retirementAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('retirementAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.retirementAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('retirementAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});


// Desired Income buttons
document.querySelector('.incomeIncrement').addEventListener('click', function() {
    let input = document.getElementById('desiredIncome');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100; // Default step value of 100 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.incomeDecrement').addEventListener('click', function() {
    let input = document.getElementById('desiredIncome');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100; // Default step value of 100 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});


// End of Projection Age buttons
document.querySelector('.endAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('endAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.endAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('endAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});


// Contribution Increase Age buttons
document.querySelector('.stepUpAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.stepUpAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});


// Additional Contribution buttons
document.querySelector('.stepUpContributionIncrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100; // Default step value of 100 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.stepUpContributionDecrement').addEventListener('click', function() {
    let input = document.getElementById('stepUpContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 100; // Default step value of 100 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});


// Current ISA Holdings buttons
document.querySelector('.currentISAIncrement').addEventListener('click', function() {
    let input = document.getElementById('currentISA');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 5000; // Default step value of 5000 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.currentISADecrement').addEventListener('click', function() {
    let input = document.getElementById('currentISA');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 5000; // Default step value of 5000 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});

// Monthly ISA Contribution buttons
document.querySelector('.monthlyISAContributionIncrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyISAContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 50; // Default step value of 50 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.monthlyISAContributionDecrement').addEventListener('click', function() {
    let input = document.getElementById('monthlyISAContribution');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 50; // Default step value of 50 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});


// Minimum ISA Balance buttons
document.querySelector('.minISABalanceIncrement').addEventListener('click', function() {
    let input = document.getElementById('minISABalance');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1000; // Default step value of 1000 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.minISABalanceDecrement').addEventListener('click', function() {
    let input = document.getElementById('minISABalance');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1000; // Default step value of 1000 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});

// DB Pension Amount buttons
document.querySelector('.dbPensionAmountIncrement').addEventListener('click', function() {
    let input = document.getElementById('dbPensionAmount');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 500; // Default step value of 500 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.dbPensionAmountDecrement').addEventListener('click', function() {
    let input = document.getElementById('dbPensionAmount');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 500; // Default step value of 500 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});

// DB Pension Age buttons
document.querySelector('.dbPensionAgeIncrement').addEventListener('click', function() {
    let input = document.getElementById('dbPensionAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let maxValue = parseInt(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc(); // Trigger the function after incrementing
});

document.querySelector('.dbPensionAgeDecrement').addEventListener('click', function() {
    let input = document.getElementById('dbPensionAge');
    let currentValue = parseInt(input.value) || 0;
    let stepValue = parseInt(input.step) || 1; // Default step value of 1 if not set
    let minValue = parseInt(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc(); // Trigger the function after decrementing
});

// Fund Growth Pre-Retirement buttons
document.querySelector('.fundGrowthPreIncrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPre');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1; // Default step value of 1
    let maxValue = parseFloat(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    if (lowerGrowthCheckbox.checked == false) {
        let input2 = document.getElementById('fundGrowthPost');
        let currentValue = parseFloat(input2.value) || 0;
        input2.value = currentValue + stepValue;
    }
    checkFirstCalc();
});

document.querySelector('.fundGrowthPreDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPre');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 1; // Default step value of 1
    let minValue = parseFloat(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    if (lowerGrowthCheckbox.checked == false) {
        let input2 = document.getElementById('fundGrowthPost');
        let currentValue = parseFloat(input2.value) || 0;
        input2.value = currentValue - stepValue;
    }
    checkFirstCalc();
});

// Lower Fund Growth Post-Retirement buttons
document.querySelector('.fundGrowthPostIncrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPost');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 0.5; // Default step value of 0.5
    let maxValue = parseFloat(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc();
});

document.querySelector('.fundGrowthPostDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundGrowthPost');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 0.5; // Default step value of 0.5
    let minValue = parseFloat(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc();
});

// Fund Charges buttons
document.querySelector('.fundChargesIncrement').addEventListener('click', function() {
    let input = document.getElementById('fundCharges');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 0.05; // Default step value of 0.05
    let maxValue = parseFloat(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = parseFloat(currentValue + stepValue);
    }
    checkFirstCalc();
});

document.querySelector('.fundChargesDecrement').addEventListener('click', function() {
    let input = document.getElementById('fundCharges');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 0.05; // Default step value of 0.05
    let minValue = parseFloat(input.min) || 0;
    var diff = parseFloat(currentValue - stepValue);
    if (parseFloat(currentValue - stepValue) >= minValue) {
        input.value = parseFloat(currentValue - stepValue);
    }
    checkFirstCalc();
});

// Tax-Free Cash Percent buttons
document.querySelector('.taxFreeCashPercentIncrement').addEventListener('click', function() {
    let input = document.getElementById('taxFreeCashPercent');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 5; // Default step value of 5
    let maxValue = parseFloat(input.max) || 25; // Max is 25%
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc();
});

document.querySelector('.taxFreeCashPercentDecrement').addEventListener('click', function() {
    let input = document.getElementById('taxFreeCashPercent');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 5; // Default step value of 5
    let minValue = parseFloat(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc();
});

// Inflation Rate buttons
document.querySelector('.inflationIncrement').addEventListener('click', function() {
    let input = document.getElementById('inflation');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 0.1; // Default step value of 0.1
    let maxValue = parseFloat(input.max) || Infinity;
    if (currentValue + stepValue <= maxValue) {
        input.value = currentValue + stepValue;
    }
    checkFirstCalc();
});

document.querySelector('.inflationDecrement').addEventListener('click', function() {
    let input = document.getElementById('inflation');
    let currentValue = parseFloat(input.value) || 0;
    let stepValue = parseFloat(input.step) || 0.1; // Default step value of 0.1
    let minValue = parseFloat(input.min) || 0;
    if (currentValue - stepValue >= minValue) {
        input.value = currentValue - stepValue;
    }
    checkFirstCalc();
});


// Global Function to show ISA inputs
function showISAInputs() {
    const inputCurrentISADiv = document.getElementById('currentISAInput');
    const inputMonthlyISAContributionDiv = document.getElementById('monthlyISAContributionInput');
    inputCurrentISADiv.classList.remove('hidden');
    inputCurrentISADiv.classList.add('visible');
    inputMonthlyISAContributionDiv.classList.remove('hidden');
    inputMonthlyISAContributionDiv.classList.add('visible');
    checkFirstCalc();
}

// Global Function to hide ISA inputs and reset their values
function hideISAInputs() {
    const inputCurrentISADiv = document.getElementById('currentISAInput');
    const inputMonthlyISAContributionDiv = document.getElementById('monthlyISAContributionInput');
    inputCurrentISADiv.classList.remove('visible');
    inputCurrentISADiv.classList.add('hidden');
    inputMonthlyISAContributionDiv.classList.remove('visible');
    inputMonthlyISAContributionDiv.classList.add('hidden');
    document.getElementById('currentISA').value = 0;
    document.getElementById('monthlyISAContribution').value = 0;
    document.getElementById('minISABalanceCheckbox').checked = false;
    checkFirstCalc();
}

// Global Function to show StepUp inputs
function showStepUpInputs() {
    const inputStepUpAgeDiv = document.getElementById('inputStepUpAge');
    const inputStepUpContributionDiv = document.getElementById('inputStepUpContribution');
    const currentAge = document.getElementById('currentAge').value;
    inputStepUpAgeDiv.classList.remove('hidden');
    inputStepUpAgeDiv.classList.add('visible');
    inputStepUpContributionDiv.classList.remove('hidden');
    inputStepUpContributionDiv.classList.add('visible');
    document.getElementById('stepUpAge').value = currentAge;
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

// Global Function to show Minimum ISA Balance inputs
function showMinISABalanceInputs() {
    const inputMinISABalanceDiv = document.getElementById('inputMinISABalance');
    inputMinISABalanceDiv.classList.remove('hidden');
    inputMinISABalanceDiv.classList.add('visible');
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
    document.getElementById('fundCharges').value = 0.5;
    checkFirstCalc();
}

// Global Function to hide Fund Charges input
function hideFundChargesInput() {
    const inputFundChargesDiv = document.getElementById('inputFundChargesDiv');
    inputFundChargesDiv.classList.remove('visible');
    inputFundChargesDiv.classList.add('hidden');
    document.getElementById('fundCharges').value = 0;
    checkFirstCalc();
}

// Global Function to show Tax Free Cash input
function showTaxFreeCashInput() {
    const inputTaxFreeCashDiv = document.getElementById('inputTFCDiv');
    inputTaxFreeCashDiv.classList.remove('hidden');
    inputTaxFreeCashDiv.classList.add('visible');
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
}

// Global Function to hide Inflation input
function hideInflationInput() {
    const inputInflationDiv = document.getElementById('inputInflationDiv');
    inputInflationDiv.classList.remove('visible');
    inputInflationDiv.classList.add('hidden');
    document.getElementById('inflation').value = 2;
    checkFirstCalc();
}

// Global Function to show Fund Growth input
function showFundGrowthInput() {
    const inputFundGrowthDiv = document.getElementById('inputFundGrowthDiv');
    inputFundGrowthDiv.classList.remove('hidden');
    inputFundGrowthDiv.classList.add('visible');
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
    const ISACheckbox = document.getElementById('ISACheckbox');
    ISACheckbox.addEventListener('change', function() {
        this.checked ? showISAInputs() : hideISAInputs();
    });
    ISACheckbox.checked ? showISAInputs() : hideISAInputs();

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

    const minISABalanceCheckbox = document.getElementById('minISABalanceCheckbox');
    minISABalanceCheckbox.addEventListener('change', function() {
        this.checked ? showMinISABalanceInputs() : hideMinISABalanceInputs();
    });
    minISABalanceCheckbox.checked ? showMinISABalanceInputs() : hideMinISABalanceInputs();

    const dbPensionCheckbox = document.getElementById('DBPensionCheckbox');
    dbPensionCheckbox.addEventListener('change', function() {
        this.checked ? showDBPensionInputs() : hideDBPensionInputs();
    });
    dbPensionCheckbox.checked ? showDBPensionInputs() : hideDBPensionInputs();

    const fundChargesCheckbox = document.getElementById('fundChargesCheckbox');
    fundChargesCheckbox.addEventListener('change', function() {
        this.checked ? showFundChargesInput() : hideFundChargesInput();
    });
    fundChargesCheckbox.checked ? showFundChargesInput() : hideFundChargesInput();

    const TFCCheckBox = document.getElementById('TFCCheckbox');
    TFCCheckBox.addEventListener('change', function() {
        this.checked ? showTaxFreeCashInput() : hideTaxFreeCashInput();
    });
    TFCCheckBox.checked ? showTaxFreeCashInput() : hideTaxFreeCashInput();

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