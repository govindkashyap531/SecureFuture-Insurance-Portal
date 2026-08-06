const insuranceFAQ = {
"what is life insurance":"Life Insurance protects your family financially if something happens to the policyholder.",
"what is health insurance":"Health Insurance covers hospital and medical expenses.",
"what is motor insurance":"Motor Insurance protects your car or bike against accidents, theft and damages.",
"what is term insurance":"Term Insurance provides high life cover at an affordable premium for a fixed period.",
"best insurance":"The best insurance depends on your age, income, family responsibilities and goals.",
"claim process":"Inform the insurance company immediately, submit required documents and complete verification.",
"waiting period":"Waiting period is the time before certain claims become eligible.",
"cashless claim":"Cashless claim allows treatment at a network hospital without paying the full bill upfront.",
"ulip":"ULIP combines insurance with investment.",
"sip":"SIP is a systematic investment plan for regular investing in mutual funds.",
"child plan":"Child plans help secure a child's education and future expenses.",
"retirement plan":"Retirement plans help create income after retirement.",
"tax benefit":"Many insurance plans offer tax benefits under applicable tax laws.",
"nominee":"A nominee is the person who receives the policy benefits after the policyholder's death."
};
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("leadForm");
  const message = document.getElementById("message");

  if (form) {

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const mobile = form.querySelector('input[type="tel"]').value.trim();
      const insurance = form.querySelector("select").value;

      if (name.length < 3) {
        alert("Please enter your full name.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      if (insurance === "") {
        alert("Please select an insurance plan.");
        return;
      }

      fetch("/lead/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          mobile: mobile,
          insuranceType: insurance
        })
      })
      .then(res => res.json())
      .then(data => {
        message.innerHTML = "✅ Thank you! Our insurance advisor will contact you shortly.";
        form.reset();
      })
      .catch(err => {
        console.error(err);
        message.innerHTML = "❌ Something went wrong. Please try again.";
      });

    });

  }

  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

});


function calculatePremium() {

    const amount = parseFloat(document.getElementById("amount").value);
    const age = parseInt(document.getElementById("age").value);

    if (!amount || !age) {
        document.getElementById("result").innerHTML =
        "Please enter Amount and Age.";
        return;
    }

    let rate = 0.02;

    if (age <= 30) {
        rate = 0.02;
    } else if (age <= 40) {
        rate = 0.025;
    } else if (age <= 50) {
        rate = 0.03;
    } else if (age <= 60) {
        rate = 0.04;
    } else if (age <= 70) {
        rate = 0.05;
    } else {
        rate = 0.06;
    }

    const premium = (amount * rate).toFixed(2);

    document.getElementById("result").innerHTML =
        "Estimated Premium: ₹" + premium + " / year";
}

// ================= AI CHATBOT =================

const chatButton=document.getElementById("chatButton");
const chatBox=document.getElementById("chatBox");
const closeChat=document.getElementById("closeChat");
const sendButton=document.getElementById("sendMessage");
const userMessage=document.getElementById("userMessage");
const chatMessages=document.getElementById("chatMessages");

if(chatButton){

chatButton.onclick=()=>{
chatBox.style.display="block";
};

closeChat.onclick=()=>{
chatBox.style.display="none";
};

sendButton.onclick=sendChat;

userMessage.addEventListener("keypress",function(e){
if(e.key==="Enter"){
sendChat();
}
});

}

function sendChat(){

const text=userMessage.value.trim();

if(text==="") return;

chatMessages.innerHTML+=`
<div class="user">${text}</div>
`;

userMessage.value="";

const reply=getBotReply(text.toLowerCase());

setTimeout(()=>{

chatMessages.innerHTML+=`
<div class="bot">${reply}</div>
`;

chatMessages.scrollTop=chatMessages.scrollHeight;

},500);

}

function getBotReply(msg){

if(msg.includes("life"))
return "Life Insurance protects your family's financial future.";

if(msg.includes("health"))
return "Health Insurance covers hospitalization and medical expenses.";

if(msg.includes("motor")||msg.includes("car")||msg.includes("bike"))
return "Motor Insurance protects your vehicle against accidents and damage.";

if(msg.includes("investment"))
return "Investment Plans help you build long-term wealth while providing protection.";

if(msg.includes("claim"))
return "For claim assistance please contact our SecureFuture Advisor.";

if(msg.includes("premium"))
return "Premium depends on age, income, policy type and coverage amount.";

if(msg.includes("hello")||msg.includes("hi"))
return "Hello 👋 Welcome to SecureFuture Insurance. How may I help you?";

return "I can help you with Life Insurance, Health Insurance, Motor Insurance, Investment Plans, Premiums and Claims.";
}
// Premium Calculator
function calculatePremium() {
  const amount = parseFloat(document.getElementById("sumAssured").value);

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  // Example: 2% annual premium estimate
  const premium = amount * 0.02;

  document.getElementById("premiumResult").innerHTML =
    "Estimated Annual Premium: ₹" + premium.toLocaleString("en-IN");
}

