
$.extend($.easing,
{
    def: 'easeOutQuad',
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

(function( $ ) {

    var settings;
    var disableScrollFn = false;
    var navItems;
    var navs = {}, sections = {};

    $.fn.navScroller = function(options) {
        settings = $.extend({
            scrollToOffset: 170,
            scrollSpeed: 800,
            activateParentNode: true,
        }, options );
        navItems = this;

        //attatch click listeners
    	navItems.on('click', function(event){
    		event.preventDefault();
            var navID = $(this).attr("href").substring(1);
            disableScrollFn = true;
            activateNav(navID);
            populateDestinations(); //recalculate these!
        	$('html,body').animate({scrollTop: sections[navID] - settings.scrollToOffset},
                settings.scrollSpeed, "easeInOutExpo", function(){
                    disableScrollFn = false;
                }
            );
    	});

        //populate lookup of clicable elements and destination sections
        populateDestinations(); //should also be run on browser resize, btw

        // setup scroll listener
        $(document).scroll(function(){
            if (disableScrollFn) { return; }
            var page_height = $(window).height();
            var pos = $(this).scrollTop();
            for (i in sections) {
                if ((pos + settings.scrollToOffset >= sections[i]) && sections[i] < pos + page_height){
                    activateNav(i);
                }
            }
        });
    };

    function populateDestinations() {
        navItems.each(function(){
            var scrollID = $(this).attr('href').substring(1);
            navs[scrollID] = (settings.activateParentNode)? this.parentNode : this;
            sections[scrollID] = $(document.getElementById(scrollID)).offset().top;
        });
    }

    function activateNav(navID) {
        for (nav in navs) { $(navs[nav]).removeClass('active'); }
        $(navs[navID]).addClass('active');
    }
})( jQuery );


$(document).ready(function (){

    $('nav li a').navScroller();

    //section divider icon click gently scrolls to reveal the section
	$(".sectiondivider").on('click', function(event) {
    	$('html,body').animate({scrollTop: $(event.target.parentNode).offset().top - 50}, 400, "linear");
	});

    //links going to other sections nicely scroll
	$(".container a").each(function(){
        if ($(this).attr("href").charAt(0) == '#'){
            $(this).on('click', function(event) {
        		event.preventDefault();
                var target = $(event.target).closest("a");
                var targetHight =  $(target.attr("href")).offset().top
            	$('html,body').animate({scrollTop: targetHight - 170}, 800, "easeInOutExpo");
            });
        }
	});

});

/*****
<!-- START WOAHbar FOR DESKTOP  -->

var theState;
    // Get the cookie and state open or closed
    function getCookie(key) {  
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');  
        return keyValue ? keyValue[2] : null;  
    }
   theState = getCookie('state');


var stub_showing = false;
 
    function woahbar_show() { 
        if(stub_showing) {
          $('.woahbar-stub').slideUp('fast', function() {
            $('.woahbar').show('bounce', { times:3, distance:15 }, 500);
            $('body').animate({"marginTop": "32px"}, 250);
          }); 
        }

        else {
          setTimeout(function() {
             $('.woahbar').show('bounce', { times:3, distance:15 }, 500);
             $('body').animate({"marginTop": "32px"});
             }, 800);
          }
        }
 
    function woahbar_hide() { 
        $('.woahbar').slideUp('fast', function() {
          $('.woahbar-stub').show('bounce', { times:3, distance:15 }, 500);
          stub_showing = true;
        }); 

 
        if( $(window).width() > 1024 ) {
          $('body').animate({"marginTop": "0px"}, 250); // if width greater than 1024 pull up the body
        }
    }
 
    $().ready(function() {
        window.setTimeout(function() {
            // depending on the cookie, open or close the bar
            if (theState == "closed")
            { woahbar_hide(); } 
            if (theState == null || theState == "open")
            { woahbar_show(); } 
        
     }, 0);
    });



<!-- END WOAHbar FOR DESKTOP / START WOAHbar FOR MOBILE  -->



var mstub_showing = false;
 
    function mwoahbar_show() { 
        if(mstub_showing) {
          $('.mwoahbar-stub').slideUp('fast', function() {
            $('.mwoahbar').show('bounce', { times:3, distance:15 }, 500);
            $('body').animate({"marginTop": "32px"}, 250);
          }); 


          // Set the cookie once the bar is hidden 
          function setCookie(key, value) {  
             var expires = new Date();  
             expires.setTime(expires.getTime() + 432000000); //5 days 432000000
             document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();  
             }  
                setCookie('state', 'open');  
        
        }

        else {
          setTimeout(function() {
             $('.mwoahbar').show('bounce', { times:3, distance:15 }, 500);
             $('body').animate({"marginTop": "32px"});
             }, 800);
          }
        }
 
    function mwoahbar_hide() { 
        $('.mwoahbar').slideUp('fast', function() {
          $('.mwoahbar-stub').show('bounce', { times:3, distance:15 }, 500);
          mstub_showing = true;
        }); 


        // Set the cookie once the bar is hidden 
        function setCookie(key, value) {  
           var expires = new Date();  
           expires.setTime(expires.getTime() + 432000000); //5 days 432000000
           document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();  
           }  
            setCookie('state', 'closed');  

 
        if( $(window).width() < 1024 ) {
          $('body').animate({"marginTop": "0px"}, 250); // if width greater than 1024 pull up the body
        }
    }
 
    $().ready(function() {
        window.setTimeout(function() {
            // depending on the cookie, open or close the bar
            if (theState == "closed")
            { mwoahbar_hide(); } 
            if (theState == null || theState == "open")
            { mwoahbar_show(); } 
        
     }, 0);
    });

<!-- END WOAHbar FOR MOBILE  -->
**/
var time = 3000;
function isMobile() {
  console.log("inner width:" + window.innerWidth + " & height:" + window.innerHeight);
  if (window.innerWidth <= 860 && window.innerHeight <= 600) {
    return true;
  } else {
    return false;
  }
}

if ( isMobile() ) {
  console.log("isMoble returned true, modal firing in :" + time);
  setTimeout(function (){
    $('#ouibounce-modal').show();
    console.log('mobile modal fired');
  }, time);
} else {
  console.log('isMobile returned false');
  // if you want to use the 'fire' or 'disable' fn,
    // you need to save OuiBounce to an object
    var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
        aggressive: true,
        timer: 0,
        callback: function() { console.log('ouibounce fired!'); }
    });

    $('body').on('click', function() {
      $('#ouibounce-modal').hide();
    });

    $('#ouibounce-modal .modal-footer').on('click', function() {
      $('#ouibounce-modal').hide();
    });

    $('#ouibounce-modal .modal').on('click', function(e) {
      e.stopPropagation();
    });
}

