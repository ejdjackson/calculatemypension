// Function to save inputs and calculate
function saveAndCalc() {
    // First process the selected retirement income option
     restoreSelectedRetirementIncomeStandardOption();
    // initialiseLocalStorageValues();
    saveInputsToLocalStoragePhone();
    calculateMyPension(true, true);
   
}

// Save input values from phone-specific elements to local storage
function saveInputsToLocalStoragePhone() {
    // Helper function to get raw value from formatted text
    function getRawValueFromText(text) {
        return text.replace(/[£,]/g, '').replace(/%/g, '').trim();
    }

    // List of input elements and their corresponding localStorage keys
    const inputs = [
        { elementId: 'currentAgePhone', storageKey: 'currentAge' },
        { elementId: 'currentFundPhone', storageKey: 'currentFund' },
        { elementId: 'currentISAPhone', storageKey: 'currentISA' },
        { elementId: 'inputMonthlyContributionPhone', storageKey: 'monthlyContribution' },
        { elementId: 'inputMonthlyISAContributionPhone', storageKey: 'monthlyISAContribution' },
        { elementId: 'dbPensionAmountPhone', storageKey: 'dbPensionAmount' },
        { elementId: 'dbPensionAgePhone', storageKey: 'dbPensionAge' },
        { elementId: 'inputDesiredIncomePhone', storageKey: 'desiredIncome' },
        { elementId: 'inputRetirementAgePhone', storageKey: 'retirementAge' },
        { elementId: 'inputTaxFreeCashPercentPhone', storageKey: 'taxFreeCashPercent' },
        { elementId: 'fundGrowthPercentPhone', storageKey: 'fundGrowthPre' },
        { elementId: 'fundGrowthPostPercentPhone', storageKey: 'fundGrowthPost' },
        { elementId: 'inflationPercentPhone', storageKey: 'inflation' },
        { elementId: 'fundChargesPercentPhone', storageKey: 'fundCharges' },
        { elementId: 'endAgePhone', storageKey: 'endAge' },
        { elementId: 'marketCrashAgePhone', storageKey: 'marketCrashAge' },
        { elementId: 'marketCrashPercentPhone', storageKey: 'marketCrashPercent' },
        { elementId: 'minimumISABalancePhone', storageKey: 'minISABalance' },
        { elementId: 'finalFundTargetPhone', storageKey: 'finalFund' },
        { elementId: 'contributionIncreaseAgePhone', storageKey: 'stepUpAge' },
        { elementId: 'additionalContributionPhone', storageKey: 'stepUpContribution' },
        { elementId: 'isaPriorityPhone', storageKey: 'isaPriority' }
    ];

    // Iterate over inputs and save their raw values
    inputs.forEach(({ elementId, storageKey }) => {
        const element = document.getElementById(elementId);
        if (element) {
            const rawValue = getRawValueFromText(element.textContent);
            saveToLocalStorage(storageKey, rawValue);
        }
    });

    // Save checkboxes
    const useScottishTaxPhone = document.getElementById('useScottishTaxPhone');
    if (useScottishTaxPhone) {
        const isChecked = useScottishTaxPhone.checked;
        saveToLocalStorage('useScottishTax', isChecked);
    }

    const showDefinedContributionCheckbox = document.getElementById('showDefinedContributionPension');
    if (showDefinedContributionCheckbox) {
        const isChecked = showDefinedContributionCheckbox.checked;
        saveToLocalStorage('showDefinedContributionPension', isChecked);
    }

    const showDefinedBenefitCheckbox = document.getElementById('showDefinedBenefitPension');
    if (showDefinedBenefitCheckbox) {
        const isChecked = showDefinedBenefitCheckbox.checked;
        saveToLocalStorage('showDefinedBenefitPension', isChecked);
    }

    const showISASavingsCheckbox = document.getElementById('showISASavings');
    if (showISASavingsCheckbox) {
        const isChecked = showISASavingsCheckbox.checked;
        saveToLocalStorage('showISASavings', isChecked);
    }

    const frequencySliderPhone = document.getElementById('frequencySliderPhone');
    if (frequencySliderPhone) {
        const isChecked = frequencySliderPhone.checked;
        saveToLocalStorage('annualValues', isChecked);
    }

    const applyInflationAdjustmentPhone = document.getElementById('applyInflationAdjustmentPhone');
    if (applyInflationAdjustmentPhone) {
        const isChecked = applyInflationAdjustmentPhone.checked;
        saveToLocalStorage('applyInflationAdjustment', isChecked);
    }

    const planAsCoupleSwitch = document.getElementById('planAsCouple');
    if (planAsCoupleSwitch) {
        localStorage.setItem('planAsCouple', planAsCoupleSwitch.checked);
    } else {
        console.warn('planAsCouple element is missing.');
    }
}

// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('input');

document.addEventListener('DOMContentLoaded', function() {
    
    const showDefinedContributionCheckbox = document.getElementById('showDefinedContributionPension');
    if (showDefinedContributionCheckbox) {
        showDefinedContributionCheckbox.addEventListener('change', function() {
            saveToLocalStorage('showDefinedContributionPension', this.checked);
            saveAndCalc(); // Trigger calculation if needed
        });
    }

    const showDefinedBenefitCheckbox = document.getElementById('showDefinedBenefitPension');
    if (showDefinedBenefitCheckbox) {
        showDefinedBenefitCheckbox.addEventListener('change', function() {
            saveToLocalStorage('showDefinedBenefitPension', this.checked);
            saveAndCalc(); // Trigger calculation if needed
        });
    }

    const showISASavingsCheckbox = document.getElementById('showISASavings');
    if (showISASavingsCheckbox) {
        showISASavingsCheckbox.addEventListener('change', function() {
            saveToLocalStorage('showISASavings', this.checked);
            saveAndCalc(); // Trigger calculation if needed
        });
    }

    
    initialiseInitialInputsAndCheckboxesPhone();
    //revealAccordionSections();
    toggleRightColumn();
    initialiseLocalStorageValues();
    
    saveAndCalc();
});

/* document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        //input.addEventListener('input', saveAndCalc);
    });
}); */

function saveToLocalStorage(key, value) {
    // Store the value in localStorage, converting booleans for checkboxes
    localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
}

function initialiseInitialInputsAndCheckboxesPhone() {
    // Process each input separately
    function initialiseInputAndSlider(inputId, localStorageKey, sliderId, formatType) {
        const inputElement = document.getElementById(inputId);
        const sliderElement = document.getElementById(sliderId);
        const value = localStorage.getItem(localStorageKey) || inputElement?.value || '0';

        if (inputElement) {
            inputElement.value = value;
            inputElement.textContent = formatNumber(value, formatType);
        }

        if (sliderElement) {
            sliderElement.value = value;
        }
    }

    // Monetary values
    initialiseInputAndSlider('inputMonthlyContributionPhone', 'monthlyContribution', 'monthlyPensionContributionsSlider', 'currency');
    initialiseInputAndSlider('inputMonthlyISAContributionPhone', 'monthlyISAContribution', 'monthlyISADepositsSlider', 'currency');
    initialiseInputAndSlider('inputDesiredIncomePhone', 'desiredIncome', 'desiredIncomeSlider', 'currency');
    initialiseInputAndSlider('currentFundPhone', 'currentFund', 'currentFundSlider', 'currency');
    initialiseInputAndSlider('currentISAPhone', 'currentISA', 'currentISASlider', 'currency');
    initialiseInputAndSlider('dbPensionAmountPhone', 'dbPensionAmount', 'annualPensionSlider', 'currency');
    initialiseInputAndSlider('minimumISABalancePhone', 'minISABalance', 'minimumISABalanceSlider', 'currency');
    initialiseInputAndSlider('finalFundTargetPhone', 'finalFund', 'finalFundTargetSlider', 'currency');
    initialiseInputAndSlider('additionalContributionPhone', 'stepUpContribution', 'additionalContributionSlider', 'currency');

    // Percentage values
    initialiseInputAndSlider('inputTaxFreeCashPercentPhone', 'taxFreeCashPercent', 'taxFreeCashSlider', 'percentage');
    initialiseInputAndSlider('fundGrowthPercentPhone', 'fundGrowthPre', 'fundGrowthSlider', 'percentage');
    initialiseInputAndSlider('fundGrowthPostPercentPhone', 'fundGrowthPost', 'fundGrowthPostSlider', 'percentage');
    initialiseInputAndSlider('inflationPercentPhone', 'inflation', 'inflationSlider', 'percentage');
    initialiseInputAndSlider('fundChargesPercentPhone', 'fundCharges', 'fundChargesSlider', 'percentage');
    initialiseInputAndSlider('marketCrashPercentPhone', 'marketCrashPercent', 'marketCrashPercentSlider', 'percentage');
    initialiseInputAndSlider('isaPriorityPhone', 'isaPriority', 'isaPrioritySlider', 'percentage');

    // Age and other numeric values
    initialiseInputAndSlider('currentAgePhone', 'currentAge', 'currentAgeSlider');
    initialiseInputAndSlider('dbPensionAgePhone', 'dbPensionAge', 'pensionPayableAgeSlider');
    initialiseInputAndSlider('endAgePhone', 'endAge', 'endAgeSlider');
    initialiseInputAndSlider('marketCrashAgePhone', 'marketCrashAge', 'marketCrashAgeSlider');
    initialiseInputAndSlider('contributionIncreaseAgePhone', 'stepUpAge', 'contributionIncreaseAgeSlider');

    // Set checkboxes
    const useScottishTaxPhone = document.getElementById('useScottishTaxPhone');
    if (useScottishTaxPhone) {
        useScottishTaxPhone.checked = localStorage.getItem('useScottishTax') === 'true';
    } else {
        console.warn('useScottishTaxPhone element is missing.');
    }

    const showDefinedContributionCheckbox = document.getElementById('showDefinedContributionPension');
    if (showDefinedContributionCheckbox) {
        showDefinedContributionCheckbox.checked = localStorage.getItem('showDefinedContributionPension') === 'true';
    }

    const showDefinedBenefitCheckbox = document.getElementById('showDefinedBenefitPension');
    if (showDefinedBenefitCheckbox) {
        showDefinedBenefitCheckbox.checked = localStorage.getItem('showDefinedBenefitPension') === 'true';
    }

    const showISASavingsCheckbox = document.getElementById('showISASavings');
    if (showISASavingsCheckbox) {
        showISASavingsCheckbox.checked = localStorage.getItem('showISASavings') === 'true';
    }

    const frequencySliderPhone = document.getElementById('frequencySliderPhone');
    if (frequencySliderPhone) {
        frequencySliderPhone.checked = localStorage.getItem('annualValues') === 'true';
    } else {
        console.warn('frequencySliderPhone element is missing.');
    }

    const applyInflationAdjustmentPhone = document.getElementById('applyInflationAdjustmentPhone');
    if (applyInflationAdjustmentPhone) {
        applyInflationAdjustmentPhone.checked = localStorage.getItem('applyInflationAdjustment') === 'true';
    } else {
        console.warn('applyInflationAdjustmentPhone element is missing.');
    }

    const planAsCoupleSwitch = document.getElementById('planAsCouple');
    if (planAsCoupleSwitch) {
        planAsCoupleSwitch.checked = localStorage.getItem('planAsCouple') === 'true';
    } else {
        console.warn('planAsCouple element is missing.');
    }
    
}

