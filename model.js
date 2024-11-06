//to Toggle Navbar on Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

/* hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
}); */

function checkFirstCalc() {
    if (firstCalc==false) {
        calculatePension();
    }
}


function calculatePension() {
            
    firstCalc = false;

    // Retrieve values from localStorage and parse as needed
    var currentAge = parseInt(localStorage.getItem("currentAge")) || 0;
    var retirementAge = parseInt(localStorage.getItem("retirementAge")) || 0;
    var currentFund = parseFloat(localStorage.getItem("currentFund")) || 0.0;
    var currentISA = parseFloat(localStorage.getItem("currentISA")) || 0.0;
    var dbPensionAmount = parseFloat(localStorage.getItem("dbPensionAmount")) || 0.0;
    var dbPensionAge = parseInt(localStorage.getItem("dbPensionAge")) || 0;
    
    var statePensionAge = getStatePensionAge(currentAge);
    
    //Get the rest from the default inputs in the calculator page
    var monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value) ; 
    var desiredIncome = parseInt(document.getElementById("desiredIncome").value) || 0;;
    var desiredAnnualIncome = 12 * desiredIncome;
    var monthlyISAContribution = parseFloat(document.getElementById("monthlyISAContribution").value) || 0.0;
    var taxFreeCashPercent = parseFloat(document.getElementById("taxFreeCashPercent").value)/100 || 0.00;

    var endAge = parseInt(document.getElementById("endAge").value);
    var stepUpAge = parseInt(document.getElementById("stepUpAge").value);
    var stepUpContribution = parseFloat(document.getElementById("stepUpContribution").value) ; 
    var minISABalance = parseFloat(document.getElementById("minISABalance").value) || 0;
    var finalFund = parseFloat(document.getElementById("finalFund").value) || 0;
    var useScottishTax = document.getElementById("useScottishTax").checked;
    var fundGrowthPre = parseFloat(document.getElementById("fundGrowthPre").value) / 100;
    var fundGrowthPost = parseFloat(document.getElementById("fundGrowthPost").value) / 100;
    var fundCharges = parseFloat(document.getElementById("fundCharges").value) / 100;

    var inflation = parseFloat(document.getElementById("inflation").value) / 100;
    var applyInflationAdjustment = document.getElementById("applyInflationAdjustment").checked;
    var annualValues = document.getElementById("frequencySlider").checked;
    var marketCrashAge = parseInt(document.getElementById("marketCrashAge").value);
    var marketCrashPercent = parseFloat(document.getElementById("marketCrashPercent").value);

    //Update the input values relevant to the calculator page
    document.getElementById("monthlyContribution").value = monthlyContribution;
    document.getElementById("desiredIncome").value = desiredIncome;
    document.getElementById("monthlyISAContribution").value = monthlyISAContribution;
    document.getElementById("taxFreeCashPercent").value = Math.round(taxFreeCashPercent*100);
    
    
    // Get current state pension from user input
    var currentStatePension = 11976;
    var maxTFCPercent = 0.25;
    window.maxAnnualISAContribution = 20000;
    window.maxAnnualPensionContribution = 60000;
    window.ISAWarning = "Maximum Annual ISA Contribution is £20,000. Equivalent to £1,666 monthly.";
    window.PensionWarning = "Maximum Annual Pension Contribution is £60,000. Equivalent to £5,000 monthly.";
   
    
    var statePensionInflation = Math.max(inflation,0.025);
    var earliestPensionWithdrawalAge = getEarliestPensionAge(currentAge);
    var dbPensionEscalation = inflation;

    var alreadyRetired = currentAge > retirementAge;
    

    
    if (stepUpAge >= retirementAge) {
   /*      alert("Contribution Increase Age >= Retirement Age"); */
        return;
    }

    if (taxFreeCashPercent > 0.25) {
        alert("Tax Free Cash % cannot exceed 25%.");
        document.getElementById("taxFreeCashPercent").value = 25;
        return;
    }

    if (monthlyISAContribution * 12 > window.maxAnnualISAContribution) {
        alert(window.ISAWarning);
        return;
    }

    if ((monthlyContribution + stepUpContribution) * 12 > window.maxAnnualPensionContribution ) {
        alert(window.PensionWarning);
        return;
    }

    var annualContribution = monthlyContribution * 12;
    var annualAdditionalContribution = stepUpContribution * 12;
    var annualISAContribution = monthlyISAContribution * 12;

    
    // Calculate future state pension
    var statePension = calculateStatePension(currentAge, currentStatePension, statePensionInflation, statePensionAge);

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
    var cashFlowDataAccumulation = simulationToRetirement.cashFlowData;

    if (alreadyRetired) {
        fundAtRetirement = currentFund;
        ISAAtRetirement = currentISA;
        var cashFlowDataAccumulation = [];
    }

    if (applyInflationAdjustment)  {
        cashFlowDataAccumulation = simulationToRetirement.todaysMoneyCashFlowData;
    }

    var totalFundChargesPreRetirement = simulationToRetirement.totalFundCharges;

    // Set initial cumulative TFC and remaining TFC percent
    var cumulativeTFC = taxFreeCashPercent;
    var remainingTFCPercent = maxTFCPercent - taxFreeCashPercent;

    //Desired Income at retirement
    var desiredAnnualIncomeAtRetirement = desiredAnnualIncome * Math.pow(1 + inflation, retirementAge - currentAge)/12

    // Calculate total available funds
    var totalAvailableFunds = fundAtRetirement + ISAAtRetirement;
    var yearsOfDrawdown = endAge - retirementAge +1;
    var netIncomeUpper = (accumulatePayments(statePension,statePensionInflation,endAge-statePensionAge) 
                    + accumulatePayments(dbPensionAmount, dbPensionEscalation,endAge-dbPensionAge) 
                    + totalAvailableFunds  *  Math.pow(1+fundGrowthPost,yearsOfDrawdown-1)) / yearsOfDrawdown;

    // Find the maximum affordable total net income with no market crash
    var maxAffordableNetIncome = findMaximumAffordableTotalWithdrawal(
        currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
        taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, 0, netIncomeUpper, finalFund
    );

    //Use the no-crash income as the estiamte for the upper limit on income
    netIncomeUpper = maxAffordableNetIncome;
    maxAffordableNetIncome = findMaximumAffordableTotalWithdrawal(
        currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
        taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, marketCrashPercent, netIncomeUpper, finalFund
    );

    // Display tax-free cash taken at earliest pension withdrawal age
    var expectedTFC = fundAtRetirement * taxFreeCashPercent;
    var maxTFCAmount = 268275;
    
    var taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount);
    
    
    var discountFactor = 1/ Math.pow(1 + inflation, retirementAge - currentAge);
    var inflationAdjustedMaxAffordableNetIncome = maxAffordableNetIncome * discountFactor;
    
    var desiredAnnualIncomeAtRetirement = desiredAnnualIncome * Math.pow(1 + inflation, retirementAge - currentAge);
    var initialMonthlyShortfall = Math.max(0,desiredAnnualIncomeAtRetirement-maxAffordableNetIncome)/12;
    var inflationAdjustedInitialMonthlyShortfall = Math.max(0,desiredAnnualIncome-inflationAdjustedMaxAffordableNetIncome)/12;
   
    // Simulate combined fund
    var finalProjection = true;
    var simulation = simulateCombinedFund(
        currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, maxAffordableNetIncome, statePensionInflation, cashFlowDataAccumulation,
        taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncomeAtRetirement, marketCrashAge, marketCrashPercent, finalFund
    );

    if (currentAge > retirementAge) {retirementAge=currentAge} //cashFlowData only starts at current age
    var dataAtSpecificAge = simulation.cashFlowData.find(data => data.age === retirementAge);
    var shortfallAtRetirement = dataAtSpecificAge.shortfall;
    if (shortfallAtRetirement > 0) {
        maxAffordableNetIncome = desiredAnnualIncomeAtRetirement - shortfallAtRetirement;
        inflationAdjustedMaxAffordableNetIncome = desiredAnnualIncome - shortfallAtRetirement * discountFactor;
    }

    var frequencyMultiplier = 1;
    if (annualValues) {
        frequencyMultiplier = 12;
    }

    //Output values to the results table
   
    if (applyInflationAdjustment)  { /*todays money values*/
        document.getElementById("pensionFundAtRetirementText").innerText = `Pension Fund at age ${retirementAge} with growth (after charges) of ${parseInt((fundGrowthPre-fundCharges)*10000)/100}%`;
        document.getElementById("ISAHoldingsAtRetirementText").innerText = `ISA Holdings at age ${retirementAge} with growth (after charges) of ${parseInt((fundGrowthPre-fundCharges)*10000)/100}%`;
        document.getElementById("TFCTakenTodaysMoneyText").innerText = `Tax Free Cash Taken: ${(taxFreeCashPercent * 100).toFixed(0)}% of £${(fundAtRetirement * discountFactor).toLocaleString("en-UK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        if (shortfallAtRetirement>0) {
             document.getElementById("shortfallAtRetirementText").innerText = `Shortfall at Retirement = (b) - (a)`;
            document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * shortfallAtRetirement * discountFactor/12)) + '</strong>';
            document.getElementById("shortfallAtRetirement").style.color = "red";
        } else {
            document.getElementById("shortfallAtRetirementText").innerText = `Surplus at Retirement = (a) - (b)`;
            document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * (inflationAdjustedMaxAffordableNetIncome/12-desiredAnnualIncome/12))) + '</strong>';
            document.getElementById("shortfallAtRetirement").style.color = "#2ab811";
        }
        document.getElementById("pensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement*discountFactor)) + '</strong>';
        document.getElementById("ISAHoldingsAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement*discountFactor)) + '</strong>';
        document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken*discountFactor)) + '</strong>';
        document.getElementById("expectedTotalIncomeTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * inflationAdjustedMaxAffordableNetIncome/12)) + '</strong>';
        document.getElementById("desiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncome/12)) + '</strong>';
        
         // Plot charts and display table
        plotChart(simulation.todaysMoneyCashFlowData);
        plotIncomeChart(simulation.todaysMoneyCashFlowData, frequencyMultiplier);
        displayCashFlowTable(simulation.todaysMoneyCashFlowData);

    }  else { /*not todays money values*/
        document.getElementById("pensionFundAtRetirementText").innerText = `Pension Fund at age ${retirementAge} with growth (after charges) of ${parseInt((fundGrowthPre-fundCharges)*10000)/100}%`;
        document.getElementById("ISAHoldingsAtRetirementText").innerText = `ISA Holdings at age ${retirementAge} with growth (after charges) of ${parseInt((fundGrowthPre-fundCharges)*10000)/100}%`;
        document.getElementById("TFCTakenTodaysMoneyText").innerText = `Tax Free Cash Taken: ${(taxFreeCashPercent * 100).toFixed(0)}% of £${(fundAtRetirement).toLocaleString("en-UK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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
        document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken)) + '</strong>';
        document.getElementById("expectedTotalIncomeTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * maxAffordableNetIncome/12)) + '</strong>';
        document.getElementById("desiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(frequencyMultiplier * desiredAnnualIncomeAtRetirement/12)) + '</strong>';
        
         // Plot charts and display table
        plotChart(simulation.cashFlowData);
        plotIncomeChart(simulation.cashFlowData, frequencyMultiplier);
        displayCashFlowTable(simulation.cashFlowData);
    }

    if (alreadyRetired) {
        document.getElementById("pensionFundAtRetirementText").innerText = `You have already retired so the starting point for drawdown is:`;
        document.getElementById("ISAHoldingsAtRetirementText").innerText = `And the starting point for your ISA is current holdings of:`;
        document.getElementById("TFCTakenTodaysMoneyText").innerText = `The calculations assume that you took a 25% tax free cash lump sum.`;
        document.getElementById("pensionFundAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(fundAtRetirement)) + '</strong>';
        document.getElementById("ISAHoldingsAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(ISAAtRetirement)) + '</strong>';
        document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(0*discountFactor)) + '</strong>';
    }

    var totalFundChargesPostRetirement = simulation.totalFundCharges;

    // Calculate total fund charges over all years
    var totalFundCharges = totalFundChargesPreRetirement + totalFundChargesPostRetirement;

   

    var tableContainer = document.getElementById("cashFlowTableContainer");
    tableContainer.classList.remove("hidden");

    storeInputsInLocalStorage();

    // Change button label to 'Recalculate' after first click
    /* document.getElementById("calculateButton").classList.add("hidden"); */
    //document.getElementById("calculateButton").textContent = "Recalculate";
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
    var currentAnnualContribution = annualContribution; // Track current annual contribution

    // Accumulation phase
    for (var age = currentAge; age < retirementAge; age++) {
        // Apply step-up in contributions if age >= stepUpAge
        if (age === stepUpAge && stepUpAge > 0 && annualAdditionalContribution > 0) {
            currentAnnualContribution += annualAdditionalContribution;
            annualAdditionalContribution *= (1 + inflation);
        }

        var openingBalance = fund;
        var ISAOpening = ISA;

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

        // ISA Growth (Charges are no longer applied to ISA)
        var ISAGain = ISA * effectiveGrowthRate; // Apply market crash to ISA
        ISA = ISA + ISAGain + annualISAContribution;

        // Collect cash flow data
        var cashFlowItem = {
            age: age,
            openingBalance: openingBalance,
            contribution: currentAnnualContribution,
            withdrawal: 0,
            statePension: 0,
            dbPension: 0,
            taxPaid: 0,
            taxSaved: 0,
            cumulativeTFC: 0,
            investmentReturn: investmentGain,
            fundCharges: fundChargesTaken,
            closingBalance: fund,
            ISAholdings: ISA,
            ISAContribution: annualISAContribution,
            ISADrawings: 0,
            shortfall: 0
        };
        cashFlowData.push(cashFlowItem);

        // Calculate discount factor for today's money
        var discountFactor = 1 / Math.pow(1 + inflation, age - currentAge);

        // Create discounted cash flow item
        var todaysMoneyCashFlowItem = {
            age: age,
            openingBalance: parseFloat((cashFlowItem.openingBalance * discountFactor).toFixed(2)),
            contribution: currentAnnualContribution * discountFactor,
            withdrawal: 0,   // Set to 0 as in cashFlowItem
            statePension: 0, // Set to 0 as in cashFlowItem
            dbPension: 0,    // Set to 0 as in cashFlowItem
            taxPaid: 0,      // Set to 0 as in cashFlowItem
            taxSaved: 0,     // Set to 0 as in cashFlowItem
            cumulativeTFC: 0, // Set to 0 as in cashFlowItem
            investmentReturn: parseFloat((cashFlowItem.investmentReturn * discountFactor).toFixed(2)),
            fundCharges: parseFloat((cashFlowItem.fundCharges * discountFactor).toFixed(2)),
            closingBalance: parseFloat((cashFlowItem.closingBalance * discountFactor).toFixed(2)),
            ISAholdings: parseFloat((cashFlowItem.ISAholdings * discountFactor).toFixed(2)),
            ISAContribution: annualISAContribution * discountFactor,
            ISADrawings: 0,     // Set to 0 as in cashFlowItem
            shortfall: 0         // Set to 0 as in cashFlowItem
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
        totalFundCharges: totalFundCharges // Return total fund charges
    };
}





function findMaximumAffordableTotalWithdrawal(
    currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
    inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
    earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
    taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent, netIncomeUpper, finalFund
) {
    //var tol = 100; // Tolerance for convergence
    tol = 10;
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
            currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
            inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
            earliestPensionWithdrawalAge, maxAffordableNetIncome, statePensionInflation, cashFlowDataAccumulation,
            taxFreeCashPercent, 268275, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent, finalFund
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
    currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement,
    fundGrowthPost, fundCharges, inflation, remainingTFCPercent,
    cumulativeTFC, statePensionAge, statePension, earliestPensionWithdrawalAge,
    targetNetIncome, statePensionInflation, cashFlowDataAccumulation,
    taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge,
    dbPensionEscalation, minISABalance, useScottishTax, finalProjection,
    maxTFCPercent, desiredAnnualIncome, marketCrashAge, marketCrashPercent,
    finalFund
) {
    var cashFlowData = [...cashFlowDataAccumulation];
    var todaysMoneyCashFlowData = [...cashFlowDataAccumulation];
    var ageWhenTFCMaxed = null;
    var statePensionInPayment = 0;
    var dbPensionInPayment = 0;
    var maxAge = endAge;
    var startAge = Math.max(currentAge, retirementAge);

    var alreadyRetired = currentAge > retirementAge;
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
        var expectedTFC = 0;
        var taxFreeCashTaken = 0;
        
        if (age==100) {
            age=age;
        }

        // Adjust state pension each year
        if (age >= statePensionAge) {
            statePensionInPayment =
                statePension * Math.pow(1 + statePensionInflation, age - statePensionAge);
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

        var inflationAdjustedTargetNetIncome =
            targetNetIncome * Math.pow(1 + inflation, age - retirementAge);
        var inflationAdjustedDesiredIncome =
            desiredAnnualIncome * Math.pow(1 + inflation, age - retirementAge);

        var netIncomeNeededFromInvestments = Math.max(
            0,
            inflationAdjustedTargetNetIncome - statePensionInPayment - dbPensionInPayment
        );

        var netPensionWithdrawal = 0;
        var grossPensionWithdrawal = 0;
        var taxPaidOnDCPension = 0;
        var taxSaved = 0;
        var ISADrawings = 0;

        // Adjust fund balance for TFC at earliestPensionWithdrawalAge
        if (age == earliestPensionWithdrawalAge && fund > 0) {
            expectedTFC = fund * taxFreeCashPercent;
            taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount - cumulativeTFC);
            TFCHasBeenTaken = true;
        }

        if (age == retirementAge && fund > 0 && !TFCHasBeenTaken) {
            expectedTFC = fund * taxFreeCashPercent;
            taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount - cumulativeTFC);
        }

        fund -= taxFreeCashTaken;
        cumulativeTFC += taxFreeCashTaken;

        remainingTFCPercent = Math.max(0, maxTFCPercent - taxFreeCashPercent);
        if (taxFreeCashTaken == maxTFCAmount) {
            remainingTFCPercent = 0;
        }

        if (alreadyRetired) {
            remainingTFCPercent = 0;
            cumulativeTFC = 0;
            taxFreeCashTaken = 0;
        }

        // Determine effective growth rate, applying market crash if applicable
        var effectiveGrowthRate = fundGrowthPost;
        if (age == marketCrashAge) {
            effectiveGrowthRate = -marketCrashPercent / 100;
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
        var tolerance = finalProjection && age == startAge ? 0.4 : 10;

        var fundExhausted = false;
        var ISAExhausted = false;

        var lowerGuess = 0;
        var upperGuess = maxAvailableWithdrawal;

        // Set initial guess for gross pension withdrawal
        if (age >= earliestPensionWithdrawalAge) {
            var adjustedPersonalAllowance = calcPersonalAllowance(age, currentAge, inflation);

            var maxTaxablePensionWithdrawal =
                adjustedPersonalAllowance - statePensionInPayment - dbPensionInPayment;
            maxTaxablePensionWithdrawal = Math.max(maxTaxablePensionWithdrawal, 0);

            var maxGrossPensionWithdrawal =
                maxTaxablePensionWithdrawal / (1 - remainingTFCPercent);

            grossPensionWithdrawal = Math.min(
                maxGrossPensionWithdrawal,
                netIncomeNeededFromInvestments / (1 - remainingTFCPercent),
                maxAvailableWithdrawal
            );
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

            // **In the final year, adjust withdrawal to meet net income need**
            if (age === maxAge && !fundExhausted) {
                // Withdraw whatever is needed up to the fund balance
                grossPensionWithdrawal = Math.min(
                    netIncomeNeededFromInvestments / (1 - remainingTFCPercent),
                    maxAvailableWithdrawal
                );
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
                startAge
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
                        startAge
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
        ISA = ISA + ISAGain - ISADrawings;
        ISA = Math.max(ISA, 0);

        taxSaved = taxFreePortion;

        var finalShortfall = Math.max(
            0,
            inflationAdjustedDesiredIncome -
                netPensionWithdrawal -
                (statePensionInPayment - statePensionTax) -
                (dbPensionInPayment - dbPensionTax) -
                ISADrawings
        );

        if (age <= maxAge) {
            cashFlowData.push({
                age: age,
                openingBalance: openingFundBalance,
                contribution: 0,
                withdrawal: netPensionWithdrawal,
                statePension: statePensionInPayment - statePensionTax,
                dbPension: dbPensionInPayment - dbPensionTax,
                taxPaid: taxPaidOnDCPension,
                taxSaved: taxSaved,
                cumulativeTFC: cumulativeTFC,
                investmentReturn: investmentGain || 0,
                fundCharges: fundChargesTaken || 0,
                closingBalance: fund,
                ISAholdings: ISA,
                ISAContribution: 0,
                ISADrawings: ISADrawings,
                shortfall: finalShortfall
            });

            var discountFactor = 1 / Math.pow(1 + inflation, age - currentAge);

            todaysMoneyCashFlowData.push({
                age: age,
                openingBalance: openingFundBalance * discountFactor,
                contribution: 0,
                withdrawal: netPensionWithdrawal * discountFactor,
                statePension:
                    (statePensionInPayment - statePensionTax) * discountFactor,
                dbPension:
                    (dbPensionInPayment - dbPensionTax) * discountFactor,
                taxPaid: taxPaidOnDCPension * discountFactor,
                taxSaved: taxSaved * discountFactor,
                cumulativeTFC: cumulativeTFC * discountFactor,
                investmentReturn: (investmentGain || 0) * discountFactor,
                fundCharges: (fundChargesTaken || 0) * discountFactor,
                closingBalance: fund * discountFactor,
                ISAholdings: ISA * discountFactor,
                ISAContribution: 0,
                ISADrawings: ISADrawings * discountFactor,
                shortfall: finalShortfall * discountFactor
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
        totalFundCharges: totalFundCharges
    };
}






function calculateNetIncome(
    grossPensionWithdrawal,
    statePensionInPayment,
    dbPensionInPayment,
    totalTaxableIncome,
    age,
    inflation,
    useScottishTax,
    startAge
) {
    // Calculate tax on state pension alone to utilize personal allowance first
    const statePensionTax = calculateIncomeTax(
        statePensionInPayment,
        age,
        inflation,
        useScottishTax,
        startAge
    );

    // Calculate tax on combined state pension and DB pension
    const stateAndDBIncome = statePensionInPayment + dbPensionInPayment;
    const stateAndDBTax = calculateIncomeTax(
        stateAndDBIncome,
        age,
        inflation,
        useScottishTax,
        startAge
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
        startAge
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


function plotChart(cashFlowData) {
    var ctx = document.getElementById('fundChart').getContext('2d');

    // Extract data from cashFlowData
    var ages = cashFlowData.map(data => data.age);
    var pensionFundValues = cashFlowData.map(data => Math.round(data.closingBalance));
    var isaHoldings = cashFlowData.map(data => Math.round(data.ISAholdings));

    // Destroy existing chart instance if it exists to avoid duplication
    if (window.myLineChart) {
        window.myLineChart.destroy();
    }

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
                    display: true, // Enables the title
                    text: 'Pension Fund Value and ISA Holdings', // Your desired title text
                    font: {
                        size: 20, // Font size in pixels
                        family: 'Arial', // Font family
                    },
                    padding: {
                        top: 5,
                        bottom: 5
                    },
                    color: '#333' // Title text color
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
                        text: 'Fund Value (£)'
                    },
                    beginAtZero: true,
                    ticks: {
                        // Include a pound sign in the ticks
                        callback: function(value, index, ticks) {
                            return '£' + formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}


// New function to plot the income breakdown chart
function plotIncomeChart(cashFlowData, frequencyMultiplier) {
    var ctx = document.getElementById('incomeChart').getContext('2d');

    // Extract initial data
    var ages = cashFlowData.map(data => data.age);
    var netPensionWithdrawals = cashFlowData.map(data => data.withdrawal);
    var ISADrawings = cashFlowData.map(data => data.ISADrawings);
    var statePensions = cashFlowData.map(data => data.statePension);
    var dbPensions = cashFlowData.map(data => data.dbPension);

    // Only include ages in retirement
    // NOTE: The original filter condition includes all data since it compares to the first age.
    // Adjust this condition based on your actual retirement criteria if needed.
    var retirementData = cashFlowData.filter(data => data.age >= cashFlowData[0].age);

    // Process data for the chart
    ages = retirementData.map(data => data.age);
    netPensionWithdrawals = retirementData.map(data => Math.round(frequencyMultiplier * data.withdrawal / 12));
    ISADrawings = retirementData.map(data => Math.round(frequencyMultiplier * data.ISADrawings / 12));
    statePensions = retirementData.map(data => Math.round(frequencyMultiplier * data.statePension / 12));
    dbPensions = retirementData.map(data => Math.round(frequencyMultiplier * data.dbPension / 12));
    var shortfall = retirementData.map(data => Math.round(frequencyMultiplier * data.shortfall / 12));

    // Destroy existing chart instance if it exists to avoid duplication
    if (window.myIncomeChart) {
        window.myIncomeChart.destroy();
    }

    // Create the new chart
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
                    label: 'Pension Withdrawals (after tax)',
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
                        text: 'Age'
                    }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Monthly Net Income (£)'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Retirement Income Breakdown',
                    font: {
                        size: 20,
                        family: 'Arial',
                    },
                    padding: {
                        top: 5,
                        bottom: 5
                    },
                    color: '#333'
                },
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        // Existing label callback to show individual dataset values
                        label: function(context) {
                            var label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += '£' + formatNumber(context.parsed.y);
                            }
                            return label;
                        },
                        // New footer callback to show the total amount
                        footer: function(context) {
                            var total = 0;
                            context.forEach(function(item) {
                                total += item.parsed.y;
                            });
                            return 'Total: £' + formatNumber(total);
                        }
                    }
                }
            }
        }
    });
}

// Ensure that the formatNumber function is defined
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function displayCashFlowTable(cashFlowData) {
    var tableBody = document.getElementById('cashFlowTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous data

    cashFlowData.forEach(function (row) {
        var tr = document.createElement('tr');

        // 1. Age
        var tdAge = document.createElement('td');
        tdAge.textContent = row.age;
        tr.appendChild(tdAge);

        // 2. Pension Fund
        var tdPensionFund = document.createElement('td');
        tdPensionFund.textContent = '£' + formatNumber(Math.round(row.openingBalance));
        tr.appendChild(tdPensionFund);

        

        // 3. Pension Fund Growth
        var tdPensionGrowth = document.createElement('td');
        tdPensionGrowth.textContent = '£' + formatNumber(Math.round(row.investmentReturn || 0));
        tr.appendChild(tdPensionGrowth);

        // 4. Pension Fund Charges
        var tdPensionCharges = document.createElement('td');
        tdPensionCharges.textContent = '£' + formatNumber(Math.round(row.fundCharges || 0));
        tr.appendChild(tdPensionCharges);

        // 5. Pension Conts (Contributions)
        var tdPensionConts = document.createElement('td');
        tdPensionConts.textContent = '£' + formatNumber(Math.round(row.contribution));
        tr.appendChild(tdPensionConts);

        // 6. ISA Holdings
        var tdISAHoldings = document.createElement('td');
        tdISAHoldings.textContent = '£' + formatNumber(Math.round(row.ISAholdings));
        tr.appendChild(tdISAHoldings);

        // 7. ISA Conts
        var tdISAConts = document.createElement('td');
        tdISAConts.textContent = '£' + formatNumber(Math.round(row.ISAContribution));
        tr.appendChild(tdISAConts);

        // 8. ISA Withdrawals
        var tdISADrawings = document.createElement('td');
        tdISADrawings.textContent = '£' + formatNumber(Math.round(row.ISADrawings));
        tr.appendChild(tdISADrawings);

        // 9. Net Pension Received
        var tdNetPension = document.createElement('td');
        tdNetPension.textContent = '£' + formatNumber(Math.round(row.withdrawal));
        tr.appendChild(tdNetPension);

        // 10. State Pension
        var tdStatePension = document.createElement('td');
        tdStatePension.textContent = '£' + formatNumber(Math.round(row.statePension));
        tr.appendChild(tdStatePension);

        // 11. DB Pension
        var tdDBPension = document.createElement('td');
        tdDBPension.textContent = '£' + formatNumber(Math.round( row.dbPension));
        tr.appendChild(tdDBPension);

        // 12. Tax Paid
        var tdTaxPaid = document.createElement('td');
        tdTaxPaid.textContent = '£' + formatNumber(Math.round( row.taxPaid));
        tr.appendChild(tdTaxPaid);

        

        // 14. TFC Tax Savings
        var tdTaxSaved = document.createElement('td');
        tdTaxSaved.textContent = '£' + formatNumber(Math.round( row.taxSaved));
        tr.appendChild(tdTaxSaved);

        // 15. Cumulative TFC Taken
        var tdCumulativeTFC = document.createElement('td');
        tdCumulativeTFC.textContent = '£' + formatNumber(Math.round(row.cumulativeTFC));
        tr.appendChild(tdCumulativeTFC);

        // 13. Total Net Income
        var totalNetIncome = row.withdrawal + row.statePension + row.dbPension + row.ISADrawings;
        var tdTotalNetIncome = document.createElement('td');
        tdTotalNetIncome.textContent = '£' + formatNumber(Math.round(totalNetIncome));
        tr.appendChild(tdTotalNetIncome);

        //Balance at end
        var tdBalanceAtEnd = document.createElement('td');
        tdBalanceAtEnd.textContent = '£' + formatNumber(Math.round(row.closingBalance));
        tr.appendChild(tdBalanceAtEnd);

        tableBody.appendChild(tr);
    });
}


function formatNumber(num) {
    return num.toLocaleString('en-UK');
}


function storeInputsInLocalStorage() {
    // Store values in localStorage
    localStorage.setItem('retirementAge', document.getElementById("retirementAge").value);
    localStorage.setItem('endAge', document.getElementById("endAge").value);
    localStorage.setItem('monthlyContribution', document.getElementById("monthlyContribution").value);
    localStorage.setItem('stepUpAge', document.getElementById("stepUpAge").value);
    localStorage.setItem('stepUpContribution', document.getElementById("stepUpContribution").value);
    localStorage.setItem('desiredIncome', document.getElementById("desiredIncome").value); // Store without multiplying by 12
    localStorage.setItem('monthlyISAContribution', document.getElementById("monthlyISAContribution").value);
    localStorage.setItem('minISABalance', document.getElementById("minISABalance").value);
    localStorage.setItem('finalFund', document.getElementById("finalFund").value);
    localStorage.setItem('useScottishTax', document.getElementById("useScottishTax").checked);
    localStorage.setItem('fundGrowthPre', document.getElementById("fundGrowthPre").value);
    localStorage.setItem('fundGrowthPost', document.getElementById("fundGrowthPost").value);
    localStorage.setItem('fundCharges', document.getElementById("fundCharges").value);
    localStorage.setItem('taxFreeCashPercent', document.getElementById("taxFreeCashPercent").value);
    localStorage.setItem('inflation', document.getElementById("inflation").value);
    localStorage.setItem('applyInflationAdjustment', document.getElementById("applyInflationAdjustment").checked);
    localStorage.setItem('frequencySlider', document.getElementById("frequencySlider").checked);
    localStorage.setItem('marketCrashAge', document.getElementById("marketCrashAge").value);
    localStorage.setItem('marketCrashPercent', document.getElementById("marketCrashPercent").value);
    localStorage.setItem('minISABalanceCheckbox', document.getElementById("minISABalanceCheckbox").checked);
    localStorage.setItem('finalFundCheckbox', document.getElementById("finalFundCheckbox").checked);
    localStorage.setItem('contributionIncreaseCheckbox', document.getElementById("contributionIncreaseCheckbox").checked);
    localStorage.setItem('useScottishTax', document.getElementById("useScottishTax").checked);
    localStorage.setItem('inflationCheckBox', document.getElementById("inflationCheckBox").checked);
    localStorage.setItem('fundGrowthCheckbox', document.getElementById("fundGrowthCheckbox").checked);
    localStorage.setItem('lowerGrowthCheckbox', document.getElementById("lowerGrowthCheckbox").checked);
    localStorage.setItem('fundChargesCheckbox', document.getElementById("fundChargesCheckbox").checked);
    localStorage.setItem('modelMarketCrashCheckbox', document.getElementById("modelMarketCrashCheckbox").checked);
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




function checkRequiredInputs() {

    

    const inputs = [
        { id: "currentAge", key: "Current Age" },
        { id: "retirementAge", key: "Desired Retirement Age" },
        { id: "currentFund", key: "Current Pension Fund" },
        { id: "desiredIncome", key: "Desired Monthly Income" }
      
    ];

    let proceedWithCalc = true; // Flag to determine if we can proceed

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


   
         
        return proceedWithCalc;
    }  

