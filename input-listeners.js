
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the value from localStorage and check if it's the user's first visit
    
    initialiseInitialInputsAndCheckboxes();
    toggleCheckboxVisibility();
    
});

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('input', saveAllInputsToLocalStorage);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const planAsCouple = document.getElementById('planAsCouple');
    saveToLocalStorage("planAsCouple", document.getElementById("planAsCouple").checked);
    planAsCouple.addEventListener('change', function() {
        this.checked ? showPartnerInputs() : hidePartnerInputs();
    });
    planAsCouple.checked ? showPartnerInputs() : hidePartnerInputs();

    const alreadyRetired = document.getElementById('alreadyRetired');
    saveToLocalStorage("alreadyRetired", document.getElementById("alreadyRetired").checked);
    alreadyRetired.addEventListener('change', function() {
        this.checked ? showAlreadyRetiredInputs() : hideAlreadyRetiredInputs();
    });
    alreadyRetired.checked ? showAlreadyRetiredInputs() : hideAlreadyRetiredInputs();
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
    saveToLocalStorage("planAsCouple", document.getElementById("planAsCouple").checked);
    saveToLocalStorage("alreadyRetired", document.getElementById("alreadyRetired").checked);
  
    saveToLocalStorage("currentAgePartner", document.getElementById("currentAgePartner").value);
    saveToLocalStorage("currentFundPartner", document.getElementById("currentFundPartner").value);
    saveToLocalStorage("currentISAPartner", document.getElementById("currentISAPartner").value);
    saveToLocalStorage("dbPensionAmountPartner", document.getElementById("dbPensionAmountPartner").value);
    saveToLocalStorage("dbPensionAgePartner", document.getElementById("dbPensionAgePartner").value);
    saveToLocalStorage("monthlyContributionPartner", document.getElementById("inputMonthlyContributionPartner").value);
    saveToLocalStorage("monthlyISAContributionPartner", document.getElementById("inputMonthlyISAContributionPartner").value);
    saveToLocalStorage("reversionaryBenefitPercentagePartner", document.getElementById("reversionaryBenefitPercentagePartner").value);
    saveToLocalStorage("desiredCombinedIncome", document.getElementById("inputDesiredCombinedIncome").value);
    
    
}



 // Listen for changes on the age input box
 function toggleCheckboxVisibility() {
 
    saveAllInputsToLocalStorage();
    var planAsCouple = false;
    if (localStorage.getItem('planAsCouple') === "true") {
        planAsCouple = true;
    } 
    if (planAsCouple) {
        showPartnerInputs();
    } else {
        hidePartnerInputs();
    }
    

    var alreadyRetired = false;
    if (localStorage.getItem('alreadyRetired') === "true") {
        alreadyRetired = true;
    } 
    if (alreadyRetired) {
        showAlreadyRetiredInputs();
    } else {
        hideAlreadyRetiredInputs();
    }
    return planAsCouple, alreadyRetired;
     
  }

  function showAlreadyRetiredInputs() {
    const futureContributionsContainer = document.getElementById('futureContributionsContainer');
    const inputDesiredRetirementAge = document.getElementById('inputDesiredRetirementAge');
    const inputTFCDiv = document.getElementById('inputTFCDiv');
    const retirementIncomeAdvice = document.getElementById('retirementIncomeAdvice');
    
      
    futureContributionsContainer.classList.remove('visible');
    futureContributionsContainer.classList.add('hidden');
    inputDesiredRetirementAge.classList.remove('visible');
    inputDesiredRetirementAge.classList.add('hidden');
    inputTFCDiv.classList.remove('visible');
    inputTFCDiv.classList.add('hidden');
    retirementIncomeAdvice.textContent = "As you have already retired, you will have a good idea of what your income needs are. Please enter the amount of income you need each month after tax.";
  }

  function hideAlreadyRetiredInputs () {
    const futureContributionsContainer = document.getElementById('futureContributionsContainer');
    const inputDesiredRetirementAge = document.getElementById('inputDesiredRetirementAge');
    const inputTFCDiv = document.getElementById('inputTFCDiv');
    
    futureContributionsContainer.classList.remove('hidden');
    futureContributionsContainer.classList.add('visible');
    inputDesiredRetirementAge.classList.remove('hidden');
    inputDesiredRetirementAge.classList.add('visible');
    inputTFCDiv.classList.remove('hidden');
    inputTFCDiv.classList.add('visible');
  }


  function showPartnerInputs() {
    const currentSituationContainer = document.getElementById('currentSituationContainer');
    const retirementGoalsContainer = document.getElementById('retirementGoalsContainer');
    const futureContributionsContainer = document.getElementById('futureContributionsContainer');
    const dbPensionsContainer = document.getElementById('dbPensionsContainer');
    const CouplesTFC = document.getElementById('CouplesTFC');
     
    const currentSituationPartner = document.getElementById('currentSituationPartner');
    const futureContributionsPartner = document.getElementById('futureContributionsPartner');
    const DBPensionPartner = document.getElementById('DBPensionPartner');
    const reversionaryBenefit = document.getElementById('reversionaryBenefit');
    const inputDesiredCombinedIncome = document.getElementById('inputDesiredCombinedIncomeDiv');
    const inputDesiredIncome = document.getElementById('inputDesiredIncomeDiv');

    
 
    setTimeout(() => { //Set pause
        currentSituationContainer.style.width = '70%';
        currentSituationContainer.style.height = '60%';
        retirementGoalsContainer.style.height = '60%';
        futureContributionsContainer.style.width = '70%';
        dbPensionsContainer.style.width = '70%';
        
        if (window.innerWidth <= 1024) { // 768px is a common breakpoint for tablets and phones
            currentSituationContainer.style.width = '99%';
            currentSituationContainer.style.height = '110%';
            futureContributionsContainer.style.width = '99%';
            futureContributionsContainer.style.height = '94%';
            retirementGoalsContainer.style.width = '99%';
            retirementGoalsContainer.style.height = '97%';
            dbPensionsContainer.style.width = '99%';
            dbPensionsContainer.style.height = '94%';
          } 

        CouplesTFC.classList.remove('hidden');
        CouplesTFC.classList.add('visible');
        currentSituationPartner.classList.remove('hidden');
        currentSituationPartner.classList.add('visible');
        currentSituationPartner.classList.add('ensure-visible');
        futureContributionsPartner.classList.remove('hidden');
        futureContributionsPartner.classList.add('visible');
        DBPensionPartner.classList.remove('hidden');
        DBPensionPartner.classList.add('visible');
        inputDesiredCombinedIncome.classList.remove('hidden');
        inputDesiredCombinedIncome.classList.add('visible');
        inputDesiredIncome.classList.remove('visible');
        inputDesiredIncome.classList.add('hidden');

       

    }, 500); // 500 milliseconds = 0.5 seconds
    
   
}

