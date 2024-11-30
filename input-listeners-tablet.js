function saveAndCalc() {
    saveToLocalStorage("planAsCouple", false);
    saveInputsToLocalStoragePhone();
    calculateMyPension(true, true);
    
}

// Save input values from phone-specific elements to local storage
function saveInputsToLocalStoragePhone() {
    // Save current age
    const currentAgePhone = document.getElementById('currentAgePhone');
    if (currentAgePhone) {
        const rawValue = currentAgePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('currentAge', rawValue);
    }

    // Save current fund
    const currentFundPhone = document.getElementById('currentFundPhone');
    if (currentFundPhone) {
        const rawValue = currentFundPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('currentFund', rawValue);
    }

    // Save current ISA
    const currentISAPhone = document.getElementById('currentISAPhone');
    if (currentISAPhone) {
        const rawValue = currentISAPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('currentISA', rawValue);
    }

    // Save monthly contribution
    const monthlyContributionPhone = document.getElementById('inputMonthlyContributionPhone');
    if (monthlyContributionPhone) {
        const rawValue = monthlyContributionPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('monthlyContribution', rawValue);
    }

    // Save monthly ISA contribution
    const monthlyISAContributionPhone = document.getElementById('inputMonthlyISAContributionPhone');
    if (monthlyISAContributionPhone) {
        const rawValue = monthlyISAContributionPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('monthlyISAContribution', rawValue);
    }

    // Save DB pension amount
    const dbPensionAmountPhone = document.getElementById('dbPensionAmountPhone');
    if (dbPensionAmountPhone) {
        const rawValue = dbPensionAmountPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('dbPensionAmount', rawValue);
    }

    // Save DB pension age
    const dbPensionAgePhone = document.getElementById('dbPensionAgePhone');
    if (dbPensionAgePhone) {
        const rawValue = dbPensionAgePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('dbPensionAge', rawValue);
    }

    // Save desired income
    const desiredIncomePhone = document.getElementById('inputDesiredIncomePhone');
    if (desiredIncomePhone) {
        const rawValue = desiredIncomePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('desiredIncome', rawValue);
    }

    // Save retirement age
    const retirementAgePhone = document.getElementById('inputRetirementAgePhone');
    if (retirementAgePhone) {
        const rawValue = retirementAgePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('retirementAge', rawValue);
    }

    // Save tax-free cash percent
    const taxFreeCashPercentPhone = document.getElementById('inputTaxFreeCashPercentPhone');
    if (taxFreeCashPercentPhone) {
        const rawValue = taxFreeCashPercentPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('taxFreeCashPercent', rawValue);
    }

    // Save fund growth
    const fundGrowthPhone = document.getElementById('fundGrowthPhone');
    if (fundGrowthPhone) {
        const rawValue = fundGrowthPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('fundGrowthPre', rawValue);
    }

    const fundGrowthPostPhone = document.getElementById('fundGrowthPostPhone');
    if (fundGrowthPostPhone) {
        const rawValue = fundGrowthPostPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('fundGrowthPost', rawValue);
    }

    // Save inflation
    const inflationPhone = document.getElementById('inflationPhone');
    if (inflationPhone) {
        const rawValue = inflationPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('inflation', rawValue);
    }

    // Save fund charges
    const fundChargesPhone = document.getElementById('fundChargesPhone');
    if (fundChargesPhone) {
        const rawValue = fundChargesPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('fundCharges', rawValue);
    }

    // Save use Scottish tax flag
    const useScottishTaxPhone = document.getElementById('useScottishTaxPhone');
    if (useScottishTaxPhone) {
        const isChecked = useScottishTaxPhone.checked;
        saveToLocalStorage('useScottishTax', isChecked);
    }

    const endAgePhone = document.getElementById('endAgePhone');
    if (endAgePhone) {
        const rawValue = endAgePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('endAge', rawValue);
    }

    // Save Frequency flag
    const frequencySliderPhone = document.getElementById('frequencySliderPhone');
    if (frequencySliderPhone) {
        const isChecked = frequencySliderPhone.checked;
        saveToLocalStorage('annualValues', isChecked);
    }


    // Save Frequency flag
    const applyInflationAdjustmentPhone = document.getElementById('applyInflationAdjustmentPhone');
    if (applyInflationAdjustmentPhone) {
        const isChecked = applyInflationAdjustmentPhone.checked;
        saveToLocalStorage('applyInflationAdjustment', isChecked);
    }

    // Save Market Crash Age
    const marketCrashAgePhone = document.getElementById('marketCrashAgePhone');
    if (marketCrashAgePhone) {
        const rawValue = marketCrashAgePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('marketCrashAge', rawValue);
    }

    // Save Market Crash Percent
    const marketCrashPercentPhone = document.getElementById('marketCrashPercentPhone');
    if (marketCrashPercentPhone) {
        const rawValue = marketCrashPercentPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('marketCrashPercent', rawValue);
    }

    // Save Minimum ISA Balance
    const minimumISABalancePhone = document.getElementById('minimumISABalancePhone');
    if (minimumISABalancePhone) {
        const rawValue = minimumISABalancePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('minISABalance', rawValue);
    }

    // Save Final Fund Target
    const finalFundTargetPhone = document.getElementById('finalFundTargetPhone');
    if (finalFundTargetPhone) {
        const rawValue = finalFundTargetPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('finalFund', rawValue);
    }

    // Save Contribution Increase Age
    const contributionIncreaseAgePhone = document.getElementById('contributionIncreaseAgePhone');
    if (contributionIncreaseAgePhone) {
        const rawValue = contributionIncreaseAgePhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('stepUpAge', rawValue);
    }

    // Save Additional Contribution
    const additionalContributionPhone = document.getElementById('additionalContributionPhone');
    if (additionalContributionPhone) {
        const rawValue = additionalContributionPhone.textContent.replace(/,/g, '').replace('%', '');
        saveToLocalStorage('stepUpContribution', rawValue);
    }
}

// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('input');

document.addEventListener('DOMContentLoaded', function() {
    // Initialize localStorage values if not already set
    //initialiseLocalStorageValues();
    initialiseInitialInputsAndCheckboxesPhone();
    restoreSelectedRetirementIncomeStandardOption();
    loadSlidersFromLocalStorage();
    saveAndCalc();
});

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('input', saveAndCalc);
    });
});

function saveToLocalStorage(key, value) {
    // Store the value in localStorage, converting booleans for checkboxes
    localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
}

function initialiseInitialInputsAndCheckboxesPhone() {
    // Input IDs and corresponding localStorage keys
    const inputsAndSliders = [
        { inputId: 'inputMonthlyContributionPhone', localStorageKey: 'monthlyContribution', sliderId: 'monthlyPensionContributionsSlider' },
        { inputId: 'inputMonthlyISAContributionPhone', localStorageKey: 'monthlyISAContribution', sliderId: 'monthlyISADepositsSlider' },
        { inputId: 'inputRetirementAgePhone', localStorageKey: 'retirementAge', sliderId: 'retirementAgeSlider' },
        { inputId: 'inputDesiredIncomePhone', localStorageKey: 'desiredIncome', sliderId: 'desiredIncomeSlider' },
        { inputId: 'inputTaxFreeCashPercentPhone', localStorageKey: 'taxFreeCashPercent', sliderId: 'taxFreeCashSlider' },
        { inputId: 'currentAgePhone', localStorageKey: 'currentAge', sliderId: 'currentAgeSlider' },
        { inputId: 'currentFundPhone', localStorageKey: 'currentFund', sliderId: 'currentFundSlider' },
        { inputId: 'currentISAPhone', localStorageKey: 'currentISA', sliderId: 'currentISASlider' },
        { inputId: 'dbPensionAmountPhone', localStorageKey: 'dbPensionAmount', sliderId: 'annualPensionSlider' },
        { inputId: 'dbPensionAgePhone', localStorageKey: 'dbPensionAge', sliderId: 'pensionPayableAgeSlider' },
        { inputId: 'endAgePhone', localStorageKey: 'endAge', sliderId: 'endAgeSlider' },
        { inputId: 'fundGrowthPhone', localStorageKey: 'fundGrowthPre', sliderId: 'fundGrowthSlider' },
        { inputId: 'fundGrowthPostPhone', localStorageKey: 'fundGrowthPost', sliderId: 'fundGrowthPostSlider' },
        { inputId: 'inflationPhone', localStorageKey: 'inflation', sliderId: 'inflationSlider' },
        { inputId: 'fundChargesPhone', localStorageKey: 'fundCharges', sliderId: 'fundChargesSlider' },
        { inputId: 'marketCrashAgePhone', localStorageKey: 'marketCrashAge', sliderId: 'marketCrashAgeSlider' },
        { inputId: 'marketCrashPercentPhone', localStorageKey: 'marketCrashPercent', sliderId: 'marketCrashPercentSlider' },
        { inputId: 'minimumISABalancePhone', localStorageKey: 'minISABalance', sliderId: 'minimumISABalanceSlider' },
        { inputId: 'finalFundTargetPhone', localStorageKey: 'finalFund', sliderId: 'finalFundTargetSlider' },
        { inputId: 'contributionIncreaseAgePhone', localStorageKey: 'stepUpAge', sliderId: 'contributionIncreaseAgeSlider' },
        { inputId: 'additionalContributionPhone', localStorageKey: 'stepUpContribution', sliderId: 'additionalContributionSlider' },
    ];

    inputsAndSliders.forEach(item => {
        const inputElement = document.getElementById(item.inputId);
        const sliderElement = document.getElementById(item.sliderId);
        const value = localStorage.getItem(item.localStorageKey) || inputElement.value || '0';

        if (inputElement) {
            inputElement.value = value;
            // Also set textContent if necessary
            inputElement.textContent = value;
        }

        if (sliderElement) {
            sliderElement.value = value;
        }
    });

    // Set checkboxes
    document.getElementById('useScottishTaxPhone').checked = localStorage.getItem('useScottishTax') === 'true';
    document.getElementById('frequencySliderPhone').checked = localStorage.getItem('annualValues') === 'true';
    document.getElementById('applyInflationAdjustmentPhone').checked = localStorage.getItem('applyInflationAdjustment') === 'true';
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

function toggleScottishTax(switchElement) {
    saveAndCalc();
    if (switchElement.checked) {
        console.log("Switched to Scottish Tax");
    } else {
        console.log("Switched to English Tax");
    }
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
    if (outputElement) {
        if (formatWithCommas) {
            outputElement.textContent = formatNumber(value);
        } else {
            outputElement.textContent = value;
        }
        saveAndCalc();
    }
}

// Since we don't save slider values to localStorage anymore, remove saveSlidersToLocalStorage function

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
    saveInputsToLocalStoragePhone();
    return 0;
}