// Event listeners for radio buttons
document.querySelectorAll('input[name="togglePhone"]').forEach((input) => {
    input.addEventListener('change', (event) => {
        console.log('Selected:', event.target.value);
        // Add your logic here to handle the selected option
    });
});

document.querySelectorAll('input[name="togglePhone"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        updateRetirementLivingStandardsSelector(event);
        saveAndCalc();
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

// Updated formatNumber function
function formatNumber(value, formatType) {
    if (formatType === 'currency') {
        return new Intl.NumberFormat('en-GB', { 
            style: 'currency', 
            currency: 'GBP', 
            minimumFractionDigits: 0 
        }).format(value);
    } else if (formatType === 'percentage') {
        return value + '%';
    } else {
        return new Intl.NumberFormat('en-GB').format(value);
    }
}

// Function to update the output box value dynamically based on the slider's position
function updateOutput(outputId, value, formatType) {
    const outputElement = document.getElementById(outputId);
    if (outputElement) {
        outputElement.textContent = formatNumber(value, formatType);
        
        // saveAndCalc(); // Uncomment if needed
    }
}

// Function to retrieve raw values for calculations
function getRawValue(outputId) {
    const outputElement = document.getElementById(outputId);
    if (outputElement) {
        let text = outputElement.textContent;
        // Remove £, commas, and % symbols
        text = text.replace(/[£,%]/g, '').trim();
        return parseFloat(text) || 0;
    }
    return 0;
}

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
                // Update the output box with appropriate formatting
                if (outputId.endsWith('PercentPhone')) {
                    output.textContent = formatNumber(savedValue, 'percentage');
                } else if (sliderId === 'isaPrioritySlider') {
                    output.textContent = formatNumber(savedValue, 'percentage');
                } else if (outputId.endsWith('Phone')) {
                    output.textContent = formatNumber(savedValue, 'currency');
                } else {
                    output.textContent = savedValue;
                }
            }
        }
    });
}


function updateRetirementLivingStandardsSelector(event) {
    const selectedValue = event.target.value;
    console.log(`Selected: ${selectedValue}`);

    // Determine if planning as a couple
    const isPlanAsCouple = localStorage.getItem('planAsCouple') === "true";

    // Define income values based on the plan type
    let values;
    if (isPlanAsCouple) {
        values = {
            Minimum: parseInt(22400 / 12 / 10) * 10,
            Moderate: parseInt(43100 / 12 / 10) * 10,
            Comfortable: parseInt(59000 / 12 / 10) * 10,
        };
    } else {
        values = {
            Minimum: parseInt(14400 / 12 / 10) * 10,
            Moderate: parseInt(31300 / 12 / 10) * 10,
            Comfortable: parseInt(43100 / 12 / 10) * 10,
        };
    }

    // Retrieve the slider and output elements
    const slider = document.getElementById("desiredIncomeSlider");
    const targetOutput = isPlanAsCouple
        ? document.getElementById("inputDesiredCombinedIncomePhone")
        : document.getElementById("inputDesiredIncomePhone");

    // Ensure the slider and output elements exist
    if (!slider || !targetOutput) {
        console.warn("Slider or output element is missing.");
        return;
    }

    // Update the slider and output field based on the selected value
    let newValue;
    switch (selectedValue) {
        case "Option 1":
            newValue = values.Minimum;
            break;
        case "Option 2":
            newValue = values.Moderate;
            break;
        case "Option 3":
            newValue = values.Comfortable;
            break;
        default:
            console.warn(`Unknown option selected: ${selectedValue}`);
            return;
    }

    // Update slider and output
    slider.value = newValue;
    targetOutput.value = newValue;
    targetOutput.textContent = formatNumber(newValue, 'currency');

    // Save the selected option and values
    localStorage.setItem('selectedRetirementIncomeStandardOption', selectedValue);
    saveInputsToLocalStoragePhone();
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
        stepUpAge: 55,
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
        isaPriority: 50, 
    };

    Object.keys(defaults).forEach((key) => {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) {
            const value = defaults[key];
            localStorage.setItem(key, typeof value === "boolean" ? value.toString() : value);
            console.log(`Default set for ${key}: ${value}`);
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
        isaPriority: 50, 
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

            // Then populate the input elements with the default values
            initialiseInitialInputsAndCheckboxesPhone();

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
    'fundGrowthSlider': 'fundGrowthPercentPhone',
    'inflationSlider': 'inflationPercentPhone',
    'fundChargesSlider': 'fundChargesPercentPhone',
    'endAgeSlider': 'endAgePhone',
    'fundGrowthPostSlider': 'fundGrowthPostPercentPhone',
    'marketCrashAgeSlider': 'marketCrashAgePhone',
    'marketCrashPercentSlider': 'marketCrashPercentPhone',
    'minimumISABalanceSlider': 'minimumISABalancePhone',
    'finalFundTargetSlider': 'finalFundTargetPhone',
    'contributionIncreaseAgeSlider': 'contributionIncreaseAgePhone',
    'additionalContributionSlider': 'additionalContributionPhone',
    'isaPrioritySlider': 'isaPriorityPhone',
};

// Example function to update outputs when sliders change
function setupSliderListeners() {
    const debounceDelay = 300; // Delay in milliseconds
    let debounceTimer; // Timer for debouncing

    Object.keys(sliderToOutputMap).forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const outputId = sliderToOutputMap[sliderId];

        if (slider) {
            slider.addEventListener('input', () => {
                const value = slider.value;
                let formatType = null;

                if (outputId.endsWith('PercentPhone')) {
                    formatType = 'percentage';
                } else if (sliderId === 'isaPrioritySlider') {
                    formatType = 'percentage';
                } else if (outputId.endsWith('Phone') && !outputId.includes('Age')) {
                    formatType = 'currency';
                }

                // Update the output immediately
                updateOutput(outputId, value, formatType);

                // Debounce saveAndCalc to avoid unnecessary processing
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    
                    saveAndCalc();
                }, debounceDelay);
            });
        }
    });
}


// Call the function to set up slider listeners
setupSliderListeners();



