/*****************************************************
 * 1) GLOBAL VARIABLES
 *****************************************************/
let userData = {
  hearing: "",
  musicTrainingYears: "",
  productionExp: "",
  device: "",
  environment: "",
  confidence: "",
  difficulty: "",
  fatigue: ""
};

// Our 2AFC stimuli & forced-choice data
const stimuli = [
  {
    ref: "fm_kick_samples/Kick_Ref_60Hz_0.5s.wav",
    fmList: [
      "fm_kick_samples/Kick_FM_60Hz_0.5s_3HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_60Hz_0.5s_5HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_60Hz_0.5s_9HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_60Hz_0.5s_15HzDepth_10HzRate.wav"
    ]
  },
  {
    ref: "fm_kick_samples/Kick_Ref_60Hz_1.0s.wav",
    fmList: [
      "fm_kick_samples/Kick_FM_60Hz_1.0s_3HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_60Hz_1.0s_5HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_60Hz_1.0s_9HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_60Hz_1.0s_15HzDepth_10HzRate.wav"
    ]
  },
  {
    ref: "fm_kick_samples/Kick_Ref_100Hz_0.5s.wav",
    fmList: [
      "fm_kick_samples/Kick_FM_100Hz_0.5s_3HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_100Hz_0.5s_5HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_100Hz_0.5s_9HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_100Hz_0.5s_15HzDepth_10HzRate.wav"
    ]
  },
  {
    ref: "fm_kick_samples/Kick_Ref_100Hz_1.0s.wav",
    fmList: [
      "fm_kick_samples/Kick_FM_100Hz_1.0s_3HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_100Hz_1.0s_5HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_100Hz_1.0s_9HzDepth_10HzRate.wav",
      "fm_kick_samples/Kick_FM_100Hz_1.0s_15HzDepth_10HzRate.wav"
    ]
  }
];

// How many repeats of each FM variant
const repeats = 4;

// We'll build an array of trials for the forced-choice test
let trials = [];
let currentTrial = 0;
const responses = [];

// DOM references
const container   = document.getElementById("slide-container");
const progressBar = document.getElementById("progress-bar");

// IMPORTANT: Your Google Apps Script Web App URL
// (Use the deployed URL ending in '/exec')


const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwYm1elCxX3K_pQpIBGyNhJCwxFAu12anKwy7UEIQeAvFPfQ0mxdqfLvay7BMJrZF1-8A/exec";



/*****************************************************
 * 2) HELPER: SHUFFLE
 *****************************************************/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/*****************************************************
 * 3) BUILD TRIALS
 *****************************************************/
function buildTrials() {
  stimuli.forEach(block => {
    const refFile = block.ref;
    block.fmList.forEach(fmFile => {
      for (let i = 0; i < repeats; i++) {
        const referenceIsA = Math.random() < 0.5;
        const sampleA = referenceIsA ? refFile : fmFile;
        const sampleB = referenceIsA ? fmFile : refFile;
        const correct = referenceIsA ? "B" : "A";

        trials.push({
          refFile: refFile,
          fmFile: fmFile,
          sampleA: sampleA,
          sampleB: sampleB,
          correctAnswer: correct
        });
      }
    });
  });
  shuffle(trials);
}

/*****************************************************
 * 4) PAGE 1: INTRO
 *****************************************************/
function showIntro() {
  container.innerHTML = `
    <div class="text-slide">
      <h2>Welcome to the Kick FM Detection Test</h2>
      <p>
        In each trial, you will hear two short kick samples:
        one unmodulated <strong>reference</strong> and one with 
        <strong>frequency modulation (FM)</strong>.
      </p>
      <p>
        Your task is to identify which sample is modulated by clicking 
        "Sample A" or "Sample B".
      </p>
      <p>
        Below is an <strong>example</strong> so you can hear 
        the difference between a reference and a 
        ±15 Hz modulated kick around 60 Hz:
      </p>

      <div class="audio-container">
        <div class="audio-player">
          <h3>Reference (60 Hz, 0.5s)</h3>
          <audio controls src="fm_kick_samples/Kick_Ref_60Hz_0.5s.wav"></audio>
        </div>
        <div class="audio-player">
          <h3>Modulated (±15 Hz)</h3>
          <audio controls src="fm_kick_samples/Kick_FM_60Hz_0.5s_15HzDepth_10HzRate.wav"></audio>
        </div>
      </div>

      <p>
        Listen to both samples above to get a feel for 
        how <strong>pitch modulation</strong> might sound. 
        Some of the modulations will be subtle. 
        Do not overthink. <strong>You can only hear each sample twice in the actual test.</strong>
        <br><br>
        When you click "Continue", you'll see environment instructions,
        then proceed to the main test. Afterwards, you'll fill out a short questionnaire.
      </p>

      <button id="introNext" class="btn">Continue</button>
    </div>
  `;
  progressBar.style.width = "0%";

  document.getElementById("introNext").addEventListener("click", showEnvironmentPage);
}

