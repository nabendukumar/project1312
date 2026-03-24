// -------------------- Audio Fade Out --------------------
function fadeOutAudio(audio, duration = 1000) {
  if(!audio) return;

  let step = 50; // interval in ms
  let volume = audio.volume; // current volume
  let fadeStep = volume / (duration / step);

  let fadeInterval = setInterval(() => {
    if(audio.volume - fadeStep > 0){
      audio.volume -= fadeStep;
    } else {
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;
      clearInterval(fadeInterval);
      // reset volume for next play
      audio.volume = volume;
    }
  }, step);
}

// -------------------- Page Load --------------------
window.onload = function () { initDelayed(1); };

// -------------------- Page Navigation --------------------
function nextPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page'+n).classList.add('active');

  if(n === '7b'){
  const texts = document.querySelectorAll('#page7b .convince-text');
  texts.forEach((el,i)=>{
    setTimeout(()=>{
      el.style.opacity = 1;
    }, i*800);
  });
}

  // ---------------- Audio Control ----------------
  
  const letterMusic = document.getElementById('letterMusic');

// 🎧 Fade music ONLY when entering gate page (9b)
if(letterMusic && n === "9b"){
  fadeOutAudio(letterMusic, 2000); // slow smooth fade ❤️
}

  if(n===1||n===2) initDelayed(n);
  if(n===3) startPercent();
  if(n===4) initVoicePage();
  if(n===5) initQuizHint();
  if(n === "5b") initHeartbeatScene();
  if(n===6) initLetterPage();
  if(n===7) initFinalQuestion();
  if(n===8) initMemories1();
  if(n===9) initMemories2();
  if(n === "9b") initChatPage();
  if(n === "10A") initPage10A();
  if(n === "10B") initPage10B();
 if(n == 10){
  initEasterEgg();
}
}

// -------------------- Delayed Text/Button --------------------
function initDelayed(page){
  function initPage10B(){
  const lines = document.querySelectorAll('#page10B .line');

  lines.forEach((line, i)=>{
    line.style.opacity = 0;

    setTimeout(()=>{
      line.style.transition = "opacity 0.8s ease";
      line.style.opacity = 1;
    }, i * 700);
  });
}
  let textElems = document.querySelectorAll('#page'+page+' .delayed-text, #page'+page+' .delayed-texts p');
  textElems.forEach((el,i)=>{ 
    setTimeout(()=>{ el.style.opacity=1; }, i*600); 
  });
  let btn = document.querySelector('#page'+page+' .delayed-button');
  if(btn) setTimeout(()=>{ btn.style.opacity=1; btn.style.display='inline-block'; }, Math.max(400,textElems.length*600));
}

// -------------------- PAGE 3 Compatibility --------------------

function startPercent(){
  const percentEl = document.getElementById('percent');
  const calcText = document.getElementById('calcText');
  const musicResult = document.getElementById('musicResult');

  let current = 0;
  const target = 99;
  const duration = 2500; // total animation time (ms)
  const stepTime = 20;
  const increment = target / (duration / stepTime);

  let interval = setInterval(()=>{
    current += increment;

    if(current >= target){
      current = target;
      clearInterval(interval);

      setTimeout(()=>{
        calcText.style.display='none';
        musicResult.style.display='block';

        let delayedElems = musicResult.querySelectorAll('.delayed');
        delayedElems.forEach((el,j)=>{
          setTimeout(()=>{ el.style.opacity=1; }, j*500);
        });
      }, 300);
    }

    percentEl.innerText = Math.floor(current) + '%';

  }, stepTime);
}

