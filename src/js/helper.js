/* Denna fil innehållare hjälpande funktioner  */

/* Objekt som jag kallar helper */
const Helper = {};

/*Hjälp funktion för att skriva ut html kod*/
Helper.setHtml = function(tag,html) {
    tag.innerHTML = html;
}
/* Hjälp funktion för att visa element. */
Helper.show = function(tag) {
    tag.style.display = "flex";
}

/* Hjälp funktion för att dölja element */
Helper.hide = function(tag) {
    tag.style.display = "none";
}

