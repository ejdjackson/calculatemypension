//to Toggle Navbar on Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

function checkFirstCalc() {
    if (firstCalc==false) {
        calculatePension();
    }
}


function calculatePension() {
            
    firstCalc = false;

    // Hide the placeholder image
    const placeholderImage = document.getElementById('placeholderImage');
    if (placeholderImage) {
        placeholderImage.style.display = 'none';
    }

    /* document.getElementById('assumptionsText').classList.remove("hidden");
    document.getElementById('disclaimerText').classList.remove("hidden"); */

    //Hide the explainer text
   /*  const explainerText = document.getElementById('explainerText');
    if (explainerText) {
        explainerText.style.display = 'none';
    } */

    // Reveal the results container
   /*  var resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.classList.remove("hidden");
    resultsContainer.classList.add("visible");
    resultsContainer.setAttribute('aria-hidden', 'false'); */

    
    
    var currentAge = parseInt(document.getElementById("currentAge").value);
    var retirementAge = parseInt(document.getElementById("retirementAge").value);
    var endAge = parseInt(document.getElementById("endAge").value);
    var currentFund = parseFloat(document.getElementById("currentFund").value);
    var monthlyContribution = parseFloat(document.getElementById("monthlyContribution").value);
    var stepUpAge = parseInt(document.getElementById("stepUpAge").value);
    var stepUpContribution = parseFloat(document.getElementById("stepUpContribution").value) ; // Convert monthly to annual 
    var desiredAnnualIncome = 12 * parseInt(document.getElementById("desiredIncome").value);
    // New ISA inputs
    var currentISA = parseFloat(document.getElementById("currentISA").value);
    var monthlyISAContribution = parseFloat(document.getElementById("monthlyISAContribution").value);

    // Minimum ISA balance
    var minISABalance = parseFloat(document.getElementById("minISABalance").value) || 0;

    //Scottish?
    var useScottishTax = document.getElementById("useScottishTax").checked;
    // New Defined Benefit Pension inputs
    var dbPensionAmount = parseFloat(document.getElementById("dbPensionAmount").value) || 0;
    var dbPensionAge = parseInt(document.getElementById("dbPensionAge").value);
    

    // Get inputs from the right form
    var fundGrowthPre = parseFloat(document.getElementById("fundGrowthPre").value) / 100;
    var fundGrowthPost = parseFloat(document.getElementById("fundGrowthPost").value) / 100;
    var fundCharges = parseFloat(document.getElementById("fundCharges").value) / 100;
    var taxFreeCashPercent = parseFloat(document.getElementById("taxFreeCashPercent").value) / 100;

    var inflation = parseFloat(document.getElementById("inflation").value) / 100;
    var applyInflationAdjustment = document.getElementById("applyInflationAdjustment").checked;

    
    
    // Get current state pension from user input
    var currentStatePension = 11500;
    var maxTFCPercent = 0.25;
    var statePensionAge = getStatePensionAge(currentAge);

   
    var statePensionInflation = Math.max(inflation,0.025);
    var earliestPensionWithdrawalAge = getEarliestPensionAge(currentAge);
    var dbPensionEscalation = inflation;

    
    if (stepUpAge >= retirementAge) {
        alert("Contribution Increase Age >= Retirement Age");
        return;
    }

    if (taxFreeCashPercent > 0.25) {
        alert("Tax Free Cash % cannot exceed 25%.");
        return;
    }

    if (monthlyISAContribution * 12 > 20000) {
        alert("Maximum Annual ISA Contribution is £20,000. Equivalent to £1,666 monthly.");
        return;
    }

    if ((monthlyContribution + stepUpContribution) * 12 > 60000 ) {
        alert("Maximum Annual Pension Contribution is £60,000. Equivalent to £5,000 monthly.");
        return;
    }

    var annualContribution = monthlyContribution * 12;
    var annualAdditionalContribution = stepUpContribution * 12;
    var annualISAContribution = monthlyISAContribution * 12;

    // Calculate future state pension
    var statePension = calculateStatePension(currentAge, currentStatePension, statePensionInflation);

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
        annualISAContribution
    );

    var alreadyRetired = currentAge >= retirementAge;
    var fundAtRetirement = simulationToRetirement.fundAtRetirement;
    var ISAAtRetirement = simulationToRetirement.ISAAtRetirement;
    var cashFlowDataAccumulation = simulationToRetirement.cashFlowData;
    var totalFundChargesPreRetirement = simulationToRetirement.totalFundCharges;

    // Set initial cumulative TFC and remaining TFC percent
    var cumulativeTFC = taxFreeCashPercent;
    var remainingTFCPercent = maxTFCPercent - taxFreeCashPercent;

    //Desired Income at retirement
    var desiredAnnualIncomeAtRetirement = desiredAnnualIncome * Math.pow(1 + inflation, retirementAge - currentAge)/12


    // Find the maximum affordable total net income
    var maxAffordableNetIncome = findMaximumAffordableTotalWithdrawal(
        currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
        inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
        earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
        taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncomeAtRetirement
    );

    // Display tax-free cash taken at earliest pension withdrawal age
    var expectedTFC = fundAtRetirement * taxFreeCashPercent;
    var maxTFCAmount = 268275;
    
    var taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount);
    if (alreadyRetired) {
        taxFreeCashTaken = 0;
    }
    
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
        taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncomeAtRetirement
    );

    if (currentAge > retirementAge) {retirementAge=currentAge} //cashFlowData only starts at current age
    var dataAtSpecificAge = simulation.cashFlowData.find(data => data.age === retirementAge);
    var shortfallAtRetirement = dataAtSpecificAge.shortfall;
    if (shortfallAtRetirement > 0) {
        maxAffordableNetIncome = desiredAnnualIncomeAtRetirement - shortfallAtRetirement;
        inflationAdjustedMaxAffordableNetIncome = desiredAnnualIncome - shortfallAtRetirement * discountFactor;
    }

    //Output values to the results table
    if (!applyInflationAdjustment) { 
        document.getElementById("expectedTotalIncomeTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(maxAffordableNetIncome/12)) + '</strong>';
        document.getElementById("desiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(desiredAnnualIncomeAtRetirement/12)) + '</strong>';
        document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(shortfallAtRetirement/12)) + '</strong>';
        document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken)) + '</strong>';
        
    }
    else {
        document.getElementById("expectedTotalIncomeTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(inflationAdjustedMaxAffordableNetIncome/12)) + '</strong>';
        document.getElementById("desiredMonthlyIncomeAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(desiredAnnualIncome/12)) + '</strong>';
        document.getElementById("shortfallAtRetirement").innerHTML = '<strong>£' + formatNumber(Math.round(shortfallAtRetirement * discountFactor/12)) + '</strong>';
        document.getElementById("taxFreeCashTakenTodaysMoney").innerHTML = '<strong>£' + formatNumber(Math.round(taxFreeCashTaken*discountFactor)) + '</strong>';
    }

    var totalFundChargesPostRetirement = simulation.totalFundCharges;

    // Calculate total fund charges over all years
    var totalFundCharges = totalFundChargesPreRetirement + totalFundChargesPostRetirement;

    // Plot charts and display table
    plotChart(simulation);
    plotIncomeChart(simulation);
    displayCashFlowTable(simulation.cashFlowData);

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
    annualISAContribution
) {
    var fund = currentFund;
    var ISA = currentISA;
    var cashFlowData = [];
    var totalFundCharges = 0; // Initialise total fund charges
    var currentAnnualContribution = annualContribution; // Track current annual contribution

    // Accumulation phase
    for (var age = currentAge; age < retirementAge; age++) {
        // Apply step-up in contributions if age >= stepUpAge
        if (age == stepUpAge && stepUpAge > 0 && annualAdditionalContribution > 0) {
            //if (stepUpContribution > 0) {
                currentAnnualContribution = currentAnnualContribution + annualAdditionalContribution;
            //}
        }

        var openingBalance = fund;
        var ISAOpening = ISA;

        // Pension Fund Growth
        var investmentGain = fund * fundGrowthPre;
        var fundChargesTaken = fund * fundCharges;
        fund = fund + investmentGain + currentAnnualContribution - fundChargesTaken;

        totalFundCharges += fundChargesTaken; // Accumulate total fund charges

        // ISA Growth (Charges are no longer applied to ISA)
        var ISAGain = ISA * fundGrowthPre;
        ISA = ISA + ISAGain + annualISAContribution;

        // Collect cash flow data
        cashFlowData.push({
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
        });
    }

    

    return {
        fundAtRetirement: fund,
        ISAAtRetirement: ISA,
        cashFlowData: cashFlowData,
        totalFundCharges: totalFundCharges // Return total fund charges
    };

    
}



function findMaximumAffordableTotalWithdrawal(
    currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
    inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
    earliestPensionWithdrawalAge, statePensionInflation, cashFlowDataAccumulation,
    taxFreeCashPercent, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, maxTFCPercent, desiredAnnualIncome
) {
    //var tol = 100; // Tolerance for convergence
    tol = 100;
    var maxIter = 100;
    var iter = 0;

    var netIncomeLower = 0; // Lower bound of net income
    var yearsOfDrawdown = endAge - retirementAge +1;

    // Calculate total available funds
    var totalAvailableFunds = fundAtRetirement + ISAAtRetirement;

    // For conservative estimation, set effectiveReturnRate to zero
    var effectiveReturnRate = 0;

    // Calculate upper bound for net income
    var netIncomeUpper;
    netIncomeUpper = (accumulatePayments(statePension,statePensionInflation,endAge-statePensionAge) 
                    + accumulatePayments(dbPensionAmount, dbPensionEscalation,endAge-dbPensionAge) 
                    + totalAvailableFunds *  Math.pow(1+fundGrowthPost,yearsOfDrawdown)) / yearsOfDrawdown;
    
    acceptableEndBalance = netIncomeUpper/25; // Minimum acceptable balance at end age to prevent depletion

    var maxAffordableNetIncome = 0;
    var finalProjection = false;

    while (iter < maxIter) {
        maxAffordableNetIncome = (netIncomeLower + netIncomeUpper) / 2;

              
        var simulation = simulateCombinedFund(
            currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
            inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
            earliestPensionWithdrawalAge, maxAffordableNetIncome, statePensionInflation, cashFlowDataAccumulation,
            taxFreeCashPercent, 268275, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncome
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
    currentAge, retirementAge, endAge, fundAtRetirement, ISAAtRetirement, fundGrowthPost, fundCharges,
    inflation, remainingTFCPercent, cumulativeTFC, statePensionAge, statePension,
    earliestPensionWithdrawalAge, targetNetIncome, statePensionInflation, cashFlowDataAccumulation,
    taxFreeCashPercent, maxTFCAmount, dbPensionAmount, dbPensionAge, dbPensionEscalation, minISABalance, useScottishTax, finalProjection, maxTFCPercent, desiredAnnualIncome
) {
    var cashFlowData = [...cashFlowDataAccumulation];
    var ageWhenTFCMaxed = null;
    var statePensionInPayment = 0;
    var dbPensionInPayment = 0;
    var maxAge = endAge;

    var alreadRetired = currentAge >= retirementAge;
    var startAge = Math.max(currentAge, retirementAge);

    var fund = fundAtRetirement;
    var ISA = ISAAtRetirement;

    var fundsDepletedBeforeEndAge = false; // Flag to track early depletion
    var previousGrossPensionWithdrawal = 0; // Initialise previous gross pension withdrawal
    var initialShortfall = 0;

    var dbPensionProjectionOnly = false;

    if (fundAtRetirement ==0 && ISAAtRetirement ==0) {
        dbPensionProjectionOnly = true;
    }

    var totalFundCharges = 0; // Initialise total fund charges

    for (var age = startAge; age <= maxAge ; age++) {
        var openingFundBalance = fund;
        var alreadyRetired = currentAge >= retirementAge;
        var negativeShortfall = 0;

        // Adjust state pension each year
        if (age >= statePensionAge) {
            statePensionInPayment = statePension * Math.pow(1 + statePensionInflation, age - statePensionAge);
        } else {
            statePensionInPayment = 0;
        }

        // Adjust DB pension each year
        if (age >= dbPensionAge) {
            dbPensionInPayment = dbPensionAmount * Math.pow(1 + dbPensionEscalation, age - dbPensionAge);
        } else {
            dbPensionInPayment = 0;
        }

        var inflationAdjustedTargetNetIncome = targetNetIncome * Math.pow(1 + inflation, age - retirementAge);
        inflationAdjustedDesiredIncome = desiredAnnualIncome * Math.pow(1 + inflation, age - retirementAge);


        var netIncomeNeededFromInvestments = Math.max(0,inflationAdjustedTargetNetIncome - statePensionInPayment - dbPensionInPayment);

        var netPensionWithdrawal = 0;
        var grossPensionWithdrawal = 0;
        var taxPaidOnDCPension = 0;
        var taxSaved = 0;
        var ISADrawings = 0;

        if (netIncomeNeededFromInvestments <= 0) {
            netIncomeNeededFromInvestments = 0;
        }

        // Adjust fund balance for TFC at earliestPensionWithdrawalAge
        if (age == earliestPensionWithdrawalAge && fund > 0) {
            // Calculate TFC
            var expectedTFC = fund * taxFreeCashPercent;
            var taxFreeCashTaken = Math.min(expectedTFC, maxTFCAmount - cumulativeTFC);
            if (alreadRetired) {
                remainingTFCPercent = 0;
                cumulativeTFC = 0;
                taxFreeCashTaken = 0;
            }
            else{
                fund = fund - taxFreeCashTaken;
                cumulativeTFC += taxFreeCashTaken;

                // Adjust remaining TFC percent
                remainingTFCPercent = Math.max(0,maxTFCPercent - taxFreeCashPercent);
                if (taxFreeCashTaken = maxTFCAmount) {
                    remainingTFCPercent = 0;
                }
            }
        }

        // Calculate fund charges and investment gain
        var investmentGain = fund * fundGrowthPost;
        var fundChargesTaken = fund * fundCharges;

        totalFundCharges += fundChargesTaken; // Accumulate total fund charges

        var investmentGain = fund * fundGrowthPost;
        var fundChargesTaken = fund * fundCharges;

        // Determine gross pension and ISA withdrawal needed
        var iterations = 0;
        var iterationLimit = 100;
        var tolerance = 10;
        if (finalProjection && age == startAge) {
            tolerance = 0.4;
        }
       
        
        var fundExhausted = false;
        var ISAExhausted = false;

        var lowerGuess = 0;
        var upperGuess = fund; // Maximum possible gross pension withdrawal

        // Set initial guess for gross pension withdrawal
        if (age >= earliestPensionWithdrawalAge) {
            // From age 57 onwards, prioritise pension withdrawals up to personal allowance
            var adjustedPersonalAllowance = calcPersonalAllowance(age, currentAge, inflation);

            // Calculate maximum taxable pension withdrawal to utilise personal allowance
            var maxTaxablePensionWithdrawal = adjustedPersonalAllowance - statePensionInPayment - dbPensionInPayment;
            maxTaxablePensionWithdrawal = Math.max(maxTaxablePensionWithdrawal, 0);

            // Add back tax-free portion to get gross pension withdrawal
            var maxGrossPensionWithdrawal = maxTaxablePensionWithdrawal / (1 - remainingTFCPercent);

            // Ensure we don't withdraw more than needed
            grossPensionWithdrawal = Math.min(maxGrossPensionWithdrawal, netIncomeNeededFromInvestments / (1 - remainingTFCPercent), fund);
        } else {
            grossPensionWithdrawal = 0; // Before age 57, pension withdrawals are not possible
        }

        grossPensionWithdrawal = Math.min(Math.max(grossPensionWithdrawal, lowerGuess), upperGuess);

        if (age < earliestPensionWithdrawalAge) {
            grossPensionWithdrawal = 0; // Before age 57, pension withdrawals are not possible
        }

        // Start of the main calculation
        while (iterations < iterationLimit) {
       
            // Ensure we don't withdraw more than the fund allows
            if (grossPensionWithdrawal >= fund || fund < 100) {
                grossPensionWithdrawal = fund;
                fundExhausted = true;
            }

            // Calculate tax-free portion
            if (age < earliestPensionWithdrawalAge || cumulativeTFC >= maxTFCAmount || alreadyRetired) {
                taxFreePortion = 0;
                remainingTFCPercent = 0;
            } else {
                taxFreePortion = grossPensionWithdrawal * remainingTFCPercent;

                // Adjust for cumulative TFC limit
                if (cumulativeTFC + taxFreePortion > maxTFCAmount) {
                    taxFreePortion = maxTFCAmount - cumulativeTFC;
                    remainingTFCPercent = (maxTFCAmount - cumulativeTFC) / grossPensionWithdrawal;
                    remainingTFCPercent = Math.max(remainingTFCPercent, 0);
                    if (ageWhenTFCMaxed === null) {
                        ageWhenTFCMaxed = age;
                    }
                }
            }

            // Taxable portion is anything above the tax-free portion
            taxablePortion = grossPensionWithdrawal - taxFreePortion;

            // Total taxable income (assuming personal allowance has not been exceeded yet)
            totalTaxableIncome = taxablePortion + statePensionInPayment + dbPensionInPayment;

            // Calculate tax
            totalTax = calculateIncomeTax(totalTaxableIncome, age, inflation, useScottishTax, startAge);
            statePensionTax = calculateIncomeTax(statePensionInPayment, age, inflation, useScottishTax, startAge);
            dbPensionTax = calculateIncomeTax(dbPensionInPayment, age, inflation, useScottishTax, startAge);
            taxPaidOnDCPension = totalTax - statePensionTax - dbPensionTax;
            taxPaidOnDCPension = Math.max(taxPaidOnDCPension, 0);

            // Net pension withdrawal after tax
            netPensionWithdrawal = grossPensionWithdrawal - taxPaidOnDCPension;

            // Adjust netPensionWithdrawal if it becomes negative due to tax exceeding gross withdrawal
            if (netPensionWithdrawal < 0) {
                // Adjust other pensions for tax
                statePensionAfterTax = statePensionInPayment - statePensionTax;
                dbPensionAfterTax = dbPensionInPayment - dbPensionTax;
                statePensionAfterTax = Math.max(statePensionAfterTax, 0);
                dbPensionAfterTax = Math.max(dbPensionAfterTax, 0);
                netPensionWithdrawal = 0;
            } else {
                // Net income from other pensions after tax
                statePensionAfterTax = statePensionInPayment - statePensionTax;
                dbPensionAfterTax = dbPensionInPayment - dbPensionTax;
            }

            // Step 2: Use ISA withdrawals to cover any shortfall
            var otherNetPensions = statePensionAfterTax + dbPensionAfterTax;
            var netIncomeNeededFromInvestments = inflationAdjustedTargetNetIncome - netPensionWithdrawal - otherNetPensions;

            // Ensure netIncomeNeededFromInvestments is not negative
            netIncomeNeededFromInvestments = Math.max(netIncomeNeededFromInvestments, 0);

            // Calculate ISA withdrawals needed
            maxAvailableISADrawings = ISA - minISABalance;
            maxAvailableISADrawings = Math.max(maxAvailableISADrawings, 0);

            ISADrawings = Math.min(netIncomeNeededFromInvestments, maxAvailableISADrawings);

            if (ISADrawings >= maxAvailableISADrawings) {
                ISAExhausted = true;
            }

            // Step 3: If ISA is exhausted and still shortfall, increase pension withdrawals
            if (netIncomeNeededFromInvestments > maxAvailableISADrawings && !fundExhausted) {
                // Need to increase pension withdrawals beyond tax-free limit
                // Adjust lower and upper guesses for bisection method
                lowerGuess = grossPensionWithdrawal;
                upperGuess = fund;

                while (iterations < iterationLimit) {
                    // Adjust grossPensionWithdrawal using bisection method
                    if (age < earliestPensionWithdrawalAge) {
                        grossPensionWithdrawal = 0; // Before age 57, pension withdrawals are not possible
                        showEarliestPensionAgeWarning = true;    
                    }
                    else {
                        grossPensionWithdrawal = (lowerGuess + upperGuess) / 2;
                    }

                    // Recalculate tax-free portion (may be zero if TFC is exhausted)
                    if (age < earliestPensionWithdrawalAge || cumulativeTFC >= maxTFCAmount || alreadyRetired) {
                        taxFreePortion = 0;
                        remainingTFCPercent = 0;
                    } else {
                        taxFreePortion = grossPensionWithdrawal * remainingTFCPercent;

                        // Adjust for cumulative TFC limit
                        if (cumulativeTFC + taxFreePortion > maxTFCAmount) {
                            taxFreePortion = maxTFCAmount - cumulativeTFC;
                            remainingTFCPercent = (maxTFCAmount - cumulativeTFC) / grossPensionWithdrawal;
                            remainingTFCPercent = Math.max(remainingTFCPercent, 0);
                            if (ageWhenTFCMaxed === null) {
                                ageWhenTFCMaxed = age;
                            }
                        }
                    }

                    taxablePortion = grossPensionWithdrawal - taxFreePortion;

                    // Recalculate total taxable income
                    totalTaxableIncome = taxablePortion + statePensionInPayment + dbPensionInPayment;

                    // Recalculate tax
                    totalTax = calculateIncomeTax(totalTaxableIncome, age, inflation, useScottishTax, startAge);
                    statePensionTax = calculateIncomeTax(statePensionInPayment, age, inflation, useScottishTax, startAge);
                    dbPensionTax = calculateIncomeTax(dbPensionInPayment, age, inflation, useScottishTax, startAge);
                    taxPaidOnDCPension = totalTax - statePensionTax - dbPensionTax;
                    taxPaidOnDCPension = Math.max(taxPaidOnDCPension, 0);

                    // Recalculate net pension withdrawal
                    netPensionWithdrawal = grossPensionWithdrawal - taxPaidOnDCPension;
                    netPensionWithdrawal = Math.max(0,netPensionWithdrawal);

                    // Recalculate net income from other pensions
                    statePensionAfterTax = statePensionInPayment - statePensionTax;
                    dbPensionAfterTax = dbPensionInPayment - dbPensionTax;
                    statePensionAfterTax = Math.max(statePensionAfterTax, 0);
                    dbPensionAfterTax = Math.max(dbPensionAfterTax, 0);

                    otherNetPensions = statePensionAfterTax + dbPensionAfterTax;

                    // Total net income
                    totalNetIncome = netPensionWithdrawal + otherNetPensions + ISADrawings;

                    // Shortfall calculation
                    var shortfall = totalNetIncome - inflationAdjustedTargetNetIncome;

                    if (Math.abs(shortfall) < tolerance) {
                        cumulativeTFC += taxFreePortion;
                        break;
                    }

                    if (totalNetIncome < inflationAdjustedTargetNetIncome) {
                        if (fundExhausted) {
                            // Can't increase withdrawals, accept lower income
                            cumulativeTFC += taxFreePortion;
                            break;
                        } else {
                            lowerGuess = grossPensionWithdrawal;
                        }
                    } else {
                        upperGuess = grossPensionWithdrawal;
                    }

                    iterations++;

                    // Ensure we don't withdraw more than the fund allows
                    if (grossPensionWithdrawal >= fund || fund < 100) {
                        grossPensionWithdrawal = fund;
                        fundExhausted = true;
                    }
                }
            } else {
                // Total net income calculation when ISA covers the shortfall
                totalNetIncome = netPensionWithdrawal + otherNetPensions + ISADrawings;

                 if (Math.abs(shortfall) < tolerance) {
                    cumulativeTFC += taxFreePortion;
                    break;
                }
            }

            // Update cumulative TFC
            cumulativeTFC += taxFreePortion;

            // Increment iterations
            iterations++;

            // Break the loop if funds are exhausted
            if (fundExhausted && ISAExhausted) {
                break;
            }
        }


        // Adjust fund balance
        fund = fund + investmentGain - grossPensionWithdrawal - fundChargesTaken;
        fund = Math.max(fund, 0);

        // ISA Growth (Charges are no longer applied to ISA)
        var ISAGain = ISA * fundGrowthPost;
        ISA = ISA + ISAGain - ISADrawings;
        ISA = Math.max(ISA, 0);

        taxSaved = taxFreePortion;
        if (shortfall < 0) {
            negativeShortfall = shortfall;
        }

        var finalShortfall = 
        + Math.max(0,
            inflationAdjustedDesiredIncome
            - netPensionWithdrawal 
            - (statePensionInPayment - statePensionTax) 
            - (dbPensionInPayment - dbPensionTax)    
            - ISADrawings
        )  ;

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
        }

        // Store for next iteration
        previousGrossPensionWithdrawal = grossPensionWithdrawal; 
        

        if (fund <= tolerance && ISAExhausted && dbPensionProjectionOnly == false && finalProjection==false) {
            // Funds depleted before end age
            if (age <= endAge) {
                fundsDepletedBeforeEndAge = true;
            }
            break; // Exit the loop early
        }
    }

    var finalBalance = fund + ISA;

    return {
        finalBalance: finalBalance,
        cashFlowData: cashFlowData,
        ageWhenTFCMaxed: ageWhenTFCMaxed,
        fundsDepletedBeforeEndAge: fundsDepletedBeforeEndAge,
        totalFundCharges: totalFundCharges // Return total fund charges
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

function calculateStatePension(currentAge, currentPension, statePensionInflation) {
    const pensionAge = getStatePensionAge(currentAge);

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


function plotChart(simulation) {
    var ctx = document.getElementById('fundChart').getContext('2d');
    var chartData = {
        labels: simulation.cashFlowData.map(data => data.age),
        datasets: [
            {
                label: 'Pension Fund Value (£)',
                data: simulation.cashFlowData.map(data => Math.round(data.closingBalance)),
                borderColor: '#1E88E5', // Brighter blue for the line
                backgroundColor: 'rgba(30, 136, 229, 0.2)', // Light blue with transparency
                fill: true,
                tension: 0.1
            },
            {
                label: 'ISA Holdings (£)',
                data: simulation.cashFlowData.map(data => Math.round(data.ISAholdings)),
                borderColor: '#FF8C00', // Brighter orange for the line
                backgroundColor: 'rgba(255, 140, 0, 0.2)', // Light orange 
                fill: true,
                tension: 0.1
            }
        ]
    };

    if (window.myLineChart) {
        window.myLineChart.destroy();
    }

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
                    enabled: true
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
                    beginAtZero: true
                }
            }
        }
    });
}