// -------------------- PAGE 4 Voice --------------------
function initVoicePage(){
  const p1 = document.getElementById('voiceMsg1');
  const btn = document.getElementById('showVoiceBtn');
  const audio = document.getElementById('voiceAudio');
  const p2 = document.getElementById('voiceMsg2');
  const nextBtn = document.getElementById('nextPage4Btn');
  const page4 = document.getElementById('page4');

  p1.style.opacity=0; btn.style.opacity=0; audio.style.opacity=0; audio.style.display='none';
  p2.style.opacity=0; nextBtn.style.opacity=0;
  page4.style.overflow='hidden';

  setTimeout(()=>{ p1.style.opacity=1; },300);
  setTimeout(()=>{ btn.style.opacity=1; },800);

  btn.onclick=function(){
    btn.style.display='none';
    audio.style.display='block';
    setTimeout(()=>{ audio.style.opacity=1; audio.play(); },100);

    const noteInterval = setInterval(()=>{
      const note = document.createElement('div');
      note.innerText="🎵";
      note.style.position="absolute";
      note.style.left=Math.random()*window.innerWidth+"px";
      note.style.top=Math.random()*window.innerHeight+"px";
      note.style.fontSize=(15+Math.random()*20)+"px";
      note.style.opacity=1;
      note.style.pointerEvents="none";
      document.body.appendChild(note);
      setTimeout(()=>{ note.style.transition="all 1s ease-out"; note.style.opacity=0; note.style.transform="translateY(-50px)"; },50);
      setTimeout(()=>note.remove(),1000);
    },200);

    audio.onended = function(){ clearInterval(noteInterval); };

    setTimeout(()=>{
      p2.style.opacity=1; 
      setTimeout(()=>{ nextBtn.style.opacity=1; page4.style.overflow='auto'; },300);
    },500);
  };
}

// -------------------- PAGE 5 Quiz --------------------
let wrongCount=0;
function correct(q){
  document.getElementById('q'+q).style.display='none';
  if(q<3){ document.getElementById('q'+(q+1)).style.display='block'; }
  else {
    if(wrongCount===0){
      const successMsg = document.getElementById('quizSuccess');
      successMsg.style.display='block';
      setTimeout(()=>{
        let nextBtn=document.createElement('button');
        nextBtn.innerText='Next →';
        nextBtn.onclick = ()=> nextPage("5b");
        nextBtn.style.marginTop='20px';
        successMsg.insertAdjacentElement('afterend',nextBtn);
      },500);
    } else {
      alert("Dost dost naa rahi 😒 gandi buggie😭 Let's try again!");
      resetQuiz();
    }
  }
}
function wrong(el,q){
  el.classList.add('wrong');
  setTimeout(()=>{ el.classList.remove('wrong'); },500);
  wrongCount++;
  let popup = document.getElementById("popup"+q);
  popup.innerText = "Dost dost naa raha 😭"; popup.style.display = "block";
  setTimeout(()=>{ popup.innerText = "Gandi buggie 🥺"; },1400);
  setTimeout(()=>{ popup.innerText = "Spotify bhi disappoint ho gaya 🎧"; },2800);
  setTimeout(()=>{ popup.innerText = ""; popup.style.display="none"; resetQuiz(); },4200);
}
function resetQuiz(){
  wrongCount=0;
  document.getElementById('quizSuccess').style.display='none';
  const nextBtn = document.querySelector('#quizSuccess + button');
  if(nextBtn) nextBtn.remove();
  for(let i=1;i<=3;i++){
    let q=document.getElementById('q'+i);
    q.style.display=(i===1)?'block':'none';
  }
}

// -------------------- Quiz 3-tap hidden hint --------------------
function initQuizHint(){
  let quizTapCount = 0;
  const quizTitle = document.querySelector("#page5 h3"); 
  quizTitle.addEventListener("click", ()=>{
    quizTapCount++;
    if(quizTapCount===3){
      const hint = document.createElement('p');
      hint.innerText = "🔎 Hint : Evidence";
      hint.style.color="#ff5e94";
      hint.style.fontWeight="600";
      hint.style.marginTop="10px";
      quizTitle.insertAdjacentElement('afterend', hint);
    }
  });
}

// -------------------- Tulip Animation --------------------
function createTulip(x, y){
  let tulip = document.createElement("div");
  tulip.innerText = "🌷";
  tulip.className = "tulip";
  tulip.style.left = x + "px";
  tulip.style.top = y + "px";
  document.body.appendChild(tulip);
  requestAnimationFrame(()=>{
    tulip.style.transform = "translate(-50%, -50%) scale(1)";
    tulip.style.opacity = 1;
  });
  setTimeout(()=>{
    tulip.style.opacity = 0;
    tulip.style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(()=> tulip.remove(), 300);
  }, 800);
}
document.addEventListener("click", e => createTulip(e.pageX, e.pageY));
document.addEventListener("touchstart", e => { let touch = e.touches[0]; createTulip(touch.pageX, touch.pageY); });

