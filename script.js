const clickSound = new Audio("click_sound.mp3");
const barkSound = new Audio("dog_bark.mp3");

function playClick(){
  clickSound.currentTime = 0;
  clickSound.play().catch(()=>{});
}

function playBark(){
  barkSound.currentTime = 0;
  barkSound.play().catch(()=>{});
}

function goPage(page){
  playClick();
  setTimeout(()=>{
    window.location.href = page;
  },120);
}

function bindDogImage(){
  const dogImage = document.getElementById("dogImage");
  if(!dogImage) return;

  dogImage.addEventListener("click",()=>{
    dogImage.classList.remove("bark-animate");
    void dogImage.offsetWidth;
    dogImage.classList.add("bark-animate");
    playBark();
  });
}

function changeFont(size){
  document.documentElement.style.setProperty("--base-font-size",size+"px");

  const fontValue = document.getElementById("fontValue");
  if(fontValue){
    fontValue.textContent = size;
  }

  localStorage.setItem("fontSize",size);
}

function changeLanguage(lang){

  localStorage.setItem("siteLanguage",lang);

  const elements = document.querySelectorAll("[data-ar]");

  elements.forEach(el=>{
    const text = el.getAttribute("data-"+lang);
    if(text){
      el.textContent = text;
    }
  });

  document.documentElement.lang = lang;

  if(lang==="ar"){
    document.body.dir="rtl";
  }else{
    document.body.dir="ltr";
  }

}

function changeTheme(theme){

  localStorage.setItem("theme",theme);

  const root = document.documentElement;

  if(theme==="light1"){
    root.style.setProperty("--bg","#f7f7f7");
    root.style.setProperty("--surface","#ffffff");
    root.style.setProperty("--text","#1f1f1f");
    root.style.setProperty("--border","#d9e0ea");
  }

  if(theme==="light2"){
    root.style.setProperty("--bg","#eef7fb");
    root.style.setProperty("--surface","#ffffff");
    root.style.setProperty("--text","#163142");
    root.style.setProperty("--border","#d6e3ee");
  }

  if(theme==="dark1"){
    root.style.setProperty("--bg","#171a1f");
    root.style.setProperty("--surface","#1f242b");
    root.style.setProperty("--text","#ffffff");
    root.style.setProperty("--border","#2f3944");
  }

  if(theme==="dark2"){
    root.style.setProperty("--bg","#121212");
    root.style.setProperty("--surface","#1e1e1e");
    root.style.setProperty("--text","#ffffff");
    root.style.setProperty("--border","#3a3a3a");
  }

}

function readSelectedText(){

  const text = window.getSelection().toString().trim();

  if(!text){
    alert("Please select text first");
    return;
  }

  if("speechSynthesis" in window){

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = document.documentElement.lang;

    speechSynthesis.speak(speech);

  }else{

    alert("Text to speech is not supported in this browser.");

  }

}

document.addEventListener("DOMContentLoaded",()=>{

  bindDogImage();

  const savedLang = localStorage.getItem("siteLanguage");
  const savedTheme = localStorage.getItem("theme");
  const savedFont = localStorage.getItem("fontSize");

  if(savedLang){
    changeLanguage(savedLang);
  }else{
    changeLanguage("ar");
  }

  if(savedTheme){
    changeTheme(savedTheme);
  }

  if(savedFont){
    changeFont(savedFont);
  }


});
