
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the value from localStorage and check if it's the user's first visit
    
    initialiseInitialInputsAndCheckboxes();
    var planAsCouple = localStorage.getItem('planAsCouple') === "true";
    var alreadyRetired = localStorage.getItem('alreadyRetired') === "true";
    /* updateInputsVisibility(planAsCouple,alreadyRetired); */
    updateInputsVisibility(false,false);
    restoreSelectedRetirementIncomeStandardOption();
    
});

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('input', saveAllInputsToLocalStorage);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    /* const planAsCoupleCheckbox = document.getElementById('planAsCouple');
    const alreadyRetiredCheckbox = document.getElementById('alreadyRetired'); */
    const useScottishTaxCheckbox = document.getElementById('useScottishTax');
    
    // Save initial states to localStorage
   /*  saveToLocalStorage("planAsCouple", planAsCoupleCheckbox.checked);
    saveToLocalStorage("alreadyRetired", alreadyRetiredCheckbox.checked); */
    saveToLocalStorage("useScottishTax", useScottishTaxCheckbox.checked);
    
    // Add event listeners to update localStorage and handle visibility changes
  /*   planAsCoupleCheckbox.addEventListener('change', function () {
        const planAsCouple = this.checked; // Get the updated state
        saveToLocalStorage("planAsCouple", planAsCouple); // Save the updated state
        updateInputsVisibility(planAsCouple, alreadyRetiredCheckbox.checked); // Pass the current state
    });
    
    alreadyRetiredCheckbox.addEventListener('change', function () {
        const alreadyRetired = this.checked; // Get the updated state
        saveToLocalStorage("alreadyRetired", alreadyRetired); // Save the updated state
        updateInputsVisibility(planAsCoupleCheckbox.checked, alreadyRetired); // Pass the current state
    });
 */
       
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
   /*  saveToLocalStorage("planAsCouple", document.getElementById("planAsCouple").checked);
    saveToLocalStorage("alreadyRetired", document.getElementById("alreadyRetired").checked); */
    saveToLocalStorage("useScottishTax", document.getElementById("useScottishTax").checked);
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


