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


// USER
// create user
$('#createUser').click(function (e) { 
    e.preventDefault();

    const username = $('#username').val();
    const email = $('#email').val();
    const role = $('#role').val();
    const password = $('#password').val();
    const repassword = $('#repassword').val();

    if (username && email && role && password && repassword){
        if (password === repassword){
            $.ajax({
                type: "post",
                url: "/user/users/add",
                data: {
                    username : username,
                    email : email,
                    role : role,
                    password : password
                },
                dataType: "json",
                success: function (response) {
                    if (response.result == "success"){
                        $('#username').val("");
                        $('#email').val("");
                        $('#role').val(1);
                        $('#password').val("");
                        $('#repassword').val("");

                        showAlert("Successfully created", "#0ee30e");
                    }
                    else{
                        showAlert(response.result, "#ff1100");
                    }
                }
            });
        }
        else{
            showAlert("Passwords didn't match.", "#ff1100");
        }
    }
    else{
        showAlert("All fields are required", "#ff1100");
    }
});


// FACULTY 
// create faculty

$('#createFaculty').click(function (e) { 
    e.preventDefault();
    const name = $('#name').val();
    const location = $('#location').val();
    const hodName = $('#hod_name').val();
    const hodContact = $('#hod_cantact').val();
    const hodAddress = $('#hod_address').val();

    if (name && location && hodName && hodContact && hodAddress){
        $.ajax({
            type: "post",
            url: "/user/faculty/add",
            data: {
                "name" : name,
                "location" : location,
                "hodName" : hodName,
                "hodContact" : hodContact,
                "hodAddress" : hodAddress
            },
            dataType: "json",
            success: function (response) {
                if (response.result == "success"){
                    $('#name').val("");
                    $('#location').val("");
                    $('#hod_name').val("");
                    $('#hod_cantact').val("");
                    $('#hod_address').val("");
                    showAlert("Successfully created", "#0ee30e");
                }
                else{
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    }
    else{
        showAlert("All fields are required", "#ff1100");
    }
});


// MAINTAINERS
// create maintainer
$('#createMaintainer').click(function (e) { 
    e.preventDefault();
    
    const callingName = $('#callingName').val();
    const fullName = $("#fullName").val();
    const nic = $("#nic").val();
    const jobRole = $("#jobRole").val();
    const workStartedDate = $("#workStartedDate").val();
    const workEndDate = $("#workEndDate").val();
    const address = $("#address").val();
    const contact = $("#contact").val();
    const emergencyContact = $("#emergencyContact").val();

    if (nic && callingName && fullName && jobRole && contact && emergencyContact){

    }
    else{
        showAlert("You missed some required fields", "#ff1100");
    }
});

function showAlert(error, color){
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
