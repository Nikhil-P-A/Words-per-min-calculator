const typing_ground = document.querySelector("#quoteInput");
const btn = document.querySelector("#btn");
const score = document.querySelector("#score");
const showSentence = document.querySelector("#quoteDisplay");
const sentences = "https://api.quotable.io/random";
const timer = document.querySelector("#timer");

let startTime, endTime, totalTimeTake, sentence_to_write;

function getRandomQuote() {
  return fetch(sentences)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  showSentence.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    // characterSpan.classList.add('correct')
    characterSpan.innerText = character;
    showSentence.appendChild(characterSpan);
  });
  typing_ground.value = null;
}

const calculateTypingSpeed = (time_taken) => {
  let totalWords = typing_ground.value.trim();
  let actualWords = totalWords.split(" ").length;

  if (actualWords !== 0) {
    let typing_speed = (actualWords / time_taken) * 60;
    typing_speed = Math.round(typing_speed);
    score.innerHTML = `Speed : ${typing_speed} WPM`;
  }
};
const endTypingTest = () => {
  btn.innerText = "Start";
  showTimer();

  let date = new Date();
  endTime = date.getTime();

  totalTimeTaken = (endTime - startTime) / 1000;

  calculateTypingSpeed(totalTimeTaken);

  showSentence.innerHTML = "";
  typing_ground.value = "";
};

let intervalID,
  elapsedTime = 0;

const showTimer = () => {
  if (btn.innerText === "Done") {
    intervalID = setInterval(() => {
      elapsedTime++;
      timer.innerHTML = elapsedTime;
    }, 1000);
  } else if (btn.innerText === "Start") {
    elapsedTime = "";
    clearInterval(intervalID);
    timer.innerHTML = "";
  }
};
const startTyping = () => {
  renderNewQuote();

  let date = new Date();
  startTime = date.getTime();

  btn.innerText = "Done";

  showTimer();
};

btn.addEventListener("click", () => {
  switch (btn.innerText.toLowerCase()) {
    case "start":
      typing_ground.removeAttribute("disabled");
      startTyping();
      break;

    case "done":
      typing_ground.setAttribute("disabled", "true");
      endTypingTest();
      break;
  }
});
