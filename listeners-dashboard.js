// Function to save inputs and calculate
function saveAndCalc(incomeType = null) {
    // First process the selected retirement income option
    /*  restoreSelectedRetirementIncomeStandardOption(); */
    // initialiseLocalStorageValues();
    saveInputsToLocalStoragePhone();
    const planAsCouple =  (localStorage.getItem('planAsCouple') === 'true');

    if (incomeType === null) {
        const chartSelector = localStorage.getItem('selectedChart');
        if (chartSelector === 'Your' || chartSelector === 'Partner') {
            incomeType = chartSelector;
        }
    }
    //incomeType = localStorage.getItem('selectedChart');
    

    calculateMyPension(planAsCouple, incomeType);
    
    
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
        { elementId: 'retirementAgePhone', storageKey: 'retirementAge' },
        { elementId: 'inputTaxFreeCashPercentPhone', storageKey: 'taxFreeCashPercent' },
        { elementId: 'fundGrowthPercentPhone', storageKey: 'fundGrowthPre' },
        { elementId: 'isaGrowthPercentPhone', storageKey: 'isaGrowth' },
        { elementId: 'fundGrowthPostPercentPhone', storageKey: 'fundGrowthPost' },
        { elementId: 'inflationPercentPhone', storageKey: 'inflation' },
        { elementId: 'fundChargesPercentPhone', storageKey: 'fundCharges' },
        { elementId: 'isaChargesPercentPhone', storageKey: 'isaCharges' }, 
        { elementId: 'endAgePhone', storageKey: 'endAge' },
        { elementId: 'marketCrashAgePhone', storageKey: 'marketCrashAge' },
        { elementId: 'marketCrashPercentPhone', storageKey: 'marketCrashPercent' },
        { elementId: 'minimumISABalancePhone', storageKey: 'minISABalance' },
        { elementId: 'finalFundTargetPhone', storageKey: 'finalFund' },
        { elementId: 'contributionIncreaseAgePhone', storageKey: 'stepUpAge' },
        { elementId: 'additionalContributionPhone', storageKey: 'stepUpContribution' },
        { elementId: 'isaPriorityPhone', storageKey: 'isaPriority' },
        { elementId: 'isaInterestRatePercentPhone', storageKey: 'isaInterestRate' },
        { elementId: 'earlyRetirementAgePhone', storageKey: 'earlyRetirementAge' },
        { elementId: 'earlyRetirementDbPensionAmount', storageKey: 'earlyRetirementDbPensionAmount' },
        { elementId: 'baseWithdrawalPhone', storageKey: 'baseWithdrawal' },
        { elementId: 'pensionPercentPhone', storageKey: 'pensionPercentage' },
        { elementId: 'incomeStepAge1Phone', storageKey: 'incomeStepAge1' },
        { elementId: 'incomeStep1PercentPhone', storageKey: 'incomeStepPercent1' },
        { elementId: 'incomeStepAge2Phone', storageKey: 'incomeStepAge2' },
        { elementId: 'incomeStep2PercentPhone', storageKey: 'incomeStepPercent2' },
        { elementId: 'ISAContributionIncreaseAgePhone', storageKey: 'stepUpAgeISA' },
        { elementId: 'additionalISAContributionPhone', storageKey: 'stepUpContributionISA' },
        { elementId: 'salaryPhone', storageKey: 'userSalary' },
        { elementId: 'salaryPercentPhone', storageKey: 'userSalaryPercent' },
        { elementId: 'annuityAgePhone', storageKey: 'annuityAge' },
        { elementId: 'fundConversionPercentPhone', storageKey: 'fundConversion' }
       
    ];

    const partnerInputs = [
        { elementId: 'partnerAgePhone', storageKey: 'currentAgePartner' },
        { elementId: 'partnerCurrentFundPhone', storageKey: 'currentFundPartner' },
        { elementId: 'partnerMonthlyContributionPhone', storageKey: 'monthlyContributionPartner' },
        { elementId: 'partnerCurrentISAPhone', storageKey: 'currentISAPartner' },
        { elementId: 'partnerMonthlyISAContributionPhone', storageKey: 'monthlyISAContributionPartner' },
        { elementId: 'partnerDbPensionAmountPhone', storageKey: 'dbPensionAmountPartner' },
        { elementId: 'partnerDbRetirementAgePhone', storageKey: 'dbPensionAgePartner' },
        { elementId: 'inputDesiredCombinedIncomePhone', storageKey: 'desiredCombinedIncome' },
        { elementId: 'partnerContributionIncreaseAgePhone', storageKey: 'stepUpAgePartner' },
        { elementId: 'partnerAdditionalContributionPhone', storageKey: 'stepUpContributionPartner' },
        { elementId: 'partnerEarlyRetirementAgePhone', storageKey: 'partnerEarlyRetirementAge' },
        { elementId: 'earlyRetirementDbPensionAmountPartner', storageKey: 'earlyRetirementDbPensionAmountPartner' },
        { elementId: 'partnerMinimumISABalancePhone', storageKey: 'minISABalancePartner' },
        { elementId: 'inputPartnerTaxFreeCashPercentPhone', storageKey: 'taxFreeCashPercentPartner' },
        { elementId: 'baseWithdrawalPhone', storageKey: 'baseWithdrawalPartner' },
        { elementId: 'pensionPercentPhone', storageKey: 'pensionPercentagePartner' },
        { elementId: 'partnerISAContributionIncreaseAgePhone', storageKey: 'stepUpAgePartnerISA' },
        { elementId: 'partnerAdditionalISAContributionPhone', storageKey: 'stepUpContributionPartnerISA' },
        { elementId: 'partnerIncomeStepAge1Phone', storageKey: 'partnerIncomeStepAge1' },
        { elementId: 'partnerIncomeStep1PercentPhone', storageKey: 'partnerIncomeStepPercent1' },
        { elementId: 'partnerIncomeStepAge2Phone', storageKey: 'partnerIncomeStepAge2' },
        { elementId: 'partnerIncomeStep2PercentPhone', storageKey: 'partnerIncomeStepPercent2' },
        { elementId: 'partnerSalaryPhone', storageKey: 'partnerSalary' },
        { elementId: 'partnerSalaryPercentPhone', storageKey: 'partnerSalaryPercent' },
        { elementId: 'partnerAnnuityAgePhone', storageKey: 'annuityAgePartner' },
        { elementId: 'partnerFundConversionPercentPhone', storageKey: 'fundConversionPartner' },
       
    ];

    // Iterate over inputs and save their raw values
    inputs.forEach(({ elementId, storageKey }) => {
        const element = document.getElementById(elementId);
        if (element) {
            const rawValue = getRawValueFromText(element.value || element.textContent);
            saveToLocalStorage(storageKey, rawValue);
        }
    });

    //Partner related inputs
    partnerInputs.forEach(({ elementId, storageKey }) => {
        const element = document.getElementById(elementId);
        if (element) {
            const rawValue = getRawValueFromText(element.value || element.textContent);
            saveToLocalStorage(storageKey, rawValue);
        }
    });

    // Save checkboxes
    const useScottishTaxPhone = document.getElementById('useScottishTaxPhone');
    if (useScottishTaxPhone) {
        const isChecked = useScottishTaxPhone.checked;
        saveToLocalStorage('useScottishTax', isChecked);
    }

    const alreadyRetiredSwitch = document.getElementById('alreadyRetiredSwitch');
    if (alreadyRetiredSwitch) {
        const isChecked = alreadyRetiredSwitch.checked;
        saveToLocalStorage('alreadyRetired', isChecked);
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

    const planAsCoupleSwitch = document.getElementById('planAsCoupleSwitch');
    if (planAsCoupleSwitch) {
        localStorage.setItem('planAsCouple', planAsCoupleSwitch.checked);
    } else {
        console.warn('planAsCouple element is missing.');
    }
}

// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('input');

document.addEventListener('DOMContentLoaded', function() {
   
    const isRightColumnVisible = localStorage.getItem('isRightColumnVisible') === 'true'; //Redundant atm
    
    if (isRightColumnVisible) {
        //toggleRightColumn(); 
    }
    
    initialiseLocalStorageValues();
    initialiseInitialInputsAndCheckboxesPhone();

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

    const applyMarketCrashSwitch = document.getElementById('applyMarketCrashSwitch');
    if (applyMarketCrashSwitch) {
        applyMarketCrashSwitch.addEventListener('change', function () {
            toggleMarketCrash(this);
        });
    }

    const planAsCoupleSwitch = document.getElementById('planAsCoupleSwitch');
    if (planAsCoupleSwitch) {
        // Set initial dropdowns based on saved state
        const isPlanAsCouple = localStorage.getItem('planAsCouple') === 'true';
        planAsCoupleSwitch.checked = isPlanAsCouple;
        updateDropdowns(isPlanAsCouple);

        // Add event listener to update dropdowns when toggled
        planAsCoupleSwitch.addEventListener('change', function () {
            const newState = this.checked;
            localStorage.setItem('planAsCouple', newState);
            updateDropdowns(newState);
            
        });
    } 
   
    // Uncomment this to fix the right column as visible for debugging
    //toggleRightColumn();
    
    
    restoreSelectedRetirementIncomeStandardOption();
    updateAccordionVisibility();
    togglePartnerInputs(planAsCoupleSwitch);
    toggleAlreadyRetired(alreadyRetiredSwitch);
    
    
});






function updateDropdowns(isPlanAsCouple) {
    const chartSelector = document.getElementById('chartSelector');
    const tableSelector = document.getElementById('tableSelector');

    // Clear current options
    chartSelector.innerHTML = '';
    tableSelector.innerHTML = '';

    if (isPlanAsCouple) {
        // Add options for Plan As A Couple (true)
        chartSelector.innerHTML = `
            <option value="Income">Combined Income Breakdown</option>
            <option value="Your">Your Individual Income Breakdown</option>
            <option value="Partner">Your Partner's Income Breakdown</option>
            <option value="Fund">Fund Values</option>
            <option value="Tax">Combined Tax Payments</option>
            <option value="Charges">Combined Fund Charges</option>
        `;

        tableSelector.innerHTML = `
            <option value="retirementIncome">Combined Retirement Income</option>
            <option value="yourRetirementIncome">Your Retirement Income</option>
            <option value="partnerRetirementIncome">Your Partner's Retirement Income</option>
            <option value="pensionFundCashflow">Combined Pension Fund Cashflow</option>
            <option value="ISACashflow">Combined ISA Cashflow</option>
        `;
    } else {
        // Add options for Single Plan (false)
        chartSelector.innerHTML = `
          
            <option value="Income" selected>Income Breakdown</option>
            <option value="Fund">Fund Values</option>
            <option value="Tax">Tax Payments</option>
            <option value="Charges">Fund Charges</option>
        `;

        tableSelector.innerHTML = `
            <option value="retirementIncome">Retirement Income</option>
            <option value="pensionFundCashflow">Pension Fund Cashflow</option>
            <option value="ISACashflow">ISA Cashflow</option>
        `;
    }

    updateChartVisibility('notDropDown');
    updateTableVisibility();
}

function saveToLocalStorage(key, value) {
    if (value === null || value === undefined) {
        localStorage.removeItem(key); // Remove the key if the value is null or undefined
    } else {
        localStorage.setItem(key, typeof value === "boolean" ? value.toString() : value.toString());
    }
}

