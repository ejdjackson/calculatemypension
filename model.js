//to Toggle Navbar on Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

/* hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
}); */

function calculateMyPension(planAsCouple) {
    
        /* storeInputsInLocalStorage(); */
        
        
       /*  const planAsCouple = false; */
        const alreadyRetired =  (localStorage.getItem('alreadyRetired') === 'true');
        var currentAge = parseInt(localStorage.getItem("currentAge")) || 0;
        var retirementAge = parseInt(localStorage.getItem("retirementAge")) || 0;
        var inflation = parseFloat(localStorage.getItem("inflation")) / 100;
        var TFC = parseFloat(localStorage.getItem("inflation")) / 100;

        // Check annual pension contribution limit is not breached
        var monthlyContribution = parseFloat(localStorage.getItem("monthlyContribution")) ; 
        var stepUpContribution = parseFloat(localStorage.getItem("stepUpContribution")) ; 
    
        window.maxAnnualPensionContribution = 60000;
        window.PensionWarning = "Maximum Annual Pension Contribution is £60,000. Equivalent to £5,000 monthly. Your primary contribution is £" + formatNumber(monthlyContribution);
           if ((monthlyContribution + stepUpContribution) * 12 > window.maxAnnualPensionContribution ) {
            if (stepUpContribution>0) {
                saveToLocalStorage('stepUpContribution', 4999 - monthlyContribution);
            } else {
                saveToLocalStorage('monthlyContribution', 4999 );
            };
            alert(window.PensionWarning);
            return;
        }


        if (alreadyRetired) {
            retirementAge = currentAge;
        }

        if (planAsCouple) {
            
            var simulation1 = calculateSinglesPension(retirementAge,alreadyRetired);
            var simulation2 = calculatePartnersPension(retirementAge,alreadyRetired);
            var combinedCashFlowData = combineCashFlowData(simulation1.cashFlowData, simulation2.cashFlowData);
            var combinedTodaysMoneyCashFlowData = combineCashFlowData(simulation1.todaysMoneyCashFlowData, simulation2.todaysMoneyCashFlowData);
            var desiredCombinedIncome = 12 * parseInt(localStorage.getItem("desiredCombinedIncome")) ; 
            var couplesShortfallData = calculateCouplesShortfall(retirementAge, desiredCombinedIncome * Math.pow(1+inflation,Math.max(0,retirementAge-currentAge)), combinedCashFlowData, inflation) 
            var couplesTodaysMoneyShortfallData = calculateCouplesShortfall(retirementAge, desiredCombinedIncome, combinedTodaysMoneyCashFlowData, 0) 

            // Update shortfall in combinedCashFlowData
            updateShortfallInCombinedData(combinedCashFlowData, couplesShortfallData);
            updateShortfallInCombinedData(combinedTodaysMoneyCashFlowData, couplesTodaysMoneyShortfallData);
            const couplesShortfallAtRetirement = getShortfallAtAge(combinedCashFlowData, retirementAge);

            outputResults(combinedCashFlowData, combinedTodaysMoneyCashFlowData, currentAge, simulation1.retirementAge, simulation1.fundAtRetirement + simulation2.fundAtRetirement, simulation1.ISAAtRetirement + simulation2.ISAAtRetirement, simulation1.taxFreeCashTaken + simulation2.taxFreeCashTaken, desiredCombinedIncome, simulation1.maxAffordableNetIncome + simulation2.maxAffordableNetIncome, couplesShortfallAtRetirement, simulation1.discountFactor, alreadyRetired, planAsCouple, simulation1, simulation2);
        }
        else {
            var simulation = calculateSinglesPension(retirementAge,alreadyRetired);
            outputResults(simulation.cashFlowData, simulation.todaysMoneyCashFlowData, currentAge, simulation.retirementAge, simulation.fundAtRetirement, simulation.ISAAtRetirement, simulation.taxFreeCashTaken, simulation.desiredAnnualIncome, simulation.maxAffordableNetIncome, simulation.shortfallAtRetirement, simulation.discountFactor, simulation.alreadyRetired, planAsCouple);
        }

        
    
}

function printCashFlowData(cashFlowData) {
    cashFlowData.forEach((item, index) => {
        console.log(`Entry ${index + 1}:`);
        console.log(`  Age: ${item.age}`);
       
        console.log(`  Withdrawal: ${item.withdrawal}`);
        console.log(`  State Pension: ${item.statePension}`);

     
        console.log(`  ISA Drawings: ${item.ISADrawings}`);
        console.log(`  Shortfall: ${item.shortfall}`);
        console.log('--------------------------------');
    });
}





function updateShortfallInCombinedData(combinedCashFlowData, couplesShortfallData) {
    // Loop through each entry in couplesShortfallData
    for (const shortfallEntry of couplesShortfallData) {
        // Find the matching entry in combinedCashFlowData based on age
        const combinedEntry = combinedCashFlowData.find(entry => entry.age === shortfallEntry.age);
        
        // If a matching entry is found, update its shortfall
        if (combinedEntry) {
            combinedEntry.shortfall = shortfallEntry.shortfall;
        }
    }
}

function getShortfallAtAge(cashFlowData, targetAge) {
    const entryAtAge = cashFlowData.find(entry => entry.age === targetAge);
    return entryAtAge ? entryAtAge.shortfall : null; // Return null if not found
}

function getDesiredIncomeAtAge(cashFlowData, targetAge) {
    const entryAtAge = cashFlowData.find(entry => entry.age === targetAge);
    return entryAtAge ? entryAtAge.desiredIncome : null; // Return null if not found
}

function getTotalIncomeAtAge(cashFlowData, targetAge) {
    const entryAtAge = cashFlowData.find(entry => entry.age === targetAge);
  
    const totalIncome = (entryAtAge.withdrawal || 0) +
                        (entryAtAge.statePension || 0) +
                        (entryAtAge.ISADrawings || 0) +
                        (entryAtAge.dbPension || 0);

    return totalIncome;
}






function calculateSinglesPension(retirementAge,alreadyRetired) {
    var currentAge = parseInt(localStorage.getItem("currentAge")) || 0;
    var currentFund = parseFloat(localStorage.getItem("currentFund")) || 0.0;
    var monthlyContribution = parseFloat(localStorage.getItem("monthlyContribution")) ; 
    var currentISA = parseFloat(localStorage.getItem("currentISA")) || 0.0;
    var monthlyISAContribution = parseFloat(localStorage.getItem("monthlyISAContribution")) || 0.0;
    var dbPensionAmount = parseFloat(localStorage.getItem("dbPensionAmount")) || 0.0;
    var dbPensionAge = parseInt(localStorage.getItem("dbPensionAge")) || 0;
    var endAge = parseInt(localStorage.getItem("endAge"));
    var finalFund = parseFloat(localStorage.getItem("finalFund")) || 0;
    var taxFreeCashPercent = parseFloat(localStorage.getItem('taxFreeCashPercent')/100);
    var desiredIncome = parseInt(localStorage.getItem("desiredIncome")) || 0;;

    
    
    var simulation = calculatePension(currentAge,retirementAge,alreadyRetired,currentFund,monthlyContribution,currentISA,monthlyISAContribution,dbPensionAmount,dbPensionAge,endAge,finalFund,taxFreeCashPercent,desiredIncome);
    return simulation;
}


