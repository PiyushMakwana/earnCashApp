function openLink(link) {
    window.location.href = link;
}
// js code starts - once user logged-in to retrive data from database to show dynamic data which is reward points on button
$(document).ready(function(){
    myApp.onPageInit('home download', function (page) {
        $.ajax({
            type: 'GET',
            url: baseUrl + "/app",
            contentType: "application/x-www-form-urlencoded",
            dataType: 'json',
            headers :{
                'Authorization': localStorage.getItem('ecaJwtToken')
            },
            success: function(res) {
                var htmlData = "";
                var osSpecificLink = 'androidLink';
                res.forEach((value, key) => {
                    // if (os == 'ios') { // os parameter comes from phonegap api... tbd by Piyush
                    //     osSpecificLink = 'itunesLink';
                    // } else {
                    //     osSpecificLink = 'androidLink';
                    // }
                    htmlData += '<li><div class="app-info"><div class="earn-sec-left">';
                    htmlData += '<img src="'+ value.logo +'" alt="'+ value.appDetail[0].appName +'" />';
                    htmlData += '</div>';
                    htmlData += '<div class="earn-sec-right"><h3>' + value.appDetail[0].appName + '</h3></div>';    
                    htmlData += '</div>';
                    htmlData += '<div class="app-btn">';
                    // htmlData += '<a href="javascript: openLink(\''+  value[osSpecificLink] +'\')" class="button button-raised button-fill">'+ "+" + value.points.worth +'</a>';
                    htmlData += '<a href="earnintro.html?key=' + key +'" class="button button-raised button-fill">'+ "+" + value.points.worth +'</a>';
                    htmlData += '</div></li>';
                })
                $(".content-block").find('ul:first').html(htmlData);
                
            },
            error: function (xhr, ajaxOptions, thrownError) {   
                alert("Please check your login details");
            }
        });
    });
});
// js code ends - once user logged-in to retrive data from database to show dynamic data which is reward points on button

// js code starts - earn intro page js starts 

myApp.onPageInit('earnintro', function (page) {
    $.ajax({
        type: 'GET',
        url: baseUrl + "/app",
        contentType: "application/x-www-form-urlencoded",
        dataType: 'json',
        headers :{
            'Authorization': localStorage.getItem('ecaJwtToken')
        },
        success: function(earnr) {

            var earnReward = "";
            var appSec = "";
            var appearnbtn = "";
            var osSpecificLink = 'androidLink';
            var key = getParameterByName('key');
            // console.log(key);
            earnReward = '<h2>' + "+" + earnr[key].points.worth + '<span class="coin-count"></span><span class="coin-txt">Coins</span></h2><a href="#">Instruction to earn</a>'
            appSec = '<div class="earn-sec-left"><img src="'+ earnr[key].logo +'" /></div><div class="earn-sec-right"><h3>'+ earnr[key].appDetail[0].appName +'</h3></div><div class="earn-coin-info"><h3>Go to <span class="g-play-highlight">Google Play</span></h3><h4>Search Keywords Download <a href="index.html" class="game-highlight">Leisure Game</a></h4></div>'
            appearnbtn = '<a href="javascript: openLink(\''+  earnr[key][osSpecificLink] +'\')" class="col button button-outline button-round">Go Download</a>';                           
                                    
            $(".earn-intro").find(".coin-display").html(earnReward);
            $(".earn-intro").find(".app-top").html(appSec);
            $(".earn-intro").find(".earnbtntop").html(appearnbtn);
        },
        error: function (xhr, ajaxOptions, thrownError) {   
            alert("Earn intro page error");
        }
    });
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


// js code starts - earn intro page js ends
 
//keep startup url (in case your app is an SPA with html5 url routing)

// var initialHref = window.location.href;

// function restartApplication() {
//     // Show splash screen (useful if your app takes time to load) 
//     navigator.splashscreen.show();
//     // Reload original app url (ie your index.html file)
//     window.location = initialHref;
// }
//profile image with info
// var proavatar = "";
// var proinfo = "";
// proavatar = '<div class="user-avatar"></div>';
// proinfo = '<h2>Welcome</h2>';
// // $(".user-info").find('.user-div-center~').html(proavatar);
// // $(".user-info-center:nth-child(2)").html(proinfo);
// $(".user-div-center:nth-child(2)").html(proavatar);
// $(".user-div-center:nth-child(3)").html(proinfo);
// function login() {
//     // form has no errors (Default behaviour)
//     var hasError = false;
//     var passid = $("form[name='login-form']").find('input[name=password]').val();
//     var uemail = $("form[name='login-form']").find('input[name=email]').val();

//     var formData = {
//     password: passid,
//     email: uemail
// };

// Profile page js starts
myApp.onPageInit('*', function (page) {
    $.ajax({
        type: 'GET',
        url: baseUrl + "/app",
        contentType: "application/x-www-form-urlencoded",
        dataType: 'json',
        // data: ['id', 'username', 'mobileNumber'],
        headers :{
            'Authorization': localStorage.getItem('ecaJwtToken')
        },
        success: function(response) {
            var proavatar = "";
            var proinfo = "";
            // var osSpecificLink = 'androidLink';
            response.forEach((val) => {
                // if (os == 'ios') { // os parameter comes from phonegap api... tbd by Piyush
                //     osSpecificLink = 'itunesLink';
                // } else {
                //     osSpecificLink = 'androidLink';
                // }
                // console.log(val.logo);
                proavatar = '<div class="user-avatar"><img src="'+ val.logo +'" /></div>';
                proinfo = '<h2>Welcome</h2>';
                // proinfo = '<h2>Welcome' + " " + val.username + '</h2>';
                // $(".user-info").find('.user-div-center~').html(proavatar);
                // $(".user-info-center:nth-child(2)").html(proinfo);
            });
            $(".user-div-center:nth-child(2)").html(proavatar);
            $(".user-div-center:nth-child(3)").html(proinfo);
        },
        error: function (xhr, ajaxOptions, thrownError) {   
            // alert("Welcome");
        }
    });
});
// Profile page js starts