function hidePartnerInputs() {
    const currentSituationContainer = document.getElementById('currentSituationContainer');
    const retirementGoalsContainer = document.getElementById('retirementGoalsContainer');
    const futureContributionsContainer = document.getElementById('futureContributionsContainer');
    const dbPensionsContainer = document.getElementById('dbPensionsContainer');
    const CouplesTFC = document.getElementById('CouplesTFC');
    
    
    const currentSituationPartner = document.getElementById('currentSituationPartner');
    const futureContributionsPartner = document.getElementById('futureContributionsPartner');
    const DBPensionPartner = document.getElementById('DBPensionPartner');
    const reversionaryBenefit = document.getElementById('reversionaryBenefit');
    const inputDesiredCombinedIncome = document.getElementById('inputDesiredCombinedIncomeDiv');
    const inputDesiredIncome = document.getElementById('inputDesiredIncomeDiv');

   
    currentSituationContainer.style.width = '45%';
    currentSituationContainer.style.height = '45%';

    futureContributionsContainer.style.width = '45%';
    futureContributionsContainer.style.height = '35%';

    dbPensionsContainer.style.width = '45%';
    dbPensionsContainer.style.height = '35%';

    if (window.innerWidth <= 1024) { // 768px is a common breakpoint for tablets and phones
        currentSituationContainer.style.width = '99%';
        currentSituationContainer.style.height = '90%';
        retirementGoalsContainer.style.width = '99%';
        retirementGoalsContainer.style.height = '90%';
        futureContributionsContainer.style.width = '99%';
        futureContributionsContainer.style.height = '80%';
        dbPensionsContainer.style.width = '99%';
        dbPensionsContainer.style.height = '80%';
      } 
    
    CouplesTFC.classList.remove('visible');
    CouplesTFC.classList.add('hidden');
    currentSituationPartner.classList.remove('visible');
    currentSituationPartner.classList.add('hidden');
    currentSituationPartner.classList.remove('ensure-visible');
    futureContributionsPartner.classList.remove('visible');
    futureContributionsPartner.classList.add('hidden');
    DBPensionPartner.classList.remove('visible');
    DBPensionPartner.classList.add('hidden');
  /*   reversionaryBenefit.classList.remove('visible');
    reversionaryBenefit.classList.add('hidden'); */
    inputDesiredCombinedIncome.classList.remove('visible');
    inputDesiredCombinedIncome.classList.add('hidden');
    inputDesiredIncome.classList.remove('hidden');
    inputDesiredIncome.classList.add('visible');

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

    if (localStorage.getItem('planAsCouple') === "true") {
        document.getElementById('planAsCouple').checked = true;
    } else {
        document.getElementById('planAsCouple').checked = false;
    }

    if (localStorage.getItem('alreadyRetired') === "true") {
        document.getElementById('alreadyRetired').checked = true;
    } else {
        document.getElementById('alreadyRetired').checked = false;
    }
    //Partner Inputs
    if (localStorage.getItem('currentAgePartner')) {
        document.getElementById('currentAgePartner').value = localStorage.getItem('currentAgePartner');
    }
    
    if (localStorage.getItem('currentFundPartner')) {
        document.getElementById('currentFundPartner').value = localStorage.getItem('currentFundPartner');
    }
    
    if (localStorage.getItem('currentISAPartner')) {
        document.getElementById('currentISAPartner').value = localStorage.getItem('currentISAPartner');
    }

    if (localStorage.getItem('currentISAPartner')) {
        document.getElementById('inputDesiredCombinedIncome').value = localStorage.getItem('currentISAPartner');
    }

    if (localStorage.getItem('desiredCombinedIncome')) {
        document.getElementById('inputDesiredCombinedIncome').value = localStorage.getItem('desiredCombinedIncome');
    }
    
        
    if (localStorage.getItem('dbPensionAmountPartner')) {
        document.getElementById('dbPensionAmountPartner').value = localStorage.getItem('dbPensionAmountPartner');
    }
    
    if (localStorage.getItem('dbPensionAgePartner')) {
        document.getElementById('dbPensionAgePartner').value = localStorage.getItem('dbPensionAgePartner');
    }
    
    if (localStorage.getItem('monthlyContributionPartner')) {
        document.getElementById('inputMonthlyContributionPartner').value = localStorage.getItem('monthlyContributionPartner');
    }
    
    if (localStorage.getItem('monthlyISAContributionPartner')) {
        document.getElementById('inputMonthlyISAContributionPartner').value = localStorage.getItem('monthlyISAContributionPartner');
    }
    
    if (localStorage.getItem('reversionaryBenefitPercentagePartner')) {
        document.getElementById('reversionaryBenefitPercentagePartner').value = localStorage.getItem('reversionaryBenefitPercentagePartner');
    }
    

   /*  if (localStorage.getItem('birthdayCheck')) {
        document.getElementById('birthdayCheck').checked = localStorage.getItem('birthdayCheck');
    }
    
    toggleCheckboxVisibility(); */
    
}





