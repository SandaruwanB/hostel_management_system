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

