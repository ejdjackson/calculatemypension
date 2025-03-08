//to Toggle Navbar on Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');



function calculateMyPension(planAsCouple, incomeType = null) {
    
        const alreadyRetired =  (localStorage.getItem('alreadyRetired') === 'true');
        var currentAge = parseInt(localStorage.getItem("currentAge")) || 0;
        var retirementAge = parseInt(localStorage.getItem("retirementAge")) || 0;
        var inflation = parseFloat(localStorage.getItem("inflation")) / 100;
        var TFC = parseFloat(localStorage.getItem("inflation")) / 100;
        var desiredIncome = parseFloat(localStorage.getItem("desiredIncome"))

        // Check annual pension contribution limit is not breached
        var monthlyContribution = parseFloat(localStorage.getItem("monthlyContribution")) ; 
        var stepUpContribution = parseFloat(localStorage.getItem("stepUpContribution")) ; 
    
        if (alreadyRetired) {
            retirementAge = currentAge;
        }

        if (planAsCouple) {
            
            var desiredCombinedIncome = 12 * parseInt(localStorage.getItem("desiredCombinedIncome")) ; 
            var simulation1 = calculateSinglesPension(alreadyRetired,desiredCombinedIncome/12);
            var simulation2 = calculatePartnersPension(alreadyRetired,desiredCombinedIncome/12);

            var combinedCashFlowData = combineCashFlowData(simulation1.cashFlowData, simulation2.cashFlowData);
            var combinedTodaysMoneyCashFlowData = combineCashFlowData(simulation1.todaysMoneyCashFlowData, simulation2.todaysMoneyCashFlowData);
            
            var couplesShortfallData = calculateCouplesShortfall(retirementAge, desiredCombinedIncome * Math.pow(1+inflation,Math.max(0,retirementAge-currentAge)), combinedCashFlowData, inflation) 
            var couplesTodaysMoneyShortfallData = calculateCouplesShortfall(retirementAge, desiredCombinedIncome, combinedTodaysMoneyCashFlowData, 0) 

            // Update shortfall in combinedCashFlowData
            updateShortfallInCombinedData(combinedCashFlowData, couplesShortfallData);
            updateShortfallInCombinedData(combinedTodaysMoneyCashFlowData, couplesTodaysMoneyShortfallData);
            const couplesShortfallAtRetirement = getShortfallAtAge(combinedCashFlowData, retirementAge);

            previousIncomeType = localStorage.getItem('previousIncomeType');
            var dontResizeChart = false;

            if (incomeType == null || incomeType == 'Combined') {
                outputResults(combinedCashFlowData, combinedTodaysMoneyCashFlowData, currentAge, simulation1.retirementAge, simulation1.fundAtRetirement + simulation2.fundAtRetirement, simulation1.ISAAtRetirement + simulation2.ISAAtRetirement, simulation1.taxFreeCashTaken + simulation2.taxFreeCashTaken, desiredCombinedIncome, simulation1.maxAffordableNetIncome + simulation2.maxAffordableNetIncome, couplesShortfallAtRetirement, simulation1.discountFactor, alreadyRetired, planAsCouple, dontResizeChart, incomeType, simulation1,  simulation2);
            }
            else if (incomeType == 'Your') {
                if (previousIncomeType == 'Combined' || previousIncomeType == 'Partner') {
                    dontResizeChart = true;
                }
                outputResults(simulation1.cashFlowData, simulation1.todaysMoneyCashFlowData, currentAge, simulation1.retirementAge, simulation1.fundAtRetirement, simulation1.ISAAtRetirement, simulation1.taxFreeCashTaken, simulation1.desiredAnnualIncome, simulation1.maxAffordableNetIncome, simulation1.shortfallAtRetirement, simulation1.discountFactor, simulation1.alreadyRetired, planAsCouple, dontResizeChart, incomeType, simulation1,  simulation2);
            }
            else if (incomeType == 'Partner') {
                if (previousIncomeType == 'Combined' || previousIncomeType == 'Your') {
                    dontResizeChart = true;
                }
                outputResults(simulation2.cashFlowData, simulation2.todaysMoneyCashFlowData, currentAge, simulation2.retirementAge, simulation2.fundAtRetirement, simulation2.ISAAtRetirement, simulation2.taxFreeCashTaken, simulation2.desiredAnnualIncome, simulation2.maxAffordableNetIncome, simulation2.shortfallAtRetirement, simulation2.discountFactor, simulation2.alreadyRetired, planAsCouple, dontResizeChart, incomeType, simulation1,  simulation2);
            }
        }
        else {
            var simulation = calculateSinglesPension(alreadyRetired,desiredIncome);
         
            // Call the function to print the values
            printUserData();

            // Call the function to print the values
            printAssumptions();


            outputResults(simulation.cashFlowData, simulation.todaysMoneyCashFlowData, currentAge, simulation.retirementAge, simulation.fundAtRetirement, simulation.ISAAtRetirement, simulation.taxFreeCashTaken, simulation.desiredAnnualIncome, simulation.maxAffordableNetIncome, simulation.shortfallAtRetirement, simulation.discountFactor, simulation.alreadyRetired, planAsCouple, dontResizeChart, incomeType);
        }
    
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


function getERFValue(x, type = 'primary') {
    // Determine the key prefix based on the type (default is 'primary')
    const prefix = type === 'partner' ? 'partnerERF' : 'ERF';

    // Construct the key for the desired ERF value in localStorage
    const key = `${prefix}${x}`;

    // Retrieve the value from localStorage
    const value = localStorage.getItem(key)/100;

    // Validate the retrieved value
    if (value === null) {
        console.error(`No value found in localStorage for key: ${key}`);
        return null;
    }

    // Parse the value as a floating-point number and return
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
        console.error(`Invalid number format for key: ${key}`);
        return null;
    }

    return numericValue;
}




function calculateSinglesPension(alreadyRetired,desiredIncome) {

    var partnerCalc = false;

    // Get user data
    var userData = getUserData();

    // Calculate ERF and adjust pension amount and age
    var ERF = getERFValue(Math.max(0, userData.dbPensionAge - userData.earlyRetirementAge));
    userData.dbPensionAmount = userData.dbPensionAmount * (1 - ERF);
    userData.dbPensionAge = userData.earlyRetirementAge;

    // Save the adjusted pension amount to localStorage
    saveToLocalStorage('earlyRetirementDbPensionAmount', userData.dbPensionAmount);

    // Call calculatePension with the relevant userData properties
    var simulation = calculatePension(

        partnerCalc,
        userData.currentAge,
        userData.retirementAge,
        alreadyRetired,
        userData.currentFund,
        userData.monthlyContribution,
        userData.stepUpAge,
        userData.stepUpContribution,
        userData.currentISA,
        userData.monthlyISAContribution,
        userData.dbPensionAmount,
        userData.dbPensionAge,
        userData.endAge,
        userData.finalFund,
        userData.taxFreeCashPercent,
        desiredIncome,
        userData.minISABalance,
        userData.baseWithdrawal,
        userData.pensionPercentage,
        userData.incomeStepAge1,
        userData.incomeStepPercent1,
        userData.incomeStepAge2,
        userData.incomeStepPercent2,
      
        
       
        
    );

    return simulation;
}


function getUserData() {
    return {
        currentAge: parseInt(localStorage.getItem("currentAge")) || 0,
        retirementAge: parseInt(localStorage.getItem("retirementAge")) || 0,
        currentFund: parseFloat(localStorage.getItem("currentFund")) || 0.0,
        monthlyContribution: parseFloat(localStorage.getItem("monthlyContribution")) || 0.0,
        currentISA: parseFloat(localStorage.getItem("currentISA")) || 0.0,
        monthlyISAContribution: parseFloat(localStorage.getItem("monthlyISAContribution")) || 0.0,
        stepUpAge: parseInt(localStorage.getItem("stepUpAge")) || 0,
        stepUpContribution: parseFloat(localStorage.getItem("stepUpContribution")) || 0.0,
        stepUpAgeISA: parseInt(localStorage.getItem("stepUpAgeISA")) || 0,
        stepUpContributionISA: parseFloat(localStorage.getItem("stepUpContributionISA")) || 0.0,
        dbPensionAmount: parseFloat(localStorage.getItem("dbPensionAmount")) || 0.0,
        dbPensionAge: parseInt(localStorage.getItem("dbPensionAge")) || 0,
        endAge: parseInt(localStorage.getItem("endAge")) || 0,
        finalFund: parseFloat(localStorage.getItem("finalFund")) || 0.0,
        taxFreeCashPercent: parseFloat(localStorage.getItem('taxFreeCashPercent')) / 100 || 0.0,
        earlyRetirementAge: parseInt(localStorage.getItem("earlyRetirementAge")) || 0,
        minISABalance: parseFloat(localStorage.getItem("minISABalance")) || 0,
        baseWithdrawal: parseFloat(localStorage.getItem("baseWithdrawal")) ,
        pensionPercentage: parseFloat(localStorage.getItem("pensionPercentage")) / 100,
        incomeStepAge1: parseFloat(localStorage.getItem("incomeStepAge1")) ,
        incomeStepPercent1: parseFloat(localStorage.getItem("incomeStepPercent1")) / 100 ,
        incomeStepAge2: parseFloat(localStorage.getItem("incomeStepAge2")) ,
        incomeStepPercent2: parseFloat(localStorage.getItem("incomeStepPercent2")) / 100 ,
        inflationLinkedContributions: localStorage.getItem('inflationLinkedContributions') === 'true',
        inflationLinkedISAContributions: localStorage.getItem('inflationLinkedISAContributions') === 'true',
        annuityAge:  parseInt(localStorage.getItem('annuityAge')) ,
        fundConversionRate: parseFloat(localStorage.getItem('fundConversion')) / 100,
        statePension: parseFloat(localStorage.getItem('statePension')) || 0
       
    };
}