// -------------------- PAGE 6 LETTER --------------------
function initLetterPage(){
  const letter = document.getElementById('letterContainer');
  const letterMusic = document.getElementById('letterMusic');
  
  // Start music
  letterMusic.muted = false;
  letterMusic.volume = 0.3;
  letterMusic.play().catch(e=>console.log("Autoplay blocked:", e));

  // Animate paragraphs one by one + floating emojis
  const paragraphs = letter.querySelectorAll('p');
  paragraphs.forEach((p,i)=>{
    p.style.opacity = 0;
    setTimeout(()=>{
      p.style.transition = "opacity 1s";
      p.style.opacity = 1;

      // spawn floating emojis randomly for each paragraph
      for(let j=0;j<3;j++){
        setTimeout(()=>{
          const emoji = document.createElement('div');
          emoji.className = "floating-emoji";
          emoji.innerText = ["❤️","💖","✨","🌸","💌"][Math.floor(Math.random()*5)];
          emoji.style.left = (Math.random()*window.innerWidth) + "px";
          emoji.style.top = (Math.random()*window.innerHeight) + "px";
          emoji.style.fontSize = (15+Math.random()*20)+"px";
          document.body.appendChild(emoji);
          setTimeout(()=>{ emoji.style.transition="all 1.5s ease-out"; emoji.style.opacity=0; emoji.style.transform="translateY(-60px)"; },50);
          setTimeout(()=>emoji.remove(),1600);
        }, j*300);
      }

    }, i*1200);
  });
}

// -------------------- PAGE 7 FINAL QUESTION --------------------
function initFinalQuestion(){
  const page7 = document.getElementById('page7');
  page7.innerHTML = `
    <h2>Will you be mine until death parts us?</h2>
    <div class="option" id="obvious">Obviously Buddhu❤️🫂</div>
    <div class="option" id="icant">Noo I can't</div>
    <p id="finalMsg" style="color:#ff5e94; font-weight:600; margin-top:15px;"></p>
  `;
  page7.style.display='flex';
  page7.style.flexDirection='column';
  page7.style.alignItems='center';
  page7.style.justifyContent='center';
  page7.style.gap = "20px";

  const finalMsg = document.getElementById('finalMsg');

  page7.querySelector('#obvious').onclick = ()=>{
    finalMsg.innerText = "I Love you lil athlete🥹❤️";
    triggerCelebration();
    setTimeout(()=> nextPage(8), 2500);
  };

  page7.querySelector('#icant').onclick = ()=>{
  nextPage('7b');
};
}

function acceptLove(){

  // Disable the button after clicking
  document.querySelector('#page7b button').disabled = true;

  // Trigger the celebration animation (customized)
  triggerCelebration();

  // Get the message container
  const msg = document.getElementById('inlineMessage');

  // Set the message text
  msg.innerText = "Babe, we are gonna make it. Just don't lose hope on us 🫂";

  // Make sure it's hidden initially
  msg.style.opacity = 0;

  // Fade in the message after a short delay
  setTimeout(()=>{
    msg.style.transition = "opacity 1s ease";
    msg.style.opacity = 1;
  }, 100);  // Slight delay before showing the message

  // Wait for 2.5 seconds, then move to next page
  setTimeout(()=>{
    nextPage(8);
  }, 2500);  // Move to next page after message fades in
}

function stillNo(){
  const page = document.getElementById('page7b');

  // duplicate message na bane
  if(document.getElementById('finalStillMsg')) return;

  const msg = document.createElement('p');
  msg.id = "finalStillMsg";
  msg.innerText = "I’ll still stay… no pressure, no forcing. Bas tu khush reh ❤️";
  msg.style.marginTop = "15px";
  msg.style.color = "#ff5e94";
  msg.style.fontWeight = "600";

  page.appendChild(msg);

  // smooth fast transition
  setTimeout(()=>{
    page.style.opacity = 0;
    setTimeout(()=> nextPage(8), 300);
  }, 1000);
}

// -------------------- PAGE 8 MEMORIES --------------------
function initMemories1(){
  const photos = document.querySelectorAll('#page8 .memory-photo');
  const caption1 = document.getElementById('caption1'); 
  const caption2 = document.getElementById('caption2'); 
  const nextBtn = document.getElementById('next6Btn');

  photos.forEach((img,i)=>{ img.style.opacity=0; setTimeout(()=>{ img.style.opacity=1; }, i*400); });
  setTimeout(()=>{ caption1.style.opacity=1; }, photos.length*400 + 400);
  setTimeout(()=>{ caption2.style.opacity=1; }, photos.length*400 + 1200);
  setTimeout(()=>{ nextBtn.style.opacity=1; }, photos.length*400 + 1800);
}

