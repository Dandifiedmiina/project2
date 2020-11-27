<<<<<<< HEAD
//lisätään event listeners napeille
=======
//lisätään event listeners
>>>>>>> 734af9fc6306607e4f77c540e3cc930d529daf8c
document.getElementById("search").addEventListener("click", searchMovie);
document.getElementById("getmore").addEventListener("click", getMore);

//lisätään muutamia globaaleja muuttujia, joita tarvitsemme useammin eri funktioissa
var searchSplit;
var searchApi;
var titleApi;
var pages;
var results;
//asetetaan arvo 0 (get more funktion) klikkauksille
//määrä kertoo monesko sivu haetaan API:n tuloksista
var clicked = 0;

//haetaan arvo jonka käyttäjä syöttää
var after = 2020;

//search näppäimen funktio
function searchMovie() {
  //poistetaan mahdolliset vanhat haut
  document.getElementById("movies").innerHTML = "";
  //haetaan syötetty arvo
  var search = document.getElementById("insertMovie").value;

  //haetaan syötetty vuosi
  after = document.getElementById("after").value;
  //lisätään alert mikäli hakusanaa ei ole täytetty
  if (search === "") {
    alert("write a search word");
    //palautetaan
    return false;
  }

  //käsitellään haku jotta voimme lisätä sanat API-hakuun
  //erotetaan sanat
  searchSplit = search.split(" ");
  //lisätään ensimmäinen sana
  searchApi = searchSplit[0];
  //käydään läpi loopilla loput sanat
  for (i = 1; i < searchSplit.length; i++) {
    searchApi += "+" + searchSplit[i];
  }

  //tallennetaan API-osoite, hyödynnetään TMDB:n tarjoamaa haku APIa
  var API =
    "https://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=";
  //yhditetään API-osite ja haun arvo(t), jolloin voimme tehdä palauttaa oikean arvon
  var call = API + searchApi;

  //tehdään AJAX haku
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", call, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //käsitellään vastaus
      var jsonS = xmlhttp.responseText;
      //muutetaan objekteiksi
      var myObj = JSON.parse(jsonS);
      pages = myObj.total_pages;
      results = myObj.total_results;
      //hakutulosten määrä kokonaisuudessaan, lisätään verkkosivuille
      document.getElementById("results").innerHTML =
        "Total results with search word: " + myObj.total_results;

      document.getElementById("getmore").value = "Get More! Pages: 1/" + pages;
      //kutsutaan funktiota parseData
      parseData(myObj);
    }
  };
  //muutetaan hakutulosten taulukon pohja näkyvyys näkyväksi
  document.getElementById("hidden").style.visibility = "visible";
}

