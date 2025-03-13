// Function to save inputs and calculate
function saveAndCalc() {

    

    // First process the selected retirement income option
    /* restoreSelectedRetirementIncomeStandardOption(); */
    //initialiseLocalStorageValues();
    saveInputsToLocalStoragePhone();
    

    const planAsCouple =  (localStorage.getItem('planAsCouple') === 'true');
    calculateMyPension(planAsCouple);
    
}

window.cleanupInputs = function() {
    // Remove event listeners, timers, or any other side effects.
    console.log("Cleaning up inputs script...");
    // For example, if you set up event listeners:
    // document.removeEventListener('click', someClickHandler);
};

// Save input values from phone-specific elements to local storage
function saveInputsToLocalStoragePhone() {
    // Helper function to get raw value from formatted text
    function getRawValueFromText(text) {
        return text.replace(/[£,]/g, '').replace(/%/g, '').trim();
    }

    // List of input elements and their corresponding localStorage keys (User)
    const inputs = [
        { elementId: 'currentAgePhone', storageKey: 'currentAge' },
        { elementId: 'currentFundPhone', storageKey: 'currentFund' },
        { elementId: 'currentISAPhone', storageKey: 'currentISA' },
        { elementId: 'monthlyPensionContributionsPhone', storageKey: 'monthlyContribution' },
        { elementId: 'monthlyISADepositsPhone', storageKey: 'monthlyISAContribution' },
        { elementId: 'dbPensionAmountPhone', storageKey: 'dbPensionAmount' },
        { elementId: 'dbPensionAgePhone', storageKey: 'dbPensionAge' },
        { elementId: 'inputDesiredIncomePhone', storageKey: 'desiredIncome' },
        { elementId: 'retirementAgePhone', storageKey: 'retirementAge' },
        { elementId: 'inputTaxFreeCashPercentPhone', storageKey: 'taxFreeCashPercent' },
        { elementId: 'fundGrowthPercentPhone', storageKey: 'fundGrowthPre' },
        { elementId: 'fundGrowthPostPercentPhone', storageKey: 'fundGrowthPost' },
        { elementId: 'inflationRatePercentPhone', storageKey: 'inflation' },
        { elementId: 'fundChargesPercentPhone', storageKey: 'fundCharges' },
        { elementId: 'endAgePhone', storageKey: 'endAge' },
        { elementId: 'marketCrashAgePhone', storageKey: 'marketCrashAge' },
        { elementId: 'marketCrashPercentPhone', storageKey: 'marketCrashPercent' },
        { elementId: 'minimumISABalancePhone', storageKey: 'minISABalance' },
        { elementId: 'finalFundTargetPhone', storageKey: 'finalFund' },
        { elementId: 'contributionIncreaseAgePhone', storageKey: 'stepUpAge' },
        { elementId: 'additionalContributionPhone', storageKey: 'stepUpContribution' },
        { elementId: 'isaPriorityPhone', storageKey: 'isaPriority' },
        { elementId: 'isaGrowthPercentPhone', storageKey: 'isaGrowth' },
        { elementId: 'isaChargesPercentPhone', storageKey: 'isaCharges' },
        { elementId: 'isaInterestRatePercentPhone', storageKey: 'isaInterestRate' },
        { elementId: 'earlyRetirementAgePhone', storageKey: 'earlyRetirementAge' },
        { elementId: 'earlyRetirementDbPensionAmount', storageKey: 'earlyRetirementDbPensionAmount' },
        { elementId: 'salaryPhone', storageKey: 'userSalary' },
        { elementId: 'salaryPercentPhone', storageKey: 'userSalaryPercent' },
        { elementId: 'statePensionPhone', storageKey: 'statePension' }
    ];

    // List of input elements for the Partner's sections
    const partnerInputs = [
        { elementId: 'partnerRetirementAgePhone', storageKey: 'partnerRetirementAge' },
        { elementId: 'partnerCurrentFundPhone', storageKey: 'currentFundPartner' },
        { elementId: 'partnerMonthlyContributionPhone', storageKey: 'monthlyContributionPartner' },
        { elementId: 'partnerCurrentISAPhone', storageKey: 'currentISAPartner' },
        { elementId: 'partnerMonthlyISAContributionPhone', storageKey: 'monthlyISAContributionPartner' },
        { elementId: 'partnerDbPensionAmountPhone', storageKey: 'dbPensionAmountPartner' },
        { elementId: 'partnerDbRetirementAgePhone', storageKey: 'dbPensionAgePartner' },
        { elementId: 'inputDesiredCombinedIncomePhone', storageKey: 'desiredCombinedIncome' },
        { elementId: 'partnerEarlyRetirementAgePhone', storageKey: 'partnerEarlyRetirementAge' },
        { elementId: 'earlyRetirementDbPensionAmountPartner', storageKey: 'earlyRetirementDbPensionAmountPartner' },
        { elementId: 'inputPartnerTaxFreeCashPercentPhone', storageKey: 'taxFreeCashPercentPartner' },
        { elementId: 'partnerSalaryPhone', storageKey: 'partnerSalary' },
        { elementId: 'partnerSalaryPercentPhone', storageKey: 'partnerSalaryPercent' },
        { elementId: 'partnerStatePensionPhone', storageKey: 'partnerStatePension' }
        
    ];

    // Iterate over inputs and save their raw values
    inputs.forEach(({ elementId, storageKey }) => {
        const element = document.getElementById(elementId);
        if (element) {
            const rawValue = getRawValueFromText(element.value || element.textContent);
            saveToLocalStorage(storageKey, rawValue);
        }
    });

    
    for (let i = 1; i <= 13; i++) {
        // Save primary ERFs
        const erfElement = document.getElementById(`ERF${i}`);
            var rawValue = getRawValueFromText(erfElement.textContent);
            localStorage.setItem(`ERF${i}`, rawValue);
        
        // Save partner ERFs
        const partnerErfElement = document.getElementById(`partnerERF${i}`);
            rawValue = getRawValueFromText(partnerErfElement.textContent);
            localStorage.setItem(`partnerERF${i}`, rawValue);
        
    }

    // Partner-related inputs
    partnerInputs.forEach(({ elementId, storageKey }) => {
        const element = document.getElementById(elementId);
        if (element) {
            const rawValue = getRawValueFromText(element.value || element.textContent);
            saveToLocalStorage(storageKey, rawValue);
        }
    });

    // Save checkboxes
    const useScottishTaxSwitch = document.getElementById('useScottishTaxSwitch');
    if (useScottishTaxSwitch) {
        const isChecked = useScottishTaxSwitch.checked;
        saveToLocalStorage('useScottishTax', isChecked);
    }

    const alreadyRetiredSwitch = document.getElementById('alreadyRetiredSwitch');
    if (alreadyRetiredSwitch) {
        const isChecked = alreadyRetiredSwitch.checked;
        saveToLocalStorage('alreadyRetired', isChecked);
    }

    // ------------------------------
    // User's DC, DB, and ISA
    // ------------------------------
    const showDefinedContributionCheckbox = document.getElementById('showDefinedContributionPension');
    if (showDefinedContributionCheckbox) {
        const isChecked = showDefinedContributionCheckbox.checked;
        saveToLocalStorage('showDefinedContributionPension', isChecked);
        // If unchecked => reset DC values
        if (!isChecked) {
            saveToLocalStorage('currentFund', 0);
            saveToLocalStorage('monthlyContribution', 0);
        }
    }

    const showDefinedBenefitCheckbox = document.getElementById('showDefinedBenefitPension');
    if (showDefinedBenefitCheckbox) {
        const isChecked = showDefinedBenefitCheckbox.checked;
        saveToLocalStorage('showDefinedBenefitPension', isChecked);
        // If unchecked => reset DB values
        if (!isChecked) {
            saveToLocalStorage('dbPensionAmount', 0);
        }
    }

    const showISASavingsCheckbox = document.getElementById('showISASavings');
    if (showISASavingsCheckbox) {
        const isChecked = showISASavingsCheckbox.checked;
        saveToLocalStorage('showISASavings', isChecked);
        // If unchecked => reset ISA values
        if (!isChecked) {
            saveToLocalStorage('currentISA', 0);
            saveToLocalStorage('monthlyISAContribution', 0);
        }
    }

    // Income Period / Inflation checkboxes
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

    // Plan as Couple
    const planAsCoupleSwitch = document.getElementById('planAsCoupleSwitch');
    if (planAsCoupleSwitch) {
        localStorage.setItem('planAsCouple', planAsCoupleSwitch.checked);
    } else {
        console.warn('planAsCouple element is missing.');
    }

    const cashISACheckbox = document.getElementById('showCashISASavings');
    if (cashISACheckbox) {
        const isChecked = cashISACheckbox.checked;
        saveToLocalStorage('showCashISASavings', isChecked);
    }


    const partnerCashISACheckbox = document.getElementById('showPartnerCashISASavings');
    if (partnerCashISACheckbox) {
        const isChecked = partnerCashISACheckbox.checked;
        saveToLocalStorage('showPartnerCashISASavings', isChecked);
    }

    // ------------------------------
    // Partner's DC, DB, and ISA
    // ------------------------------
    const showPartnerDefinedContributionCheckbox = document.getElementById('showPartnerDefinedContributionPension');
    if (showPartnerDefinedContributionCheckbox) {
        const isChecked = showPartnerDefinedContributionCheckbox.checked;
        saveToLocalStorage('showPartnerDefinedContributionPension', isChecked);
        // If unchecked => reset partner's DC values
        if (!isChecked) {
            saveToLocalStorage('currentFundPartner', 0);
            saveToLocalStorage('monthlyContributionPartner', 0);
        }
    }

    const showPartnerDefinedBenefitCheckbox = document.getElementById('showPartnerDefinedBenefitPension');
    if (showPartnerDefinedBenefitCheckbox) {
        const isChecked = showPartnerDefinedBenefitCheckbox.checked;
        saveToLocalStorage('showPartnerDefinedBenefitPension', isChecked);
        // If unchecked => reset partner's DB value
        if (!isChecked) {
            saveToLocalStorage('dbPensionAmountPartner', 0);
        }
    }

    const showPartnerISASavingsCheckbox = document.getElementById('showPartnerISASavings');
    if (showPartnerISASavingsCheckbox) {
        const isChecked = showPartnerISASavingsCheckbox.checked;
        saveToLocalStorage('showPartnerISASavings', isChecked);
        // If unchecked => reset partner's ISA values
        if (!isChecked) {
            saveToLocalStorage('currentISAPartner', 0);
            saveToLocalStorage('monthlyISAContributionPartner', 0);
        }
    }

    // Partner Age
    const partnerAgeSlider = document.getElementById('partnerAgeSlider');
    if (partnerAgeSlider) {
        saveToLocalStorage('currentAgePartner', partnerAgeSlider.value);
    }
}

// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('input');

