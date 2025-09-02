
// to open and close settings box 
let iconContainer = document.querySelector(".icon-container");
let icon = document.querySelector(".icon");

iconContainer.addEventListener("click",(e)=>{
    
    document.querySelector(".settings-box").classList.toggle("appear")
    // adding fa-spin the the icon to make it turns
    icon.classList.toggle("fa-spin")
})

/////////changing the main color based on user choice

// get all li of the ul
let colors = document.querySelectorAll(".colors-list li");

// check the local storage to see if there is a choosen color 
if(localStorage.getItem("color")){

    document.documentElement.style.setProperty("--main-color",localStorage.getItem("color"));
    // add the active class to the li that has the color of the local storage and remove it from others
    colors.forEach((theColor)=>{
        if(theColor.dataset.color === localStorage.getItem("color")){
            //remove it from others 
            colors.forEach((theColor)=>{
                theColor.classList.remove("active");
            })
            // add active to it 
            theColor.classList.add("active");
        }
    })
}

colors.forEach(color =>{
    color.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        window.localStorage.setItem("color",e.target.dataset.color)
        handleActive(e);
    })
})

 // //////////////////////changing backs randomly

let stopInterval;
function changeBackGrounds(){
    // get the background 
let backGround = document.querySelector(".landing-page");
//get the array of the images
let theImages =["image1","image2","image3","image4","image5"];
let priviousIndex = -1;
stopInterval = setInterval(()=>{
    let random;
do{
    random = Math.trunc(Math.random() * theImages.length);

}while(priviousIndex === random);
priviousIndex = random;
    backGround.style.backgroundImage=`url(images/${theImages[random]}.jpg)`;
},6000)

}

// check the local storage 
if(window.localStorage.getItem("option") === "yes"){
    changeBackGrounds();
    document.querySelectorAll(".options1 li").forEach(option=>{
        option.classList.remove("active");
    });
    document.querySelector(".options1 .yes").classList.add("active");

}else if(window.localStorage.getItem("option") === "non"){
    clearInterval(stopInterval);
    document.querySelectorAll(".options1 li").forEach(option=>{
        option.classList.remove("active");
    });
    document.querySelector(".options1 .non").classList.add("active");
}else{
    changeBackGrounds()
}
     
// if the user want or not 
// get the parents of two choices yes and no
let options1 = document.querySelectorAll(".options1 li");
//add active for the chosen one and do other things
options1.forEach(option=>{
    option.addEventListener("click",(e)=>{
        if(e.target.classList.contains("yes")){
            changeBackGrounds();
            // add it to local storage (yes)
            window.localStorage.setItem("option","yes");
        }else if(e.target.classList.contains("non")){
            clearInterval(stopInterval);
            // add it to local storage (no)
            window.localStorage.setItem("option","non")
        }
        handleActive(e)
    })
})
// progress annimation

let ourSkills = document.querySelector(".skills")
window.addEventListener("scroll",()=>{
    // skills offset top 

    let skillsOffsetTop = ourSkills.offsetTop;

   // outer height 
   let skillsOuterHeight = ourSkills.offsetHeight;

   // window height
   let windowHeight = this.innerHeight;
   
   // window scrollTop 
   let windowScrollTop = this.scrollY;

   if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

    let allSkills =document.querySelectorAll(".skills span");
    allSkills.forEach(span=>{
            span.style.width=span.dataset.progress;

    })    
   }
})

// for our Gallery 
let galleryImages = document.querySelectorAll(".gallery .images-box img");