/* function toggleTable(element) {
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
  } */


    function toggleLeftColumn() {
        const leftColumn = document.getElementById('leftColumn');
        const mainColumn = document.getElementById('mainColumn');
        const leftButton = document.getElementById('leftButton');
        const leftButtonIcon = document.querySelector('#leftButton i'); 
        const leftToggleText = document.getElementById("leftToggleText");
    
        if (leftColumn.classList.contains('hidden-column')) {
            leftColumn.classList.remove('hidden-column');
            mainColumn.style.flex = '7';
            leftButtonIcon.classList.add('bi');
            leftButtonIcon.classList.add('bi-chevron-bar-left');
            leftButtonIcon.classList.remove('bi-chevron-bar-right'); 
            leftToggleText.textContent = "Hide";
        } else {
            leftColumn.classList.add('hidden-column');
            mainColumn.style.flex = '9.5'; // Expand the main column
            leftButtonIcon.classList.remove('bi-chevron-bar-left');
            leftButtonIcon.classList.add('bi-chevron-bar-right'); 
            leftToggleText.textContent = "Show Inputs";
        }
        toggleChartWidth();
        saveAndCalc();
    }
    
    
    function toggleRightColumn() {
        const rightColumn = document.getElementById('rightColumn');
        const mainColumn = document.getElementById('mainColumn');
        const rightButton = document.getElementById('rightButton');
        const rightButtonIcon = document.querySelector('#rightButton i'); 
        const rightToggleText = document.getElementById("rightToggleText");
    
        if (rightColumn.classList.contains('hidden-column')) {
            rightColumn.classList.remove('hidden-column');
            mainColumn.style.flex = '7';
            rightButtonIcon.classList.add('bi');
            rightButtonIcon.classList.add('bi-chevron-bar-right');
            rightButtonIcon.classList.remove('bi-chevron-bar-left'); 
            rightToggleText.textContent = "Hide";
        } else {
            rightColumn.classList.add('hidden-column');
            mainColumn.style.flex = '9.5'; // Expand the main column
            rightButtonIcon.classList.remove('bi-chevron-bar-right');
            rightButtonIcon.classList.add('bi-chevron-bar-left'); 
            rightToggleText.textContent = "Show Parameters";
        }
        toggleChartWidth();
        saveAndCalc();
    }
    


       
    function toggleChartWidth() {
        // List of chart container IDs
        const chartContainerIds = [
            'fundChartContainer',
            'incomeChartContainer',
            'taxChartContainer',
            'chargesChartContainer'
        ];
    
        // Iterate over each container and toggle the classes
        chartContainerIds.forEach((containerId) => {
            const container = document.getElementById(containerId);
            if (container) {
                if (container.classList.contains('width-85')) {
                    container.classList.remove('width-85');
                    container.classList.add('width-100');
                } else {
                    container.classList.remove('width-100');
                    container.classList.add('width-85');
                }
            }
        });
    }
    
    
    
    
    
    function revealAccordionSections() {
        // Check and reveal Defined Contribution section
        
        const definedContributionCheckbox = document.getElementById('showDefinedContributionPension');
        const definedBenefitCheckbox = document.getElementById('showDefinedBenefitPension');
        const isaCheckbox = document.getElementById('showISASavings');
      
        // Call toggle functions on page load
        toggleAccordion('definedContributionInputsAccordion', definedContributionCheckbox);
        toggleAccordion('definedBenefitInputsAccordion', definedBenefitCheckbox);
        toggleAccordion('ISAInputsAccordion', isaCheckbox);

    }


    function adjustOutputBox(outputBoxId, adjustment) {
        const outputBox = document.getElementById(outputBoxId);
    
        if (outputBox) {
            // Parse current value as an integer
            let currentValue = parseInt(outputBox.textContent.replace(/[^0-9.-]/g, ''), 10) || 0;
    
            // Add the adjustment
            currentValue += adjustment;
    
            // Ensure the value is non-negative (optional)
            if (currentValue < 0) currentValue = 0;
    
            // Update the output box value, formatted as currency
            outputBox.textContent = formatCurrency(currentValue);
    
            // Optional: Trigger calculation or any dependent logic
            saveAndCalc();
        }
    }
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0
        }).format(value);
    }

    

    function outputResults(cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge, fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome, maxAffordableNetIncome, shortfallAtRetirement, discountFactor, alreadyRetired, planAsCouple, phoneFormat, tabletFormat) {

        var taxFreeCashPercent = parseFloat(localStorage.getItem("taxFreeCashPercent"))/100 || 0.00;
        /* var inputTaxFreeCashPercentPartner = parseFloat(document.getElementById("inputTaxFreeCashPercentPartner").value)/100 || 0.00; */
        var fundGrowthPre = parseFloat(localStorage.getItem("fundGrowthPre")) / 100;
        var fundCharges = parseFloat(localStorage.getItem("fundCharges")) / 100;
    
        var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
        var desiredAnnualIncomeAtRetirement = desiredAnnualIncome / discountFactor;
    
        var annualValues =  localStorage.getItem('annualValues') === "true" ;
    
        if (annualValues) { 
            frequencyMultiplier = 12;
        } else {
            frequencyMultiplier = 1; // Default or alternative value if unchecked
        }
    
        var suffix = `at age ${retirementAge}`;
    
        if (phoneFormat) {
    
            
            var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";
            var prefix = "";
            var desiredIncomePrefix = "";
            if (applyInflationAdjustment) {
                desiredIncomePrefix = `Today\'s Money Value of ${prefix}`;
            } else {
                desiredIncomePrefix = `Future Value of ${prefix}`;
            }
            
            
            
                
    
            if (applyInflationAdjustment)  { /*todays money values*/
            
                var affordableIncome = Math.floor(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12);
                var incomeRequired = Math.round(frequencyMultiplier * desiredAnnualIncome/12);
    
                document.getElementById("taxFreeCashTakenTodaysMoneyPhone").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken*discountFactor)) + '</strong>';
    
                if (shortfallAtRetirement>0) {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Shortfall:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncome / 12 / 10) * 10 - Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome / 12 / 10) * 10) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "red";
                } else {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Surplus:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * -shortfallAtRetirement * discountFactor/12)) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "#2ab811";
                }
                document.getElementById("pensionFundAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement*discountFactor/10)*10) + '</strong>';
                document.getElementById("ISAHoldingsAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement*discountFactor/10)*10) + '</strong>';
               
    
                if (tabletFormat) {
                    plotIncomeChart(todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge);
                    plotTaxBreakdownChart(todaysMoneyCashFlowData,frequencyMultiplier, applyInflationAdjustment, prefix, phoneFormat, retirementAge);
                    plotChargesChart(todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, phoneFormat);
                    plotFundChart(todaysMoneyCashFlowData, phoneFormat);
                }
    
            }  else { /*not todays money values*/
    
                var affordableIncome = Math.floor(frequencyMultiplier * maxAffordableNetIncome/12);
                var incomeRequired = Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12);
    
                document.getElementById("taxFreeCashTakenTodaysMoneyPhone").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken)) + '</strong>';
    
                if (shortfallAtRetirement>0) {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Shortfall:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * shortfallAtRetirement/12)) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "red";
                } else {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Surplus :`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * (maxAffordableNetIncome/12-desiredAnnualIncomeAtRetirement/12))) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "#2ab811";
                }
                document.getElementById("pensionFundAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement/10)*10) + '</strong>';
                document.getElementById("ISAHoldingsAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement/10)*10) + '</strong>';
                 
                if (tabletFormat) {
                    plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge);
                    plotTaxBreakdownChart(cashFlowData,frequencyMultiplier, applyInflationAdjustment, prefix, phoneFormat, retirementAge);
                    plotChargesChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, phoneFormat);
                    plotFundChart(cashFlowData, phoneFormat);
                }
    
            }
        
            
            document.getElementById("expectedTotalIncomeTodaysMoneyPhone").innerHTML = '<strong>£' + formatNumber(Math.round(affordableIncome/10)*10) + '</strong>';
            document.getElementById("desiredMonthlyIncomeAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(incomeRequired/10)*10) + '</strong>';
            
            displayCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge);
    
        } else {
    
            var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";
    
            var prefix = "";
            if (planAsCouple) {prefix = "Combined "};
        
            var desiredIncomePrefix = "";
            if (applyInflationAdjustment) {
                desiredIncomePrefix = `Today\'s Money Value of ${prefix}`;
            } else {
                desiredIncomePrefix = `Future Value of ${prefix}`;
            }
    
            //Hide TFC row if not needed
            var tbody = document.querySelector("#fundResultsTable tbody");
            if (tbody && tbody.children.length > 2) {
                var taxFreeCashRow3 = tbody.children[2]; // Third row (index 2)
    
                // Check if tax-free cash taken is zero
                if (taxFreeCashTaken === 0) {
                    taxFreeCashRow3.style.display = "none"; // Hide the row
                } else {
                    taxFreeCashRow3.style.display = ""; // Show the row (default display)
                }
    
            }
        
            
            if (alreadyRetired) {
                tbody.style.display = "none"; // Hide the entire table body
                document.getElementById("fundValuesTableTitle").classList.add("hidden");
                document.getElementById("incomeTableTitle").classList.add("hidden");
                document.getElementById("inputLowerGrowthDiv").classList.add("hidden");
                document.getElementById("adviceForLowerGrowthInRetirement").classList.add("hidden");
                document.getElementById("contributionIncreaseDiv").classList.add("hidden");
                
            }
            if (!planAsCouple) {
                var partnersFinalFundDiv = document.getElementById("partnersFinalFundDiv");
    
                if (partnersFinalFundDiv) {
                    // If the element exists, add the "hidden" class
                    partnersFinalFundDiv.classList.add("hidden");
                } 
            }
               
            
            document.getElementById("pensionFundAtRetirementText").innerText = `${prefix}Pension Fund at retirement age of ${retirementAge}`;
            document.getElementById("ISAHoldingsAtRetirementText").innerText = `${prefix}ISA Holdings at retirement age of ${retirementAge}`;
            
        
            if (applyInflationAdjustment)  { /*todays money values*/
                
                if (!alreadyRetired) {
                    document.getElementById("TFCTakenTodaysMoneyText").innerText = `${prefix}Tax Free Cash Taken at age ${retirementAge} : ${(taxFreeCashPercent * 100).toFixed(0)}% of £${(fundAtRetirement * discountFactor).toLocaleString("en-UK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                    document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken*discountFactor)) + '</strong>';
                }
                
                if (shortfallAtRetirement>0) {
                    document.getElementById("shortfallAtRetirementText").innerText = `Shortfall at Retirement = (b) - (a)`;
                    document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * shortfallAtRetirement * discountFactor/12)) + '</strong>';
                    document.getElementById("shortfallAtRetirement").style.color = "red";
                } else {
                    document.getElementById("shortfallAtRetirementText").innerText = `Surplus at Retirement = (a) - (b)`;
                    /* document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * (inflationAdjustedMaxAffordableNetIncome/12-desiredAnnualIncomeAtRetirement/12))) + '</strong>'; */
                    document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * -shortfallAtRetirement * discountFactor/12)) + '</strong>';
                    document.getElementById("shortfallAtRetirement").style.color = "#2ab811";
                }
                document.getElementById("pensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement*discountFactor)) + '</strong>';
                document.getElementById("ISAHoldingsAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement*discountFactor)) + '</strong>';
                document.getElementById("expectedTotalIncomeTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.floor(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12)) + '</strong>';
                document.getElementById("desiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncome/12)) + '</strong>';
                
                 // Plot charts and display table
                plotIncomeChart(todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, retirementAge);
                plotTaxBreakdownChart(todaysMoneyCashFlowData,frequencyMultiplier, applyInflationAdjustment, prefix, phoneFormat, retirementAge);
               
                
        
            }  else { /*not todays money values*/
                if (!alreadyRetired) {
                    document.getElementById("TFCTakenTodaysMoneyText").innerText = `${prefix}Tax Free Cash Taken at age ${retirementAge} : ${(taxFreeCashPercent * 100).toFixed(0)}% of £${(fundAtRetirement).toLocaleString("en-UK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                    document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken)) + '</strong>';
                }
                if (shortfallAtRetirement>0) {
                    document.getElementById("shortfallAtRetirementText").innerText = `Shortfall at Retirement = (b) - (a)`;
                    document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * shortfallAtRetirement/12)) + '</strong>';
                    document.getElementById("shortfallAtRetirement").style.color = "red";
                } else {
                    document.getElementById("shortfallAtRetirementText").innerText = `Surplus at Retirement = (a) - (b)`;
                    document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * (maxAffordableNetIncome/12-desiredAnnualIncomeAtRetirement/12))) + '</strong>';
                    document.getElementById("shortfallAtRetirement").style.color = "#2ab811";
                }
                document.getElementById("pensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement)) + '</strong>';
                document.getElementById("ISAHoldingsAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement)) + '</strong>';
                document.getElementById("expectedTotalIncomeTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.floor(frequencyMultiplier * maxAffordableNetIncome/12)) + '</strong>';
                document.getElementById("desiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12)) + '</strong>';
                
                 // Plot charts and display table
                plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, retirementAge);
                plotTaxBreakdownChart(cashFlowData,frequencyMultiplier, applyInflationAdjustment, prefix, phoneFormat, retirementAge);
               
                
            }
        
            plotFundChart(cashFlowData);
            document.getElementById("desiredMonthlyIncomeAtRetirementText").innerText = `${desiredIncomePrefix}Desired Retirement Income (b)`;
        
            if (alreadyRetired) {
                hideContributionInputs();
                document.getElementById("pensionFundAtRetirementText").innerText = `${prefix}Pension Fund(s) at age ${currentAge} with growth (after charges) of ${parseInt((fundGrowthPre - fundCharges) * 10000) / 100}%`;
                document.getElementById("pensionFundAtRetirementText").innerText = `You have already retired so the starting point for drawdown is your current pension fund of:`;
                document.getElementById("ISAHoldingsAtRetirementText").innerText = `And the starting point for your ISA is current holdings of:`;
                document.getElementById("desiredMonthlyIncomeAtRetirementText").innerText = `Your Specified Income Requirement (b):`;
                document.getElementById("pensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement)) + '</strong>';
                document.getElementById("ISAHoldingsAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement)) + '</strong>';
        
                var shortfallAtCurrentAge = getShortfallAtAge(cashFlowData,currentAge);
                var totalIncomeAtCurrentAge = getTotalIncomeAtAge(cashFlowData,currentAge); 
                if (planAsCouple) {
                    var desiredIncomeAtCurrentAge = parseFloat(localStorage.getItem("desiredCombinedIncome")) || 0.0;
                } else{
                    var desiredIncomeAtCurrentAge = parseFloat(localStorage.getItem("desiredIncome")) || 0.0;
                }
                       
                if (applyInflationAdjustment)  { 
                    shortfallAtCurrentAge = getShortfallAtAge(todaysMoneyCashFlowData,currentAge);
                    totalIncomeAtCurrentAge = getTotalIncomeAtAge(todaysMoneyCashFlowData,currentAge); 
                } 
                
                if (shortfallAtCurrentAge > 0) {
                    document.getElementById("shortfallAtRetirementText").innerText = `Current Shortfall = (b) - (a)`;
                    document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * shortfallAtCurrentAge/12)) + '</strong>';
                    document.getElementById("shortfallAtRetirement").style.color = "red";
                }   else {
                    document.getElementById("shortfallAtRetirementText").innerText = `Current Surplus = (a) - (b)`;
                    document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * (totalIncomeAtCurrentAge/12-desiredIncomeAtCurrentAge))) + '</strong>';
                    document.getElementById("shortfallAtRetirement").style.color = "#2ab811";
                }      
                document.getElementById("desiredMonthlyIncomeAtRetirementText").innerText = `Your Specified Income Requirement (b)`;
        
                /* 
                document.getElementById("expectedTotalIncomeTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * totalIncomeAtCurrentAge/12)) + '</strong>';
                document.getElementById("desiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredIncomeAtCurrentAge)) + '</strong>';
             */
            }
    
            if (planAsCouple) {
                displayCashFlowTables (combinedCashFlowData, combinedTodaysMoneyCashFlowData, simulation1.retirementAge);
                displayYourCashFlowTables (simulation1.cashFlowData, simulation1.todaysMoneyCashFlowData, simulation2.retirementAge);
                displayYourPartnersCashFlowTables (simulation2.cashFlowData, simulation2.todaysMoneyCashFlowData, retirementAge) ;
                plotCouplesFundChart(simulation1.cashFlowData, simulation2.cashFlowData);
            } else {
                displayCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge);
            }
        }
    
    
    }
    
    function resetTableRows(tbody) {
        const desiredRowCount = 3;
    
        // Remove extra rows if there are more than 3
        while (tbody.children.length > desiredRowCount) {
            tbody.removeChild(tbody.lastElementChild);
        }
    
        // Add placeholder rows if there are fewer than 3
        while (tbody.children.length < desiredRowCount) {
            const newRow = document.createElement("tr");
            const newCell = document.createElement("td");
            newCell.colSpan = 2; // Adjust based on the table structure
            newCell.textContent = "Placeholder";
            newRow.appendChild(newCell);
            tbody.appendChild(newRow);
        }
    }
    
    function displayCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge) {
        var applyInflationAdjustment = document.getElementById("applyInflationAdjustmentPhone").checked;
        var retirementIncomeTableBody = document.getElementById('retirementIncomeTable').getElementsByTagName('tbody')[0];
        var pensionFundCashFlowTableBody = document.getElementById('pensionFundCashFlowTable').getElementsByTagName('tbody')[0];
        var ISACashFlowTableBody = document.getElementById('ISACashFlowTable').getElementsByTagName('tbody')[0];
    
        if (applyInflationAdjustment) {
            displayRetirementIncomeCashFlowTable(todaysMoneyCashFlowData, retirementAge, retirementIncomeTableBody);
            displayPensionFundCashFlowTable(todaysMoneyCashFlowData,pensionFundCashFlowTableBody);
            displayISACashFlowTable(todaysMoneyCashFlowData, ISACashFlowTableBody);
        } else {
            displayRetirementIncomeCashFlowTable(cashFlowData, retirementAge, retirementIncomeTableBody);
            displayPensionFundCashFlowTable(cashFlowData,pensionFundCashFlowTableBody);
            displayISACashFlowTable(cashFlowData, ISACashFlowTableBody);
        }
    
        /* document.getElementById("cashFlowTableContainer").classList.remove("hidden"); */
       /*  document.getElementById("pensionFundCashFlowTableContainer").classList.remove("hidden");
        document.getElementById("ISACashFlowTableContainer").classList.remove("hidden");
        document.getElementById("retirementIncomeTableContainer").classList.remove("hidden");
     */
    }
    
    function displayYourCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge) {
        
            var applyInflationAdjustment = document.getElementById("applyInflationAdjustment").checked;
            var retirementIncomeTableYourBody = document.getElementById('retirementIncomeTableContainerYour').getElementsByTagName('tbody')[0];
            var pensionFundCashFlowTableYourBody = document.getElementById('pensionFundCashFlowTableContainerYour').getElementsByTagName('tbody')[0];
            var ISACashFlowTableYourBody = document.getElementById('ISACashFlowTableContainerYour').getElementsByTagName('tbody')[0];
    
            if (applyInflationAdjustment) {
                displayRetirementIncomeCashFlowTable(todaysMoneyCashFlowData, retirementAge, retirementIncomeTableYourBody);
                displayPensionFundCashFlowTable(todaysMoneyCashFlowData,pensionFundCashFlowTableYourBody);
                displayISACashFlowTable(todaysMoneyCashFlowData, ISACashFlowTableYourBody);
            } else {
                displayRetirementIncomeCashFlowTable(cashFlowData, retirementAge, retirementIncomeTableYourBody);
                displayPensionFundCashFlowTable(cashFlowData,pensionFundCashFlowTableYourBody);
                displayISACashFlowTable(cashFlowData, ISACashFlowTableYourBody);
            }
    
            document.getElementById("pensionFundCashFlowTableContainerYour").classList.remove("hidden");
            document.getElementById("ISACashFlowTableContainerYour").classList.remove("hidden");
            document.getElementById("retirementIncomeTableContainerYour").classList.remove("hidden");
    
    }
    
    function displayYourPartnersCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge) {
        
        var applyInflationAdjustment = document.getElementById("applyInflationAdjustment").checked;
        var retirementIncomeTableYourPartnerBody = document.getElementById('retirementIncomeTableContainerYourPartner').getElementsByTagName('tbody')[0];
        var pensionFundCashFlowTableYourPartnerBody = document.getElementById('pensionFundCashFlowTableContainerYourPartner').getElementsByTagName('tbody')[0];
        var ISACashFlowTableYourPartnerBody = document.getElementById('ISACashFlowTableContainerYourPartner').getElementsByTagName('tbody')[0];
    
        if (applyInflationAdjustment) {
            displayRetirementIncomeCashFlowTable(todaysMoneyCashFlowData, retirementAge, retirementIncomeTableYourPartnerBody);
            displayPensionFundCashFlowTable(todaysMoneyCashFlowData,pensionFundCashFlowTableYourPartnerBody);
            displayISACashFlowTable(todaysMoneyCashFlowData, ISACashFlowTableYourPartnerBody);
        } else {
            displayRetirementIncomeCashFlowTable(cashFlowData, retirementAge, retirementIncomeTableYourPartnerBody);
            displayPensionFundCashFlowTable(cashFlowData,pensionFundCashFlowTableYourPartnerBody);
            displayISACashFlowTable(cashFlowData, ISACashFlowTableYourPartnerBody);
        }
    
        document.getElementById("pensionFundCashFlowTableContainerYourPartner").classList.remove("hidden");
        document.getElementById("ISACashFlowTableContainerYourPartner").classList.remove("hidden");
        document.getElementById("retirementIncomeTableContainerYourPartner").classList.remove("hidden");
    
    }


    function plotFundChart(cashFlowData, phoneFormat) {
        if (phoneFormat) {
            var ctx = document.getElementById('fundChartTablet').getContext('2d');
        } else {
            var ctx = document.getElementById('fundChart').getContext('2d');
        }
    
        // Extract data from cashFlowData
        var ages = cashFlowData.map(data => data.age);
        var pensionFundValues = cashFlowData.map(data => Math.round(data.closingBalance));
        var isaHoldings = cashFlowData.map(data => Math.round(data.ISAholdings));
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
        // Destroy existing chart instance if it exists to avoid duplication
        if (window.myLineChart) {
            window.myLineChart.destroy();
        }
    
        // Format numbers for the y-axis and tooltips
        function formatNumber(value) {
            if (value >= 1000000) {
                return (value / 1000000).toFixed(2) + 'm'; // Convert to £m
            } else if (value >= 100000) {
                return (value / 1000).toFixed(0) + 'k'; // Convert to £k
            }
            return value.toLocaleString(); // Default formatting for smaller values
        }
    
        // Calculate the step size dynamically
        function calculateStepSize(maxValue) {
            if (maxValue <= 250000) return 25000; // £25k
            if (maxValue <= 750000) return 50000; // £50k
            if (maxValue <= 1500000) return 125000; // £125k
            if (maxValue <= 3000000) return 250000; // £250k
            return 500000; // Default larger step for very high values
        }
    
        // Determine the maximum value in the dataset
        var maxValue = Math.max(...pensionFundValues, ...isaHoldings);
        var stepSize = calculateStepSize(maxValue);
    
        // Prepare chart data
        var chartData = {
            labels: ages,
            datasets: [
                {
                    label: 'Pension Fund Value',
                    data: pensionFundValues,
                    borderColor: '#1E88E5', // Brighter blue for the line
                    backgroundColor: 'rgba(30, 136, 229, 0.2)', // Light blue with transparency
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'ISA Holdings',
                    data: isaHoldings,
                    borderColor: '#FF8C00', // Brighter orange for the line
                    backgroundColor: 'rgba(255, 140, 0, 0.2)', // Light orange 
                    fill: true,
                    tension: 0.1
                }
            ]
        };
    
        // Create the new chart
        window.myLineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Pension Fund Value and ISA Holdings',
                        font: {
                            size: headingFontSize,
                            family: 'Arial'
                        },
                        padding: {
                            top: 5,
                            bottom: 5
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '£' + formatNumber(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Age'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: ''
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize, // Use the calculated step size
                            maxTicksLimit: 8, // Limit the number of ticks to 8
                            callback: function(value, index, ticks) {
                                return '£' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    
    
    
    function plotChargesChart(
        cashFlowData, 
        frequencyMultiplier, 
        applyInflationAdjustment, 
        prefix, 
        phoneFormat
    ) {
        // Determine the appropriate canvas context based on phoneFormat
        var ctx = phoneFormat 
            ? document.getElementById('chargesChartTablet').getContext('2d') 
            : document.getElementById('chargesChart').getContext('2d');
    
        // Extract data for the chart from the entire cashFlowData
        var ages = cashFlowData.map(data => data.age);
        var fundCharges = cashFlowData.map(data => Math.round(frequencyMultiplier * data.fundCharges / 12));
        var isaCharges = cashFlowData.map(data => Math.round(frequencyMultiplier * data.isaCharges / 12));
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
    
        // Heading for the chart
        var headingPrefix = `${prefix}Monthly`;
        if (frequencyMultiplier === 12) {
            headingPrefix = `${prefix}Annual`;
        }
    
        var headingSuffix = applyInflationAdjustment ? " (In Today's Money)" : " (Projected Future Values)";
        var heading = `${headingPrefix} Charges Breakdown${headingSuffix}`;
    
        // Destroy the existing chart instance if it exists to avoid duplication
        if (window.myChargesChart) {
            window.myChargesChart.destroy();
        }
    
        // Determine the maximum value in the dataset for dynamic step sizing
        var allChargesData = [...fundCharges, ...isaCharges];
        var maxValue = Math.max(...allChargesData);
        var stepSize = calculateStepSizeCharges(maxValue); // Renamed function with updated logic
    
        // Create the new chart using Chart.js
        window.myChargesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ages,
                datasets: [
                    {
                        label: 'Pension Fund Charges',
                        data: fundCharges,
                        backgroundColor: '#2196F3' // Blue
                    },
                    {
                        label: 'ISA Charges',
                        data: isaCharges,
                        backgroundColor: '#FF9800' // Orange
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        stacked: true, // Charges are separate
                        title: {
                            display: true,
                            text: 'Age'
                        },
                        categoryPercentage: 1.0, // Increase from default (usually 0.8) if needed
                        barPercentage: 1.0, 
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: '' // Removed (£) symbol
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize, // Use the calculated step size
                            maxTicksLimit: 8, // Limit the number of ticks to 8 for clarity
                            callback: function(value, index, ticks) {
                                return '£' + formatNumber(value, 'k');
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: heading,
                        font: {
                            size: headingFontSize,
                            family: 'Arial'
                        },
                        padding: {
                            top: 5,
                            bottom: 5
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            // Display individual dataset values with £ and k
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '£' + formatNumber(context.parsed.y, 'k');
                                }
                                return label;
                            },
                            // Display the total amount in the footer with £ and k
                            footer: function(context) {
                                var total = context.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: £' + formatNumber(total, 'k');
                            }
                        }
                    }
                }
            }
        });
    
        /**
         * Formats a number based on the specified format type.
         * 
         * @param {number} value - The number to format.
         * @param {string} formatType - The type of formatting ('k', 'm', 'number').
         * @returns {string} - The formatted number as a string.
         */
        function formatNumber(value, formatType) {
            if (formatType === 'k') {
                if (value >= 10000) { // Only add 'k' for values >= £10,000
                    return (value / 1000).toFixed(0) + 'k'; // e.g., 25000 => 25k
                }
                return new Intl.NumberFormat('en-GB').format(value); // e.g., 5000 => 5,000
            } else if (formatType === 'm') {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(2) + 'm'; // e.g., 2500000 => 2.50m
                }
                return formatNumber(value, 'k');
            } else if (formatType === 'number') {
                return new Intl.NumberFormat('en-GB').format(value);
            } else {
                return value.toString();
            }
        }
    
        /**
         * Calculates an appropriate step size based on the maximum value.
         * Ensures that the chart has a reasonable number of ticks.
         * 
         * @param {number} maxValue - The maximum value in the dataset.
         * @returns {number} - The calculated step size.
         */
        function calculateStepSizeCharges(maxValue) {
            if (maxValue <= 10000) return 250; // New condition added: £500
            if (maxValue <= 25000) return 5000; // £5k
            if (maxValue <= 100000) return 10000; // £10k
            if (maxValue <= 250000) return 25000; // £25k
            if (maxValue <= 500000) return 50000; // £50k
            if (maxValue <= 1000000) return 100000; // £100k
            return 250000; // £250k for very high values
        }
    }
    
    
    
    
    function plotCouplesFundChart(cashFlowData1, cashFlowData2) {
        var ctx = document.getElementById('fundChart').getContext('2d');
    
        // Extract data from cashFlowData
        var ages = cashFlowData1.map(data => data.age);
        var pensionFundValues1 = cashFlowData1.map(data => Math.round(data.closingBalance));
        var isaHoldings1 = cashFlowData1.map(data => Math.round(data.ISAholdings));
        var pensionFundValues2 = cashFlowData2.map(data => Math.round(data.closingBalance));
        var isaHoldings2 = cashFlowData2.map(data => Math.round(data.ISAholdings));
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
        // Destroy existing chart instance if it exists to avoid duplication
        if (window.myLineChart) {
            window.myLineChart.destroy();
        }
    
        // Format numbers for the y-axis and tooltips
        function formatNumber(value) {
            if (value >= 1000000) {
                return (value / 1000000).toFixed(2) + 'm'; // Convert to £m
            } else if (value >= 100000) {
                return (value / 1000).toFixed(0) + 'k'; // Convert to £k
            }
            return value.toLocaleString(); // Default formatting for smaller values
        }
    
        // Calculate the step size dynamically
        function calculateStepSize(maxValue) {
            if (maxValue <= 250000) return 25000; // £25k
            if (maxValue <= 750000) return 50000; // £50k
            if (maxValue <= 1500000) return 125000; // £125k
            if (maxValue <= 3000000) return 250000; // £250k
            return 500000; // Default larger step for very high values
        }
    
        // Determine the maximum value in the dataset
        var maxValue = Math.max(
            ...pensionFundValues1, 
            ...isaHoldings1, 
            ...pensionFundValues2, 
            ...isaHoldings2
        );
        var stepSize = calculateStepSize(maxValue);
    
        // Prepare chart data
        var chartData = {
            labels: ages,
            datasets: [
                {
                    label: 'Your Pension Fund',
                    data: pensionFundValues1,
                    borderColor: '#1E88E5', // Brighter blue for the line
                    backgroundColor: 'rgba(30, 136, 229, 0.2)', // Light blue with transparency
                    fill: true,
                    tension: 0.1
                },
                {
                    label: 'Your ISA Holdings',
                    data: isaHoldings1,
                    borderColor: '#FF8C00', // Brighter orange for the line
                    backgroundColor: 'rgba(255, 140, 0, 0.2)', // Light orange with transparency
                    fill: true,
                    tension: 0.1
                },
                {
                    label: "Your Partner's Pension Fund",
                    data: pensionFundValues2,
                    borderColor: '#4CAF50', // Green for the line
                    backgroundColor: 'rgba(76, 175, 80, 0.2)', // Green with transparency
                    fill: true,
                    tension: 0.1
                },
                {
                    label: "Your Partner's ISA Holdings",
                    data: isaHoldings2,
                    borderColor: '#9C27B0', // Purple for the line
                    backgroundColor: 'rgba(156, 39, 176, 0.2)', // Purple with transparency
                    fill: true,
                    tension: 0.1
                }
            ]
        };
    
        // Create the new chart
        window.myLineChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true, // Enables the title
                        text: 'Pension Fund Value and ISA Holdings', // Your desired title text
                        font: {
                            size: headingFontSize, // Font size in pixels
                            family: 'Arial', // Font family
                        },
                        padding: {
                            top: 5,
                            bottom: 5
                        },
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '£' + formatNumber(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Age'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: ''
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize, // Use the calculated step size
                            maxTicksLimit: 8, // Limit the number of ticks to 8
                            callback: function(value, index, ticks) {
                                return '£' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }
    
    
    
    
    
    
    function plotIncomeChart(
        cashFlowData, 
        frequencyMultiplier, 
        applyInflationAdjustment, 
        prefix, 
        planAsCouple, 
        phoneFormat,
        retirementAge // New parameter added
    ) {
        // Validate retirementAge
        if (typeof retirementAge !== 'number') {
            console.error('retirementAge must be a number');
            return;
        }
    
        // Determine the appropriate canvas context based on phoneFormat
        var ctx = phoneFormat 
            ? document.getElementById('incomeChartTablet').getContext('2d') 
            : document.getElementById('incomeChart').getContext('2d');
    
        // Filter the cashFlowData based on retirementAge
        var retirementData = cashFlowData.filter(data => data.age >= retirementAge);
    
        // Check if there is data after filtering
        if (retirementData.length === 0) {
            console.warn(`No data available for retirement age ${retirementAge} or beyond.`);
            return;
        }
    
        // Extract data for the chart from the filtered retirementData
        var ages = retirementData.map(data => data.age);
        var netPensionWithdrawals = retirementData.map(data => Math.round(frequencyMultiplier * data.withdrawal / 12));
        var ISADrawings = retirementData.map(data => Math.round(frequencyMultiplier * data.ISADrawings / 12));
        var statePensions = retirementData.map(data => Math.round(frequencyMultiplier * data.statePension / 12));
        var dbPensions = retirementData.map(data => Math.round(frequencyMultiplier * data.dbPension / 12));
        var shortfall = retirementData.map(data => Math.round(frequencyMultiplier * Math.max(0, data.shortfall) / 12));
    
        // Determine x-axis label based on planAsCouple
        var xLabel = planAsCouple ? 'Your Age' : 'Age';
    
        // Construct the chart heading
        var headingPrefix = `${prefix}Monthly `;
        if (frequencyMultiplier === 12) {
            headingPrefix = `${prefix}Annual `;
        }
        var headingSuffix = applyInflationAdjustment ? " In Today's Money" : " (Projected Future Values)";
        var heading = `${headingPrefix}Retirement Income${headingSuffix}`;
    
        // Adjust heading to include retirement age
        heading += ` from Age ${retirementAge}`;
    
        // Determine heading font size based on window width
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
        // Destroy existing chart instance if it exists to avoid duplication
        if (window.myIncomeChart) {
            window.myIncomeChart.destroy();
        }
    
        // Determine the maximum value in the dataset for dynamic step sizing
        var allIncomeData = [...statePensions, ...dbPensions, ...netPensionWithdrawals, ...ISADrawings, ...shortfall];
        var maxValue = Math.max(...allIncomeData);
        var stepSize = calculateStepSizeIncome(maxValue); // Renamed function
    
        // Create the new chart using Chart.js
        window.myIncomeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ages,
                datasets: [
                    {
                        label: 'State Pension',
                        data: statePensions,
                        backgroundColor: '#4CAF50' // Green
                    },
                    {
                        label: 'Defined Benefit Pension',
                        data: dbPensions,
                        backgroundColor: '#9C27B0' // Purple
                    },
                    {
                        label: 'Pension Withdrawals',
                        data: netPensionWithdrawals,
                        backgroundColor: '#2196F3' // Blue
                    },
                    {
                        label: 'ISA Withdrawals',
                        data: ISADrawings,
                        backgroundColor: '#FF9800' // Orange
                    },
                    {
                        label: 'Shortfall',
                        data: shortfall,
                        backgroundColor: '#FF0000' // Red
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: xLabel
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: '' // Removed (£) symbol
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize, // Use the calculated step size
                            maxTicksLimit: 8, // Limit the number of ticks to 8 for clarity
                            callback: function(value, index, ticks) {
                                return '£' + formatNumber(value, 'k');
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: heading,
                        font: {
                            size: headingFontSize,
                            family: 'Arial',
                        },
                        padding: {
                            top: 5,
                            bottom: 5
                        },
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            // Display individual dataset values with £ and k
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '£' + formatNumber(context.parsed.y, 'k');
                                }
                                return label;
                            },
                            // Display the total amount in the footer with £ and k
                            footer: function(context) {
                                var total = context.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: £' + formatNumber(total, 'k');
                            }
                        }
                    }
                }
            }
        });
    
       
        function formatNumber(value, formatType) {
            if (formatType === 'k') {
                if (value >= 10000) { // Only add 'k' for values >= £10,000
                    return (value / 1000).toFixed(0) + 'k'; // e.g., 25000 => 25.0k
                }
                return new Intl.NumberFormat('en-GB').format(value); // e.g., 5000 => 5,000
            } else if (formatType === 'm') {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(2) + 'm'; // e.g., 2500000 => 2.50m
                }
                return formatNumber(value, 'k');
            } else if (formatType === 'number') {
                return new Intl.NumberFormat('en-GB').format(value);
            } else {
                return value.toString();
            }
        }
    
       
        function calculateStepSizeIncome(maxValue) {
            if (maxValue <= 10000) return 500; // £5k
            if (maxValue <= 25000) return 5000; // £5k
            if (maxValue <= 100000) return 10000; // £10k
            if (maxValue <= 250000) return 25000; // £25k
            if (maxValue <= 500000) return 50000; // £50k
            if (maxValue <= 1000000) return 100000; // £100k
            return 250000; // £250k for very high values
        }
    }
    
    
    
    /* function formatNumber(value, formatType) {
        if (formatType === 'currency') {
            return new Intl.NumberFormat('en-GB', { 
                style: 'currency', 
                currency: 'GBP', 
                minimumFractionDigits: 0 
            }).format(value);
        } else if (formatType === 'percentage') {
            return value + '%';
        } else if (formatType === 'number') {
            return new Intl.NumberFormat('en-GB').format(value);
        } else {
            return value;
        }
    } */
    
    
    
    
    function plotTaxBreakdownChart(
        cashFlowData, 
        frequencyMultiplier, 
        applyInflationAdjustment, 
        prefix, 
        phoneFormat,
        retirementAge // New parameter added
    ) {
        // Validate retirementAge
        if (typeof retirementAge !== 'number') {
            console.error('retirementAge must be a number');
            return;
        }
    
        // Determine the appropriate canvas context based on phoneFormat
        var ctx = phoneFormat 
            ? document.getElementById('taxChartTablet').getContext('2d') 
            : document.getElementById('taxChart').getContext('2d');
    
        // Filter the cashFlowData based on retirementAge
        var retirementData = cashFlowData.filter(data => data.age >= retirementAge);
    
        // Check if there is data after filtering
        if (retirementData.length === 0) {
            console.warn(`No tax data available for retirement age ${retirementAge} or beyond.`);
            return;
        }
    
        // Extract data for the chart from the filtered retirementData
        var ages = retirementData.map(data => data.age);
        var statePensionTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.statePensionTax / 12));
        var dbPensionTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.dbPensionTax / 12));
        var pensionWithdrawalTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.taxPaid / 12));
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
        // Adjust data based on inflation if necessary
        if (applyInflationAdjustment) {
            // If inflation adjustment affects tax calculations, adjust here.
            // Currently, the same calculations are applied, but this block is reserved for future adjustments.
            statePensionTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.statePensionTax / 12));
            dbPensionTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.dbPensionTax / 12));
            pensionWithdrawalTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.taxPaid / 12));
        }
    
        // Heading for the chart
        var headingSuffix = " (Projected Future Values)";
        if (applyInflationAdjustment) {
            headingSuffix = " (In Today's Money)";
        }
        var heading = `${prefix} Tax Breakdown${headingSuffix}`;
    
        // Append retirement age to the heading for clarity
        heading += ` from Age ${retirementAge}`;
    
        // Destroy the existing chart instance if it exists to avoid duplication
        if (window.myTaxChart) {
            window.myTaxChart.destroy();
        }
    
        // Determine the maximum value in the dataset for dynamic step sizing
        var allTaxData = [...statePensionTaxes, ...dbPensionTaxes, ...pensionWithdrawalTaxes];
        var maxValue = Math.max(...allTaxData);
        var stepSize = calculateStepSizeTax(maxValue); // Renamed function
    
        // Create the new chart using Chart.js
        window.myTaxChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ages,
                datasets: [
                    {
                        label: 'State Pension Tax',
                        data: statePensionTaxes,
                        backgroundColor: '#4CAF50' // Green
                    },
                    {
                        label: 'Defined Benefit Pension Tax',
                        data: dbPensionTaxes,
                        backgroundColor: '#9C27B0' // Purple
                    },
                    {
                        label: 'Pension Withdrawal Tax',
                        data: pensionWithdrawalTaxes,
                        backgroundColor: '#2196F3' // Blue
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Age'
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: '' // Removed (£) symbol
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize, // Use the calculated step size
                            maxTicksLimit: 8, // Limit the number of ticks to 8 for clarity
                            callback: function(value, index, ticks) {
                                return '£' + formatNumber(value, 'k');
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: heading,
                        font: {
                            size: headingFontSize,
                            family: 'Arial'
                        },
                        padding: {
                            top: 5,
                            bottom: 5
                        },
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            // Display individual dataset values with £ and k
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '£' + formatNumber(context.parsed.y, 'k');
                                }
                                return label;
                            },
                            // Display the total amount in the footer with £ and k
                            footer: function(context) {
                                var total = context.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: £' + formatNumber(total, 'k');
                            }
                        }
                    }
                }
            }
        });
    
      
        function formatNumber(value, formatType) {
            if (formatType === 'k') {
                if (value >= 10000) { // Only add 'k' for values >= £10,000
                    return (value / 1000).toFixed(0) + 'k'; // e.g., 25000 => 25.0k
                }
                return new Intl.NumberFormat('en-GB').format(value); // e.g., 5000 => 5,000
            } else if (formatType === 'm') {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(2) + 'm'; // e.g., 2500000 => 2.50m
                }
                return formatNumber(value, 'k');
            } else if (formatType === 'number') {
                return new Intl.NumberFormat('en-GB').format(value);
            } else {
                return value.toString();
            }
        }
    
      
        function calculateStepSizeTax(maxValue) {
            if (maxValue <= 10000) return 500; // £5k
            if (maxValue <= 25000) return 5000; // £5k
            if (maxValue <= 100000) return 10000; // £10k
            if (maxValue <= 250000) return 25000; // £25k
            if (maxValue <= 500000) return 50000; // £50k
            if (maxValue <= 1000000) return 100000; // £100k
            return 250000; // £250k for very high values
        }
    }
    
    
    
    function updateChartVisibility() {
        // Get the selected value from the dropdown
        const selectedChart = document.getElementById("chartSelector").value;
    
        // Chart containers
        const fundChartContainer = document.getElementById("fundChartContainer");
        const incomeChartContainer = document.getElementById("incomeChartContainer");
        const taxChartContainer = document.getElementById("taxChartContainer");
        const chargesChartContainer = document.getElementById("chargesChartContainer");
        
        
        // Hide all charts
        fundChartContainer.classList.add("hidden");
        incomeChartContainer.classList.add("hidden");
        taxChartContainer.classList.add("hidden");
        chargesChartContainer.classList.add("hidden");
    
    
        // Show the selected chart
        if (selectedChart === "fund") {
            applyInflationAdjustmentPhone.checked = false;
            fundChartContainer.classList.remove("hidden");
        } else if (selectedChart === "income") {
            applyInflationAdjustmentPhone.checked = true;
            incomeChartContainer.classList.remove("hidden");
        } else if (selectedChart === "tax") {
            applyInflationAdjustmentPhone.checked = true;
            taxChartContainer.classList.remove("hidden");
        } else if (selectedChart === "charges") {
            applyInflationAdjustmentPhone.checked = true;
            chargesChartContainer.classList.remove("hidden");
        }
    
        saveAndCalc();
    }
    
    
    function updateTableVisibility() {
        // Get the selected value from the dropdown
        const selectedTable = document.getElementById("tableSelector").value;
    
        // Chart containers
        const retirementIncomeContainer = document.getElementById("retirementIncomeTableContainer");
        const pensionFundCashflowContainer = document.getElementById("pensionFundCashFlowTableContainer");
        const ISACashflowContainer = document.getElementById("ISACashFlowTableContainer");
        
        // Hide all charts
        retirementIncomeContainer.classList.add("hidden");
        retirementIncomeContainer.classList.remove("visible");
        pensionFundCashflowContainer.classList.add("hidden");
        pensionFundCashflowContainer.classList.remove("visible");
        ISACashflowContainer.classList.add("hidden");
        ISACashflowContainer.classList.remove("visible");
        
    
        // Show the selected chart
        if (selectedTable === "retirementIncome") {
            retirementIncomeContainer.classList.remove("hidden");
            retirementIncomeContainer.classList.add("visible");
            
        } else if (selectedTable === "pensionFundCashflow") {
            pensionFundCashflowContainer.classList.remove("hidden");
            pensionFundCashflowContainer.classList.add("visible");
            
        } else if (selectedTable === "ISACashflow") {
            ISACashflowContainer.classList.remove("hidden");
            ISACashflowContainer.classList.add("visible");
           
        } 
    
        saveAndCalc();
    }
    
    
    function calculateSharedYAxisMax(incomeData, taxData) {
        const incomeMax = Math.max(
            ...incomeData.netPensionWithdrawals,
            ...incomeData.ISADrawings,
            ...incomeData.statePensions,
            ...incomeData.dbPensions,
            ...incomeData.shortfall
        );
        const taxMax = Math.max(
            ...taxData.statePensionTaxes,
            ...taxData.dbPensionTaxes,
            ...taxData.pensionWithdrawalTaxes
        );
        return Math.ceil(Math.max(incomeMax, taxMax) / 1000) * 1000; // Round up to the nearest 1000
    }
    
    

