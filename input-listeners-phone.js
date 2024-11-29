
 // Get all input fields - THIS LISTENS FOR ANY CLICKS
 var inputFields = document.querySelectorAll('input');
  

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the value from localStorage and check if it's the user's first visit
    
    initialiseInitialInputsAndCheckboxesPhone();
    restoreSelectedRetirementIncomeStandardOption();
    
});

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('input', saveInputsToLocalStoragePhone);
    });
});


   

function saveToLocalStorage(key, value) {
    // Store the value in localStorage, converting booleans for checkboxes
    localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
  }



function initialiseInitialInputsAndCheckboxesPhone() {
    // Check for each input field, if no localStorage value exists, use the initial HTML value
   
    if (localStorage.getItem('monthlyContribution')) {
      document.getElementById('inputMonthlyContributionPhone').value = localStorage.getItem('monthlyContribution');
    }

    if (localStorage.getItem('monthlyISAContribution')) {
        document.getElementById('inputMonthlyISAContributionPhone').value = localStorage.getItem('monthlyISAContribution');
    }

    if (localStorage.getItem('retirementAge')) {
        document.getElementById('inputRetirementAgePhone').value = localStorage.getItem('retirementAge');
    }

    if (localStorage.getItem('desiredIncome')) {
        document.getElementById('inputDesiredIncomePhone').value = localStorage.getItem('desiredIncome');
    }

    if (localStorage.getItem('taxFreeCashPercent')) {
        document.getElementById('inputTaxFreeCashPercentPhone').value = localStorage.getItem('taxFreeCashPercent');
    }
    
    if (localStorage.getItem('currentAge')) {
        document.getElementById('currentAgePhone').value = localStorage.getItem('currentAge');
    }
    
    if (localStorage.getItem('currentFund')) {
        document.getElementById('currentFundPhone').value = localStorage.getItem('currentFund');
    }
    
    if (localStorage.getItem('currentISA')) {
        document.getElementById('currentISAPhone').value = localStorage.getItem('currentISA');
    }
    
    if (localStorage.getItem('dbPensionAmount')) {
        document.getElementById('dbPensionAmountPhone').value = localStorage.getItem('dbPensionAmount');
    }
    
    if (localStorage.getItem('dbPensionAge')) {
        document.getElementById('dbPensionAgePhone').value = localStorage.getItem('dbPensionAge');
    }

     
    
}



document.querySelectorAll('input[name="togglePhone"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      console.log('Selected:', event.target.value);
      // Add your logic here to handle the selected option
    });
  });
  

  document.querySelectorAll('input[name="togglePhone"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        updateRetirementLivingStandardsSelector(event);
    });
  });
  



  function restoreSelectedRetirementIncomeStandardOption() {
    const selectedOption = localStorage.getItem('selectedRetirementIncomeStandardOption');
    if (selectedOption) {
      // Find the radio input with the saved value and check it
      const toggleInput = document.querySelector(`input[name="togglePhone"][value="${selectedOption}"]`);
      if (toggleInput) {
        toggleInput.checked = true;
        console.log(`Restored selected option: ${selectedOption}`);
      }
    }
  }


  function selectOption(option) {
    // Get all toggle options
    const toggleOptions = document.querySelectorAll('.toggle-option');

    // Remove 'active' class from all options
    toggleOptions.forEach(optionElement => optionElement.classList.remove('active'));

    // Add 'active' class to the selected option
    const selectedElement = document.querySelector(`.toggle-option.${option}`);
    selectedElement.classList.add('active');

    // Update the displayed selected option
    const selectedOptionDisplay = document.getElementById('selectedOption');
    selectedOptionDisplay.textContent = option.charAt(0).toUpperCase() + option.slice(1);
}


function toggleIncomePeriod(switchElement) {
    saveAndCalc();
    if (switchElement.checked) {
        console.log("Switched to Monthly Income");
    } else {
        console.log("Switched to Yearly Income");
    }
}

