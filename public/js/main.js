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

// update user
$('#updateUserDetails').click(function (e) { 
    e.preventDefault();
    
    const id = $('#updateUserDetails').val();
    const username = $('#username').val();
    const email = $('#email').val();
    const role = $('#role').val();

    if ( username && email && role){
        $.ajax({
            type: "put",
            url: `/user/users/${id}`,
            data: {
                "is_password" : false,
                "username" : username,
                "email" : email,
                "role" : role
            },
            dataType: "json",
            success: function (response) {
                if (response.result == "success"){
                    showAlert("Successfully updated", "#0ee30e");
                } else {
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    } else {
        showAlert("All fields are required", "#ff1100");
    }
});

// update password
$('#updateUserPassword').click(function (e) { 
    e.preventDefault();

    const id = $('#updateUserPassword').val();
    const password = $('#password').val();
    const repassword = $('#repassword').val();

    if (password && repassword){
        if (password == repassword){
            $.ajax({
                type: "put",
                url: `/user/users/${id}`,
                data: {
                    "is_password" : true,
                    'password' : password
                },
                dataType: "json",
                success: function (response) {
                    if (response.result == "success"){
                        showAlert("Password updated", "#0ee30e");
                    } else {
                        showAlert(response.result, "#ff1100");
                    }
                }
            });
        } else {
            showAlert("Passwords doesn't match", "#ff1100");
        }
    } else {
        showAlert("Both fields are required", "#ff1100");
    }
});


// remove user 
$('#delete').click(function (e) { 
    e.preventDefault();
    const id = $('#delete').val();
    
    $.ajax({
        type: "delete",
        url: `/user/users/${id}`,
        data: [],
        dataType: "json",
        success: function (response) {
            if (response.result == "success"){
                window.location.replace("/user/users");
            }
        }
    });
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

// update faculty
$('#updateFaculty').click(function (e) { 
    e.preventDefault();

    const id = $('#updateFaculty').val();
    const name = $('#name').val();
    const location = $('#location').val();
    const hodName = $('#hod_name').val();
    const hodContact = $('#hod_cantact').val();
    const hodAddress = $('#hod_address').val();
    
    if (name && location && hodName && hodContact && hodAddress){
        $.ajax({
            type: "put",
            url: `/user/faculty/${id}`,
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
                    showAlert("Successfully updated", "#0ee30e");
                } else {
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    } else {
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
        $.ajax({
            type: "post",
            url: "/user/maintainers/add",
            data: {
                "callingName" : callingName,
                "fullName" : fullName,
                "nic" : nic,
                "jobRole" : jobRole,
                "workStart" : workStartedDate,
                "workEnd" : workEndDate,
                "address" : address,
                "contact" : contact,
                "emergencyContact" : emergencyContact
            },
            dataType: "json",
            success: function (response) {
                if (response.result == "success"){
                    $('#callingName').val("");
                    $("#fullName").val("");
                    $("#nic").val("");
                    $("#jobRole").val("");
                    $("#workStartedDate").val("");
                    $("#workEndDate").val("");
                    $("#address").val("");
                    $("#contact").val("");
                    $("#emergencyContact").val("");
                    
                    showAlert("Successfully created", "#0ee30e");
                } else {
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    } else {
        showAlert("You missed some required fields", "#ff1100");
    }
});

// update maintainer
$('#updateMaintainer').click(function (e) { 
    e.preventDefault();
    
    const id = $('#updateMaintainer').val();
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
        $.ajax({
            type: "put",
            url: `/user/maintainers/${id}`,
            data: {
                "callingName" : callingName,
                "fullName" : fullName,
                "nic" : nic,
                "jobRole" : jobRole,
                "workStart" : workStartedDate,
                "workEnd" : workEndDate,
                "address" : address,
                "contact" : contact,
                "emergencyContact" : emergencyContact
            },
            dataType: "json",
            success: function (response) {
                if (response.result == "success"){
                    showAlert("Successfully updated", "#0ee30e");
                } else {
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    } else {
        showAlert("You missed some required fields", "#ff1100");
    }
});


// STUDENT
// create student
$("#createStudent").click(function (e) { 
    e.preventDefault();
    
    const full_name = $('#full_name').val();
    const registration_number = $('#registration_number').val();
    const permanant_address = $('#permanant_address').val();
    const temporary_address = $('#temporary_address').val();
    const contact = $('#contact').val();
    const email = $('#email').val();
    const account = $('#account').val();
    const faculty = $('#faculty').val();
    const guardians_name = $('#guardians_name').val();
    const guardians_contact = $('#guardians_contact').val();
    const guardians_email = $('#guardians_email').val();

    if (full_name && registration_number && contact && faculty && guardians_name && guardians_contact){
        $.ajax({
            type: "post",
            url: "/user/students/add",
            data: {
                "full_name" : full_name,
                "registration_number" : registration_number,
                "permanant_address" : permanant_address,
                "temporary_address" : temporary_address,
                "contact" : contact,
                "email" : email,
                "account" : account,
                "faculty" : faculty,
                "guardians_name" : guardians_name,
                "guardians_contact" : guardians_contact,
                "guardians_email" : guardians_email
            },
            dataType: "json",
            success: function (response) {
                if (response.result == "success"){
                    $('#full_name').val("");
                    $('#registration_number').val("");
                    $('#permanant_address').val("");
                    $('#temporary_address').val("");
                    $('#contact').val("");
                    $('#email').val("");
                    $('#account').val("");
                    $('#faculty').val("");
                    $('#guardians_name').val("");
                    $('#guardians_contact').val("");
                    $('#guardians_email').val("");

                    showAlert("Successfully created", "#0ee30e");
                } else {
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    } else {
        showAlert("You missed some required fields", "#ff1100");
    }
});


// update student
$('#updateStudent').click(function (e) { 
    e.preventDefault();
    
    const id = $('#updateStudent').val();
    const full_name = $('#full_name').val();
    const registration_number = $('#registration_number').val();
    const permanant_address = $('#permanant_address').val();
    const temporary_address = $('#temporary_address').val();
    const contact = $('#contact').val();
    const email = $('#email').val();
    const account = $('#account').val();
    const faculty = $('#faculty').val();
    const guardians_name = $('#guardians_name').val();
    const guardians_contact = $('#guardians_contact').val();
    const guardians_email = $('#guardians_email').val();

    if (full_name && registration_number && contact && faculty && guardians_name && guardians_contact){
        $.ajax({
            type: "put",
            url: `/user/students/${id}`,
            data: {
                "full_name" : full_name,
                "registration_number" : registration_number,
                "permanant_address" : permanant_address,
                "temporary_address" : temporary_address,
                "contact" : contact,
                "email" : email,
                "account" : account,
                "faculty" : faculty,
                "guardians_name" : guardians_name,
                "guardians_contact" : guardians_contact,
                "guardians_email" : guardians_email
            },
            dataType: "json",
            success: function (response) {
                if (response.result == "success"){
                    showAlert("Successfully updated", "#0ee30e");
                } else {
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    } else {
        showAlert("You missed some required fields", "#ff1100");
    }
});


// student out or in
$('#createStudentInOut').click(function (e) { 
    e.preventDefault();

    const student = $('#student').val();
    const in_or_out = $('#inOrOut').val();
    const reason = $('#reason').val();

    if ($('#inOrOut').is(":checked")){
        if (student && reason){
            $.ajax({
                type: "put",
                url: "/user/students",
                data: {
                    'student' : student,
                    'is_out' : true,
                    'reason' : reason
                },
                dataType: "json",
                success: function (response) {
                    if (response.result == "success"){
                        window.location.replace("/user/students");
                    } else {
                        showAlert(response.result, "#ff1100");
                    }
                }
            });
        } else {
            showAlert("All fields are required", "#ff1100");
        }
    } else {
        if (student){
            $.ajax({
                type: "put",
                url: "/user/students",
                data: {
                    'student' : student,
                    'is_out' : false,
                },
                dataType: "json",
                success: function (response) {
                    if (response.result == "success"){
                        window.location.replace("/user/students");
                    } else {
                        showAlert(response.result, "#ff1100");
                    }
                }
            });
        } else {
            showAlert("Please choose student", "#ff1100");
        }
    }
});

// PAYMENT
// create payment
$('#createPayment').click(function (e) { 
    e.preventDefault();

    const paymentMethod = $('#paymentMethod').val();
    const paymentDate = $('#paymentDate').val();
    const amount = $('#amount').val();
    const payslipNumber = $('#payslipNumber').val();
    const paymentForMonth = $('#paymentForMonth').val();
    const student = $('#student').val();

    if (paymentMethod && amount && paymentDate && paymentForMonth && student){
        $.ajax({
            type: "post",
            url: "/user/payments/add",
            data: {
                "paymentMethod" : paymentMethod,
                "paymentDate" : paymentDate,
                "amount" : amount,
                "payslipNumber" : payslipNumber,
                "paymentForMonth" : paymentForMonth,
                "student" : student
            },
            dataType: "json",
            success: function (response) {
                if (response.result == "success"){
                    $('#paymentMethod').val("");
                    $('#paymentDate').val("");
                    $('#amount').val("");
                    $('#payslipNumber').val("");
                    $('#paymentForMonth').val("");
                    $('#student').val("");

                    showAlert("Payment created", "#0ee30e");
                } else {
                    showAlert(response.result, "#ff1100");
                }
            }
        });
    } else {
        showAlert("You missed some required fields", "#ff1100");
    }
});

// USER ACCOUNT
// update password
$('#updatePassword').click(function (e) { 
    e.preventDefault();

    const oldpassword = $('#oldpassword').val();
    const newpassword = $('#newpassword').val();
    const renewpassword = $('#renewpassword').val();

    if (oldpassword && newpassword && renewpassword){
        if (newpassword == renewpassword){
            $.ajax({
                type: "post",
                url: "/user/account/manage",
                data: {
                    "ispassword" : true,
                    "oldpassword" : oldpassword,
                    "newpassword" : newpassword,
                    "renewpassword" : renewpassword
                },
                dataType: "json",
                success: function (response) {
                    if (response.result == "success"){
                        showAlert("Successfully updated", "#0ee30e");
                    } else {
                        showAlert(response.result, "#ff1100");
                    }
                }
            });
        } else {
            showAlert("New passwords doesn't matched", "#ff1100");
        }
    } else {
        showAlert("All fields are required", "#ff1100");
    }
});


// COMPLAINT
// mark as read
function markAsRead(id){
    $.ajax({
        type: "put",
        url: `/user/complaints/${id}`,
        data: [],
        dataType: "json",
        success: function (response) {
            if (response.result == "success"){
                window.location.replace("/user/complaints");
            } else {
                showAlert("Err. happend please try again", "#ff1100");
            }
        }
    });
}

function markAndNavigate(id){
    $.ajax({
        type: "put",
        url: `/user/complaints/${id}`,
        data: [],
        dataType: "json",
        success: function (response) {
            if (response.result == "success"){
                window.location.replace(`/user/complaints/${id}`);
            } else {
                showAlert("Err. happend please try again", "#ff1100");
            }
        }
    });
}

// remove complaint
$('#deleteComplain').click(function (e) { 
    e.preventDefault();

    const id = $('#deleteComplain').val();
    
    $.ajax({
        type: "delete",
        url: `/user/complaints/${id}`,
        data: [],
        dataType: "json",
        success: function (response) {
            if (response.result == "success"){
                window.location.replace("/user/complaints");
            }
        }
    });
    
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