function displayPensionFundCashFlowTable(cashFlowData, tableBody) {
    
    tableBody.innerHTML = ''; // Clear previous data

    cashFlowData.forEach(function (row) {
        var tr = document.createElement('tr');

         // 1. Age
         var tdAge = document.createElement('td');
         tdAge.textContent = row.age;
         tr.appendChild(tdAge);

        // 1. Opening Balance
        var tdOpeningBalance = document.createElement('td');
        tdOpeningBalance.textContent = '£' + formatNumber(Math.floor(row.openingBalance));
        tr.appendChild(tdOpeningBalance);

        // 2. Pension Contributions
        var tdContributions = document.createElement('td');
        tdContributions.textContent = '£' + formatNumber(Math.floor(row.contribution));
        tr.appendChild(tdContributions);

        // 3. Growth
        var tdGrowth = document.createElement('td');
        tdGrowth.textContent = '£' + formatNumber(Math.floor(row.investmentReturn || 0));
        tr.appendChild(tdGrowth);

        // 4. Charges
        var tdCharges = document.createElement('td');
        tdCharges.textContent = '£' + formatNumber(Math.floor(row.fundCharges || 0));
        tr.appendChild(tdCharges);

        // 5. Tax
        var tdTax = document.createElement('td');
        tdTax.textContent = '£' + formatNumber(Math.floor(row.taxPaid || 0));
        tr.appendChild(tdTax);

        // 6. Withdrawals
        var tdWithdrawals = document.createElement('td');
        tdWithdrawals.textContent = '£' + formatNumber(Math.floor(row.withdrawal || 0));
        tr.appendChild(tdWithdrawals);

        // 7. Closing Balance
        var tdClosingBalance = document.createElement('td');
        tdClosingBalance.textContent = '£' + formatNumber(Math.floor(row.closingBalance));
        tr.appendChild(tdClosingBalance);

        tableBody.appendChild(tr);
    });
}