// on clicking on any image
galleryImages.forEach(imagex=>{
    imagex.addEventListener("click",(e)=>{
        // crete the div 
       let div= document.createElement("div");
       // add this calss to div and the class is already stylied on css
       div.classList.add("popup-overlay");
       //create image and append it to overly on top of it 

       let imageCreateBox = document.createElement("div");
       // create that element and add a class name to it , also it is already stylied on css
       imageCreateBox.classList.add("popup-box");
         
       // create image and append it to image create box
       let image = document.createElement("img");
       image.src= e.target.src;

       let close = document.createElement("span");
       close.classList.add("closeIt")
       let closeContent = document.createTextNode("x");
       close.append(closeContent);
       imageCreateBox.append(image);
       imageCreateBox.prepend(close)
       div.appendChild(imageCreateBox);
       document.body.appendChild(div);
       if(imagex.hasAttribute("alt")){
        // create a heading for the image
        let imageHeading = document.createElement("h3");
        // create content for the heading
        let imageHeadingContent = document.createTextNode(imagex.alt);
        // append the content of the image to the heading
        imageHeading.append(imageHeadingContent);
        // append the heading to the imageBox
        imageCreateBox.prepend(imageHeading);

       }
       close.addEventListener("click",(e)=>{
        div.remove();
    })
    })
})

// this function accepts elements then it goes to the link
function scrollToSomewhere(elements){
elements.forEach(ele=>{
    ele.addEventListener("click",(e)=>{
        e.preventDefault();
        document.querySelector(e.target.dataset.goto).scrollIntoView({behavior:"smooth"})
    })
})}

let buletts = document.querySelectorAll(".bullets");
scrollToSomewhere(buletts)
let links = document.querySelectorAll(".links a");
scrollToSomewhere(links);

// checking the local storage 
if(localStorage.getItem("show")==="show"){
    document.querySelector(".bullets").style.display="block";
    // to add active
    document.querySelector(".options2 .non").classList.remove("active")
}
else if(localStorage.getItem("show")==="hide"){
    document.querySelector(".bullets").style.display="none";
    document.querySelector(".options2 .non").classList.add("active");
    document.querySelector(".options2 .yes").classList.remove("active")
}
// showing or hiding bullet navs
let choices = document.querySelectorAll(".options2 li");
let bulletContainer = document.querySelector(".bullets")
choices.forEach((choice)=>{
    choice.addEventListener("click",(e)=>{
        if(e.target.classList.contains("yes")){
            bulletContainer.style.display="block";
            window.localStorage.setItem("show",e.currentTarget.dataset.display);
        }else if(e.target.classList.contains("non")){
            window.localStorage.setItem("show",e.currentTarget.dataset.display)
            bulletContainer.style.display="none"

        }
        handleActive(e)
    })
})

// handle active state
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element=>{
            element.classList.remove("active");
        })
        // add active class the clicked list
        ev.target.classList.add("active");
}
//reseting option 
let rest = document.querySelector(".reset")
rest.addEventListener("click",(e)=>{
    window.localStorage.clear();
    window.location.reload()
})

let toggleMenu = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

toggleMenu.addEventListener("click",(e)=>{
   
    theLinks.classList.toggle("open");
    e.currentTarget.classList.toggle("menu-active");
    
})
// click anywhere outside the menu to close it
document.addEventListener("click", (e)=>{
    if(e.target !== toggleMenu && e.target !== theLinks){
        // check if menu is open
        if(theLinks.classList.contains("open")){
            theLinks.classList.toggle("open");
            toggleMenu.classList.toggle("menu-active");  
        }
    }
})

// stop propagation on menu
theLinks.addEventListener("click",(e)=>{
    e.stopPropagation()
})

//start go to top 
let goToTop = document.querySelector(".fa-solid");
window.addEventListener("scroll",(e)=>{
    
    if(scrollY > 500){
        goToTop.style.display="block";
        
    }else{
        goToTop.style.display="none";

    }
    
})
goToTop.addEventListener("click",(e)=>{
    window.scrollTo({top:0 , behavior:"smooth"})
})
// end go to top

// start use of headroom.js
let header = document.querySelector(".header-area")
 // Create a Headroom instance
  const headroom = new Headroom(header);

  // Start it!
  headroom.init();
// end use of headroom.js