function initialiseInitialInputsAndCheckboxesPhone() {
    // Process each input separately
    

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
    initialiseInputAndSlider('baseWithdrawalPhone', 'baseWithdrawal', 'baseWithdrawalSlider', 'currency');
    initialiseInputAndSlider('additionalISAContributionPhone', 'stepUpContributionISA', 'additionalISAContributionSlider', 'currency');
    initialiseInputAndSlider('partnerAdditionalISAContributionPhone', 'stepUpContributionPartnerISA', 'partnerAdditionalISAContributionSlider', 'currency');
    initialiseInputAndSlider('salaryPhone', 'userSalary', 'salarySlider', 'currency');
    initialiseInputAndSlider('partnerSalaryPhone', 'partnerSalary', 'partnerSalarySlider', 'currency');
    initialiseInputAndSlider('annuityAgePhone', 'annuityAge', 'annuityAgeSlider');

    // Percentage values
    initialiseInputAndSlider('inputTaxFreeCashPercentPhone', 'taxFreeCashPercent', 'taxFreeCashSlider', 'percentage');
    initialiseInputAndSlider('fundGrowthPercentPhone', 'fundGrowthPre', 'fundGrowthSlider', 'percentage');
    initialiseInputAndSlider('fundGrowthPostPercentPhone', 'fundGrowthPost', 'fundGrowthPostSlider', 'percentage');
    initialiseInputAndSlider('inflationPercentPhone', 'inflation', 'inflationSlider', 'percentage');
    initialiseInputAndSlider('fundChargesPercentPhone', 'fundCharges', 'fundChargesSlider', 'percentage');
    initialiseInputAndSlider('isaChargesPercentPhone', 'isaCharges', 'isaChargesSlider', 'percentage'); 
    initialiseInputAndSlider('marketCrashPercentPhone', 'marketCrashPercent', 'marketCrashPercentSlider', 'percentage');
    initialiseInputAndSlider('isaPriorityPhone', 'isaPriority', 'isaPrioritySlider', 'percentage');
    initialiseInputAndSlider('earlyRetirementFactorPercentPhone', 'dbEarlyRetirementFactor', 'earlyRetirementFactorSlider', 'percentage');
    initialiseInputAndSlider('lateRetirementFactorPercentPhone', 'dbLateRetirementFactor', 'lateRetirementFactorSlider', 'percentage');
    initialiseInputAndSlider('partnerEarlyRetirementFactorPercentPhone', 'partnerDbEarlyRetirementFactor', 'partnerEarlyRetirementFactorSlider', 'percentage');
    initialiseInputAndSlider('partnerLateRetirementFactorPercentPhone', 'partnerDbLateRetirementFactor', 'partnerLateRetirementFactorSlider', 'percentage');
    initialiseInputAndSlider('isaInterestRatePercentPhone', 'isaInterestRate', 'isaInterestRateSlider', 'percentage');
    initialiseInputAndSlider('isaGrowthPercentPhone', 'isaGrowth', 'isaGrowthSlider', 'percentage');
    initialiseInputAndSlider('isaChargesPercentPhone', 'isaCharges', 'isaChargesSlider', 'percentage');
    initialiseInputAndSlider('pensionPercentPhone', 'pensionPercentage', 'pensionPercentageSlider', 'percentage');
    initialiseInputAndSlider('incomeStep1PercentPhone', 'incomeStepPercent1', 'incomeStepPercent1Slider', 'percentage');
    initialiseInputAndSlider('incomeStep2PercentPhone', 'incomeStepPercent2', 'incomeStepPercent2Slider', 'percentage');
    initialiseInputAndSlider('partnerIncomeStep1PercentPhone', 'partnerIncomeStepPercent1', 'partnerIncomeStepPercent1Slider', 'percentage');
    initialiseInputAndSlider('partnerIncomeStep2PercentPhone', 'partnerIncomeStepPercent2', 'partnerIncomeStepPercent2Slider', 'percentage');
    initialiseInputAndSlider('salaryPercentPhone', 'userSalaryPercent', 'salaryPercentSlider', 'percentage');
    initialiseInputAndSlider('partnerSalaryPercentPhone', 'partnerSalaryPercent', 'partnerSalaryPercentSlider', 'percentage');
    initialiseInputAndSlider('fundConversionPercentPhone', 'fundConversion', 'fundConversionSlider', 'percentage');


    
    // Age and other numeric values
    initialiseInputAndSlider('currentAgePhone', 'currentAge', 'currentAgeSlider');
    initialiseInputAndSlider('dbPensionAgePhone', 'dbPensionAge', 'dbPensionAgeSlider');
    initialiseInputAndSlider('endAgePhone', 'endAge', 'endAgeSlider');
    initialiseInputAndSlider('marketCrashAgePhone', 'marketCrashAge', 'marketCrashAgeSlider');
    initialiseInputAndSlider('contributionIncreaseAgePhone', 'stepUpAge', 'contributionIncreaseAgeSlider');
    initialiseInputAndSlider('retirementAgePhone', 'retirementAge', 'retirementAgeSlider');
    initialiseInputAndSlider('partnerAgePhone', 'currentAgePartner', 'partnerAgeSlider');
    initialiseInputAndSlider('earlyRetirementAgePhone', 'earlyRetirementAge', 'earlyRetirementAgeSlider');
    initialiseInputAndSlider('partnerEarlyRetirementAgePhone', 'partnerEarlyRetirementAge', 'partnerEarlyRetirementAgeSlider');
    initialiseInputAndSlider('incomeStepAge1Phone', 'incomeStepAge1', 'incomeStepAge1Slider', 'plain');
    initialiseInputAndSlider('incomeStepAge2Phone', 'incomeStepAge2', 'incomeStepAge2Slider', 'plain');
    initialiseInputAndSlider('partnerIncomeStepAge1Phone', 'partnerIncomeStepAge1', 'partnerIncomeStepAge1Slider', 'plain');
    initialiseInputAndSlider('partnerIncomeStepAge2Phone', 'partnerIncomeStepAge2', 'partnerIncomeStepAge2Slider', 'plain');
    initialiseInputAndSlider('ISAContributionIncreaseAgePhone', 'stepUpAgeISA', 'ISAContributionIncreaseAgeSlider', 'plain');
    initialiseInputAndSlider('partnerISAContributionIncreaseAgePhone', 'stepUpAgePartnerISA', 'partnerISAContributionIncreaseAgeSlider', 'plain');

    const dbPensionAge = localStorage.getItem('dbPensionAge');
    const dbPensionAgePartner = localStorage.getItem('dbPensionAgePartner');
    
    updateSliderLimits('earlyRetirementAgeSlider',dbPensionAge-13,dbPensionAge);
    updateSliderLimits('partnerEarlyRetirementAgeSlider',dbPensionAgePartner-13,dbPensionAgePartner);

    
    
    
    // Partner Defined Contribution Pension Inputs
    initialiseInputAndSlider('partnerCurrentFundPhone', 'currentFundPartner', 'partnerCurrentFundSlider', 'currency');
    initialiseInputAndSlider('partnerMonthlyContributionPhone', 'monthlyContributionPartner', 'partnerMonthlyContributionSlider', 'currency');
    initialiseInputAndSlider('partnerFundGrowthPercentPhone', 'partnerFundGrowth', 'partnerFundGrowthSlider', 'percentage');
    initialiseInputAndSlider('partnerFundChargesPercentPhone', 'partnerFundCharges', 'partnerFundChargesSlider', 'percentage');
    initialiseInputAndSlider('partnerContributionIncreaseAgePhone', 'partnerStepUpAge', 'partnerContributionIncreaseAgeSlider');
    initialiseInputAndSlider('partnerAdditionalContributionPhone', 'partnerStepUpContribution', 'partnerAdditionalContributionSlider', 'currency');
    initialiseInputAndSlider('partnerMinimumISABalancePhone', 'minISABalancePartner', 'partnerMinimumISABalanceSlider', 'currency');
    initialiseInputAndSlider('inputPartnerTaxFreeCashPercentPhone', 'taxFreeCashPercentPartner', 'partnerTaxFreeCashSlider', 'percentage');
    initialiseInputAndSlider('partnerAnnuityAgePhone', 'annuityAgePartner', 'partnerAnnuityAgeSlider');
    initialiseInputAndSlider('partnerFundConversionPercentPhone', 'fundConversionPartner', 'partnerFundConversionSlider', 'percentage');

    // Partner Defined Benefit Pension Inputs
    initialiseInputAndSlider('partnerDbPensionAmountPhone', 'dbPensionAmountPartner', 'partnerAnnualPensionSlider', 'currency');
    initialiseInputAndSlider('partnerDbRetirementAgePhone', 'dbPensionAgePartner', 'partnerRetirementAgeSlider');

    // Partner ISA Savings Inputs
    initialiseInputAndSlider('partnerCurrentISAPhone', 'currentISAPartner', 'partnerCurrentISASlider', 'currency');
    initialiseInputAndSlider('partnerMonthlyISAContributionPhone', 'monthlyISAContributionPartner', 'partnerMonthlyISAContributionSlider', 'currency');

    // Combined Income
    initialiseInputAndSlider('inputDesiredCombinedIncomePhone',  'desiredCombinedIncome',   'desiredCombinedIncomeSlider',    'currency' );

    // Set checkboxes
    const useScottishTaxPhone = document.getElementById('useScottishTaxPhone');
    if (useScottishTaxPhone) {
        useScottishTaxPhone.checked = localStorage.getItem('useScottishTax') === 'true';
    } else {
        console.warn('useScottishTaxPhone element is missing.');
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
    } else {
        console.warn('planAsCouple element is missing.');
    }

    const applyMarketCrashSwitch = document.getElementById('applyMarketCrashSwitch');
    if (applyMarketCrashSwitch) {
        const marketCrashPercent = parseInt(localStorage.getItem('marketCrashPercent')) || 0;
        applyMarketCrashSwitch.checked = (marketCrashPercent === 25);
    }

    const inflationLinkedContributionSwitch = document.getElementById('inflationLinkedContributionSwitch');
    if (inflationLinkedContributionSwitch) {
        inflationLinkedContributionSwitch.checked = localStorage.getItem('inflationLinkedContributions') === 'true';
    }

    const inflationLinkedContributionSwitchPartner = document.getElementById('inflationLinkedContributionSwitchPartner');
    if (inflationLinkedContributionSwitchPartner) {
        inflationLinkedContributionSwitchPartner.checked = localStorage.getItem('inflationLinkedContributionsPartner') === 'true';
    }

    toggleCashISASection();

    
}