function calculatePartnersPension(retirementAge,alreadyRetired) {

    // Retrieve values from localStorage and parse as needed
    var currentAge = parseInt(localStorage.getItem("currentAge")) || 0;
    var currentAgePartner = parseInt(localStorage.getItem("currentAgePartner")) || 0;
    var currentFundPartner = parseInt(localStorage.getItem("currentFundPartner")) || 0;
    var monthlyContributionPartner = parseFloat(localStorage.getItem("monthlyContributionPartner")) ; 
    var currentISAPartner = parseInt(localStorage.getItem("currentISAPartner")) || 0;
    var monthlyISAContributionPartner = parseFloat(localStorage.getItem("monthlyISAContributionPartner")) || 0.0;
    var dbPensionAmountPartner = parseInt(localStorage.getItem("dbPensionAmountPartner")) || 0;
    var dbPensionAgePartner = parseInt(localStorage.getItem("dbPensionAgePartner")) || 0;
    var endAge = parseInt(localStorage.getItem("endAge")) + currentAgePartner - currentAge;
    var finalFund = parseFloat(localStorage.getItem("partnersFinalFund")) || 0;
    if (alreadyRetired) {
        var taxFreeCashPercent = parseFloat(localStorage.getItem('inputTaxFreeCashPercentPartner')/100);
    } else {
        var taxFreeCashPercent = parseFloat(localStorage.getItem('taxFreeCashPercent')/100);
    }
    var desiredIncome = parseInt(localStorage.getItem("desiredIncome")) || 0;;
    
     // Reversionary Benefits
    var reversionaryBenefitPercentage = parseInt(localStorage.getItem("reversionaryBenefitPercentage")) || 0;
    var reversionaryBenefitPercentagePartner = parseInt(localStorage.getItem("reversionaryBenefitPercentagePartner")) || 0;

   
    // Assume retirement in the same year
    var partnerRetirementAge = retirementAge + currentAgePartner - currentAge

    var simulation = calculatePension(currentAgePartner,partnerRetirementAge,alreadyRetired,currentFundPartner,monthlyContributionPartner,currentISAPartner,monthlyISAContributionPartner,dbPensionAmountPartner,dbPensionAgePartner,endAge,finalFund,taxFreeCashPercent,desiredIncome);
    return simulation;
}


function calculateCouplesShortfall(retirementAge, desiredCombinedIncome, combinedCashFlowData, inflationRate) {
    // Create an array to store shortfall data for each age
    let shortfallData = [];
    
    // Loop through each entry in combinedCashFlowData
    for (const entry of combinedCashFlowData) {
        // Check if the current age is at or above retirementAge
        if (entry.age >= retirementAge) {
            // Adjust desiredCombinedIncome for inflation for each year after retirement
            const yearsAfterRetirement = entry.age - retirementAge;
            const adjustedDesiredIncome = desiredCombinedIncome * Math.pow(1 + inflationRate, yearsAfterRetirement);

            // Calculate total income from the combined cash flow sources
            const totalIncome = entry.withdrawal + entry.statePension + entry.dbPension + entry.ISADrawings;

            // Calculate the shortfall and ensure it is not negative
            const shortfall =  adjustedDesiredIncome - totalIncome;

            // Store the result in shortfallData with the current age and shortfall
            shortfallData.push({
                age: entry.age,
                shortfall: shortfall
            });
        }
    }

    return shortfallData;
}





