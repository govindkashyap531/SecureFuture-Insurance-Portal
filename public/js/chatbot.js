alert("Chatbot JS Loaded");

const chatButton = document.getElementById("chatButton");

console.log(chatButton);
alert(chatButton ? "Button Found" : "Button Not Found");

const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendMessage = document.getElementById("sendMessage");
const userMessage = document.getElementById("userMessage");
const chatMessages = document.getElementById("chatMessages");

if(chatButton){

chatButton.addEventListener("click", function () {
    alert("Chat button clicked");
    chatBox.style.display = "block";
});

closeChat.onclick=()=>{
chatBox.style.display="none";
};

sendMessage.onclick=reply;

userMessage.addEventListener("keypress",function(e){
if(e.key==="Enter"){
reply();
}
});

}

function addBot(text){

chatMessages.innerHTML+=`
<div class="bot">${text}</div>
`;

chatMessages.scrollTop=chatMessages.scrollHeight;

}

function addUser(text){

chatMessages.innerHTML+=`
<div class="user">${text}</div>
`;

chatMessages.scrollTop=chatMessages.scrollHeight;

}

function reply(){

let msg=userMessage.value.trim();

if(msg=="") return;

addUser(msg);

userMessage.value="";

setTimeout(()=>{

addBot(getAnswer(msg.toLowerCase()));

},500);

}

function getAnswer(msg){

if(msg.includes("hi") || msg.includes("hello"))
return "Hello 👋 Welcome to SecureFuture Insurance. How can I help you today?";

if(msg.includes("life"))
return "Life Insurance provides financial security to your family in case of an unfortunate event. It is one of the most important financial protection plans.";

if(msg.includes("health"))
return "Health Insurance helps cover hospitalization, surgeries, medicines and other eligible medical expenses.";

if(msg.includes("motor") || msg.includes("car") || msg.includes("bike"))
return "Motor Insurance protects your vehicle against accidents, theft, natural disasters and third-party liabilities.";

if(msg.includes("term"))
return "Term Insurance offers high life cover at a low premium for a fixed policy term.";

if(msg.includes("claim"))
return "To file a claim, inform the insurance company immediately, submit the required documents and complete the verification process.";

if(msg.includes("premium"))
return "The premium depends on factors such as your age, health, coverage amount, policy type and policy duration.";

if(msg.includes("tax"))
return "Many insurance policies provide tax benefits under applicable income tax laws. Please consult a tax advisor for your specific situation.";

if(msg.includes("nominee"))
return "A nominee is the person who receives the policy benefits if the policyholder passes away.";

if(msg.includes("ulip"))
return "ULIP combines life insurance with investment, allowing you to build wealth while staying insured.";

if(msg.includes("sip"))
return "SIP is a disciplined way to invest regularly in mutual funds. It is different from insurance but can complement your financial planning.";

if(msg.includes("contact") || msg.includes("advisor"))
return "📞 You can contact SecureFuture Insurance for personalised guidance.\n\nPhone: +91 6389788659";

return "I can help with Life Insurance, Health Insurance, Motor Insurance, Term Insurance, Claims, Premiums, Tax Benefits, ULIP, SIP and other general insurance questions. Please ask your question in detail.";
}