// -------------------- PAGE 9 MEMORIES 2 --------------------
function initMemories2(){
  const compText = document.getElementById('compText');
  const photos = document.querySelectorAll('#page9 .memory-photo');
  const winnerText = document.getElementById('winnerText');
  const nextBtn = document.getElementById('next7Btn');

  compText.style.opacity=1;
  photos.forEach((img,i)=>{ img.style.opacity=0; setTimeout(()=>{ img.style.opacity=1; }, i*500 + 600); });

  setTimeout(()=>{
    winnerText.style.opacity=1;
    triggerCelebration();
  }, photos.length*500 + 1200);

  setTimeout(()=>{ nextBtn.style.opacity=1; }, photos.length*500 + 1800);
}

// -------------------- CELEBRATION --------------------
function triggerCelebration(){
  for(let i=0;i<20;i++){
    const spark = document.createElement('div');
    spark.innerText = "✨";
    spark.style.position="absolute";
    spark.style.left=(Math.random()*window.innerWidth)+"px";
    spark.style.top=(Math.random()*window.innerHeight)+"px";
    spark.style.fontSize=(10+Math.random()*20)+"px";
    spark.style.opacity=1;
    spark.style.pointerEvents="none";
    document.body.appendChild(spark);
    setTimeout(()=>{ spark.style.transition="all 0.8s ease-out"; spark.style.opacity=0; spark.style.transform="translateY(-50px)"; },50);
    setTimeout(()=>spark.remove(),900);
    if(i%3===0){ createTulip(Math.random()*window.innerWidth, Math.random()*window.innerHeight); }
  }
}

