function login() {
	// form has no errors (Default behaviour)
    var hasError = false;
    var passid = $("form[name='login-form']").find('input[name=password]').val();
    var uemail = $("form[name='login-form']").find('input[name=email]').val();

    var formData = {
        password: passid,
        email: uemail
    };
    // check if registration form is valid and all required fields are input and only then invoke service call
    var errorObj = isValidLogin(formData);
    Object.keys(errorObj).forEach((val) => {
        $('#' + val).next().next().next().css({display: 'none'});
        if (errorObj[val].required) {
            hasError = true;
            $('#' + val).next().next().next().css({display: 'block'})
        }
    });
    if (!hasError) {
        $.ajax({
            url: "http://localhost:3000/api/users/login",
            type: "POST",
            data: formData,
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(res) {
                var response = JSON.parse(JSON.stringify(res));
				window.localStorage.setItem('ecaJwtToken', response.id);
                mainView.router.load({
                    url: 'home.html',
                    ignoreCache: true
                });
				// window.location.href = '#!/home.html';
	        },
            error: function (xhr, ajaxOptions, thrownError) {	
            } 
        });
    }
}

function isValidLogin(formData) {
    // default assumption is form is completely filled
    var hasError = {
        password: {
            required: false
        },
        email: {
            required: false
        }
    };
    if (formData.password === undefined || formData.password === '' || formData.password.length < 6) {
        hasError.password.required = true;
    }
    if (formData.email === undefined || formData.email === '' || !isEmail(formData.email)) { // add regex
        hasError.email.required = true;
    }

    return hasError;
}

/**
 * @param {String} email
 * @return {Boolean}
 */
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
  console.log(regex.test(email));
  return regex.test(email);
}
