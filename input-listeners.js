
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
    saveToLocalStorage("currentFund", document.getElementById("currentFund").value);
    saveToLocalStorage("monthlyContribution", document.getElementById("inputMonthlyContribution").value);
    saveToLocalStorage("retirementAge", document.getElementById("inputRetirementAge").value);
    saveToLocalStorage("desiredIncome", document.getElementById("inputDesiredIncome").value);
    saveToLocalStorage("taxFreeCashPercent", document.getElementById("inputTaxFreeCashPercent").value);
    saveToLocalStorage("currentISA", document.getElementById("currentISA").value);
    saveToLocalStorage("monthlyISAContribution", document.getElementById("inputMonthlyISAContribution").value);
    saveToLocalStorage("dbPensionAmount", document.getElementById("dbPensionAmount").value);
    saveToLocalStorage("dbPensionAge", document.getElementById("dbPensionAge").value);
    saveToLocalStorage("birthdayCheck", document.getElementById("birthdayCheck").checked);
    /* var test = document.getElementById("birthdayCheck").checked;
    saveToLocalStorage("statePensionAge", calculateStatePensionAge(document.getElementById("currentAge").value, document.getElementById("birthdayCheck").checked)); */
}




 // Listen for changes on the age input box
 function toggleCheckboxVisibility() {
    const ageInput = document.getElementById('currentAge');
    const checkboxGroup = document.getElementById('checkboxGroup');
    // Check if the input has a value and is valid
    if (isPensionAgeBoundary(ageInput.value)) {
      // Reveal the checkbox
      checkboxGroup.classList.remove("hidden");
    } else {
      // Hide the checkbox if input is invalid or cleared
      checkboxGroup.classList.add("hidden");
    }
  }
  
  document.getElementById('currentAge').addEventListener("input", toggleCheckboxVisibility);


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







 /* function calculateStatePensionAge(age, isBirthdayBeforeApril6) {
    let pensionAge;

    // Current date to determine the calculation base year
    const currentYear = new Date().getFullYear();

    // Calculate the year of birth based on age and whether birthday is before April 6
    const birthYear = currentYear - age - (isBirthdayBeforeApril6 ? 0 : 1);

    if (birthYear < 1954 || (birthYear === 1954 && isBirthdayBeforeApril6)) {
        // Born before 6 Oct 1954 - pension age is 66
        pensionAge = 66;
    } else if (birthYear < 1960 || (birthYear === 1960 && isBirthdayBeforeApril6)) {
        // Born between 6 Oct 1954 and 5 Apr 1960 - pension age is 66
        pensionAge = 66;
    } else if (birthYear < 1961 || (birthYear === 1961 && isBirthdayBeforeApril6)) {
        // Born between 6 Apr 1960 and 5 Mar 1961 - incremental to 67
        const monthsToAdd = birthYear === 1960 ? 12 - (isBirthdayBeforeApril6 ? 4 : 5) : 0;
        pensionAge = 66 + Math.ceil(monthsToAdd / 12);
    } else if (birthYear < 1977 || (birthYear === 1977 && isBirthdayBeforeApril6)) {
        // Born between 6 Mar 1961 and 5 Apr 1977 - pension age is 67
        pensionAge = 67;
    } else if (birthYear < 1978 || (birthYear === 1978 && isBirthdayBeforeApril6)) {
        // Born between 6 Apr 1977 and 5 Apr 1978 - incremental to 68
        const monthsToAdd = birthYear === 1977 ? 12 - (isBirthdayBeforeApril6 ? 4 : 5) : 0;
        pensionAge = 67 + Math.ceil(monthsToAdd / 12);
    } else {
        // Born after 6 Apr 1978 - pension age is 68
        pensionAge = 68;
    }

    // Calculate the pension year
    const pensionYear = birthYear + pensionAge;
    return pensionAge;
} */


  




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

   /*  if (localStorage.getItem('birthdayCheck')) {
        document.getElementById('birthdayCheck').checked = localStorage.getItem('birthdayCheck');
    }
    
    toggleCheckboxVisibility(); */
    
}