document.addEventListener('DOMContentLoaded', function() {

    initialiseLocalStorageValues();
    initialiseInitialInputsAndCheckboxes();
    toggleAlreadyRetired(alreadyRetiredSwitch);

    // Restore percentage contribution switch state
    const percentageContributionSwitch = document.getElementById('percentageContributionSwitch');
    if (percentageContributionSwitch) {
        const storedValue = localStorage.getItem('percentageContributionSwitch') === 'true';
        percentageContributionSwitch.checked = storedValue;

        // Show or hide the salary/percentage inputs based on saved value
        const inputContainer = document.getElementById('percentageContributionInputs');
        if (inputContainer) {
            inputContainer.style.display = storedValue ? 'block' : 'none';
        }
    }

    // Restore partner percentage contribution switch state
    const partnerPercentageContributionSwitch = document.getElementById('partnerPercentageContributionSwitch');
    if (partnerPercentageContributionSwitch) {
        const storedValue = localStorage.getItem('partnerPercentageContributionSwitch') === 'true';
        partnerPercentageContributionSwitch.checked = storedValue;

        // Show or hide the partner’s salary/percentage inputs based on saved value
        const inputContainer = document.getElementById('partnerPercentageContributionInputs');
        if (inputContainer) {
            inputContainer.style.display = storedValue ? 'block' : 'none';
        }
    }

    const planAsCoupleSwitch = document.getElementById('planAsCoupleSwitch');
    if (planAsCoupleSwitch) {
        planAsCoupleSwitch.addEventListener('change', function () {
            saveToLocalStorage('planAsCouple', this.checked); // Save the value to localStorage
            togglePartnerColumn(this); // Update partner column visibility
        });
    }
    
    const cashISACheckbox = document.getElementById('showCashISASavings');
    if (cashISACheckbox) {
        cashISACheckbox.addEventListener('change', function () {
            saveToLocalStorage('showCashISASavings', this.checked); // Save the value to localStorage
            
        });
    }

    const partnerCashISACheckbox = document.getElementById('showPartnerCashISASavings');
    if (partnerCashISACheckbox) {
        partnerCashISACheckbox.addEventListener('change', function () {
            saveToLocalStorage('showPartnerCashISASavings', this.checked); // Save the value to localStorage
            
        });
    }

    

    const showDefinedContributionCheckbox = document.getElementById('showDefinedContributionPension');
    if (showDefinedContributionCheckbox) {
        showDefinedContributionCheckbox.addEventListener('change', function() {
            saveToLocalStorage('showDefinedContributionPension', this.checked);
            toggleAccordion('definedContributionInputsAccordion', this);
            //saveAndCalc(); // Trigger calculation if needed
        });
    }

    const showDefinedBenefitCheckbox = document.getElementById('showDefinedBenefitPension');
    if (showDefinedBenefitCheckbox) {
        showDefinedBenefitCheckbox.addEventListener('change', function() {
            saveToLocalStorage('showDefinedBenefitPension', this.checked);
            //toggleAccordion('partnerDefinedContributionInputsAccordion', this);
            //toggleAccordion('earlyRetirementContainer', this);
            //saveAndCalc(); // Trigger calculation if needed
        });
    }

    const showISASavingsCheckbox = document.getElementById('showISASavings');
    if (showISASavingsCheckbox) {
        showISASavingsCheckbox.addEventListener('change', function() {
            saveToLocalStorage('showISASavings', this.checked);
            //saveAndCalc(); // Trigger calculation if needed
        });
    }

    const showPartnerDefinedContributionCheckbox = document.getElementById('showPartnerDefinedContributionPension');
    if (showPartnerDefinedContributionCheckbox) {
        showPartnerDefinedContributionCheckbox.addEventListener('change', function () {
            saveToLocalStorage('showPartnerDefinedContributionPension', this.checked);
            //toggleAccordion('partnerDefinedContributionInputsAccordion', this);
            toggleAccordion('partnerPensionFundAtRetirementContainer', this);
            
            //saveAndCalc();
        });
    }

    const showPartnerDefinedBenefitCheckbox = document.getElementById('showPartnerDefinedBenefitPension');
    if (showPartnerDefinedBenefitCheckbox) {
        showPartnerDefinedBenefitCheckbox.addEventListener('change', function () {
            saveToLocalStorage('showPartnerDefinedBenefitPension', this.checked);
            toggleAccordion('partnerDefinedBenefitInputsAccordion', this);
            //toggleAccordion('partnerEarlyRetirementContainer', this);
            //saveAndCalc();
        });
    }

    const showPartnerISASavingsCheckbox = document.getElementById('showPartnerISASavings');
    if (showPartnerISASavingsCheckbox) {
        showPartnerISASavingsCheckbox.addEventListener('change', function () {
            saveToLocalStorage('showPartnerISASavings', this.checked);
            toggleAccordion('partnerISAInputsAccordion', this);
            toggleAccordion('partnerISAAtRetirementContainer', this);
            
            //saveAndCalc();
        });
    }


    
    const partnerAgeSlider = document.getElementById('partnerAgeSlider');
    if (partnerAgeSlider) {
        partnerAgeSlider.addEventListener('input', function () {
            const value = this.value;
            document.getElementById('partnerAgePhone').textContent = value;

            
            saveToLocalStorage('currentAgePartner', value);
        });
    }

  
    revealAccordionSections();
    
    //restoreSelectedRetirementIncomeStandardOption();
    
    saveAndCalc();
});


function toggleAccordion(accordionId, checkbox) {

    const planAsCouple = localStorage.getItem('planAsCouple') === 'true';
    const accordionItem = document.getElementById(accordionId);
    const partnerInputsPensionFundAtRetirement = document.getElementById('partnerPensionFundAtRetirementContainer');
    const partnerInputsISAAtRetirement = document.getElementById('partnerISAAtRetirementContainer');
    const partnerTaxFreeCashPercent = document.getElementById('partnerTaxFreeCashPercentContainer');
    const partnerEarlyRetirementContainer = document.getElementById('testContainer');
    const earlyRetirementContainer = document.getElementById('earlyRetirementContainer');

    if (checkbox.checked) {
        accordionItem.classList.add('visible'); // Show the section
        accordionItem.classList.remove('hidden');
    } else {
        accordionItem.classList.remove('visible'); // Hide the section
        accordionItem.classList.add('hidden');
    }

    if (accordionId == 'definedBenefitInputsAccordion') {
        if (checkbox.checked) {
            earlyRetirementContainer.classList.add('visible');
            earlyRetirementContainer.classList.remove('hidden');
        } else {    
            earlyRetirementContainer.classList.remove('visible');
            earlyRetirementContainer.classList.add('hidden');
        }
    }

    if (accordionId == 'partnerDefinedBenefitInputsAccordion' ) {
        if (checkbox.checked && planAsCouple) {
            partnerEarlyRetirementContainer.classList.add('visible');
            partnerEarlyRetirementContainer.classList.remove('hidden'); 
        } else {
            partnerEarlyRetirementContainer.classList.remove('visible');
            partnerEarlyRetirementContainer.classList.add('hidden'); 
        }
    }

    const userDefinedContributionChecked = document.getElementById('showDefinedContributionPension')?.checked;
    const partnerDefinedContributionChecked = document.getElementById('showPartnerDefinedContributionPension')?.checked;
    const showISASavings = document.getElementById('showISASavings')?.checked;
    const showPartnerISASavings = document.getElementById('showPartnerISASavings')?.checked;
    
    

    const taxFreeLumpSumContainer = document.getElementById('taxFreeLumpSumContainer');
    const assumptionsContainer = document.getElementById('assumptionsContainer');
    const ISAassumptionsContainer = document.getElementById('ISAAssumptionsContainer');
    
    
    if (taxFreeLumpSumContainer && assumptionsContainer) { //Check they exist in the DOM
        if (!userDefinedContributionChecked && !partnerDefinedContributionChecked) {
            taxFreeLumpSumContainer.classList.add('d-none'); // Hide if neither is checked
            assumptionsContainer.classList.add('d-none'); // Hide if neither is checked
        } else {
            taxFreeLumpSumContainer.classList.remove('d-none'); // Show if at least one is checked
            assumptionsContainer.classList.remove('d-none'); // Show if at least one is checked
        }
    }

    if (ISAassumptionsContainer) { //Check they exist in the DOM
        if (!showISASavings && !showPartnerISASavings) {
            ISAassumptionsContainer.classList.add('d-none'); // Hide if neither is checked
        } else {
            ISAassumptionsContainer.classList.remove('d-none'); // Show if at least one is checked
        }
    }

    if (checkbox.id == 'showDefinedContributionPension' && !userDefinedContributionChecked) {
        saveToLocalStorage('currentFund', 0);
        saveToLocalStorage('monthlyContribution', 0);
    }

    if (planAsCouple && checkbox.id == 'showPartnerDefinedContributionPension' && !partnerDefinedContributionChecked) {
        saveToLocalStorage('currentFundPartner', 0);
        saveToLocalStorage('monthlyContributionPartner', 0);
    }

    if (checkbox.id == 'showISASavings' && !showISASavings) {
        saveToLocalStorage('currentISA', 0);
        saveToLocalStorage('monthlyISAContribution', 0);
    }

    if (planAsCouple && checkbox.id == 'showPartnerISASavings' && !showPartnerISASavings) {
        saveToLocalStorage('currentISAPartner', 0);
        saveToLocalStorage('monthlyISAContributionPartner', 0);
    }

    
       
   


   /*  if (accordionId == 'partnerDefinedContributionInputsAccordion') {
        if (partnerInputsPensionFundAtRetirement) {
            if (checkbox.checked) {
                partnerInputsPensionFundAtRetirement.classList.remove('d-none');
                partnerTaxFreeCashPercent.classList.remove('d-none');
            } else {
                partnerInputsPensionFundAtRetirement.classList.add('d-none');
                partnerTaxFreeCashPercent.classList.add('d-none');
            }
        }
    }
    
    if (accordionId == 'partnerISAInputsAccordion') {
        if (partnerInputsISAAtRetirement) {
            if (checkbox.checked) {
                partnerInputsISAAtRetirement.classList.remove('d-none');
            } else {
                partnerInputsISAAtRetirement.classList.add('d-none');
            }
        }
    }
     */

}


function saveToLocalStorage(key, value) {
    // Store the value in localStorage, converting booleans for checkboxes
    localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
}


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

