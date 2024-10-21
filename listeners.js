
document.addEventListener('DOMContentLoaded', function() {
    calculatePension();
});


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


//For the step  up increase functionality
document.addEventListener('DOMContentLoaded', function() {

    // ISA Inputs
    const ISACheckbox = document.getElementById('ISACheckbox');
    const inputCurrentISADiv = document.getElementById('currentISAInput');
    const inputMonthlyISAContributionDiv = document.getElementById('monthlyISAContributionInput');

    // Function to show ISA inputs
    function showISAInputs() {
        inputCurrentISADiv.classList.remove('hidden');
        inputCurrentISADiv.classList.add('visible');
        inputMonthlyISAContributionDiv.classList.remove('hidden');
        inputMonthlyISAContributionDiv.classList.add('visible');
        document.getElementById('currentISA').value = 10000;
            checkFirstCalc();
    }

    // Function to hide ISA inputs and reset their values
    function hideISAInputs() {
        inputCurrentISADiv.classList.remove('visible');
        inputCurrentISADiv.classList.add('hidden');
        inputMonthlyISAContributionDiv.classList.remove('visible');
        inputMonthlyISAContributionDiv.classList.add('hidden');
        // Reset input values to zero
            document.getElementById('currentISA').value = 0;
            document.getElementById('monthlyISAContribution').value = 0;
            document.getElementById('minISABalanceCheckbox').checked = false;
            checkFirstCalc();
    }

    // Add an event listener to the checkbox
    ISACheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Show both additional inputs when checked
            showISAInputs();
        } else {
            // Hide both additional inputs and reset their values when unchecked
            hideISAInputs();
        }
    });

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    if (ISACheckbox.checked) {
        showISAInputs();
    } else {
        hideISAInputs();
    }




    // Contribution increase inputs
    const contributionIncreaseCheckbox = document.getElementById('contributionIncreaseCheckbox');
    const inputStepUpAgeDiv = document.getElementById('inputStepUpAge');
    const inputStepUpContributionDiv = document.getElementById('inputStepUpContribution');
    

    // Contribution Step-Up Inputs
    const currentAge = document.getElementById('currentAge');
    const stepUpAgeInput = document.getElementById('stepUpAge');
    const stepUpContributionInput = document.getElementById('stepUpContribution');

       // Function to show StepUp inputs
    function showStepUpInputs() {
        var currentAge = document.getElementById('currentAge').value;
    
        inputStepUpAgeDiv.classList.remove('hidden');
        inputStepUpAgeDiv.classList.add('visible');
        inputStepUpContributionDiv.classList.remove('hidden');
        inputStepUpContributionDiv.classList.add('visible');
        document.getElementById('stepUpAge').value = currentAge;
    }

    // Function to hide inputs and reset their values
    function hideStepUpInputs() {
        inputStepUpAgeDiv.classList.remove('visible');
        inputStepUpAgeDiv.classList.add('hidden');
        inputStepUpContributionDiv.classList.remove('visible');
        inputStepUpContributionDiv.classList.add('hidden');
        // Reset input values to zero
        if (stepUpAgeInput) {
            stepUpAgeInput.value = 0;
        }
        if (stepUpContributionInput) {
            stepUpContributionInput.value = 0;
        }
    }

    // Add an event listener to the checkbox
    contributionIncreaseCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Show both additional inputs when checked
            showStepUpInputs();
        } else {
            // Hide both additional inputs and reset their values when unchecked
            hideStepUpInputs();
        }
    });

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    if (contributionIncreaseCheckbox.checked) {
        showStepUpInputs();
    } else {
        hideStepUpInputs();
    }



    //For lower growth post retirement
    // Contribution LowerGrowth Inputs
    const lowerGrowthInput = document.getElementById('fundGrowthPost'); // Replace with your actual input ID
    const fundGrowthPre = document.getElementById('fundGrowthPre'); // Replace with your actual input ID

    // Replace 'lowerGrowthCheckbox' with the actual ID of your LowerGrowth checkbox
    const lowerGrowthCheckbox = document.getElementById('lowerGrowthCheckbox'); 
    const inputLowerGrowthDiv = document.getElementById('inputLowerGrowthDiv'); // The div containing the LowerGrowth input

    if (!lowerGrowthCheckbox) {
        console.error('Checkbox with ID "fundGrowthPost" not found.');
        return;
    }

    // Function to show LowerGrowth input
    function showLowerGrowthInput() {
        inputLowerGrowthDiv.classList.remove('hidden');
        inputLowerGrowthDiv.classList.add('visible');
    }

    // Function to hide input and reset its value
    function hideLowerGrowthInput(fundGrowthPre) {
            inputLowerGrowthDiv.classList.remove('visible');
            inputLowerGrowthDiv.classList.add('hidden');
            lowerGrowthInput.value = document.getElementById('fundGrowthPre').value; 
            checkFirstCalc();
    }

    // Add an event listener to the checkbox
    lowerGrowthCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the LowerGrowth input when checked
            showLowerGrowthInput();
        } else {
            // Hide the LowerGrowth input and reset its value when unchecked
            hideLowerGrowthInput();
            
        }
    });

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (lowerGrowthCheckbox.checked) {
            showLowerGrowthInput();
        } else {
            hideLowerGrowthInput();
        }
    });


    // For minimum ISA Balance
    const minISABalanceCheckbox = document.getElementById('minISABalanceCheckbox'); 
    const inputMinISABalanceDiv = document.getElementById('inputMinISABalance'); // The div containing the Minimum ISA Balance inputs

    if (!minISABalanceCheckbox) {
        console.error('Checkbox with ID "minISABalanceCheckbox" not found.');
        return;
    }

    // Function to show Minimum ISA Balance inputs
    function showMinISABalanceInputs() {
        if (inputMinISABalanceDiv) {
            inputMinISABalanceDiv.classList.remove('hidden');
            inputMinISABalanceDiv.classList.add('visible');
        } else {
            console.error('Div with ID "minISABalance" not found.');
        }
    }

    // Function to hide inputs and reset their values
    function hideMinISABalanceInputs() {
        if (inputMinISABalanceDiv) {
            inputMinISABalanceDiv.classList.remove('visible');
            inputMinISABalanceDiv.classList.add('hidden');
            document.getElementById('minISABalance').value = 0; 
            checkFirstCalc();
        } 
              
        
    }

    // Add an event listener to the checkbox
    minISABalanceCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the Minimum ISA Balance inputs when checked
            showMinISABalanceInputs();
        } else {
            // Hide the Minimum ISA Balance inputs and reset their values when unchecked
            hideMinISABalanceInputs();
        }
    });

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (minISABalanceCheckbox.checked) {
            showMinISABalanceInputs();
        } else {
            hideMinISABalanceInputs();
        }
    });



    //For DB Pension Innputs
    const dbPensionAmountInput = document.getElementById('dbPensionAmount');
    const dbPensionAgeInput = document.getElementById('dbPensionAge');
    
    // Replace 'DBPensionCheckbox' with the actual ID of your DB Pension checkbox
    const dbPensionCheckbox = document.getElementById('DBPensionCheckbox');
    const inputDBPensionDiv = document.getElementById('inputDBPensionAmount'); // The div containing the DB Pension inputs
    const inputDBPAgeDiv = document.getElementById('inputDBPensionAge'); // The div containing the DB Pension inputs

    if (!dbPensionCheckbox) {
        console.error('Checkbox with ID "DBPensionCheckbox" not found.');
        // Depending on your setup, you might want to stop execution here
        // return;
    }

    // Function to show DB Pension inputs
    function showDBPensionInputs() {
        if (inputDBPensionDiv) {
            inputDBPensionDiv.classList.remove('hidden');
            inputDBPensionDiv.classList.add('visible');
            inputDBPAgeDiv.classList.remove('hidden');
            inputDBPAgeDiv.classList.add('visible');
            document.getElementById('dbPensionAmount').value = 10000;
            document.getElementById('dbPensionAge').value = 60;
            checkFirstCalc();
        } else {
            console.error('Div with ID "inputDBPensionDiv" not found.');
        }
    }

    // Function to hide inputs and reset their values
    function hideDBPensionInputs() {
        if (inputDBPensionDiv) {
            inputDBPensionDiv.classList.remove('visible');
            inputDBPensionDiv.classList.add('hidden');
            inputDBPAgeDiv.classList.remove('visible');
            inputDBPAgeDiv.classList.add('hidden');
            document.getElementById('dbPensionAmount').value = 0;
            document.getElementById('dbPensionAge').value = 60;
            checkFirstCalc();
        } else {
            console.error('Div with ID "inputDBPensionDiv" not found.');
        }
        
       
        
    }

    // Add an event listener to the checkbox
    if (dbPensionCheckbox) {
        dbPensionCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Show the DB Pension inputs when checked
                showDBPensionInputs();
            } else {
                // Hide the DB Pension inputs and reset their values when unchecked
                hideDBPensionInputs();
            }
        });
    }

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (dbPensionCheckbox) {
            if (dbPensionCheckbox.checked) {
                showDBPensionInputs();
            } else {
                hideDBPensionInputs();
            }
        }
    });


    // For fund charges input
    const fundChargesCheckbox = document.getElementById('fundChargesCheckbox'); 
    const inputFundChargesDiv = document.getElementById('inputFundChargesDiv'); // The div containing the Fund Charges input

    // Function to show Fund Charges input
    function showFundChargesInput() {
        inputFundChargesDiv.classList.remove('hidden');
        inputFundChargesDiv.classList.add('visible');
        document.getElementById('fundChargesInput').value = 0;
        checkFirstCalc();
    }

    // Function to hide input and reset its value
     function hideFundChargesInput() {
        inputFundChargesDiv.classList.remove('visible');
        inputFundChargesDiv.classList.add('hidden');
        const fundGrowthPre = document.getElementById('fundGrowthPre').value; 
        document.getElementById('fundChargesInput').value = 0;
        checkFirstCalc();
    }

    // Add an event listener to the checkbox
    fundChargesCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the Fund Charges input when checked
            showFundChargesInput();
        } else {
            // Hide the Fund Charges input and reset its value when unchecked
            hideFundChargesInput();
        }
    }); 

    document.addEventListener('DOMContentLoaded', function() {
        if (fundChargesCheckbox.checked) {
            showFundChargesInput();
        } else {
            hideFundChargesInput();
        }
    });


    // For TFC
    const TFCCheckBox = document.getElementById('TFCCheckbox'); 
    const inputTaxFreeCashDiv = document.getElementById('inputTFCDiv'); // The div containing the Tax Free Cash input

    // Function to show Tax Free Cash input
    function showTaxFreeCashInput() {
        inputTaxFreeCashDiv.classList.remove('hidden');
        inputTaxFreeCashDiv.classList.add('visible');
    }

    // Function to hide input and reset its value
    function hideTaxFreeCashInput() {
        inputTaxFreeCashDiv.classList.remove('visible');
        inputTaxFreeCashDiv.classList.add('hidden');
        document.getElementById('taxFreeCashPercent').value = 0; // Resetting input value to empty
        checkFirstCalc();
    }

    // Add an event listener to the checkbox
    
    TFCCheckBox.addEventListener('change', function() {
        if (this.checked) {
            // Show the Tax Free Cash input when checked
            showTaxFreeCashInput();
        } else {
            // Hide the Tax Free Cash input and reset its value when unchecked
            hideTaxFreeCashInput();
        }
    });

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (TFCCheckBox.checked) {
            showTaxFreeCashInput();
        } else {
            hideTaxFreeCashInput();
        }
    });



    // For Inflation
    const inflationCheckBox = document.getElementById('inflationCheckBox'); 
    const inputInflationDiv = document.getElementById('inputInflationDiv'); // The div containing the Inflation input

    if (!inflationCheckBox) {
        console.error('Checkbox with ID "inflationCheckBox" not found.');
        return;
    }

    // Function to show Inflation input
    function showInflationInput() {
        inputInflationDiv.classList.remove('hidden');
        inputInflationDiv.classList.add('visible');
    }

    // Function to hide input and reset its value
    function hideInflationInput() {
        inputInflationDiv.classList.remove('visible');
        inputInflationDiv.classList.add('hidden');
        document.getElementById('inflation').value = 2;
        checkFirstCalc();
    }

    // Add an event listener to the checkbox
    inflationCheckBox.addEventListener('change', function() {
        if (this.checked) {
            // Show the Inflation input when checked
            showInflationInput();
        } else {
            // Hide the Inflation input and reset its value when unchecked
            hideInflationInput();
        }
    });

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (inflationCheckBox.checked) {
            showInflationInput();
        } else {
            hideInflationInput();
        }
    });



    //Fund Growth
    const fundGrowthCheckBox = document.getElementById('fundGrowthCheckbox'); 
    const inputFundGrowthDiv = document.getElementById('inputFundGrowthDiv'); // The div containing the Fund Growth input

    // Function to show Fund Growth input
    function showFundGrowthInput() {
        inputFundGrowthDiv.classList.remove('hidden');
        inputFundGrowthDiv.classList.add('visible');
    }

    // Function to hide input and reset its value
    function hideFundGrowthInput() {
        inputFundGrowthDiv.classList.remove('visible');
        inputFundGrowthDiv.classList.add('hidden');
        document.getElementById('fundGrowthPre').value = 7; // Resetting input value to empty
        hideLowerGrowthInput();
        document.getElementById('lowerGrowthCheckbox').checked = false;
        checkFirstCalc();
    }

    // Add an event listener to the checkbox
    fundGrowthCheckBox.addEventListener('change', function() {
        if (this.checked) {
            // Show the Fund Growth input when checked
            showFundGrowthInput();
        } else {
            // Hide the Fund Growth input and reset its value when unchecked
            hideFundGrowthInput();
        }
    });

    // Optional: Initialize the visibility and values based on the checkbox state on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (fundGrowthCheckBox.checked) {
            showFundGrowthInput();
        } else {
            hideFundGrowthInput();
        }
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