function calculatePension(currentAge,retirementAge,alreadyRetired,currentFund,monthlyContribution,currentISA,monthlyISAContribution,dbPensionAmount,dbPensionAge,endAge,finalFund,taxFreeCashPercent,desiredIncome) {
            
    
    var statePensionAge = getStatePensionAge(currentAge);
    
    var desiredAnnualIncome = 12 * desiredIncome;
        
    var stepUpAge = parseInt(localStorage.getItem("stepUpAge"));
    var stepUpContribution = parseFloat(localStorage.getItem("stepUpContribution")) ; 
    var minISABalance = parseFloat(localStorage.getItem("minISABalance")) || 0;
    const useScottishTax =  (localStorage.getItem('useScottishTax') === 'true');
    var fundGrowthPre = parseFloat(localStorage.getItem("fundGrowthPre")) / 100;
    var fundGrowthPost = parseFloat(localStorage.getItem("fundGrowthPost")) / 100;
    if (alreadyRetired) {
        fundGrowthPost = fundGrowthPre;
    }
    var fundCharges = parseFloat(localStorage.getItem("fundCharges")) / 100;

    var inflation = parseFloat(localStorage.getItem("inflation")) / 100;
    var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";
    var marketCrashAge = parseInt(localStorage.getItem("marketCrashAge"));
    var marketCrashPercent = parseFloat(localStorage.getItem("marketCrashPercent"));
    const useProportionalWithdrawal =  (localStorage.getItem('useProportionalWithdrawal') === 'true');
    
    var isaFundGrowth = parseFloat(localStorage.getItem("isaFundGrowth")) / 100; // ISA-specific growth
    var isaCharges = parseFloat(localStorage.getItem("isaCharges")) / 100;       // ISA-specific charges
    
   
    // Get current state pension from user input
    var currentStatePension = 11976;
    var maxTFCPercent = 0.25;
    window.maxAnnualISAContribution = 20000;
    
    window.ISAWarning = "Maximum Annual ISA Contribution is £20,000. Equivalent to £1,666 monthly.";
    
    
    var statePensionInflation = Math.max(inflation,0.025);
    var earliestPensionWithdrawalAge = getEarliestPensionAge(currentAge);
    var dbPensionEscalation = inflation;
    
   /*  if (stepUpAge >= retirementAge) { */
   /*      alert("Contribution Increase Age >= Retirement Age"); */
  /*       return;
    } */

    if (taxFreeCashPercent > 0.25) {
        alert("Tax Free Cash % cannot exceed 25%.");
        document.getElementById("taxFreeCashPercent").value = 25;
        return;
    }

    if (monthlyISAContribution * 12 > window.maxAnnualISAContribution) {
        alert(window.ISAWarning);
        return;
    }

    

    function saveToLocalStorage(key, value) {
        // Store the value in localStorage, converting booleans for checkboxes
        localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
    }

    var annualContribution = monthlyContribution * 12;
    var annualAdditionalContribution = stepUpContribution * 12;
    var annualISAContribution = monthlyISAContribution * 12;

    
    // Calculate future state pension
    var statePension = calculateStatePension(currentAge, currentStatePension, statePensionInflation, statePensionAge);
    var cashFlowDataAccumulation = [];

    if (alreadyRetired) {
        fundAtRetirement = currentFund;
        ISAAtRetirement = currentISA;
        
    } else {
        // Simulate accumulation phase up to retirement age
        var simulationToRetirement = simulateFundToRetirement(
            currentAge,
            retirementAge,
            currentFund,
            annualContribution,
            stepUpAge,
            annualAdditionalContribution,
            fundGrowthPre,
            fundCharges,
            currentISA,
            annualISAContribution,
            inflation,
            marketCrashAge,
            marketCrashPercent
            
        );
        var fundAtRetirement = simulationToRetirement.fundAtRetirement;
        var ISAAtRetirement = simulationToRetirement.ISAAtRetirement;
        cashFlowDataAccumulation = simulationToRetirement.cashFlowData;

        if (applyInflationAdjustment)  {
            cashFlowDataAccumulation = simulationToRetirement.todaysMoneyCashFlowData;
        }
        var totalFundChargesPreRetirement = simulationToRetirement.totalFundCharges;
    }   
    
    // Set initial cumulative TFC and remaining TFC percent
    var cumulativeTFC = taxFreeCashPercent;
    var remainingTFCPercent = maxTFCPercent - taxFreeCashPercent;

    //Desired Income at retirement
    var desiredAnnualIncomeAtRetirement = desiredAnnualIncome * Math.pow(1 + inflation, Math.max(0,retirementAge - currentAge))/12

    // Calculate total available funds
    var totalAvailableFunds = fundAtRetirement + ISAAtRetirement;
    var yearsOfDrawdown = endAge - Math.max(retirementAge,currentAge) +1;
    var netIncomeUpper = (accumulatePayments(statePension,statePensionInflation,endAge-statePensionAge) 
                    + accumulatePayments(dbPensionAmount, dbPensionEscalation,endAge-dbPensionAge) 
                    + totalAvailableFunds  *  Math.pow(1+fundGrowthPost,yearsOfDrawdown-1)) / yearsOfDrawdown;

    // Return the first guess to investigate the method                
    var firstUpperBoundGuess = netIncomeUpper;

    // Find the maximum affordable total net income with no market crash
    var maxAffordableNetIncome = findMaximumAffordableTotalWithdrawal(
        currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
        taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, 0, netIncomeUpper, finalFund, useProportionalWithdrawal
    );

    var secondUpperBoundGuess = maxAffordableNetIncome;
    //Use the no-crash income as the estiamte for the upper limit on income
    netIncomeUpper = maxAffordableNetIncome;
    maxAffordableNetIncome = findMaximumAffordableTotalWithdrawal(
        currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
        taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, marketCrashPercent, netIncomeUpper, finalFund, useProportionalWithdrawal
    );

    // Display tax-free cash taken at earliest pension withdrawal age
    var expectedTFC = fundAtRetirement * taxFreeCashPercent;
    var maxTFCAmount = 268275;
    
    var taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount);
    
    
    var discountFactor = 1/ Math.pow(1 + inflation, Math.max(0,retirementAge - currentAge));
    var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
    
    var desiredAnnualIncomeAtRetirement = desiredAnnualIncome / discountFactor;
    /* var initialMonthlyShortfall = Math.max(0,desiredAnnualIncomeAtRetirement-maxAffordableNetIncome)/12;
    var inflationAdjustedInitialMonthlyShortfall = Math.max(0,desiredAnnualIncome-inflationAdjustedMaxAffordableNetIncome)/12;
    */

    // Simulate combined fund
    var finalProjection = true;
    var simulation = simulateCombinedFund(
        currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, maxAffordableNetIncome, statePensionInflation, cashFlowDataAccumulation,
        taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, marketCrashPercent, finalFund, useProportionalWithdrawal
    );

    if (currentAge > retirementAge) {retirementAge=currentAge} //cashFlowData only starts at current age
    var dataAtSpecificAge = simulation.cashFlowData.find(data => data.age === retirementAge);
    var shortfallAtRetirement = dataAtSpecificAge.shortfall;
    if (shortfallAtRetirement > 0) {
        maxAffordableNetIncome = desiredAnnualIncomeAtRetirement - shortfallAtRetirement;
        inflationAdjustedMaxAffordableNetIncome = desiredAnnualIncome - shortfallAtRetirement * discountFactor;
    }

    return {
        cashFlowData: simulation.cashFlowData,
        todaysMoneyCashFlowData: simulation.todaysMoneyCashFlowData, // Include the discounted cash flow data
        retirementAge: retirementAge,
        fundAtRetirement: fundAtRetirement,
        ISAAtRetirement: ISAAtRetirement,
        taxFreeCashTaken: taxFreeCashTaken,
        desiredAnnualIncome: desiredAnnualIncome,
        maxAffordableNetIncome: maxAffordableNetIncome,
        shortfallAtRetirement: shortfallAtRetirement,
        discountFactor: discountFactor,
        alreadyRetired: alreadyRetired,
        taxFreeCashPercent: taxFreeCashPercent,
        firstUpperBoundGuess: firstUpperBoundGuess,
        secondUpperBoundGuess: secondUpperBoundGuess
    };
    
    
}





function simulateFundToRetirement(
    currentAge,
    retirementAge,
    currentFund,
    annualContribution,
    stepUpAge,
    annualAdditionalContribution,
    fundGrowthPre,
    fundCharges,
    currentISA,
    annualISAContribution,
    inflation,
    marketCrashAge,
    marketCrashPercent
    
) {
    var fund = currentFund;
    var ISA = currentISA;
    var cashFlowData = [];
    var todaysMoneyCashFlowData = []; // Initialize the discounted cash flow array
    var totalFundCharges = 0; // Initialize total fund charges
    var totalISACharges = 0; // Initialize total ISA charges
    var currentAnnualContribution = annualContribution; // Track current annual contribution

    // Accumulation phase
    for (var age = currentAge; age < retirementAge; age++) {
        // Apply step-up in contributions if age >= stepUpAge
        if (age === stepUpAge && stepUpAge > 0 && annualAdditionalContribution > 0) {
            currentAnnualContribution += annualAdditionalContribution;
            annualAdditionalContribution *= (1 + inflation);
        }

        var openingBalance = fund;
        var ISAOpeningBalance = ISA;

        // Determine investment gain, applying negative growth rate if at marketCrashAge
        var effectiveGrowthRate = fundGrowthPre;
        if (age === marketCrashAge) {
            effectiveGrowthRate = -marketCrashPercent / 100; // Apply market crash as negative growth rate
        } 

        // Calculate investment gain with adjusted growth rate
        var investmentGain = fund * effectiveGrowthRate;
        var fundChargesTaken = fund * fundCharges;
        fund = fund + investmentGain + currentAnnualContribution - fundChargesTaken;

        totalFundCharges += fundChargesTaken; // Accumulate total fund charges

        // ISA Growth (now applying fund charges to ISA)
        var ISAGain = ISA * effectiveGrowthRate; // Apply same growth rate to ISA
        var isaChargesTaken = ISA * fundCharges; // Calculate ISA charges
        ISA = ISA + ISAGain + annualISAContribution - isaChargesTaken;

        totalISACharges += isaChargesTaken; // Accumulate total ISA charges

        // Collect cash flow data
        var cashFlowItem = {
            age: age,
            openingBalance: openingBalance,
            contribution: currentAnnualContribution,
            grossPensionWithdrawal: 0,
            withdrawal: 0,
            statePensionInPayment: 0,
            statePension: 0,
            statePensionTax: 0,
            dbPensionInPayment: 0,
            dbPension: 0,
            dbPensionTax: 0,
            taxPaid: 0,
            taxSaved: 0,
            cumulativeTFC: 0,
            investmentReturn: investmentGain,
            fundCharges: fundChargesTaken,
            isaCharges: isaChargesTaken, // Added ISA charges
            ISAGain: ISAGain,
            closingBalance: fund,
            ISAOpeningBalance: ISAOpeningBalance,
            ISAholdings: ISA,
            ISAContribution: annualISAContribution,
            ISADrawings: 0,
            shortfall: 0,
            desiredIncome: 0
        };
        cashFlowData.push(cashFlowItem);

        // Calculate discount factor for today's money
        var discountFactor = 1 / Math.pow(1 + inflation, age - currentAge);
        

        // Create discounted cash flow item
        var todaysMoneyCashFlowItem = {
            age: age,
            openingBalance: parseFloat((cashFlowItem.openingBalance * discountFactor).toFixed(2)),
            contribution: currentAnnualContribution * discountFactor,
            grossPensionWithdrawal: 0,
            withdrawal: 0,   // Set to 0 as in cashFlowItem
            statePensionInPayment: 0,
            statePension: 0, // Set to 0 as in cashFlowItem
            statePensionTax: 0,
            dbPensionInPayment: 0,
            dbPension: 0,    // Set to 0 as in cashFlowItem
            dbPensionTax: 0,
            taxPaid: 0,      // Set to 0 as in cashFlowItem
            taxSaved: 0,     // Set to 0 as in cashFlowItem
            cumulativeTFC: 0, // Set to 0 as in cashFlowItem
            investmentReturn: parseFloat((cashFlowItem.investmentReturn * discountFactor).toFixed(2)),
            fundCharges: parseFloat((cashFlowItem.fundCharges * discountFactor).toFixed(2)),
            isaCharges: parseFloat((cashFlowItem.isaCharges * discountFactor).toFixed(2)), // Added ISA charges
            ISAGain: parseFloat((cashFlowItem.ISAGain * discountFactor).toFixed(2)), // Added ISA charges
            closingBalance: parseFloat((cashFlowItem.closingBalance * discountFactor).toFixed(2)),
            ISAOpeningBalance: parseFloat((cashFlowItem.ISAOpeningBalance * discountFactor).toFixed(2)),
            ISAholdings: parseFloat((cashFlowItem.ISAholdings * discountFactor).toFixed(2)),
            ISAContribution: annualISAContribution * discountFactor,
            ISADrawings: 0,     // Set to 0 as in cashFlowItem
            shortfall: 0,         // Set to 0 as in cashFlowItem
            desiredIncome: 0
        };
        todaysMoneyCashFlowData.push(todaysMoneyCashFlowItem);

        // Adjust contributions for inflation
        currentAnnualContribution *= (1 + inflation);
        annualISAContribution *= (1 + inflation);
    }

    return {
        fundAtRetirement: fund,
        ISAAtRetirement: ISA,
        cashFlowData: cashFlowData,
        todaysMoneyCashFlowData: todaysMoneyCashFlowData, // Include the discounted cash flow data
        totalFundCharges: totalFundCharges, // Return total fund charges
        totalISACharges: totalISACharges // Return total ISA charges
    };
}







