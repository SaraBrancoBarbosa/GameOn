/*********** Responsive nav ***********/

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// J'aimerais rendre le header visible en responsive lorsqu'on ouvre le formulaire.
// Ensuite, lorsqu'on descend dans le formulaire, le header disparait. Si on remonte, le header réapparait.

/*********** Elements ***********/

// DOM elements
const modalbg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const confirmationMsgBox = document.getElementById("confirmationMsgBox");
const closeBtns = document.querySelectorAll(".close-btn");

// Form elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournamentQuantity = document.getElementById("quantity");
const citiesBtnRadio = document.querySelectorAll("input[type=radio]");
const tosChecked = document.getElementById("checkbox1");

/*********** Launching and closing modal form ***********/

// Launch modal form (function)
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form (function)
function closeModal() {
  modalbg.style.display = "none";
}

// Launch modal event
modalBtns.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

/*********** Form elements functions ***********/

/**
 * Fonction de validation
 * @param {HTMLElement} element La fonction reçoit la variable element
 * @returns 
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
  } else if (!(/[A-Za-zÀ-ÖØ-öø-ÿ '-]+$/g).test(name)) {
    result = false;
    element.parentNode.dataset.error="Caractères invalides."
    element.parentNode.setAttribute("data-error-visible",true);
  }
  return result
}

// Email function
const validateEmail = (element) => {
  let result = true;
  const name = element.value;
  element.parentNode.setAttribute("data-error-visible",false);

  if (!(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/).test(name)) {
    result = false;
    element.parentNode.dataset.error="Veuillez entrer une adresse email valide."
    element.parentNode.setAttribute("data-error-visible",true);
  }
  return result
}

// Birthdate function
const validateBirthdate = (element) => {
  let result = true;
  const name = element.value;
  element.parentNode.setAttribute("data-error-visible",false);

  if (!(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/).test(name)) {
    result = false;
    element.parentNode.dataset.error="Veuillez entrer votre date de naissance."
    element.parentNode.setAttribute("data-error-visible",true);
    // Mettre regexp pour être majeur
  /*} else if (!majeur) { 
    result = false;
    element.parentNode.dataset.error="Vous devez être majeur pour vous inscrire."
    element.parentNode.setAttribute("data-error-visible",true); */
  }
  return result
}

// Tournament quantity function
const validateTournamentQuantity = (element) => {
  let result = true;
  const name = element.value;
  element.parentNode.setAttribute("data-error-visible",false);

  if (!(/^[0-9][0-9]?$|^99$/).test(name)) {
    result = false;
    element.parentNode.dataset.error="Veuillez saisir un nombre entre 0 et 99."
    element.parentNode.setAttribute("data-error-visible",true);
  }
  return result
}

/*
// Cities selection function
const validateCitiesBtnRadio = (element) => {

for (let i = 0; i < citiesBtnRadio.length; i++)


  if (!(citiesBtnRadio[i].checked)) {
    result = false;
    element.parentNode.dataset.error="Veuillez sélectionner une ville."
    element.parentNode.setAttribute("data-error-visible",true);
  }
  return result
}
*/

// Terms of use function
const validateTos = (element) => {
  let result = true;
  const name = element.value;
  element.parentNode.setAttribute("data-error-visible",false);

  if (!(tosChecked.checked)) {
    result = false;
    element.parentNode.dataset.error="Veuillez accepter les conditions d'utilisation."
    element.parentNode.setAttribute("data-error-visible",true);
  }
  return result
}

/*********** Form validation ***********/

function validate() {   // Code line 63 (HTML, onsubmit)

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
    //result = validateCitiesBtnRadio(citiesBtnRadio) && result;
 
    // Terms of use validation
    result = validateTos(tosChecked) && result;
    // Doit-on faire quelque chose avec la case newsletter ?

  // If all the datas are correct, the result is validated
  return result; 
}

/*********** Form submission ***********/

form.addEventListener("submit", (event) => {
  // If the function is wrong, we keep the datas so the user can correct them. We prevent the page from loading.
  if (!validate()) {
  event.preventDefault();
  } else {
    // The submission is validated
    form.style.display = "none";
    confirmationMsgBox.style.display = "flex"
  }
});