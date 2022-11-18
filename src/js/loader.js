/* Script för när applikationen startas och när loadbaren animeras, denna del är delvis har skapats delvis med hjälp ifrån: https://www.w3schools.com/howto/howto_js_progressbar.asp */

/* Deklerar en variabel för sidan page-loader */
const loader = document.getElementById('page-loader');
/* Deklarer en variabel o */
let o = 0;
/* Anropar och kör funktionen */
move();

/* Funktionen move, som animerar laddaren */
function move() {
    /* Om o är lika med noll körs följande skript */
    if(o == 0) {
        o = 1; // O får värdet 1.
        const loadStart = document.getElementById('load-start'); // Deklarerar en variabel för load-start som i början har bredden 1%
        let width = 1; // Deklarerar een varibael för bredden
        let runBar = setInterval(run,10); // Kör funktionen run varje  10 milliskeunder
        function run() { // Funktionen run
            if(width>=100) { // Om bredden är större eller lika 100 
                clearInterval(runBar); // Stoppar variabel runBar som kör funktionen run 
                o=0; // Nollställer o
            }else { // Annars om bredden är mindre än 100
                width++; // Bredden ökas med 1 varje gång funktionen körs
                loadStart.style.width = width+"%"; //Bredden läggs på i stylingen vilken får elementet att animeras.
            }
        }
    /* När den har animeras färdigt anropas funktionen removeLoader(); */    
    removeLoader();
    }    
}


/* Funktion tar bort start sidan och och huvudmenyne visas efter */
function removeLoader() {
    /* Jag sätter en timer för som döljer sidan page-loader helt efter 1 sekund  */
    setTimeout( () => {
        loader.style.display = "none"; /* Döljer sidan page-loader */
    },1000)
}