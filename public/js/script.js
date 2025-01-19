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