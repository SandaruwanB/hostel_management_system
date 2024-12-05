function dropdown() {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-0");
}
dropdown();

function openSidebar() {
    $('.sidebar').removeClass('hidden');
}
function closeSidebar(){
    $('.sidebar').addClass('hidden');
}