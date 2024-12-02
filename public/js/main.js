// login page functions
$('#loginForm').submit(function (e) { 
    e.preventDefault();

    const username = $('#uname').val();
    const password = $('#password').val();

    if (username && password){

    }
    else{
        $("#errorText").text("All fields are required");
        $("#errorSpace").removeClass("hidden");
    }
});


function removeAlert(){
    $('#errorSpace').addClass("hidden");
}