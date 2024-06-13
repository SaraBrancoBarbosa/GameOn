// responsive header 
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += "-responsive";
  } else {
    x.className = "topnav";
  }
}
// J'aimerais rendre le header visible en responsive lorsqu'on ouvre le formulaire.
// Ensuite, lorsqu'on descend dans le formulaire, le header disparait. Si on remonte, le header réapparait.

// DOM elements
const modalbg = document.querySelector(".bground");
const modalBtns = document.querySelectorAll(".modal-btn");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const confirmationMsgBox = document.getElementById("confirmationMsgBox");
const closeBtns = document.querySelectorAll(".close-btn");

// form elements
let firstName = document.getElementById("first");
let lastName = document.getElementById("last");
let email = document.getElementById("email");
let birthdate = document.getElementById("birthdate");
let tournamentQuantity = document.getElementById("quantity");
let listBtnRadio = document.querySelectorAll("input[type=radio]:checked");
let checkbox = document.querySelectorAll("input[type=checkbox]");

// RegExp elements
let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
let tournamentQuantityRegExp = new RegExp("[\d]+");

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form (fonction)
function closeModal() {
  modalbg.style.display = "none";
}
// Ecrit differemment :
const closeModal2=()=>{
  modalbg.style.display = "none"
}

// Fermer la modale
closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal event
modalBtns.forEach((btn) => btn.addEventListener("click", launchModal));


const validChars = "azertyuiopqsdfghjklmwxcvbn"
/**
 * Fonction de validation de nom
 * @param {HTMLElement} element La fonction reçoit la variable element
 * @returns 
 */
const validateName = (element) => {
  let result = true;
  const name = element.value;
  element.parentNode.setAttribute("data-error-visible",false);

  if (!(/^(.{2,})$/).test(name)) {
    result = false;
    // Ajouter la class error : je n'arrive pas à faire le lien entre les erreurs et l'affichage css
    // "Veuillez entrer au moins 2 caractères." : et donc à insérer le texte sous les cases
    element.parentNode.dataset.error="Veuillez entrer au moins 2 caractères."
    element.parentNode.setAttribute("data-error-visible",true);
    
  } else if (!(/^[a-zA-Z]+$/g).test(name)) {
    result = false;
    element.parentNode.dataset.error="Caractères invalides."
    element.parentNode.setAttribute("data-error-visible",true);
  }
  return result
}

// La fonction qui va permettre de valider tous les éléments
function validate() {   // J'ai repris le onsubmit du HTML ligne 63

  let result = true;

  // Valider prénom
    result = validateName(firstName) && result

  // Valider nom  
    result = validateName(lastName) && result

  // Valider l'email
    if (!emailRegExp.test(email.value)) {
      // Ajouter la class error
      // "Veuillez entrer une adresse email valide."
      console.log("Vous avez fait une erreur. email")
    } else {
      // Succès
      // Enlever message d'erreur s'il y a
      email.setCustomValidity("")
      console.log("Bravo ! email")
    }

  // Valider date de naissance
    if (!birthdate.value) {  // Date non sélectionnée
      // Ajouter la class error
      // "Vous devez entrer votre date de naissance."
      console.log("Vous avez fait une erreur. naissance") 
    } else {
      // Succès
      // Enlever message d'erreur s'il y a
      console.log("Bravo ! naissance")
    }

  // Valider quantité de tournoi
    if (tournamentQuantityRegExp.test(tournamentQuantity.value === "" || tournamentQuantity.value == NaN)) {  // Valeur numérique non saisie
      // Ajouter la class error
      // "Vous devez saisir un nombre."
      console.log("Vous avez fait une erreur. tournoi")
    } else {
      // Succès
      // Enlever message d'erreur s'il y a
      console.log("Bravo ! tournoi")  
    }

  // Valider button radio: cities selection
  for (let i = 0; i < listBtnRadio.length; i++) {
      if (!listBtnRadio[i].checked) { // Avec ce code-là, il considère que toutes les villes doivent être cochées
        // Ajouter la class error
        // "Vous devez choisir une option."
        console.log("Vous avez fait une erreur. villes")
      } else {
        // Si un des choix est sélectionné, succès
        // Enlever message d'erreur s'il y a
        console.log("Bravo ! villes") 
      }  
    }

  // Valider les cases à cocher
  // "Je souhaite être prévenu des prochains évènements" n'est pas obligatoire
  if (!(checkbox.checked)) {
    // Ajouter la class error
    // "Vous devez vérifier que vous acceptez les termes et conditions."
    console.log("Vous avez fait une erreur. Conditions d'utilisation")
  } else {
    // Succès
    // Enlever message d'erreur s'il y a
  }

  return result; // Si tout est bon, il valide
}

// submit form
form.addEventListener("submit", (event) => {
  if (!validate()) { //si les données entrées dans le formulaire sont incorrectes
  // "Vous n'avez pas saisi toutes les données correctement."
  event.preventDefault(); // Il n'y a pas de rechargement de page lors du submit, pour garder les données
  } else {
    // L'envoi est validé
    form.style.display = "none";
    confirmationMsgBox.style.display = "flex"
  }
});










// send an email confirmation to the user, optionnel mais j'aimerais bien voir comment faire
function afficherEmail(firstName, email) {
  let mailto = `mailto:${email}?subject=Confirmation de votre participation&body=Bonjour ${firstName}, nous avons bien reçu votre formulaire ! Merci d'avoir participé.`
  location.href = mailto
}