/*****************************************************
 * 5) PAGE 2: ENVIRONMENT PAGE
 *****************************************************/
function showEnvironmentPage() {
  container.innerHTML = `
    <div class="text-slide">
      <h2>Listening Environment & Equipment</h2>
      <p><strong>Recommended Setup:</strong></p>
      <ul style="text-align:left;">
        <li>Use <strong>headphones or speakers</strong> that can reproduce 
            low-bass frequencies (below ~50 Hz). No basic laptop speakers!
        </li>
        <li>Set your listening volume at a comfortable level 
            where you can hear subtle pitch changes.
        </li>
        <li>Choose a <strong>quiet environment</strong> with minimal background noise.</li>
      </ul>
      <p>Click "Start Test" when you're ready to begin the trials.</p>
      <button id="envNext" class="btn">Start Test</button>
    </div>
  `;
  progressBar.style.width = "0%";

  document.getElementById("envNext").addEventListener("click", startTest);
}

/*****************************************************
 * 6) START THE 2AFC TEST
 *****************************************************/
function startTest() {
  buildTrials();
  loadTrial();
}

/*****************************************************
 * 7) LOAD A TRIAL (ENFORCE 2-PLAY LIMIT)
 *****************************************************/
function loadTrial() {
  if (currentTrial >= trials.length) {
    endTest();
    return;
  }

  const percent = (currentTrial / trials.length) * 100;
  progressBar.style.width = `${percent}%`;

  const trial = trials[currentTrial];

  container.innerHTML = `
    <div style="text-align: center;">
      <h2>Trial ${currentTrial + 1} of ${trials.length}</h2>
      <p>You can only play each sample <strong>twice</strong>. Which sample is modulated?</p>
    </div>

    <div class="audio-container">
      <div class="audio-player">
        <h3>Sample A</h3>
        <audio id="audioA" controls src="${trial.sampleA}"></audio>
      </div>
      <div class="audio-player">
        <h3>Sample B</h3>
        <audio id="audioB" controls src="${trial.sampleB}"></audio>
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px;">
      <button id="buttonA" class="btn">Sample A</button>
      <button id="buttonB" class="btn">Sample B</button>
    </div>
  `;

  // We'll store local play counts for each sample in this trial
  const localPlayCount = {
    [trial.sampleA]: 0,
    [trial.sampleB]: 0
  };

  // Get references to the audio elements
  const audioA = document.getElementById("audioA");
  const audioB = document.getElementById("audioB");

  // Attach "play" listeners to enforce 2-play limit
  audioA.addEventListener("play", () => handlePlay(trial.sampleA, audioA, localPlayCount));
  audioB.addEventListener("play", () => handlePlay(trial.sampleB, audioB, localPlayCount));

  // Handle forced-choice responses
  document.getElementById("buttonA").addEventListener("click", () => handleResponse("A"));
  document.getElementById("buttonB").addEventListener("click", () => handleResponse("B"));
}

/*****************************************************
 * 8) ENFORCE TWO-PLAY LIMIT
 *****************************************************/
function handlePlay(url, audioElem, localPlayCount) {
  // Increment local play count
  localPlayCount[url]++;

  // If user tries to play more than 2 times, pause & disable
  if (localPlayCount[url] > 2) {
    audioElem.pause();
    audioElem.currentTime = 0;
    audioElem.controls = false;  // Hide or disable controls
  }
}

/*****************************************************
 * 9) HANDLE A RESPONSE
 *****************************************************/
function handleResponse(chosen) {
  const trial = trials[currentTrial];
  const isCorrect = (chosen === trial.correctAnswer);

  responses.push({
    trialIndex: currentTrial,
    refFile: trial.refFile,
    fmFile: trial.fmFile,
    sampleA: trial.sampleA,
    sampleB: trial.sampleB,
    correctAnswer: trial.correctAnswer,
    chosen: chosen,
    isCorrect: isCorrect,
    timestamp: new Date().toISOString()
  });

  currentTrial++;
  loadTrial();
}

/*****************************************************
 * 10) END TEST → SHOW QUESTIONNAIRE
 *****************************************************/
function endTest() {
  progressBar.style.width = "100%";
  showQuestionnaire();
}

/*****************************************************
 * 11) QUESTIONNAIRE PAGE
 *****************************************************/
