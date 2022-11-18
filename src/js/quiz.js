// Kontainers för spelkomponenter
const quizWrapper = document.getElementById('quiz-wrapper'); // Kontainer för testet
const questWapper = document.getElementById('question-container'); // Kontainer för frågor och svarsalternativ
const resultWapper = document.getElementById('result-container'); // Kontainer för resultat
const btnWapper = document.getElementById('btn-conatainer'); // Kontainer för knappar

// Knappar
const nextBtn = document.getElementById('next-btn'); // Knapp nästa fråga
const stopBtn = document.getElementById('stop-btn'); // Knapp avbryta testet
const submitBtn = document.getElementById('submit-btn'); // Knapp skicka in svaren och visa resultatet
const returnBtn = document.getElementById('return-btn'); // Knapp för att avsluta och gå tillbaka till övningsmenyn

stopBtn.addEventListener('click', () => { // När stopp knappen klickas
    removeQuiz(); // Anropar funktionen removeQuiz
    setGameToDefault(); // Anropar funktion setGameToDefault för att återställa allt till default läge
    openPractiseMenu(); //  Öppnar övningsmenyn
});




// Deklarerar teman
const wind = 'wind';
const safety = 'safety';
const launch = 'launch';
const gear = 'gear';
const rules = 'rules';

// Funktion för att visa quiz kontainern
function buildQuiz() {
    Helper.show(quizWrapper); // Visar quiz kontainern
    Helper.show(stopBtn); // Visar stopKnappen
    //console.log('Quiz container open');
}

// Funktion för att dölja quiz kontainern
function removeQuiz() {
    Helper.hide(quizWrapper); // Döljer quiz kontainern
    //console.log('Quiz container closed');
}

// Återställer spelet till deafault visningsläge
function setGameToDefault() {
    Helper.show(nextBtn); // Visar nästa fråga knappen
    Helper.show(stopBtn); // Visar knappen för att avbryta spel
    Helper.hide(resultWapper); // Döljer resultat konatinern
    Helper.show(questWapper); // Visar kontainer för frågor och svarsalternativ
    Helper.hide(submitBtn); // Döljer submit kanpper
    Helper.hide(returnBtn); // Döljer return knappen
}


// Startar testet
function startPractiseQuiz(theme) {
    //console.log('Quiz prepares');
    
    closePractiseMenu(); // Stänger övnings menyn
    buildQuiz(); // Anropar buildQuiz och visar quiz kontainern

    // Hämtar frågorna i json filen
    fetch('./src/json/questions.json')
    .then(response => response.json())
    .then(data => {

        // Kollar vilket temat som användaren valt
        if(theme === wind) { // Om temat är wind
            //console.log('Wind quiz started');
            data = data[0].wind_theory; // data inhåller enbart data ifrån wind kategorin
 
        } 
         
        if(theme === safety) { // Om temat är safety
            //console.log('Safety quiz started')
            data = data[0].safety_theory; // data inhåller enbart data ifrån safety kategorin
           
        } 
         
        if(theme === launch) { // Om temat är launch
            //console.log('Launch and landing quiz started');
            data = data[0].launch_theory; // data inhåller enbart data ifrån launch kategorin
          
         } 
         
        if(theme === gear) { // Om temat är gear
            //console.log('Gear quiz started');
            data = data[0].gear_theory; // data inhåller enbart data ifrån gear kategorin
         
        } 
         
        if(theme === rules) { // Om temat är rules
            //console.log('Right of way rules quiz started');
            data = data[0].rules_theory; // data inhåller enbart data ifrån rules kategorin
          
        }
        qIndex=0; // Nollställer qIndex för att quiz ska kunna köras upprepade gånger
        prepareQuestions(data); // Förbereder frågorna 
        runQuiz(data); // Körs quizet

    })
    .catch(console.log('Something went wrong'));    // Om det inte går att läsa in json filen skrivs ett error meddelande ut i konsollen
}

// Förbereder och skapar en kontainer för varje fråga utifrån vald kategori.
function prepareQuestions(data) {
    
    let html = ""; // Deklarer variabel  html
    for(let i=0;i<data.length;i++) { // Loopar igenom frågorna.
         
        // Skapar en div och skriver fråge nummer, fråga samt skapar en div för svarslteraiven
        html += `<div id="q${i}" class="questions flex-dire-column">
                <p class="question-number">${i+1}/${data.length}</p>
                <p class="question">${data[i].question}</p>
                <div class="center flex-dire-column option-box" id="optionBox${i}">`;
         
        // Loopar igenom svars alternativen        
        for(let j=0;j<data[i].options.length;j++) {

            // Skriver ut en checkbox knapp för varje svarslternativ
            html += `<input class="option${i} option" name="quiz-option${i}" type="radio" value="${data[i].options[j]}">${data[i].options[j]}</input><br>`;  
        }

        // Stänger div för svarsalterntiv och fråge kontainern. Skapar även ett error meddelande som visas om användare ej har valt något alternativ
        html += `</div>
                <p class="error-message" id="error-message${i}">You have to choose one of the options.</p>
                </div>`;

    }       

    Helper.setHtml(questWapper, html); // Helper funktion för att skriva ut html koden i frågekontainern
       
       
}