function toggleValuePerspective(switchElement) {
    saveAndCalc();
    if (switchElement.checked) {
        console.log("Switched to Future Values");
    } else {
        console.log("Switched to In Today's Money");
    }
}


function formatNumber(value) {
    return new Intl.NumberFormat('en-GB').format(value);
}

// Function to update the output box value dynamically based on the slider's position
function updateOutput(outputId, value, formatWithCommas) {
    const outputElement = document.getElementById(outputId);
    if (formatWithCommas) {
        outputElement.textContent = formatNumber(value);
    } else {
        // For values that don't require formatting (like age or percentage)
        outputElement.textContent = value;
        
    }
    saveAndCalc();
}

function saveInputsToLocalStoragePhone() {
    for (const [inputId, valueId] of Object.entries(inputToValueMap)) {
        const outputElement = document.getElementById(inputId);
        if (outputElement) {
            const rawValue = outputElement.textContent.replace(/,/g, '').replace('%', ''); // Remove formatting (commas, %)
            saveToLocalStorage(valueId, rawValue);
            
        }
    }
}

function saveSlidersToLocalStorage() {
    for (const [sliderId, outputId] of Object.entries(sliderToOutputMap)) {
        const outputElement = document.getElementById(outputId);
        if (outputElement) {
            const rawValue = outputElement.textContent.replace(/,/g, '').replace('%', ''); // Remove formatting (commas, %)
            saveToLocalStorage(sliderId, rawValue);
            saveToLocalStorage(outputId, rawValue);
        }
    }
}

// Helper function to save a single value to localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}


const sliderToOutputMap = {
    'currentAgeSlider': 'currentAgePhone',
    'currentFundSlider': 'currentFundPhone',
    'currentISASlider': 'currentISAPhone',
    'monthlyPensionContributionsSlider': 'inputMonthlyContributionPhone',
    'monthlyISADepositsSlider': 'inputMonthlyISAContributionPhone',
    'annualPensionSlider': 'dbPensionAmountPhone',
    'pensionPayableAgeSlider': 'dbPensionAgePhone',
    'desiredIncomeSlider': 'inputDesiredIncomePhone',
    'retirementAgeSlider': 'inputRetirementAgePhone',
    'taxFreeCashSlider': 'inputTaxFreeCashPercentPhone',
    'fundGrowthSlider': 'fundGrowthPhone',       // Added
    'inflationSlider': 'inflationPhone',         // Added
    'fundChargesSlider': 'fundChargesPhone'      // Added
};


const inputToValueMap = {
    'currentAgePhone': 'currentAge',
    'currentFundPhone': 'currentFund',
    'currentISAPhone': 'currentISA',
    'inputMonthlyContributionPhone': 'monthlyContribution',
    'inputMonthlyISAContributionPhone': 'monthlyISAContribution',
    'dbPensionAmountPhone': 'dbPensionAmount',
    'dbPensionAgePhone': 'dbPensionAge',
    'inputDesiredIncomePhone': 'desiredIncome',
    'inputRetirementAgePhone': 'retirementAge',
    'inputTaxFreeCashPercentPhone': 'taxFreeCashPercent',
    'fundGrowthPhone': 'fundGrowthPre',             // Added
    'inflationPhone': 'inflation',               // Added
    'fundChargesPhone': 'fundCharges'            // Added
};


// Example function to retrieve raw values for calculations
function getRawValue(outputId) {
    const outputElement = document.getElementById(outputId);
    if (outputElement) {
        if (
            outputId === 'currentAgePhone' ||
            outputId === 'dbPensionAgePhone' ||
            outputId === 'inputRetirementAgePhone' ||
            outputId === 'inputTaxFreeCashPercentPhone' ||
            outputId === 'fundGrowthPhone' ||
            outputId === 'inflationPhone' ||
            outputId === 'fundChargesPhone'
        ) {
            return parseInt(outputElement.textContent, 10);
        } else {
            // Remove commas for numerical values
            return parseInt(outputElement.textContent.replace(/,/g, ''), 10);
        }
    }
    saveAllInputsToLocalStoragePhone();
    return 0;
}