function initialiseInputAndSlider(inputId, localStorageKey, sliderId, formatType) {
    const inputElement = document.getElementById(inputId);
    const sliderElement = document.getElementById(sliderId);
    const storedValue = localStorage.getItem(localStorageKey);
    const value = storedValue !== null ? storedValue : inputElement?.value || sliderElement?.min || '0';

    // Update input field if it exists
    if (inputElement) {
        inputElement.value = value; // Update the input element's value
        if (inputElement.tagName.toLowerCase() === 'output') {
            inputElement.textContent = formatNumber(value, formatType); // Update the display for output elements
        }
    }

    // Update slider if it exists
    if (sliderElement) {
        sliderElement.value = value;
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

            // Update the associated slider
            const slider = isPlanAsCouple
                ? document.getElementById("desiredCombinedIncomeSlider")
                : document.getElementById("desiredIncomeSlider");

            const output = isPlanAsCouple
                ? document.getElementById("inputDesiredCombinedIncomePhone")
                : document.getElementById("inputDesiredIncomePhone");

            if (slider && output) {
                let values = isPlanAsCouple
                    ? {
                          Minimum: parseInt(22400 / 12 ),
                          Moderate: parseInt(43100 / 12 ),
                          Comfortable: parseInt(59000 / 12 ),
                      }
                    : {
                          Minimum: parseInt(14400 / 12 ),
                          Moderate: parseInt(31300 / 12 ),
                          Comfortable: parseInt(43100 / 12 ),
                      };

                let newValue;
                switch (selectedOption) {
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
                        console.warn(`Unknown option selected: ${selectedOption}`);
                        return;
                }

                // Update slider and output
                slider.value = newValue;
                output.value = newValue;
                output.textContent = formatNumber(newValue, 'currency');

                if (isPlanAsCouple) {
                    initialiseInputAndSlider('inputDesiredCombinedIncomePhone',  'desiredCombinedIncome',   'desiredCombinedIncomeSlider',    'currency' );
                } else {
                    initialiseInputAndSlider('inputDesiredIncomePhone', 'desiredIncome', 'desiredIncomeSlider', 'currency');
                }
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

        if (outputId == 'inputMonthlyContributionPhone') {
            const maxAnnualPensionContribution = 60000;
            updateSliderLimits('additionalContributionSlider',0,maxAnnualPensionContribution/12-value)
        }

        if (outputId == 'dbPensionAgePhone') {
            toggleAlreadyRetired(alreadyRetiredSwitch);
        }

        if (outputId == 'partnerDbRetirementAgePhone') {
            toggleAlreadyRetired(alreadyRetiredSwitch);
        }

        outputElement.textContent = formatNumber(value, formatType);
        updateEarlyRetirementInputs(outputId);

        //Update slider limits
        updateAllSliderLimits(outputId);

       /*  
        if (outputId == 'earlyRetirementAgePhone') {
            applyEarlyRetirementSwitch = localStorage.getItem('applyEarlyRetirementSwitch') === 'true';
            if (applyEarlyRetirementSwitch) {
                outputElement.textContent = formatNumber(value, formatType);
            } else {
                outputElement.textContent = localStorage.getItem('earlyRetirementAge');
                
            }
        } else if (outputId == 'partnerEarlyRetirementAgePhone') {
            applyPartnersEarlyRetirementSwitch = localStorage.getItem('applyPartnersEarlyRetirementSwitch') === 'true';
            if (applyPartnersEarlyRetirementSwitch) {
                outputElement.textContent = formatNumber(value, formatType);
            } else {
                outputElement.textContent = localStorage.getItem('partnerEarlyRetirementAge');
            }
        } else { //For all other outputs
            outputElement.textContent = formatNumber(value, formatType);
        } */

        
        
        
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
    const retirementAgePartner = retirementAge + currentAge - currentAgePartner;

    if (outputId == 'endAgePhone') {
        updateSliderLimits('currentAgeSlider', parseInt(document.getElementById('currentAgeSlider').min), endAge);
        updateSliderLimits('retirementAgeSlider', parseInt(document.getElementById('retirementAgeSlider').min), endAge);
        updateSliderLimits('dbPensionAgeSlider', currentAge, endAge);
        updateSliderLimits('partnerDbRetirementAgeSlider', currentAgePartner, engAgePartner);
        updateSliderLimits('marketCrashAgeSlider', currentAge, endAge);
        updateSliderLimits('ISAContributionIncreaseAgeSlider', currentAge, endAge);
        updateSliderLimits('partnerDbRetirementAgeSlider', currentAgePartner, engAgePartner);
        updateSliderLimits('partnerIncomeStepAge1Slider', currentAgePartner, engAgePartner);
        updateSliderLimits('partnerIncomeStepAge2Slider', currentAgePartner, engAgePartner);
        updateSliderLimits('partnerISAContributionIncreaseAgeSlider', currentAgePartner, engAgePartner);
        updateSliderLimits('annuityAgeSlider', Math.max(currentAge,retirementAge), endAge);
        updateSliderLimits('partnerAnnuityAgeSlider', Math.max(currentAgePartner,retirementAgePartner), engAgePartner);
        
        
    }

    if (outputId == 'retirementAgePhone') {
        updateSliderLimits('incomeStepAge1Slider', Math.max(currentAge,retirementAge), endAge);
        updateSliderLimits('incomeStepAge2Slider', Math.max(currentAge,retirementAge), endAge);
        updateSliderLimits('contributionIncreaseAgeSlider', currentAge, retirementAge);
        updateSliderLimits('ISAContributionIncreaseAgeSlider', currentAge, retirementAge);
        updateSliderLimits('partnerIncomeStepAge1Slider', Math.max(currentAgePartner,retirementAgePartner), engAgePartner);
        updateSliderLimits('partnerIncomeStepAge2Slider', Math.max(currentAgePartner,retirementAgePartner), engAgePartner);
        updateSliderLimits('partnerISAContributionIncreaseAgeSlider', currentAgePartner, retirementAgePartner);
        updateSliderLimits('annuityAgeSlider', Math.max(currentAge,retirementAge), endAge);
        updateSliderLimits('partnerAnnuityAgeSlider', Math.max(currentAgePartner,retirementAgePartner), engAgePartner);
    }

    if (outputId == 'currentAgePhone') {
        updateSliderLimits('dbPensionAgeSlider', currentAge, endAge);
        updateSliderLimits('retirementAgeSlider', currentAge, endAge);
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(currentAge,dbPensionAge-13),dbPensionAge);
        updateSliderLimits('marketCrashAgeSlider', currentAge, endAge);
        updateSliderLimits('incomeStepAge1Slider', currentAge, endAge);
        updateSliderLimits('incomeStepAge2Slider', currentAge, endAge);
        updateSliderLimits('contributionIncreaseAgeSlider', currentAge, retirementAge);
        updateSliderLimits('ISAContributionIncreaseAgeSlider', currentAge, retirementAge);
        updateSliderLimits('annuityAgeSlider', Math.max(currentAge,retirementAge), endAge);
        updateSliderLimits('partnerAnnuityAgeSlider', Math.max(currentAge,retirementAgePartner), engAgePartner);
    }

    if (outputId == 'partnerAgePhone') {
        updateSliderLimits('partnerDbRetirementAgeSlider', currentAgePartner, engAgePartner);
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(currentAgePartner,dbPensionAgePartner-13),dbPensionAgePartner);
        updateSliderLimits('partnerIncomeStepAge1Slider', Math.max(currentAgePartner,retirementAgePartner), engAgePartner);
        updateSliderLimits('partnerIncomeStepAge2Slider', Math.max(currentAgePartner,retirementAgePartner), engAgePartner);
        updateSliderLimits('partnerContributionIncreaseAgeSlider', currentAgePartner, retirementAgePartner);
        updateSliderLimits('partnerISAContributionIncreaseAgeSlider', currentAgePartner, retirementAgePartner);
        updateSliderLimits('partnerAnnuityAgeSlider', Math.max(currentAge,retirementAgePartner), engAgePartner);
    }

    if (outputId == 'dbPensionAgePhone') {
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(currentAge,dbPensionAge-13),dbPensionAge);
   }

    if (outputId == 'partnerDbRetirementAgePhone') {
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(currentAgePartner,dbPensionAgePartner-13),dbPensionAgePartner);
    }

  

}



function updateEarlyRetirementInputs(outputId) {
    const retirementAge = parseInt(document.getElementById('retirementAgePhone').value);
    const dbPensionAge = document.getElementById('dbPensionAgePhone').value;
    const currentAge = parseInt(localStorage.getItem('currentAge')) ;
    const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) ;
    const partnerRetirementAge = retirementAge + currentAgePartner - currentAge;

    const partnerDbRetirementAge = parseInt(document.getElementById('partnerDbRetirementAgePhone').value);

    if (outputId == 'dbPensionAgePhone' ) {
        
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(retirementAge,dbPensionAge-13),dbPensionAge);
        document.getElementById('earlyRetirementAgePhone').value = dbPensionAge;
        document.getElementById('earlyRetirementAgeSlider').value = dbPensionAge;
        
    }

    
    if (outputId == 'partnerDbRetirementAgePhone' ) {
         
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(partnerRetirementAge,partnerDbRetirementAge-13),partnerDbRetirementAge);
        document.getElementById('partnerEarlyRetirementAgePhone').value = partnerDbRetirementAge;
        document.getElementById('partnerEarlyRetirementAgeSlider').value = partnerDbRetirementAge;
        
    }

    if (outputId == 'retirementAgePhone') {
        updateSliderLimits('earlyRetirementAgeSlider',Math.max(retirementAge,dbPensionAge-13),dbPensionAge);
        updateSliderLimits('partnerEarlyRetirementAgeSlider',Math.max(partnerRetirementAge,partnerDbRetirementAge-13),partnerDbRetirementAge);
    }


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


function updateAccordionVisibility() {
    // Read the visibility settings from localStorage
    const showDefinedContribution = localStorage.getItem('showDefinedContributionPension') === 'true';
    const showDefinedBenefit = localStorage.getItem('showDefinedBenefitPension') === 'true';
    const showISASavings = localStorage.getItem('showISASavings') === 'true';

    // Get references to the corresponding accordion sections
    const definedContributionAccordion = document.getElementById('definedContributionInputsAccordion');
    const definedBenefitAccordion = document.getElementById('definedBenefitInputsAccordion');
    const ISAAccordion = document.getElementById('ISAInputsAccordion');

    // Helper functions to show or hide elements
    function showElement(el) {
        el.classList.remove('hidden');
        el.classList.add('visible');
    }

    function hideElement(el) {
        el.classList.remove('visible');
        el.classList.add('hidden');
    }

    // Update visibility for Defined Contribution section
    if (definedContributionAccordion) {
        showDefinedContribution
            ? showElement(definedContributionAccordion)
            : hideElement(definedContributionAccordion);
    } else {
        console.warn('Defined Contribution Accordion not found.');
    }

    // Update visibility for Defined Benefit section
    if (definedBenefitAccordion) {
        showDefinedBenefit
            ? showElement(definedBenefitAccordion)
            : hideElement(definedBenefitAccordion);
    } else {
        console.warn('Defined Benefit Accordion not found.');
    }

    // Update visibility for ISA section
    if (ISAAccordion) {
        showISASavings
            ? showElement(ISAAccordion)
            : hideElement(ISAAccordion);
    } else {
        console.warn('ISA Accordion not found.');
    }
}


function toggleAlreadyRetired(checkbox) {
    saveToLocalStorage('alreadyRetired', checkbox.checked);

    // Check if planning as a couple
    const isPlanAsCouple = localStorage.getItem('planAsCouple') === 'true';

    // Define the containers related to contributions
    const contributionContainers = [
        'pensionContributionsContainer', 
        'ISAContributionsContainer',
        'retirementAgeContainer',
        'leftHeadingRetirementAge',
        'rightCollapseContributionIncrease',
        'rightContributionIncrease',
        'rightISAContributionIncrease',
        'rightCollapseISAContributionIncrease',
    ];

    const partnerContributionContainers = [
        'partnerRetirementAgeContainer',
        'partnerPensionContributionsContainer',
        'partnerISAContributionContainer',
        'partnerContributionIncreaseInputsAccordion',
        'partnerISAContributionIncrease',
        'partnerCollapseISAContributionIncrease',
        'partnersParametersHeading',
        
        'partnerRightFundConstraints',
    ];


    const earlyRetirementContainers = [
        'rightDefinedBenefitOptions',
        'rightCollapseDefinedBenefitOptions',
    ]

    const earlyRetirementContainersPartner = [
        'partnerDefinedBenefitOptionsSection',
        'rightCollapsePartnerDefinedBenefitOptions',
    ]

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

    // Apply visibility toggle to partner elements **only if planning as a couple**
    if (!isPlanAsCouple) {
        partnerContributionContainers.forEach(containerId => {
            toggleContainer(containerId, true); // Always hide if not planning as a couple
        });
    } else {
        partnerContributionContainers.forEach(containerId => {
            toggleContainer(containerId, checkbox.checked); // Hide if "Already Retired" is checked
        });
    }

    const currentAge = parseInt(localStorage.getItem('currentAge')) || 0;
    const dbPensionAge = parseInt(localStorage.getItem('dbPensionAge')) || 0;
    if (currentAge >= dbPensionAge) {
        earlyRetirementContainers.forEach(containerId => {
            toggleContainer(containerId, true);
        });
    } else {
        earlyRetirementContainers.forEach(containerId => {
            toggleContainer(containerId, false);
        });
    }

    if (!isPlanAsCouple) {
        earlyRetirementContainersPartner.forEach(containerId => {
            toggleContainer(containerId, true);
        });
    } else {
        const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) || 0;
        const dbPensionAgePartner = parseInt(localStorage.getItem('dbPensionAgePartner')) || 0;
        if (currentAgePartner >= dbPensionAgePartner) {
            earlyRetirementContainersPartner.forEach(containerId => {
                toggleContainer(containerId, true);
            });
        } else {
            earlyRetirementContainersPartner.forEach(containerId => {
                toggleContainer(containerId, false);
            });
        }
    }

    saveAndCalc();
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


