// login page actions
function signIn(e){
    e.preventDefault();
    
    const username = $('#uname').val();
    const password = $('#password').val();

    if (username && password){
        $.ajax({
            type: "post",
            url: "/",
            data: {
                'username' : username,
                'password' : password
            },
            dataType: 'json',
            success: function (response) {
                if(response.result == "success"){
                    if(response.user.role.name == "student"){
                        window.location.href = "/student/dashboard";
                    }
                    else{
                        window.location.href = "/user/dashboard";
                    }
                }
                else{
                    $("#errorText").text(response.result);
                    $("#errorSpace").removeClass("hidden");
                }
            }
        });
    }
    else{
        $("#errorText").text("All fields are required");
        $("#errorSpace").removeClass("hidden");
    }
}

function removeLoginAlert(){
    $(`#errorSpace`).addClass("hidden");
}


// user functions
$('#createUser').click(function (e) { 
    e.preventDefault();
    const username = $('#username').val();
    const email = $('#email').val();
    const role = $('#role').val();
    const password = $('#password').val();
    const repassword = $('#repassword').val();

    if (username && email && role && password && repassword){

    }
    else{
        showError("All fields are required", "#ff1100");
    }
});

function showError(error, color){
    Toastify({
        text: `${error}`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center", 
        stopOnFocus: true,
        style: {
            background: `${color}`,
        },
        onClick: function(){}
    }).showToast();
}
