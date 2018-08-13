// function logout() {    
//     // $("#logoutbtn").live("click", function(event){
//         // event.preventDefault();
//         $.ajax({
//             url: baseUrl + '/users/logout',
//             type: "POST",
//             contentType: "application/x-www-form-urlencoded",
//             dataType: "json",
//             success: function() {
//                 localStorage.removeItem('ecaJwtToken');
//                 mainView.router.load({
//                     url: 'index.html'
//                 });
//             },
//             error: function (xhr, ajaxOptions, thrownError) {
//                 console.log("Something went wrong");
//             }
//         });
//     // });
// }
// $("#logoutbtn").on("click", function(){
//     localStorage.removeItem('ecaJwtToken');
//     mainView.router.load({
//         url: 'index.html'
//     });
// });
function logout() {
    // $("#logoutbtn").on("click", function(){
    var passid = $("form[name='login-form']").find('input[name=password]').val();
    var uemail = $("form[name='login-form']").find('input[name=email]').val();

    var formData = {
        password: passid,
        email: uemail
    };
    $.ajax({
        url: baseUrl + "users/logout",
        type: "POST",
        data: formData,
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        success: function(reslog) {
            console.log("Successfull");
        },
        error: function (xhr, ajaxOptions, thrownError) {  
            // console.log("Something went wrong"); 
            window.localStorage.removeItem('ecaJwtToken');
            mainView.router.load({
                url: 'login.html',
            });
        } 
    });
// });
}