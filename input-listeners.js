
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the value from localStorage and check if it's the user's first visit
    initialiseInitialInputsAndCheckboxes();
});

function saveToLocalStorage(key, value) {
    // Store the value in localStorage, converting booleans for checkboxes
    localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
  }


function saveAllInputsToLocalStorage() {
    saveToLocalStorage("currentAge", document.getElementById("currentAge").value);
    saveToLocalStorage("retirementAge", document.getElementById("inputRetirementAge").value);
    saveToLocalStorage("currentFund", document.getElementById("currentFund").value);
    saveToLocalStorage("monthlyContribution", document.getElementById("inputMonthlyContribution").value);
    saveToLocalStorage("retirementAge", document.getElementById("inputRetirementAge").value);
    saveToLocalStorage("desiredIncome", document.getElementById("inputDesiredIncome").value);
    saveToLocalStorage("taxFreeCashPercent", document.getElementById("inputTaxFreeCashPercent").value);
    saveToLocalStorage("currentISA", document.getElementById("currentISA").value);
    saveToLocalStorage("monthlyISAContribution", document.getElementById("inputMonthlyISAContribution").value);
    saveToLocalStorage("dbPensionAmount", document.getElementById("dbPensionAmount").value);
    saveToLocalStorage("dbPensionAge", document.getElementById("dbPensionAge").value);
}





document.addEventListener('DOMContentLoaded', () => {
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', saveAllInputsToLocalStorage);
});
});


function initialiseInitialInputsAndCheckboxes() {
    // Check for each input field, if no localStorage value exists, use the initial HTML value
    


    if (localStorage.getItem('monthlyContribution')) {
      document.getElementById('inputMonthlyContribution').value = localStorage.getItem('monthlyContribution');
    }

    if (localStorage.getItem('monthlyISAContribution')) {
        document.getElementById('inputMonthlyISAContribution').value = localStorage.getItem('monthlyISAContribution');
    }

    if (localStorage.getItem('retirementAge')) {
        document.getElementById('inputRetirementAge').value = localStorage.getItem('retirementAge');
    }

    if (localStorage.getItem('desiredIncome')) {
        document.getElementById('inputDesiredIncome').value = localStorage.getItem('desiredIncome');
    }

    if (localStorage.getItem('taxFreeCashPercent')) {
        document.getElementById('inputTaxFreeCashPercent').value = localStorage.getItem('taxFreeCashPercent');
    }
    if (localStorage.getItem('currentAge')) {
        document.getElementById('currentAge').value = localStorage.getItem('currentAge');
    }
    
    if (localStorage.getItem('currentFund')) {
        document.getElementById('currentFund').value = localStorage.getItem('currentFund');
    }
    
    if (localStorage.getItem('currentISA')) {
        document.getElementById('currentISA').value = localStorage.getItem('currentISA');
    }
    
    if (localStorage.getItem('dbPensionAmount')) {
        document.getElementById('dbPensionAmount').value = localStorage.getItem('dbPensionAmount');
    }
    
    if (localStorage.getItem('dbPensionAge')) {
        document.getElementById('dbPensionAge').value = localStorage.getItem('dbPensionAge');
    }
    

}