// Initialize sliders with saved values on page load
document.addEventListener("DOMContentLoaded", function() {
    initialiseLocalStorageValues();
    loadSlidersFromLocalStorage();
    saveAndCalc();
});


// Function to load slider values from localStorage and initialize sliders and outputs
function loadSlidersFromLocalStorage() {
    for (const [sliderId, outputId] of Object.entries(sliderToOutputMap)) {
        const savedValue = localStorage.getItem(sliderId);
        if (savedValue !== null) {
            const slider = document.getElementById(sliderId);
            const output = document.getElementById(outputId);
            if (slider && output) {
                slider.value = savedValue;
                // Update the output box based on whether formatting is needed
                if (
                    outputId === 'currentAgePhone' ||
                    outputId === 'dbPensionAgePhone' ||
                    outputId === 'inputRetirementAgePhone' ||
                    outputId === 'inputTaxFreeCashPercentPhone' ||
                    outputId === 'fundGrowthPhone' ||
                    outputId === 'inflationPhone' ||
                    outputId === 'fundChargesPhone'
                ) {
                    output.textContent = savedValue;
                } else {
                    output.textContent = formatNumber(savedValue);
                }
            }
        }
    }
}





function updateRetirementLivingStandardsSelector(event) {

    const selectedValue = event.target.value;
    console.log(`Selected: ${selectedValue}`);

    var target = document.getElementById("desiredIncomeSlider");
    //Single income only for phone
    var values = {
        Minimum: parseInt(14400/12/10)*10,
        Moderate: parseInt(31300/12/10)*10,
        Comfortable: parseInt(43100/12/10)*10
    }


    // Perform an action based on the selected value
    if (selectedValue === "Option 1") {
    target.value = parseInt(values.Minimum);
    } else if (selectedValue === "Option 2") {
    target.value = parseInt(values.Moderate);
    } else if (selectedValue === "Option 3") {
    target.value = parseInt(values.Comfortable);
    }

    updateOutput("inputDesiredIncomePhone", target.value)
    localStorage.setItem('selectedRetirementIncomeStandardOption', selectedValue);
    saveAllInputsToLocalStoragePhone();
    saveAndCalc();

}

function initialiseLocalStorageValues() {
    const defaults = {
        planAsCouple: false,
        alreadyRetired: false,
        currentAge: 50,
        retirementAge: 65,
        inflation: 0.025, // 2.5% default
        TFC: 0.025, // 2.5% default
        desiredCombinedIncome: 0,
        currentFund: 0.0,
        monthlyContribution: 0.0,
        currentISA: 0.0,
        monthlyISAContribution: 0.0,
        dbPensionAmount: 0.0,
        dbPensionAge: 0,
        endAge: 95,
        finalFund: 0.0,
        taxFreeCashPercent: 0.0,
        desiredIncome: 0,
        currentAgePartner: 0,
        stepUpAge: 0,
        stepUpContribution: 0.0,
        minISABalance: 0.0,
        useScottishTax: false,
        fundGrowthPre: 0.05, // 5% default
        fundGrowthPost: 0.05, // 5% default
        fundCharges: 0.01, // 1% default
        applyInflationAdjustment: false,
        marketCrashAge: null,
        marketCrashPercent: null,
        currentFundPartner: 0,
        monthlyContributionPartner: 0.0,
        currentISAPartner: 0,
        monthlyISAContributionPartner: 0.0,
        dbPensionAmountPartner: 0,
        dbPensionAgePartner: 0,
        partnersFinalFund: 0.0,
        annualValues: false
    };

    Object.keys(defaults).forEach((key) => {
        if (localStorage.getItem(key) === null) {
            const value = defaults[key];
            localStorage.setItem(key, typeof value === "boolean" ? value.toString() : value);
        }
    });
}