function updateInputsVisibility(planAsCouple, alreadyRetired) {
    // Get all the DOM elements you need
    const futureContributionsContainer = document.getElementById('futureContributionsContainer');
    const inputDesiredRetirementAge = document.getElementById('inputDesiredRetirementAge');
    const retirementIncomeAdvice = document.getElementById('retirementIncomeAdvice');
    const CouplesTFC = document.getElementById('CouplesTFC');
    const inputTFCPartnerDiv = document.getElementById('inputTFCPartnerDiv');
    const currentSituationContainer = document.getElementById('currentSituationContainer');
    const retirementGoalsContainer = document.getElementById('retirementGoalsContainer');
    const dbPensionsContainer = document.getElementById('dbPensionsContainer');
    const currentSituationPartner = document.getElementById('currentSituationPartner');
    const futureContributionsPartner = document.getElementById('futureContributionsPartner');
    const DBPensionPartner = document.getElementById('DBPensionPartner');
    const inputDesiredCombinedIncomeDiv = document.getElementById('inputDesiredCombinedIncomeDiv');
    const inputDesiredIncomeDiv = document.getElementById('inputDesiredIncomeDiv');
    const livingStandardsToggle = document.getElementById('livingStandardsToggle');
    
    // Reset messages
    CouplesTFC.innerHTML = '';
    retirementIncomeAdvice.innerHTML = '';

    // Hide all elements initially
    const elementsToHide = [
        futureContributionsContainer,
        inputDesiredRetirementAge,
        inputTFCPartnerDiv,
        currentSituationPartner,
        futureContributionsPartner,
        DBPensionPartner,
        inputDesiredCombinedIncomeDiv,
        inputDesiredIncomeDiv,
        CouplesTFC,
        retirementIncomeAdvice
    ];

    elementsToHide.forEach(element => {
        element.classList.remove('visible');
        element.classList.add('hidden');
    });

    // Show or hide elements based on 'alreadyRetired' and 'planAsCouple'
    if (!alreadyRetired) {
        // Show future contributions and desired retirement age
        futureContributionsContainer.classList.remove('hidden');
        futureContributionsContainer.classList.add('visible');
        inputDesiredRetirementAge.classList.remove('hidden');
        inputDesiredRetirementAge.classList.add('visible');
        retirementIncomeAdvice.classList.remove('hidden');
        retirementIncomeAdvice.classList.add('visible');
        livingStandardsToggle.classList.add('visible');
        livingStandardsToggle.classList.remove('hidden');
        retirementIncomeAdvice.innerHTML = `An important part of retirement planning is estimating how much you will need to cover your expenses in retirement whilst also having sufficient income for entertainment and holidays. <br><br>The <a href="https://www.retirementlivingstandards.org.uk" target="_blank">Retirement Living Standards</a> website offers a practical framework to help you estimate the income needed for your desired lifestyle in retirement. <br><br>Select your target standard of living in retirement below or enter a different desired income in the input box`;

    } else {
        // Show retirement income advice
        retirementIncomeAdvice.classList.remove('hidden');
        retirementIncomeAdvice.classList.add('visible');
        retirementIncomeAdvice.innerHTML = "As you have already retired, you will have a good idea of what your income needs are. Please enter the amount of income you need each month after tax.<br><br>Please also enter the percentage of your pension fund that you took as a tax-free lump sum at retirement. This is required for an accurate ongoing calculation of your tax due.";
        livingStandardsToggle.classList.add('hidden');
        livingStandardsToggle.classList.remove('visible');
    }

    if (planAsCouple) {
        // Show partner inputs
        currentSituationPartner.classList.remove('hidden');
        currentSituationPartner.classList.add('visible');
        currentSituationPartner.classList.add('ensure-visible');
        DBPensionPartner.classList.remove('hidden');
        DBPensionPartner.classList.add('visible');
       
        inputDesiredCombinedIncomeDiv.classList.remove('hidden');
        inputDesiredCombinedIncomeDiv.classList.add('visible');

        // Hide individual desired income
        inputDesiredIncomeDiv.classList.remove('visible');
        inputDesiredIncomeDiv.classList.add('hidden');

        // Show future contributions for partner only if not already retired
        if (!alreadyRetired) {
            futureContributionsPartner.classList.remove('hidden');
            futureContributionsPartner.classList.add('visible');
        }

        // Adjust CouplesTFC message
        if (alreadyRetired) {
            CouplesTFC.classList.remove('hidden');
            CouplesTFC.classList.add('visible');
        }
        

        if (alreadyRetired) {
            inputTFCPartnerDiv.classList.remove('hidden');
            inputTFCPartnerDiv.classList.add('visible');
            CouplesTFC.innerHTML = 'If you are already retired, it is assumed that your partner has also already retired. Please also enter the percentage of your partner\'s pension fund that was taken as a tax-free lump sum at retirement.';
        } else {
            CouplesTFC.innerHTML = 'When planning as a couple, the calculations assume that you will both retire at the same time. The calculations will take your age difference into account.<br><br>It is also assumed that you will both take the same percentage of your funds as a tax-free lump sum at retirement.';
        }
    } else {
        // Show individual desired income
        inputDesiredIncomeDiv.classList.remove('hidden');
        inputDesiredIncomeDiv.classList.add('visible');

        // Hide partner inputs
        currentSituationPartner.classList.remove('visible');
        currentSituationPartner.classList.add('hidden');
        currentSituationPartner.classList.remove('ensure-visible');
        futureContributionsPartner.classList.remove('visible');
        futureContributionsPartner.classList.add('hidden');
        DBPensionPartner.classList.remove('visible');
        DBPensionPartner.classList.add('hidden');
        inputDesiredCombinedIncomeDiv.classList.remove('visible');
        inputDesiredCombinedIncomeDiv.classList.add('hidden');
        inputTFCPartnerDiv.classList.remove('visible');
        inputTFCPartnerDiv.classList.add('hidden');
    }

    // Adjust container sizes based on 'planAsCouple'
    if (planAsCouple) {
        // Adjust sizes as in showPartnerInputs()
        setTimeout(() => { // Set pause
            currentSituationContainer.style.width = '70%';
            currentSituationContainer.style.height = '60%';
            retirementGoalsContainer.style.height = '60%';
            futureContributionsContainer.style.width = '70%';
            dbPensionsContainer.style.width = '70%';

            if (window.innerWidth <= 1024) { // Adjust for smaller screens
                currentSituationContainer.style.width = '99%';
                currentSituationContainer.style.height = '110%';
                futureContributionsContainer.style.width = '99%';
                futureContributionsContainer.style.height = '94%';
                retirementGoalsContainer.style.width = '99%';
                retirementGoalsContainer.style.height = '97%';
                dbPensionsContainer.style.width = '99%';
                dbPensionsContainer.style.height = '94%';
            } 
        }, 500); // 500 milliseconds = 0.5 seconds
    } else {
        // Adjust sizes as in hidePartnerInputs()
        currentSituationContainer.style.width = '45%';
        currentSituationContainer.style.height = '45%';
        futureContributionsContainer.style.width = '45%';
        futureContributionsContainer.style.height = '35%';
        dbPensionsContainer.style.width = '45%';
        dbPensionsContainer.style.height = '35%';

        if (window.innerWidth <= 1024) { // Adjust for smaller screens
            currentSituationContainer.style.width = '99%';
            currentSituationContainer.style.height = '90%';
            retirementGoalsContainer.style.width = '99%';
            retirementGoalsContainer.style.height = '90%';
            futureContributionsContainer.style.width = '99%';
            futureContributionsContainer.style.height = '80%';
            dbPensionsContainer.style.width = '99%';
            dbPensionsContainer.style.height = '80%';
        }
    }
}


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

   /*  if (localStorage.getItem('planAsCouple') === "true") {
        document.getElementById('planAsCouple').checked = true;
    } else {
        document.getElementById('planAsCouple').checked = false;
    }

    if (localStorage.getItem('alreadyRetired') === "true") {
        document.getElementById('alreadyRetired').checked = true;
    } else {
        document.getElementById('alreadyRetired').checked = false;
    } */

    if (localStorage.getItem('useScottishTax') === "true") {
        document.getElementById('useScottishTax').checked = true;
    } else {
        document.getElementById('useScottishTax').checked = false;
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
    
    
}