function findMaximumAffordableTotalWithdrawal(
    currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
    inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
    earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
    taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent, netIncomeUpper, finalFund, useProportionalWithdrawal
) {
    var tol = 10; // Tolerance for convergence
    var maxIter = 100;
    var iter = 0;

    var netIncomeLower = 0; // Lower bound of net income
    

    

    // For conservative estimation, set effectiveReturnRate to zero
    var effectiveReturnRate = 0;

    // Calculate upper bound for net income
    //var netIncomeUpper;
    /* netIncomeUpper = (accumulatePayments(statePension,statePensionInflation,endAge-statePensionAge) 
                    + accumulatePayments(dbPensionAmount, dbPensionEscalation,endAge-dbPensionAge) 
                    + totalAvailableFunds  *  Math.pow(1+fundGrowthPost,yearsOfDrawdown-1)) / yearsOfDrawdown; */
    
    /* acceptableEndBalance = netIncomeUpper/25; */ // Minimum acceptable balance at end age to prevent depletion
    acceptableEndBalance = finalFund;


    var maxAffordableNetIncome = 0;
    var finalProjection = false;

    while (iter < maxIter) {
        maxAffordableNetIncome = (netIncomeLower + netIncomeUpper) / 2;

              
        var simulation = simulateCombinedFund(
            currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
            inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
            earliestPensionWithdrawalAge, maxAffordableNetIncome, statePensionInflation, cashFlowDataAccumulation,
            taxFreeCashPercent, 268275, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent, finalFund, useProportionalWithdrawal
        );

        var finalBalance = simulation.finalBalance;
        var fundsDepletedBeforeEndAge = simulation.fundsDepletedBeforeEndAge;

        if (fundsDepletedBeforeEndAge || finalBalance < acceptableEndBalance) {
            // Funds deplete before endAge or final balance is less than acceptable
            netIncomeUpper = maxAffordableNetIncome;
        } else {
            // Funds last until endAge with acceptable balance
            netIncomeLower = maxAffordableNetIncome;
        }

        // Check for convergence
        if (Math.abs(netIncomeUpper - netIncomeLower) < tol || iter === maxIter - 1) {
            break;
        }

        iter++;
    }

    return maxAffordableNetIncome;
}