// -------------------- PAGE 10 EASTER EGG --------------------
function initEasterEgg() {
  const page10 = document.getElementById('page10');
  let tapCount = 0;
  let activated = false;

  page10.onclick = () => {

    if (activated) return;
 
    tapCount++;

    if (tapCount === 5) {
      activated = true;

      const overlay = document.createElement('div');
      overlay.id = "easterEggOverlay";
      overlay.style.cssText = `
        position:fixed;
        top:0; left:0;
        width:100%; height:100%;
        background:rgba(0,0,0,0.75);
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        backdrop-filter:blur(8px);
        z-index:2000;
        overflow:hidden;
      `;

      // Message
      const msg = document.createElement('div');
      msg.innerText = "You found the hidden quests, sweetie! ❤️";
      msg.style.cssText = `
        color:white;
        font-size:26px;
        font-weight:600;
        margin-bottom:20px;
        text-align:center;
        animation:fadeIn 1s ease;
      `;
      overlay.appendChild(msg);

      // Close button
      const closeBtn = document.createElement('button');
      closeBtn.innerText = "Close ✖";
      closeBtn.style.cssText = `
        padding:10px 20px;
        border:none;
        border-radius:8px;
        background:#ff4d6d;
        color:white;
        font-size:16px;
        cursor:pointer;
      `;
      overlay.appendChild(closeBtn);

      closeBtn.onclick = () => {
        overlay.remove();
        activated = false;
        tapCount = 0;
      };

      // Audio
      const secretAudio = document.createElement('audio');
      secretAudio.src = "assets1/secretvoice.mp3";
      secretAudio.loop = true;
      secretAudio.autoplay = true;
      overlay.appendChild(secretAudio);

      document.body.appendChild(overlay);

      // Floating hearts (continuous)
      function createHeart() {
        const heart = document.createElement('div');
        heart.innerText = "❤️";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.bottom = "-20px";
        heart.style.fontSize = (15 + Math.random() * 25) + "px";
        heart.style.opacity = Math.random();
        heart.style.animation = "floatUp 3s linear forwards";
        overlay.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
      }

      const heartInterval = setInterval(createHeart, 200);

      closeBtn.addEventListener("click", () => {
        clearInterval(heartInterval);
        secretAudio.pause();
      });

      // Animations
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `;
      document.head.appendChild(style);
    }
  };
}
const nextBtn = document.getElementById("next5bBtn");


function initHeartbeatScene(){

  const btn = document.getElementById("heartBtn");
  const img = document.getElementById("lovePhoto");
  const msg = document.getElementById("finalMsg");
  const nextBtn = document.getElementById("next5bBtn");

  let interval;
  let holding = false;
  let speed = 800;

  // ✅ RESET EVERYTHING FIRST
  img.style.opacity = 0;
  msg.style.opacity = 0;
  nextBtn.style.opacity = 0;

  function beat(){
    if(navigator.vibrate){
      navigator.vibrate([60, speed - 60]);
    }

    img.style.transform = "scale(1.06)";
    setTimeout(()=>{
      img.style.transform = "scale(1)";
    }, 120);
  }

  function startHeartbeat(){
    clearInterval(interval);
    interval = setInterval(beat, speed);
  }

  btn.addEventListener("touchstart", start);
  btn.addEventListener("mousedown", start);

  btn.addEventListener("touchend", stop);
  btn.addEventListener("mouseup", stop);
  btn.addEventListener("mouseleave", stop);

  function start(){
    holding = true;
    startHeartbeat();

    setTimeout(()=>{
      if(!holding) return;

      img.style.opacity = 1;
      speed = 450;
      startHeartbeat();
    },3000);

    setTimeout(()=>{
      if(!holding) return;

      msg.style.opacity = 1;
      msg.innerText = "Love… that's what my heart sounds like when it's you ❤️";

      speed = 300;
      startHeartbeat();
    },4000);

    // ✅ SHOW BUTTON AFTER EVERYTHING
    setTimeout(()=>{
      if(holding){
        nextBtn.style.opacity = 1;
      }
    },4500);
  }

  function stop(){
    holding = false;
    clearInterval(interval);
    navigator.vibrate(0);
  }
}

// AFTER 4.5 sec → show NEXT button
setTimeout(()=>{
  if(nextBtn){
    nextBtn.style.opacity = 1;
  }
}, 4500);

// -------------------- CHAT GATE --------------------
// -------------------- GATE PAGE --------------------
let gateAttempts = 0;
const correctAnswer = "laxmi mata"; 

document.getElementById("gateBtn").onclick = () => {
  const input = document.getElementById("gateInput").value.toLowerCase().trim();
  const msg = document.getElementById("gateMsg");

  gateAttempts++;

 if(input === correctAnswer || input.includes("laxmi") || input.includes("mata")) {
  msg.innerText = "Haan haan… ab yaad aaya 😏❤️";

  triggerCelebration();

  setTimeout(() => {
    const line2 = document.createElement("div");
    line2.innerText = "Chalo… kuch yaadein taza krte hai 👀";
    line2.style.marginTop = "6px";
    msg.appendChild(line2);

    // 👉 2 sec baad auto next page 10A
    setTimeout(() => {
      nextPage("10A");
    }, 2000);

  }, 1500);




  } else if(gateAttempts < 3) {
    const hints = [
      "Babygirl galat jawab",
      "Apne andar ke bhagwan se pucho ji.. (ishse zayda nhi bataunga)"
    ];
    msg.innerText = hints[gateAttempts-1];

  } else {
    // 3 wrong attempts → skip directly to QR page
    msg.innerText = "dust aurat chance khatam, jaao yaad kro phele";
    setTimeout(() => nextPage(10), 1500);
  }
};

// -------------------- CHAT ANIMATION --------------------
function initChatPage(){
  const blocks = document.querySelectorAll('#page9b .chat-block');
  const btn = document.getElementById('nextChatBtn');

  blocks.forEach((block, i)=>{
    setTimeout(()=>{
      block.style.opacity = 1;
      block.style.transform = "translateY(0)";
    }, i * 800);
  });

  setTimeout(()=>{
    btn.style.opacity = 1;
  }, blocks.length * 800 + 500);
}

// -------------------- CHAT MODAL --------------------
const chatImgs = document.querySelectorAll(".chatImg");
const modal = document.getElementById("chatModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

// Tap on chat image → show full-screen
chatImgs.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

// Close button
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  modalImg.src = "";
});

// Tap outside image → close
modal.addEventListener("click", e => {
  if(e.target === modal) {
    modal.style.display = "none";
    modalImg.src = "";
  }
});

function initPage10A(){
  const btn = document.getElementById("next10ABtn");

  if(btn){
    btn.style.opacity = 0;
    btn.style.display = "block";

    setTimeout(()=>{
      btn.style.opacity = 1;
    }, 1000); // 1 sec delay ke baad show
  }
}
function initPage10B(){
  const lines = document.querySelectorAll('#page10B .line');

  lines.forEach((line, i)=>{
    line.style.opacity = 0;

    setTimeout(()=>{
      line.style.transition = "opacity 0.8s ease";
      line.style.opacity = 1;
    }, i * 700);
  });
}