function initialiseInitialInputsAndCheckboxes() {
    // Process each input separately
    

    // Monetary values
    initialiseInputAndSlider('monthlyPensionContributionsPhone', 'monthlyContribution', 'monthlyPensionContributionsSlider', 'currency');
    initialiseInputAndSlider('monthlyISADepositsPhone', 'monthlyISAContribution', 'monthlyISADepositsSlider', 'currency');
    initialiseInputAndSlider('inputDesiredIncomePhone', 'desiredIncome', 'desiredIncomeSlider', 'currency');
    initialiseInputAndSlider('currentFundPhone', 'currentFund', 'currentFundSlider', 'currency');
    initialiseInputAndSlider('currentISAPhone', 'currentISA', 'currentISASlider', 'currency');
    initialiseInputAndSlider('dbPensionAmountPhone', 'dbPensionAmount', 'annualPensionSlider', 'currency');
    initialiseInputAndSlider('minimumISABalancePhone', 'minISABalance', 'minimumISABalanceSlider', 'currency');
    initialiseInputAndSlider('finalFundTargetPhone', 'finalFund', 'finalFundTargetSlider', 'currency');
    initialiseInputAndSlider('additionalContributionPhone', 'stepUpContribution', 'additionalContributionSlider', 'currency');
    initialiseInputAndSlider('salaryPhone', 'userSalary', 'salarySlider', 'currency');
    initialiseInputAndSlider('partnerSalaryPhone', 'partnerSalary', 'partnerSalarySlider', 'currency');
    initialiseInputAndSlider('statePensionPhone', 'statePension', 'statePensionSlider', 'currency');
   

    // Percentage values
    initialiseInputAndSlider('inputTaxFreeCashPercentPhone', 'taxFreeCashPercent', 'taxFreeCashSlider', 'percentage');
    initialiseInputAndSlider('fundGrowthPercentPhone', 'fundGrowthPre', 'fundGrowthSlider', 'percentage');
    initialiseInputAndSlider('fundGrowthPostPercentPhone', 'fundGrowthPost', 'fundGrowthPostSlider', 'percentage');
    initialiseInputAndSlider('inflationRatePercentPhone', 'inflation', 'inflationSlider', 'percentage');
    initialiseInputAndSlider('fundChargesPercentPhone', 'fundCharges', 'fundChargesSlider', 'percentage');
    initialiseInputAndSlider('marketCrashPercentPhone', 'marketCrashPercent', 'marketCrashPercentSlider', 'percentage');
    initialiseInputAndSlider('isaPriorityPhone', 'isaPriority', 'isaPrioritySlider', 'percentage');
    initialiseInputAndSlider('isaGrowthPercentPhone', 'isaGrowth', 'isaGrowthSlider', 'percentage');
    initialiseInputAndSlider('isaChargesPercentPhone', 'isaCharges', 'isaChargesSlider', 'percentage');
    initialiseInputAndSlider('isaInterestRatePercentPhone', 'isaInterestRate', 'isaInterestRateSlider', 'percentage');
    initialiseInputAndSlider('salaryPercentPhone', 'userSalaryPercent', 'salaryPercentSlider', 'percentage');
    initialiseInputAndSlider('partnerSalaryPercentPhone', 'partnerSalaryPercent', 'partnerSalaryPercentSlider', 'percentage');


    // Age and other numeric values
    initialiseInputAndSlider('currentAgePhone', 'currentAge', 'currentAgeSlider');
    initialiseInputAndSlider('dbPensionAgePhone', 'dbPensionAge', 'dbPensionAgeSlider');
    initialiseInputAndSlider('endAgePhone', 'endAge', 'endAgeSlider');
    initialiseInputAndSlider('marketCrashAgePhone', 'marketCrashAge', 'marketCrashAgeSlider');
    initialiseInputAndSlider('contributionIncreaseAgePhone', 'stepUpAge', 'contributionIncreaseAgeSlider');
    initialiseInputAndSlider('retirementAgePhone', 'retirementAge', 'retirementAgeSlider');
    initialiseInputAndSlider('earlyRetirementAgePhone', 'earlyRetirementAge', 'earlyRetirementAgeSlider');
    initialiseInputAndSlider('partnerRetirementAgePhone', 'partnerRetirementAge', 'partnerRetirementAgeSlider');
    initialiseInputAndSlider('partnerEarlyRetirementAgePhone', 'partnerEarlyRetirementAge', 'partnerEarlyRetirementAgeSlider');
    

    
    

     // Partner Defined Contribution Pension Inputs
     initialiseInputAndSlider('partnerCurrentFundPhone', 'currentFundPartner', 'partnerCurrentFundSlider', 'currency');
     initialiseInputAndSlider('partnerMonthlyContributionPhone', 'monthlyContributionPartner', 'partnerMonthlyContributionsSlider', 'currency');
     initialiseInputAndSlider('partnerFundGrowthPercentPhone', 'partnerFundGrowth', 'partnerFundGrowthSlider', 'percentage');
     initialiseInputAndSlider('partnerFundChargesPercentPhone', 'partnerFundCharges', 'partnerFundChargesSlider', 'percentage');
     initialiseInputAndSlider('inputPartnerTaxFreeCashPercentPhone', 'taxFreeCashPercentPartner', 'partnerTaxFreeCashSlider', 'percentage');
 
     initialiseInputAndSlider('inputDesiredCombinedIncomePhone', 'desiredCombinedIncome', 'desiredCombinedIncomeSlider', 'currency');
     initialiseInputAndSlider('partnerStatePensionPhone', 'partnerStatePension', 'partnerStatePensionSlider', 'currency');

     // Partner Defined Benefit Pension Inputs
     initialiseInputAndSlider('partnerDbPensionAmountPhone', 'dbPensionAmountPartner', 'partnerAnnualPensionSlider', 'currency');
     initialiseInputAndSlider('partnerDbRetirementAgePhone', 'dbPensionAgePartner', 'partnerRetirementAgeSlider');
 
     // Partner ISA Savings Inputs
     initialiseInputAndSlider('partnerCurrentISAPhone', 'currentISAPartner', 'partnerCurrentISASlider', 'currency');
     initialiseInputAndSlider('partnerMonthlyISAContributionPhone', 'monthlyISAContributionPartner', 'partnerMonthlyISADepositsSlider', 'currency');
 

     

    // Set checkboxes
    const useScottishTaxSwitch = document.getElementById('useScottishTaxSwitch');
    if (useScottishTaxSwitch) {
        useScottishTaxSwitch.checked = localStorage.getItem('useScottishTax') === 'true';
    } else {
        console.warn('useScottishTaxSwitch element is missing.');
    }

    const alreadyRetiredSwitch = document.getElementById('alreadyRetiredSwitch');
    if (alreadyRetiredSwitch) {
        alreadyRetiredSwitch.checked = localStorage.getItem('alreadyRetired') === 'true';
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

    const planAsCoupleSwitch = document.getElementById('planAsCoupleSwitch');
    if (planAsCoupleSwitch) {
        planAsCoupleSwitch.checked = localStorage.getItem('planAsCouple') === 'true';
        togglePartnerColumn(planAsCoupleSwitch);
    } else {
        console.warn('planAsCouple element is missing.');
    }

    const showCashISASavingsCheckbox = document.getElementById('showCashISASavings');
    if (showCashISASavingsCheckbox) {
        showCashISASavingsCheckbox.checked = localStorage.getItem('showCashISASavings') === 'true';
        toggleCashISASection();
    }
    
    // Partner Checkboxes
    const showPartnerDefinedContributionCheckbox = document.getElementById('showPartnerDefinedContributionPension');
    if (showPartnerDefinedContributionCheckbox) {
        showPartnerDefinedContributionCheckbox.checked = localStorage.getItem('showPartnerDefinedContributionPension') === 'true';
    }

    const showPartnerDefinedBenefitCheckbox = document.getElementById('showPartnerDefinedBenefitPension');
    if (showPartnerDefinedBenefitCheckbox) {
        showPartnerDefinedBenefitCheckbox.checked = localStorage.getItem('showPartnerDefinedBenefitPension') === 'true';
    }

    const showPartnerISASavingsCheckbox = document.getElementById('showPartnerISASavings');
    if (showPartnerISASavingsCheckbox) {
        showPartnerISASavingsCheckbox.checked = localStorage.getItem('showPartnerISASavings') === 'true';
        toggleCashISASection();
    }

    const showPartnerCashISASavingsCheckbox = document.getElementById('showPartnerCashISASavings');
    if (showPartnerCashISASavingsCheckbox) {
        showPartnerCashISASavingsCheckbox.checked = localStorage.getItem('showPartnerCashISASavings') === 'true';
        toggleCashISASection();
    }

    const partnerAgeSlider = document.getElementById('partnerAgeSlider');
    const partnerAgePhone = document.getElementById('partnerAgePhone');
    if (partnerAgeSlider && partnerAgePhone) {
        const savedValue = localStorage.getItem('currentAgePartner') || 50; // Default to 50
        partnerAgeSlider.value = savedValue;
        partnerAgePhone.textContent = savedValue;
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
    const isPlanAsCouple = localStorage.getItem('planAsCouple') === 'true';

    if (selectedOption) {
        // Find the radio input with the saved value and check it
        const toggleInput = document.querySelector(`input[name="togglePhone"][value="${selectedOption}"]`);
        if (toggleInput) {
            toggleInput.checked = true;
            console.log(`Restored selected option: ${selectedOption}`);

            // Simulate an event to update the associated slider and outputs
            const mockEvent = { target: toggleInput };
            updateRetirementLivingStandardsSelector(mockEvent);

            // Additional handling for the combined income slider when planning as a couple
            if (isPlanAsCouple) {
                const combinedIncomeSlider = document.getElementById("desiredCombinedIncomeSlider");
                const combinedIncomeOutput = document.getElementById("inputDesiredCombinedIncomePhone");

                if (combinedIncomeSlider && combinedIncomeOutput) {
                    
                    let combinedValue;
                    switch (selectedOption) {
                        case "Option 1":
                            combinedValue = parseInt(22400 / 12 );
                            break;
                        case "Option 2":
                            combinedValue = parseInt(43100 / 12 );
                            break;
                        case "Option 3":
                            combinedValue = parseInt(59000 / 12 );
                            break;
                        default:
                            console.warn(`Unknown option selected: ${selectedOption}`);
                            return;
                    }

                    
                    combinedIncomeSlider.value = combinedValue;
                    combinedIncomeOutput.value = combinedValue;
                    combinedIncomeOutput.textContent = formatNumber(combinedValue, 'currency');

                    
                }
            }

            if (isPlanAsCouple) {
                initialiseInputAndSlider('inputDesiredCombinedIncomePhone',  'desiredCombinedIncome',   'desiredCombinedIncomeSlider',    'currency' );
            } else {
                initialiseInputAndSlider('inputDesiredIncomePhone', 'desiredIncome', 'desiredIncomeSlider', 'currency');
            }
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
        updateEarlyRetirementInputs(outputId);
        
        if (outputId == 'dbPensionAgePhone') {
            toggleAlreadyRetired(alreadyRetiredSwitch);
        }

        if (outputId == 'partnerDbRetirementAgePhone') {
            toggleAlreadyRetired(alreadyRetiredSwitch);
        }

        //Update slider limits
        updateAllSliderLimits(outputId);
    }
}


function updateEarlyRetirementInputs(outputId) {
    const retirementAge = parseInt(document.getElementById('retirementAgePhone').value);
    const dbPensionAge = parseInt(document.getElementById('dbPensionAgePhone').value);
    const currentAge = parseInt(localStorage.getItem('currentAge')) ;
    const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) ;
    const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;
    const partnerDbRetirementAge = parseInt(document.getElementById('partnerDbRetirementAgePhone').value);

    if (outputId == 'dbPensionAgePhone' ) {
        
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(retirementAge,dbPensionAge-13),dbPensionAge);
        document.getElementById('earlyRetirementAgePhone').value = dbPensionAge;
        document.getElementById('earlyRetirementAgeSlider').value = dbPensionAge;
        populateERFOutputs(dbPensionAge);
    }

    if (outputId == 'partnerDbRetirementAgePhone' ) {
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(partnerRetirementAge,partnerDbRetirementAge-13),partnerDbRetirementAge);
        document.getElementById('partnerEarlyRetirementAgePhone').value = partnerDbRetirementAge;
        document.getElementById('partnerEarlyRetirementAgeSlider').value = partnerDbRetirementAge;
        populateERFOutputs(partnerDbRetirementAge,'partner');
    }

    if (outputId == 'retirementAgePhone') {
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(retirementAge,dbPensionAge-13),dbPensionAge);
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(partnerRetirementAge,partnerDbRetirementAge-13),partnerDbRetirementAge);
    }

}

