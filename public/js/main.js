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
                    console.log(response.user);
                    $("#errorText").text(response.result);
                    $("#errorSpace").removeClass("hidden");
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