function displayISACashFlowTable(cashFlowData, tableBody) {
    
    tableBody.innerHTML = ''; // Clear previous data

    cashFlowData.forEach(function (row) {
        var tr = document.createElement('tr');

        // 1. Age
        var tdAge = document.createElement('td');
        tdAge.textContent = row.age;
        tr.appendChild(tdAge);

        // 2. ISA Opening Balance
        var tdISAOpeningBalance = document.createElement('td');
        tdISAOpeningBalance.textContent = '£' + formatNumber(Math.floor(row.ISAOpeningBalance));
        tr.appendChild(tdISAOpeningBalance);

        // 3. ISA Contributions
        var tdISAContribution = document.createElement('td');
        tdISAContribution.textContent = '£' + formatNumber(Math.floor(row.ISAContribution));
        tr.appendChild(tdISAContribution);

        // 4. ISA Growth
        var tdISAGain = document.createElement('td');
        tdISAGain.textContent = '£' + formatNumber(Math.floor(row.ISAGain || 0));
        tr.appendChild(tdISAGain);

        // 5. ISA Charges
        var tdISACharges = document.createElement('td');
        tdISACharges.textContent = '£' + formatNumber(Math.floor(row.isaCharges || 0));
        tr.appendChild(tdISACharges);

        // 6. ISA Withdrawals
        var tdISADrawings = document.createElement('td');
        tdISADrawings.textContent = '£' + formatNumber(Math.floor(row.ISADrawings || 0));
        tr.appendChild(tdISADrawings);

        // 7. ISA Closing Balance
        var tdISAClosingBalance = document.createElement('td');
        tdISAClosingBalance.textContent = '£' + formatNumber(Math.floor(row.ISAholdings));
        tr.appendChild(tdISAClosingBalance);

        tableBody.appendChild(tr);
    });
}

