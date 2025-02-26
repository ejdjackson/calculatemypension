

// Save input values from phone-specific elements to local storage
function saveInputsToLocalStoragePhone() {
    // Helper function to get raw value from formatted text
    function getRawValueFromText(text) {
        return text.replace(/[£,]/g, '').replace(/%/g, '').trim();
    }

    // List of input elements and their corresponding localStorage keys (User)
    const inputs = [
        { elementId: 'grossIncomePhone', storageKey: 'grossIncome' },
      
    
    ];

 

    // Iterate over inputs and save their raw values
    inputs.forEach(({ elementId, storageKey }) => {
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

    const pensionIncomeSwitch = document.getElementById('pensionIncomeSwitch');
    if (pensionIncomeSwitch) {
        const isChecked = pensionIncomeSwitch.checked;
        saveToLocalStorage('pensionIncome', isChecked);
    }

    const monthlySwitch = document.getElementById('monthlySwitch');
    if (monthlySwitch) {
        const isChecked = monthlySwitch.checked;
        saveToLocalStorage('monthly', isChecked);
    }
   
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
    initialiseInputAndSlider('grossIncomePhone', 'grossIncome', 'grossIncomeSlider', 'currency');
  

    
    // Set checkboxes
    const useScottishTaxSwitch = document.getElementById('useScottishTaxSwitch');
    if (useScottishTaxSwitch) {
        useScottishTaxSwitch.checked = localStorage.getItem('useScottishTax') === 'true';
    } 

    const pensionIncomeSwitch = document.getElementById('pensionIncomeSwitch');
    if (pensionIncomeSwitch) {
        pensionIncomeSwitch.checked = localStorage.getItem('pensionIncome') === 'true';
    } 

    /* const monthlySwitch = document.getElementById('monthlySwitch');
    if (monthlySwitch) {
        monthlySwitch.checked = localStorage.getItem('monthly') === 'true';
    } */

    
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



function initialiseLocalStorageValues() {
    const defaults = {
        
        grossIncome: 100000
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





// Map of sliders to output boxes
const sliderToOutputMap = {
    'grossIncomeSlider': 'grossIncomePhone',
    
    
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
                } else if (outputId.endsWith('Phone') && !outputId.includes('Age')) {
                    formatType = 'currency';
                }

                // Update the output box
                updateOutput(outputId, value, formatType);

                saveInputsToLocalStoragePhone();
                
                
            });
        }
    });
}

// Call the function to set up slider listeners
setupSliderListeners();



document.addEventListener('DOMContentLoaded', function() {

    initialiseLocalStorageValues();
    initialiseInitialInputsAndCheckboxes();

    const pensionIncomeSwitch = document.getElementById('pensionIncomeSwitch');
    if (pensionIncomeSwitch) {
        pensionIncomeSwitch.addEventListener('change', function() {
            saveToLocalStorage('pensionIncome', this.checked);
            
        });
    }
    
    const useScottishTaxSwitch = document.getElementById('useScottishTaxSwitch');
    if (useScottishTaxSwitch) {
        useScottishTaxSwitch.addEventListener('change', function() {
            saveToLocalStorage('useScottishTax', this.checked);
            
        });
    }
    
});


 // Function copied from listeners
 function updateOutput(outputId, value, formatType) {
    const outputElement = document.getElementById(outputId);
    if (outputElement) {
        outputElement.textContent = formatNumber(value, formatType);
        

        
    }
}

// Also from listeners
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

        if (outputBoxId === 'grossIncomePhone') {
            // Update the slider value
            const slider = document.getElementById('grossIncomeSlider');
            slider.value = currentValue;
        }

       

        // Trigger save and calculation logic
        calculateTax();
    }
}


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

// Fixed ages for now (both currentAge and age are 50)
const currentAge = 50;
const age = 50;

// Toggle Annual/Monthly mode
function toggleMode() {
  const monthlyMode = document.getElementById("monthlySwitch").checked;
  
}

// Utility: Update output element and trigger recalculation
function updateValue(outputId, value) {
  document.getElementById(outputId).innerText = value;
}

// Utility: Adjust slider value by step amount
function adjustValue(outputId, step) {
  let sliderId = "";
  if (outputId === "grossIncomePhone") { sliderId = "grossIncomeSlider"; }
  const slider = document.getElementById(sliderId);
  slider.value = Number(slider.value) + step;
  updateValue(outputId, slider.value);
  calculateTax();
}