function updateAllSliderLimits(outputId) {
    const currentAge = parseInt(document.getElementById('currentAgePhone').value);
    const currentAgePartner = parseInt(document.getElementById('partnerAgePhone').value) ;
    const retirementAge = parseInt(document.getElementById('retirementAgePhone').value);
    const dbPensionAge = parseInt(document.getElementById('dbPensionAgePhone').value);
    const dbPensionAgePartner = parseInt(document.getElementById('partnerDbRetirementAgePhone').value);
    const endAge = parseInt(document.getElementById('endAgePhone').value);
    const engAgePartner = endAge + currentAge - currentAgePartner;

    if (outputId == 'endAgePhone') {
        updateSliderLimits('currentAgeSlider', parseInt(document.getElementById('currentAgeSlider').min), endAge);
        updateSliderLimits('retirementAgeSlider', parseInt(document.getElementById('retirementAgeSlider').min), endAge);
        updateSliderLimits('dbPensionAgeSlider', currentAge, endAge);
        updateSliderLimits('partnerDbRetirementAgeSlider', currentAgePartner, engAgePartner);
    }


    if (outputId == 'currentAgePhone') {
        updateSliderLimits('dbPensionAgeSlider', currentAge, endAge);
        updateSliderLimits('retirementAgeSlider', currentAge+1, endAge);
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(retirementAge,dbPensionAge-13),dbPensionAge);
    }

    if (outputId == 'retirementAgePhone') {
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(retirementAge,dbPensionAge-13),dbPensionAge);
    }

    if (outputId == 'partnerAgePhone') {
        updateSliderLimits('partnerDbRetirementAgeSlider', currentAgePartner, engAgePartner);
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(currentAgePartner,dbPensionAgePartner-13),dbPensionAgePartner);
    }

    if (outputId == 'dbPensionAgePhone') {
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(currentAge,dbPensionAge-13),dbPensionAge);
   }

    if (outputId == 'partnerDbRetirementAgePhone') {
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(currentAgePartner,dbPensionAgePartner-13),dbPensionAgePartner);
    }

    

    populateERFOutputs(dbPensionAge);
    populateERFOutputs(dbPensionAgePartner,'partner');

}


function updateSliderLimits(outputId,newMin,newMax) {
    const slider = document.getElementById(outputId);
    slider.min = newMin;
    slider.max = newMax;
    const numericalValue = parseFloat(slider.value.replace(/[^0-9.]/g, ''));

    // If the current value is greater than the new max, adjust the value
    if (numericalValue > newMax) {
        slider.value = newMax;
    }
    if (numericalValue < newMin) {
        slider.value = newMin;
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
            Minimum: parseInt(22400 / 12 ),
            Moderate: parseInt(43100 / 12 ),
            Comfortable: parseInt(59000 / 12 ),
        };
    } else {
        values = {
            Minimum: parseInt(14400 / 12 ),
            Moderate: parseInt(31300 / 12 ),
            Comfortable: parseInt(43100 / 12 ),
        };
    }

    // Retrieve the slider and output elements
    const slider = isPlanAsCouple
        ? document.getElementById("desiredCombinedIncomeSlider")
        : document.getElementById("desiredIncomeSlider");
    
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
        currentFund: 1.0,
        monthlyContribution: 0.0,
        currentISA: 1.0,
        monthlyISAContribution: 0.0,
        dbPensionAmount: 0.0,
        dbPensionAge: 67,
        endAge: 95,
        finalFund: 0.0,
        taxFreeCashPercent: 0.0,
        desiredIncome: 0,
        currentAgePartner: 50,
        stepUpAge: 55,
        stepUpContribution: 0.0,
        minISABalance: 0.0,
        useScottishTax: false,
        fundGrowthPre: 7, 
        fundGrowthPost: 7, 
        fundCharges: 1, // 1% default
        marketCrashAge: 60, // Default market crash age
        marketCrashPercent: 0, // Default market crash percentage
        dbPensionAgePartner: 0,
        partnersFinalFund: 0.0,
        annualValues: false,
        applyInflationAdjustment: 'true',
        isaPriority: 50, 
        partnerMonthlyContribution: 0,
        partnerCurrentFund: 1,
        partnerDbPensionAmount: 0,
        partnerDbPensionAge: 60,
        partnerCurrentISA: 1,
        partnerMonthlyISAContribution: 0,
        isaGrowth: 5, // Default ISA growth, adjust as needed
        isaCharges: 0.5, // Default ISA charges, adjust as needed
        isaInterestRate: 4,
        earlyRetirementAge: localStorage.getItem('dbPensionAge') || 67,
        partnerEarlyRetirementAge: localStorage.getItem('dbPensionAgePartner') || 67,
        dbPensionAgePartner: 67,
        inflationLinkedContributions: true,
        inflationLinkedContributionsPartner: true,
        userSalary: 0,
        userSalaryPercent: 5,
        partnerSalary: 0,
        partnerSalaryPercent: 5,
        annuityAge: 75,
        
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
        earlyRetirementAge: localStorage.getItem('dbPensionAge') || 67,
        partnerEarlyRetirementAge: localStorage.getItem('dbPensionAgePartner') || 67,
        partnerStepUpAge: 55,
        partnerStepUpContribution: 0.0,
    };

    Object.keys(defaults).forEach((key) => {
        localStorage.setItem(key, defaults[key].toString());
    });

    // Update the inputs and sliders with the default values
    initialiseInitialInputsAndCheckboxes();
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
            initialiseInitialInputsAndCheckboxes();

            // Update selected income requirement
            restoreSelectedRetirementIncomeStandardOption();

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
    'monthlyPensionContributionsSlider': 'monthlyPensionContributionsPhone',
    'monthlyISADepositsSlider': 'monthlyISADepositsPhone',
    'annualPensionSlider': 'dbPensionAmountPhone',
    'dbPensionAgeSlider': 'dbPensionAgePhone',
    'desiredIncomeSlider': 'inputDesiredIncomePhone',
    'retirementAgeSlider': 'retirementAgePhone',
    'taxFreeCashSlider': 'inputTaxFreeCashPercentPhone',
    'fundGrowthSlider': 'fundGrowthPercentPhone',
    'inflationSlider': 'inflationRatePercentPhone',
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
    'partnerRetirementAgeSlider': 'partnerRetirementAgePhone',
    'partnerCurrentFundSlider': 'partnerCurrentFundPhone',
    'partnerMonthlyContributionsSlider': 'partnerMonthlyContributionPhone',
    'partnerFundGrowthSlider': 'partnerFundGrowthPercentPhone',
    'partnerFundChargesSlider': 'partnerFundChargesPercentPhone',
    'partnerAnnualPensionSlider': 'partnerDbPensionAmountPhone',
    'partnerDbRetirementAgeSlider': 'partnerDbRetirementAgePhone',
    'partnerAgeSlider': 'partnerAgePhone',
    'partnerCurrentISASlider': 'partnerCurrentISAPhone',
    'partnerMonthlyISADepositsSlider': 'partnerMonthlyISAContributionPhone',
    'desiredCombinedIncomeSlider': 'inputDesiredCombinedIncomePhone',
    'isaGrowthSlider': 'isaGrowthPercentPhone',
    'isaChargesSlider': 'isaChargesPercentPhone',
    'isaInterestRateSlider': 'isaInterestRatePercentPhone',
    'earlyRetirementAgeSlider': 'earlyRetirementAgePhone',
    'partnerEarlyRetirementAgeSlider': 'partnerEarlyRetirementAgePhone',
    'partnerTaxFreeCashSlider': 'inputPartnerTaxFreeCashPercentPhone',
    'salarySlider': 'salaryPhone',
    'percentageSlider': 'salaryPercentPhone',
    'partnerSalarySlider': 'partnerSalaryPhone',
    'partnerPercentageSlider': 'partnerPercentagePhone',
    'statePensionSlider': 'statePensionPhone',
    'partnerStatePensionSlider': 'partnerStatePensionPhone'
    
};

