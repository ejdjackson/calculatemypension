// Function to save inputs and calculate
function saveAndCalcLandscape(incomeType = null) {
    // First process the selected retirement income option
    /*  restoreSelectedRetirementIncomeStandardOption(); */
    initialiseLocalStorageValues();
    saveInputsToLocalStoragePhone();
    const planAsCouple =  (localStorage.getItem('planAsCouple') === 'true');

    

    if (incomeType === null) {
        const chartSelector = localStorage.getItem('selectedChart');
        if (chartSelector === 'Your' || chartSelector === 'Partner' || chartSelector === 'YourTax' || chartSelector === 'PartnerTax') {
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

// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('input');

document.addEventListener('DOMContentLoaded', function() {
   
    //saveAndCalcLandscape();
    
    
    
        // Set initial dropdowns based on saved state
        const isPlanAsCouple = localStorage.getItem('planAsCouple') === 'true';
        updateDropdowns(isPlanAsCouple);

        
    
    
});






function updateDropdowns(isPlanAsCouple) {
    const chartSelector = document.getElementById('chartSelector');
    const tableSelector = document.getElementById('tableSelector');

    // Clear current options
    chartSelector.innerHTML = '';
    tableSelector.innerHTML = '';

    if (isPlanAsCouple) {
        // Add options for Plan As A Couple (true)
        //
        chartSelector.innerHTML = `
            <option value="Income">Combined Income Breakdown</option>
            <option value="Your">Your Individual Income Breakdown</option>
            <option value="Partner">Your Partner's Income Breakdown</option>
            <option value="Fund">Fund Values</option>
            <option value="Tax">Combined Tax Payments</option>
            <option value="Charges">Combined Fund Charges</option>
            <option value="YourTax">Your Tax by Tax Band</option>
            <option value="PartnerTax">Your Partner's Tax by Tax Band</option>
             <option value="TFC">Cumulative Tax Free Cash</option>
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
        //
        chartSelector.innerHTML = `
            <option value="Income" selected>Income Breakdown</option>
            <option value="Fund">Fund Values</option>
            <option value="Charges">Fund Charges</option>
            <option value="TaxBand">Tax by Tax Band</option>
            <option value="Tax">Tax by Source</option>
            <option value="TFC">Cumulative Tax Free Cash</option>
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
        saveAndCalcLandscape();
    });
});



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
    saveAndCalcLandscape();
    if (switchElement.checked) {
        console.log("Switched to Monthly Income");
    } else {
        console.log("Switched to Yearly Income");
    }
}