function simulateCombinedFund(
    currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement,
    fundGrowthPost, fundCharges, inflation, remainingTFCPercent,
    cumulativeTFC, statePensionAge, statePension, earliestPensionWithdrawalAge,
    targetNetIncome, statePensionInflation, cashFlowDataAccumulation,
    taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge,
    dbPensionEscalation, minISABalance, useScottishTax, finalProjection,
    maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent,
    finalFund, useProportionalWithdrawal
    
) {
    var cashFlowData = [...cashFlowDataAccumulation];
    var todaysMoneyCashFlowData = [...cashFlowDataAccumulation];
    var ageWhenTFCMaxed = null;
    var statePensionInPayment = 0;
    var dbPensionInPayment = 0;
    var maxAge = endAge;
    var startAge = Math.max(currentAge, retirementAge);

    if (alreadyRetired) {
        statePensionAge = Math.max(startAge, statePensionAge);
        dbPensionAge = Math.max(startAge, dbPensionAge);
    }

    var fund = fundAtRetirement;
    var ISA = ISAAtRetirement;
    

    var TFCHasBeenTaken = false;
    var fundsDepletedBeforeEndAge = false;
    var previousGrossPensionWithdrawal = 0;
    var dbPensionProjectionOnly = fundAtRetirement == 0 && ISAAtRetirement == 0;
    var totalFundCharges = 0;

    for (var age = startAge; age <= maxAge; age++) {
        var openingFundBalance = fund;
        var ISAOpeningBalance = ISA;
        var expectedTFC = 0;
        var taxFreeCashTaken = 0;

        // Adjust state pension each year
        if (age >= statePensionAge) {
            statePensionInPayment =
                statePension * Math.pow(1 + statePensionInflation, age - statePensionAge-1);
        } else {
            statePensionInPayment = 0;
        }

        // Adjust DB pension each year
        if (age >= dbPensionAge) {
            dbPensionInPayment =
                dbPensionAmount * Math.pow(1 + dbPensionEscalation, age - dbPensionAge);
        } else {
            dbPensionInPayment = 0;
        }

        // Calculate inflation adjusted values
        var inflationAdjustedTargetNetIncome = targetNetIncome * Math.pow(1 + inflation, Math.max(0,age - retirementAge));
        var inflationAdjustedDesiredIncome = desiredAnnualIncome * Math.pow(1 + inflation, Math.max(0,age - retirementAge));

        // Net off any guaranteed pension payments    
        var netIncomeNeededFromInvestments = Math.max(0, inflationAdjustedTargetNetIncome - statePensionInPayment - dbPensionInPayment);

        var netPensionWithdrawal = 0;
        var grossPensionWithdrawal = 0;
        var taxPaidOnDCPension = 0;
        var taxSaved = 0;
        var ISADrawings = 0;

        // TFC Processing
        if (age == earliestPensionWithdrawalAge && fund > 0) {
            expectedTFC = fund * taxFreeCashPercent;
            taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount - cumulativeTFC);
            TFCHasBeenTaken = true;
        }

        if (age == retirementAge && fund > 0 && !TFCHasBeenTaken) {
            expectedTFC = fund * taxFreeCashPercent;
            taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount - cumulativeTFC);
        }

        if (alreadyRetired && age == startAge) {
            //If already retired assume the TFC has just been taken, so the current fund is grossed up to the pre TFC amount before (up to) 25% is taken
            taxFreeCashTaken = taxFreeCashPercent * fund / (1 - taxFreeCashPercent);
        }

        if (!alreadyRetired) {
            fund -= taxFreeCashTaken;
        }
        cumulativeTFC += taxFreeCashTaken;

        remainingTFCPercent = Math.max(0, maxTFCPercent - taxFreeCashPercent);
        if (taxFreeCashTaken == maxTFCAmount) {
            remainingTFCPercent = 0;
        }

        

        // Determine effective growth rate, applying market crash if applicable
        var effectiveGrowthRate = fundGrowthPost;
        if (age === marketCrashAge) {
            effectiveGrowthRate = -marketCrashPercent / 100; // Apply market crash as negative growth rate
        } 

        // Calculate fund charges and investment gain
        var investmentGain = fund * effectiveGrowthRate;
        var fundChargesTaken = fund * fundCharges;
        totalFundCharges += fundChargesTaken;

        // Adjust fund balance to account for gains and charges
        fund = fund + investmentGain - fundChargesTaken;

        // Calculate maximum available withdrawal without dipping below finalFund
        var maxAvailableWithdrawal = fund - finalFund;
        maxAvailableWithdrawal = Math.max(maxAvailableWithdrawal, 0);

        // **Adjust maxAvailableWithdrawal in the final year**
        if (finalProjection && age === maxAge) {
            // Allow withdrawal of any remaining funds above finalFund
            maxAvailableWithdrawal = fund - finalFund;
        }

        // Determine gross pension and ISA withdrawal needed
        var iterations = 0;
        var iterationLimit = 100;
        /* var tolerance = finalProjection && age == startAge ? 0.4 : 10; */
        var tolerance = finalProjection && age == startAge ? 10 : 10;

        var fundExhausted = false;
        var ISAExhausted = false;

        var lowerGuess = 0;
        var upperGuess = maxAvailableWithdrawal;

        // Set initial guess for gross pension withdrawal
        if (age >= earliestPensionWithdrawalAge) {
            var adjustedPersonalAllowance = calcPersonalAllowance(age, currentAge, inflation);

            var maxTaxablePensionWithdrawal = adjustedPersonalAllowance - statePensionInPayment - dbPensionInPayment;
            maxTaxablePensionWithdrawal = Math.max(maxTaxablePensionWithdrawal, 0);

            var maxGrossPensionWithdrawal = maxTaxablePensionWithdrawal / (1 - remainingTFCPercent);

            grossPensionWithdrawal = Math.min( maxGrossPensionWithdrawal, netIncomeNeededFromInvestments / (1 - remainingTFCPercent), maxAvailableWithdrawal);
        } else {
            grossPensionWithdrawal = 0;
        }

        grossPensionWithdrawal = Math.min(
            Math.max(grossPensionWithdrawal, lowerGuess),
            upperGuess
        );

        if (age < earliestPensionWithdrawalAge) {
            grossPensionWithdrawal = 0;
        }

        // Start of the main calculation
        while (iterations < iterationLimit) {
            // Ensure we don't withdraw more than the fund allows
            if (grossPensionWithdrawal >= maxAvailableWithdrawal) {
                grossPensionWithdrawal = maxAvailableWithdrawal;
                fundExhausted = true;
            }

            // In the final year, adjust withdrawal to meet net income need
            if (age === maxAge && !fundExhausted) {
                // Withdraw whatever is needed up to the fund balance
                grossPensionWithdrawal = Math.min( netIncomeNeededFromInvestments / (1 - remainingTFCPercent), maxAvailableWithdrawal );
               /*  grossPensionWithdrawal =  maxAvailableWithdrawal   ; */
                fundExhausted = true; // Since it's the last year
            }

            // Calculate tax-free portion
            if (age < earliestPensionWithdrawalAge || cumulativeTFC >= maxTFCAmount) {
                taxFreePortion = 0;
                remainingTFCPercent = 0;
            } else {
                taxFreePortion = grossPensionWithdrawal * remainingTFCPercent;

                // Adjust for cumulative TFC limit
                if (cumulativeTFC + taxFreePortion > maxTFCAmount) {
                    taxFreePortion = maxTFCAmount - cumulativeTFC;
                    remainingTFCPercent =
                        (maxTFCAmount - cumulativeTFC) / grossPensionWithdrawal;
                    remainingTFCPercent = Math.max(remainingTFCPercent, 0);
                    if (ageWhenTFCMaxed === null) {
                        ageWhenTFCMaxed = age;
                    }
                }
            }

            // Taxable portion is anything above the tax-free portion
            taxablePortion = grossPensionWithdrawal - taxFreePortion;

            // Total taxable income
            totalTaxableIncome =
                taxablePortion + statePensionInPayment + dbPensionInPayment;

            // Calculate tax
            const taxCalc = calculateNetIncome(
                grossPensionWithdrawal,
                statePensionInPayment,
                dbPensionInPayment,
                totalTaxableIncome,
                age,
                inflation,
                useScottishTax,
                currentAge
            );

            netPensionWithdrawal = taxCalc.netPensionWithdrawal;
            statePensionAfterTax = taxCalc.statePensionAfterTax;
            dbPensionAfterTax = taxCalc.dbPensionAfterTax;
            taxPaidOnDCPension = taxCalc.taxPaidOnDCPension;
            statePensionTax = taxCalc.statePensionTax;
            dbPensionTax = taxCalc.dbPensionTax;

            // Use ISA withdrawals to cover any shortfall
            var otherNetPensions = statePensionAfterTax + dbPensionAfterTax;
            netIncomeNeededFromInvestments =
                inflationAdjustedTargetNetIncome - netPensionWithdrawal - otherNetPensions;
            netIncomeNeededFromInvestments = Math.max(netIncomeNeededFromInvestments, 0);

            var maxAvailableISADrawings = ISA - minISABalance;
            maxAvailableISADrawings = Math.max(maxAvailableISADrawings, 0);

            ISADrawings = Math.min(netIncomeNeededFromInvestments, maxAvailableISADrawings);

            if (ISADrawings >= maxAvailableISADrawings) {
                ISAExhausted = true;
            }

            // If ISA is exhausted and still shortfall, increase pension withdrawals
            if (netIncomeNeededFromInvestments > maxAvailableISADrawings && !fundExhausted) {
                lowerGuess = grossPensionWithdrawal;
                upperGuess = maxAvailableWithdrawal;

                while (iterations < iterationLimit) {
                    if (age < earliestPensionWithdrawalAge) {
                        grossPensionWithdrawal = 0;
                    } else {
                        grossPensionWithdrawal = (lowerGuess + upperGuess) / 2;
                    }

                    // Ensure grossPensionWithdrawal does not exceed maxAvailableWithdrawal
                    grossPensionWithdrawal = Math.min(grossPensionWithdrawal, maxAvailableWithdrawal);

                    // **In the final year, adjust withdrawal to meet net income need**
                    if (age === maxAge && !fundExhausted) {
                        grossPensionWithdrawal = Math.min(
                            netIncomeNeededFromInvestments / (1 - remainingTFCPercent),
                            maxAvailableWithdrawal
                        );
                        fundExhausted = true;
                    }

                    // Recalculate tax-free portion
                    if (age < earliestPensionWithdrawalAge || cumulativeTFC >= maxTFCAmount) {
                        taxFreePortion = 0;
                        remainingTFCPercent = 0;
                    } else {
                        taxFreePortion = grossPensionWithdrawal * remainingTFCPercent;

                        if (cumulativeTFC + taxFreePortion > maxTFCAmount) {
                            taxFreePortion = maxTFCAmount - cumulativeTFC;
                            remainingTFCPercent =
                                (maxTFCAmount - cumulativeTFC) / grossPensionWithdrawal;
                            remainingTFCPercent = Math.max(remainingTFCPercent, 0);
                            if (ageWhenTFCMaxed === null) {
                                ageWhenTFCMaxed = age;
                            }
                        }
                    }

                    taxablePortion = grossPensionWithdrawal - taxFreePortion;

                    totalTaxableIncome =
                        taxablePortion + statePensionInPayment + dbPensionInPayment;

                    const taxCalc = calculateNetIncome(
                        grossPensionWithdrawal,
                        statePensionInPayment,
                        dbPensionInPayment,
                        totalTaxableIncome,
                        age,
                        inflation,
                        useScottishTax,
                        currentAge
                    );

                    netPensionWithdrawal = taxCalc.netPensionWithdrawal;
                    statePensionAfterTax = taxCalc.statePensionAfterTax;
                    dbPensionAfterTax = taxCalc.dbPensionAfterTax;
                    taxPaidOnDCPension = taxCalc.taxPaidOnDCPension;
                    statePensionTax = taxCalc.statePensionTax;
                    dbPensionTax = taxCalc.dbPensionTax;

                    otherNetPensions = statePensionAfterTax + dbPensionAfterTax;

                    totalNetIncome =
                        netPensionWithdrawal + otherNetPensions + ISADrawings;

                    var shortfall = totalNetIncome - inflationAdjustedTargetNetIncome;

                    if (Math.abs(shortfall) < tolerance) {
                        cumulativeTFC += taxFreePortion;
                        break;
                    }

                    if (totalNetIncome < inflationAdjustedTargetNetIncome) {
                        if (fundExhausted) {
                            cumulativeTFC += taxFreePortion;
                            break;
                        } else {
                            lowerGuess = grossPensionWithdrawal;
                        }
                    } else {
                        upperGuess = grossPensionWithdrawal;
                    }

                    iterations++;

                    if (grossPensionWithdrawal >= maxAvailableWithdrawal) {
                        grossPensionWithdrawal = maxAvailableWithdrawal;
                        fundExhausted = true;
                    }
                }
            } else {
                totalNetIncome =
                    netPensionWithdrawal + otherNetPensions + ISADrawings;

                var shortfall = totalNetIncome - inflationAdjustedTargetNetIncome;

                if (Math.abs(shortfall) < tolerance) {
                    cumulativeTFC += taxFreePortion;
                    break;
                }
            }

            cumulativeTFC += taxFreePortion;
            iterations++;

            if (fundExhausted && ISAExhausted) {
                break;
            }
        }

        // Adjust fund balance after withdrawals
        fund -= grossPensionWithdrawal;

        // Ensure fund doesn't fall below finalFund
        fund = Math.max(fund, finalFund);

        // ISA Growth
        var ISAGain = ISA * effectiveGrowthRate;
        var isaChargesTaken = ISA * fundCharges; // Calculate ISA charges
        ISA = ISA + ISAGain - ISADrawings - isaChargesTaken;
        ISA = Math.max(ISA, 0);

        taxSaved = taxFreePortion;

       /*  var finalShortfall = Math.max(
            0,
            inflationAdjustedDesiredIncome -
                netPensionWithdrawal -
                (statePensionInPayment - statePensionTax) -
                (dbPensionInPayment - dbPensionTax) -
                ISADrawings
        ); */

        var finalShortfall = inflationAdjustedDesiredIncome -
                netPensionWithdrawal -
                (statePensionInPayment - statePensionTax) -
                (dbPensionInPayment - dbPensionTax) -
                ISADrawings;

        if (age <= maxAge) {
            cashFlowData.push({
                age: age,
                openingBalance: openingFundBalance,
                contribution: 0,
                grossPensionWithdrawal: grossPensionWithdrawal,
                withdrawal: netPensionWithdrawal,
                statePensionInPayment: statePensionInPayment,
                statePension: statePensionInPayment - statePensionTax,
                statePensionTax: statePensionTax,
                dbPensionInPayment: dbPensionInPayment,
                dbPension: dbPensionInPayment - dbPensionTax,
                dbPensionTax: dbPensionTax,
                taxPaid: taxPaidOnDCPension,
                taxSaved: taxSaved,
                cumulativeTFC: cumulativeTFC,
                investmentReturn: investmentGain || 0,
                fundCharges: fundChargesTaken || 0,
                isaCharges: isaChargesTaken,
                ISAGain: ISAGain,
                closingBalance: fund,
                ISAOpeningBalance: ISAOpeningBalance,
                ISAholdings: ISA,
                ISAContribution: 0,
                ISADrawings: ISADrawings,
                shortfall: finalShortfall,
                desiredIncome : inflationAdjustedDesiredIncome
            });

            var discountFactor = 1 / Math.pow(1 + inflation, Math.max(0,age - currentAge));

            todaysMoneyCashFlowData.push({
                age: age,
                openingBalance: openingFundBalance * discountFactor,
                contribution: 0,
                grossPensionWithdrawal: grossPensionWithdrawal * discountFactor,
                withdrawal: netPensionWithdrawal * discountFactor,
                statePensionInPayment: statePensionInPayment * discountFactor,
                statePension:
                    (statePensionInPayment - statePensionTax) * discountFactor,
                statePensionTax: statePensionTax * discountFactor,
                dbPensionInPayment: dbPensionInPayment * discountFactor,
                dbPension:
                    (dbPensionInPayment - dbPensionTax) * discountFactor,
                dbPensionTax: dbPensionTax * discountFactor,
                taxPaid: taxPaidOnDCPension * discountFactor,
                taxSaved: taxSaved * discountFactor,
                cumulativeTFC: cumulativeTFC * discountFactor,
                investmentReturn: (investmentGain || 0) * discountFactor,
                fundCharges: (fundChargesTaken || 0) * discountFactor,
                isaCharges: (isaChargesTaken || 0) * discountFactor,
                ISAGain: (ISAGain || 0) * discountFactor,
                closingBalance: fund * discountFactor,
                ISAOpeningBalance: ISAOpeningBalance * discountFactor,
                ISAholdings: ISA * discountFactor,
                ISAContribution: 0,
                ISADrawings: ISADrawings * discountFactor,
                shortfall: finalShortfall * discountFactor,
                desiredIncome: inflationAdjustedDesiredIncome * discountFactor
            });
        }

        previousGrossPensionWithdrawal = grossPensionWithdrawal;

        if (
            fund - finalFund <= tolerance &&
            ISAExhausted &&
            !dbPensionProjectionOnly &&
            !finalProjection
        ) {
            if (age <= endAge) {
                fundsDepletedBeforeEndAge = true;
            }
            // Do not break here; allow fund to deplete to finalFund
        }
    }

    var finalBalance = fund + ISA;

    return {
        finalBalance: finalBalance,
        cashFlowData: cashFlowData,
        todaysMoneyCashFlowData: todaysMoneyCashFlowData,
        ageWhenTFCMaxed: ageWhenTFCMaxed,
        fundsDepletedBeforeEndAge: fundsDepletedBeforeEndAge,
        totalFundCharges: totalFundCharges,
        iterations: iterations,
        
    };
}







