// Initialize app
var myApp = new Framework7({
    // Default title for modals
    modalTitle: 'My App',
 
    // If it is webapp, we can enable hash navigation:
    pushState: true,

    material: true,

    cache: false,  //disable caching 

    cacheDuration: 0, //set caching expire time to 0
    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
    preloadPreviousPage: true,
    domCache: true, //enable inline pages
    pushState: true,
    swipePanel: 'left'
});
// Callback function that will be executed when Page with data-page="earnintro" attribute will be initialized
myApp.onPageInit('earnintro', function (page) {
  $$('.success-alert').on('click', function(){
        myApp.alert("Successful");
        // $$('.modal-button').empty().append('<i class="f7-icons">close</i>').append(span);
        $$('.modal-button').html('<i class="f7-icons">close</i>');
        $$(".modal-inner").append($$("#success-page").html());
    });
});
myApp.onPageInit('mobile_recharge', function (page) {
  $$('.mobile-alert').on('click', function(){
        myApp.alert("Successful");
        // $$('.modal-button').empty().append('<i class="f7-icons">close</i>').append(span);
        $$('.modal-button').html('<i class="f7-icons">close</i>');
        $$(".modal-inner").append($$("#mobile-page").html());
        $$('.modal.modal-in').css({
            'background-image' : 'none',
            'height' : '220px'
        });
        $$('.modal-inner').css({
            'height' : '220px',
            'padding' : '10px 17px'
        });
        $$('.success-title p').css({
            'font-size' : '16px',
            'text-align' : 'left',
            'letter-spacing' : '0.2px'
        });
        $$('.mobile-content .success-title h2').css({
            'margin' : '20px 0',
            'text-align' : 'center'
        });
    });
});
myApp.onPageInit('bank_transfer', function (page) {
  $$('.bank-alert').on('click', function(){
        myApp.alert("Successful");
        // $$('.modal-button').empty().append('<i class="f7-icons">close</i>').append(span);
        $$('.modal-button').html('<i class="f7-icons">close</i>');
        $$(".modal-inner").append($$("#bank-page").html());
        $$('.modal.modal-in').css({
            'background-image' : 'none',
            'height' : '250px'
        });
        $$('.modal-inner').css({
            'height' : '250px',
            'padding' : '10px 17px'
        });
        $$('.success-title p').css({
            'font-size' : '16px',
            'text-align' : 'left',
            'letter-spacing' : '0.2px' 
        });
        $$('.bank-content .success-title h2').css({
            'margin' : '20px 0',
            'text-align' : 'center'
        });
    });
});
// refresh the tartget page only
// mainView.router.reloadPage('withdraw.html');


// Callback function that will be executed when Page with data-page="mobile no recharge" attribute will be initialized
// myApp.onPageInit('mobile_recharge', function (page) {
//   $$('.mob-recharge .styled-input input').on('click', function(){
//         $$('.mob-recharge input').css({
//           'padding' : '1.8rem 1.8rem 0.7rem',
//           'transition' : '0.5s'
//         });
//         $$('.mob-recharge .styled-input label').css({
//           'padding' : '1.7rem 1.8rem'
//         });
//     });
// });
// myApp.onPageInit('mobile_recharge bank_transfer register', function (page) {
//   $$('.earn-option .styled-input input').on('click', function(){
//         $$('.earn-option input').css({
//           'padding' : '1.8rem 1.8rem 0.7rem',
//           'transition' : '0.5s'
//         });
//         $$('.earn-option .styled-input label').css({
//           'padding' : '1.7rem 1.8rem'
//         });
//     });
// });
// jscode to workaround jquery issuees
// myApp.onPageInit('home', function (page) {
//     $$(page.container).find('script').each(function (el) {
//         if ($$(this).attr('src')) {
//             var s = document.createElement('script');
//             s.src = $$(this).attr('src');
//             $$('head').append(s);
//         } else {
//             eval($$(this).text());
//         }
//     });
// });
// var $ptrContent = $$('.ptr-content');
// appAvailability plugin js strta
// 
// appAvailability plugin js ends