function printUserData() {
    const userData = getUserData();
    console.log("User Data from Local Storage:");
    Object.entries(userData).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}



function calculatePartnersPension(alreadyRetired,desiredIncome) {

    var partnerCalc = true;

    // Get user data
    var userData = getUserData();
    

    // Get partner data
    var partnerData = getPartnerData(userData.currentAge,userData.retirementAge);

    var partnerERF = getERFValue(Math.max(0,partnerData.dbPensionAge - partnerData.earlyRetirementAge),'partner');
    partnerData.dbPensionAmount = partnerData.dbPensionAmount * (1 - partnerERF) ;
    partnerData.dbPensionAge = partnerData.earlyRetirementAge;
    saveToLocalStorage('earlyRetirementDbPensionAmountPartner', partnerData.dbPensionAmount);
    
    var simulation = calculatePension(

        partnerCalc,
        partnerData.currentAge,
        partnerData.retirementAge,
        alreadyRetired,
        partnerData.currentFund,
        partnerData.monthlyContribution,
        partnerData.stepUpAge,
        partnerData.stepUpContribution,
        partnerData.currentISA,
        partnerData.monthlyISAContribution,
        partnerData.dbPensionAmount,
        partnerData.dbPensionAge,
        partnerData.endAge,
        partnerData.finalFund,
        partnerData.taxFreeCashPercent,
        desiredIncome,
        partnerData.minISABalance,
        partnerData.baseWithdrawal,
        partnerData.pensionPercentage,
        partnerData.incomeStepAge1,
        partnerData.incomeStepPercent1,
        partnerData.incomeStepAge2,
        partnerData.incomeStepPercent2,
        
       
        
        
    );
    
    return simulation;
}

function getPartnerData(currentAge1,retirementAge1) {
    return {
        currentAge: parseInt(localStorage.getItem("currentAgePartner")) || 0,
        retirementAge: retirementAge1 + parseInt(localStorage.getItem("currentAgePartner")) - currentAge1,
        currentFund: parseInt(localStorage.getItem("currentFundPartner")) || 0,
        monthlyContribution: parseFloat(localStorage.getItem("monthlyContributionPartner")) || 0.0,
        currentISA: parseInt(localStorage.getItem("currentISAPartner")) || 0,
        monthlyISAContribution: parseFloat(localStorage.getItem("monthlyISAContributionPartner")) || 0.0,
        stepUpAge: parseInt(localStorage.getItem("stepUpAgePartner")) || 0,
        stepUpContribution: parseFloat(localStorage.getItem("stepUpContributionPartner")) || 0.0,
        stepUpAgeISA: parseInt(localStorage.getItem("stepUpAgePartnerISA")) || 0,
        stepUpContributionISA: parseFloat(localStorage.getItem("stepUpContributionPartnerISA")) || 0.0,
        dbPensionAmount: parseInt(localStorage.getItem("dbPensionAmountPartner")) || 0,
        dbPensionAge: parseInt(localStorage.getItem("dbPensionAgePartner")) || 0,
        endAge: parseInt(localStorage.getItem("endAge")) + parseInt(localStorage.getItem("currentAgePartner")) - currentAge1 || 0,
        finalFund: parseFloat(localStorage.getItem("partnersFinalFund")) || 0.0,
        taxFreeCashPercent: parseFloat(localStorage.getItem("taxFreeCashPercentPartner")) / 100 || 0.0,
        earlyRetirementAge: parseInt(localStorage.getItem("partnerEarlyRetirementAge")) ,
        minISABalance: parseFloat(localStorage.getItem("minISABalancePartner")) || 0,
        baseWithdrawal: parseFloat(localStorage.getItem("baseWithdrawalPartner")) ,
        pensionPercentage: parseFloat(localStorage.getItem("pensionPercentagePartner")) / 100 ,
        incomeStepAge1: parseFloat(localStorage.getItem("partnerIncomeStepAge1")) ,
        incomeStepPercent1: parseFloat(localStorage.getItem("partnerIncomeStepPercent1")) / 100 ,
        incomeStepAge2: parseFloat(localStorage.getItem("partnerIncomeStepAge2")) ,
        incomeStepPercent2: parseFloat(localStorage.getItem("partnerIncomeStepPercent2")) / 100 ,
        inflationLinkedContributions: localStorage.getItem('inflationLinkedContributionsPartner') === 'true',
        inflationLinkedISAContributions: localStorage.getItem('inflationLinkedISAContributionsPartner') === 'true',
        annuityAge:  parseInt(localStorage.getItem('annuityAgePartner')) ,
        fundConversionRate: parseFloat(localStorage.getItem('fundConversionPartner')) / 100,
        statePension: parseFloat(localStorage.getItem('partnerStatePension')) || 0
   };
}


