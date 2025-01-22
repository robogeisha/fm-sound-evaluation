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

const repeats = 4;
let trials = [];
let currentTrial = 0;
const responses = [];

// DOM references
const container   = document.getElementById("slide-container");
const progressBar = document.getElementById("progress-bar");

// NO direct fetch needed, we'll do a form POST instead

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
 * 4) INTRO PAGE
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
        You can only play each sample <strong>twice</strong> during the test.
        <br><br>
        When you click "Continue", you'll see environment instructions,
        then the main test. Afterwards, there's a short questionnaire.
      </p>

      <button id="introNext" class="btn">Continue</button>
    </div>
  `;
  progressBar.style.width = "0%";

  document.getElementById("introNext").addEventListener("click", showEnvironmentPage);
}

/*****************************************************
 * 5) ENVIRONMENT PAGE
 *****************************************************/
function showEnvironmentPage() {
  container.innerHTML = `
    <div class="text-slide">
      <h2>Listening Environment & Equipment</h2>
      <p><strong>Recommended Setup:</strong></p>
      <ul style="text-align:left;">
        <li>Use <strong>headphones or speakers</strong> that can reproduce 
            low-bass frequencies (below ~50 Hz).
        </li>
        <li>Set your listening volume at a comfortable level 
            where you can hear subtle pitch changes.
        </li>
        <li>Choose a <strong>quiet environment</strong> with minimal background noise.</li>
      </ul>
      <p>Click "Start Test" when you're ready.</p>
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
 * 7) LOAD A TRIAL
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

  // We'll store local play counts for each sample
  const localPlayCount = {
    [trial.sampleA]: 0,
    [trial.sampleB]: 0
  };

  // Enforce 2-play limit
  const audioA = document.getElementById("audioA");
  const audioB = document.getElementById("audioB");

  audioA.addEventListener("play", () => handlePlay(trial.sampleA, audioA, localPlayCount));
  audioB.addEventListener("play", () => handlePlay(trial.sampleB, audioB, localPlayCount));

  // Choice
  document.getElementById("buttonA").addEventListener("click", () => handleResponse("A"));
  document.getElementById("buttonB").addEventListener("click", () => handleResponse("B"));
}

/*****************************************************
 * 8) ENFORCE 2-PLAY LIMIT
 *****************************************************/
function handlePlay(url, audioElem, localPlayCount) {
  localPlayCount[url]++;
  if (localPlayCount[url] > 2) {
    audioElem.pause();
    audioElem.currentTime = 0;
    audioElem.controls = false; 
  }
}

/*****************************************************
 * 9) HANDLE RESPONSE
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
 * 10) END TEST
 *****************************************************/
function endTest() {
  progressBar.style.width = "100%";
  showQuestionnaire();
}

/*****************************************************
 * 11) QUESTIONNAIRE
 *****************************************************/
function showQuestionnaire() {
  container.innerHTML = `
    <div class="text-slide" style="text-align:left;">
      <h2>Final Questionnaire</h2>
      <p>Please answer the following now that you've completed the test.</p>

      <label><strong>Normal Hearing?</strong></label><br>
      <select id="hearingSelect">
        <option value="">-- Select --</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Unsure">Unsure</option>
      </select>
      <br><br>

      <label><strong>Musical Training (years)?</strong></label><br>
      <select id="musicSelect">
        <option value="">-- Select --</option>
        <option value="0">0</option>
        <option value="1-3">1-3</option>
        <option value="4-6">4-6</option>
        <option value="7plus">7+</option>
      </select>
      <br><br>

      <label><strong>Audio Production Experience?</strong></label><br>
      <select id="productionSelect">
        <option value="">-- Select --</option>
        <option value="None">None</option>
        <option value="Basic">Basic (hobby)</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Professional">Professional</option>
      </select>
      <br><br>

      <label><strong>Listening Device?</strong></label><br>
      <select id="deviceSelect">
        <option value="">-- Select --</option>
        <option value="Headphones">Headphones</option>
        <option value="Speakers">Speakers</option>
      </select>
      <br><br>

      <label><strong>Environment?</strong></label><br>
      <select id="envSelect">
        <option value="">-- Select --</option>
        <option value="Quiet">Quiet</option>
        <option value="Some Noise">Some Noise</option>
        <option value="Noisy">Noisy</option>
      </select>
      <br><br>

      <label><strong>Confidence? (1=low, 5=high)</strong></label><br>
      <select id="confidenceSelect">
        <option value="">-- Select --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br><br>

      <label><strong>Difficulty? (1=easy, 5=hard)</strong></label><br>
      <select id="difficultySelect">
        <option value="">-- Select --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br><br>

      <label><strong>Fatigue? (1=none, 5=extreme)</strong></label><br>
      <select id="fatigueSelect">
        <option value="">-- Select --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br><br>

      <button id="finishButton" class="btn">Finish</button>
    </div>
  `;

  document.getElementById("finishButton").addEventListener("click", collectQuestionnaireAndSend);
}

/*****************************************************
 * 12) COLLECT & SEND VIA HIDDEN FORM
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

  // 1) Get the hidden field, store the JSON
  const hiddenData = document.getElementById("hiddenData");
  hiddenData.value = JSON.stringify(fullData);

  // 2) Submit the form
  //    This does a normal form POST to Apps Script, so no CORS issues
  document.getElementById("myForm").submit();

  // 3) The browser will navigate to the script's response page
  //    If you want to remain on your site, you'd do an iframe approach or accept the redirect.
}

/*****************************************************
 * INIT
 *****************************************************/
window.onload = showIntro;
