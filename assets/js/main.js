var nizRadio = ["1kg","2kg","3kg","4-5kg","6-7kg"];
var brisanje=document.getElementsByClassName("brisanje");
var uspesnaPoruka=document.getElementById("ispisTacnePoruke");
var nizGradovi=[
   { "value": "BG","tekst": "Beograd"},
   { "value": "NS","tekst": "Novi Sad"},
   { "value": "KG","tekst": "Kragujevac"},
   { "value": "NI","tekst": "Nis"},
   { "value": "UE","tekst": "Uzice"},
   { "value": "PP","tekst": "Prijepolje"},
   { "value": "ZR","tekst": "Zrenjanin"},
   { "value": "SU","tekst": "Subotica"},
   { "value": "KR","tekst": "Kraljevo"},
   { "value": "PŽ","tekst": "Pozega"},
   { "value": "ŠA","tekst": "Sabac"}
]
function potvrda() {

        
        var ispravno = true;
        uspesnaPoruka.innerHTML="";
        var reIme = /^[A-ZŽŠĐČĆ][a-zšđčćž]{2,11}$/;
        var rePrezime = /^([A-ZŽŠĐČĆ][a-zšđčćž]{2,15})(\s[A-ZŽŠĐČĆ][a-zšđčćž]{2,15})*$/;
        var reEmail = /^\w+([\.\-]\w+)*@\w+([\.\-]\w+)*(\.\w{2,4})+$/;
        var ime = document.querySelector("#ime").value.trim();
        var prezime = document.querySelector("#prezime").value.trim();
        var email = document.querySelector("#email").value.trim();
        var vrsta = document.querySelector("#vrsta").value.trim();
        var poruka = document.querySelector("#poruka").value.trim();
        var godine = document.querySelector("#godine");

        if(!reIme.test(ime)) {
            document.querySelector("#ime").classList.add("border");
             ispravno = false;
         } else{
            document.querySelector("#ime").classList.remove("border");
         }

         if(!rePrezime.test(prezime)) {
            document.querySelector("#prezime").classList.add("border");
             ispravno = false;
         } else{
            document.querySelector("#prezime").classList.remove("border");
         }

         if(!reEmail.test(email)) {
            document.querySelector("#email").classList.add("border");
             ispravno = false;
         } 
         else{
            document.querySelector("#email").classList.remove("border");
         }
         if(vrsta == "") {
            document.querySelector("#vrsta").classList.add("border");
            ispravno = false;  
         } 
         else{
            document.querySelector("#vrsta").classList.remove("border");
         }
        if(poruka == "") {
            document.querySelector("#poruka").classList.add("border");
            ispravno = false;  
         } 
         else{
            document.querySelector("#poruka").classList.remove("border");
         }
         var radio = document.getElementsByName("godine");

        
         var odabrano=false;
         var god1="";
         for(var i = 0; i < radio.length; i++) {
             if(radio[i].checked) {
                odabrano=true;
                god1=radio[i].value;
                break;
            }
         }
        


         if(!odabrano){
            godine.classList.add("crveniTekst");
            ispravno = false;  
         }
         else{
            godine.classList.remove("crveniTekst");
         }
         var odabrano1=false;
         var drop1=""
         var drop=document.querySelectorAll(".drop");
         for(var i = 1; i < drop.length; i++) {
            if(drop[i].selected) {
               odabrano1=true;
               drop1=drop[i].value;
               break;
            }
        }
       

        if(!odabrano1){
            document.querySelector("#dropLista").classList.add("border");
            ispravno = false;  
         }
         else{
            document.querySelector("#dropLista").classList.remove("border");
         }

         if(ispravno){
            uspesnaPoruka.innerHTML="Thanks for ordering!";
            uspesnaPoruka.style.color="#00ff00";
            uspesnaPoruka.style.fontSize="25px";   
            for (let i = 0; i < brisanje.length; i++) {
            brisanje[i].value="";
            }
            drop[0].selected=true; 
            for(var i = 0; i < radio.length; i++) {
                radio[i].checked=false;
            }

            if(localStorage){
               localStorage.setItem("ime",ime);
               localStorage.setItem("prezime",prezime);
               localStorage.setItem("email",email);
               localStorage.setItem("godine",god1);
               localStorage.setItem("drop",drop1); 
            }
            else{
               console.log("localStorage not supported");
            }
           
         }
} 
function prikaziProizvode(){
   $.ajax({
   url : "podaci/proizvodi.json",
   method : "GET",
   type : "json",
   success : function(data) {
   ispisProizvoda(data);
   },
   error : function(xhr, error, status) {
   alert(status);
   }
   });
   } 
   function ispisProizvoda(data){
      let ispis='';
      for (let i of data) {
      ispis+=`<div class="clanakDrugi">
   <img src="${i.slika.src}" alt="${i.slika.alt}"/>
      <h3>${i.ime}</h3>
      <h4>${i.cena}$/kg</h4>
      <div class="tabela" style="display: none;">
            <h2>${i.tabela.naslov}</h2>
       <p>${i.tabela.opis}</p></div></div>
   `;
      }
      document.getElementById("proizvodi").innerHTML=ispis;
      }
      function filtrirajPoMarki(markaId) {
     
      $.ajax({
      url : "podaci/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(data){
      data = data.filter(p => p.marke.id == markaId);
      ispisProizvoda(data);
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
      }
      function sortirajRastuce(){
      $.ajax({
      url : "podaci/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(data) {
      if(document.querySelector("#dropMarke").value==0){
      data.sort(function(a,b) {
      if(a.cena == b.cena)
      return 0;
      return a.cena < b.cena ? -1 : 1;
      });
      }
      else{
      data = data.filter(p => p.marke.id ==
     document.querySelector("#dropMarke").value);
      data.sort(function(a,b) {
      if(a.cena == b.cena)
      return 0;
      return a.cena < b.cena ? -1 : 1;
      });
      }
     
      ispisProizvoda(data);
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
     
      }
      function sortirajOpadajuce(){
      $.ajax({
      url : "podaci/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(data) {
      if(document.querySelector("#dropMarke").value==0){
      data.sort(function(a,b) {
      if(a.cena == b.cena)
      return 0;
      return a.cena > b.cena ? -1 : 1;
      });
      }
      else{
      data = data.filter(p => p.marke.id ==
     document.querySelector("#dropMarke").value);
      data.sort(function(a,b) {
      if(a.cena == b.cena)
      return 0;
      return a.cena > b.cena ? -1 : 1;
      });
      }
     
      ispisProizvoda(data);
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
      }
      function filterSearch() {
      $.ajax({
      url : "podaci/proizvodi.json",
      method : "GET",
      type : "json",
      success : function(data) {
      let vrednost = document.getElementById("search").value;
      let podaci = data.filter(p=>
     p.ime.toUpperCase().indexOf(vrednost.trim().toUpperCase()) != -1);
      ispisProizvoda(podaci);
     
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
     
     }
     window.onload = function () {
     
     
      prikaziProizvode();
     
      $.ajax({
      url : "podaci/mreze.json",
      method : "GET",
      type : "json",
      success : function(data) {
      let ispis='';
      data.forEach(function (deo) {
      ispis += `<li><a href="${deo.mreza}" target="_blank"><i
     class="${deo.fafa}"></i></a></li>`;
      });
      document.getElementById("mreze1").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
      $.ajax({
      url : "podaci/opis.json",
      method : "GET",
      type : "json",
      success : function(data) {
      let ispis=`<p class="tekstGalerije nevidljiv
     vidljiv">${data[0]}</p>`;
     
      for (let i = 1; i < data.length; i++) {
      ispis+=`<p class="tekstGalerije
     nevidljiv">${data[i]}</p>`;
      }
      document.getElementById("opis").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
      $.ajax({
      url : "podaci/slike.json",
      method : "GET",
      type : "json",
      success : function(data) {
      let ispis=`<a href="assets/img/${data[0].velika}" datalightbox="ourgallery">
      <img src="assets/img/${data[0].mala}" class="nevidljiv
     vidljiv" alt="${data[0].alt}"/></a>`;
      for (let i = 1; i < data.length; i++) {
      ispis+=`<a href="assets/img/${data[i].velika}" datalightbox="ourgallery">
      <img src="assets/img/${data[i].mala}" class="nevidljiv"
     alt="${data[i].alt}"/></a>`;
      }
      document.getElementById("slike1").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
      $.ajax({
      url : "podaci/vrste.json",
      method : "GET",
      type : "json",
      success : function(data) {
      let ispis='';
      for (let i of data) {
      ispis+=`<option value="${i.id}">${i.naziv}</option>`;
      }
     
      document.getElementById("dropMarke").innerHTML+=ispis;
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
      $.ajax({
      url : "podaci/types.json",
      method : "GET",
      type : "json",
      success : function(data) {
      let ispis='';
      for (let i of data) {
      if(i.prvi){
      ispis+=`<div class="clanak" id="prviClanak">`;
      }
      else{
      ispis+=`<div class="clanak">`;
      }
      ispis+=`<h2>${i.naziv}</h2>
      <img src="${i.slika.src}" alt="${i.slika.alt}"/>
      <p>${i.tekst.manji}</p>
      <p class="tekstClanak">${i.tekst.veliki}</p>
      <button type="button" class="maloDugme">Read More</button>
      </div>`;
      }
      document.getElementById("brendovi2").innerHTML=ispis;
      },
      error : function(xhr, error, status) {
      alert(status);
      }
      });
     
      document.querySelector("#dropMarke").addEventListener("change",
     function() {
      Number(this.value) ? filtrirajPoMarki(this.value) :
     prikaziProizvode();
      });
      document.querySelector("#sortiranje").addEventListener("change",
     function() {
      let val= Number(this.value);
      if(val==1){
      sortirajRastuce();
      }else if(val==2){
      sortirajOpadajuce();
      }
      });
      document.querySelector("#search").addEventListener("keyup",
     filterSearch);
      

    var brojac1=document.querySelector("#brojac");
    for (let i = 0; i <11; i++) {
        brojac1.innerHTML+=`<li class="brojac1">${i+1}</li>`;
    }

    brojac1.innerHTML+=`<li class="brojac1 aktivan">${12}</li>`;

   
   
    let ispis=`<option value="0" class="drop">Choose...</option>`;
    nizGradovi.forEach(function (deo) {
      ispis += `<option value="${deo.value}" class="drop">${deo.tekst}</option>`;
    });
    document.getElementById("dropLista").innerHTML=ispis;
	
	
	
	 document.getElementsByName("posalji")[0].addEventListener("click", potvrda);

 

    var radio=document.getElementById("radio");
    var ispisGodina=``;
    for(let i of nizRadio){
      ispisGodina+=`<li><label class="pol"> <input type="radio" name="godine" value="${i}"/>${i}</label></li>`; 
    }
    radio.innerHTML =ispisGodina;
    

    document.getElementsByName("brisanje")[0].addEventListener("click", function () {  
        uspesnaPoruka.innerHTML="";
        for (let i = 0; i < brisanje.length; i++) {
            brisanje[i].value=""
            brisanje[i].classList.remove("border");
            }
            document.getElementsByClassName("drop")[0].selected=true; 
            for(var i = 0; i < radio.length; i++) {
                radio[i].checked=false;
            }
            document.getElementById("godine").classList.remove("crveniTekst"); 
    });

    if(localStorage){
     
      document.querySelector("#ime").value=localStorage.getItem("ime");
      document.querySelector("#prezime").value=localStorage.getItem("prezime");
      document.querySelector("#email").value=localStorage.getItem("email");
      let god=localStorage.getItem("godine");
      let drop=localStorage.getItem("drop");


      let god1=document.getElementsByName("godine");
      let drop1=document.getElementsByClassName("drop");
     
      for(var i = 0; i < god1.length; i++) {
         if(god1[i].value==god) {
            god1[i].checked=true;
            break;
        }
       }
    
     for(var i = 0; i < drop1.length; i++) {
      if(drop1[i].value==drop) {
         drop1[i].selected=true;        
         break;
     }
     
    }

   }

	
							
							
}					