// New function to plot the income breakdown chart
function plotIncomeChart(simulation) {
    var ctx = document.getElementById('incomeChart').getContext('2d');
    var ages = simulation.cashFlowData.map(data => data.age);
    var netPensionWithdrawals = simulation.cashFlowData.map(data => data.withdrawal);
    var ISADrawings = simulation.cashFlowData.map(data => data.ISADrawings);
    var statePensions = simulation.cashFlowData.map(data => data.statePension);
    var dbPensions = simulation.cashFlowData.map(data => data.dbPension);

    // Only include ages in retirement
    var retirementData = simulation.cashFlowData.filter(data => data.age >= simulation.cashFlowData[0].age);

    ages = retirementData.map(data => data.age);
    netPensionWithdrawals = retirementData.map(data => Math.round(data.withdrawal / 12));
    ISADrawings = retirementData.map(data => Math.round(data.ISADrawings / 12));
    statePensions = retirementData.map(data => Math.round(data.statePension / 12));
    dbPensions = retirementData.map(data => Math.round(data.dbPension / 12));
    shortfall = retirementData.map(data => Math.round(data.shortfall / 12));



    if (window.myIncomeChart) {
        window.myIncomeChart.destroy();
    }

    window.myIncomeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ages,
            datasets: [
                {
                    label: 'DB Pension (£)',
                    data: dbPensions,
                    backgroundColor: '#9C27B0' // Purple
                },
                {
                    label: 'State Pension (£)',
                    data: statePensions,
                    backgroundColor: '#4CAF50' // Green
                },
                {
                    label: 'ISA Withdrawals (£)',
                    data: ISADrawings,
                    backgroundColor: '#FF9800' // Orange
                },
                {
                    label: 'Net Pension Withdrawals (£)',
                    data: netPensionWithdrawals,
                    backgroundColor: '#2196F3' // Blue
                },
                {
                    label: 'Shortfall (£)',
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
                    display: true, // Enables the title
                    text: 'Retirement Income Breakdown', // Your desired title text
                    
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
            }
        }
    });
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
        tdDBPension.textContent = '£' + formatNumber(Math.round(row.dbPension));
        tr.appendChild(tdDBPension);

        // 12. Tax Paid
        var tdTaxPaid = document.createElement('td');
        tdTaxPaid.textContent = '£' + formatNumber(Math.round(row.taxPaid));
        tr.appendChild(tdTaxPaid);

        

        // 14. TFC Tax Savings
        var tdTaxSaved = document.createElement('td');
        tdTaxSaved.textContent = '£' + formatNumber(Math.round(row.taxSaved));
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
    localStorage.setItem('currentAge', document.getElementById("currentAge").value);
    localStorage.setItem('retirementAge', document.getElementById("retirementAge").value);
    localStorage.setItem('endAge', document.getElementById("endAge").value);
    localStorage.setItem('currentFund', document.getElementById("currentFund").value);
    localStorage.setItem('monthlyContribution', document.getElementById("monthlyContribution").value);
    localStorage.setItem('stepUpAge', document.getElementById("stepUpAge").value);
    localStorage.setItem('stepUpContribution', document.getElementById("stepUpContribution").value);
    localStorage.setItem('desiredIncome', document.getElementById("desiredIncome").value); // Store without multiplying by 12
    localStorage.setItem('currentISA', document.getElementById("currentISA").value);
    localStorage.setItem('monthlyISAContribution', document.getElementById("monthlyISAContribution").value);
    localStorage.setItem('minISABalance', document.getElementById("minISABalance").value);
    localStorage.setItem('useScottishTax', document.getElementById("useScottishTax").checked);
    localStorage.setItem('dbPensionAmount', document.getElementById("dbPensionAmount").value);
    localStorage.setItem('dbPensionAge', document.getElementById("dbPensionAge").value);
    localStorage.setItem('fundGrowthPre', document.getElementById("fundGrowthPre").value);
    localStorage.setItem('fundGrowthPost', document.getElementById("fundGrowthPost").value);
    localStorage.setItem('fundCharges', document.getElementById("fundCharges").value);
    localStorage.setItem('taxFreeCashPercent', document.getElementById("taxFreeCashPercent").value);
    localStorage.setItem('inflation', document.getElementById("inflation").value);
    localStorage.setItem('applyInflationAdjustment', document.getElementById("applyInflationAdjustment").checked);
}