function displayRetirementIncomeCashFlowTable(retirementIncomeData, retirementAge, tableBody) {
    
    tableBody.innerHTML = ''; // Clear previous data

    // Filter data to include only ages from retirementAge onwards
    var filteredData = retirementIncomeData.filter(row => row.age >= retirementAge);

    filteredData.forEach(function (row) {
        var tr = document.createElement('tr');

        // 1. Age
        var tdAge = document.createElement('td');
        tdAge.textContent = row.age;
        tr.appendChild(tdAge);

        // 2. State Pension
        var tdStatePension = document.createElement('td');
        tdStatePension.textContent = '£' + formatNumber(Math.floor(row.statePensionInPayment || 0));
        tr.appendChild(tdStatePension);

        // 4. DB Pension
        var tdDBPension = document.createElement('td');
        tdDBPension.textContent = '£' + formatNumber(Math.floor(row.dbPensionInPayment || 0));
        tr.appendChild(tdDBPension);

        // 6. Pension Fund Income
        var tdPensionFundIncome = document.createElement('td');
        tdPensionFundIncome.textContent = '£' + formatNumber(Math.floor(row.grossPensionWithdrawal || 0));
        tr.appendChild(tdPensionFundIncome);

         // 9. Total Taxable Income
         var totalGrossIncome = Math.floor(row.statePensionInPayment) + Math.floor(row.dbPensionInPayment) + Math.floor(row.grossPensionWithdrawal) ;
         var tdTotalGrossIncome = document.createElement('td');
         tdTotalGrossIncome.textContent = '£' + formatNumber(Math.floor(totalGrossIncome || 0));
         tr.appendChild(tdTotalGrossIncome);

        // 3. Tax on State Pension
        var tdTaxStatePension = document.createElement('td');
        tdTaxStatePension.textContent = '£' + formatNumber(Math.floor(row.statePensionTax || 0));
        tr.appendChild(tdTaxStatePension);

        // 5. Tax on DB Pension
        var tdTaxDBPension = document.createElement('td');
        tdTaxDBPension.textContent = '£' + formatNumber(Math.floor(row.dbPensionTax || 0));
        tr.appendChild(tdTaxDBPension);

        // 7. Tax on Pension Fund Income
        var tdTaxPensionFundIncome = document.createElement('td');
        tdTaxPensionFundIncome.textContent = '£' + formatNumber(Math.floor(row.taxPaid || 0));
        tr.appendChild(tdTaxPensionFundIncome);

        // 10. Total Tax Paid
        var totalTaxPaid = Math.floor(row.statePensionTax) + Math.floor(row.dbPensionTax) + Math.floor(row.taxPaid);
        var tdTotalTaxPaid = document.createElement('td');
        tdTotalTaxPaid.textContent = '£' + formatNumber(Math.floor(totalTaxPaid || 0));
        tr.appendChild(tdTotalTaxPaid);

        // 8. ISA Withdrawals
        var tdISAWithdrawals = document.createElement('td');
        tdISAWithdrawals.textContent = '£' + formatNumber(Math.floor(row.ISADrawings || 0));
        tr.appendChild(tdISAWithdrawals);

       // 11. Total Net Income
       var totalNetIncome = Math.floor(row.withdrawal) + Math.floor(row.statePension) + Math.floor(row.dbPension) + Math.floor(row.ISADrawings);
       var tdTotalNetIncome = document.createElement('td');
       tdTotalNetIncome.textContent = '£' + formatNumber(Math.floor(totalNetIncome));
       tr.appendChild(tdTotalNetIncome);

        tableBody.appendChild(tr);
    });
}
