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
const modalbg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const confirmationMsgBox = document.getElementById("confirmationMsgBox");
const closeBtns = document.querySelectorAll(".close-btn");
const submitBtn = document.querySelector(".btn-submit");
const input = document.querySelectorAll(".input")

// Form elements
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const tournamentQuantity = document.getElementById("quantity");
const citiesBtnRadio = document.getElementsByName("location");
/*
Je n'arrive pas à rendre fonctionnel les btn radios en passant par citiesBtnRadio.
J'aimerais cependant comprendre pourquoi cela fonctionne quand j'écris le code dans la fonction, mais pas ici
Sous cette forme : document.querySelectorAll("input[name='location']")
*/
const tosChecked = document.getElementById("checkbox1");

/*********** Launching and closing modal form ***********/

// Launch modal form (function)
function launchModal() {
  modalbg.style.display = "block";
  submitBtn.addEventListener("click", validate);
}

// Close modal form (function)
function closeModal() {
  modalbg.style.display = "none";
}

// Launch modal event
modalBtns.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

/*********** Launching and closing confirmation message ***********/

// Launch modal confirmation message when form submitted (function)
function launchConfirmMsg() {
  event.preventDefault(); // J'aimerais pouvoir enlever cette ligne
  confirmationMsgBox.style.display = "flex";
}

// Close modal confirmation message when form submitted (function)
function closeConfirmMsg() {
  confirmationMsgBox.style.display = "none";
}

// Close modal confirmation message when form submitted
closeBtns.forEach((btn) => btn.addEventListener("click", closeConfirmMsg));

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
const validateEmail = () => {
  let result = true;
  formData[2].setAttribute("data-error-visible", false);

  if (!email.value.match(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/)) {
    result = false;
    formData[2].setAttribute("data-error", "Veuillez entrer une adresse email valide.");
    formData[2].setAttribute("data-error-visible", true);
  }
  return result
}



// Birthdate function
const validateBirthdate = () => {
  let result = true;
  formData[3].setAttribute("data-error-visible", false);
  
  // Birthdate: the user can't be a minor (en cours !)
  const today = new Date();
  const validMinDate = new Date(
    today.getFullYear()-18,
    today.getMonth(),
    today.getDate(),
  );

  if (!birthdate.value.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)) {
    result = false;
    formData[3].setAttribute("data-error", "Veuillez entrer votre date de naissance.");
    formData[3].setAttribute("data-error-visible", true);
    /* Mettre info pour être majeur */
   } else if (!birthdate < validMinDate) {
    result = false;
    formData[3].setAttribute("data-error-visible", true);
    formData[3].setAttribute("data-error", "Vous devez être majeur pour vous inscrire."); 
  }
  return result
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
  return result
}

// Cities selection function
// Code non fonctionnel
const validateCitiesBtnRadio = () => {
  let result = true;
  formData[5].setAttribute("data-error-visible", false);

  for (let i = 0; i < citiesBtnRadio.length; i++) {

    if (!citiesBtnRadio[i].checked) {
      result = false;
      formData[5].setAttribute("data-error", "Veuillez sélectionner une ville.");
      formData[5].setAttribute("data-error-visible", true);
    }
    return result;
  }
  
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
    result = validateCitiesBtnRadio(citiesBtnRadio) && result;
 
    // Terms of use validation
    result = validateTos(tosChecked) && result;
    // Doit-on faire quelque chose avec la case newsletter ?

  // If all the datas are correct, the result is validated
  return result; 
}

/* Autre tentative pour raccourcir le code, mais les erreurs s'affichent une par une, pas toutes en même temps.

function validate(event) {
  event.preventDefault()

    let result = true;

    if (!(
      (result = validateName(firstName) && result) 
      && (result = validateName(lastName) && result) 
      && (result = validateEmail(email) && result) 
      && (result = validateBirthdate(birthdate) && result)
      && (result = validateTournamentQuantity(tournamentQuantity) && result) 
      && (result = validateCitiesBtnRadio(citiesBtnRadio) && result) 
      && (result = validateTos(tosChecked) && result)
    )) {
      console.log("C'est pas bon è_é")
    } else {
      console.log("C'est bon :D")
      launchConfirmMsg();
    }
}
*/

/*********** Form submission ***********/
form.addEventListener("submit", (event) => {
  // If the function is wrong, we keep the datas so the user can correct them. We prevent the page from loading.
if (!validate(event)) {
  event.preventDefault();
  console.log("C'est pas bon è_é")
  } else {
    // The submission is validated
    console.log("C'est bon :D")
    closeModal();
    launchConfirmMsg();  
  }
});