function togglePartnerInputs(checkbox) {
    // 1. Overall visibility based on the planAsCoupleSwitch
    const isPlanAsCouple = checkbox.checked;

    // 2. Read partner-specific flags from localStorage
    const showDefinedContribution = (localStorage.getItem('showPartnerDefinedContributionPension') === 'true');
    const showDefinedBenefit      = (localStorage.getItem('showPartnerDefinedBenefitPension') === 'true');
    const showISASavings          = (localStorage.getItem('showPartnerISASavings') === 'true');

    // 3. Get DOM references to the partner sections
    const partnerAgeInput                 = document.getElementById('partnerAgeContainer');
    const partnerDefinedContributionSection = document.getElementById('partnerDefinedContributionInputsAccordion');
    const partnerDefinedBenefitSection      = document.getElementById('partnerDefinedBenefitInputsAccordion');
    const partnerISASection                 = document.getElementById('partnerISAInputsAccordion');
    const partnerDefinedBenefitOptionsSection = document.getElementById('partnerDefinedBenefitOptionsSection');
    const partnerRetirementAgeContainer = document.getElementById('partnerRetirementAgeContainer');
    const partnerTaxFreeCashPercentContainer = document.getElementById('partnerTaxFreeCashPercentContainer');
    const partnerIncomeStepsContainer = document.getElementById('partnerIncomeStepsContainer');
    const partnersParametersHeading = document.getElementById('partnersParametersHeading');
    const yourPartnersInputsHeading = document.getElementById('yourPartnersInputsHeading');
    const partnerRightFundConstraints = document.getElementById('partnerRightFundConstraints');
    const partnerContributionIncreaseInputsAccordion = document.getElementById('partnerContributionIncreaseInputsAccordion');
    const partnerISAContributionIncrease = document.getElementById('partnerISAContributionIncrease');
    const partnerAnnuityPurchaseAccordion = document.getElementById('partnerAnnuityPurchaseAccordion');
    
    
    

    // Helper functions for showing and hiding with "visible" / "hidden"
    function showElement(el) {
        el.classList.remove('hidden');
        el.classList.add('visible');
    }
    function hideElement(el) {
        el.classList.remove('visible');
        el.classList.add('hidden');
    }

    // 4. Force partner sections to hide if planAsCouple is false;
    //    otherwise respect the local storage flags.
    if (!isPlanAsCouple) {
        if (partnerAgeInput) hideElement(partnerAgeInput);
        if (partnerDefinedContributionSection) hideElement(partnerDefinedContributionSection);
        if (partnerDefinedBenefitSection)      hideElement(partnerDefinedBenefitSection);
        if (partnerISASection)                 hideElement(partnerISASection);
        if (partnerDefinedBenefitOptionsSection)                 hideElement(partnerDefinedBenefitOptionsSection);
        if (partnerRetirementAgeContainer)                 hideElement(partnerRetirementAgeContainer);
        if (partnerTaxFreeCashPercentContainer)                 hideElement(partnerTaxFreeCashPercentContainer);
        if (partnerIncomeStepsContainer)                 hideElement(partnerIncomeStepsContainer);
        if (partnersParametersHeading)                 hideElement(partnersParametersHeading);
        if (yourPartnersInputsHeading)                 hideElement(yourPartnersInputsHeading);
        if (partnerRightFundConstraints)                 hideElement(partnerRightFundConstraints);
        if (partnerContributionIncreaseInputsAccordion)                 hideElement(partnerContributionIncreaseInputsAccordion);
        if (partnerISAContributionIncrease)                 hideElement(partnerISAContributionIncrease);
        if (partnerAnnuityPurchaseAccordion)                 hideElement(partnerAnnuityPurchaseAccordion);
    } else {
        // planAsCouple = true ⇒ check each localStorage flag
        if (partnerAgeInput) {
            showElement(partnerAgeInput)
        }
        if (partnersParametersHeading) {
            showElement(partnersParametersHeading)
        }
        if (yourPartnersInputsHeading) {
            showElement(yourPartnersInputsHeading)
        }
        if (partnerRetirementAgeContainer) {
            showElement(partnerRetirementAgeContainer)
        }
        if (partnerIncomeStepsContainer) {
            showElement(partnerIncomeStepsContainer)
        }
        if (partnerDefinedContributionSection) {
            showDefinedContribution
                ? showElement(partnerDefinedContributionSection)
                : hideElement(partnerDefinedContributionSection);
        }
        if (partnerDefinedContributionSection) {
            showDefinedContribution
                ? showElement(partnerContributionIncreaseInputsAccordion)
                : hideElement(partnerContributionIncreaseInputsAccordion);
        }
        if (partnerDefinedContributionSection) {
            showDefinedContribution
                ? showElement(partnerAnnuityPurchaseAccordion)
                : hideElement(partnerAnnuityPurchaseAccordion);
        }
        if (partnerDefinedBenefitOptionsSection) {
            showDefinedBenefit
                ? showElement(partnerDefinedBenefitOptionsSection)
                : hideElement(partnerDefinedBenefitOptionsSection);
        }
        if (partnerDefinedBenefitSection) {
            showDefinedBenefit
                ? showElement(partnerDefinedBenefitSection)
                : hideElement(partnerDefinedBenefitSection);
        }
        if (partnerISASection) {
            showISASavings
                ? showElement(partnerISASection)
                : hideElement(partnerISASection);
        }
         if (partnerISASection) {
            showISASavings
                ? showElement(partnerRightFundConstraints)
                : hideElement(partnerRightFundConstraints);
        }
        if (partnerISASection) {
            showISASavings
                ? showElement(partnerISAContributionIncrease)
                : hideElement(partnerISAContributionIncrease);
        }
        if (partnerTaxFreeCashPercentContainer) {
            showDefinedContribution
                ? showElement(partnerTaxFreeCashPercentContainer)
                : hideElement(partnerTaxFreeCashPercentContainer);
        }
        
    }

    // 5. Toggle between individual and combined income sections
    const individualIncomeSection = document.getElementById('inputDesiredIncomePhone')?.closest('.mb-3');
    const combinedIncomeSection   = document.getElementById('inputDesiredCombinedIncomePhone')?.closest('.mb-3');

    if (isPlanAsCouple) {
        // Show combined, hide individual
        if (combinedIncomeSection) {
            showElement(combinedIncomeSection);
        }
        if (individualIncomeSection) {
            hideElement(individualIncomeSection);
        }
    } else {
        // Show individual, hide combined
        if (combinedIncomeSection) {
            hideElement(combinedIncomeSection);
        }
        if (individualIncomeSection) {
            showElement(individualIncomeSection);
        }
    }

    // 6. Update localStorage with the planAsCouple state
    localStorage.setItem('planAsCouple', isPlanAsCouple);

    

    // 7. Recalculate or refresh
    saveAndCalc();

   
}