function calculateNetIncome(
    grossPensionWithdrawal,
    statePensionInPayment,
    dbPensionInPayment,
    totalTaxableIncome,
    age,               // Age of the user in the simulation year
    inflation,
    useScottishTax,
    currentAge         // User's real current age
) {
    // Calculate tax on state pension alone to utilize personal allowance first
    const statePensionTax = calculateIncomeTax(
        statePensionInPayment,
        age,
        inflation,
        useScottishTax,
        currentAge
    );

    // Calculate tax on combined state pension and DB pension
    const stateAndDBIncome = statePensionInPayment + dbPensionInPayment;
    const stateAndDBTax = calculateIncomeTax(
        stateAndDBIncome,
        age,
        inflation,
        useScottishTax,
        currentAge
    );

    // Tax on DB pension is the difference between combined tax and state pension tax
    let dbPensionTax = stateAndDBTax - statePensionTax;
    dbPensionTax = Math.max(dbPensionTax, 0);

    // Calculate total tax including DC pension withdrawal
    const totalTax = calculateIncomeTax(
        totalTaxableIncome,
        age,
        inflation,
        useScottishTax,
        currentAge
    );

    // Tax paid specifically on DC pension withdrawal is total tax minus taxes on state and DB pensions
    let taxPaidOnDCPension = totalTax - stateAndDBTax;
    taxPaidOnDCPension = Math.max(taxPaidOnDCPension, 0);

    // Calculate net pension withdrawal after tax, ensuring it doesn't go below zero
    let netPensionWithdrawal = Math.max(0, grossPensionWithdrawal - taxPaidOnDCPension);

    // Calculate net income for other pensions, ensuring they are non-negative
    const statePensionAfterTax = Math.max(0, statePensionInPayment - statePensionTax);
    const dbPensionAfterTax = Math.max(0, dbPensionInPayment - dbPensionTax);

    // Return results as an object for easy access
    return {
        netPensionWithdrawal: netPensionWithdrawal,
        statePensionAfterTax: statePensionAfterTax,
        dbPensionAfterTax: dbPensionAfterTax,
        taxPaidOnDCPension: taxPaidOnDCPension,
        statePensionTax: statePensionTax,
        dbPensionTax: dbPensionTax
    };
}



