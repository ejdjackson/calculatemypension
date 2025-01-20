// Function to save inputs and calculate
function saveAndCalc() {
    // First process the selected retirement income option
    /*  restoreSelectedRetirementIncomeStandardOption(); */
    // initialiseLocalStorageValues();
    saveInputsToLocalStoragePhone();
    calculateMyPension(false);
    
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
        localStorage.setItem('planAsCouple', false);
        /* localStorage.setItem('planAsCouple', planAsCoupleSwitch.checked); */
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

    initialiseLocalStorageValues();
    initialiseInitialInputsAndCheckboxesPhone();
    revealAccordionSections();
    toggleRightColumn();
    restoreSelectedRetirementIncomeStandardOption();
    
    
    saveAndCalc();
});



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
    initialiseInputAndSlider('inputRetirementAgePhone', 'retirementAge', 'retirementAgeSlider');

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

            // Create a mock event to update the slider
            const mockEvent = { target: toggleInput };
            updateRetirementLivingStandardsSelector(mockEvent);
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
    const isPlanAsCouple = false;
    /* const isPlanAsCouple = localStorage.getItem('planAsCouple') === "true"; */

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
            // Determine the format type based on the outputBoxId
            let formatType = null;
    
            if (outputBoxId.endsWith('PercentPhone')) {
                formatType = 'percentage';
            } else if (outputBoxId.endsWith('Phone') && !outputBoxId.includes('Age')) {
                formatType = 'currency';
            }
    
            // Parse the current value, removing £, %, and commas
            let currentValue = parseFloat(outputBox.textContent.replace(/[£,%]/g, '').replace(/,/g, '').trim()) || 0;
    
            // Add the adjustment
            currentValue += adjustment;
    
            // Round percentage values to the nearest 0.01%
            if (formatType === 'percentage') {
                currentValue = Math.round(currentValue * 100) / 100; // Round to 2 decimal places
            }
    
            // Ensure non-negative values for currency (optional)
            if (currentValue < 0 && formatType !== 'percentage') {
                currentValue = 0;
            }
    
            // Update the output box with the appropriate format
            outputBox.textContent = formatNumber(currentValue, formatType);
    
            // Trigger save and calculation logic
            saveAndCalc();
        }
    }
    
    

    

    function outputInputPageResults(
        cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge,
        fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome,
        maxAffordableNetIncome, shortfallAtRetirement, discountFactor,
        alreadyRetired, planAsCouple, 
        yourFundAtRetirement, yourISAAtRetirement, yourTaxFreeCashTaken,
        partnerFundAtRetirement, partnerISAAtRetirement, partnerTaxFreeCashTaken
    ) {
        var taxFreeCashPercent = parseFloat(localStorage.getItem("taxFreeCashPercent")) / 100 || 0.00;
        var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
        var desiredAnnualIncomeAtRetirement = desiredAnnualIncome / discountFactor;
        var endAge = parseInt(localStorage.getItem("endAge"));
        var statePensionAge = getStatePensionAge(currentAge);
        var annualValues = localStorage.getItem('annualValues') === "true";
        var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";

        var frequency = "monthly";
        var freq_capital = "Monthly";
        if(annualValues) {
            frequency = "annual";
            freq_capital = "Annual";
        }

        var inflationWarning = ""
        if (!applyInflationAdjustment) {
            var inflationWarning = "Note that this value is different from what you selected because it is the value at your retirement age, increased with inflation up to that point."
        }
        
    
        var frequencyMultiplier = annualValues ? 12 : 1;
        

        const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) ;
        const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;
        

        // Early retiral warning
        var earliestPensionWithdrawalAge = getEarliestPensionAge(currentAge);
        if (retirementAge < earliestPensionWithdrawalAge) {
            document.getElementById("earlyRetiralWarning").innerHTML = `Note that your selected retirement age is before the earliest age at which you can withdraw pension funds (${earliestPensionWithdrawalAge}). You must have sufficient ISA savings to fund your retirement income before your pension withdrawals can begin at age ${earliestPensionWithdrawalAge}.`;
        } else {
            document.getElementById("earlyRetiralWarning").innerHTML = ``;
        }

    
        // Main User Outputs
        document.getElementById("inputPensionFundAtRetirementLabel").innerHTML = `<strong>Value of Your Pension Fund at age ${retirementAge}</strong>`;
        document.getElementById("inputsPensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement / 10) * 10) + '</strong>';
    
        document.getElementById("inputISAAtRetirementLabel").innerHTML = `<strong>Value of Your ISA at age ${retirementAge}</strong>`;
        document.getElementById("inputsISAAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement / 10) * 10) + '</strong>';
    
       
        document.getElementById("resultsExplainer").innerHTML = `Based on your inputs and assumptions for fund growth and inflation, the <strong>${frequency}</strong> income that you can afford (after tax), starting from your retirement age of ${retirementAge} and calculated such that your funds will run out when you are aged ${endAge}, is:`;
        document.getElementById("inputsExpectedTotalIncomeLabel").innerHTML = `<strong>Affordable ${freq_capital} Income (a)</strong>`;
        document.getElementById("resultsExplainer2").innerHTML = `This can be compared to your desired retirement income that you selected above and a shortfall or surplus calculated. ${inflationWarning}`;
        document.getElementById("inputsDesiredMonthlyIncomeAtRetirementLabel").innerHTML = `<strong>Desired ${freq_capital} Income (b)</strong>`;

        

        
    }

    

    function outputResults(cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge, fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome, maxAffordableNetIncome, shortfallAtRetirement, discountFactor, alreadyRetired, planAsCouple, phoneFormat, tabletFormat, dontResizeChart, simulation2) {

        outputInputPageResults(cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge, fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome, maxAffordableNetIncome, shortfallAtRetirement, discountFactor, alreadyRetired, planAsCouple, phoneFormat, tabletFormat,0,0,0,0,0,0);

        var taxFreeCashPercent = parseFloat(localStorage.getItem("taxFreeCashPercent"))/100 || 0.00;
        /* var inputTaxFreeCashPercentPartner = parseFloat(document.getElementById("inputTaxFreeCashPercentPartner").value)/100 || 0.00; */
        //var fundGrowthPre = parseFloat(localStorage.getItem("fundGrowthPre")) / 100;
        //var fundCharges = parseFloat(localStorage.getItem("fundCharges")) / 100;
    
        var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
        var desiredAnnualIncomeAtRetirement = desiredAnnualIncome / discountFactor;
        var endAge = parseInt(localStorage.getItem("endAge"));
        var statePensionAge = getStatePensionAge(currentAge);

        var annualValues =  localStorage.getItem('annualValues') === "true" ;
    
        if (annualValues) { 
            frequencyMultiplier = 12;
        } else {
            frequencyMultiplier = 1; // Default or alternative value if unchecked
        }
    
        var suffix = `at age ${retirementAge}`;
        var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";
       
        if (applyInflationAdjustment)  { /*todays money values*/
                
            if (shortfallAtRetirement>0) {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Shortfall at Retirement = (b) - (a)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncome/12/10)*10 - Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12/10)*10) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "red";
            } else {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Surplus at Retirement = (a) - (b)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12/10)*10 - Math.round(frequencyMultiplier * desiredAnnualIncome/12/10)*10) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "#2ab811";
            }
            document.getElementById("inputsExpectedTotalIncome").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12/10)*10) + '</strong>';
            document.getElementById("inputsDesiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncome/12/10)*10) + '</strong>';
            
    
        }  else { /*not todays money values*/
            
            if (shortfallAtRetirement>0) {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Shortfall at Retirement = (b) - (a)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12/10)*10 - Math.round(frequencyMultiplier * maxAffordableNetIncome/12/10)*10) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "red";
            } else {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Surplus at Retirement = (a) - (b)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * maxAffordableNetIncome/12/10)*10 - Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12/10)*10) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "#2ab811";
            }
            document.getElementById("inputsExpectedTotalIncome").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * maxAffordableNetIncome/12/10)*10) + '</strong>';
            document.getElementById("inputsDesiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12/10)*10) + '</strong>';
           
            
        }
      
    }