// Main calculation function
function calculateTax() {

    // Determine annual or monthly mode
    //const monthlyMode = document.getElementById("monthlySwitch").checked;
    const multiplier = 1; //monthlyMode ? 1/12 : 1;

    // Gross Income (entered as an annual figure; multiplier applied as needed)
    var grossIncome = parseFloat(document.getElementById("grossIncomeSlider").value);

    // Options from checkboxes
    const useScottishTax = document.getElementById("useScottishTaxSwitch").checked;
    const isPensionIncome = document.getElementById("pensionIncomeSwitch").checked;

    // If income is pension income, NI is not due.
    const includeNI = !isPensionIncome;

    // Fixed ages for now
    const age = 50, currentAge = 50;
    // Example inflation rate for indexation (adjust as needed)
    const inflation = 0.03;

    // Call calculateIncomeTax from model.js (which already applies the personal allowance erosion rules)
    let result = calculateIncomeTax(grossIncome, age, inflation, useScottishTax, currentAge, includeNI);

    let tax = 0, NI = 0, totalDeduction = 0;
    if (typeof result === "object") {
        tax = result.tax * multiplier;
        NI = result.nationalInsurance * multiplier;
        totalDeduction = result.totalDeduction * multiplier;
    } else {
        tax = result * multiplier;
        NI = 0;
        totalDeduction = result * multiplier;
    }

    grossIncome = grossIncome * multiplier;
    const netIncome = grossIncome - totalDeduction;

    // Build detailed breakdown
    let details = "";
    // Original Personal Allowance (for 2024/25, for example)
    //const originalPA = 12570 ;

    const originalPA = calcPersonalAllowance(50,50,0);

    let adjustedPersonalAllowance = originalPA;

    let erosionDetails = "";
    details += `Gross Income: £${formatNumber(grossIncome.toFixed(0))}\n`;
    if (grossIncome > 100000) {
        // For every £2 above 100k, reduce PA by £1, but never more than the original PA.
        let reduction = Math.min((grossIncome - 100000) / 2, originalPA);
        adjustedPersonalAllowance = originalPA - reduction;
        erosionDetails = `Personal Allowance Erosion:\n  Income above £100k: £${formatNumber((grossIncome - 100000).toFixed(0))}\n  Reduction: £${formatNumber(reduction.toFixed(0))}\n  Adjusted Personal Allowance: £${formatNumber(adjustedPersonalAllowance.toFixed(0))}\n`;
    } else {
        //erosionDetails = `Personal Allowance (No erosion): £${formatNumber(adjustedPersonalAllowance.toFixed(0))}\n`;
        details += `Personal Allowance: £${formatNumber(originalPA.toFixed(0))}\n`;
    }



    details += erosionDetails;

    // Taxable income computed using the adjusted personal allowance
    const taxableIncome = Math.max(0, grossIncome - adjustedPersonalAllowance);
    details += `Taxable Income: £${formatNumber(taxableIncome.toFixed(0))}\n\n`;

    if (!useScottishTax) {
        // UK Tax Bands
        const basicLimit = 50270 * multiplier;
        const higherLimit = 125140 * multiplier;
        details += `Using UK tax bands:\n`;
        details += `- Basic Rate (20%) up to £${formatNumber(basicLimit.toFixed(0))}\n`;
        details += `- Higher Rate (40%) up to £${formatNumber(higherLimit.toFixed(0))}\n`;
        details += `- Additional Rate (45%) above that\n\n`;
        
        let remaining = taxableIncome;
        if (remaining > 0) {
            const basicTaxable = Math.min(remaining, basicLimit - adjustedPersonalAllowance);
            details += `20% of £${formatNumber(basicTaxable.toFixed(0))} = £${formatNumber((basicTaxable * 0.20).toFixed(0))}\n`;
            remaining -= basicTaxable;
        }
        if (remaining > 0) {
            const higherTaxable = Math.min(remaining, higherLimit - basicLimit);
            details += `40% of £${formatNumber(higherTaxable.toFixed(0))} = £${formatNumber((higherTaxable * 0.40).toFixed(0))}\n`;
            remaining -= higherTaxable;
        }
        if (remaining > 0) {
            details += `45% of £${formatNumber(remaining.toFixed(0))} = £${formatNumber((remaining * 0.45).toFixed(0))}\n`;
        }
        
        // NI Calculation (if not pension income)
        if (includeNI) {
            const PT = 12570 * multiplier;
            const UEL = 50270 * multiplier;
            details += `\nNI thresholds:\n- Primary Threshold: £${formatNumber(PT.toFixed(0))}\n- Upper Earnings Limit: £${formatNumber(UEL.toFixed(0))}\n`;
            if (grossIncome > PT) {
                let niEarnings = Math.min(grossIncome, UEL) - PT;
                details += `\n8% of £${formatNumber(niEarnings.toFixed(0))} = £${formatNumber((niEarnings * 0.08).toFixed(0))}\n`;
                if (grossIncome > UEL) {
                    const aboveUEL = grossIncome - UEL;
                    details += `2% of £${formatNumber(aboveUEL.toFixed(0))} = £${formatNumber((aboveUEL * 0.02).toFixed(0))}\n`;
                }
            }
        }
    } else {
        // Scottish Tax Bands
        const band1 = 14732 * multiplier;
        const band2 = 25688 * multiplier;
        const band3 = 43662 * multiplier;
        const band4 = 125140 * multiplier;
        details += `Using Scottish tax bands:\n`;
        details += `- Starter Rate (19%) up to £${formatNumber(band1.toFixed(0))}\n`;
        details += `- Basic Rate (20%) up to £${formatNumber(band2.toFixed(0))}\n`;
        details += `- Intermediate Rate (21%) up to £${formatNumber(band3.toFixed(0))}\n`;
        details += `- Higher Rate (42%) up to £${formatNumber(band4.toFixed(0))}\n`;
        details += `- Top Rate (47%) above that\n\n`;
        
        let remaining = taxableIncome;
        if (remaining > 0) {
            const taxable1 = Math.min(remaining, band1 - adjustedPersonalAllowance);
            details += `19% of £${formatNumber(taxable1.toFixed(0))} = £${formatNumber((taxable1 * 0.19).toFixed(0))}\n`;
            remaining -= taxable1;
        }
        if (remaining > 0) {
            const taxable2 = Math.min(remaining, band2 - band1);
            details += `20% of £${formatNumber(taxable2.toFixed(0))} = £${formatNumber((taxable2 * 0.20).toFixed(0))}\n`;
            remaining -= taxable2;
        }
        if (remaining > 0) {
            const taxable3 = Math.min(remaining, band3 - band2);
            details += `21% of £${formatNumber(taxable3.toFixed(0))} = £${formatNumber((taxable3 * 0.21).toFixed(0))}\n`;
            remaining -= taxable3;
        }
        if (remaining > 0) {
            const taxable4 = Math.min(remaining, band4 - band3);
            details += `42% of £${formatNumber(taxable4.toFixed(0))} = £${formatNumber((taxable4 * 0.42).toFixed(0))}\n`;
            remaining -= taxable4;
        }
        if (remaining > 0) {
            details += `47% of £${formatNumber(remaining.toFixed(0))} = £${formatNumber((remaining * 0.47).toFixed(0))}\n`;
        }
        
        // NI Calculation (if not pension income)
        if (includeNI) {
            const PT = 12570 * multiplier;
            const UEL = 50270 * multiplier;
            details += `\nNI thresholds:\n- Primary Threshold: £${formatNumber(PT.toFixed(0))}\n- Upper Earnings Limit: £${formatNumber(UEL.toFixed(0))}\n`;
            if (grossIncome > PT) {
                let niEarnings = Math.min(grossIncome, UEL) - PT;
                details += `\n8% NI of £${formatNumber(niEarnings.toFixed(0))} = £${formatNumber((niEarnings * 0.08).toFixed(0))}\n`;
                if (grossIncome > UEL) {
                    const aboveUEL = grossIncome - UEL;
                    details += `2% NI of £${formatNumber(aboveUEL.toFixed(0))} = £${formatNumber((aboveUEL * 0.02).toFixed(0))}\n`;
                }
            }
        }
    }
    if (includeNI) {
        details += `\nNet Income = Gross Income - Tax - NI = £${formatNumber(netIncome.toFixed(0))}`;
    } else {
        details += `\nNet Income = Gross Income - Tax = £${formatNumber(netIncome.toFixed(0))}`;
    }


    // Update UI outputs
    document.getElementById("taxOutput").innerText = "£" + formatNumber(tax.toFixed(0));
    document.getElementById("niOutput").innerText = isPensionIncome ? "£0" : "£" + formatNumber(NI.toFixed(0));
    document.getElementById("netOutput").innerText = "£" + formatNumber(netIncome.toFixed(0));
    document.getElementById("calculationDetails").innerText = details;
}

window.onload = function() {
    calculateTax();
};
    
    
    
    