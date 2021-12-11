/*---------Hide/Show About us container -------------*/
(()=>{
    const abouBtn = document.querySelector(".js-about-us"),
    closeAbtSection = document.querySelector(".close-aboutContainer"),
    aboutMenu = document.querySelector(".about-us-section");
    
    abouBtn.addEventListener("click", showAboutUs);
    closeAbtSection.addEventListener("click", hideAboutUs);
    
    function showAboutUs() {
        aboutMenu.classList.add("show");
        bodyStopScrolling();
    }
    
    function hideAboutUs() {
        aboutMenu.classList.remove("show");
        bodyStopScrolling()
    }
}) ();

function bodyStopScrolling() {
    document.body.classList.toggle("stop-scrolling");
}
/*-------------------------------------------------
Show and hide header shadow when scroll up and down
--------------------------------------------------*/