function calculateCombinedPension() {

    // Your Inputs
    
    var userData = getUserData()

    
    var ERF = getERFValue(Math.max(0,dbPensionAge - earlyRetirementAge));
    dbPensionAmount = dbPensionAmount * (1 - ERF) ;
    dbPensionAge = earlyRetirementAge;
    saveToLocalStorage('earlyRetirementDbPensionAmount', dbPensionAmount);
    
    //Partner's inputs
    
    var currentAgePartner = parseInt(localStorage.getItem("currentAgePartner")) || 0;
    var retirementAgePartner = retirementAge + currentAgePartner - currentAge;
    var currentFundPartner = parseInt(localStorage.getItem("currentFundPartner")) || 0;
    var monthlyContributionPartner = parseFloat(localStorage.getItem("monthlyContributionPartner")) ; 
    var currentISAPartner = parseInt(localStorage.getItem("currentISAPartner")) || 0;
    var monthlyISAContributionPartner = parseFloat(localStorage.getItem("monthlyISAContributionPartner")) || 0.0;
    var stepUpAgePartner = parseInt(localStorage.getItem("stepUpAgePartner"))|| 0;
    var stepUpContributionPartner = parseFloat(localStorage.getItem("stepUpContributionPartner")) || 0.0;
    var dbPensionAmountPartner = parseInt(localStorage.getItem("dbPensionAmountPartner")) || 0;
    var dbPensionAgePartner = parseInt(localStorage.getItem("dbPensionAgePartner")) || 0;
    var endAgePartner = parseInt(localStorage.getItem("endAge")) + currentAgePartner - currentAge;
    var finalFund = parseFloat(localStorage.getItem("partnersFinalFund")) || 0;
    
    var simulation = calculateCombinedPension(currentAge,retirementAge,alreadyRetired,currentFund,monthlyContribution,currentISA,monthlyISAContribution,stepUpAge,stepUpContribution,dbPensionAmount,dbPensionAge,endAge,finalFund,taxFreeCashPercent,desiredIncome);
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


function getAssumptions() {
    return {
        maxAnnualISAContribution: 20000,
        maxAnnualPensionContribution: 60000,
        useScottishTax: localStorage.getItem('useScottishTax') === 'true',
        fundGrowthPre: parseFloat(localStorage.getItem("fundGrowthPre")) / 100 || 0,
        fundGrowthPost: parseFloat(localStorage.getItem("fundGrowthPost")) / 100 || 0,
        inflation: parseFloat(localStorage.getItem("inflation")) / 100 || 0,
        applyInflationAdjustment: localStorage.getItem("applyInflationAdjustment") === "true",
        marketCrashAge: parseInt(localStorage.getItem("marketCrashAge")) || 0,
        marketCrashPercent: parseFloat(localStorage.getItem("marketCrashPercent")) || 0,
        fundCharges: parseFloat(localStorage.getItem("fundCharges")) / 100 || 0,
        useCashISA: localStorage.getItem('showCashISASavings') === 'true',
        isaGrowth: localStorage.getItem('showCashISASavings') === 'true'
            ? parseFloat(localStorage.getItem("isaInterestRate")) / 100 || 0
            : parseFloat(localStorage.getItem("isaGrowth")) / 100 || 0,
        isaCharges: localStorage.getItem('showCashISASavings') === 'true'
            ? 0
            : parseFloat(localStorage.getItem("isaCharges")) / 100 || 0
        
        
    };
}


function printAssumptions() {
    const assumptions = getAssumptions();
    console.log("Assumptions from Local Storage:");
    Object.entries(assumptions).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
}






function calculatePension(partnerCalc,currentAge,retirementAge,alreadyRetired,currentFund,monthlyContribution,stepUpAge,stepUpContribution,currentISA,monthlyISAContribution,dbPensionAmount,dbPensionAge,endAge,finalFund,taxFreeCashPercent,desiredIncome,minISABalance,baseWithdrawal,pensionPercentage ) {
            
    // Get assumptions
    const assumptions = getAssumptions();
    
    if (partnerCalc) {
        var userData = getPartnerData(); 
    } else {
        var userData = getUserData();
    }
    

    const useScottishTax =  (localStorage.getItem('useScottishTax') === 'true');
    var fundGrowthPre = parseFloat(localStorage.getItem("fundGrowthPre")) / 100;
    var fundGrowthPost = parseFloat(localStorage.getItem("fundGrowthPost")) / 100;
    var inflation = parseFloat(localStorage.getItem("inflation")) / 100;
    var applyInflationAdjustment = localStorage.getItem("applyInflationAdjustment") === "true";
    var marketCrashAge = parseInt(localStorage.getItem("marketCrashAge"));
    var marketCrashPercent = parseFloat(localStorage.getItem("marketCrashPercent"));
    var fundCharges = parseFloat(localStorage.getItem("fundCharges")) / 100;


    var statePensionAge = getStatePensionAge(currentAge);
    var desiredAnnualIncome = 12 * desiredIncome;
    
    
    const useCashISA =  (localStorage.getItem('showCashISASavings') === 'true');
    if (useCashISA) {
        var isaGrowth = parseFloat(localStorage.getItem("isaInterestRate")) / 100 ; 
        var isaCharges = 0;         
    } else {
        var isaGrowth = parseFloat(localStorage.getItem("isaGrowth")) / 100 ; 
        var isaCharges = parseFloat(localStorage.getItem("isaCharges")) / 100 ;          
    }
 
    if (alreadyRetired) {
        fundGrowthPost = fundGrowthPre;
    }
    
   
    // Get current state pension from user input
    if (userData.statePension > 0) {
        var currentStatePension = userData.statePension;
    } else {
        var currentStatePension = 11976;
    }
    var maxTFCPercent = 0.25;

    window.maxAnnualISAContribution = 20000;
    
    window.ISAWarning = "Maximum Annual ISA Contribution is £20,000. Equivalent to £1,666 monthly.";
    
    var statePensionInflation = Math.max(inflation,0.025);
    var earliestPensionWithdrawalAge = getEarliestPensionAge(currentAge);
    var dbPensionEscalation = inflation;
   
    if (taxFreeCashPercent > 0.25) {
        alert("Tax Free Cash % cannot exceed 25%.");
        document.getElementById("taxFreeCashPercent").value = 25;
        return;
    }

    if (monthlyISAContribution * 12 > window.maxAnnualISAContribution) {
        alert(window.ISAWarning);
        return;
    }
 


    var annualContribution = monthlyContribution * 12;
    var annualAdditionalContribution = stepUpContribution * 12;
    var annualISAContribution = monthlyISAContribution * 12;

    
    // Calculate future state pension
    var statePension = calculateStatePension(currentAge, currentStatePension, statePensionInflation, statePensionAge);
    var cashFlowDataAccumulation = [];
    var todaysMoneyCashFlowDataAccumulation = [];

    if (alreadyRetired) {
        fundAtRetirement = currentFund;
        ISAAtRetirement = currentISA;
        
    } else {
        // Simulate accumulation phase up to retirement age
        var simulationToRetirement = simulateFundToRetirement(
            partnerCalc,
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
            marketCrashPercent,
            isaGrowth, isaCharges   
            
            
        );
        var fundAtRetirement = simulationToRetirement.fundAtRetirement;
        var ISAAtRetirement = simulationToRetirement.ISAAtRetirement;
        cashFlowDataAccumulation = simulationToRetirement.cashFlowData;
        todaysMoneyCashFlowDataAccumulation = simulationToRetirement.todaysMoneyCashFlowData;

        var totalFundChargesPreRetirement = simulationToRetirement.totalFundCharges;
    }   
    
    // Set initial cumulative TFC and remaining TFC percent
    var cumulativeTFC = 0;
    var remainingTFCPercent = maxTFCPercent - taxFreeCashPercent;

    //Desired Income at retirement
    var desiredAnnualIncomeAtRetirement = desiredAnnualIncome * Math.pow(1 + inflation, Math.max(0,retirementAge - currentAge))/12

    // Make that weird adjustment to make it work
    //endAge = endAge - 1;

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
        partnerCalc,currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,isaGrowth, isaCharges , 
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation, todaysMoneyCashFlowDataAccumulation,
        taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, 0, netIncomeUpper, finalFund,baseWithdrawal,pensionPercentage
    );

    var secondUpperBoundGuess = maxAffordableNetIncome;
    //Use the no-crash income as the estiamte for the upper limit on income
    netIncomeUpper = maxAffordableNetIncome;
    maxAffordableNetIncome = findMaximumAffordableTotalWithdrawal(
        partnerCalc,currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,isaGrowth, isaCharges ,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation, todaysMoneyCashFlowDataAccumulation,
        taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, marketCrashPercent, netIncomeUpper, finalFund,baseWithdrawal,pensionPercentage
    );

    // Display tax-free cash taken at earliest pension withdrawal age
    var expectedTFC = fundAtRetirement * taxFreeCashPercent;
    var maxTFCAmount = 268275;
    
    //var taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount);
    
    
    var discountFactor = 1/ Math.pow(1 + inflation, Math.max(0,retirementAge - currentAge));
    var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
    
    var desiredAnnualIncomeAtRetirement = desiredAnnualIncome / discountFactor;
    /* var initialMonthlyShortfall = Math.max(0,desiredAnnualIncomeAtRetirement-maxAffordableNetIncome)/12;
    var inflationAdjustedInitialMonthlyShortfall = Math.max(0,desiredAnnualIncome-inflationAdjustedMaxAffordableNetIncome)/12;
    */
   /*  incomeStepAge1 = 75;
    incomeStepPercent1 = -0.1;
    incomeStepAge2 = 85;
    incomeStepPercent2 = -0.1; */

    // Simulate combined fund
    var finalProjection = true;
    var simulation = simulateCombinedFund(
        partnerCalc,currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges ,isaGrowth, isaCharges ,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, maxAffordableNetIncome, statePensionInflation, cashFlowDataAccumulation, todaysMoneyCashFlowDataAccumulation,
        taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, marketCrashPercent, finalFund,baseWithdrawal,pensionPercentage, redistributePension
    );

    if (currentAge > retirementAge) {retirementAge=currentAge} //cashFlowData only starts at current age

 
    // Find the shortfall at retirement
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
        taxFreeCashTaken: simulation.taxFreeCashTaken,
        desiredAnnualIncome: desiredAnnualIncome,
        maxAffordableNetIncome: maxAffordableNetIncome,
        shortfallAtRetirement: shortfallAtRetirement,
        discountFactor: discountFactor,
        alreadyRetired: alreadyRetired,
        taxFreeCashPercent: taxFreeCashPercent,
        firstUpperBoundGuess: firstUpperBoundGuess,
        secondUpperBoundGuess: secondUpperBoundGuess,
        dbPensionAmount: dbPensionAmount,
    };
    
    
}