function setupSliderListeners() {
    const debounceDelay = 200; // Delay in milliseconds
    let debounceTimer; // Timer for debouncing

    Object.keys(sliderToOutputMap).forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const outputId = sliderToOutputMap[sliderId];

        if (slider) {
            slider.addEventListener('input', () => {
                const value = slider.value; // Get slider value
                let formatType = null;

                // Determine the formatting type for the output
                if (outputId.endsWith('PercentPhone')) {
                    formatType = 'percentage';
                } else if (sliderId === 'isaPrioritySlider') {
                    formatType = 'percentage';
                } else if (outputId.endsWith('Phone') && !outputId.includes('Age')) {
                    formatType = 'currency';
                }

                // Update the output box
                updateOutput(outputId, value, formatType);

                 // Special handling for our new contribution sliders:
                 if (sliderId === 'salarySlider' || sliderId === 'percentageSlider') {
                    updateMonthlyContributionFromPercentage();
                }
                if (sliderId === 'partnerSalarySlider' || sliderId === 'partnerSalaryPercentSlider') {
                    updatePartnerMonthlyContributionFromPercentage();
                }

                // Special handling for Partner DB Retirement Age Slider
                if (sliderId === 'partnerDbRetirementAgeSlider') {
                    const partnerRetirementAgeOutput = document.getElementById('partnerDbRetirementAgePhone');
                    if (partnerRetirementAgeOutput) {
                        partnerRetirementAgeOutput.textContent = value; // Update the output box
                    }
                    saveToLocalStorage('dbPensionAgePartner', value); // Save the new value to localStorage
                }

                // Special handling for Partner DB Retirement Age Slider
                if (sliderId === 'partnerDbRetirementAgeSlider') {
                    const partnerRetirementAgeOutput = document.getElementById('partnerDbRetirementAgePhone');
                    if (partnerRetirementAgeOutput) {
                        partnerRetirementAgeOutput.textContent = value; // Update the output box
                    }
                    saveToLocalStorage('dbPensionAgePartner', value); // Save the new value to localStorage
                }

                 // Special handling for User Retirement Age Slider
                 if (sliderId === 'retirementAgeSlider') {
                    const retirementAge = parseInt(value);
                    const currentAge = parseInt(localStorage.getItem('currentAge')) || 50; // Default to 50
                    const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) || 48; // Default to 48

                    const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;

                    // Update the partner retirement age output
                    const partnerRetirementAgeOutput = document.getElementById('partnerRetirementAgePhone');
                    if (partnerRetirementAgeOutput) {
                        partnerRetirementAgeOutput.textContent = partnerRetirementAge;
                    }
                }

                // New: Update partner's retirement age when partner's age slider is updated
                if (sliderId === 'partnerAgeSlider') {
                    const currentAge = parseInt(localStorage.getItem('currentAge')) || 50; // Default to 50
                    const retirementAge = parseInt(localStorage.getItem('retirementAge')) || 65; // Default to 65
                    const currentAgePartner = parseInt(value); // Partner's current age from slider

                    const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;

                    // Update the partner retirement age output
                    const partnerRetirementAgeOutput = document.getElementById('partnerRetirementAgePhone');
                    if (partnerRetirementAgeOutput) {
                        partnerRetirementAgeOutput.textContent = partnerRetirementAge;
                    }

                    // Update partner DB retirement age slider if applicable
                    const partnerRetirementAgeSlider = document.getElementById('partnerDbRetirementAgeSlider');
                    if (partnerRetirementAgeSlider) {
                        partnerRetirementAgeSlider.value = partnerRetirementAge;
                    }

                    // Save updated values
                    saveToLocalStorage('currentAgePartner', currentAgePartner);
                    saveToLocalStorage('dbPensionAgePartner', partnerRetirementAge);
                }

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



    
    
    
    
    function revealAccordionSections() {
        // Check and reveal Defined Contribution section
        
        const isPlanAsCouple = localStorage.getItem('planAsCouple') === "true";

        const definedContributionCheckbox = document.getElementById('showDefinedContributionPension');
        const definedBenefitCheckbox = document.getElementById('showDefinedBenefitPension');
        const isaCheckbox = document.getElementById('showISASavings');

        // Partner-specific sections
        const partnerDefinedContributionCheckbox = document.getElementById('showPartnerDefinedContributionPension');
        const partnerDefinedBenefitCheckbox = document.getElementById('showPartnerDefinedBenefitPension');
        const partnerISASavingsCheckbox = document.getElementById('showPartnerISASavings');
        const partnerEarlyRetirementContainer = document.getElementById('partnerEarlyRetirementContainer');
        const earlyRetirementContainer = document.getElementById('earlyRetirementContainer');
      
        // Call toggle functions on page load
        toggleAccordion('definedContributionInputsAccordion', definedContributionCheckbox);
        toggleAccordion('definedBenefitInputsAccordion', definedBenefitCheckbox);
        toggleAccordion('ISAInputsAccordion', isaCheckbox);
        //toggleAccordion('earlyRetirementContainer', definedBenefitCheckbox);
        
        if (isPlanAsCouple) {
            toggleAccordion('partnerDefinedContributionInputsAccordion', partnerDefinedContributionCheckbox);
            toggleAccordion('partnerDefinedBenefitInputsAccordion', partnerDefinedBenefitCheckbox);
            toggleAccordion('partnerISAInputsAccordion', partnerISASavingsCheckbox);
            //toggleAccordion('partnerEarlyRetirementContainer', partnerDefinedBenefitCheckbox);
        }

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
    

            // Special handling for User Retirement Age Slider
            if (outputBoxId === 'retirementAgePhone') {
                const retirementAge = parseInt(document.getElementById('retirementAgePhone').value) + adjustment;
                const currentAge = parseInt(document.getElementById('currentAgePhone').value) ;
                const currentAgePartner = parseInt(document.getElementById('partnerAgePhone').value) ;

                const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;

                // Update the partner retirement age output
                const partnerRetirementAgeOutput = document.getElementById('partnerRetirementAgePhone');
                if (partnerRetirementAgeOutput) {
                    partnerRetirementAgeOutput.textContent = partnerRetirementAge;
                }
            }

            if (outputBoxId === 'partnerAgePhone') {
                const currentAge = parseInt(document.getElementById('currentAgePhone').value) ;
                const retirementAge = parseInt(document.getElementById('retirementAgePhone').value);
                const currentAgePartner = parseInt(document.getElementById('partnerAgePhone').value) + adjustment;

                const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;

                // Update the partner retirement age output
                const partnerRetirementAgeOutput = document.getElementById('partnerRetirementAgePhone');
                if (partnerRetirementAgeOutput) {
                    partnerRetirementAgeOutput.textContent = partnerRetirementAge;
                }

                // Update partner DB retirement age slider if applicable
                const partnerRetirementAgeSlider = document.getElementById('partnerDbRetirementAgeSlider');
                if (partnerRetirementAgeSlider) {
                    partnerRetirementAgeSlider.value = partnerRetirementAge;
                }

                // Save updated values
                saveToLocalStorage('currentAgePartner', currentAgePartner);
                saveToLocalStorage('dbPensionAgePartner', partnerRetirementAge);
            }

            // Update the output box with the appropriate format
            outputBox.textContent = formatNumber(currentValue, formatType);

            // Find and update the corresponding slider
            updateCorrespondingSlider(outputBoxId, currentValue);

            //Update slider limits
            updateAllSliderLimits();

            // Update the early retirement inputs
            updateEarlyRetirementInputs(outputBoxId);

            // Trigger the update function when salary or percentage is adjusted
            if (outputBoxId === 'salaryPhone' || outputBoxId === 'salaryPercentPhone') {
                updateMonthlyContributionFromPercentage();
            } else if (outputBoxId === 'partnerSalaryPhone' || outputBoxId === 'partnerSalaryPercentPhone') {
                updatePartnerMonthlyContributionFromPercentage();
            }
    
           


            // Trigger save and calculation logic
            saveAndCalc();
        }
    }
    
    function updateCorrespondingSlider(outputBoxId, newValue) {
        let sliderId = outputBoxId.replace('Phone', 'Slider'); // Assuming a naming pattern
    
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.value = newValue;
            //slider.dispatchEvent(new Event('input')); // Trigger an update event
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
        
        var annualValues = localStorage.getItem('annualValues') === "true";
        var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";

        var frequency = "monthly";
        var freq_capital = "Monthly";
        if(annualValues) {
            frequency = "annual";
            freq_capital = "Annual";
        }

        var inflationWarning = "";
        var inTodaysMoneySuffix = " in today's money values,";
        if (!applyInflationAdjustment) {
            inflationWarning = "Note that this value is different from what you selected because it is the value at your retirement age, increased with inflation up to that point."
            inTodaysMoneySuffix = ""
        }
        
        // Early retiral warning
        var earliestPensionWithdrawalAge = getEarliestPensionAge(currentAge);
        if (retirementAge < earliestPensionWithdrawalAge) {
            document.getElementById("earlyRetiralWarning").innerHTML = `Note that your selected retirement age is before the earliest age at which you can withdraw pension funds (${earliestPensionWithdrawalAge}). You must therefore have sufficient ISA savings to fund your retirement income before your pension withdrawals can begin at age ${earliestPensionWithdrawalAge}.`;
        } else {
            document.getElementById("earlyRetiralWarning").innerHTML = "";
        }
    
        // Check for deficit before earliest retirement age
        earlyRetirementTodaysMoneyCashFlowData = todaysMoneyCashFlowData.filter(entry => entry.age < earliestPensionWithdrawalAge);
        var minMax = minMaxCashflow(earlyRetirementTodaysMoneyCashFlowData,retirementAge);
        if ( minMax.maxIncome - minMax.minIncome > 100 ) {
            document.getElementById("earlyRetiralDeficitWarning").innerHTML = `<Strong style="color:red;">Warning:</Strong> Your selected retirement age is before the earliest age at which you can withdraw pension funds (${earliestPensionWithdrawalAge}) and you do not have have sufficient ISA savings to fund your desired retirement income from age ${retirementAge} to age ${earliestPensionWithdrawalAge}. You will be able to see this clearly on the Dashboard page and adjust your retirement age or ISA contributions accordingly.`;
        } else {
            document.getElementById("resultsExplainer2").innerHTML = `This can be compared to your desired retirement income that you selected above and a shortfall or surplus calculated. ${inflationWarning}`;
        
        }


        var frequencyMultiplier = annualValues ? 12 : 1;
        

        const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) ;
        const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;

        const isCashISAVisible = localStorage.getItem('showCashISASavings') === 'true';
        const isPartnerCashISAVisible = localStorage.getItem('showPartnerCashISASavings') === 'true';

        if (isCashISAVisible) {
            var ISAType = "Cash ISA";
        } else {
            var ISAType = "Stocks & Shares ISA";
        }

        if (isPartnerCashISAVisible) {
            var partnerISAType = "Cash ISA";
        }
        else {
            var partnerISAType = "Stocks & Shares ISA";
        }
        
    
        // Main User Outputs
        document.getElementById("inputPensionFundAtRetirementLabel").innerHTML = `<strong>Value of Your Pension Fund at Retirement Age of ${retirementAge}</strong>`;
        document.getElementById("inputsPensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement )) + '</strong>';
    
        document.getElementById("inputISAAtRetirementLabel").innerHTML = `<strong>Value of Your ${ISAType} at Retirement Age of ${retirementAge}</strong>`;
        document.getElementById("inputsISAAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement )) + '</strong>';
    
        document.getElementById("inputTFCTakenLabel").innerHTML = `<strong>Tax Free Amount Received at Retirement Age of ${retirementAge}:   </strong>`;
        document.getElementById("inputTFCTaken").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken )) + '</strong>';
    
        
        document.getElementById("inputsExpectedTotalIncomeLabel").innerHTML = `<strong>Affordable ${freq_capital} Income (a)</strong>`;
        document.getElementById("inputsDesiredMonthlyIncomeAtRetirementLabel").innerHTML = `<strong>Desired ${freq_capital} Income (b)</strong>`;

        if (alreadyRetired) {
            document.getElementById("resultsExplainer").innerHTML = `Based on your inputs and assumptions for fund growth and inflation, the <strong>${frequency}</strong> income that you can afford (after tax), increasing with inflation, and calculated such that your funds will run out when you are aged ${endAge}, ${inTodaysMoneySuffix} is:`;
            document.getElementById("TFCExplainerLabel").innerHTML = `To improve the accuracy of the tax due on your future pension payments, please enter the percentage of your pension fund you took as a tax free lump sum on retirement.`;
            document.getElementById("TFCExplainerLabelPartner").innerHTML = `Please also enter the percentage of your Partner's pension fund they took as a tax free lump sum on retirement.`;
            document.getElementById("dbPensionExplainer").innerHTML = `Please enter the annual amount of your defined benefit pension and the age at which payments will commence (the Normal Retirement Age). If it is already in payment, please indicate the age at which payments began.`;
            document.getElementById("dbPensionExplainerPartner").innerHTML = `Please enter the annual amount of your partner's defined benefit pension and the age at which payments will commence. If it is already in payment, please indicate the age at which payments began.`;
            
            
        } else {
            document.getElementById("resultsExplainer").innerHTML = `Based on your inputs and assumptions for fund growth and inflation, the <strong>${frequency}</strong> income that you can afford (after tax), starting from your retirement age of ${retirementAge}, increasing with inflation, and calculated such that your funds will run out when you are aged ${endAge}, ${inTodaysMoneySuffix} is:`;
            document.getElementById("TFCExplainerLabel").innerHTML = `If you wish to take a tax-free lump sum out of your fund at retirement, please enter the percentage of your fund you would like to withdraw.`;
            document.getElementById("TFCExplainerLabelPartner").innerHTML = `Please also enter the percentage of your partner's fund they would like to withdraw tax free at retirement.`;
            document.getElementById("dbPensionExplainer").innerHTML = `If you have a guaranteed pension payable from a certain age, please add details here. The annual pension entered should be the amount that you will be entitled to start receiving at your scheme's normal retirement age.`;
            document.getElementById("dbPensionExplainerPartner").innerHTML = `If your partner has a guaranteed pension payable from a certain age, add details here. The annual pension entered should be the amount that your partner will be entitled to start receiving at their scheme's normal retirement age.`;
            if (planAsCouple) {
                document.getElementById("resultsExplainer").innerHTML = `Based on your inputs and assumptions for fund growth and inflation, the combined <strong>${frequency}</strong> income that you and your partner can afford (after tax), calculated such that your funds will run out when you are aged ${endAge}, is:`;
            
            }
        }
        
        if (planAsCouple) {

            // Main User Outputs
            document.getElementById("inputsPensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(yourFundAtRetirement )) + '</strong>';
            document.getElementById("inputsISAAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(yourISAAtRetirement )) + '</strong>';
            document.getElementById("inputTFCTaken").innerHTML = '<strong>£' + formatNumber(Math.round(yourTaxFreeCashTaken )) + '</strong>';

            // Partner Outputs
            document.getElementById("partnerInputPensionFundAtRetirementLabel").innerHTML = `<strong>Value of Your Partner's Pension Fund at Retirement Age of ${partnerRetirementAge}</strong>`;
            document.getElementById("partnerInputsPensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(partnerFundAtRetirement )) + '</strong>';
    
            document.getElementById("partnerInputISAAtRetirementLabel").innerHTML = `<strong>Value of your partner's ${partnerISAType} at Retirement Age of ${partnerRetirementAge}</strong>`;
            document.getElementById("partnerInputsISAAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(partnerISAAtRetirement )) + '</strong>';
    
            document.getElementById("inputPartnerTFCTakenLabel").innerHTML = `<strong>Tax Free Amount Received at Retirement Age of ${partnerRetirementAge}:   </strong>`;
            document.getElementById("inputPartnerTFCTaken").innerHTML = '<strong>£' + formatNumber(Math.round(partnerTaxFreeCashTaken )) + '</strong>';
        
            document.getElementById("inputCombinedTFCTaken").innerHTML = '<strong>£' + formatNumber(Math.round((yourTaxFreeCashTaken + partnerTaxFreeCashTaken) )) + '</strong>';
            

            // Output total tax free cash for you and your partner
            //document.getElementById("inputTFCTaken").innerHTML = '<strong>£' + formatNumber(Math.round((taxFreeCashTaken) )) + '</strong>';
    
            document.getElementById("inputsExpectedTotalIncomeLabel").innerHTML = `<strong>Affordable Combined ${freq_capital} Income (a)</strong>`;

            document.getElementById("resultsExplainer2").innerHTML = `This can be compared to your desired combined retirement income that you selected above and a shortfall or surplus calculated. ${inflationWarning}`;
            document.getElementById("inputsDesiredMonthlyIncomeAtRetirementLabel").innerHTML = `<strong>Desired Combined ${freq_capital} Income (b)</strong>`;
            
        }

        
    }

    

    function outputResults(cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge, fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome, maxAffordableNetIncome, shortfallAtRetirement, discountFactor, alreadyRetired, planAsCouple, dontResizeChart, incomeType, simulation1, simulation2) {

        if (simulation2 !== undefined) {
            outputInputPageResults(cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge, fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome, maxAffordableNetIncome, shortfallAtRetirement, discountFactor, alreadyRetired, planAsCouple, simulation1.fundAtRetirement,simulation1.ISAAtRetirement,simulation1.taxFreeCashTaken, simulation2.fundAtRetirement,simulation2.ISAAtRetirement,simulation2.taxFreeCashTaken);
        } else {
            outputInputPageResults(cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge, fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome, maxAffordableNetIncome, shortfallAtRetirement, discountFactor, alreadyRetired, planAsCouple);
        }
            

        var taxFreeCashPercent = parseFloat(localStorage.getItem("taxFreeCashPercent"))/100 || 0.00;
        /* var inputTaxFreeCashPercentPartner = parseFloat(document.getElementById("inputTaxFreeCashPercentPartner").value)/100 || 0.00; */
        //var fundGrowthPre = parseFloat(localStorage.getItem("fundGrowthPre")) / 100;
        //var fundCharges = parseFloat(localStorage.getItem("fundCharges")) / 100;
    
        var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
        var desiredAnnualIncomeAtRetirement = desiredAnnualIncome / discountFactor;
        var endAge = parseInt(localStorage.getItem("endAge"));
        

        var annualValues =  localStorage.getItem('annualValues') === "true" ;

        var frequency = "monthly";
        var freq_capital = "Monthly";
        if(annualValues) {
            frequency = "annual";
            freq_capital = "Annual";
        }
    
        if (annualValues) { 
            frequencyMultiplier = 12;
        } else {
            frequencyMultiplier = 1; // Default or alternative value if unchecked
        }
    
        var suffix = `at age ${retirementAge}`;
        var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";

        const earlyRetirementAge = document.getElementById('earlyRetirementAgePhone').value;
        const dbPensionAmount = parseFloat(localStorage.getItem("earlyRetirementDbPensionAmount")) ;
        const partnerEarlyRetirementAge = document.getElementById('partnerEarlyRetirementAgePhone').value;
        const dbPensionAmountPartner = parseFloat(localStorage.getItem("earlyRetirementDbPensionAmountPartner")) ;
        const inflation = parseFloat(localStorage.getItem("inflation"))/100 ;
        const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) ;
        

        const dbDiscountFactor = 1/ Math.pow(1 + inflation, Math.max(0,earlyRetirementAge - currentAge));
        const partnerDbDiscountFactor = 1/ Math.pow(1 + inflation, Math.max(0,partnerEarlyRetirementAge - currentAgePartner));

        document.getElementById("earlyRetirementDbPensionAmountLabel").innerHTML = `<strong>Early Retirement Pension Payable from age ${earlyRetirementAge}</strong>`;
        document.getElementById("earlyRetirementDbPensionAmount").innerHTML = '<strong>£' + formatNumber(Math.round(dbPensionAmount )) + '</strong>';
        document.getElementById("earlyRetirementDbPensionAmountPartnerLabel").innerHTML = `<strong>Early Retirement Pension Payable from age ${partnerEarlyRetirementAge}</strong>`;
        document.getElementById("earlyRetirementDbPensionAmountPartner").innerHTML = '<strong>£' + formatNumber(Math.round( dbPensionAmountPartner )) + '</strong>';

       
        if (applyInflationAdjustment)  { /*todays money values*/

           
                
            if (shortfallAtRetirement>0) {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Shortfall at Retirement = (b) - (a)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncome/12) - Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12)) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "red";
            } else {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Surplus at Retirement = (a) - (b)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12) - Math.round(frequencyMultiplier * desiredAnnualIncome/12)) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "#2ab811";
            }
            document.getElementById("inputsExpectedTotalIncome").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12)) + '</strong>';
            document.getElementById("inputsDesiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncome/12)) + '</strong>';
            
    
        }  else { /*not todays money values*/

            
            
            if (shortfallAtRetirement>0) {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Shortfall at Retirement = (b) - (a)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12) - Math.round(frequencyMultiplier * maxAffordableNetIncome/12)) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "red";
            } else {
                document.getElementById("inputsShortfallAtRetirementLabel").innerHTML = `<strong>Surplus at Retirement = (a) - (b)</strong>`;
                document.getElementById("inputsShortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * maxAffordableNetIncome/12) - Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12)) + '</strong>';
                document.getElementById("inputsShortfallAtRetirement").style.color = "#2ab811";
            }
            document.getElementById("inputsExpectedTotalIncome").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * maxAffordableNetIncome/12)) + '</strong>';
            document.getElementById("inputsDesiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12)) + '</strong>';
           
            
        }
      
    }


    
    function toggleInflationLinkedContributions(checkbox) {
    
        if (checkbox.id == 'inflationLinkedContributionSwitchPartner') {
            saveToLocalStorage('inflationLinkedContributionsPartner', checkbox.checked);
        }
        if (checkbox.id == 'inflationLinkedContributionSwitch') {
            saveToLocalStorage('inflationLinkedContributions', checkbox.checked);
        }
        if (checkbox.id == 'inflationLinkedISAContributionSwitch') {
            saveToLocalStorage('inflationLinkedISAContributions', checkbox.checked);
        }
        if (checkbox.id == 'inflationLinkedISAContributionSwitchPartner') {
            saveToLocalStorage('inflationLinkedISAContributionsPartner', checkbox.checked);
        }
        
        
        saveAndCalc();
    }


    function toggleAlreadyRetired(checkbox) {

        var currentStatePension = parseFloat(localStorage.getItem("statePension")) || 11976;
        var partnerCurrentStatePension = parseFloat(localStorage.getItem("partnerStatePension")) || 11976;

        saveToLocalStorage('alreadyRetired', checkbox.checked);
    
        // Define the containers related to contributions
        const contributionContainers = [
            'pensionContributionsContainer', 
            'ISAContributionsContainer',
            'retirementAgeContainer',
            'partnerRetirementAgeContainer',
            
            'partnerPensionContributionsContainer',
            'partnerISAContributionContainer',
            'pensionFundsAtRetirementContainer',
            'ISAsAtRetirementContainer',
            'TFCAmountContainer',
            'TFCAmountContainerPartner',
            'TFCAmountContainerPartner',
        ];
    
        const earlyRetirementContainers = [
            'earlyRetirementContainer',
            
        ]
    
        const earlyRetirementContainersPartner = [
            'partnerEarlyRetirementContainer',
            
        ]
    
        //TFCExplainerLabel

        //Set new max age
        const alreadyRetired = document.getElementById('alreadyRetiredSwitch').checked;
        
        if (alreadyRetired) {
            updateSliderLimits('currentAgeSlider',50,100);
        } else {
            updateSliderLimits('currentAgeSlider',20,75);
        }

        //State Pension
        var currentAge = parseInt(localStorage.getItem('currentAge'));
        var statePensionAge = getStatePensionAge(currentAge);
        const StatePensionContainer = document.getElementById('StatePensionContainer');
        if (StatePensionContainer) {

            if (alreadyRetired  && currentAge >= statePensionAge) {
                StatePensionContainer.classList.add('visible');
                StatePensionContainer.classList.remove('hidden');
                
                const statePensionSlider = document.getElementById('statePensionSlider');
                const statePensionOutput = document.getElementById('statePensionPhone');
                if (statePensionSlider && statePensionOutput) {
                    statePensionSlider.value = currentStatePension;
                    updateOutput('statePensionPhone', currentStatePension, 'currency'); // Format as currency
                }
            }
            else {
                StatePensionContainer.classList.add('hidden');
                StatePensionContainer.classList.remove('visible');
            }
            
        }

        // Partner's state pension
        var currentAgePartner = parseInt(localStorage.getItem('currentAgePartner'));
        statePensionAge = getStatePensionAge(currentAgePartner);
        const partnerStatePensionContainer = document.getElementById('partnerStatePensionContainer');
        if (partnerStatePensionContainer) {

            if (alreadyRetired  && currentAgePartner >= statePensionAge) {
                partnerStatePensionContainer.classList.add('visible');
                partnerStatePensionContainer.classList.remove('hidden');
                
                const partnerStatePensionSlider = document.getElementById('partnerStatePensionSlider');
                const partnerStatePensionOutput = document.getElementById('partnerStatePensionPhone');
                if (partnerStatePensionSlider && partnerStatePensionOutput) {
                    partnerStatePensionSlider.value = partnerCurrentStatePension;
                    updateOutput('partnerStatePensionPhone', partnerCurrentStatePension, 'currency'); // Format as currency
                }
            }
            else {
                partnerStatePensionContainer.classList.add('hidden');
                partnerStatePensionContainer.classList.remove('visible');
            }
            
        }
        
        

        // Function to hide/show elements
        function toggleContainer(id, shouldHide) {
            const container = document.getElementById(id);
            if (container) {
                container.classList.toggle('hidden', shouldHide);
            }
        }
    
        // Apply visibility toggle based on checkbox state
        contributionContainers.forEach(containerId => {
            toggleContainer(containerId, checkbox.checked);
        });
    
        
        const dbPensionAge = parseInt(localStorage.getItem('dbPensionAge')) || 0;
        if (currentAge >= dbPensionAge) {
            earlyRetirementContainers.forEach(containerId => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.classList.add('hidden');
                    container.classList.remove('visible');
                }
            });
        } else {
            earlyRetirementContainers.forEach(containerId => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.classList.add('visible');
                    container.classList.remove('hidden');
                }
            });
        }
    
       
        const dbPensionAgePartner = parseInt(localStorage.getItem('dbPensionAgePartner')) || 0;
        if (currentAgePartner >= dbPensionAgePartner) {
            earlyRetirementContainersPartner.forEach(containerId => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.classList.add('hidden');
                    container.classList.remove('visible');
                }
            });
        } else {
            earlyRetirementContainersPartner.forEach(containerId => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.classList.add('visible');
                    container.classList.remove('hidden');
                }
            });
        }
    
        saveAndCalc();
    }



    function togglePartnerColumn(checkbox) {
        const partnerElements = document.querySelectorAll('.partner-column');
        const userColumns = document.querySelectorAll('.user-column');
        const columnLabels = document.querySelectorAll('.column-label');
        
        
        const desiredIncomeSection = document.getElementById('desiredIncomeContainer');
        const combinedIncomeSection = document.getElementById('desiredCombinedIncomeContainer');
        
        const alreadyRetiredSwitch = document.getElementById('alreadyRetiredSwitch');
        
        // Toggle partner-specific elements with animations
        columnLabels.forEach(el => {
            if (checkbox.checked) {
                el.classList.remove('partner-hidden');
                el.classList.add('partner-visible');
            } else {
                el.classList.remove('partner-visible');
                el.classList.add('partner-hidden');
            }
        });

        if (checkbox.checked) {
            // Show partner columns
            partnerElements.forEach(el => el.classList.remove('partner-hidden'));
    
            partnerElements.forEach(col => {
                col.classList.remove('col-2');
                col.classList.add('col-0');
            });

        } else {
            // Hide partner columns
            partnerElements.forEach(el => el.classList.add('partner-hidden'));
    
            partnerElements.forEach(col => {
                col.classList.remove('col-0');
                col.classList.add('col-2');
            });

           
        }
        
    
        const partnerAccordionIds = [
            'partnerDefinedContributionInputsAccordion',
            'partnerDefinedBenefitInputsAccordion',
            'partnerISAInputsAccordion'
        ];
        const partnerCheckboxes = {
            partnerDefinedContributionInputsAccordion: 'showPartnerDefinedContributionPension',
            partnerDefinedBenefitInputsAccordion: 'showPartnerDefinedBenefitPension',
            partnerISAInputsAccordion: 'showPartnerISASavings'
        };
    
        // Toggle partner accordion sections with animations
        partnerAccordionIds.forEach(accordionId => {
            const accordion = document.getElementById(accordionId);
            const checkboxKey = partnerCheckboxes[accordionId];
            const isPartnerSpecificChecked = localStorage.getItem(checkboxKey) === 'true';
    
            if (accordion) {
                if (checkbox.checked && isPartnerSpecificChecked) {
                    accordion.classList.remove('d-none');
                } else {
                    accordion.classList.add('d-none');
                }
            } else {
                console.warn(`Accordion item with ID "${accordionId}" not found.`);
            }
        });
    
        // Toggle partner age and retirement age containers
        const partnerAgeContainer = document.getElementById('partnerAgeContainer');
        const partnerRetirementAgeContainer = document.getElementById('partnerRetirementAgeContainer');
        if (partnerAgeContainer && partnerRetirementAgeContainer) {
            if (checkbox.checked) {
                partnerAgeContainer.classList.remove('partner-hidden');
                partnerAgeContainer.classList.add('partner-visible');
                partnerRetirementAgeContainer.classList.remove('partner-hidden');
                partnerRetirementAgeContainer.classList.add('partner-visible');
            } else {
                partnerAgeContainer.classList.remove('partner-visible');
                partnerAgeContainer.classList.add('partner-hidden');
                partnerRetirementAgeContainer.classList.remove('partner-visible');
                partnerRetirementAgeContainer.classList.add('partner-hidden');
            }
        }
    
        // Check showPartnerDefinedBenefitPension checkbox and toggle partnerEarlyRetirementContainer
        const partnerEarlyRetirementContainer = document.getElementById('partnerEarlyRetirementContainer');
        const showPartnerDefinedBenefitCheckbox = document.getElementById('showPartnerDefinedBenefitPension');

        if (partnerEarlyRetirementContainer && showPartnerDefinedBenefitCheckbox) {
            if (showPartnerDefinedBenefitCheckbox.checked && !alreadyRetiredSwitch.checked) {
                partnerEarlyRetirementContainer.classList.remove('partner-visible');
                partnerEarlyRetirementContainer.classList.add('partner-hidden'); 
            } else {
                partnerEarlyRetirementContainer.classList.add('partner-hidden');
                partnerEarlyRetirementContainer.classList.remove('partner-visible');
                
            }
        }

        // Show/Hide Desired Income and Combined Income sections
        if (desiredIncomeSection && combinedIncomeSection) {
            if (checkbox.checked) {
                desiredIncomeSection.classList.add('partner-hidden');
                combinedIncomeSection.classList.remove('partner-hidden');
                combinedIncomeSection.classList.add('partner-visible');
            } else {
                desiredIncomeSection.classList.remove('partner-hidden');
                combinedIncomeSection.classList.remove('partner-visible');
                combinedIncomeSection.classList.add('partner-hidden');
            }
        }
    
        // Make parent divs of partner inputs hidden or visible
        const partnerInputsPensionFundAtRetirement = document.getElementById('partnerPensionFundAtRetirementContainer');
        const partnerInputsISAAtRetirement = document.getElementById('partnerISAAtRetirementContainer');
        const partnerTaxFreeCashPercent = document.getElementById('partnerTaxFreeCashPercentContainer');
    
        if (partnerInputsPensionFundAtRetirement) {
            if (checkbox.checked) {
                partnerInputsPensionFundAtRetirement.classList.remove('d-none');
            } else {
                partnerInputsPensionFundAtRetirement.classList.add('d-none');
            }
        }
    
        if (partnerInputsISAAtRetirement) {
            if (checkbox.checked) {
                partnerInputsISAAtRetirement.classList.remove('d-none');
            } else {
                partnerInputsISAAtRetirement.classList.add('d-none');
            }
        }

        if (partnerTaxFreeCashPercent) {
            if (checkbox.checked) {
                showElement(partnerTaxFreeCashPercent);
            } else {
                hideElement(partnerTaxFreeCashPercent);
            }
            
        }
    
        // Save the state to localStorage
        saveToLocalStorage('planAsCouple', checkbox.checked);
    }
    

    function showElement(el) {
        el.classList.remove('hidden');
        el.classList.add('visible');
    }
    function hideElement(el) {
        el.classList.remove('visible');
        el.classList.add('hidden');
    }


    function toggleCashISASection() {
        const cashISAInterestRateContainer = document.getElementById('cashISAInterestRateContainer');
        const ISAGrowthContainer = document.getElementById('ISAGrowthContainer');
        const ISAChargesContainer = document.getElementById('ISAChargesContainer');
        const planAsCouple =  (localStorage.getItem('planAsCouple') === 'true');

        const cashISACheckbox = document.getElementById('showCashISASavings');
        if (cashISACheckbox) {
            const isChecked = cashISACheckbox.checked;
            saveToLocalStorage('showCashISASavings', isChecked);
        }

        const partnerCashISACheckbox = document.getElementById('showPartnerCashISASavings');
        if (partnerCashISACheckbox) {
            const isChecked = partnerCashISACheckbox.checked;
            saveToLocalStorage('showPartnerCashISASavings', isChecked);
        }
    
        const isCashISAVisible = localStorage.getItem('showCashISASavings') === 'true';
        const isPartnerCashISAVisible = localStorage.getItem('showPartnerCashISASavings') === 'true'

        
        // Select the label element using its 'for' attribute
        const isaLabel = document.querySelector('label[for="currentISASlider"] > strong');
        const partnerIsaLabel = document.querySelector('label[for="partnerCurrentISASlider"] > strong');
        
        
        if (isCashISAVisible) {
            isaLabel.textContent = "Cash ISA Balance";
        } else {
            isaLabel.textContent = "ISA Holdings";
        }

        if (isPartnerCashISAVisible) {
            partnerIsaLabel.textContent = "Cash ISA Balance";
        } else {
            partnerIsaLabel.textContent = "ISA Holdings";
        }
        

        if (cashISAInterestRateContainer && ISAGrowthContainer && ISAChargesContainer) {
            // Determine visibility based on the checkbox's checked state
            
            
            if (planAsCouple) {
                if (isCashISAVisible && isPartnerCashISAVisible) {
                    // Show cashISAInterestRateContainer and hide ISAGrowthContainer and ISAChargesContainer
                    cashISAInterestRateContainer.classList.remove('hidden');
                    ISAGrowthContainer.classList.add('hidden');
                    ISAChargesContainer.classList.add('hidden');
                    //saveToLocalStorage('isaGrowth', 0);
                    //saveToLocalStorage('isaCharges', 0);
                    initialiseInputAndSlider('isaGrowthPercentPhone', 'isaGrowth', 'isaGrowthSlider', 'percentage');
                    initialiseInputAndSlider('isaChargesPercentPhone', 'isaCharges', 'isaChargesSlider', 'percentage');
                } else if (isCashISAVisible && !isPartnerCashISAVisible || !isCashISAVisible && isPartnerCashISAVisible) {
                    // Need both interest and growth inputs
                    cashISAInterestRateContainer.classList.remove('hidden');
                    ISAGrowthContainer.classList.remove('hidden');
                    ISAChargesContainer.classList.remove('hidden');
                } else {
                    // Hide cashISAInterestRateContainer and show ISAGrowthContainer and ISAChargesContainer
                    cashISAInterestRateContainer.classList.add('hidden');
                    //saveToLocalStorage('isaInterestRate', 0);
                    ISAGrowthContainer.classList.remove('hidden');
                    ISAChargesContainer.classList.remove('hidden');
                    initialiseInputAndSlider('isaInterestRatePercentPhone', 'isaInterestRate', 'isaInterestRateSlider', 'percentage');
                }
            } else {
                if (isCashISAVisible) {
                    // Show cashISAInterestRateContainer and hide ISAGrowthContainer and ISAChargesContainer
                    cashISAInterestRateContainer.classList.remove('hidden');
                    ISAGrowthContainer.classList.add('hidden');
                    ISAChargesContainer.classList.add('hidden');
                    //saveToLocalStorage('isaGrowth', 0);
                    //saveToLocalStorage('isaCharges', 0);
                    initialiseInputAndSlider('isaGrowthPercentPhone', 'isaGrowth', 'isaGrowthSlider', 'percentage');
                    initialiseInputAndSlider('isaChargesPercentPhone', 'isaCharges', 'isaChargesSlider', 'percentage');
                } else {
                    // Hide cashISAInterestRateContainer and show ISAGrowthContainer and ISAChargesContainer
                    cashISAInterestRateContainer.classList.add('hidden');
                    //saveToLocalStorage('isaInterestRate', 0);
                    ISAGrowthContainer.classList.remove('hidden');
                    ISAChargesContainer.classList.remove('hidden');
                    initialiseInputAndSlider('isaInterestRatePercentPhone', 'isaInterestRate', 'isaInterestRateSlider', 'percentage');
                }
            }
            
        }

        //saveAndCalc();
    }

    
    function adjustERF(id, adjustment, event) {
        // Prevent the button's default behaviour (like submitting forms)
        if (event) event.preventDefault();
    
        const outputElement = document.getElementById(id);
        if (!outputElement) {
            console.error(`No element found with ID: ${id}`);
            return;
        }
        let currentValue = parseFloat(outputElement.textContent.replace('%', ''));
        currentValue = Math.max(0, currentValue + adjustment); // Prevent negative values
        outputElement.textContent = currentValue.toFixed(1) + '%';
        saveAndCalc();
    }


    // 1. The full lookup table, read directly from the image.