function calculateIncomeTax(income, age, indexationRate, useScottishTax, currentAge) {
    // Determine the tax year based on the current age and the age at the time
    var currentYear = new Date().getFullYear();
    var taxYear = currentYear + (age - currentAge);
    var yearsSince2028 = taxYear - 2028 + 1; // +1 to include 2028
    var indexationFactor = Math.pow(1 + indexationRate, yearsSince2028);

    // Base tax bands and rates for 2023/24
    var personalAllowance = calcPersonalAllowance(age, currentAge, indexationRate) ;
    var taxBands = [];
    var adjustedPersonalAllowance = personalAllowance;

    // Adjust personal allowance for income over £100,000
    var totalIncome = income;
    if (totalIncome > 100000) {
        var reduction = Math.min((totalIncome - 100000) / 2, personalAllowance);
        adjustedPersonalAllowance = personalAllowance - reduction;
    }

    if (useScottishTax) {
        // Scottish tax bands and rates
        var starterRateLimit = 14732;
        var basicRateLimit = 25688;
        var intermediateRateLimit = 43662;
        var higherRateLimit = 125140;

        var starterRate = 0.19;
        var basicRate = 0.20;
        var intermediateRate = 0.21;
        var higherRate = 0.42;
        var topRate = 0.47;

        if (taxYear >= 2028) {
            // Apply indexation to Scottish bands
            starterRateLimit *= indexationFactor;
            basicRateLimit *= indexationFactor;
            intermediateRateLimit *= indexationFactor;
            higherRateLimit *= indexationFactor;
        }

        taxBands = [
            { threshold: adjustedPersonalAllowance, rate: 0 },
            { threshold: starterRateLimit, rate: starterRate },
            { threshold: basicRateLimit, rate: basicRate },
            { threshold: intermediateRateLimit, rate: intermediateRate },
            { threshold: higherRateLimit, rate: higherRate },
            { threshold: Infinity, rate: topRate }
        ];
    } else {
        // Rest of UK tax bands and rates
        var basicRateLimit = 50270;
        var higherRateLimit = 125140;

        var basicRate = 0.20;
        var higherRate = 0.40;
        var additionalRate = 0.45;

        if (taxYear >= 2028) {
            // Apply indexation to UK bands
            basicRateLimit *= indexationFactor;
            higherRateLimit *= indexationFactor;
        }

        taxBands = [
            { threshold: adjustedPersonalAllowance, rate: 0 },
            { threshold: basicRateLimit, rate: basicRate },
            { threshold: higherRateLimit, rate: higherRate },
            { threshold: Infinity, rate: additionalRate }
        ];
    }

    // Calculate taxable income
    var taxableIncome = Math.max(0, totalIncome - adjustedPersonalAllowance);

    // Calculate tax
    var tax = 0;
    var previousThreshold = adjustedPersonalAllowance;

    for (var i = 1; i < taxBands.length; i++) {
        var bandLimit = taxBands[i].threshold;
        var bandRate = taxBands[i].rate;
        var incomeInBand = Math.min(taxableIncome, bandLimit - previousThreshold);

        if (incomeInBand > 0) {
            tax += incomeInBand * bandRate;
            taxableIncome -= incomeInBand;
            previousThreshold = bandLimit;
        } else {
            break;
        }
    }

    return tax;
}

function calcPersonalAllowance(age, currentAge, indexationRate) {
    var currentYear = new Date().getFullYear();
    var taxYear = currentYear + (age - currentAge);

    // Base tax bands and rates for 2023/24
    var personalAllowance = 12570;
    
    // Determine if indexation applies (from 2028 onwards)
    if (taxYear >= 2028) {
        var yearsSince2028 = taxYear - 2028 + 1; // +1 to include 2028
        var indexationFactor = Math.pow(1 + indexationRate, yearsSince2028);

        personalAllowance *= indexationFactor;
    }
    return personalAllowance;
}


