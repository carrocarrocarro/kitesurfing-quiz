/* Denna fil styr huvud menyn och navigationen. */

// Deklarer menyerna
const mainMenu = document.getElementById('menu'); // Huvud meny
const pMenu = document.getElementById('practise-menu'); // Övnings meny

// Deklarerar knappar
const pracBtn = document.getElementById('practise'); // Knapp för att komma till övningsmenyn
const vdwsQBtn = document.getElementById('vdws-quiz-btn'); // Knapp för att starta vdws-quizet
const backBtn = document.getElementById('back'); // Knapp för att gå tillbaka till huvudmenyn
const windQBtn = document.getElementById('wind-quiz'); // Knapp för att starta test med frågor utifrån vind kategorin.
const safetyQBtn = document.getElementById('safety-quiz');  // Knapp för att starta test med frågor utifrån säkerhets kategorin.
const launchQBtn = document.getElementById('launch-quiz'); // Knapp för att starta test med frågor utifrån starta och landa kategorin.
const gearQBtn = document.getElementById('gear-quiz'); // nanpp för att starta test med frågor utifrån utrustnings kategorin.
const rightQBtn = document.getElementById('right-way-quiz'); // Knapp för att starta test med frågor utifrån väjningsregler kategorin.  


// Klick event för menyn navigantion
pracBtn.addEventListener('click', openPractiseMenu); // Öppnar övnings menyn genom att anropa funcktionen  openPractiseMenu();
backBtn.addEventListener('click', () => {closePractiseMenu(); openMenu();}); // Stänger övnings menyn och visar huvudmenyn

// Klick event och funktioner för att starta test/quiz utifrån kategori. Jag skickar med en parameter för att styra kategori i övningsläget
vdwsQBtn.addEventListener('click', () => { /* showVerify(); */ errorMessage();}); // Om VDWS knappen klickas anropas funktionen showVerify, ligger i filen vdws-quiz.js
windQBtn.addEventListener('click', () => {startPractiseQuiz(wind);}); // Om knappen 'wind' klickas anropas funktionen startPractiseQuiz och parametern wind skickas med, ligger i filen quiz.js.
safetyQBtn.addEventListener('click', () => {startPractiseQuiz(safety);}); // Om knappen 'safety' klickas anropas funktionen startPractiseQuiz och parametern safety skickas med, ligger i filen quiz.js.
launchQBtn.addEventListener('click', () => {startPractiseQuiz(launch);}); // Om knappen 'lanuch and land' klickas anropas funktionen startPractiseQuiz och parametern laun.g skickas med, ligger i filen quiz.js.
gearQBtn.addEventListener('click', () => {startPractiseQuiz(gear);}); // Om knappen 'gear' klickas anropas funktionen startPractiseQuiz och parametern gear skickas med, ligger i filen quiz.js.
rightQBtn.addEventListener('click', () => {startPractiseQuiz(rules);});// Om knappen 'Right way of rules' klickas anropas funktionen startPractiseQuiz och parametern rules skickas med, ligger i filen quiz.js.

// Funktion för att visa huvud menyn
function openMenu() {
    Helper.show(mainMenu); // Använder mig av min helper funktion för att visa huvudmenyn
}

// Funktion för att dölja huvumenyn 
function closeMenu() {
    Helper.hide(mainMenu); // Använder mig av min helper funktion för att dölja huvudmenyn
}

// Funktion för att visa övnings menyn
function openPractiseMenu() {
    Helper.show(pMenu); // Använder mig av min helper funktion för att visa övningsmenyn
    closeMenu(); // Anropar closemenu för ayy dölja huvudmenyn
}

// Funktion för att dölja övnings meny
function closePractiseMenu() {
    Helper.hide(pMenu); // Använder mig av min helper funktion för att dölja övningsmenyn
}