function retrieveInputsFromLocalStorage() {
    // Retrieve and populate input values
    if (localStorage.getItem('currentAge')) document.getElementById("currentAge").value = localStorage.getItem('currentAge');
    if (localStorage.getItem('retirementAge')) document.getElementById("retirementAge").value = localStorage.getItem('retirementAge');
    if (localStorage.getItem('endAge')) document.getElementById("endAge").value = localStorage.getItem('endAge');
    if (localStorage.getItem('currentFund')) document.getElementById("currentFund").value = localStorage.getItem('currentFund');
    if (localStorage.getItem('monthlyContribution')) document.getElementById("monthlyContribution").value = localStorage.getItem('monthlyContribution');
    if (localStorage.getItem('stepUpAge')) document.getElementById("stepUpAge").value = localStorage.getItem('stepUpAge');
    if (localStorage.getItem('stepUpContribution')) document.getElementById("stepUpContribution").value = localStorage.getItem('stepUpContribution');
    if (localStorage.getItem('desiredIncome')) document.getElementById("desiredIncome").value = localStorage.getItem('desiredIncome');
    if (localStorage.getItem('currentISA')) document.getElementById("currentISA").value = localStorage.getItem('currentISA');
    if (localStorage.getItem('monthlyISAContribution')) document.getElementById("monthlyISAContribution").value = localStorage.getItem('monthlyISAContribution');
    if (localStorage.getItem('minISABalance')) document.getElementById("minISABalance").value = localStorage.getItem('minISABalance');
    if (localStorage.getItem('useScottishTax')) document.getElementById("useScottishTax").checked = (localStorage.getItem('useScottishTax') === 'true');
    if (localStorage.getItem('dbPensionAmount')) document.getElementById("dbPensionAmount").value = localStorage.getItem('dbPensionAmount');
    if (localStorage.getItem('dbPensionAge')) document.getElementById("dbPensionAge").value = localStorage.getItem('dbPensionAge');
    if (localStorage.getItem('fundGrowthPre')) document.getElementById("fundGrowthPre").value = localStorage.getItem('fundGrowthPre');
    if (localStorage.getItem('fundGrowthPost')) document.getElementById("fundGrowthPost").value = localStorage.getItem('fundGrowthPost');
    if (localStorage.getItem('fundCharges')) document.getElementById("fundCharges").value = localStorage.getItem('fundCharges');
    if (localStorage.getItem('taxFreeCashPercent')) document.getElementById("taxFreeCashPercent").value = localStorage.getItem('taxFreeCashPercent');
    if (localStorage.getItem('inflation')) document.getElementById("inflation").value = localStorage.getItem('inflation');
    if (localStorage.getItem('applyInflationAdjustment')) document.getElementById("applyInflationAdjustment").checked = (localStorage.getItem('applyInflationAdjustment') === 'true');
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
