function register() {
    // form has no errors (Default behaviour)
    var hasError = false;
    var mobno = $("form[name='registration']").find('input[name=mobileNumber]').val();
    var passid = $("form[name='registration']").find('input[name=password]').val();
    var uname = $("form[name='registration']").find('input[name=username]').val();
    var uemail = $("form[name='registration']").find('input[name=email]').val();

    var formData = {
        username: uname,
        password: passid,
        email: uemail,
        mobileNumber: mobno,
    };
    // check if registration form is valid and all required fields are input and only then invoke service call
    var errorObj = isValidRegistration(formData);
    Object.keys(errorObj).forEach((val) => {
        $('#' + val).next().next().next().css({display: 'none'});
        if (errorObj[val].required) {
            hasError = true;
            $('#' + val).next().next().next().css({display: 'block'})
        }
    });
    if (!hasError) {
        $.ajax({
            url: "http://localhost:3000/api/users",
            type: "POST",
            data: formData,
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function(res) {
                // show a pop-up
                mainView.router.load({
                    url: 'login.html'
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // handle server validation messages
                switch (xhr.status) {
                    case 422:
                        var errors = JSON.parse(xhr.responseText);
                        Object.keys(errors.error.details.messages).forEach((key) => {
                            $('#'+ key).next().next().next().next().html(errors.error.details.messages[key][0]).css({display: 'block'});
                        });
                    break;
                }
            } 
        });
    }
}

/**
 * @param {Object} formData
 * @return {Object}
 */
function isValidRegistration(formData) {
    // default assumption is form is completely filled
    var hasError = {
        username: {
            required: false
        },
        password: {
            required: false
        },
        mobileNumber: {
            required: false
        },
        email: {
            required: false
        }
    };
    if (formData.username === undefined || formData.username === '') {
        hasError.username.required = true;
    }
    if (formData.password === undefined || formData.password === '' || formData.password.length < 6) {
        hasError.password.required = true;
    }
    if (formData.mobileNumber === undefined || formData.mobileNumber === '' || (formData.mobileNumber.length != 11)) {
        hasError.mobileNumber.required = true;
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