//käsitellään
function parseData(myObj) {
  //luodaan taulukko ja lisätään se elementtiin
  var table = document.getElementById("movies");
  table.setAttribute("class", "moviesTable");
  //luodaan 1. rivi

  var tr = table.insertRow(0);
  //luodaan solut

  //Luodaan ensimmäinen rivi vain ensimmäisella hakukerralla
  if (clicked == 0) {
    var td1 = tr.insertCell(0);
    var td2 = tr.insertCell(1);
    var td3 = tr.insertCell(2);

    //lisätään ensimmäisen rivin ensimmäiseen soluun otsikko ja arvostelu
    td1.innerHTML = "MOVIE";
    //1.rivin ja 2.solun tiivistelmä
    td2.innerHTML = "PLOT";
  }
  //Ensimmäisen elokuvan otsikko käsitellään, uutta hakua varten
  //For loop käy läpi otsikot 2. eteenpäin
  for (i = 0; i < myObj.results.length; i++) {
    var date = myObj.results[i].release_date;
    //mikäli tietoa ei saatavilla
    if (date === undefined) {
      //luodaan seuraava rivi ja solut, hyödnnetään for-looppia
      tr = table.insertRow(rows); //aina viimesen rivin  jälkeen luodaan uusin
      td1 = tr.insertCell(0);
      td2 = tr.insertCell(1);
      td3 = tr.insertCell(2);

      var tableLength = document.getElementById("movies");
      var rows = tableLength.rows.length;

      //Syötetään soluihin haetut arvot otsikko+arvostelu
      td1.innerHTML =
        myObj.results[i].title + " " + myObj.results[i].vote_average + "/10";

      //tiivistelmä
      td2.innerHTML = myObj.results[i].overview;
      //IMDB:stä saadut tiedot
      td3.innerHTML = "Release date: " + "Unavailable";
    } else {
      //hajotetaan haetun API:n arvo päivämäärälle
      var dateSplit = date.split("-");
      //tallennetaan rivien määrä muuttujaan
      var tableLength = document.getElementById("movies");
      var rows = tableLength.rows.length;

      if (dateSplit[0] <= after) {
        //luodaan seuraava rivi ja solut, hyödnnetään for-looppia
        tr = table.insertRow(rows); //aina viimesen rivin  jälkeen luodaan uusin
        td1 = tr.insertCell(0);
        td2 = tr.insertCell(1);
        td3 = tr.insertCell(2);

        //Syötetään soluihin haetut arvot otsikko+arvostelu
        td1.innerHTML =
          myObj.results[i].title + " " + myObj.results[i].vote_average + "/10";

        //tiivistelmä
        td2.innerHTML = myObj.results[i].overview;
        //IMDB:stä saadut tiedot
        td3.innerHTML = "Release date: " + myObj.results[i].release_date;
      }
    }

    //mikäli kaikki sivut on käyty läpi
    if (pages === clicked) {
      tr = table.insertRow(rows);
      td1 = tr.insertCell(0);
      td2 = tr.insertCell(1);
      td3 = tr.insertCell(2);

      td2.innerHTML = "End of results";
    }

<<<<<<< HEAD
    //jos ei tule tuloksia niin lisäohjeet, pidetään taulukon muoto joten luodaan myös solut ja rivi
=======
    //jos ei tule tuloksia niin lisäohjeet
>>>>>>> 734af9fc6306607e4f77c540e3cc930d529daf8c
    if (tableLength.rows.length == 1) {
      tr = table.insertRow(rows);
      td1 = tr.insertCell(0);
      td2 = tr.insertCell(1);
      td3 = tr.insertCell(2);

      td2.innerHTML =
        "Most popular titles didn´t match your search. Try searching for more or change your search parameters ";
    }
  }
}

//funktio get more klikkauksen käsittelyyn
function getMore() {
  //klikkauksen määrään lisätään 1
  clicked = clicked + 1;
  //haetaan hakusana ja käsitellään
  var search = document.getElementById("insertMovie").value;
  searchSplit = search.split(" ");
  //lisätään ensimmäinen sana
  searchApi = searchSplit[0];

  //käydään läpi loopilla loput sanat
  for (i = 1; i < searchSplit.length; i++) {
    searchApi += "+" + searchSplit[i];
  }

<<<<<<< HEAD
  //tehdään napille uusi siältö missä sivujen määrä
=======
>>>>>>> 734af9fc6306607e4f77c540e3cc930d529daf8c
  document.getElementById("getmore").value =
    "Get More! Pages: " + (clicked + 1) + "/" + pages;

  //tallennetaan API-osoite, hyödynnetään TMDB:n tarjoamaa haku APIa
  var API =
    "https://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=";
  //yhditetään API-osite ja haun arvo(t), jolloin voimme tehdä palauttaa oikean arvon
  var call = API + searchApi + "&page=" + (clicked + 1); //lisätään monesko sivu haetaan klikausten määrän perusteella

  //tehdään AJAX haku
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", call, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //käsitellään vastaus
      var jsonS = xmlhttp.responseText;
      //muutetaan objekteiksi
      myObj = JSON.parse(jsonS);
      //kutsutaan funktiota parseData
      parseData(myObj);
    }
  };
<<<<<<< HEAD
  //jos sivut loppuvat niin ilmoitus käyttäjälle
=======
>>>>>>> 734af9fc6306607e4f77c540e3cc930d529daf8c
  if (clicked == pages) {
    alert("End of results");
  }
}
