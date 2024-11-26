
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the value from localStorage and check if it's the user's first visit
    
    initialiseInitialInputsAndCheckboxesPhone();
    restoreSelectedRetirementIncomeStandardOption();
    
});

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('input', saveAllInputsToLocalStoragePhone);
    });
});




    
    

function saveToLocalStorage(key, value) {
    // Store the value in localStorage, converting booleans for checkboxes
    localStorage.setItem(key, typeof value === "boolean" ? value : value.toString());
  }


/* function saveAllInputsToLocalStoragePhone() {
    saveToLocalStorage("currentAge", document.getElementById("currentAgePhone").value);
    saveToLocalStorage("currentFund", document.getElementById("currentFundPhone").value);
    saveToLocalStorage("monthlyContribution", document.getElementById("inputMonthlyContributionPhone").value);
    saveToLocalStorage("retirementAge", document.getElementById("inputRetirementAgePhone").value);
    saveToLocalStorage("desiredIncome", document.getElementById("inputDesiredIncomePhone").value);
    saveToLocalStorage("taxFreeCashPercent", document.getElementById("inputTaxFreeCashPercentPhone").value);
    saveToLocalStorage("currentISA", document.getElementById("currentISAPhone").value);
    saveToLocalStorage("monthlyISAContribution", document.getElementById("inputMonthlyISAContributionPhone").value);
    saveToLocalStorage("dbPensionAmount", document.getElementById("dbPensionAmountPhone").value);
    saveToLocalStorage("dbPensionAge", document.getElementById("dbPensionAgePhone").value);
   
} */





  function isPensionAgeBoundary(birthYear, birthMonth, birthDay) {
    // Pension boundary dates
    const pensionBoundaries = [
        { year: 1954, month: 10, day: 6 },  // Start of transition from 65 to 66
        { year: 1960, month: 4, day: 6 },   // Start of transition from 66 to 67
        { year: 1961, month: 3, day: 6 },   // End of transition to 67
        { year: 1977, month: 4, day: 6 },   // Start of transition from 67 to 68
        { year: 1978, month: 4, day: 6 }    // Fixed at 68
    ];

    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

    for (const boundary of pensionBoundaries) {
        const boundaryDate = new Date(boundary.year, boundary.month - 1, boundary.day);

        // Calculate the difference in days
        const timeDifference = Math.abs(birthDate - boundaryDate);
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

        if (dayDifference <= 1) {
            return true;
        }
    }
    return false;
}




function initialiseInitialInputsAndCheckboxesPhone() {
    // Check for each input field, if no localStorage value exists, use the initial HTML value
   
    if (localStorage.getItem('monthlyContribution')) {
      document.getElementById('inputMonthlyContributionPhone').value = localStorage.getItem('monthlyContribution');
    }

    if (localStorage.getItem('monthlyISAContribution')) {
        document.getElementById('inputMonthlyISAContributionPhone').value = localStorage.getItem('monthlyISAContribution');
    }

    if (localStorage.getItem('retirementAge')) {
        document.getElementById('inputRetirementAgePhone').value = localStorage.getItem('retirementAge');
    }

    if (localStorage.getItem('desiredIncome')) {
        document.getElementById('inputDesiredIncomePhone').value = localStorage.getItem('desiredIncome');
    }

    if (localStorage.getItem('taxFreeCashPercent')) {
        document.getElementById('inputTaxFreeCashPercentPhone').value = localStorage.getItem('taxFreeCashPercent');
    }
    
    if (localStorage.getItem('currentAge')) {
        document.getElementById('currentAgePhone').value = localStorage.getItem('currentAge');
    }
    
    if (localStorage.getItem('currentFund')) {
        document.getElementById('currentFundPhone').value = localStorage.getItem('currentFund');
    }
    
    if (localStorage.getItem('currentISA')) {
        document.getElementById('currentISAPhone').value = localStorage.getItem('currentISA');
    }
    
    if (localStorage.getItem('dbPensionAmount')) {
        document.getElementById('dbPensionAmountPhone').value = localStorage.getItem('dbPensionAmount');
    }
    
    if (localStorage.getItem('dbPensionAge')) {
        document.getElementById('dbPensionAgePhone').value = localStorage.getItem('dbPensionAge');
    }

     
    
}



document.querySelectorAll('input[name="togglePhone"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      console.log('Selected:', event.target.value);
      // Add your logic here to handle the selected option
    });
  });
  

  document.querySelectorAll('input[name="togglePhone"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        updateRetirementLivingStandardsSelector(event);
    });
  });
  



  function restoreSelectedRetirementIncomeStandardOption() {
    const selectedOption = localStorage.getItem('selectedRetirementIncomeStandardOption');
    if (selectedOption) {
      // Find the radio input with the saved value and check it
      const toggleInput = document.querySelector(`input[name="togglePhone"][value="${selectedOption}"]`);
      if (toggleInput) {
        toggleInput.checked = true;
        console.log(`Restored selected option: ${selectedOption}`);
      }
    }
  }