function simulateFundToRetirement(
    partnerCalc,
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
    marketCrashPercent,
    isaGrowth, 
    isaCharges     
    
) {

    if (partnerCalc) {
        var userData = getPartnerData(); 
    } else {
        var userData = getUserData();
    }

    var assumptions = getAssumptions();

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
            if (userData.inflationLinkedContributions) {
                currentAnnualContribution = Math.min(currentAnnualContribution + annualAdditionalContribution * Math.pow(1 + inflation, age - currentAge) ,assumptions.maxAnnualPensionContribution);
            } else {
                currentAnnualContribution = Math.min(currentAnnualContribution + annualAdditionalContribution  ,assumptions.maxAnnualPensionContribution);
            }
            
            //annualAdditionalContribution *= (1 + inflation);
        }

         // Apply step-up in ISA contributions
         if (age === userData.stepUpAgeISA && userData.stepUpAgeISA > 0 && userData.stepUpContributionISA > 0) {
            if (userData.inflationLinkedISAContributions) {
                annualISAContribution = Math.min(annualISAContribution + userData.stepUpContributionISA * 12 * Math.pow(1 + inflation, age - currentAge),assumptions.maxAnnualISAContribution);
            } else {
                annualISAContribution = Math.min(annualISAContribution + userData.stepUpContributionISA * 12 ,assumptions.maxAnnualISAContribution);
            }
            
            //annualISAContribution *= (1 + inflation);
        }

        var openingBalance = fund;
        var ISAOpeningBalance = ISA;

        // Determine investment gain, applying negative growth rate if at marketCrashAge
        var effectiveGrowthRate = fundGrowthPre;
        var effectiveISAGrowthRate = isaGrowth;
        
        if (age === marketCrashAge) {
            effectiveGrowthRate = -marketCrashPercent / 100; // Apply market crash as negative growth rate
            effectiveISAGrowthRate = -marketCrashPercent / 100;
        } 

        // Calculate investment gain with adjusted growth rate
        var investmentGain = fund * effectiveGrowthRate;
        var fundChargesTaken = fund * fundCharges;
        fund = fund + investmentGain + currentAnnualContribution - fundChargesTaken;

        totalFundCharges += fundChargesTaken; // Accumulate total fund charges

        // ISA Growth (now applying fund charges to ISA)
        var ISAGain = ISA * effectiveISAGrowthRate; // Apply same growth rate to ISA
        var isaChargesTaken = ISA * isaCharges; // Calculate ISA charges
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
            taxFreePortion: 0,
            investmentReturn: investmentGain,
            fundCharges: fundChargesTaken,
            isaCharges: isaChargesTaken, // Added ISA charges
            ISAGain: ISAGain,
            closingBalance: fund,
            ISAOpeningBalance: ISAOpeningBalance,
            ISAholdings: ISA,
            ISAContribution: annualISAContribution,
            ISADrawings: 0,
            annuityGross: 0,
            annuityTax: 0,  
            annuityNet: 0,   
            shortfall: 0,
            desiredIncome: 0,
            totalIncome: 0,
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
            taxFreePortion: 0,
            investmentReturn: parseFloat((cashFlowItem.investmentReturn * discountFactor).toFixed(2)),
            fundCharges: parseFloat((cashFlowItem.fundCharges * discountFactor).toFixed(2)),
            isaCharges: parseFloat((cashFlowItem.isaCharges * discountFactor).toFixed(2)), // Added ISA charges
            ISAGain: parseFloat((cashFlowItem.ISAGain * discountFactor).toFixed(2)), // Added ISA charges
            closingBalance: parseFloat((cashFlowItem.closingBalance * discountFactor).toFixed(2)),
            ISAOpeningBalance: parseFloat((cashFlowItem.ISAOpeningBalance * discountFactor).toFixed(2)),
            ISAholdings: parseFloat((cashFlowItem.ISAholdings * discountFactor).toFixed(2)),
            ISAContribution: annualISAContribution * discountFactor,
            ISADrawings: 0,     // Set to 0 as in cashFlowItem
            annuityGross: 0,
            annuityTax: 0,  
            annuityNet: 0,   
            shortfall: 0,         // Set to 0 as in cashFlowItem
            desiredIncome: 0,
            totalIncome: 0,
        };
        todaysMoneyCashFlowData.push(todaysMoneyCashFlowItem);

        // Adjust contributions for inflation
        if (userData.inflationLinkedContributions) {
            currentAnnualContribution = Math.min(currentAnnualContribution * (1 + inflation),assumptions.maxAnnualPensionContribution);
        } else {
            currentAnnualContribution = Math.min(currentAnnualContribution ,assumptions.maxAnnualPensionContribution);
        }
        
        if (userData.inflationLinkedISAContributions) {
            annualISAContribution = Math.min(annualISAContribution * (1 + inflation),assumptions.maxAnnualISAContribution);
        } else {
            annualISAContribution = Math.min(annualISAContribution ,assumptions.maxAnnualISAContribution);
        }
        
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
    partnerCalc,currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,isaGrowth, isaCharges ,
    inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
    earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation, todaysMoneyCashFlowDataAccumulation,
    taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent, netIncomeUpper, finalFund,baseWithdrawal,pensionPercentage
) {
    var tol = 10; // Tolerance for convergence
    var maxIter = 100;
    var iter = 0;

    var netIncomeLower = 0; // Lower bound of net income
   
    acceptableEndBalance = finalFund;

    var maxAffordableNetIncome = 0;
    var finalProjection = false;

    

    while (iter < maxIter) {
        maxAffordableNetIncome = (netIncomeLower + netIncomeUpper) / 2;

       /*  incomeStepAge1 = 75;
        incomeStepPercent1 = -0.1;
        incomeStepAge2 = 85;
        incomeStepPercent2 = -0.1; */
              
        var simulation = simulateCombinedFund(
            partnerCalc,currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,isaGrowth, isaCharges ,
            inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
            earliestPensionWithdrawalAge, maxAffordableNetIncome, statePensionInflation, cashFlowDataAccumulation, todaysMoneyCashFlowDataAccumulation,
            taxFreeCashPercent, 268275, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent, finalFund,baseWithdrawal,pensionPercentage
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
    partnerCalc,currentAge, retirementAge, alreadyRetired, endAge, fundAtRetirement, ISAAtRetirement,
    fundGrowthPost, fundCharges,isaGrowth, isaCharges , inflation, remainingTFCPercent,
    cumulativeTFC, statePensionAge, statePension, earliestPensionWithdrawalAge,
    targetNetIncome, statePensionInflation, cashFlowDataAccumulation, todaysMoneyCashFlowDataAccumulation,
    taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge,
    dbPensionEscalation, minISABalance, useScottishTax, finalProjection,
    maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent,
    finalFund,baseWithdrawal,pensionPercentage
    
) {

    if (partnerCalc) {
        var userData = getPartnerData(); 
    } else {
        var userData = getUserData();
    }

    // Get assumptions
    const assumptions = getAssumptions();

    var cashFlowData = [...cashFlowDataAccumulation];
    var todaysMoneyCashFlowData = [...todaysMoneyCashFlowDataAccumulation];
    var ageWhenTFCMaxed = null;
    var statePensionInPayment = 0;
    var dbPensionInPayment = 0;
    var maxAge = endAge; 
    if (finalProjection) {
        maxAge = endAge + 1;
    } 
    var startAge = Math.max(currentAge, retirementAge);
    const useCashISA =  (localStorage.getItem('showCashISASavings') === 'true');

    var annuityAge = userData.annuityAge;
    var fundConversionRate = userData.fundConversionRate;

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
    var annuityConvertedAmount = 0;
    var annuityConverted = false;
    var annuityGross = 0;
    var annuityTax = 0;
    var annuityNet = 0;
    var taxFreeCashTaken = 0;

    for (var age = startAge; age <= maxAge; age++) {
        var openingFundBalance = fund;
        var ISAOpeningBalance = ISA;
        var expectedTFC = 0;
        
        

       

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

        // Adjust annuity amount
        if (age >= annuityAge && annuityConverted) {
            annuityGross = annuityGross * (1 + inflation);
        }

        // Calculate inflation adjusted values
        var inflationAdjustedTargetNetIncome = targetNetIncome * Math.pow(1 + inflation, Math.max(0, age - retirementAge));
        var inflationAdjustedTargetGrossIncome = calculateGrossWithdrawalForNetWithdrawal(inflationAdjustedTargetNetIncome,statePensionInPayment,dbPensionInPayment,annuityGross,age,inflation,useScottishTax,currentAge,remainingTFCPercent,cumulativeTFC,maxTFCAmount) ;

        /* inflationSurgeAge = 75;
        inflationSurgeLength = 2;
        inflationSurgePerecent = 0.07;

        if (age == retirementAge) {
            var inflationAdjustedTargetNetIncome = targetNetIncome;
        } else if (age >= inflationSurgeAge && age < inflationSurgeAge + inflationSurgeLength) {
            inflationAdjustedTargetNetIncome = inflationAdjustedTargetNetIncome * (1 + inflation + inflationSurgePerecent) ;
        } else {
            inflationAdjustedTargetNetIncome = inflationAdjustedTargetNetIncome * (1 + inflation);
        }
       
        function getInflation(age) {
            if (age >= inflationSurgeAge && age < inflationSurgeAge + inflationSurgeLength) {
                inflation = (1 + getAssumptions().inflation + getAssumptions().inflationSurgePerecent) ;
            } else {
                inflationAdjustedTargetNetIncome = inflationAdjustedTargetNetIncome * (1 + inflation);
            }
        } */
        
        
        // Apply income steps
        if (age >= userData.incomeStepAge1) {
            inflationAdjustedTargetNetIncome = inflationAdjustedTargetNetIncome * (1+userData.incomeStepPercent1);
        }

        if (age >= userData.incomeStepAge2) {
            inflationAdjustedTargetNetIncome = inflationAdjustedTargetNetIncome * (1+userData.incomeStepPercent2);
        }


        var inflationAdjustedDesiredIncome = desiredAnnualIncome * Math.pow(1 + inflation, Math.max(0,age - retirementAge));

        // Net off any guaranteed pension payments    
        var netIncomeNeededFromInvestments = Math.max(0, inflationAdjustedTargetNetIncome - statePensionInPayment - dbPensionInPayment - annuityNet);

        var netPensionWithdrawal = 0;
        var grossPensionWithdrawal = 0;
        var taxPaidOnDCPension = 0;
        var taxSaved = 0;
        var ISADrawings = 0;
        var yearsToReduceISAGrowthBy = 0; // For reducing ISA growth rate to reflect additional tax on ISA withdrawals which is an approximation to explicitly modelling taxable savings

        // TFC Processing
        if (age == earliestPensionWithdrawalAge && fund > 0) {
            expectedTFC = fund * taxFreeCashPercent;
            taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount - cumulativeTFC);
            TFCHasBeenTaken = true;
            if (!alreadyRetired) {
                fund -= taxFreeCashTaken;
            }
        }

        if (age == retirementAge && fund > 0 && !TFCHasBeenTaken) {
            expectedTFC = fund * taxFreeCashPercent;
            taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount - cumulativeTFC);
            cumulativeTFC += taxFreeCashTaken;
            TFCHasBeenTaken = true;
            if (!alreadyRetired) {
                fund -= taxFreeCashTaken;
            }
        }

        if (alreadyRetired && age == startAge) {
            //If already retired assume the TFC has just been taken, so the current fund is grossed up to the pre TFC amount before (up to) 25% is taken
            taxFreeCashTaken = taxFreeCashPercent * fund / (1 - taxFreeCashPercent);
            TFCHasBeenTaken = true;
        }

        
        

        remainingTFCPercent = Math.max(0, maxTFCPercent - taxFreeCashPercent);
        if (taxFreeCashTaken == maxTFCAmount) {
            remainingTFCPercent = 0;
        }

        yearsToReduceISAGrowthBy = Math.max(0, yearsToReduceISAGrowthBy - 1);

         // --- Annuity Conversion ---
         if (fundConversionRate > 0 && age === annuityAge && !annuityConverted && openingFundBalance > 0) {
            annuityConvertedAmount = openingFundBalance * fundConversionRate;
            fund = fund - annuityConvertedAmount;

            var tfcTakenOnConversion = annuityConvertedAmount * remainingTFCPercent;
            annuityConvertedAmount = annuityConvertedAmount - tfcTakenOnConversion;
            ISA = ISA + tfcTakenOnConversion; 
            if (tfcTakenOnConversion > assumptions.maxAnnualISAContribution) {
                yearsToReduceISAGrowthBy = Math.round(tfcTakenOnConversion / assumptions.maxAnnualISAContribution);
            }
            annuityConverted = true;
        }

        if (yearsToReduceISAGrowthBy > 0) {
            isaGrowth = isaGrowth * (ISA + tfcTakenOnConversion * 0.8)/(ISA + tfcTakenOnConversion); 
            tfcTakenOnConversion = tfcTakenOnConversion - assumptions.maxAnnualISAContribution;
        }

        if (age == annuityAge && annuityConverted) {
            annuityGross = calculateAnnuity(age, annuityConvertedAmount, inflation);
            
        }

        // Determine effective growth rate, applying market crash if applicable
        var effectiveGrowthRate = fundGrowthPost;
        var effectiveISAGrowthRate = isaGrowth;
        if (age === marketCrashAge) {
            effectiveGrowthRate = -marketCrashPercent / 100; // Apply market crash as negative growth rate
            if(!useCashISA) {
                effectiveISAGrowthRate = -marketCrashPercent / 100;
            }
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
        var iterationLimit = 200;
        /* var tolerance = finalProjection && age == startAge ? 0.4 : 10; */
        var tolerance = finalProjection && age == startAge ? 10 : 10;

        var fundExhausted = false;
        var ISAExhausted = false;

        // Set guess limits
        var lowerGuess = 0;
        if (finalProjection) {
            var upperGuess = inflationAdjustedTargetGrossIncome;
        } else {
            var upperGuess = maxAvailableWithdrawal;
        }
        
   
        if (age >= earliestPensionWithdrawalAge) {
            // First use up any remaining personal allowance, plus TFC% to calculate base gross pension withdrawal
            var adjustedPersonalAllowance = calcPersonalAllowance(age, currentAge, inflation);
            var maxTaxablePensionWithdrawal = adjustedPersonalAllowance - statePensionInPayment - dbPensionInPayment - annuityGross;
            maxTaxablePensionWithdrawal = Math.max(maxTaxablePensionWithdrawal, 0);
            var maxGrossPensionWithdrawal = maxTaxablePensionWithdrawal / (1 - remainingTFCPercent);
            grossPensionWithdrawal = Math.min( maxGrossPensionWithdrawal, netIncomeNeededFromInvestments / (1 - remainingTFCPercent), maxAvailableWithdrawal);


            // Withdrawal Strategy Inputs
            //var baseWithdrawal = grossPensionWithdrawal;
            var baseWithdrawal = userData.baseWithdrawal;
            baseWithdrawal = baseWithdrawal * Math.pow(1 + inflation, Math.max(0,age - currentAge));
            

            // Then use up to a user input amount

            var pensionPercentage = userData.pensionPercentage;
            var grossIncomeNeededFromInvestments = calculateGrossWithdrawalForNetWithdrawal(netIncomeNeededFromInvestments,statePensionInPayment,dbPensionInPayment,annuityGross,age,inflation,useScottishTax,currentAge,remainingTFCPercent,cumulativeTFC,maxTFCAmount) ;
            var userExtraPensionWithdrawal = pensionPercentage * grossIncomeNeededFromInvestments;// * Math.pow(1 + inflation, Math.max(0, age - retirementAge));
            grossPensionWithdrawal = Math.min( baseWithdrawal + userExtraPensionWithdrawal, maxAvailableWithdrawal);

            // Check it is within the limits and truncate if necessary
            grossPensionWithdrawal = Math.min(
                Math.max(grossPensionWithdrawal, lowerGuess),
                upperGuess
            );
        } else {
            grossPensionWithdrawal = 0;
        }

        let taxCalc;

        // Start of the main loop of gross pension withdrawal calculation
        while (iterations < iterationLimit) {

            // Ensure we don't withdraw more than the fund allows
            if (grossPensionWithdrawal >= maxAvailableWithdrawal) {
                grossPensionWithdrawal = maxAvailableWithdrawal;
                fundExhausted = true;
            }

            // In the final year, adjust withdrawal to meet net income need
            if (age === maxAge && !fundExhausted) {
                // Withdraw whatever is needed up to the fund balance
                grossPensionWithdrawal = Math.min(previousGrossPensionWithdrawal * (1 + inflation), maxAvailableWithdrawal);
                fundExhausted = true; // Since it's the last year
            }

            // Calculate tax-free portion
            if (age < earliestPensionWithdrawalAge || cumulativeTFC >= maxTFCAmount) {
                var taxFreePortion = 0;
                remainingTFCPercent = 0;
            } else {
                var taxFreePortion = grossPensionWithdrawal * remainingTFCPercent;

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
                taxablePortion + statePensionInPayment + dbPensionInPayment + annuityGross;

            // Calculate tax
            taxCalc = calculateNetIncome(
                grossPensionWithdrawal,
                statePensionInPayment,
                dbPensionInPayment,
                annuityGross,
                totalTaxableIncome,
                age,
                inflation,
                useScottishTax,
                currentAge
            );

            netPensionWithdrawal = taxCalc.netPensionWithdrawal;
            var statePensionAfterTax = taxCalc.statePensionAfterTax;
            var dbPensionAfterTax = taxCalc.dbPensionAfterTax;
            var annuityNet = taxCalc.annuityNet;
            taxPaidOnDCPension = taxCalc.taxPaidOnDCPension;
            var statePensionTax = taxCalc.statePensionTax;
            var dbPensionTax = taxCalc.dbPensionTax;
            var annuityTax = taxCalc.annuityTax;


            // Use ISA withdrawals to cover any shortfall
            var otherNetPensions = statePensionAfterTax + dbPensionAfterTax + annuityNet;
            netIncomeNeededFromInvestments = Math.max(0,inflationAdjustedTargetNetIncome - netPensionWithdrawal - otherNetPensions);
            
           
            var maxAvailableISADrawings = ISA - minISABalance;
            maxAvailableISADrawings = Math.max(maxAvailableISADrawings, 0);

            var ISAShare = 1;

            ISADrawings = Math.min(ISAShare * netIncomeNeededFromInvestments, maxAvailableISADrawings);
            //netIncomeNeededFromInvestments = netIncomeNeededFromInvestments - ISADrawings; //(This causes problems when there is a minISABalance)

            if (ISADrawings >= maxAvailableISADrawings) {
                ISAExhausted = true;
            }

            // If ISA is exhausted and still shortfall, increase pension withdrawals
            if (netIncomeNeededFromInvestments > maxAvailableISADrawings && !fundExhausted) {
                lowerGuess = grossPensionWithdrawal;
                
                var grossIncomeNeededFromInvestments = calculateGrossWithdrawalForNetWithdrawal(netIncomeNeededFromInvestments,statePensionInPayment,dbPensionInPayment,annuityGross,age,inflation,useScottishTax,currentAge,remainingTFCPercent,cumulativeTFC,maxTFCAmount) ;
                

                upperGuess = Math.min(maxAvailableWithdrawal,grossIncomeNeededFromInvestments);
                upperGuess = maxAvailableWithdrawal;

                var isaExhausedIterations = 0;
                // Second Inner Loop to allow for ISA exhaustion
                while (isaExhausedIterations < iterationLimit) {
                    if (age < earliestPensionWithdrawalAge) {
                        grossPensionWithdrawal = 0;
                    } else {
                        grossPensionWithdrawal = (lowerGuess + upperGuess) / 2;
                    }

                    // Ensure grossPensionWithdrawal does not exceed maxAvailableWithdrawal
                    grossPensionWithdrawal = Math.min(grossPensionWithdrawal, maxAvailableWithdrawal);

                    // **In the final year, adjust withdrawal to meet net income need**
                    if (age === maxAge && !fundExhausted) {
                        grossPensionWithdrawal = Math.min(netIncomeNeededFromInvestments / (1 - remainingTFCPercent), maxAvailableWithdrawal );
                        grossPensionWithdrawal = Math.min( calculateGrossWithdrawalForNetWithdrawal(netIncomeNeededFromInvestments)/ (1 - remainingTFCPercent), maxAvailableWithdrawal );
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

                    taxCalc = calculateNetIncome(
                        grossPensionWithdrawal,
                        statePensionInPayment,
                        dbPensionInPayment,
                        annuityGross,
                        totalTaxableIncome,
                        age,
                        inflation,
                        useScottishTax,
                        currentAge
                    );

                    netPensionWithdrawal = taxCalc.netPensionWithdrawal;
                    statePensionAfterTax = taxCalc.statePensionAfterTax;
                    dbPensionAfterTax = taxCalc.dbPensionAfterTax;
                    annuityNet = taxCalc.annuityNet;
                    taxPaidOnDCPension = taxCalc.taxPaidOnDCPension;
                    statePensionTax = taxCalc.statePensionTax;
                    dbPensionTax = taxCalc.dbPensionTax;
                    annuityTax = taxCalc.annuityTax;

                    otherNetPensions = statePensionAfterTax + dbPensionAfterTax + annuityNet;

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

                    isaExhausedIterations++;

                    if (grossPensionWithdrawal >= maxAvailableWithdrawal) {
                        grossPensionWithdrawal = maxAvailableWithdrawal;
                        fundExhausted = true;
                    }
                } // End of isaExhausedIterations loop

            } else {
                totalNetIncome =
                    netPensionWithdrawal + otherNetPensions + ISADrawings;

                var shortfall = totalNetIncome - inflationAdjustedTargetNetIncome;

                if (Math.abs(shortfall) < tolerance) {
                    cumulativeTFC += taxFreePortion;
                    break;
                }
            }

            if (Math.abs(shortfall) < tolerance) {
                
                break;
            }

            cumulativeTFC += taxFreePortion;
            iterations++;

            if (fundExhausted && ISAExhausted) {
                break;
            }

            // End of gross withdrawal calculation loop
        }

        // Adjust fund balance after withdrawals
        fund -= grossPensionWithdrawal;

        // Ensure fund doesn't fall below finalFund
        fund = Math.max(fund, finalFund);

        // ISA Growth
        var ISAGain = ISA * effectiveISAGrowthRate;
        var isaChargesTaken = ISA * isaCharges; // Calculate ISA charges
        ISA = ISA + ISAGain - ISADrawings - isaChargesTaken;
        ISA = Math.max(ISA, 0);

        taxSaved = taxFreePortion;

      

        var finalShortfall = inflationAdjustedDesiredIncome -
                netPensionWithdrawal -
                (statePensionInPayment - statePensionTax) -
                (dbPensionInPayment - dbPensionTax) -
                (annuityGross - annuityTax) -
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
                taxFreePortion: taxFreePortion,
                investmentReturn: investmentGain || 0,
                fundCharges: fundChargesTaken || 0,
                isaCharges: isaChargesTaken,
                ISAGain: ISAGain,
                closingBalance: fund,
                ISAOpeningBalance: ISAOpeningBalance,
                ISAholdings: ISA,
                ISAContribution: 0,
                ISADrawings: ISADrawings,
                annuityGross: annuityGross,
                annuityTax: annuityTax,  
                annuityNet: annuityNet,   
                shortfall: finalShortfall,
                desiredIncome : inflationAdjustedDesiredIncome,
                totalIncome: netPensionWithdrawal + ISADrawings + statePensionInPayment - statePensionTax + dbPensionInPayment - dbPensionTax + annuityGross - annuityTax,
                bandTaxBreakdown: taxCalc.bandTaxBreakdown
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
                taxFreePortion: taxFreePortion * discountFactor,
                investmentReturn: (investmentGain || 0) * discountFactor,
                fundCharges: (fundChargesTaken || 0) * discountFactor,
                isaCharges: (isaChargesTaken || 0) * discountFactor,
                ISAGain: (ISAGain || 0) * discountFactor,
                closingBalance: fund * discountFactor,
                ISAOpeningBalance: ISAOpeningBalance * discountFactor,
                ISAholdings: ISA * discountFactor,
                ISAContribution: 0,
                ISADrawings: ISADrawings * discountFactor,
                annuityGross: annuityGross * discountFactor,
                annuityTax: annuityTax * discountFactor,  
                annuityNet: annuityNet * discountFactor,  
                shortfall: finalShortfall * discountFactor,
                desiredIncome: inflationAdjustedDesiredIncome * discountFactor,
                totalIncome: discountFactor * (netPensionWithdrawal + ISADrawings + statePensionInPayment - statePensionTax + dbPensionInPayment - dbPensionTax + annuityGross - annuityTax) ,
                bandTaxBreakdown: taxCalc.bandTaxBreakdown.map(value => value * discountFactor)
            });
        }

        previousGrossPensionWithdrawal = grossPensionWithdrawal;

        if ( //Funds depeleted
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
        taxFreeCashTaken: taxFreeCashTaken
        
    };
}











function calculateNetIncome(
    grossPensionWithdrawal,
    statePensionInPayment,
    dbPensionInPayment,
    annuityGross,
    totalTaxableIncome,  // Already includes annuityGross
    age,                 // Age of the user in the simulation year
    inflation,
    useScottishTax,
    currentAge           // User's actual current age
) {
    // 1. Calculate tax on the state pension to use the personal allowance first.
    const statePensionTaxResult = calculateIncomeTax(
        statePensionInPayment,
        age,
        inflation,
        useScottishTax,
        currentAge
    );

    // 2. Calculate combined tax on state and DB pensions.
    const stateAndDBIncome = statePensionInPayment + dbPensionInPayment;
    const stateAndDBTaxResult = calculateIncomeTax(
        stateAndDBIncome,
        age,
        inflation,
        useScottishTax,
        currentAge
    );
    var dbPensionTax = Math.max(stateAndDBTaxResult.incomeTax - statePensionTaxResult.incomeTax, 0);

    // 3. Calculate combined tax on state, DB pensions and annuity payments.
    const stateAndDBAndAnnuityIncome = statePensionInPayment + dbPensionInPayment + annuityGross;
    const stateAndDBAndAnnuityTaxResult = calculateIncomeTax(
        stateAndDBAndAnnuityIncome,
        age,
        inflation,
        useScottishTax,
        currentAge
    );
    var annuityTax = Math.max(stateAndDBAndAnnuityTaxResult.incomeTax - stateAndDBTaxResult.incomeTax, 0);

    // 4. Calculate tax on the full income (base layers + annuity + DCPension)
    const totalTaxResult = calculateIncomeTax(
        totalTaxableIncome,
        age,
        inflation,
        useScottishTax,
        currentAge
    );
    var taxPaidOnDCPension = totalTaxResult.incomeTax - stateAndDBAndAnnuityTaxResult.incomeTax;
    taxPaidOnDCPension = Math.max(taxPaidOnDCPension, 0);

    // 5. Compute net amounts.
    const netPensionWithdrawal = Math.max(0, grossPensionWithdrawal - taxPaidOnDCPension);
    const statePensionAfterTax = Math.max(0, statePensionInPayment - statePensionTaxResult.incomeTax);
    const dbPensionAfterTax = Math.max(0, dbPensionInPayment - dbPensionTax);
    const annuityNet = Math.max(0, annuityGross - annuityTax);

    return {
        netPensionWithdrawal: netPensionWithdrawal,
        statePensionAfterTax: statePensionAfterTax,
        dbPensionAfterTax: dbPensionAfterTax,
        annuityNet: annuityNet,
        annuityTax: annuityTax,
        taxPaidOnDCPension: taxPaidOnDCPension,
        statePensionTax: statePensionTaxResult.incomeTax,
        dbPensionTax: dbPensionTax,
        // Return the overall tax breakdown by tax band from the total taxable income.
        bandTaxBreakdown: totalTaxResult.bandTaxes
    };
}



function calculateIncomeTax(income, age, indexationRate, useScottishTax, currentAge, includeNI = false) {
    // Determine the tax year based on the current age and the age at the time
    var currentYear = new Date().getFullYear();
    var taxYear = currentYear + (age - currentAge);
    var yearsSince2028 = taxYear - 2028 + 1; // +1 to include 2028
    var indexationFactor = Math.pow(1 + indexationRate, yearsSince2028);

    // Base tax bands and rates for 2023/24
    var personalAllowance = calcPersonalAllowance(age, currentAge, indexationRate);
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
    var taxableIncomeRemaining = Math.max(0, totalIncome - adjustedPersonalAllowance);

    // Calculate income tax using the tax bands and build a breakdown per band
    var totalTax = 0;
    var bandTaxes = [];
    var previousThreshold = adjustedPersonalAllowance;
    
    for (var i = 1; i < taxBands.length; i++) {
        var bandLimit = taxBands[i].threshold;
        var bandRate = taxBands[i].rate;
        var incomeInBand = taxableIncomeRemaining > 0 ? Math.min(taxableIncomeRemaining, bandLimit - previousThreshold) : 0;
        var bandTax = incomeInBand * bandRate;
        
        bandTaxes.push({
            lowerBound: previousThreshold,
            upperBound: bandLimit,
            taxableAmount: incomeInBand,
            rate: bandRate,
            tax: bandTax
        });
        
        totalTax += bandTax;
        taxableIncomeRemaining -= incomeInBand;
        previousThreshold = bandLimit;
    }

    // Prepare the result object with tax and the breakdown per band.
    var result = {
        incomeTax: totalTax,
        bandTaxes: bandTaxes
    };

    // If includeNI is true, calculate employee National Insurance contributions.
    if (includeNI) {
        // Base NI thresholds and rates (current thresholds):
        // Primary Threshold (PT): £12,570 per year
        // Upper Earnings Limit (UEL): £50,270 per year
        // Lower Earnings Limit (LEL): £6,500 per year (for context; no contributions below this)
        var basePrimaryThreshold = 12570;
        var baseUpperEarningsLimit = 50270;
        var baseLowerEarningsLimit = 6500;
        
        // Apply indexation to NI thresholds if taxYear is 2028 or later.
        var primaryThreshold = basePrimaryThreshold;
        var upperEarningsLimit = baseUpperEarningsLimit;
        var lowerEarningsLimit = baseLowerEarningsLimit;
        if (taxYear >= 2028) {
            primaryThreshold *= indexationFactor;
            upperEarningsLimit *= indexationFactor;
            lowerEarningsLimit *= indexationFactor;
        }

        let ni = 0;
        if (income > primaryThreshold) {
            // Earnings between the Primary Threshold and the Upper Earnings Limit are charged at 8%
            let earningsForNI = Math.min(income, upperEarningsLimit) - primaryThreshold;
            ni = earningsForNI * 0.08;
            // Earnings above the Upper Earnings Limit are charged at 2%
            if (income > upperEarningsLimit) {
                ni += (income - upperEarningsLimit) * 0.02;
            }
        }
        result.nationalInsurance = ni;
        result.totalDeduction = totalTax + ni;
    }

    return result;
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



function calculateGrossWithdrawalForNetWithdrawal(targetNetWithdrawal,statePensionInPayment,dbPensionInPayment,annuityGross,age,inflation,useScottishTax,currentAge,remainingTFCPercent,cumulativeTFC,maxTFCAmount) {
     // Set up the binary search boundaries.
  let lowerGuess = 0;
  // Start with an upper bound that is twice the net target.
  let upperGuess = targetNetWithdrawal * 1.6;
  const tolerance = 0.01; // Acceptable difference (in net amount)
  let iterations = 0;
  const iterationLimit = 100;
  let grossWithdrawal = 0;
  let netWithdrawal = 0;

  while (iterations < iterationLimit) {
    // Guess the gross withdrawal as the midpoint between lower and upper bounds.
    grossWithdrawal = (lowerGuess + upperGuess) / 2;

    // Calculate the tax-free portion.
    let taxFreePortion = 0;
    if (cumulativeTFC < maxTFCAmount) {
      taxFreePortion = grossWithdrawal * remainingTFCPercent;
      // Do not exceed the overall TFC limit.
      if (cumulativeTFC + taxFreePortion > maxTFCAmount) {
        taxFreePortion = maxTFCAmount - cumulativeTFC;
      }
    }

    // Compute the taxable portion.
    const taxablePortion = grossWithdrawal - taxFreePortion;
    const totalTaxableIncome = taxablePortion + statePensionInPayment + dbPensionInPayment;

    // Use your tax calculation function to compute the net withdrawal.
    const taxCalc = calculateNetIncome(
      grossWithdrawal,
      statePensionInPayment,
      dbPensionInPayment,
      annuityGross,
      totalTaxableIncome,
      age,
      inflation,
      useScottishTax,
      currentAge
    );
    netWithdrawal = taxCalc.netPensionWithdrawal;

    // Determine how far off we are from the target net withdrawal.
    const difference = netWithdrawal - targetNetWithdrawal;

    // If we're within the tolerance, we're done.
    if (Math.abs(difference) < tolerance) {
      break;
    }

    // Adjust the binary search bounds.
    if (difference < 0) {
      // Our net withdrawal is too low; we need a higher gross withdrawal.
      lowerGuess = grossWithdrawal;
    } else {
      // Our net withdrawal is too high; lower the gross withdrawal.
      upperGuess = grossWithdrawal;
    }

    iterations++;
  }

  return grossWithdrawal;
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
            taxFreePortion: item.taxFreePortion + item2.taxFreePortion,
            investmentReturn: item.investmentReturn + item2.investmentReturn,
            fundCharges: item.fundCharges + item2.fundCharges,
            isaCharges: item.isaCharges + item2.isaCharges,
            ISAGain: item.ISAGain + item2.ISAGain,
            closingBalance: item.closingBalance + item2.closingBalance,
            ISAOpeningBalance: item.ISAOpeningBalance + item2.ISAOpeningBalance,
            ISAholdings: item.ISAholdings + item2.ISAholdings,
            ISAContribution: item.ISAContribution + item2.ISAContribution,
            ISADrawings: item.ISADrawings + item2.ISADrawings,
            annuityGross: item.annuityGross + item2.annuityGross,
            annuityTax: item.annuityTax + item2.annuityTax,  
            annuityNet: item.annuityNet + item2.annuityNet,   
            shortfall: item.shortfall + item2.shortfall,
            desiredIncome: item.desiredIncome,
            totalIncome: item.totalIncome + item2.totalIncome 
        };
    });
}