function updateRetirementLivingStandardsSelector(event) {
    const selectedValue = event.target.value;
    console.log(`Selected: ${selectedValue}`);

    // Determine if planning as a couple
    const isPlanAsCouple = localStorage.getItem('planAsCouple') === "true";

    // Define income values based on the plan type
    let values = isPlanAsCouple
        ? {
              Minimum: parseInt(22400 / 12 ),
              Moderate: parseInt(43100 / 12 ),
              Comfortable: parseInt(59000 / 12 ),
          }
        : {
              Minimum: parseInt(14400 / 12 ),
              Moderate: parseInt(31300 / 12 ),
              Comfortable: parseInt(43100 / 12 ),
          };

    // Retrieve the correct slider and output elements
    const slider = isPlanAsCouple
        ? document.getElementById("desiredCombinedIncomeSlider")
        : document.getElementById("desiredIncomeSlider");

    const output = isPlanAsCouple
        ? document.getElementById("inputDesiredCombinedIncomePhone")
        : document.getElementById("inputDesiredIncomePhone");

    if (!slider || !output) {
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
    output.value = newValue;
    output.textContent = formatNumber(newValue, 'currency');

    // Save the selected option and values
    localStorage.setItem('selectedRetirementIncomeStandardOption', selectedValue);
    saveInputsToLocalStoragePhone();
}


function initialiseLocalStorageValues() {
    const defaults = {
        planAsCouple: false,
        alreadyRetired: false,
        applyEarlyRetirement: false,
        applyPartnersEarlyRetirement: false,
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
        taxFreeCashPercentPartner: 0.0,
        desiredIncome: 0,
        currentAgePartner: 0,
        stepUpAge: 55,
        stepUpContribution: 0.0,
        minISABalance: 0.0,
        useScottishTax: false,
        fundGrowthPre: 5, // 5% default
        fundGrowthPost: 5, // 5% default
        fundCharges: 1, // 1% default
        isaInterestRate: 4,
        isaCharges: 0.5,
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
        partnerMonthlyContribution: 0,
        partnerStepUpAge: 55,
        partnerStepUpContribution: 0.0,
        partnerCurrentFund: 0,
        partnerDbPensionAmount: 0,
        partnerDbPensionAge: 60,
        partnerCurrentISA: 0,
        partnerMonthlyISAContribution: 0,
        minISABalancePartner: 0,
        dbEarlyRetirementFactor: 5,
        dbLateRetirementFactor: 6,
        inflationLinkedContributions: true,
        inflationLinkedContributionsPartner: true,
        incomeStepAge1 : 75,
        incomeStepPercent1: 0,
        incomeStepAge2 : 85,
        incomeStepPercent2 : 0,
        partnerIncomeStepAge1 : 75,
        partnerIncomeStepPercent1: 0,
        partnerIncomeStepAge2 : 85,
        partnerIncomeStepPercent2 : 0,
        fundConversion: 0,
        annuityAge: 75,
        annuityAgePartner: 75,
        fundConversionPartner: 0,
       
        earlyRetirementAge: localStorage.getItem('dbPensionAge') || 67,
        partnerEarlyRetirementAge: localStorage.getItem('dbPensionAgePartner') || 67,
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
        minISABalancePartner: 0,
        finalFund: 0,
        isaPriority: 50, 
        earlyRetirementAge: localStorage.getItem('dbPensionAge') || 67,
        partnerEarlyRetirementAge: localStorage.getItem('dbPensionAgePartner') || 67,
        partnerStepUpAge: 55,
        partnerStepUpContribution: 0.0,
        applyEarlyRetirement: false,
        applyPartnersEarlyRetirement: false,
        incomeStepAge1 : 75,
        incomeStepPercent1: 0,
        incomeStepAge2 : 85,
        incomeStepPercent2 : 0,
        
        partnerIncomeStepAge1 : 75,
        partnerIncomeStepPercent1: 0,
        partnerIncomeStepAge2 : 85,
        partnerIncomeStepPercent2 : 0,
        stepUpContributionISA: 0,
        stepUpAgePartnerISA: 0,
        
    };

    Object.keys(defaults).forEach((key) => {
        localStorage.setItem(key, defaults[key].toString());
    });

    // Update the inputs and sliders with the default values
    initialiseInitialInputsAndCheckboxesPhone();
    saveAndCalc();
}


function resetIncomeStepsToDefaultValues() {
    const defaults = {
       
        incomeStepAge1 : 75,
        incomeStepPercent1: 0,
        incomeStepAge2 : 85,
        incomeStepPercent2 : 0,
        
    };

    Object.keys(defaults).forEach((key) => {
        localStorage.setItem(key, defaults[key].toString());
    });

    // Update the inputs and sliders with the default values
    initialiseInitialInputsAndCheckboxesPhone();
    saveAndCalc();
}

function resetPartnerIncomeStepsToDefaultValues() {
    const defaults = {
       
        partnerIncomeStepAge1 : 75,
        partnerIncomeStepPercent1: 0,
        partnerIncomeStepAge2 : 85,
        partnerIncomeStepPercent2 : 0,
        
    };

    Object.keys(defaults).forEach((key) => {
        localStorage.setItem(key, defaults[key].toString());
    });

    // Update the inputs and sliders with the default values
    initialiseInitialInputsAndCheckboxesPhone();
    saveAndCalc();
}



// Add event listener for the reset buttons
document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('resetAssumptionsButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset all assumptions to default values
            resetAssumptionsToDefaultValues();

        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('resetIncomeStepsButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset all assumptions to default values
            resetIncomeStepsToDefaultValues();
            
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('resetPartnerIncomeStepsButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Reset all assumptions to default values
            resetPartnerIncomeStepsToDefaultValues();
            
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
    'dbPensionAgeSlider': 'dbPensionAgePhone',
    'desiredIncomeSlider': 'inputDesiredIncomePhone',
    'retirementAgeSlider': 'retirementAgePhone',
    'taxFreeCashSlider': 'inputTaxFreeCashPercentPhone',
    'fundGrowthSlider': 'fundGrowthPercentPhone',
    'isaGrowthSlider': 'isaGrowthPercentPhone',
    'isaInterestRateSlider': 'isaInterestRatePercentPhone',
    'inflationSlider': 'inflationPercentPhone',
    'fundChargesSlider': 'fundChargesPercentPhone',
    'isaChargesSlider': 'isaChargesPercentPhone',
    'endAgeSlider': 'endAgePhone',
    'fundGrowthPostSlider': 'fundGrowthPostPercentPhone',
    'marketCrashAgeSlider': 'marketCrashAgePhone',
    /* 'marketCrashPercentSlider': 'marketCrashPercentPhone', */
    'minimumISABalanceSlider': 'minimumISABalancePhone',
    'finalFundTargetSlider': 'finalFundTargetPhone',
    'contributionIncreaseAgeSlider': 'contributionIncreaseAgePhone',
    'additionalContributionSlider': 'additionalContributionPhone',
    'isaPrioritySlider': 'isaPriorityPhone',
    'baseWithdrawalSlider': 'baseWithdrawalPhone',
    'pensionPercentageSlider': 'pensionPercentPhone',
    'incomeStepAge1Slider': 'incomeStepAge1Phone',
    'incomeStepPercent1Slider': 'incomeStep1PercentPhone',
    'incomeStepAge2Slider': 'incomeStepAge2Phone',
    'incomeStepPercent2Slider': 'incomeStep2PercentPhone',
    'ISAContributionIncreaseAgeSlider': 'ISAContributionIncreaseAgePhone',
    'additionalISAContributionSlider': 'additionalISAContributionPhone',
     'annuityAgeSlider': 'annuityAgePhone',
    'fundConversionSlider': 'fundConversionPercentPhone',

    'partnerISAContributionIncreaseAgeSlider': 'partnerISAContributionIncreaseAgePhone',
    'partnerAdditionalISAContributionSlider': 'partnerAdditionalISAContributionPhone',
    'partnerIncomeStepAge1Slider': 'partnerIncomeStepAge1Phone',
    'partnerIncomeStepPercent1Slider': 'partnerIncomeStep1PercentPhone',
    'partnerIncomeStepAge2Slider': 'partnerIncomeStepAge2Phone',
    'partnerIncomeStepPercent2Slider': 'partnerIncomeStep2PercentPhone',
    
    'partnerAgeSlider': 'partnerAgePhone',
    'partnerCurrentFundSlider': 'partnerCurrentFundPhone',
    'partnerMonthlyContributionSlider': 'partnerMonthlyContributionPhone',
    'partnerFundGrowthSlider': 'partnerFundGrowthPercentPhone',
    'partnerFundChargesSlider': 'partnerFundChargesPercentPhone',
    'partnerAnnualPensionSlider': 'partnerDbPensionAmountPhone',
    'partnerDbRetirementAgeSlider': 'partnerDbRetirementAgePhone',
    'partnerCurrentISASlider': 'partnerCurrentISAPhone',
    'partnerMonthlyISAContributionSlider': 'partnerMonthlyISAContributionPhone',
    'desiredCombinedIncomeSlider': 'inputDesiredCombinedIncomePhone',
    'partnerContributionIncreaseAgeSlider': 'partnerContributionIncreaseAgePhone',
    'partnerAdditionalContributionSlider': 'partnerAdditionalContributionPhone',
    'earlyRetirementAgeSlider': 'earlyRetirementAgePhone',
    'partnerEarlyRetirementAgeSlider': 'partnerEarlyRetirementAgePhone',
    'partnerMinimumISABalanceSlider': 'partnerMinimumISABalancePhone',
    'partnerTaxFreeCashSlider': 'inputPartnerTaxFreeCashPercentPhone',
    'salarySlider': 'salaryPhone',
    'percentageSlider': 'salaryPercentPhone',
    'partnerSalarySlider': 'partnerSalaryPhone',
    'partnerPercentageSlider': 'partnerPercentagePhone',
   'partnerAnnuityAgeSlider': 'partnerAnnuityAgePhone',
    'partnerFundConversionSlider': 'partnerFundConversionPercentPhone'
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
                    //updateChartVisibility('notDropDown');
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
        const rightColumn = document.getElementById('rightColumn');
        const mainColumn = document.getElementById('mainColumn');
    
        // Primary Buttons
        const leftButton = document.getElementById('leftButton');
        const leftButtonIcon = document.querySelector('#leftButton i');
        const leftToggleText = document.getElementById("leftToggleText");
        const rightButton = document.getElementById('rightButton');
        const rightButtonIcon = document.querySelector('#rightButton i');
        const rightToggleText = document.getElementById("rightToggleText");
    
        // Secondary Buttons (leftButton2, rightButton2)
        const leftButton2 = document.getElementById('leftButton2');
        const leftButtonIcon2 = document.querySelector('#leftButton2 i');
        const leftToggleText2 = document.getElementById("leftToggleText2");
        const rightButton2 = document.getElementById('rightButton2');
        const rightButtonIcon2 = document.querySelector('#rightButton2 i');
        const rightToggleText2 = document.getElementById("rightToggleText2");
    
        if (leftColumn.classList.contains('hidden-column')) {
            // Show Left Column
            leftColumn.classList.remove('hidden-column');
            leftColumn.classList.add('visible-column');
            leftColumn.style.flex = '3';
            rightColumn.style.flex = '0';
    
            // Update Primary Left Button
            leftButtonIcon.classList.add('bi', 'bi-chevron-bar-left');
            leftButtonIcon.classList.remove('bi-chevron-bar-right'); 
            leftToggleText.textContent = "Hide";
    
            // Update Secondary Left Button
            leftButtonIcon2.classList.add('bi', 'bi-chevron-bar-left');
            leftButtonIcon2.classList.remove('bi-chevron-bar-right'); 
            leftToggleText2.textContent = "Hide";
    
            if (!rightColumn.classList.contains('hidden-column')) {
                // Hide Right Column
                rightColumn.classList.add('hidden-column');
                rightColumn.classList.remove('visible-column');
                mainColumn.style.flex = '9.5';
    
                // Update Primary Right Button
                rightButtonIcon.classList.remove('bi-chevron-bar-right');
                rightButtonIcon.classList.add('bi-chevron-bar-left'); 
                rightToggleText.textContent = "Show Parameters";
    
                // Update Secondary Right Button
                rightButtonIcon2.classList.remove('bi-chevron-bar-right');
                rightButtonIcon2.classList.add('bi-chevron-bar-left'); 
                rightToggleText2.textContent = "Show Parameters";
            }
        } else {
            // Hide Left Column
            leftColumn.classList.add('hidden-column');
            leftColumn.classList.remove('visible-column');
            leftColumn.style.flex = '0';
    
            // Update Primary Left Button
            leftButtonIcon.classList.remove('bi-chevron-bar-left');
            leftButtonIcon.classList.add('bi-chevron-bar-right'); 
            leftToggleText.textContent = "Show Inputs";
    
            // Update Secondary Left Button
            leftButtonIcon2.classList.remove('bi-chevron-bar-left');
            leftButtonIcon2.classList.add('bi-chevron-bar-right'); 
            leftToggleText2.textContent = "Show Inputs";
        }
    
        toggleChartWidth();
        saveAndCalc();
    }
    
    
    function toggleRightColumn() {
        const leftColumn = document.getElementById('leftColumn');
        const rightColumn = document.getElementById('rightColumn');
        const mainColumn = document.getElementById('mainColumn');
    
        // Primary Buttons
        const leftButton = document.getElementById('leftButton');
        const leftButtonIcon = document.querySelector('#leftButton i'); 
        const leftToggleText = document.getElementById("leftToggleText");
        const rightButton = document.getElementById('rightButton');
        const rightButtonIcon = document.querySelector('#rightButton i'); 
        const rightToggleText = document.getElementById("rightToggleText");
    
        // Secondary Buttons (leftButton2, rightButton2)
        const leftButton2 = document.getElementById('leftButton2');
        const leftButtonIcon2 = document.querySelector('#leftButton2 i'); 
        const leftToggleText2 = document.getElementById("leftToggleText2");
        const rightButton2 = document.getElementById('rightButton2');
        const rightButtonIcon2 = document.querySelector('#rightButton2 i'); 
        const rightToggleText2 = document.getElementById("rightToggleText2");

        let isRightColumnVisible = localStorage.getItem('isRightColumnVisible') === 'true';
    
        if (rightColumn.classList.contains('hidden-column')) {
            // Show Right Column
            rightColumn.classList.remove('hidden-column');
            rightColumn.classList.add('visible-column');
            rightColumn.style.flex = '3';
    
            // Update Primary Right Button
            rightButtonIcon.classList.add('bi', 'bi-chevron-bar-right');
            rightButtonIcon.classList.remove('bi-chevron-bar-left'); 
            rightToggleText.textContent = "Hide";
    
            // Update Secondary Right Button
            rightButtonIcon2.classList.add('bi', 'bi-chevron-bar-right');
            rightButtonIcon2.classList.remove('bi-chevron-bar-left'); 
            rightToggleText2.textContent = "Hide";
    
            if (!leftColumn.classList.contains('hidden-column')) {
                // Hide Left Column
                leftColumn.classList.add('hidden-column');
                leftColumn.classList.remove('visible-column');
                leftColumn.style.flex = '0';
    
                // Update Primary Left Button
                leftButtonIcon.classList.remove('bi-chevron-bar-left');
                leftButtonIcon.classList.add('bi-chevron-bar-right'); 
                leftToggleText.textContent = "Show Inputs";
    
                // Update Secondary Left Button
                leftButtonIcon2.classList.remove('bi-chevron-bar-left');
                leftButtonIcon2.classList.add('bi-chevron-bar-right'); 
                leftToggleText2.textContent = "Show Inputs";
            }

            isRightColumnVisible = true;

        } else {
            // Hide Right Column
            rightColumn.classList.add('hidden-column');
            rightColumn.classList.remove('visible-column');
            rightColumn.style.flex = '0';
    
            // Update Primary Right Button
            rightButtonIcon.classList.remove('bi-chevron-bar-right');
            rightButtonIcon.classList.add('bi-chevron-bar-left'); 
            rightToggleText.textContent = "Open Panel";
    
            // Update Secondary Right Button
            rightButtonIcon2.classList.remove('bi-chevron-bar-right');
            rightButtonIcon2.classList.add('bi-chevron-bar-left'); 
            rightToggleText2.textContent = "Open Panel";

            isRightColumnVisible = false;
        }
    
        // Save visibility state in localStorage
        localStorage.setItem('isRightColumnVisible', isRightColumnVisible);

        toggleChartWidth();
        saveAndCalc();
    }
    
    function toggleMarketCrash(switchElement) {
        const marketCrashPercentSlider = document.getElementById('marketCrashPercentSlider');
        
        if (switchElement.checked) {
            // Retrieve the last non-zero value from storage
            // Default to 25 if it doesn’t exist yet
            const storedValue = localStorage.getItem('marketCrashPercentStored') || '25';
    
            // Update the slider and output to the stored value
            marketCrashPercentSlider.value = storedValue;
            updateOutput('marketCrashPercentPhone', storedValue, 'percentage');
    
            // Also set the “current” crash percent
            saveToLocalStorage('marketCrashPercent', storedValue);
            
        } else {
            // Switch is toggled OFF => set crash percent to zero
            marketCrashPercentSlider.value = 0;
            updateOutput('marketCrashPercentPhone', 0, 'percentage');
            saveToLocalStorage('marketCrashPercent', '0');
        }
    
        // Enable or disable the slider
        marketCrashPercentSlider.disabled = !switchElement.checked;
    
        // Trigger recalculation
        saveAndCalc();
    }

   

   
   


    function onMarketCrashSliderChange(value) {
        const outputId = 'marketCrashPercentPhone';
    
        const applyMarketCrash = document.getElementById('applyMarketCrashSwitch').checked ;
               
        if (applyMarketCrash) {
            // Update the UI
            updateOutput(outputId, value, 'percentage');
        
            // If slider > 0, store it as the last known non-zero value
            if (parseFloat(value) > 0) {
                saveToLocalStorage('marketCrashPercentStored', value); 
            }
        
            // Also always update the “current” crash percent
            saveToLocalStorage('marketCrashPercent', value);
                
            // Trigger any necessary recalculation
            saveAndCalc();
        }
       
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
                /* if (container.classList.contains('width-85')) { */
                    container.classList.remove('width-85');
                    container.classList.add('width-100');
               /*  } else {
                    container.classList.remove('width-100');
                    container.classList.add('width-85');
                } */
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

    function adjustOutputBox2(outputBoxId, sliderId, adjustment, format = null) {
        const outputBox = document.getElementById(outputBoxId);
        const slider = document.getElementById(sliderId);
    
        if (outputBox && slider) {
            // Parse current value as an integer from the output box
            let currentValue = parseFloat(outputBox.textContent.replace(/[^0-9.-]/g, '')) || 0;
    
            // Add the adjustment
            currentValue = Math.floor(100*(currentValue + adjustment))/100;
    
            // Clamp and snap to the nearest step
            const min = parseFloat(slider.min) || 0;
            const max = parseFloat(slider.max) || 5000;
            const step = parseFloat(slider.step) || 100;
            currentValue = Math.max(min, Math.min(max, Math.round(currentValue / step) * step));
            currentValue = Math.floor(100*(currentValue))/100;
    
            // Update the slider value
            slider.value = currentValue;
    
            // Determine the format if not explicitly provided
            if (!format) {
                if (outputBoxId.toLowerCase().includes('age')) {
                    format = 'plain';
                } else if (outputBoxId.toLowerCase().includes('percent')) {
                    format = 'percentage';
                } else {
                    format = 'currency';
                }
            }
    
            // Format the value
            let formattedValue;
            if (format === 'currency') {
                formattedValue = formatCurrency(currentValue);
            } else if (format === 'percentage') {
                formattedValue = `${currentValue}%`;
            } else {
                formattedValue = currentValue; // Plain format
            }

            // Special handling for User Retirement Age Slider
            if (sliderId === 'retirementAgeSlider') {
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

            if (sliderId === 'partnerAgeSlider') {
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
    
            // Update the output box value
            outputBox.textContent = formattedValue;

           
            updateOutput(outputBoxId, currentValue, format);

            //Update slider limits
            updateEarlyRetirementInputs(outputBoxId);

            // Trigger the update function when salary or percentage is adjusted
            if (outputBoxId === 'salaryPhone' || outputBoxId === 'salaryPercentPhone') {
                updateMonthlyContributionFromPercentage();
            } else if (outputBoxId === 'partnerSalaryPhone' || outputBoxId === 'partnerSalaryPercentPhone') {
                updatePartnerMonthlyContributionFromPercentage();
            }
    
            // Optional: Trigger calculation or any dependent logic
            saveAndCalc();
            //updateChartVisibility('notDropDown');
        }
    }
    
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0
        }).format(value);
    }

    

    function outputResults(cashFlowData, todaysMoneyCashFlowData, currentAge, retirementAge, fundAtRetirement, ISAAtRetirement, taxFreeCashTaken, desiredAnnualIncome, maxAffordableNetIncome, shortfallAtRetirement, discountFactor, alreadyRetired, planAsCouple, dontResizeChart, incomeType, simulation1,  simulation2) {

        var taxFreeCashPercent = parseFloat(localStorage.getItem("taxFreeCashPercent"))/100 || 0.00;
        /* var inputTaxFreeCashPercentPartner = parseFloat(document.getElementById("inputTaxFreeCashPercentPartner").value)/100 || 0.00; */
        var fundGrowthPre = parseFloat(localStorage.getItem("fundGrowthPre")) / 100;
        var fundCharges = parseFloat(localStorage.getItem("fundCharges")) / 100;
    
        var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome ;
        var desiredAnnualIncomeAtRetirement = desiredAnnualIncome / discountFactor;

        var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";
        if (applyInflationAdjustment) {
            inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
            desiredAnnualIncomeAtRetirement = desiredAnnualIncome ;
        }
       
    
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
    
        var affordableIncome = Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12);
        var incomeRequired = Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12);

        var suffix = `at age ${retirementAge}`;
    
        const phoneFormat = true;

        shortfallAtRetirement = incomeRequired - affordableIncome;
        if (shortfallAtRetirement > - 5 && shortfallAtRetirement < 5) {shortfallAtRetirement = 0;}

        const earlyRetirementAge = document.getElementById('earlyRetirementAgePhone').value;
        const dbPensionAmount = parseFloat(localStorage.getItem("earlyRetirementDbPensionAmount")) ;
        const partnerEarlyRetirementAge = document.getElementById('partnerEarlyRetirementAgePhone').value;
        const dbPensionAmountPartner = parseFloat(localStorage.getItem("earlyRetirementDbPensionAmountPartner")) ;
        const inflation = parseFloat(localStorage.getItem("inflation"))/100 ;
        const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) ;

        const dbDiscountFactor = 1/ Math.pow(1 + inflation, Math.max(0,earlyRetirementAge - currentAge));
        const partnerDbDiscountFactor = 1/ Math.pow(1 + inflation, Math.max(0,partnerEarlyRetirementAge - currentAgePartner));

        if (phoneFormat) {
            
            
            var prefix = "";
            var desiredIncomePrefix = "";
            if (applyInflationAdjustment) {
                desiredIncomePrefix = `Today\'s Money Value of ${prefix}`;
            } else {
                desiredIncomePrefix = `Future Value of ${prefix}`;
            }
            
            if (applyInflationAdjustment)  { /*todays money values*/

                document.getElementById("definedBenefitPensionAmountLabel").innerHTML = `${freq_capital} Pension Payable from age ${earlyRetirementAge} (In Today's Money)`;
                document.getElementById("definedBenefitPensionAmount").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * dbDiscountFactor * dbPensionAmount / 12 )) + '</strong>';
                document.getElementById("partnerDefinedBenefitPensionAmountLabel").innerHTML = `${freq_capital} Pension Payable from age ${partnerEarlyRetirementAge}  (In Today's Money)`;
                document.getElementById("partnerDefinedBenefitPensionAmount").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * partnerDbDiscountFactor * dbPensionAmountPartner / 12 )) + '</strong>';
  
            
                document.getElementById("taxFreeCashTakenTodaysMoneyPhone").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken*discountFactor)) + '</strong>';
    
                if (shortfallAtRetirement > 0) {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Shortfall:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(shortfallAtRetirement) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "red";
                } else if (shortfallAtRetirement === 0) {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Surplus:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(shortfallAtRetirement) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "#2ab811";
                } else {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Surplus:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(-shortfallAtRetirement)) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "#2ab811";
                }

                document.getElementById("pensionFundAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement*discountFactor)) + '</strong>';
                document.getElementById("ISAHoldingsAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement*discountFactor)) + '</strong>';
           

                plotIncomeChart(todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                plotTaxBreakdownChart(todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);
                plotChargesChart(todaysMoneyCashFlowData, 12, applyInflationAdjustment, prefix, phoneFormat, planAsCouple);
                plotFundChart(cashFlowData, phoneFormat, planAsCouple);
            
    
            }  else { /*not todays money values*/
    
                document.getElementById("definedBenefitPensionAmountLabel").innerHTML = `${freq_capital} Pension Payable from age ${earlyRetirementAge}`;
                document.getElementById("definedBenefitPensionAmount").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * dbPensionAmount )) + '</strong>';
                document.getElementById("partnerDefinedBenefitPensionAmountLabel").innerHTML = `${freq_capital} Pension Payable from age ${partnerEarlyRetirementAge}`;
                document.getElementById("partnerDefinedBenefitPensionAmount").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * dbPensionAmountPartner )) + '</strong>';
              
                document.getElementById("taxFreeCashTakenTodaysMoneyPhone").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken)) + '</strong>';
    
                if (shortfallAtRetirement > 0) {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Shortfall:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(shortfallAtRetirement) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "red";
                } else if (shortfallAtRetirement === 0) {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Surplus:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(shortfallAtRetirement) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "#2ab811";
                } else {
                    document.getElementById("shortfallAtRetirementTextPhone").innerText = `Surplus:`;
                    document.getElementById("shortfallAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(-shortfallAtRetirement)) + '</strong>';
                    document.getElementById("shortfallAtRetirementPhone").style.color = "#2ab811";
                }
            
                document.getElementById("pensionFundAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement)) + '</strong>';
                document.getElementById("ISAHoldingsAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement)) + '</strong>';
                    
                
                plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                plotTaxBreakdownChart(cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);
                plotChargesChart(cashFlowData, 12, applyInflationAdjustment, prefix, phoneFormat, planAsCouple);
                plotFundChart(cashFlowData, phoneFormat, planAsCouple);
            
    
            }
        
            if(planAsCouple) {
                if (incomeType === 'Your' ) { 
                    document.getElementById("expectedTotalIncomeLabel").innerHTML = `Your Affordable ${freq_capital} Income (a):`;
                } else if (incomeType === 'Partner') {
                    document.getElementById("expectedTotalIncomeLabel").innerHTML = `Your Partner's Affordable ${freq_capital} Income (a):`;
                } else {
                    document.getElementById("expectedTotalIncomeLabel").innerHTML = `Affordable Combined ${freq_capital} Income (a):`;
                }
                
                document.getElementById("desiredMonthlyIncomeLabel").innerHTML = `Desired Combined ${freq_capital} Income (b):`;
                document.getElementById("pensionFundAtRetirementLabel").innerHTML = `Combined Pension Funds at Retirement:`;
                document.getElementById("ISAHoldingsAtRetirementLabel").innerHTML = `Combined ISA Holdings at Retirement:`;
                document.getElementById("TFCTakenLabel").innerHTML = `Combined Tax Free Lump Sum:`;
                
            } else {
                document.getElementById("expectedTotalIncomeLabel").innerHTML = `Affordable ${freq_capital} Income (a):`;
                document.getElementById("desiredMonthlyIncomeLabel").innerHTML = `Desired ${freq_capital} Income (b):`;
            }

//if (incomeType === 'Your' || incomeType === 'Partner') {            

            document.getElementById("expectedTotalIncomeTodaysMoneyPhone").innerHTML = '<strong>£' + formatNumber(Math.round(affordableIncome)) + '</strong>';
            document.getElementById("desiredMonthlyIncomeAtRetirementPhone").innerHTML = '<strong>£' + formatNumber(Math.round(incomeRequired)) + '</strong>';

            
            displayCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge);

            if (planAsCouple) {
               /*  displayCashFlowTables (combinedCashFlowData, combinedTodaysMoneyCashFlowData, simulation1.retirementAge);
                displayYourCashFlowTables (simulation1.cashFlowData, simulation1.todaysMoneyCashFlowData, simulation2.retirementAge);
                displayYourPartnersCashFlowTables (simulation2.cashFlowData, simulation2.todaysMoneyCashFlowData, retirementAge) ; */
                plotCouplesFundChart(simulation1.cashFlowData, simulation2.cashFlowData);
            } else {
              /*   displayCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge); */
            }
    
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
                    //document.getElementById("TFCTakenTodaysMoneyText").innerText = `${prefix}Tax Free Cash Taken at age ${retirementAge} : ${(taxFreeCashPercent * 100).toFixed(0)}% of £${(fundAtRetirement * discountFactor).toLocaleString("en-UK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                    //document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken*discountFactor)) + '</strong>';
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
                plotIncomeChart(todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, retirementAge, dontResizeChart, incomeType);
                plotTaxBreakdownChart(todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);
               
                
        
            }  else { /*not todays money values*/
                if (!alreadyRetired) {
                    //document.getElementById("TFCTakenTodaysMoneyText").innerText = `${prefix}Tax Free Cash Taken at age ${retirementAge} : ${(taxFreeCashPercent * 100).toFixed(0)}% of £${(fundAtRetirement).toLocaleString("en-UK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                    //document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken)) + '</strong>';
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
                plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, retirementAge, dontResizeChart, incomeType);
                plotTaxBreakdownChart(cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);
               
                
            }
        
            plotFundChart(cashFlowData, planAsCouple);
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
        
        } else {
            displayRetirementIncomeCashFlowTable(cashFlowData, retirementAge, retirementIncomeTableBody);
            
        }

        displayPensionFundCashFlowTable(cashFlowData,pensionFundCashFlowTableBody);
        displayISACashFlowTable(cashFlowData, ISACashFlowTableBody);
    
       
     
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


    function plotFundChart(cashFlowData, phoneFormat, planAsCouple) {
    
        var ctx = document.getElementById('fundChart').getContext('2d');
    
        // Extract data from cashFlowData
        var ages = cashFlowData.map(data => data.age);
        var pensionFundValues = cashFlowData.map(data => Math.round(data.closingBalance));
        var isaHoldings = cashFlowData.map(data => Math.round(data.ISAholdings));
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
        var heading = `Projected Fund Values`;
    
        // Destroy existing chart instance if it exists to avoid duplication
        if (window.myLineChart) {
            window.myLineChart.destroy();
        }
    
        // Format numbers for the y-axis and tooltips
        function formatNumber(value) {
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
    
        // Build datasets only if there is at least one non-zero value in each series
        var datasets = [];
    
        if (!pensionFundValues.every(value => value === 0)) {
            datasets.push({
                label: 'Pension Fund Value',
                data: pensionFundValues,
                borderColor: '#1E88E5', // Brighter blue for the line
                backgroundColor: 'rgba(30, 136, 229, 0.2)', // Light blue with transparency
                fill: true,
                tension: 0.1
            });
        }
    
        if (!isaHoldings.every(value => value === 0)) {
            datasets.push({
                label: 'ISA Holdings',
                data: isaHoldings,
                borderColor: '#FF8C00', // Brighter orange for the line
                backgroundColor: 'rgba(255, 140, 0, 0.2)', // Light orange 
                fill: true,
                tension: 0.1
            });
        }
    
        // If both datasets are entirely zero, don't plot any values.
        if (datasets.length === 0) {
            return;
        }
    
        // Prepare chart data
        var chartData = {
            labels: ages,
            datasets: datasets
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
                        position: 'top',
                        labels: {
                            // Only include legend items for datasets with at least one non-zero value
                            filter: function(legendItem, chartData) {
                                const dataset = chartData.datasets[legendItem.datasetIndex];
                                return dataset.data.some(value => value !== 0);
                            }
                        }
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
        phoneFormat,
        planAsCouple
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

        var titlePrefix = planAsCouple ? "Combined " : "";
        var headingPrefix = `${titlePrefix}${headingPrefix}`;
    
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
    
        var totalCharges = [...fundCharges, ...isaCharges].reduce((sum, charge) => sum + (charge || 0), 0);
        //heading = heading + ` - Total Charges Over All Ages: ${formatNumber(totalCharges, 'currency')}`;

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
                                return '£' + formatYAxisLabels(value, 'k');
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: [
                            heading, 
                            `Total Charges Over All Ages: ${formatNumber(totalCharges, 'currency')}`
                        ],
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
                                    label += '£' + formatYAxisLabels(context.parsed.y, 'k');
                                }
                                return label;
                            },
                            // Display the total amount in the footer with £ and k
                            footer: function(context) {
                                var total = context.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: £' + formatYAxisLabels(total, 'k');
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
        function formatYAxisLabels(value, formatType) {
            if (formatType === 'k') {
                if (value >= 10000) { // Only add 'k' for values >= £10,000
                    return (value / 1000).toFixed(0) + 'k'; // e.g., 25000 => 25k
                }
                return new Intl.NumberFormat('en-GB').format(value); // e.g., 5000 => 5,000
            } else if (formatType === 'm') {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(2) + 'm'; // e.g., 2500000 => 2.50m
                }
                return formatYAxisLabels(value, 'k');
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
    
        // Build datasets only if there is at least one nonzero value in each series
        var datasets = [];
    
        if (!pensionFundValues1.every(value => value === 0)) {
            datasets.push({
                label: 'Your Pension Fund',
                data: pensionFundValues1,
                borderColor: '#1E88E5', // Brighter blue for the line
                backgroundColor: 'rgba(30, 136, 229, 0.1)', // Light blue with transparency
                fill: true,
                tension: 0.1
            });
        }
    
        if (!isaHoldings1.every(value => value === 0)) {
            datasets.push({
                label: 'Your ISA Holdings',
                data: isaHoldings1,
                borderColor: '#FF8C00', // Brighter orange for the line
                backgroundColor: 'rgba(255, 140, 0, 0.2)', // Light orange with transparency
                fill: true,
                tension: 0.1
            });
        }
    
        if (!pensionFundValues2.every(value => value === 0)) {
            datasets.push({
                label: "Your Partner's Pension Fund",
                data: pensionFundValues2,
                borderColor: 'rgb(56, 163, 251)',
                backgroundColor: 'rgba(56, 163, 251, 0.1)',
                fill: true,
                tension: 0.1
            });
        }
    
        if (!isaHoldings2.every(value => value === 0)) {
            datasets.push({
                label: "Your Partner's ISA Holdings",
                data: isaHoldings2,
                borderColor: 'rgb(254, 155, 57)',
                backgroundColor: 'rgba(254, 175, 57, 0.2)',
                fill: true,
                tension: 0.1
            });
        }
    
        // If no datasets remain (i.e. all data values are zero), do not plot any values.
        if (datasets.length === 0) {
            return;
        }
    
        // Prepare chart data
        var chartData = {
            labels: ages,
            datasets: datasets
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
                        text: 'Projected Fund Values',
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
                        position: 'top',
                        labels: {
                            // Only include legend items for datasets with at least one non-zero value
                            filter: function(legendItem, chartData) {
                                const dataset = chartData.datasets[legendItem.datasetIndex];
                                return dataset.data.some(value => value !== 0);
                            }
                        }
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
                            text: 'Your Age'
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
    
    
    
    
    
    
    function plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart = null, incomeType) {
        // Validate retirementAge
        if (typeof retirementAge !== 'number') {
            console.error('retirementAge must be a number');
            return;
        }
    
        // Determine the appropriate canvas context based on phoneFormat
        var ctx = document.getElementById('incomeChart').getContext('2d');
    
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
        var annuityNet = retirementData.map(data => Math.round(frequencyMultiplier * data.annuityNet / 12));
        var shortfall = retirementData.map(data => Math.round(frequencyMultiplier * Math.max(0, data.shortfall) / 12));
    
        // Determine x-axis label based on planAsCouple and incomeType
        var xLabel = planAsCouple ? 'Your Age' : 'Age';
        if (incomeType == 'Partner') {
            xLabel = "Your Partner's Age";
        }
    
        // Construct the chart heading
        var titlePrefix = "";
        if (planAsCouple) {
            if (incomeType === 'Your') {
                titlePrefix = "Your ";
            } else if (incomeType === 'Partner') {
                titlePrefix = "Your Partner's ";
            } else {
                titlePrefix = "Combined ";
            }
        }
        
        var headingPrefix = `${prefix}Monthly`;
        if (frequencyMultiplier === 12) {
            headingPrefix = `${prefix}Annual`;
        }
        var headingSuffix = applyInflationAdjustment ? " In Today's Money" : " (Projected Future Values)";
        var heading = `${titlePrefix}${headingPrefix} Income${headingSuffix}`;
    
        // Determine heading font size based on window width
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
        // Code to retain existing scale if required
        let existingScale = null;
        if (dontResizeChart && window.myIncomeChart) {
            const xScale = window.myIncomeChart.scales['x'];
            const yScale = window.myIncomeChart.scales['y'];
            if (xScale && yScale) {
                existingScale = {
                    xMin: xScale.min,
                    xMax: xScale.max,
                    yMin: yScale.min,
                    yMax: yScale.max
                };
            }
        }
    
        // Destroy existing chart instance if it exists to avoid duplication
        if (window.myIncomeChart) {
            window.myIncomeChart.destroy();
        }
    
        // Determine the maximum value in the dataset for dynamic step sizing
        var allIncomeData = [...statePensions, ...dbPensions, ...netPensionWithdrawals, ...ISADrawings, ...annuityNet, ...shortfall];
        var maxValue = Math.max(...allIncomeData);
        var stepSize = calculateStepSizeIncome(maxValue);
    
        // Create the new chart using Chart.js with a legend filter callback
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
                        label: 'Annuity Payments',
                        data: annuityNet,
                        backgroundColor: '#005688' // Teal
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
                        },
                        min: existingScale ? existingScale.xMin : undefined,
                        max: existingScale ? existingScale.xMax : undefined
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: '' // Removed (£) symbol
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize,
                            maxTicksLimit: 8,
                            callback: function(value, index, ticks) {
                                return '£' + formatNumber(value, 'k');
                            }
                        },
                        min: existingScale ? existingScale.yMin : undefined,
                        max: existingScale ? existingScale.yMax : undefined
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
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            // Only include legend items for datasets with at least one non-zero value
                            filter: function(legendItem, chartData) {
                                const dataset = chartData.datasets[legendItem.datasetIndex];
                                return dataset.data.some(value => value !== 0);
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += '£' + tooltipFormatNumber(context.parsed.y, 'number');
                                }
                                return label;
                            },
                            footer: function(context) {
                                var total = context.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: £' + tooltipFormatNumber(total, 'number');
                            }
                        }
                    }
                }
            }
        });
    
        // Helper functions
        function formatNumber(value, formatType) {
            if (formatType === 'k') {
                if (value >= 10000) { // Only add 'k' for values >= £10,000
                    return (value / 1000).toFixed(0) + 'k';
                }
                return new Intl.NumberFormat('en-GB').format(value);
            } else if (formatType === 'm') {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(2) + 'm';
                }
                return formatNumber(value, 'k');
            } else if (formatType === 'number') {
                return new Intl.NumberFormat('en-GB').format(value);
            } else {
                return value.toString();
            }
        }
    
        function tooltipFormatNumber(value, formatType) {
            if (formatType === 'number') {
                const numericValue = parseFloat(value);
                if (isNaN(numericValue)) {
                    console.warn(`Invalid number passed to tooltipFormatNumber: ${value}`);
                    return value;
                }
                return new Intl.NumberFormat('en-GB', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(numericValue);
            } else {
                return value.toString();
            }
        }
    
        function calculateStepSizeIncome(maxValue) {
            if (maxValue <= 10000) return 500;
            if (maxValue <= 25000) return 5000;
            if (maxValue <= 100000) return 10000;
            if (maxValue <= 250000) return 25000;
            if (maxValue <= 500000) return 50000;
            if (maxValue <= 1000000) return 100000;
            return 250000;
        }
    }
    
    
    
    
    function plotTaxBreakdownChart(
        cashFlowData, 
        frequencyMultiplier, 
        applyInflationAdjustment, 
        prefix, 
        phoneFormat,
        retirementAge,
        planAsCouple
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
        var annuityTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.annuityTax / 12));
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;

         // Calculate total tax paid
        var totalTax = [...statePensionTaxes, ...dbPensionTaxes, ...pensionWithdrawalTaxes, ...annuityTaxes].reduce((sum, tax) => sum + (tax || 0), 0);
    
        // Adjust data based on inflation if necessary
        if (applyInflationAdjustment) {
            // If inflation adjustment affects tax calculations, adjust here.
            // Currently, the same calculations are applied, but this block is reserved for future adjustments.
            statePensionTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.statePensionTax / 12));
            dbPensionTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.dbPensionTax / 12));
            pensionWithdrawalTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.taxPaid / 12));
            annuityTaxes = retirementData.map(data => Math.round(frequencyMultiplier * data.annuityTax / 12));
        }
    
        // Heading for the chart
        var titlePrefix = planAsCouple ? "Combined" : "";
        var headingSuffix = " (Projected Future Values)";
        if (applyInflationAdjustment) {
            headingSuffix = " (In Today's Money)";
        }
        var heading = `${titlePrefix}${prefix} Annual Tax Breakdown${headingSuffix}`;
    
        // Append retirement age to the heading for clarity
        //heading += ` from Age ${retirementAge}`;
    
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
                        label: 'Annuity Tax',
                        data: annuityTaxes,
                        backgroundColor: '#005688'
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
                                return '£' + formatYAxisLabels(value, 'k');
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: [
                            heading, 
                            `Total Tax Over All Ages: ${formatNumber(totalTax, 'currency')}`
                        ],
                        font: {
                            size: headingFontSize,
                            family: 'Arial',
                            weight: 'bold'
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
                                    label += '£' + formatYAxisLabels(context.parsed.y, 'k');
                                }
                                return label;
                            },
                            // Display the total amount in the footer with £ and k
                            footer: function(context) {
                                var total = context.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: £' + formatYAxisLabels(total, 'k');
                            }
                        }
                    }
                }
            }
        });
    
      
        function formatYAxisLabels(value, formatType) {
            if (formatType === 'k') {
                if (value >= 10000) { // Only add 'k' for values >= £10,000
                    return (value / 1000).toFixed(0) + 'k'; // e.g., 25000 => 25.0k
                }
                return new Intl.NumberFormat('en-GB').format(value); // e.g., 5000 => 5,000
            } else if (formatType === 'm') {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(2) + 'm'; // e.g., 2500000 => 2.50m
                }
                return formatYAxisLabels(value, 'k');
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
    

    
    
    
    function updateChartVisibility(source) {


        if (localStorage.getItem('selectedChart') === null) {
            saveToLocalStorage('selectedChart', 'Income');
        }

        previousIncomeType = localStorage.getItem('selectedChart');
        saveToLocalStorage('previousIncomeType', previousIncomeType);
        
        if (source === 'notDropDown') {
            var selectedChart = localStorage.getItem('selectedChart'); // Retrieve value from localStorage
            var chartSelector = document.getElementById('chartSelector'); // Get the dropdown element

            if (chartSelector && selectedChart) {
                chartSelector.value = selectedChart; // Set dropdown to the stored value
            }
        } else {
            // Get the selected value from the dropdown
            var selectedChart = document.getElementById("chartSelector").value;
            saveToLocalStorage('selectedChart', selectedChart);  
        }
       
        
        /* if (selectedChart === "Your" || selectedChart === "Partner") {
            saveToLocalStorage('selectedChart', selectedChart);  
        } else {
            localStorage.removeItem('selectedChart');
        } */


        // Chart containers
        const incomeChartContainer = document.getElementById("incomeChartContainer");
        const fundChartContainer = document.getElementById("fundChartContainer");
        const taxChartContainer = document.getElementById("taxChartContainer");
        const chargesChartContainer = document.getElementById("chargesChartContainer");
        
        
        // Hide all charts
        fundChartContainer.classList.add("hidden");
        incomeChartContainer.classList.add("hidden");
        taxChartContainer.classList.add("hidden");
        chargesChartContainer.classList.add("hidden");
    
    
        // Show the selected chart
        if (selectedChart === "Fund") {
            applyInflationAdjustmentPhone.checked = false;
            fundChartContainer.classList.remove("hidden");
            saveAndCalc();
            //updateTableVisibility();
        } else if (selectedChart === "Income") {
            //applyInflationAdjustmentPhone.checked = true;
            incomeChartContainer.classList.remove("hidden");
            saveAndCalc();
        } else if (selectedChart === "Your") {
            //applyInflationAdjustmentPhone.checked = true;
            incomeChartContainer.classList.remove("hidden");
            saveAndCalc('Your');
        } else if (selectedChart === "Partner") {
            //applyInflationAdjustmentPhone.checked = true;
            incomeChartContainer.classList.remove("hidden");
            saveAndCalc('Partner');
        } else if (selectedChart === "Tax") {
            //applyInflationAdjustmentPhone.checked = true;
            taxChartContainer.classList.remove("hidden");
            saveAndCalc();
        } else if (selectedChart === "Charges") {
            //applyInflationAdjustmentPhone.checked = true;
            chargesChartContainer.classList.remove("hidden");
            saveAndCalc();
        }
    
        
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
            saveAndCalc();
        } else if (selectedTable === "pensionFundCashflow") {
            pensionFundCashflowContainer.classList.remove("hidden");
            pensionFundCashflowContainer.classList.add("visible");
            saveAndCalc();
        } else if (selectedTable === "ISACashflow") {
            ISACashflowContainer.classList.remove("hidden");
            ISACashflowContainer.classList.add("visible");
            saveAndCalc();
        } else if (selectedTable === "yourRetirementIncome") {
            retirementIncomeContainer.classList.remove("hidden");
            retirementIncomeContainer.classList.add("visible");
            saveAndCalc('Your');
        } else if (selectedTable === "partnerRetirementIncome") {
            retirementIncomeContainer.classList.remove("hidden");
            retirementIncomeContainer.classList.add("visible");
            saveAndCalc('Partner');
        } 
        
    
        
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

         // 8. Annuity Income
         var tdAnnuityIncome = document.createElement('td');
         tdAnnuityIncome.textContent = '£' + formatNumber(Math.floor(row.annuityGross || 0));
         tr.appendChild(tdAnnuityIncome);

        // 6. Pension Fund Income
        var tdPensionFundIncome = document.createElement('td');
        tdPensionFundIncome.textContent = '£' + formatNumber(Math.floor(row.grossPensionWithdrawal || 0));
        tr.appendChild(tdPensionFundIncome);

         // 9. Total Taxable Income
         var totalGrossIncome = Math.floor(row.statePensionInPayment) + Math.floor(row.dbPensionInPayment) + Math.floor(row.grossPensionWithdrawal) + Math.floor(row.annuityNet);
         var tdTotalGrossIncome = document.createElement('td');
         tdTotalGrossIncome.textContent = '£' + formatNumber(Math.floor(totalGrossIncome || 0));
         tr.appendChild(tdTotalGrossIncome);

        // 3. Net State Pension
        var tdTaxStatePension = document.createElement('td');
        tdTaxStatePension.textContent = '£' + formatNumber(Math.floor(row.statePensionInPayment - row.statePensionTax ));
        tr.appendChild(tdTaxStatePension);

        // 5. Net DB Pension
        var tdTaxDBPension = document.createElement('td');
        tdTaxDBPension.textContent = '£' + formatNumber(Math.floor(row.dbPensionInPayment - row.dbPensionTax ));
        tr.appendChild(tdTaxDBPension);

        // Net annuity income
        var tdTaxAnnuityPayments = document.createElement('td');
        tdTaxAnnuityPayments.textContent = '£' + formatNumber(Math.floor(row.annuityGross - row.annuityTax));
        tr.appendChild(tdTaxAnnuityPayments);

        // 7. Net Pension Fund Income
        var tdTaxPensionFundIncome = document.createElement('td');
        tdTaxPensionFundIncome.textContent = '£' + formatNumber(Math.floor(row.grossPensionWithdrawal || 0) - Math.floor(row.taxPaid || 0));
        tr.appendChild(tdTaxPensionFundIncome);

      

        // 10. Total Tax Paid
        var totalTaxPaid = Math.floor(row.statePensionTax) + Math.floor(row.dbPensionTax) + Math.floor(row.taxPaid) + Math.floor(row.annuityTax);
        var tdTotalTaxPaid = document.createElement('td');
        tdTotalTaxPaid.textContent = '£' + formatNumber(Math.floor(totalTaxPaid || 0));
        tr.appendChild(tdTotalTaxPaid);

        // 8. ISA Withdrawals
        var tdISAWithdrawals = document.createElement('td');
        tdISAWithdrawals.textContent = '£' + formatNumber(Math.floor(row.ISADrawings || 0));
        tr.appendChild(tdISAWithdrawals);

       // 11. Total Net Income
       var totalNetIncome = Math.floor(row.withdrawal) + Math.floor(row.statePension) + Math.floor(row.dbPension) + Math.floor(row.ISADrawings) + Math.floor(row.annuityNet);
       var tdTotalNetIncome = document.createElement('td');
       tdTotalNetIncome.textContent = '£' + formatNumber(Math.floor(totalNetIncome));
       tr.appendChild(tdTotalNetIncome);

        tableBody.appendChild(tr);
    });
}