function showQuestionnaire() {
  container.innerHTML = `
    <div class="text-slide" style="text-align:left;">
      <h2>Final Questionnaire</h2>
      <p>Please answer the following now that you've completed the test.</p>

      <label for="hearingSelect"><strong>Do you have normal hearing?</strong></label><br>
      <select id="hearingSelect">
        <option value="">-- Select an option --</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Unsure">Unsure</option>
      </select>
      <br><br>

      <label for="musicSelect"><strong>Have you had formal musical training (years)?</strong></label><br>
      <select id="musicSelect">
        <option value="">-- Select --</option>
        <option value="0">0 (none)</option>
        <option value="1-3">1-3</option>
        <option value="4-6">4-6</option>
        <option value="7plus">7+</option>
      </select>
      <br><br>

      <label for="productionSelect"><strong>Experience with Audio Production?</strong></label><br>
      <select id="productionSelect">
        <option value="">-- Select --</option>
        <option value="None">None</option>
        <option value="Basic">Basic (hobby)</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Professional">Professional</option>
      </select>
      <br><br>

      <label for="deviceSelect"><strong>Listening Device?</strong></label><br>
      <select id="deviceSelect">
        <option value="">-- Select --</option>
        <option value="Headphones">Headphones</option>
        <option value="Speakers">Speakers</option>
      </select>
      <br><br>

      <label for="envSelect"><strong>Listening Environment?</strong></label><br>
      <select id="envSelect">
        <option value="">-- Select --</option>
        <option value="Quiet">Quiet</option>
        <option value="Some Noise">Some Noise</option>
        <option value="Noisy">Noisy</option>
      </select>
      <br><br>

      <label for="confidenceSelect"><strong>Your Overall Confidence? (1=low, 5=high)</strong></label><br>
      <select id="confidenceSelect">
        <option value="">-- Select --</option>
        <option value="1">1 (Not confident)</option>
        <option value="2">2</option>
        <option value="3">3 (Somewhat confident)</option>
        <option value="4">4</option>
        <option value="5">5 (Very confident)</option>
      </select>
      <br><br>

      <label for="difficultySelect"><strong>Difficulty of the Test? (1=easy, 5=hard)</strong></label><br>
      <select id="difficultySelect">
        <option value="">-- Select --</option>
        <option value="1">1 (Very easy)</option>
        <option value="2">2</option>
        <option value="3">3 (Moderate)</option>
        <option value="4">4</option>
        <option value="5">5 (Very difficult)</option>
      </select>
      <br><br>

      <label for="fatigueSelect"><strong>How tiring was the test? (1=not, 5=extremely)</strong></label><br>
      <select id="fatigueSelect">
        <option value="">-- Select --</option>
        <option value="1">1 (No fatigue)</option>
        <option value="2">2</option>
        <option value="3">3 (Moderate)</option>
        <option value="4">4</option>
        <option value="5">5 (Very fatigued)</option>
      </select>
      <br><br>

      <button id="finishButton" class="btn">Finish</button>
    </div>
  `;

  document.getElementById("finishButton").addEventListener("click", collectQuestionnaireAndSend);
}

/*****************************************************
 * 12) COLLECT & SEND DATA TO GOOGLE APPS SCRIPT
 *****************************************************/
function collectQuestionnaireAndSend() {
  // Collect user data
  userData.hearing            = document.getElementById("hearingSelect").value;
  userData.musicTrainingYears = document.getElementById("musicSelect").value;
  userData.productionExp      = document.getElementById("productionSelect").value;
  userData.device             = document.getElementById("deviceSelect").value;
  userData.environment        = document.getElementById("envSelect").value;
  userData.confidence         = document.getElementById("confidenceSelect").value;
  userData.difficulty         = document.getElementById("difficultySelect").value;
  userData.fatigue            = document.getElementById("fatigueSelect").value;

  // Combine user data + forced-choice responses
  const fullData = {
    userData: userData,
    forcedChoiceResponses: responses
  };





fetch(APPS_SCRIPT_URL, {
  method: "POST",
  mode: "no-cors",  // <--- important
  headers: {
    // Must be "simple" headers if you do no-cors
    "Content-Type": "text/plain"
  },
  body: JSON.stringify(fullData)
})
.then(() => {
   // You won't get a real response, but at least your code continues
   console.log("Attempted no-cors request");
   container.innerHTML = "<h2>Thank you!</h2><p>We attempted to save your data.</p>";
})
.catch(err => {
   console.error("Error sending data in no-cors mode:", err);
   alert("Oops, something prevented even the no-cors request from going out.");
});


/*****************************************************
 * INIT: Show Intro on page load
 *****************************************************/
window.onload = showIntro;
