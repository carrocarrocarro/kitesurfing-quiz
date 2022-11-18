/* Denna sida styr vdws slut testet */

// Kontainers för olika delar av quizet
const quizWrapperVDWS = document.getElementById('quiz-wrapper-vdws'); // Variabel för huvudkontainern
const veriBox = document.getElementById('verify-code'); // Variabel för konatiner där verifiaktionen sker
const questContainer = document.getElementById('question-container-vdws'); // Variabel för kontainer där frågor och svars alternativ visas
const resultWrapperVDWS = document.getElementById('result-container-vdws'); // Variabel för resultat kontainern


// Knappar
const nextBtnVDWS = document.getElementById('next-btn-vdws'); // Varibel för knapp 'next question'
const stopBtnVDWS = document.getElementById('stop-btn-vdws'); // Variabel för att avbryta spelet 'krysset*
const submitBtnVDWS = document.getElementById('submit-btn-vdws'); // Variabel för att avsluta och visa resultatet av quizet
const returnBtnVDWS = document.getElementById('return-btn-vdws'); // Variabel för knappen att gå tillbaka till övnings menyn
const cancelVeriBtn = document.getElementById('cancel-verify'); // Variabel för knappen att avbryta verifering
const veriBtn = document.getElementById('verify-btn'); // Variabel för knappen att verifera kod

cancelVeriBtn.addEventListener('click', cancelGame); // Klick event för att avbryta spel
veriBtn.addEventListener('click', verifyCode); // Klick event för att verifera kod

stopBtnVDWS.addEventListener('click', () => { // Klick event för att avbryta testet
    Helper.hide(quizWrapperVDWS); // Döljer quiz kontainern
    setGameToDefaultVDWS(); // Anropar funktion setGameToDefaultVDWS för att återställa allt till default läger
    openMenu(); // Öppnar huvumenyn
});

//Error message
function errorMessage() {
    document.getElementById('errorMessage').style.display = 'block';
}


// Återställer spelet till deafault visningsläge
function setGameToDefaultVDWS() { 
    Helper.show(nextBtnVDWS); // Visar nästa fråga knappen
    Helper.show(stopBtnVDWS); // Visar knappen för att avbryta spel
    Helper.hide(quizWrapperVDWS); // Döljer spel kontainern 
    Helper.hide(resultWrapperVDWS); // Döljer resultat konatinern
    Helper.show(questContainer); // Visar kontainer för frågor och svarsalternativ
    Helper.hide(submitBtnVDWS); // Döljer submit kanpper
    Helper.hide(returnBtnVDWS); // Döljer return knappen
}

// Visar verifikations kontainern
function showVerify() {
    Helper.show(veriBox); // Visar verifikations kontainer
    Helper.hide(mainMenu); // Döljer huvudmenyn
} 


// Visar quiz konatinern
function buildVDWSQuiz() {
    Helper.show(quizWrapperVDWS); // Visar quiz konatinern
}

// Döljer quiz konatinern
function removeVDWSQuiz() {
    Helper.hide(quizWrapperVDWS); // Döljer quiz konatinern
}

// Avbryter testet
function cancelGame() {
    Helper.hide(veriBox); // Döljer verifkations kontainerna
    openMenu(); // Öppnar huvudmenyn
}


// Funktion för att verifiera kod
function verifyCode() {
    let code = document.getElementById('verification-code').value; // Hämtar koden
    if(code === '1234') { // Om koden är 1234 startas spelet
        buildVDWSQuiz(); // Anropar funktion buildVDWSQuiz() för visa spela konatiner
        startVDWSTest(); // Anropar funktionen startVDWSTest(); för att starta spelet.
        Helper.hide(veriBox); // Döljer verifikations kontainern
        
    }
    else { // Om koden inte är giltig kommer ett error meddelande
        alert('Code is not valid'); // En alert med error meddelande
    }

    code = '';
}

// Testet körs
function startVDWSTest() {

    // Hämtar frågorna ifrån json filen med fetch
    fetch('./src/json/questions_vdws_en.json')
    .then(response => response.json())
    .then(data => {

        qIndex = 0; // Sätter frågeindex till 0
        prepareVDWSQuestions(data); // Anropar funktionen prepareVDWSQuestions och skickar med frågorna i parametern data. 
        runVDWSQuiz(data); // Anropar funktionen runVDWSQuiz och skickar med frågorna i parametern data. 

    })
    .catch(); // Om json filen inte kan läsas in.
    
}

// Bygger själva frågorna och svars alternativen samt skriver i dessa i html kod
function prepareVDWSQuestions(data) {
    
    let html = ""; // Deklarer variabel  html
    for(let i=0;i<data.length;i++) { // Loopar igenom frågorna. Loopen körs så många varv som motsvarar längden av frågorna 0-23 (24 frågor)
            
            // Skapar en div och skriver fråge nummer, fråga samt skapar en div för svarslteraiven
            html += `<div id="q${i}" class="questions flex-dire-column">
                    <p class="question-number">${i+1}</p>
                    <p class="question">${data[i].question}</p>
                    <div class="center flex-dire-column option-box" id="optionBoxVDWS${i}">`;
            for(let j=0;j<data[i].options.length;j++) { // Loopar igenom svars alternativen
                    // Skriver ut en checkbox knapp för varje svarslternativ
                    html += `<input class="checkbox${i} checkbox" type="checkbox" value="${data[i].options[j]}">${data[i].options[j]}</input><br>`;  
            }

            // Stänger div för svarsalterntiv och fråge kontainern. Skapar även ett error meddelande som visas om användare ej hhar valt något alternativ
            html += `</div>
                    <p class="error-message" id="error-message-vdws${i}">You have to choose at least one of the options.</p>
                    </div>`;

    }       

    Helper.setHtml(questContainer, html); // Helper funktion för att skriva ut html koden i frågekontainern
       
}


