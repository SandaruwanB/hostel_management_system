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
        placeholderValue: "Select account"
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById('student');
    const choices = new Choices(element, {
        searchEnabled: true,
        placeholderValue: "Select account"
    });
});