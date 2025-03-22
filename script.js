console.log(this.window.scrollY);   
window.addEventListener("scroll", function(){
    console.log(this.window.scrollY);
    const navbar = document.getElementById("desktopNavbar");
    if (this.window.innerWidth > 500){
        if(this.window.scrollY > 50){
            navbar.style.top = "0";
        } 
    }
});