function toggleCashISASection() {
    const cashISAInterestRateContainer = document.getElementById('cashISAInterestRateContainer');
    const ISAGrowthContainer = document.getElementById('ISAGrowthContainer');
    const ISAChargesContainer = document.getElementById('ISAChargesContainer');
    const planAsCouple =  (localStorage.getItem('planAsCouple') === 'true');

    const isCashISAVisible = localStorage.getItem('showCashISASavings') === 'true';
    const isPartnerCashISAVisible = localStorage.getItem('showPartnerCashISASavings') === 'true'

    
    // Select the label element using its 'for' attribute
    const isaLabel = document.getElementById('cashISALabel');

    
    if (isCashISAVisible) {
        isaLabel.textContent = "Cash ISA Balance";
    } else {
        isaLabel.textContent = "ISA Holdings";
    }
    

    if (cashISAInterestRateContainer && ISAGrowthContainer && ISAChargesContainer) {
        // Determine visibility based on the checkbox's checked state
        //<i class="bi bi-arrow-up-right-circle " style="font-size: 1.5rem; color: #007bff; margin-right: 1rem;"></i>
        if (isCashISAVisible) {
            document.getElementById("inflationInterestLabel").innerHTML = `<i class="bi bi-arrow-up-right-circle" style="font-size: 1.5rem; color: #007bff; margin-right: 1rem;"></i> Interest Rate & Inflation`;
        } else {
            document.getElementById("inflationInterestLabel").innerHTML = `<i class="bi bi-arrow-up-right-circle" style="font-size: 1.5rem; color: #007bff; margin-right: 1rem;"></i> Inflation`;
        }
        
        
        if (planAsCouple) {
            if (isCashISAVisible && isPartnerCashISAVisible) {
                // Show cashISAInterestRateContainer and hide ISAGrowthContainer and ISAChargesContainer
                cashISAInterestRateContainer.classList.remove('hidden');
                ISAGrowthContainer.classList.add('hidden');
                ISAChargesContainer.classList.add('hidden');
                saveToLocalStorage('isaGrowth', 0);
                saveToLocalStorage('isaCharges', 0);
                initialiseInputAndSlider('isaGrowthPercentPhone', 'isaGrowth', 'isaGrowthSlider', 'percentage');
                initialiseInputAndSlider('isaChargesPercentPhone', 'isaCharges', 'isaChargesSlider', 'percentage');
            } else if (isCashISAVisible && !isPartnerCashISAVisible || !isCashISAVisible && isPartnerCashISAVisible) {
                cashISAInterestRateContainer.classList.remove('hidden');
            } else {
                // Hide cashISAInterestRateContainer and show ISAGrowthContainer and ISAChargesContainer
                cashISAInterestRateContainer.classList.add('hidden');
                saveToLocalStorage('isaInterestRate', 0);
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
                saveToLocalStorage('isaGrowth', 0);
                saveToLocalStorage('isaCharges', 0);
                initialiseInputAndSlider('isaGrowthPercentPhone', 'isaGrowth', 'isaGrowthSlider', 'percentage');
                initialiseInputAndSlider('isaChargesPercentPhone', 'isaCharges', 'isaChargesSlider', 'percentage');
            } else {
                // Hide cashISAInterestRateContainer and show ISAGrowthContainer and ISAChargesContainer
                cashISAInterestRateContainer.classList.add('hidden');
                saveToLocalStorage('isaInterestRate', 0);
                ISAGrowthContainer.classList.remove('hidden');
                ISAChargesContainer.classList.remove('hidden');
                initialiseInputAndSlider('isaInterestRatePercentPhone', 'isaInterestRate', 'isaInterestRateSlider', 'percentage');
            }
        }
        
    }
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
    updateOutput('inputMonthlyContributionPhone', monthlyContribution, 'currency');
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