function calculateAnnuity(
    age,
    amountOfFundConverted,
    inflationRate
    
) {

    
    const discountMargin = 0.005;      // Expense and profit loading.
    const interestPremiumAssumption = 0.01; // Margin for discount rate in excess of inflation rate.
    const percentFundLoading = 0.015;   // Expense and profit loading.
    const paymentInAdvance = true;
    const increaseWithInflation = true;
    const reversionaryPercentage = 0;
    const partnerAge = 75;

    const mortalityTable = [
        {"age": 55, "qx": 0.004656},
        {"age": 56, "qx": 0.005063},
        {"age": 57, "qx": 0.005504},
        {"age": 58, "qx": 0.005977},
        {"age": 59, "qx": 0.006480},
        {"age": 60, "qx": 0.007023},
        {"age": 61, "qx": 0.007612},
        {"age": 62, "qx": 0.008257},
        {"age": 63, "qx": 0.008968},
        {"age": 64, "qx": 0.009753},
        {"age": 65, "qx": 0.010628},
        {"age": 66, "qx": 0.011611},
        {"age": 67, "qx": 0.012715},
        {"age": 68, "qx": 0.013948},
        {"age": 69, "qx": 0.015327},
        {"age": 70, "qx": 0.016864},
        {"age": 71, "qx": 0.018555},
        {"age": 72, "qx": 0.020389},
        {"age": 73, "qx": 0.022353},
        {"age": 74, "qx": 0.024455},
        {"age": 75, "qx": 0.026745},
        {"age": 76, "qx": 0.029326},
        {"age": 77, "qx": 0.032343},
        {"age": 78, "qx": 0.035968},
        {"age": 79, "qx": 0.040343},
        {"age": 80, "qx": 0.045553},
        {"age": 81, "qx": 0.051639},
        {"age": 82, "qx": 0.058613},
        {"age": 83, "qx": 0.066430},
        {"age": 84, "qx": 0.075009},
        {"age": 85, "qx": 0.084304},
        {"age": 86, "qx": 0.094408},
        {"age": 87, "qx": 0.105589},
        {"age": 88, "qx": 0.118213},
        {"age": 89, "qx": 0.132584},
        {"age": 90, "qx": 0.149107},
        {"age": 91, "qx": 0.167952},
        {"age": 92, "qx": 0.188406},
        {"age": 93, "qx": 0.210592},
        {"age": 94, "qx": 0.235487},
        {"age": 95, "qx": 0.262651},
        {"age": 96, "qx": 0.291051},
        {"age": 97, "qx": 0.320251},
        {"age": 98, "qx": 0.349611},
        {"age": 99, "qx": 0.378469},
        {"age": 100, "qx": 0.406955}
    ];

    
    // Calculate the effective discount rate.
    let discountRate = inflationRate + interestPremiumAssumption;
    let effectiveDiscountRate = discountRate + discountMargin;
    let v = 1 / (1 + effectiveDiscountRate);
    let g = increaseWithInflation ? (1 + inflationRate) : 1;
    let annuityFactor = 0;
    let survivalProbability = 1;
    let partnerSurvivalProbability = 1;
    let partnerOffset = partnerAge - age;

    // Loop through the mortality table (assumed sorted by age).
    for (let i = 0; i < mortalityTable.length; i++) {
        let entry = mortalityTable[i];
        if (entry.age < age) continue; // Skip ages before the purchase age
        
        let t = entry.age - age; // Years elapsed since annuity purchase
        let paymentFactor = increaseWithInflation ? Math.pow(g, t) : 1;
        
        // Add the primary annuitant's discounted, inflation-adjusted payment.
        annuityFactor += survivalProbability * Math.pow(v, t) * paymentFactor;
        
        // For joint-life (reversionary) payments, update partner survival probability.
        if (partnerOffset !== 0) {
            let partnerEntry = mortalityTable.find(e => e.age === entry.age + partnerOffset);
            if (partnerEntry) {
                partnerSurvivalProbability *= (1 - partnerEntry.qx);
            }
        }
        
        // Add reversionary payment contribution if applicable.
        let reversionaryPayment = survivalProbability * (1 - entry.qx) * reversionaryPercentage;
        annuityFactor += reversionaryPayment * partnerSurvivalProbability * Math.pow(v, t) * paymentFactor;
        
        // Update the primary annuitant's survival probability.
        survivalProbability *= (1 - entry.qx);
        
        // Exit the loop if both survival probabilities have essentially dropped to zero.
        if (survivalProbability <= 0 && partnerSurvivalProbability <= 0) break;
    }

    // Adjust the annuity factor if payments are in advance.
    if (paymentInAdvance) {
        annuityFactor *= (1 + effectiveDiscountRate);
    }

    // Calculate the pure annual annuity payment.
    let pureAnnualAnnuity = amountOfFundConverted / annuityFactor;
    
    // Apply the percentage loading on the fund.
    let loadedAnnualAnnuity = pureAnnualAnnuity - (percentFundLoading * amountOfFundConverted);
    
    return loadedAnnualAnnuity;
}