document.querySelectorAll('input[name="toggle"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      console.log('Selected:', event.target.value);
      // Add your logic here to handle the selected option
    });
  });
  

  document.querySelectorAll('input[name="toggle"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        updateRetirementLivingStandardsSelector(event);
    });
  });
  

  function updateRetirementLivingStandardsSelector(event) {

    const selectedValue = event.target.value;
    console.log(`Selected: ${selectedValue}`);

  if (localStorage.getItem('planAsCouple') === "true") {
      var target = document.getElementById("inputDesiredCombinedIncome");
      //Couples income
      var values = {
          Minimum: parseInt(22400/12/10)*10,
          Moderate: parseInt(43100/12/10)*10,
          Comfortable: parseInt(59000/12/10)*10
      }
  } else {
      var target = document.getElementById("inputDesiredIncome");
      //Single income
          var values = {
              Minimum: parseInt(14400/12/10)*10,
              Moderate: parseInt(31300/12/10)*10,
              Comfortable: parseInt(43100/12/10)*10
          }
  }

    // Perform an action based on the selected value
    if (selectedValue === "Option 1") {
      target.value = parseInt(values.Minimum);
    } else if (selectedValue === "Option 2") {
      target.value = parseInt(values.Moderate);
    } else if (selectedValue === "Option 3") {
      target.value = parseInt(values.Comfortable);
    }

    localStorage.setItem('selectedRetirementIncomeStandardOption', selectedValue);
    saveAllInputsToLocalStorage();

  }

  function restoreSelectedRetirementIncomeStandardOption() {
    const selectedOption = localStorage.getItem('selectedRetirementIncomeStandardOption');
    if (selectedOption) {
      // Find the radio input with the saved value and check it
      const toggleInput = document.querySelector(`input[name="toggle"][value="${selectedOption}"]`);
      if (toggleInput) {
        toggleInput.checked = true;
        console.log(`Restored selected option: ${selectedOption}`);
      }
    }
  }