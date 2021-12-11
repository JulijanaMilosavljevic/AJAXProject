$(document).ready(function() {
    
    $("#btn").click(function(){
        if($('#meni1').is(':visible')) { 
             $('#meni1').slideUp("slow");
            
        } else {
            $('#meni1').slideDown("slow");
             
             }         
     }); 
    slajder();
    $("#naslov").hide();
    $("#naslov").fadeIn("slow");
    $("#desno").click(
        
       
       
        function () {
        var trenutni=$('#slike1 .vidljiv');
        var sledeci=trenutni.parent().next().length?trenutni.parent().next().children(':first'):trenutni.parent().parent().children(':first').children(':first');
        trenutni.hide().removeClass('vidljiv');
        sledeci.fadeIn().addClass('vidljiv');
    
        var trenutni1=$('#brojac .aktivan');
        var sledeci1=trenutni1.next().length?trenutni1.next():trenutni1.parent().children(':first');
        trenutni1.removeClass('aktivan');
        sledeci1.addClass('aktivan');

        var trenutni2=$('#opis .vidljiv');
        var sledeci2=trenutni2.next().length?trenutni2.next():trenutni2.parent().children(':first');
        trenutni2.removeClass('vidljiv');
        sledeci2.addClass('vidljiv');
    
        }
    
    );
    $("#levo").click(
        
        function () {
        var trenutni=$('#slike1 .vidljiv');
        var sledeci=trenutni.parent().prev().length?trenutni.parent().prev().children(':first'):trenutni.parent().parent().children(':last').children(':first');
        trenutni.hide().removeClass('vidljiv');
        sledeci.fadeIn().addClass('vidljiv');
    
        var trenutni1=$('#brojac .aktivan');
        var sledeci1=trenutni1.prev().length?trenutni1.prev():trenutni1.parent().children(':last');
        trenutni1.removeClass('aktivan');
        sledeci1.addClass('aktivan');

        var trenutni2=$('#opis .vidljiv');
        var sledeci2=trenutni2.prev().length?trenutni2.prev():trenutni2.parent().children(':last');
        trenutni2.removeClass('vidljiv');
        sledeci2.addClass('vidljiv');
    }
    
    );

    $("#naslov a").hover(dodavanjeHovera, brisanjeHovera);
    $(".maloDugme").hover(dodavanjeHovera, brisanjeHovera);
    $(".potvrda").hover(dodavanjeHovera, brisanjeHovera);
    $(".levoDesno").hover(dodavanjeHovera, brisanjeHovera);
    $(".tekstClanak").hide();
    

     $("#brendovi2").on(
        "click",".maloDugme",function(){ 
            if($(this).prev().is(':visible')) { 
                $(this).prev().slideUp("slow");
                $(this).text("Read more");
           } else {
                $(this).prev().slideDown("slow");
                 $(this).text("Read less");
                }         
                  
        });
    
        $("#proizvodi").on(
            "mouseenter",".clanakDrugi",function(){ 
                $(this).children(":last").fadeIn(500);
                $(this).animate({width:"+=3%"}, 500);
                      
            });
        $("#proizvodi").on(
            "mouseleave",".clanakDrugi",function(){  
                $(this).children(":last").fadeOut(500);
                $(this).animate({width:"-=3%"}, 500); 
            });
        
       $('#brendovi').click(function() {
            $('html, body').animate({
            scrollTop: $("#prvi").offset().top
            }, 1000);});
        $('#naslov a').click(function() {
             $('html, body').animate({
             scrollTop: $("#prvi").offset().top
            }, 1000);});
        $('#ponuda').click(function() {
             $('html, body').animate({
                scrollTop: $("#drugi").offset().top
            }, 1000);});
        $('#kontakt').click(function() {
             $('html, body').animate({
                scrollTop: $("#treci").offset().top
            }, 1000);});
        $('#galerija').click(function() {
            $('html, body').animate({
                scrollTop: $("#cetvrti").offset().top
            }, 1000);});
        $('#autor').click(function() {
            $('html, body').animate({
                scrollTop: $("#peti").offset().top
            }, 1000);});

        var btn = $('#dugmeGore');
        $(window).scroll(function() {
         if ($(window).scrollTop() > 300) {
            btn.addClass('show');
            } else {
            btn.removeClass('show');
            }
        });

        btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
        });          
});

        function dodavanjeHovera() {
             $(this).addClass("hover");
        }
        function brisanjeHovera() {
            $(this).removeClass("hover");
        }
        function slajder(){

        var trenutni=$('#slike1 .vidljiv');
        var sledeci=trenutni.parent().next().length?trenutni.parent().next().children(':first'):trenutni.parent().parent().children(':first').children(':first');
        trenutni.hide().removeClass('vidljiv');
        sledeci.fadeIn().addClass('vidljiv');

        var trenutni1=$('#brojac .aktivan');
        var sledeci1=trenutni1.next().length?trenutni1.next():trenutni1.parent().children(':first');
        trenutni1.removeClass('aktivan');
        sledeci1.addClass('aktivan');

        var trenutni2=$('#opis .vidljiv');
        var sledeci2=trenutni2.next().length?trenutni2.next():trenutni2.parent().children(':first');
        trenutni2.removeClass('vidljiv');
        sledeci2.addClass('vidljiv');

      
        setTimeout(slajder, 4000);
        
        
    }