// Redundant
function redistributePension(cashFlowData1,cashFlowData2,combineCashFlowData,todaysMoneyCashFlowData1,todaysMoneyCashFlowData2,combinedTodaysMoneyCashFlowData) {
    
    // Get user data
    var userData = getUserData();

    // Get partner data
    var partnerData = getPartnerData(userData.currentAge,userData.retirementAge);

    // Get assumptions
    const assumptions = getAssumptions();

    // Set tolerance for redistribution
    const tolerance = 1;
    const maxIterations = 100;  // Safety guard to avoid infinite loops
    let iterationCount = 0;
    var stepUpIsIncome1 = false;
    var stepUpIsIncome2 = false;

    let difference = Infinity;  // Initialize difference so the loop can start
  
    // Figure out which partner has the step ()
    const minMax1 = minMaxCashflow(todaysMoneyCashFlowData1,userData.retirementAge) ;
    if (minMax1.maxIncome - minMax1.minIncome > 10) {
        stepUpIsIncome1 = true;
        var todaysMoneyCashFlowDataInNeed = todaysMoneyCashFlowData1;
        var todaysMoneyCashFlowDataDonor = todaysMoneyCashFlowData2;
        var retirementAge = userData.retirementAge;
        var currentAge = userData.currentAge;
    }

    const minMax2 = minMaxCashflow(todaysMoneyCashFlowData2,partnerData.retirementAge) ;
    if (minMax2.maxIncome - minMax2.minIncome > 10) {
        stepUpIsIncome2 = true;
        var todaysMoneyCashFlowDataInNeed = todaysMoneyCashFlowData2;
        var todaysMoneyCashFlowDataDonor = todaysMoneyCashFlowData1;
        var retirementAge = partnerData.retirementAge;
        var currentAge = partnerData.currentAge;
    }

    // Set the ages to be those from your retirement in order to match up later
    todaysMoneyCashFlowDataInNeed.forEach((entry, index) => {
        if (todaysMoneyCashFlowData1[index]) {
            entry.age = todaysMoneyCashFlowData1[index].age;
        }
    });

    if (stepUpIsIncome1  ||  stepUpIsIncome2) {
        
    

    //while (difference > tolerance && iterationCount < maxIterations) {

        //iterationCount++;

        const minMax = minMaxCashflow(todaysMoneyCashFlowDataInNeed,retirementAge) ;
        //difference = minMax.maxIncome - minMax.minIncome;

        // If we are already within tolerance, no need to redistribute further
        //if (difference <= tolerance) {
         //   break;
        //}

        // Pull all years the min down to the min and accumulate the surplus
        let totalSurplus = 0;

        /* todaysMoneyCashFlowDataInNeed.forEach(entry => {
            
            entry.redistributedOut = 0;
            entry.redistributedOut = 0;

            if (entry.age >= retirementAge) {
                
                if (entry.totalIncome > minMax.maxIncome) {
                    const differenceToMin = entry.totalIncome - minMax.maxIncome;
                    const surplusFromThisAge = Math.min(differenceToMin, entry.withdrawal);
                    entry.redistributedOut += surplusFromThisAge;
                    entry.redistributedOutValue = surplusFromThisAge;
                    totalSurplus = totalSurplus + surplusFromThisAge;
                    entry.totalIncome = entry.totalIncome - surplusFromThisAge;  
                } else {
                    entry.redistributedOutValue = 0;
                }
            }

        }); */

        
        const numAgesAboveRetirement = todaysMoneyCashFlowDataInNeed.filter(
            entry => entry.age > retirementAge
        ).length;

        // Level up to the highest guaranteed income figure
        highestGuaranteedIncome = Math.max(
            ...todaysMoneyCashFlowDataInNeed.map(
                (entry) => entry.dbPension + entry.statePension
            )
            );

        todaysMoneyCashFlowDataInNeed.forEach(entry => {
            entry.redistributedIn = 0;
            entry.redistributedIn = 0;
            
            if (entry.age >= retirementAge) {
                levelUpAmount = highestGuaranteedIncome - entry.totalIncome;
                entry.redistributedIn += levelUpAmount;
                entry.redistributedInValue = levelUpAmount;
                totalSurplus = totalSurplus + levelUpAmount;
                entry.totalIncome = entry.totalIncome + levelUpAmount;
            }
        });


        todaysMoneyCashFlowDataInNeed.forEach(entry => {
            // Initialize “donor” redistribution properties.
            entry.redistributedOut = 0;
            entry.redistributedOutValue = 0;
            
            const reduction = totalSurplus / numAgesAboveRetirement;
                
            entry.redistributedOut += reduction;
            entry.redistributedOutValue = reduction;
                          
          });


        /* const surplusShare = totalSurplus / numAgesAboveRetirement;
        todaysMoneyCashFlowData.forEach(entry => {
            
            if (entry.age >= retirementAge) {
                entry.totalIncome += surplusShare;
                entry.redistributedIn += surplusShare;
                entry.redistributedInValue = entry.redistributedInValue + surplusShare;
                
            }
        }); */

        /*  todaysMoneyCashFlowData.forEach(entry => {
            if (entry.age >= retirementAge) {
                entry.withdrawal = entry.withdrawal + entry.redistributedInValue - entry.redistributedOutValue;
                //entry.withdrawal = entry.withdrawal  + entry.redistributedInValue;
            }
            }); */
    //}

      
  
      var netIncomeAdjustmentsArray = todaysMoneyCashFlowDataInNeed
        .map(entry => ({
            age: entry.age,
            todaysMoneyNetIncomeAdjustment: (entry.redistributedInValue - entry.redistributedOutValue ) || 0 ,
            netIncomeAdjustment: (entry.redistributedInValue - entry.redistributedOutValue) * Math.pow(1 + assumptions.inflation, entry.age - currentAge) || 0
        }));

    } else {
        // Return an array with zeros but keeping the same age entries
        const referenceData = todaysMoneyCashFlowData1.length ? todaysMoneyCashFlowData1 : todaysMoneyCashFlowData2;

        var netIncomeAdjustmentsArray = referenceData
            .filter(entry => entry.age >= userData.retirementAge || entry.age >= partnerData.retirementAge)
            .map(entry => ({
                age: entry.age,
                todaysMoneyNetIncomeAdjustment: 0,
                netIncomeAdjustment: 0
            }));
    }
        return {
            netIncomeAdjustmentsArray,
            stepUpIsIncome1,
            stepUpIsIncome2
        };
  }
  
 // Redundant 
  function minMaxCashflow(cashFlowData, retirementAge) {
    // 1. Filter entries where age > retirementAge
    const filteredEntries = cashFlowData.filter(entry => entry.age > retirementAge);
  
    // 2. Handle empty array case
    if (filteredEntries.length === 0) {
      return { minIncome: null, maxIncome: null, ageMin: null, ageMax: null };
    }
  
    // 3. Initialize with the first entry
    let minIncome = filteredEntries[0].totalIncome;
    let maxIncome = filteredEntries[0].totalIncome;
    let ageMin = filteredEntries[0].age;
    let ageMax = filteredEntries[0].age;
  
    // 4. Loop through the filtered entries to find min, max, and their corresponding ages
    filteredEntries.forEach(entry => {
      if (entry.totalIncome < minIncome) {
        minIncome = entry.totalIncome;
        ageMin = entry.age;
      }
      if (entry.totalIncome > maxIncome) {
        maxIncome = entry.totalIncome;
        ageMax = entry.age;
      }
    });
  
    // 5. Return the results as an object
    return { minIncome, maxIncome, ageMin, ageMax };
  }