function getStatePensionAge(currentAge) {
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - currentAge;

    if (birthYear < 1954) {
        return 65;  // State Pension age for men born before 6 December 1953
    } else if (birthYear >= 1954 && birthYear <= 1960) {
        return 66;  // State Pension age for men born between 6 December 1953 and 5 April 1960
    } else if (birthYear >= 1961 && birthYear <= 1977) {
        return 67;  // State Pension age for men born between 6 April 1960 and 5 April 1977
    } else if (birthYear >= 1978) {
        return 68;  // Expected State Pension age for men born on or after 6 April 1977
    } else {
        return "Unknown";
    }
}


function calculateStatePension(currentAge, currentPension, statePensionInflation,pensionAge) {
    

    if (typeof pensionAge === "string") {
        return "Pension age unknown";
    }

    if (currentAge >= pensionAge) {
        return currentPension;
    }

    const yearsToPension = pensionAge - currentAge;

    let futurePension = currentPension;

    // Apply annual increase for each year until State Pension age
    for (let i = 0; i < yearsToPension; i++) {
        futurePension *= (1 + statePensionInflation);
    }

    return futurePension;  // Returns the future state pension
}

function accumulatePayments(payment, accumulationRate, yearsDuration) {
    const inflationFactor = (1 + accumulationRate);
    
    if (accumulationRate === 0) {
        // If the accumulation rate is 0, it's just the sum of equal payments for the given duration
        return payment * yearsDuration;
    }

    // Actuarial accumulation formula for a growing annuity
    return payment * (Math.pow(inflationFactor, yearsDuration) - 1) / accumulationRate;
}

function getEarliestPensionAge(currentAge) {
    if (currentAge >= 54) {
        return 55; // For those aged 54 or older, pension age remains 55
    } else {
        return 57; // For those younger than 54, pension age is increasing to 57 from 2028
    }
}





// Ensure that the formatNumber function is defined
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}






function formatNumber(num) {
    return num.toLocaleString('en-UK');
}






function checkIfInputsPopulated() {
    // Variables to track if all inputs are populated
    let allPopulated = true;

    // Check text/number input fields
    const fieldsToCheck = [
        "currentAge", 
        "retirementAge", 
        "endAge", 
        "currentFund", 
        "monthlyContribution", 
        "stepUpAge", 
        "stepUpContribution", 
        "desiredIncome", 
        "currentISA", 
        "monthlyISAContribution", 
        "minISABalance", 
        "dbPensionAmount", 
        "dbPensionAge", 
        "fundGrowthPre", 
        "fundGrowthPost", 
        "fundCharges", 
        "taxFreeCashPercent", 
        "inflation"
    ];

    fieldsToCheck.forEach(function(fieldId) {
        let fieldValue = document.getElementById(fieldId).value;
        if (!fieldValue) {
            console.log(`Field ${fieldId} is not populated.`);
            allPopulated = false;
        }
    });

   

    return allPopulated;
}




function validateInputs(isCouple,alreadyRetired) {

    const inputs = [
        { id: "currentAge", key: "Current Age" },
        { id: "currentFund", key: "Current Pension Fund" },
        { id: "desiredIncome", key: "Desired Monthly Income" }
       
    ];

    const notretiredinputs =  [
        { id: "retirementAge", key: "Desired Retirement Age" },
       
    ];

    const coupleinputs = [ { id: "currentAge", key: "Current Age" },
       
        { id: "currentFund", key: "Current Pension Fund" },
        { id: "currentAgePartner", key: "Partner's Current Age" },
        { id: "currentFundPartner", key: "Partner's Current Pension Fund" },
        { id: "desiredCombinedIncome", key: "Desired Combined Income" },
        
    ];

    let proceedWithCalc = true; // Flag to determine if we can proceed

   

    if (isCouple) {
        for (const input of coupleinputs) {
            const value = localStorage.getItem(input.id); // Get the value from local storage
            if (value && value.trim() !== "") {
                // If the value is valid, save it back to local storage (if needed)
                saveToLocalStorage(input.key, value);
            } else {
                window.location.href = 'inputs.html';  
                
                alert(`Please provide a value in the Inputs page for: ${input.key}`);
                proceedWithCalc = false;
                break; // Exit the loop on the first missing input
            }
        }
    } else {
        for (const input of inputs) {
            const value = localStorage.getItem(input.id); // Get the value from local storage
            if (value && value.trim() !== "") {
                // If the value is valid, save it back to local storage (if needed)
                saveToLocalStorage(input.key, value);
            } else {
                
                window.location.href = 'inputs.html';  
                alert(`Please provide a value in the Inputs page for: ${input.key}`);
                proceedWithCalc = false;
                break; // Exit the loop on the first missing input
            }
        }
    }
    if (!alreadyRetired) {
        for (const input of notretiredinputs) {
            const value = localStorage.getItem(input.id); // Get the value from local storage
            if (value && value.trim() !== "") {
                // If the value is valid, save it back to local storage (if needed)
                saveToLocalStorage(input.key, value);
            } else {
                window.location.href = 'inputs.html';  
                alert(`Please provide a value in the Inputs page for: ${input.key}`);
                proceedWithCalc = false;
                break; // Exit the loop on the first missing input
            }
        }
    }
         
    return proceedWithCalc;
}  


function combineCashFlowData(cashFlowData1, cashFlowData2) {
    return cashFlowData1.map((item, index) => {
        const item2 = cashFlowData2[index];

        return {
            age: item.age,
            openingBalance: item.openingBalance + item2.openingBalance,
            contribution: item.contribution + item2.contribution,
            grossPensionWithdrawal: item.grossPensionWithdrawal + item2.grossPensionWithdrawal,
            withdrawal: item.withdrawal + item2.withdrawal,
            statePensionInPayment: item.statePensionInPayment + item2.statePensionInPayment,
            statePension: item.statePension + item2.statePension,
            statePensionTax: item.statePensionTax + item2.statePensionTax,
            dbPensionInPayment: item.dbPensionInPayment + item2.dbPensionInPayment,
            dbPension: item.dbPension + item2.dbPension,
            dbPensionTax: item.dbPensionTax + item2.dbPensionTax,
            taxPaid: item.taxPaid + item2.taxPaid,
            taxSaved: item.taxSaved + item2.taxSaved,
            cumulativeTFC: item.cumulativeTFC + item2.cumulativeTFC,
            investmentReturn: item.investmentReturn + item2.investmentReturn,
            fundCharges: item.fundCharges + item2.fundCharges,
            isaCharges: item.isaCharges + item2.isaCharges,
            ISAGain: item.ISAGain + item2.ISAGain,
            closingBalance: item.closingBalance + item2.closingBalance,
            ISAOpeningBalance: item.ISAOpeningBalance + item2.ISAOpeningBalance,
            ISAholdings: item.ISAholdings + item2.ISAholdings,
            ISAContribution: item.ISAContribution + item2.ISAContribution,
            ISADrawings: item.ISADrawings + item2.ISADrawings,
            shortfall: item.shortfall + item2.shortfall,
            desiredIncome: item.desiredIncome 
        };
    });
}