//    Keys are factorTable[age][NPA] = reductionFactor.
const earlyRetirementFactorTable = {
    50: {75:0.367,74:0.389,73:0.411,72:0.433,71:0.456,70:0.480,69:0.503,68:0.527,67:0.551,66:0.575,65:0.600,64:0.624,63:0.650,62:0.675,61:0.701,60:0.727,59:0.754,58:0.781,57:0.807,56:0.834,55:0.862,54:0.890,53:0.918,52:0.946,51:0.974,50:1.000},51: {75:0.376,74:0.398,73:0.421,72:0.444,71:0.468,70:0.492,69:0.516,68:0.540,67:0.565,66:0.590,65:0.615,64:0.641,63:0.667,62:0.694,61:0.721,60:0.748,59:0.775,58:0.803,57:0.830,56:0.858,55:0.887,54:0.916,53:0.944,52:0.973,51:1.000},52: {75:0.385,74:0.408,73:0.432,72:0.456,71:0.480,70:0.504,69:0.529,68:0.554,67:0.580,66:0.606,65:0.633,64:0.659,63:0.686,62:0.714,61:0.741,60:0.770,59:0.798,58:0.826,57:0.855,56:0.884,55:0.913,54:0.942,53:0.972,52:1.000},53: {75:0.395,74:0.419,73:0.443,72:0.468,71:0.493,70:0.518,69:0.544,68:0.570,67:0.597,66:0.624,65:0.651,64:0.678,63:0.707,62:0.735,61:0.764,60:0.792,59:0.821,58:0.851,57:0.881,56:0.911,55:0.941,54:0.971,53:1.000},54: {75:0.406,74:0.431,73:0.456,72:0.481,71:0.507,70:0.533,69:0.560,68:0.587,67:0.614,66:0.642,65:0.670,64:0.699,63:0.728,62:0.758,61:0.787,60:0.817,59:0.847,58:0.878,57:0.909,56:0.939,55:0.971,54:1.000},55: {75:0.418,74:0.443,73:0.469,72:0.495,71:0.522,70:0.549,69:0.576,68:0.605,67:0.633,66:0.662,65:0.692,64:0.721,63:0.752,62:0.782,61:0.812,60:0.843,59:0.875,58:0.906,57:0.938,56:0.970,55:1.000},56: {75:0.429,74:0.455,73:0.482,72:0.509,71:0.537,70:0.565,69:0.594,68:0.623,67:0.653,66:0.683,65:0.714,64:0.745,63:0.776,62:0.807,61:0.839,60:0.871,59:0.904,58:0.936,57:0.969,56:1.000},57: {75:0.441,74:0.468,73:0.496,72:0.525,71:0.553,70:0.583,69:0.613,68:0.643,67:0.674,66:0.706,65:0.738,64:0.770,63:0.802,62:0.834,61:0.868,60:0.901,59:0.934,58:0.968,57:1.000},58: {75:0.455,74:0.483,73:0.512,72:0.541,71:0.572,70:0.602,69:0.633,68:0.665,67:0.697,66:0.730,65:0.763,64:0.796,63:0.830,62:0.864,61:0.898,60:0.932,59:0.967,58:1.000},59: {75:0.469,74:0.499,73:0.529,72:0.560,71:0.591,70:0.623,69:0.655,68:0.689,67:0.722,66:0.756,65:0.790,64:0.825,63:0.860,62:0.895,61:0.930,60:0.966,59:1.000},60: {75:0.485,74:0.516,73:0.547,72:0.579,71:0.612,70:0.645,69:0.679,68:0.714,67:0.749,66:0.783,65:0.819,64:0.855,63:0.892,62:0.928,61:0.965,60:1.000},61: {75:0.502,74:0.534,73:0.567,72:0.601,71:0.635,70:0.670,69:0.705,68:0.741,67:0.777,66:0.814,65:0.851,64:0.888,63:0.926,62:0.964,61:1.000},62: {75:0.521,74:0.554,73:0.588,72:0.624,71:0.659,70:0.696,69:0.733,68:0.770,67:0.808,66:0.846,65:0.885,64:0.923,63:0.962,62:1.000},63: {75:0.541,74:0.576,73:0.612,72:0.649,71:0.686,70:0.724,69:0.762,68:0.801,67:0.841,66:0.881,65:0.920,64:0.961,63:1.000},64: {75:0.563,74:0.599,73:0.637,72:0.676,71:0.715,70:0.754,69:0.794,68:0.835,67:0.876,66:0.918,65:0.960,64:1.000},65: {75:0.586,74:0.625,73:0.665,72:0.705,71:0.745,70:0.787,69:0.829,68:0.872,67:0.915,66:0.958,65:1.000},66: {75:0.612,74:0.653,73:0.694,72:0.736,71:0.779,70:0.823,69:0.867,68:0.911,67:0.956,66:1.000},67: {75:0.641,74:0.683,73:0.727,72:0.771,71:0.816,70:0.862,69:0.908,68:0.955,67:1.000},68: {75:0.672,74:0.716,73:0.762,72:0.809,71:0.856,70:0.904,69:0.953,68:1.000},69: {75:0.706,74:0.753,73:0.802,72:0.851,71:0.900,70:0.951,69:1.000},70: {75:0.743,74:0.793,73:0.844,72:0.896,71:0.948,70:1.000},71: {75:0.785,74:0.838,73:0.891,72:0.946,71:1.000},72: {75:0.830,74:0.886,73:0.944,72:1.000},73: {75:0.881,74:0.941,73:1.000},74: {75:0.938,74:1.000},75: {75:1.000}
      };
  
  // 2. The function to get the 1-to-13-year-early factors for a given NPA.
  function getEarlyRetFactors(npa) {
    const results = [];
    // We want factors for (NPA - 1) down to (NPA - 13), if available.
    for (let i = 1; i <= 13; i++) {
      const earlyAge = npa - i;
      // If earlyAge < 50, the table has no entry (below the minimum age).
      if (earlyAge < 50) {
        results.push(null);
      } else {
        // Look up factorTable[earlyAge][npa], or null if missing.
        const val = earlyRetirementFactorTable[earlyAge]?.[npa];
        results.push(val === undefined ? null : val);
      }
    }
    return results;
  }
  
  function populateERFOutputs(npa, type = null) {
    // Get the 13 early retirement factors
    const factors = getEarlyRetFactors(npa);

    for (let i = 1; i <= 13; i++) {
        // Determine the correct element ID (default or partner-specific)
        const suffix = type === 'partner' ? `partnerERF${i}` : `ERF${i}`;
        const outEl = document.getElementById(suffix);

        if (!outEl) continue; // Skip if element does not exist

        const factor = factors[i - 1];

        if (factor === null) {
            outEl.textContent = '-'; // If no factor, show a dash
        } else {
            outEl.textContent = ((1-factor) * 100).toFixed(1) + '%'; // Show as percentage
        }
    }
}