function toggleValuePerspective(switchElement) {
    saveAndCalcLandscape();
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

      
        const inflation = parseFloat(localStorage.getItem("inflation"))/100 ;
        const currentAgePartner = parseInt(localStorage.getItem('currentAgePartner')) ;

      
        if (phoneFormat) {
            
            
            var prefix = "";
            var desiredIncomePrefix = "";
            if (applyInflationAdjustment) {
                desiredIncomePrefix = `Today\'s Money Value of ${prefix}`;
            } else {
                desiredIncomePrefix = `Future Value of ${prefix}`;
            }
            
            if (applyInflationAdjustment)  { /*todays money values*/

               

                // First plot to get the total overall income etc based on annual values
                var annualIncomeObject = plotIncomeChart(cashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                // Now plot again to plot the chart in the correctly frequency (monthly or annual)
                var incomeObject = plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                
                
                totalCharges = plotChargesChart(cashFlowData, 12, applyInflationAdjustment, prefix, phoneFormat, planAsCouple);
                plotFundChart(cashFlowData, phoneFormat, planAsCouple);
                plotCumulativeTaxFreeCash(cashFlowData, phoneFormat, planAsCouple, retirementAge);
                
               
                
                


                // Redo the charts in today's money
                var todaysMoneyIncomeObject = plotIncomeChart(todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                
                plotTaxBreakdownChart(todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple, incomeType);
                var todaysMoneyTotalTax = plotTaxByTaxBandChart(todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);

                var totalFutureTaxRate = 100 * todaysMoneyTotalTax / (todaysMoneyIncomeObject.totalIncome + taxFreeCashTaken);
               
                
                

                if (alreadyRetired ) {

                }
            
    
            }  else { /*not todays money values*/
    
              
            
                
                
                    
                var annualIncomeObject = plotIncomeChart(cashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                var incomeObject = plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                
                
                totalCharges = plotChargesChart(cashFlowData, 12, applyInflationAdjustment, prefix, phoneFormat, planAsCouple);
                plotFundChart(cashFlowData, phoneFormat, planAsCouple);
                plotCumulativeTaxFreeCash(cashFlowData, phoneFormat, planAsCouple, retirementAge);
                
               

                var totalChargeRate = 100 * totalCharges / annualIncomeObject.totalNonGuaranteed;
                
                plotTaxBreakdownChart(cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple, incomeType);
                var totalTax = plotTaxByTaxBandChart(cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);

                var totalFutureTaxRate = 100 * totalTax / (annualIncomeObject.totalIncome + taxFreeCashTaken);
                
                
            
    
            }

            
        
            if(planAsCouple) {

               
                if (incomeType === 'Your' ) { 
                    if (applyInflationAdjustment)  { 
                        var annualIncomeObject = plotIncomeChart(simulation1.todaysMoneyCashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation1.todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                    } else {
                        var annualIncomeObject = plotIncomeChart(simulation1.cashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation1.cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                    }   
                    
                } else if (incomeType === 'Partner') {
                    if (applyInflationAdjustment)  { 
                        var annualIncomeObject = plotIncomeChart(simulation2.todaysMoneyCashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation2.todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                    } else {
                        var annualIncomeObject = plotIncomeChart(simulation2.cashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation2.cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                    }
                } else {
                    
                }
                
                

                

                

                // Tax by Tax Band Charts
                if (incomeType === 'YourTax' ) { 
                    if (applyInflationAdjustment)  { 
                        var annualIncomeObject = plotIncomeChart(simulation1.todaysMoneyCashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation1.todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var totalTax = plotTaxByTaxBandChart(simulation1.todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);

                        var totalFutureTaxRate = 100 * totalTax / (annualIncomeObject.totalIncome + simulation1.taxFreeCashTaken);
                        //document.getElementById("totalFutureTaxRate").innerHTML = '<strong>' + formatNumber(totalFutureTaxRate.toFixed(1),'percentage') + '</strong>';
                    } else {
                        var annualIncomeObject = plotIncomeChart(simulation1.cashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation1.cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var totalTax = plotTaxByTaxBandChart(simulation1.cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);

                        var totalFutureTaxRate = 100 * totalTax / (annualIncomeObject.totalIncome + simulation1.taxFreeCashTaken);
                        //document.getElementById("totalFutureTaxRate").innerHTML = '<strong>' + formatNumber(totalFutureTaxRate.toFixed(1),'percentage') + '</strong>';
                    }
                } else if (incomeType === 'PartnerTax' ) { 
                    if (applyInflationAdjustment)  { 
                        var annualIncomeObject = plotIncomeChart(simulation2.todaysMoneyCashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation2.todaysMoneyCashFlowData,frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var totalTax = plotTaxByTaxBandChart(simulation2.todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);
                        todaysMoneyCashFlowData
                        var totalFutureTaxRate = 100 * totalTax / (annualIncomeObject.totalIncome + simulation2.taxFreeCashTaken);
                       // document.getElementById("totalFutureTaxRate").innerHTML = '<strong>' + formatNumber(totalFutureTaxRate.toFixed(1),'percentage') + '</strong>';
                    } else {
                        var annualIncomeObject = plotIncomeChart(simulation2.cashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var incomeObject = plotIncomeChart(simulation2.cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var totalTax = plotTaxByTaxBandChart(simulation2.cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);

                        var totalFutureTaxRate = 100 * totalTax / (annualIncomeObject.totalIncome + simulation2.taxFreeCashTaken);
                       // document.getElementById("totalFutureTaxRate").innerHTML = '<strong>' + formatNumber(totalFutureTaxRate.toFixed(1),'percentage') + '</strong>';
                    }
                } else if (incomeType == null || incomeType == 'Combined') { // Need to calculate the Total Retirement Tax Rate separately
                    if (applyInflationAdjustment)  { 
                        //var annualIncomeObject = plotIncomeChart(simulation.todaysMoneyCashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var totalTax = plotTaxByTaxBandChart(simulation1.todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple)
                                     + plotTaxByTaxBandChart(simulation2.todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAgePartner, planAsCouple);
                        
                        if (alreadyRetired) { // Don't allow for tax free cash in the total tax rate calculation
                            var taxFreeCashTakenToUse = 0;
                        } else {
                            var taxFreeCashTakenToUse = taxFreeCashTaken;
                        }
                        var totalFutureTaxRate = 100 * totalTax / (annualIncomeObject.totalIncome + taxFreeCashTakenToUse);
                        //document.getElementById("totalFutureTaxRate").innerHTML = '<strong>' + formatNumber(totalFutureTaxRate.toFixed(1),'percentage') + '</strong>';
                    } else {
                        //var annualIncomeObject = plotIncomeChart(simulation.cashFlowData, 12, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                        var totalTax = plotTaxByTaxBandChart(simulation1.cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple)
                                     + plotTaxByTaxBandChart(simulation2.cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAgePartner, planAsCouple);

                        if (alreadyRetired) { // Don't allow for tax free cash in the total tax rate calculation
                            var taxFreeCashTakenToUse = 0;
                        } else {
                            var taxFreeCashTakenToUse = taxFreeCashTaken;
                        }
                        var totalFutureTaxRate = 100 * totalTax / (annualIncomeObject.totalIncome + taxFreeCashTaken);
                        //document.getElementById("totalFutureTaxRate").innerHTML = '<strong>' + formatNumber(totalFutureTaxRate.toFixed(1),'percentage') + '</strong>';
                    }
                }
                



                
            } else {
               
                
                
                
            }

            
                        


            
            displayCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge);

            if (planAsCouple) {
               /*  displayCashFlowTables (combinedCashFlowData, combinedTodaysMoneyCashFlowData, simulation1.retirementAge);
                displayYourCashFlowTables (simulation1.cashFlowData, simulation1.todaysMoneyCashFlowData, simulation2.retirementAge);
                displayYourPartnersCashFlowTables (simulation2.cashFlowData, simulation2.todaysMoneyCashFlowData, retirementAge) ; */
                plotCouplesFundChart(simulation1.cashFlowData, simulation2.cashFlowData);
                plotCouplesCumulativeTaxFreeCash(simulation1.cashFlowData, simulation2.cashFlowData, retirementAge, retirementAgePartner)

                /* if (applyInflationAdjustment) {
                    document.getElementById("partnerInputTFCTaken").innerHTML = '<strong>£' + formatNumber(Math.round(simulation2.taxFreeCashTaken*discountFactor)) + '</strong>';
                    if (simulation2.taxFreeCashTaken == 268275) {
                        document.getElementById("partnerTFCMaxExplainerLabel").innerHTML = 'You have elected to take the maximum tax-free lump sum of £' + formatNumber(Math.round(268275*discountFactor)) + ' (in today\'s money)';
                    } else {
                        document.getElementById("partnerTFCMaxExplainerLabel").innerHTML = 'The maximum tax free lump sum is £' + formatNumber(Math.round(268275*discountFactor)) + ' (in today\'s money)';
                    }
                } else {
                    document.getElementById("partnerInputTFCTaken").innerHTML = '<strong>£' + formatNumber(Math.round(simulation2.taxFreeCashTaken)) + '</strong>';
                    if (simulation2.taxFreeCashTaken == 268275) {
                        document.getElementById("partnerTFCMaxExplainerLabel").innerHTML = 'You have elected to take the maximum tax-free lump sum of £' + formatNumber(Math.round(268275));
                    } else {
                        document.getElementById("partnerTFCMaxExplainerLabel").innerHTML = 'The maximum tax free lump sum is £' + formatNumber(Math.round(268275));
                    }
                } */

                // Annuity quote
             /*    var annuityAge = parseInt(localStorage.getItem('annuityAge'));
                var fundConversion = parseFloat(localStorage.getItem('fundConversion')) ;
                const openingBalanceAtAnnuityAge = simulation1.cashFlowData.find(data => data.age === annuityAge)?.openingBalance || null;
                const annuityGrossAtAnnuityAge = simulation1.cashFlowData.find(data => data.age === annuityAge)?.annuityGross || null;
                
                document.getElementById("annuityExplainer").innerHTML = 'The value of <strong>' + formatNumber(Math.round(fundConversion)) + '%</strong> of your pension fund at age <strong>' + formatNumber(Math.round(annuityAge)) + '</strong> is projected to be <strong>£' + formatNumber(Math.round(openingBalanceAtAnnuityAge*fundConversion/100)) + '</strong>. Based on current annuity rates, this could be converted to an annual income of <strong>£' + formatNumber(Math.round(annuityGrossAtAnnuityAge)) + '</strong> (before tax). <br><br>Annuity rates are calculated for an income that increases with inflation, no reversionary element for a surviving partner, mortality based on the IFoA CMI tables and profit/expense loadings calibrated to match market annuity quotes in February 2025. ';
                 */

                // Annuity quote for partner
                var annuityAgePartner = parseInt(localStorage.getItem('annuityAgePartner'));
                var fundConversionPartner = parseFloat(localStorage.getItem('fundConversionPartner')) ;
                var tfcTakenOnConversion = simulation2.tfcTakenOnConversion;
                var yearsToReduceISAGrowthBy =  tfcTakenOnConversion / 20000;
                const openingBalanceAtAnnuityAgePartner = simulation2.cashFlowData.find(data => data.age === annuityAgePartner)?.openingBalance || null;
                const annuityGrossAtAnnuityAgePartner = simulation2.cashFlowData.find(data => data.age === annuityAgePartner)?.annuityGross || null;
                const ageDiff = parseInt(localStorage.getItem('ageDiff'));
                
                //document.getElementById("annuityExplainerPartner").innerHTML = 'The value of <strong>' + formatNumber(Math.round(fundConversionPartner)) + '%</strong> of your partner\'s pension fund at age <strong>' + formatNumber(Math.round(annuityAgePartner)) + '</strong> is projected to be <strong>£' + formatNumber(Math.round(openingBalanceAtAnnuityAgePartner*fundConversionPartner/100)) + '</strong>. Based on current annuity rates, this could be converted to an annual income of <strong>£' + formatNumber(Math.round(annuityGrossAtAnnuityAgePartner)) + '</strong> (before tax). <br><br>Annuity rates are calculated for an income that increases with inflation, no reversionary element for a surviving partner, mortality based on the IFoA CMI tables and profit/expense loadings calibrated to match market annuity quotes in February 2025. ';

             
                
            } else {
              /*   displayCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge); */
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
    
        displayRetirementIncomeCashFlowTable(cashFlowData, retirementAge, retirementIncomeTableBody);
            
        

        displayPensionFundCashFlowTable(cashFlowData,pensionFundCashFlowTableBody);
        displayISACashFlowTable(cashFlowData, ISACashFlowTableBody);
    
       
     
    }
    
    function displayYourCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge) {
        
            var applyInflationAdjustment = document.getElementById("applyInflationAdjustment").checked;
            var retirementIncomeTableYourBody = document.getElementById('retirementIncomeTableContainerYour').getElementsByTagName('tbody')[0];
            var pensionFundCashFlowTableYourBody = document.getElementById('pensionFundCashFlowTableContainerYour').getElementsByTagName('tbody')[0];
            var ISACashFlowTableYourBody = document.getElementById('ISACashFlowTableContainerYour').getElementsByTagName('tbody')[0];
    
            displayRetirementIncomeCashFlowTable(cashFlowData, retirementAge, retirementIncomeTableYourBody);
            displayPensionFundCashFlowTable(cashFlowData,pensionFundCashFlowTableYourBody);
            displayISACashFlowTable(cashFlowData, ISACashFlowTableYourBody);
    
            document.getElementById("pensionFundCashFlowTableContainerYour").classList.remove("hidden");
            document.getElementById("ISACashFlowTableContainerYour").classList.remove("hidden");
            document.getElementById("retirementIncomeTableContainerYour").classList.remove("hidden");
    
    }
    
    function displayYourPartnersCashFlowTables (cashFlowData, todaysMoneyCashFlowData, retirementAge) {
        
        var applyInflationAdjustment = document.getElementById("applyInflationAdjustment").checked;
        var retirementIncomeTableYourPartnerBody = document.getElementById('retirementIncomeTableContainerYourPartner').getElementsByTagName('tbody')[0];
        var pensionFundCashFlowTableYourPartnerBody = document.getElementById('pensionFundCashFlowTableContainerYourPartner').getElementsByTagName('tbody')[0];
        var ISACashFlowTableYourPartnerBody = document.getElementById('ISACashFlowTableContainerYourPartner').getElementsByTagName('tbody')[0];
    
        
        displayRetirementIncomeCashFlowTable(cashFlowData, retirementAge, retirementIncomeTableYourPartnerBody);
        displayPensionFundCashFlowTable(cashFlowData,pensionFundCashFlowTableYourPartnerBody);
        displayISACashFlowTable(cashFlowData, ISACashFlowTableYourPartnerBody);
    
    
        document.getElementById("pensionFundCashFlowTableContainerYourPartner").classList.remove("hidden");
        document.getElementById("ISACashFlowTableContainerYourPartner").classList.remove("hidden");
        document.getElementById("retirementIncomeTableContainerYourPartner").classList.remove("hidden");
    
    }


    
    
    
    


    function plotCumulativeTaxFreeCash(cashFlowData, phoneFormat, planAsCouple, retirementAge) {
        // Validate retirementAge
        if (typeof retirementAge !== 'number') {
            console.error('retirementAge must be a number');
            return;
        }
        
        // Filter the cashFlowData based on retirementAge
        var filteredData = cashFlowData.filter(data => data.age >= retirementAge);
        if (filteredData.length === 0) {
            console.warn(`No data available for retirement age ${retirementAge} or beyond.`);
            return;
        }
        
        // Get the context from the cumulative chart canvas element
        var ctx = document.getElementById('TFCChartTablet').getContext('2d');
    
        // Extract age and cumulative TFC values from filteredData
        var ages = filteredData.map(data => data.age);
        var cumulativeTFC = filteredData.map(data => Math.round(data.cumulativeTFC));
    
        // Set chart title and font size
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
        var heading = `Cumulative Tax Free Cash`;
    
        // Destroy existing cumulative chart instance if it exists
        if (window.myCumulativeChart) {
            window.myCumulativeChart.destroy();
        }
    
        // Helper: format numbers with commas
        function formatNumber(value) {
            return value.toLocaleString();
        }
    
        // Helper: calculate dynamic step size based on maximum value
        function calculateStepSize(maxValue) {
            if (maxValue <= 250000) return 25000;
            if (maxValue <= 750000) return 50000;
            if (maxValue <= 1500000) return 125000;
            if (maxValue <= 3000000) return 250000;
            return 500000;
        }
        var maxValue = Math.max(...cumulativeTFC);
        var stepSize = calculateStepSize(maxValue);
    
        // Only create the chart if at least one value is non-zero
        if (cumulativeTFC.every(value => value === 0)) {
            return;
        }
    
        // Build the dataset for cumulative tax free cash
        var dataset = {
            label: 'Cumulative Tax Free Cash Taken',
            data: cumulativeTFC,
            borderColor: '#28A745',
            backgroundColor: 'rgba(40, 167, 69, 0.2)',
            fill: true,
            tension: 0.1
        };
    
        // Prepare the chart data
        var chartData = {
            labels: ages,
            datasets: [dataset]
        };
    
        // Create the chart instance
        window.myCumulativeChart = new Chart(ctx, {
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
                            stepSize: stepSize,
                            maxTicksLimit: 8,
                            callback: function(value) {
                                return '£' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }





// Function for the remaining fund data (Pension Fund Value and ISA Holdings)
function plotFundChart(cashFlowData, phoneFormat, planAsCouple) {
    // Get the context from the fund chart canvas element
    var ctx = document.getElementById('fundChart').getContext('2d');

    // Extract ages, pension fund values, and ISA holdings
    var ages = cashFlowData.map(data => data.age);
    var pensionFundValues = cashFlowData.map(data => Math.round(data.openingBalance));
    var isaHoldings = cashFlowData.map(data => Math.round(data.ISAOpeningBalance));

    // Set chart title and font size
    var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    var heading = `Projected Fund Values (Opening Balances)`;

    // Destroy existing fund chart instance if it exists
    if (window.myLineChart) {
        window.myLineChart.destroy();
    }

    // Helper: format numbers with commas
    function formatNumber(value) {
        return value.toLocaleString();
    }

    // Helper: calculate dynamic step size based on maximum value
    function calculateStepSize(maxValue) {
        if (maxValue <= 250000) return 25000;
        if (maxValue <= 750000) return 50000;
        if (maxValue <= 1500000) return 125000;
        if (maxValue <= 3000000) return 250000;
        return 500000;
    }
    var maxValue = Math.max(...pensionFundValues, ...isaHoldings);
    var stepSize = calculateStepSize(maxValue);

    // Build datasets for Pension Fund Value and ISA Holdings (only add if non-zero)
    var datasets = [];

    if (!pensionFundValues.every(value => value === 0)) {
        datasets.push({
            label: 'Pension Fund Value',
            data: pensionFundValues,
            borderColor: '#1E88E5',
            backgroundColor: 'rgba(30, 136, 229, 0.2)',
            fill: true,
            tension: 0.1
        });
    }

    if (!isaHoldings.every(value => value === 0)) {
        datasets.push({
            label: 'ISA Holdings',
            data: isaHoldings,
            borderColor: '#FF8C00',
            backgroundColor: 'rgba(255, 140, 0, 0.2)',
            fill: true,
            tension: 0.1
        });
    }

    // If there is no data to display, exit the function
    if (datasets.length === 0) {
        return;
    }

    // Prepare the chart data
    var chartData = {
        labels: ages,
        datasets: datasets
    };

    // Create the chart instance
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
                        filter: function (legendItem, chartData) {
                            const dataset = chartData.datasets[legendItem.datasetIndex];
                            return dataset.data.some(value => value !== 0);
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
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
                        stepSize: stepSize,
                        maxTicksLimit: 8,
                        callback: function (value) {
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

        return totalCharges;
    }
    
    
    

    function plotCouplesCumulativeTaxFreeCash(cashFlowData1, cashFlowData2, retirementAge, retirementAgePartner) {
        // Validate retirementAge
        if (typeof retirementAge !== 'number') {
            console.error('retirementAge must be a number');
            return;
        }
        
        // Filter each partner's data for ages >= retirementAge
        var filteredData1 = cashFlowData1.filter(data => data.age >= retirementAge);
        var filteredData2 = cashFlowData2.filter(data => data.age >= retirementAgePartner);
        
        // If both filtered datasets are empty, exit the function
        if (filteredData1.length === 0 && filteredData2.length === 0) {
            console.warn(`No data available for retirement age ${retirementAge} or beyond.`);
            return;
        }
        
        // Get the canvas context from the cumulative chart element
        var ctx = document.getElementById('TFCChartTablet').getContext('2d');

        if (window.myCumulativeChart) {
            window.myCumulativeChart.destroy();
        }
        
        // Determine ages from either filtered dataset (assuming at least one has data)
        var ages = (filteredData1.length > 0 ? filteredData1 : filteredData2).map(data => data.age);
        // Extract cumulative TFC values from the filtered data
        var cumulativeTFC1 = filteredData1.map(data => Math.round(data.cumulativeTFC));
        var cumulativeTFC2 = filteredData2.map(data => Math.round(data.cumulativeTFC));
        
        // Set chart title and font size
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
        var heading = 'Couples Cumulative Tax Free Cash';
        
        // Destroy an existing cumulative chart instance if it exists
        if (window.myCouplesCumulativeChart) {
            window.myCouplesCumulativeChart.destroy();
        }
        
        // Helper: format numbers (using m/k notation when appropriate)
        function formatNumber(value) {
            /* if (value >= 1000000) {
                return (value / 1000000).toFixed(2) + 'm';
            } else if (value >= 100000) {
                return (value / 1000).toFixed(0) + 'k';
            } */
            return value.toLocaleString();
        }
        
        // Helper: calculate the step size dynamically based on maximum value
        function calculateStepSize(maxValue) {
            if (maxValue <= 250000) return 25000;
            if (maxValue <= 750000) return 50000;
            if (maxValue <= 1500000) return 125000;
            if (maxValue <= 3000000) return 250000;
            return 500000;
        }
        
        // Determine the maximum value from both cumulativeTFC arrays and calculate step size
        var maxValue = Math.max(...cumulativeTFC1, ...cumulativeTFC2);
        var stepSize = calculateStepSize(maxValue);
        
        // Build datasets only if each series contains at least one nonzero value
        var datasets = [];
        if (filteredData1.length > 0 && !cumulativeTFC1.every(value => value === 0)) {
            datasets.push({
                label: 'Your Cumulative TFC',
                data: cumulativeTFC1,
                borderColor: '#28A745',
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                fill: true,
                tension: 0.1
            });
        }
        if (filteredData2.length > 0 && !cumulativeTFC2.every(value => value === 0)) {
            datasets.push({
                label: "Your Partner's Cumulative TFC",
                data: cumulativeTFC2,
                borderColor: '#36c423',
                backgroundColor: 'rgba(42, 184, 17, 0.2)',
                fill: true,
                tension: 0.1
            });
        }
        
        // If no datasets remain, exit the function
        if (datasets.length === 0) {
            return;
        }
        
        // Prepare chart data
        var chartData = {
            labels: ages,
            datasets: datasets
        };
        
        // Create the cumulative tax free cash chart
        window.myCumulativeChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: heading,
                        font: { size: headingFontSize, family: 'Arial' },
                        padding: { top: 5, bottom: 5 }
                    },
                    legend: { display: true, position: 'top' },
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
                    x: { title: { display: true, text: 'Your Age' } },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize,
                            maxTicksLimit: 8,
                            callback: function(value) {
                                return '£' + formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }



    
    function plotCouplesFundChart(cashFlowData1, cashFlowData2) {
        var ctx = document.getElementById('fundChart').getContext('2d');
    
        // Extract data from cashFlowData
        var ages = cashFlowData1.map(data => data.age);
        var pensionFundValues1 = cashFlowData1.map(data => Math.round(data.openingBalance));
        var isaHoldings1 = cashFlowData1.map(data => Math.round(data.ISAOpeningBalance));
        
        
        var pensionFundValues2 = cashFlowData2.map(data => Math.round(data.openingBalance));
        var isaHoldings2 = cashFlowData2.map(data => Math.round(data.ISAOpeningBalance));
        
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
    
        // Determine the maximum value in the dataset (include cumulativeTFC)
        var maxValue = Math.max(
            ...pensionFundValues1, 
            ...isaHoldings1, 
            ...pensionFundValues2, 
            ...isaHoldings2,
           
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
    
        var endAge = localStorage.getItem('endAge');
        if (incomeType === 'Partner') {
            currentAgePartner = localStorage.getItem('currentAgePartner');
            currentAge = localStorage.getItem('currentAge');
            endAge = endAge + currentAgePartner - currentAge;
        }
    
        // Filter the cashFlowData based on retirementAge
        var retirementData = cashFlowData.filter(data => data.age >= retirementAge && data.age <= endAge);
    
        // Check if there is data after filtering
        if (retirementData.length === 0) {
            console.warn(`No data available for retirement age ${retirementAge} or beyond.`);
            return;
        }
    
        // Extract data for the chart from the filtered retirementData
        var ages = retirementData.map(data => data.age);
        var netPensionWithdrawals = retirementData.map(data => Math.round(frequencyMultiplier * (data.withdrawal  - data.taxFreePortion ) / 12));
        //var netPensionWithdrawals = retirementData.map(data => Math.round(frequencyMultiplier * (data.withdrawal  ) / 12));
        var taxFreePortion = retirementData.map(data => Math.round(frequencyMultiplier * data.taxFreePortion / 12));
        var ISADrawings = retirementData.map(data => Math.round(frequencyMultiplier * data.ISADrawings / 12));
        var statePensions = retirementData.map(data => Math.round(frequencyMultiplier * data.statePension / 12));
        var dbPensions = retirementData.map(data => Math.round(frequencyMultiplier * data.dbPension / 12));
        var annuityNet = retirementData.map(data => Math.round(frequencyMultiplier * data.annuityNet / 12));
        var shortfall = retirementData.map(data => Math.round(frequencyMultiplier * Math.max(0, data.shortfall) / 12));
    
        // If incomeType is 'Your' or 'Partner', set shortfall to zero and fix chart resizing
        if (incomeType === 'Your' || incomeType === 'Partner') {
            shortfall = retirementData.map(data => 0);
            dontResizeChart = true;
        } 
    
        // Calculate the guaranteed income percentage.
        // Guaranteed income is the sum of state pension, defined benefit pension, and annuity.
        // Non guaranteed income is the sum of defined contribution pension withdrawals and ISA withdrawals.
        var totalGuaranteed = statePensions.reduce((sum, val) => sum + val, 0)
                             + dbPensions.reduce((sum, val) => sum + val, 0)
                             + annuityNet.reduce((sum, val) => sum + val, 0);
        var totalNonGuaranteed = netPensionWithdrawals.reduce((sum, val) => sum + val, 0)
                                + taxFreePortion.reduce((sum, val) => sum + val, 0)
                                + ISADrawings.reduce((sum, val) => sum + val, 0);
        var totalIncome = totalGuaranteed + totalNonGuaranteed;
        var guaranteedPercentage = totalIncome > 0 ? (totalGuaranteed / totalIncome) * 100 : 0;
    
        // Determine the maximum value in the dataset for dynamic step sizing
        var allIncomeData = [...statePensions, ...dbPensions, ...netPensionWithdrawals, ...ISADrawings, ...annuityNet, ...shortfall];
        var maxValue = Math.max(...allIncomeData);
        var stepSize = calculateStepSizeIncome(maxValue);
    
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
        var heading = `${titlePrefix}${headingPrefix} Net Income${headingSuffix}`;
    
        // Determine heading font size based on window width
        var headingFontSize = window.innerWidth < 1366 ? 14 : 20;
    
        // Code to retain existing scale if required
        let existingScale = null;
        /* if (dontResizeChart && window.myIncomeChart) {
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
        } */
    
        // Destroy existing chart instance if it exists to avoid duplication
        if (window.myIncomeChart) {
            window.myIncomeChart.destroy();
        }
    
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
                        label: 'Tax Free Portion',
                        data: taxFreePortion,
                        backgroundColor: '#64B5F6' // Blue
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
                        text: [
                            heading, // Existing heading
                            `Total Income Over All Ages: £${formatNumber(totalIncome, 'number')}` // Second heading
                            /* `Total Guaranteed: £${formatNumber(totalGuaranteed, 'number')} | Total Non-Guaranteed: £${formatNumber(totalNonGuaranteed, 'number')}`  */
                        ],
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
                                if (context.parsed.y <= 0) {
                                    return '';
                                }
                                var label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '£' + tooltipFormatNumber(context.parsed.y, 'number');
                                return label;
                            },
                            footer: function(context) {
                                // Sum only values greater than zero
                                var total = context.reduce((sum, item) => {
                                    return sum + (item.parsed.y > 0 ? item.parsed.y : 0);
                                }, 0);
                                return total > 0 ? 'Total: £' + tooltipFormatNumber(total, 'number') : '';
                            }
                        }
                    }
                }
            }
        });
    
        // Helper functions defined inside the chart function
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
    
        // Return the guaranteed income percentage
        // Guaranteed income = state pension + defined benefit pension + annuity
        // Non guaranteed income = defined contribution pension withdrawals + ISA withdrawals
        // Shortfall is not included.
        return {totalIncome: totalIncome, 
                totalNonGuaranteed: totalNonGuaranteed,
               guaranteedPercentage: guaranteedPercentage,
        }
    }
    
    
    
    
    function plotTaxBreakdownChart(
        cashFlowData, 
        frequencyMultiplier, 
        applyInflationAdjustment, 
        prefix, 
        phoneFormat,
        retirementAge,
        planAsCouple,
        incomeType
    ) {
        // Validate retirementAge
        if (typeof retirementAge !== 'number') {
            console.error('retirementAge must be a number');
            return;
        }
    
        // Determine the appropriate canvas context based on phoneFormat
        var ctx =  document.getElementById('taxBySourceChartTablet').getContext('2d') ;
    
        var endAge = localStorage.getItem('endAge');
        if (incomeType === 'PartnerTax') {
            currentAgePartner = localStorage.getItem('currentAgePartner');
            currentAge = localStorage.getItem('currentAge');
            endAge = endAge + currentAgePartner - currentAge;
        }
    
        // Filter the cashFlowData based on retirementAge
        //var retirementData = cashFlowData.filter(data => data.age >= retirementAge );
        var retirementData = cashFlowData.filter(data => data.age >= retirementAge && data.age <= endAge);
    
       
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

        //return totalTax;
    }

    


    
    function plotTaxByTaxBandChart(
        cashFlowData, 
        frequencyMultiplier, 
        applyInflationAdjustment, 
        prefix, 
        phoneFormat,
        retirementAge,
        planAsCouple,
        incomeType
    ) {
        // Validate retirementAge
        if (typeof retirementAge !== 'number') {
            console.error('retirementAge must be a number');
            return;
        }
        
        // Determine the appropriate canvas context based on phoneFormat
        var ctx = phoneFormat 
            ? document.getElementById('taxBandChartTablet').getContext('2d') 
            : document.getElementById('taxChart').getContext('2d');
        
        var endAge = localStorage.getItem('endAge');
        if (incomeType === 'PartnerTax') {
            currentAgePartner = localStorage.getItem('currentAgePartner');
            currentAge = localStorage.getItem('currentAge');
            endAge = endAge + currentAgePartner - currentAge;
        }
    
        // Filter the cashFlowData based on retirementAge
        //var retirementData = cashFlowData.filter(data => data.age >= retirementAge );
        var retirementData = cashFlowData.filter(data => data.age >= retirementAge && data.age <= endAge);
        
        
        // Check if there is data after filtering
        if (retirementData.length === 0) {
            console.warn(`No tax data available for retirement age ${retirementAge} or beyond.`);
            return;
        }
        
        // Extract ages for the x-axis
        var ages = retirementData.map(data => data.age);
        
        // Determine the number of tax bands from the first data element
        var numBands = retirementData[0].bandTaxBreakdown ? retirementData[0].bandTaxBreakdown.length : 0;
        if (numBands === 0) {
            console.warn('No tax band breakdown data available.');
            return;
        }
        
        // Define colours from your provided colours list
        var colors;
        if (numBands === 5) {
            colors = ['#4CAF50', '#FFC107', '#FF9800', '#FF5722', '#FF0000'];
        } else {
            colors = ['#4CAF50', '#FF9800', '#FF0000'];
        }
        
        // Define descriptive band names based on the number of bands
        let bandNames;
        if (numBands === 3) { // UK tax bands
            bandNames = ["Basic Rate Band (20%)", "Higher Rate Band (40%)", "Additional Rate Band (45%)"];
        } else if (numBands === 5) { // Scottish tax bands
            bandNames = ["Starter Rate Band (19%)", "Basic Rate Band (20%)", "Intermediate Rate Band (21%)", "Higher Rate Band (42%)", "Top Rate Band (47%)"];
        } else {
            // Fallback: simply use "Tax Band X"
            bandNames = [];
            for (var i = 0; i < numBands; i++) {
                bandNames.push("Tax Band " + (i + 1));
            }
        }
        
        // Build datasets for each tax band
        var datasets = [];
        for (var i = 0; i < numBands; i++) {
            // For each band, extract the numeric 'tax' property from each record, applying the frequency multiplier
            var bandData = retirementData.map(data => {
                var taxValue = 0;
                if (data.bandTaxBreakdown && data.bandTaxBreakdown[i] && !isNaN(data.bandTaxBreakdown[i].tax)) {
                    taxValue = Number(data.bandTaxBreakdown[i].tax);
                }
                return Math.round(frequencyMultiplier * taxValue / 12);
            });
            
            datasets.push({
                label: bandNames[i],
                data: bandData,
                backgroundColor: colors[i % colors.length]
            });
        }
        
        // Calculate total tax over all ages by summing each record’s tax across bands
        var totalTax = retirementData.reduce((acc, row) => {
            var rowTax = row.bandTaxBreakdown.reduce((sum, band) => 
                sum + Math.round(frequencyMultiplier * (band.tax ? Number(band.tax) : 0) / 12), 0);
            return acc + rowTax;
        }, 0);
        
        // Heading for the chart
        var titlePrefix = planAsCouple ? "Combined" : "";
        var headingSuffix = " (Projected Future Values)";
        if (applyInflationAdjustment) {
            headingSuffix = " (In Today's Money)";
        }
        var heading = `${titlePrefix}${prefix} Annual Tax by Tax Band${headingSuffix}`;
        
        // Destroy the existing chart instance if it exists to avoid duplication
        if (window.myTaxByTaxBandChart) {
            window.myTaxByTaxBandChart.destroy();
        }
        
        // Determine the maximum value in the dataset for dynamic step sizing
        var allTaxData = [];
        datasets.forEach(dataset => {
            allTaxData = allTaxData.concat(dataset.data);
        });
        var maxValue = Math.max(...allTaxData);
        
        function calculateStepSizeTax(maxValue) {
            if (maxValue <= 10000) return 500;
            if (maxValue <= 25000) return 5000;
            if (maxValue <= 100000) return 10000;
            if (maxValue <= 250000) return 25000;
            if (maxValue <= 500000) return 50000;
            if (maxValue <= 1000000) return 100000;
            return 250000;
        }
        
        var stepSize = calculateStepSizeTax(maxValue);
        
        // Create the new chart using Chart.js
        window.myTaxByTaxBandChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ages,
                datasets: datasets
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
                            text: '' // No (£) symbol in the axis title
                        },
                        beginAtZero: true,
                        ticks: {
                            stepSize: stepSize,
                            maxTicksLimit: 8,
                            callback: function(value) {
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
                            size: window.innerWidth < 1366 ? 14 : 20,
                            family: 'Arial',
                            weight: 'bold'
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
                            footer: function(context) {
                                var total = context.reduce((sum, item) => sum + item.parsed.y, 0);
                                return 'Total: £' + formatYAxisLabels(total, 'k');
                            }
                        }
                    }
                }
            }
        });
        
        // Helper function to format y-axis labels
        function formatYAxisLabels(value, formatType) {
            if (formatType === 'k') {
                if (value >= 10000) {
                    return (value / 1000).toFixed(0) + 'k';
                }
                return new Intl.NumberFormat('en-GB').format(value);
            } else if (formatType === 'm') {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(2) + 'm';
                }
                return formatYAxisLabels(value, 'k');
            } else if (formatType === 'number') {
                return new Intl.NumberFormat('en-GB').format(value);
            } else {
                return value.toString();
            }
        }
        
        // Helper function to format numbers as currency
        function formatNumber(value, formatType) {
            if (formatType === 'currency') {
                return new Intl.NumberFormat('en-GB', { 
                    style: 'currency', 
                    currency: 'GBP', 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0 
                }).format(value);
            } else {
                return new Intl.NumberFormat('en-GB', { 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0 
                }).format(value);
            }
        }
        
        return totalTax;
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
           
        // Chart containers
        const incomeChartContainer = document.getElementById("incomeChartContainer");
        const fundChartContainer = document.getElementById("fundChartContainer");
        //const taxChartContainer = document.getElementById("taxChartContainer");
        const chargesChartContainer = document.getElementById("chargesChartContainer");
        const TFCChartContainer = document.getElementById("TFCChartContainer");
        const taxBandChartContainer = document.getElementById("taxBandChartContainer"); // NEW container
        const taxBySourceChartContainer = document.getElementById("taxBySourceChartContainer");
        
        // Hide all charts
        fundChartContainer.classList.add("hidden");
        incomeChartContainer.classList.add("hidden");
        taxBySourceChartContainer.classList.add("hidden");
        chargesChartContainer.classList.add("hidden");
        TFCChartContainer.classList.add("hidden");
        taxBandChartContainer.classList.add("hidden"); 

        
        if (selectedChart === "Fund") {
            applyInflationAdjustmentPhone.checked = false;
            fundChartContainer.classList.remove("hidden");
            saveAndCalcLandscape();
        } else if (selectedChart === "Income") {
            incomeChartContainer.classList.remove("hidden");
            saveAndCalcLandscape();
        } else if (selectedChart === "Your") {
            incomeChartContainer.classList.remove("hidden");
            saveAndCalcLandscape('Your');
        } else if (selectedChart === "Partner") {
            incomeChartContainer.classList.remove("hidden");
            saveAndCalcLandscape('Partner');
        } else if (selectedChart === "Tax") {
            taxBySourceChartContainer.classList.remove("hidden");
            saveAndCalcLandscape();
        } else if (selectedChart === "Charges") {
            chargesChartContainer.classList.remove("hidden");
            saveAndCalcLandscape();
        } else if (selectedChart === "TFC") {
            TFCChartContainer.classList.remove("hidden");
            saveAndCalcLandscape();
        } else if (selectedChart === "TaxBand") { 
            taxBandChartContainer.classList.remove("hidden");
            saveAndCalcLandscape();
        } else if (selectedChart === "YourTax") { 
            taxBandChartContainer.classList.remove("hidden");
            saveAndCalcLandscape('YourTax');
        } else if (selectedChart === "PartnerTax") { 
            taxBandChartContainer.classList.remove("hidden");
            saveAndCalcLandscape('PartnerTax');
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
            saveAndCalcLandscape();
        } else if (selectedTable === "pensionFundCashflow") {
            pensionFundCashflowContainer.classList.remove("hidden");
            pensionFundCashflowContainer.classList.add("visible");
            saveAndCalcLandscape();
        } else if (selectedTable === "ISACashflow") {
            ISACashflowContainer.classList.remove("hidden");
            ISACashflowContainer.classList.add("visible");
            saveAndCalcLandscape();
        } else if (selectedTable === "yourRetirementIncome") {
            retirementIncomeContainer.classList.remove("hidden");
            retirementIncomeContainer.classList.add("visible");
            saveAndCalcLandscape('Your');
        } else if (selectedTable === "partnerRetirementIncome") {
            retirementIncomeContainer.classList.remove("hidden");
            retirementIncomeContainer.classList.add("visible");
            saveAndCalcLandscape('Partner');
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

         // Gross Pension Income
         var tdGrossPensionFundIncome = document.createElement('td');
         tdGrossPensionFundIncome.textContent = '£' + formatNumber(Math.floor(row.grossPensionWithdrawal || 0));
         tr.appendChild(tdGrossPensionFundIncome);

          // Tax Free Cash
          var tdTaxFreePensionIncome = document.createElement('td');
          tdTaxFreePensionIncome.textContent = '£' + formatNumber(Math.floor(row.taxFreePortion || 0));
          tr.appendChild(tdTaxFreePensionIncome);



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
    isaLabel.style.fontWeight = "bold";
    

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
    saveAndCalcLandscape();
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
    saveAndCalcLandscape();
}

// Toggle display for the user's percentage contribution inputs
function togglePercentageContribution(switchElement) {
    const isChecked = switchElement.checked;
    saveToLocalStorage('percentageContributionSwitch', isChecked);

    const inputContainer = document.getElementById('percentageContributionInputs');
    if (inputContainer) {
        inputContainer.style.display = isChecked ? 'block' : 'none';
    }

    const increaseContributionsWithInflationContainer = document.getElementById('increaseContributionsWithInflationContainer');
    if (increaseContributionsWithInflationContainer) {
        if (isChecked) {
            increaseContributionsWithInflationContainer.classList.add('hidden');
            increaseContributionsWithInflationContainer.classList.remove('visible');
        } else {
            increaseContributionsWithInflationContainer.classList.remove('hidden');
            increaseContributionsWithInflationContainer.classList.add('visible');
        }
    }

    saveAndCalcLandscape();
}

function togglePartnerPercentageContribution(switchElement) {
    const isChecked = switchElement.checked;
    saveToLocalStorage('partnerPercentageContributionSwitch', isChecked);

    const inputContainer = document.getElementById('partnerPercentageContributionInputs');
    if (inputContainer) {
        inputContainer.style.display = isChecked ? 'block' : 'none';
    }

    const partnerIncreaseContributionsWithInflationContainer = document.getElementById('partnerIncreaseContributionsWithInflationContainer');
    if (partnerIncreaseContributionsWithInflationContainer) {
        if (isChecked) {
            partnerIncreaseContributionsWithInflationContainer.classList.add('hidden');
            partnerIncreaseContributionsWithInflationContainer.classList.remove('visible');
        } else {
            partnerIncreaseContributionsWithInflationContainer.classList.remove('hidden');
            partnerIncreaseContributionsWithInflationContainer.classList.add('visible');
        }
    }

    saveAndCalcLandscape();
}