// Quizet körs.
function runQuiz(data) {

    let score = 0; // Variabel som innehåller poäng
    let qIndex = 0; // Variabel för fråge index
    const questions = document.getElementsByClassName('questions'); // Variabel för frågorna. Varje fråga ligger i en kontainer med som har klassnamnet questions
    
    showNextQuestion(qIndex++); // Funktionen next question anropas och qIndex++ ökas med 1
    //console.log(data);

    function showNextQuestion(qIndex) {
    
        console.log(qIndex); // Visar qIndex i consollen för att hålla kolla på fråge nummer.
        if(qIndex>=(data.length-1)) { // Om qIndex är lika med eller större än antal frågor - 1 (nästa sista frågan)
            Helper.hide(nextBtn); // Next question knappen döljs.
            Helper.show(submitBtn); // Submit knappen visas
            
        }
        for(let i=0;i<data.length;i++){ // Loopar igenom alla frågor 
            questions[i].style.display = "none"; // Döljer alla kontainers med var fråga

        }
        questions[qIndex].style.display = "flex"; // Visar frågan med det nuvarandra index numret (som ökas varje gång knappen next question körs.)
    }  

    submitBtn.onclick = () => { // När knappen submit klickas 
        
        validate(); // Funkationen validate körs
        Helper.hide(questWapper); // Döljer fråge kontainern
        Helper.show(resultWapper);  // Visar resultat kontainern
        Helper.hide(submitBtn); // Döljer submit knappen
        Helper.hide(stopBtn); // Döljer stoppa knappen
        Helper.show(returnBtn); // Visar return knappen
        console.log('The total score is:' +score); // Skriver ut total poängen
        
        let resultText = '';// Deklarer en variabel för det som ska skrivas ut
        // If the user have full score
        
        // Om användaren har full pott 
        if(score===data.length) {
            resultText += `<p>${score}/${data.length}</p>
                           <p>Hurray!</p>`;// Skriver ut resultatet
        }

        // Om användaren har mer än 50% rätt
        else if(score >= (data.length/2)) {
            resultText += `<p>${score}/${data.length}</p>
                           <p>Keep it up!</p>`; // Skriver ut resultatet
        }
        // Om användaren har mindre än 50% rätt
        else {
            resultText += `<p>${score}/${data.length}</p>
                           <p>Dude you have to practise more.</p>`; // Skriver ut resultatet 
        }
        Helper.setHtml(resultWapper,resultText); // Skriver ut resultatet i resultWrapperVDWS
    }

    returnBtn.onclick = () => { // När användare klickar på return knappen
        qIndex = 0;
        removeQuiz(); //Stäng quiz kontainern med funktionen removeVDWSQuiz();
        setGameToDefault(); // Återställer till default med setGameToDefault();
        openPractiseMenu(); // Öppnar huvudmenyn       
    }

    nextBtn.onclick = () => { // När next question knappen klickas
        validate(); // varje gång användaren vill gå till nästa fråga anropas funktion validate();
        showNextQuestion(qIndex++); // Funktion showNextQuestion körs igen och nästa fråga visas genom att qIndex ökas med 1
    }

    function validate() { // Funktionen validate körs. Här kollar jag om användaren har valt minst en checkbox och poängräkningen sker

        //console.log('Validating');
        const optionIndex = qIndex-1; // Variabel index för frågan som ska kollas
        const optionContainer = document.getElementById('optionBox'+optionIndex); // Variabel för den fråge konatiner som gäller.
        const selectedOption = optionContainer.querySelector('input[type=radio]:checked'); // Variabel för valt alternativ i 
        const erMessage = document.getElementById('error-message'+optionIndex); // Variabel för error meddelande

        // Kollar om användaren har valt minst ett altertiv,
        if(!selectedOption) {
            Helper.show(erMessage); // Om något alternativ ej är valt visas error meddelandent
            event.preventDefault(); // Om något ej är valt förhindras användaren att gå vidare
        }   
        
        const userAnswer = optionContainer.querySelector('input[type=radio]:checked').value; // Variabeln med valt alternativ
      
        let correctAnswer = data[optionIndex].answer; // Variabel för rätt svar
        correctAnswer = correctAnswer.toString(); // Skruver om rätt svar ifrån json format till ren stränf
        //console.log(correctAnswer); 

        // Jämför användarens svar med det rätta svaret. Om de är lika ökas poängen.
        if(userAnswer === correctAnswer) {
            score++; // För varje korrect svar ökas poängen med 1
                console.log('The score is: '+score); // Skriver ut nuvarnde poäng consollen
        }       
    }
}






     

