let select=document.querySelector(".select-heading")
let arrow=document.querySelector(".select-heading img")
let options=document.querySelector(".options")
let option=document.querySelectorAll(".option")
let selecttext=document.querySelector(".select-heading span")

select.addEventListener("click",()=>{
options.classList.toggle("active-options")
arrow.classList.toggle("rotate")
})

option.forEach((item)=>{
    item.addEventListener("click",()=>{
        selecttext.innerText=item.innerText
    })
})


// chat bot

let prompt=document.querySelector(".prompt")
let chatbtn=document.querySelector(".input-area button")
let chatContainer=document.querySelector(".chat-container")
let h1=document.querySelector(".h1")
let chatimg=document.querySelector("#chatbotimg")
let chatbox=document.querySelector(".chat-box")

let userMessage="";
chatimg.addEventListener("click",()=>{
chatbox.classList.toggle("active-chat-box")
if(chatbox.classList.contains("active-chat-box")){
    chatimg.src="cross.svg"
}else{
     chatimg.src="chatbot.svg"
}
})






let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAojijjUKjlYlXZiBxW8asWZu5zpwWsmoM"


async function generateApiResponse(aiChatBox){
    const textElement=aiChatBox.querySelector(".text")
    try{
    const response=await fetch(Api_url,{
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({
        contents:[{
          "role": "user",
          "parts":[{text:`${userMessage} in 10 words`}]
        }]
      })
    })
    const data=await response.json()
    const apiResponse=data?.candidates[0].content.parts[0].text.trim();
    textElement.innerText=apiResponse
    
    }
    catch(error){
      console.log(error)
    }
    finally{
      aiChatBox.querySelector(".loading").style.display="none"
    }
    }

function createChatBox(html,className){
    const div=document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html;
    return div
    }

    function showLoading(){
        const html=`<p class="text"></p>
        <img src="load.gif" class="loading" width="50px">`
          let aiChatBox=createChatBox(html,"ai-chat-box")
       chatContainer.appendChild(aiChatBox)
      generateApiResponse(aiChatBox)
      
      }

chatbtn.addEventListener("click",()=>{
h1.style.display="none"
    userMessage=prompt.value;
  const html=`<p class="text"></p>`
 let userChatBox=createChatBox(html,"user-chat-box")
 userChatBox.querySelector(".text").innerText=userMessage
 chatContainer.appendChild(userChatBox)
 prompt.value=""
 setTimeout(showLoading,500)
})



// virtual Assistant

let ai=document.querySelector(".virtual-assistant img")
let speakpage=document.querySelector(".speak-page")
let content=document.querySelector(".speak-page h1")



function speak(text){
  let text_speak=new SpeechSynthesisUtterance(text)
  text_speak.rate=1
  text_speak.pitch=1
  text_speak.volume=1
  text_speak.lang="hi-GB"
  window.speechSynthesis.speak(text_speak)
}

let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()

recognition.onresult=(event)=>{
  speakpage.style.display="none"
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
   console.log(event)
  
}


function takeCommand(message){
if(message.includes("open") && message.includes("chat")){
  speak("okay sir")
  chatbox.classList.add("active-chat-box")
}else if(message.includes("close") && message.includes("chat")){
  speak("okay sir")
  chatbox.classList.remove("active-chat-box")
}else if(message.includes("back")){
  speak("okay sir")
  window.open("skills.html","_self")
}else if(message.includes("skills")){
  speak("okay sir")
  window.open("skills.html","_self")
}
else if(message.includes("projects")|| message.includes("projects")){
  speak("okay sir")
  window.open("projects.html","_self")
}else if(message.includes("about")){
  speak("okay sir")
  window.open("about.html","_self")
}else if(message.includes("hello")||message.includes("hey")){
  speak("hello sir,what can i help you?")
}
else if(message.includes("who are you")){
  speak("i am virtual assistant ,created by Ankita gour")
}else if(message.includes("open youtube")){
  speak("opening youtube...")
  window.open("https://youtube.com/","_blank")
}
else if(message.includes("open google")){
  speak("opening google...")
  window.open("https://google.com/","_blank")
}
else if(message.includes("open facebook")){
  speak("opening facebook...")
  window.open("https://facebook.com/","_blank")
}
else if(message.includes("open instagram")){
  speak("opening instagram...")
  window.open("https://instagram.com/","_blank")
}
else if(message.includes("open calculator")){
  speak("opening calculator..")
  window.open("https://www.bing.com/ck/a?!&&p=8b4d9b32de375b40067f190d66419b95885b96fb135fada14dcfec1ad653ffceJmltdHM9MTc0NTM2NjQwMA&ptn=3&ver=2&hsh=4&fclid=2bb1c2b7-b9b8-64b1-18ed-d606b80a6552&psq=calculator&u=a1aHR0cHM6Ly93d3cub25saW5lLWNhbGN1bGF0b3IuY29tLw&ntb=1")
}
// else if(message.includes("open whatsapp")){
//   speak("opening whatsapp..")
//   window.open("whatsapp://")
// }
else if(message.includes("time")){
let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
speak(time)
}
else if(message.includes("date")){
  let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
  speak(date)
}
else{
  let finalText="this is what i found on internet regarding" + message.replace("alexa","") || message.replace("alexa","")
  speak(finalText)
  window.open(`https://www.google.com/search?q=${message.replace("alexa","")}`,"_blank")
}
}
ai.addEventListener("click",()=>{
  recognition.start()
speakpage.style.display="flex";
  })




  