// Quizet körs.
function runVDWSQuiz(data) {
    
    let score = 0; // Variabel som innehåller poäng
    let qIndex = 0; // Variabel för fråge index
    const questions = document.getElementsByClassName('questions'); // Variabel för frågorna. Varje fråga ligger i en kontainer med som har klassnamnet questions
    
    showNextQuestion(qIndex++); // Funktionen next question anropas och qIndex++ ökas med 1

    function showNextQuestion(qIndex) { // Funktionen som visar nästa fråga 
    
        console.log(qIndex);  // Visar qIndex i consollen för att hålla kolla på fråge nummer.
        if(qIndex>=(data.length-1)) { // Om qIndex är lika med eller större än antal frågor - 1 (nästa sista frågan)
            Helper.hide(nextBtnVDWS); // Next question knappen döljs. 
            Helper.show(submitBtnVDWS); // Submit knappen visas
        }

        for(let i=0;i<data.length;i++){ // Loopar igenom alla frågor 
            questions[i].style.display = "none"; // Döljer alla kontainers med var fråga
        }

        questions[qIndex].style.display = "flex"; // Visar frågan med det nuvarandra index numret (som ökas varje gång knappen next question körs.)
    }  

    submitBtnVDWS.onclick = () => { // När knappen submit klickas 
            
        validate(); // Funkationen validate körs
        Helper.hide(questContainer); // Döljer fråge kontainern
        Helper.show(resultWrapperVDWS); // Visar resultat kontainern
        Helper.hide(submitBtnVDWS); // Döljer submit knappen
        Helper.hide(stopBtnVDWS); // Döljer stoppa knappen
        Helper.show(returnBtnVDWS); // Visar return knappen
        console.log('The total score is:' +score); // Skriver ut total poängen
            
        let resultText = ''; // Deklarer en variabel för det som ska skrivas ut
        
        // Om användaren har full pott (81 är maxpoängen)
        if(score === 81) {
            resultText += `<p>${score}/81</p>
                           <p>Hurray! Full pot!</p>`; // Skriver ut resultatet
        }

        // Om användaren har 61 eller mer poäng
        else if(score >= 61) {

            resultText += `<p>${score}/81</p>
                           <p>You passed. Good job!</p>`; // Skriver ut resultat + att användaren är godkänd

        }

        // If 50% of the questions or more are correct
        else if(score >= 50) {

            resultText += `<p>${score}/81</p>
                           <p>You didn't pass. You have to do an oral exam with you VDWS instructor in order to get your license. </p>`;

        }

        // If ,less then 50% of the questions are correct
        else {
            resultText += `<p>${score}/81</p>
                           <p>You did'nt pass. You have to practise more to get your license.</p>`;
    
        }
        Helper.setHtml(resultWrapperVDWS,resultText); // Skriver ut resultatet i resultWrapperVDWS

    }

    returnBtnVDWS.onclick = () => { // När användare klickar på return knappen

        qIndex = 0; //
        removeVDWSQuiz(); //Stäng quiz kontainern med funktionen removeVDWSQuiz();
        setGameToDefaultVDWS(); // Återställer till default med setGameToDefault();
        openMenu(); // Öppnar huvudmenyn

    }

    nextBtnVDWS.onclick = () => { // När next question knappen klickas
                 
        validate(); // varje gång användaren vill gå till nästa fråga anropas funktion validate();
        showNextQuestion(qIndex++); // Funktion showNextQuestion körs igen och nästa fråga visas genom att qIndex ökas med 1
    }

         
    function validate() { // Funktionen validate körs. Här kollar jag om användaren har valt minst en checkbox och poängräkningen sker
        
        //console.log('Validating');
        const optionIndex = qIndex-1; // Variabel index för frågan som ska kollas
        const optionContainer = document.getElementById('optionBoxVDWS'+optionIndex); // Variabel för den fråge konatiner som gäller.
        const selectedOption = optionContainer.querySelector('input[type=checkbox]:checked'); // Variabel för valt alternativ i 
        console.log(selectedOption);
        const erMessage = document.getElementById('error-message-vdws'+optionIndex); // Variabel för error meddelande

        // Kollar om användaren har valt minst ett altertiv, Funkar ej 
        if(!selectedOption) {
            Helper.show(erMessage); // Om något alternativ ej är valt visas error meddelandent
            event.preventDefault(); // Om något ej är valt förhindras användaren att gå vidare
        }

        const correctAnswer = data[optionIndex].answer;  // En array med svars för frågan som kollas
        const checkedBoxes = []; // En array där alla alternativ som användaren valt kommer att förvaras
        const checkBoxes = optionContainer.querySelectorAll('input[type=checkbox]:checked'); // Hämtar alla alternativ som användare valt
            
        for(let i=0; i<checkBoxes.length;i++) { // Loopar igenom alla checkboxar

            checkedBoxes.push(checkBoxes[i].value); // Lägger till valda alternativ i arrayen checkedBoxes
            const userAnswer = checkBoxes[i].value; // Deklarer användarens svar
            //console.log(userAnswer);

            for(let j=0;j<correctAnswer.length;j++) { // Loopar igenom de rätta svaren

                const correctAnswers = correctAnswer[j]; // Deklarerar rätt svar
                //console.log(correctAnswers);

                if(userAnswer === correctAnswers) { // Jämför användarens svar med de rätta svaren. Om de är lika ökas poängen.

                    score++; // För varje korrect svar ökas poängen med 1

                }
            }
        }

        console.log(`Current score is: ${score}`); // Skriver ut nuvarnde poäng consollen
                
    }

}
