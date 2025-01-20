function dropdown() {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-0");
}
function userDropdown(){
    document.querySelector("#userMenu").classList.toggle("hidden");
    document.querySelector('#loginArrow').classList.toggle("rotate-0");
}
userDropdown();
dropdown();

function openSidebar() {
    $('.sidebar').removeClass('hidden');
}
function closeSidebar(){
    $('.sidebar').addClass('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('account');
    const choices = new Choices(element, {
        searchEnabled: true,
        placeholderValue: "Select account"
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('faculty');
    const choices = new Choices(element, {
        searchEnabled: true,
        placeholderValue: "Select faculty"
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('student');
    const choices = new Choices(element, {
        searchEnabled: true,
        placeholderValue: "Select student"
    });
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
  }

setInterval(updateClock, 1000);
updateClock();

$('#studentHostelStatus').click(function (e) { 
    e.preventDefault();
    $('#outInMarker').removeClass('hidden');
});

$('#cancelStudentInOut').click(function (e) { 
    e.preventDefault();
    $('#outInMarker').addClass('hidden');
});

function checkboxClicked(cb){
    if(cb.checked){
        $('#reasonField').removeClass('hidden');
    } else {
        $('#reason').val('');
        $('#reasonField').addClass('hidden');
    }
}

function removeUser(id, model){
    $('#removeModel').removeClass('hidden');
    $('#delete').val(id);
}
function removeComplain(id){
    $('#removeModel').removeClass('hidden');
    $('#deleteComplain').val(id);
}
function removePayment(id){
    $('#removeModel').removeClass('hidden');
    $('#deletePayment').val(id);
}
function removeStudent(id) {
    $('#removeModel').removeClass('hidden');
    $('#deleteStudent').val(id)
}
function removeMaintainer(id){
    $('#removeModel').removeClass('hidden');
    $('#deleteMaintainer').val(id)
}
function removeFaculty(id){
    $('#removeModel').removeClass('hidden');
    $('#deleteFaculty').val(id) 
}
function removeRoom(id){
    $('#removeModel').removeClass('hidden');
    $('#deleteRoom').val(id) 
}

function cancelDelete(){
    $('#removeModel').addClass('hidden');
}

