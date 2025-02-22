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

// Get all input fields - THIS LISTENS FOR ANY CLICKS
var inputFields = document.querySelectorAll('input');

document.addEventListener('DOMContentLoaded', function() {
   
    
    saveAndCalc();
    
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
    //updateTableVisibility();
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

            var prefix = "";
            var desiredIncomePrefix = "";
            if (applyInflationAdjustment) {
                desiredIncomePrefix = `Today\'s Money Value of ${prefix}`;
            } else {
                desiredIncomePrefix = `Future Value of ${prefix}`;
            }
            
            if (applyInflationAdjustment)  { /*todays money values*/

                plotIncomeChart(todaysMoneyCashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                plotTaxBreakdownChart(todaysMoneyCashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);
                plotChargesChart(todaysMoneyCashFlowData, 12, applyInflationAdjustment, prefix, phoneFormat, planAsCouple);
                plotFundChart(cashFlowData, phoneFormat, planAsCouple);
            
    
            }  else { /*not todays money values*/
    
                plotIncomeChart(cashFlowData, frequencyMultiplier, applyInflationAdjustment, prefix, planAsCouple, phoneFormat, retirementAge, dontResizeChart,incomeType);
                plotTaxBreakdownChart(cashFlowData,12, applyInflationAdjustment, prefix, phoneFormat, retirementAge, planAsCouple);
                plotChargesChart(cashFlowData, 12, applyInflationAdjustment, prefix, phoneFormat, planAsCouple);
                plotFundChart(cashFlowData, phoneFormat, planAsCouple);
            
    
            }
        
            
            if (planAsCouple) {
                plotCouplesFundChart(simulation1.cashFlowData, simulation2.cashFlowData);
            } 
    
      
    
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
    

    
    
    
    window.updateChartVisibility = function(source) {


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
        if (selectedChart === "fund") {
            applyInflationAdjustmentPhone.checked = false;
            fundChartContainer.classList.remove("hidden");
            saveAndCalc();
            //updateTableVisibility();
        } else if (selectedChart === "income") {
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
        } else if (selectedChart === "tax") {
            //applyInflationAdjustmentPhone.checked = true;
            taxChartContainer.classList.remove("hidden");
            saveAndCalc();
        } else if (selectedChart === "charges") {
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
    
    