// Toggle display for the user's percentage contribution inputs
function togglePercentageContribution(switchElement) {
    const isChecked = switchElement.checked;
    saveToLocalStorage('percentageContributionSwitch', isChecked);

    const inputContainer = document.getElementById('percentageContributionInputs');
    if (inputContainer) {
        inputContainer.style.display = isChecked ? 'block' : 'none';
    }

    saveAndCalc();
}
  
 
function togglePartnerPercentageContribution(switchElement) {
    const isChecked = switchElement.checked;
    saveToLocalStorage('partnerPercentageContributionSwitch', isChecked);

    const inputContainer = document.getElementById('partnerPercentageContributionInputs');
    if (inputContainer) {
        inputContainer.style.display = isChecked ? 'block' : 'none';
    }

    saveAndCalc();
}
  
  

  function updateMonthlyContributionFromPercentage() {
    // Retrieve the salary and percentage values from the new sliders
    const salary = parseFloat(document.getElementById('salarySlider').value) || 0;
    const percentage = parseFloat(document.getElementById('salaryPercentSlider').value) || 0;
    
    // Calculate the monthly contribution: (salary * (percentage/100)) / 12
    const monthlyContribution = Math.round((salary * (percentage / 100)) / 12);
    
    // Update the monthly contributions slider
    const slider = document.getElementById('monthlyPensionContributionsSlider');
    if (slider) {
        slider.value = monthlyContribution;
    }
    
    // Update the output using your existing formatting function
    updateOutput('monthlyPensionContributionsPhone', monthlyContribution, 'currency');
    saveAndCalc();
}

function updatePartnerMonthlyContributionFromPercentage() {
    // Retrieve the partner's salary and percentage values from the new partner sliders
    const salary = parseFloat(document.getElementById('partnerSalarySlider').value) || 0;
    const percentage = parseFloat(document.getElementById('partnerSalaryPercentSlider').value) || 0;
    
    // Calculate the partner's monthly contribution
    const monthlyContribution = Math.round((salary * (percentage / 100)) / 12);
    
    // Update the partner's monthly contributions slider (assuming its id is 'partnerMonthlyContributionsSlider')
    const slider = document.getElementById('partnerMonthlyContributionsSlider');
    if (slider) {
        slider.value = Math.round(monthlyContribution);
    }
    
    // Update the partner's output display
    updateOutput('partnerMonthlyContributionPhone', monthlyContribution, 'currency');
    saveAndCalc();
}