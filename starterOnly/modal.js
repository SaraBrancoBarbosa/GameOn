/*********** Responsive nav ***********/

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*********** Elements ***********/

// DOM elements
const validationBg = document.querySelector(".bground");
const modalContent = validationBg.querySelector(".content");
const modalBtns = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const confirmationBg = document.getElementById("confirmationBg");
const submitBtn = document.querySelector(".btn-submit");
const input = document.querySelectorAll(".input")

// Form elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournamentQuantity = document.getElementById("quantity");
const citiesBtnRadio = document.getElementsByName("location");
const tosChecked = document.getElementById("checkbox1");

/*********** Launching and closing modal form ***********/

// Function to prevent further propagation of the current event
const stopPropagation = (event) => { 
  event.stopPropagation();
}

// Function to launch the modals
function launchModal(modal, closeFunction) {
  modal.style.display = "block";
  // "Hides" the background and removes its scrolling bar:
  document.body.style.overflow = "hidden"; 
  // Clicking outside of the form closes it:
  modal.addEventListener("click", closeFunction); 
  modal.querySelector(".content").addEventListener("click", stopPropagation);

  const closeBtns = modal.querySelectorAll(".close-btn");
  closeBtns.forEach((btn) => btn.addEventListener("click", closeFunction));
}

// Function to close the modals
function closeModal(modal, closeFunction) {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  modal.removeEventListener("click", closeFunction);
  modal.querySelector(".content").removeEventListener("click", stopPropagation);
}

// Function to launch modal (form)
function launchValidation() {
  launchModal(validationBg, closeValidation);
  submitBtn.addEventListener("click", validate);
}

// Function to launch modal (confirmation message)
function launchConfirmation() {
  launchModal(confirmationBg, closeConfirmation);
}

// Function to close modal (form)
function closeValidation() {
  closeModal(validationBg, closeValidation);
  submitBtn.removeEventListener("click", validate);
}

// Function to close modal (confirmation message)
function closeConfirmation() {
  closeModal(confirmationBg, closeConfirmation);
}

// Launches modal event by clicking on the corresponding buttons
modalBtns.forEach((btn) => btn.addEventListener("click", launchValidation));

/*********** Form elements functions ***********/

/**
 * Validating function
 * @param {HTMLElement} element
 * @returns {boolean} True if element.value is valid
 */

// First name and last name function
const validateName = (element) => {
  let result = true;
  const name = element.value;
  element.parentNode.setAttribute("data-error-visible",false);

  if (!(/^(.{2,})$/).test(name)) {
    result = false;
    element.parentNode.dataset.error="Veuillez entrer au moins 2 caractères."
    element.parentNode.setAttribute("data-error-visible",true);
  } else if (!(/^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/).test(name)) {
    result = false;
    element.parentNode.dataset.error="Caractères invalides."
    element.parentNode.setAttribute("data-error-visible",true);
  }
  return result;
}

// Email function
const validateEmail = () => {
  let result = true;
  formData[2].setAttribute("data-error-visible", false);

  if (!email.value.match(/^[a-z0-9._-]+@[a-z0-9._-]+.([a-z0-9._-]{2,})+$/)) {
    result = false;
    formData[2].setAttribute("data-error", "Veuillez entrer une adresse email valide.");
    formData[2].setAttribute("data-error-visible", true);
  }
  return result;
}

// Birthdate function
const validateBirthdate = () => {
  let result = true;
  formData[3].setAttribute("data-error-visible", false);
  
  // The user can't be a minor. We compare the valid minimum date with the user's birthdate
  const today = new Date();
  const validMinDate = new Date(
    today.getFullYear()-18,
    today.getMonth(),
    today.getDate(),
  );
  const birth = new Date(birthdate.value);
  const realBirthday = new Date(
    birth.getFullYear(),
    birth.getMonth(),
    birth.getDate(),
  );

  if (!birthdate.value.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)) {
    result = false;
    formData[3].setAttribute("data-error", "Veuillez entrer votre date de naissance.");
    formData[3].setAttribute("data-error-visible", true);
  } else if (realBirthday.getTime() > validMinDate.getTime()) {
    result = false;
    formData[3].setAttribute("data-error-visible", true);
    formData[3].setAttribute("data-error", "Vous devez être majeur pour vous inscrire."); 
  }
  return result;
}

// Tournament quantity function
const validateTournamentQuantity = () => {
  let result = true;
  formData[4].setAttribute("data-error-visible", false);

  if (!tournamentQuantity.value.match(/^[0-9][0-9]?$|^99$/)) {
    result = false;
    formData[4].setAttribute("data-error", "Veuillez saisir un nombre entre 0 et 99.");
    formData[4].setAttribute("data-error-visible", true);
  }
  return result;
}

// City selection function
const validateCitiesBtnRadio = () => {
  let result = false;
  formData[5].setAttribute("data-error-visible", false);

  for (let element of citiesBtnRadio) {

    if (element.checked) {
      result = true;
      break;
    }
  }
  if (result === false) {
  formData[5].setAttribute("data-error", "Veuillez sélectionner une ville.");
  formData[5].setAttribute("data-error-visible", true);
  }
  return result;

}

// Terms of use function
const validateTos = () => {
  let result = true;
  input[0].setAttribute("data-error-visible", false);

  if (!tosChecked.checked) {
    result = false;
    input[0].setAttribute("data-error", "Veuillez accepter les conditions d'utilisation.");
    input[0].setAttribute("data-error-visible", true);
  }
  return result;
}

/*********** Fields validation of the form ***********/

function validateFields() {

  let result = true;

    // First name validation
    result = validateName(firstName) && result;

    // Last name validation  
    result = validateName(lastName) && result;

    // Email validation
    result = validateEmail(email) && result;

    // Birthdate validation
    result = validateBirthdate(birthdate) && result;

    // Tournament quantity validation
    result = validateTournamentQuantity(tournamentQuantity) && result;

    // Cities selection validation
    result = validateCitiesBtnRadio(citiesBtnRadio) && result;
 
    // Terms of use validation
    result = validateTos(tosChecked) && result;

  // If all the fields are correct, the result is validated
  return result; 
}

/*********** Form submission ***********/
const validate = (event) => {
  
  // If the function is wrong, we keep the datas so the user can correct them. We prevent the page from loading
  event.preventDefault();
  if (!validateFields(event)) {
  } else {
    // The submission is validated and the confirmation message is launched
    closeValidation();
    launchConfirmation();  
  }

};