// Initialize sliders with saved values on page load
/* document.addEventListener("DOMContentLoaded", function() {
    loadSlidersFromLocalStorage();
    saveAndCalc();
}); */

// Function to load slider values from localStorage and initialize sliders and outputs
function loadSlidersFromLocalStorage() {
    // Since we don't save slider values to localStorage, we derive them from the values saved by saveInputsToLocalStoragePhone
    const outputIds = Object.values(sliderToOutputMap);
    outputIds.forEach(outputId => {
        const savedValue = localStorage.getItem(outputId);
        if (savedValue !== null) {
            const sliderId = Object.keys(sliderToOutputMap).find(key => sliderToOutputMap[key] === outputId);
            const slider = document.getElementById(sliderId);
            const output = document.getElementById(outputId);
            if (slider && output) {
                slider.value = savedValue;
                // Update the output box based on whether formatting is needed
                if (
                    outputId === 'currentAgePhone' ||
                    outputId === 'endAgePhone' ||
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
    });
}

function updateRetirementLivingStandardsSelector(event) {
    const selectedValue = event.target.value;
    console.log(`Selected: ${selectedValue}`);

    var target = document.getElementById("desiredIncomeSlider");
    // Single income only for phone
    var values = {
        Minimum: parseInt(14400 / 12 / 10) * 10,
        Moderate: parseInt(31300 / 12 / 10) * 10,
        Comfortable: parseInt(43100 / 12 / 10) * 10
    };

    // Perform an action based on the selected value
    if (selectedValue === "Option 1") {
        target.value = parseInt(values.Minimum);
    } else if (selectedValue === "Option 2") {
        target.value = parseInt(values.Moderate);
    } else if (selectedValue === "Option 3") {
        target.value = parseInt(values.Comfortable);
    }

    updateOutput("inputDesiredIncomePhone", target.value);
    localStorage.setItem('selectedRetirementIncomeStandardOption', selectedValue);
    saveInputsToLocalStoragePhone();
    saveAndCalc();
}

function initialiseLocalStorageValues() {
    const defaults = {
        planAsCouple: false,
        alreadyRetired: false,
        currentAge: 50,
        retirementAge: 65,
        inflation: 2.5, // 2.5% default
        TFC: 2.5, // 2.5% default
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
        fundGrowthPre: 5, // 5% default
        fundGrowthPost: 5, // 5% default
        fundCharges: 1, // 1% default
        marketCrashAge: 60, // Default market crash age
        marketCrashPercent: 0, // Default market crash percentage
        currentFundPartner: 0,
        monthlyContributionPartner: 0.0,
        currentISAPartner: 0,
        monthlyISAContributionPartner: 0.0,
        dbPensionAmountPartner: 0,
        dbPensionAgePartner: 0,
        partnersFinalFund: 0.0,
        annualValues: false,
        applyInflationAdjustment: true,
        contributionIncreaseAge: 55, // Default contribution increase age
        additionalContribution: 0, // Default additional contribution
    };

    Object.keys(defaults).forEach((key) => {
        if (localStorage.getItem(key) === null) {
            const value = defaults[key];
            localStorage.setItem(key, typeof value === "boolean" ? value.toString() : value);
        }
    });
}

function resetAssumptionsToDefaultValues() {
    const defaults = {
        finalFund: 0.0,
        inflation: 3,
        stepUpAge: 55,
        stepUpContribution: 0.0,
        minISABalance: 0.0,
        fundGrowthPre: 7,
        fundGrowthPost: 7,
        fundCharges: 1,
        marketCrashAge: 50,
        marketCrashPercent: 0,
        partnersFinalFund: 0.0,
        minISABalance: 0,
        finalFund: 0,
    };

    Object.keys(defaults).forEach((key) => {
        localStorage.setItem(key, defaults[key].toString());
    });

    // Update the inputs and sliders with the default values
    initialiseInitialInputsAndCheckboxesPhone();
    saveAndCalc();
}

// Add event listener for the reset button
document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('resetAssumptionsButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset all assumptions to default values
            resetAssumptionsToDefaultValues();

            // Save and recalculate after resetting
            saveAndCalc();

            // Provide feedback to the user
            alert('All assumptions have been reset to default values.');
        });
    }
});

// Map of sliders to output boxes
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
    'fundGrowthSlider': 'fundGrowthPhone',
    'inflationSlider': 'inflationPhone',
    'fundChargesSlider': 'fundChargesPhone',
    'endAgeSlider': 'endAgePhone',
    'fundGrowthPostSlider': 'fundGrowthPostPhone',
    'marketCrashAgeSlider': 'marketCrashAgePhone',
    'marketCrashPercentSlider': 'marketCrashPercentPhone',
    'minimumISABalanceSlider': 'minimumISABalancePhone',
    'finalFundTargetSlider': 'finalFundTargetPhone',
    'contributionIncreaseAgeSlider': 'contributionIncreaseAgePhone',
    'additionalContributionSlider': 'additionalContributionPhone',
};
