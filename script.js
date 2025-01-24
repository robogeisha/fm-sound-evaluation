// *****************************************************
// 1) GLOBAL VARIABLES
// *****************************************************
let userData = {
  sex: "",  // <-- Added sex field
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

// *****************************************************
// 2) HELPER: SHUFFLE
// *****************************************************
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// *****************************************************
// 3) BUILD TRIALS
// *****************************************************
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

// *****************************************************
// 4) INTRO PAGE
// *****************************************************
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
        ±15 Hz modulated kick:
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
        Some modulations are subtle. You can only play each sample twice.
        <br><br>
        Click "Continue" for environment instructions, then start the test.
      </p>

      <button id="introNext" class="btn">Continue</button>
    </div>
  `;
  progressBar.style.width = "0%";

  document.getElementById("introNext").addEventListener("click", showEnvironmentPage);
}

// *****************************************************
// 5) ENVIRONMENT PAGE
// *****************************************************
function showEnvironmentPage() {
  container.innerHTML = `
    <div class="text-slide">
      <h2>Listening Environment & Equipment</h2>
      <ul style="text-align:left;">
        <li>Use <strong>headphones/speakers</strong> that can reproduce low-bass frequencies.</li>
        <li>Set a comfortable volume.</li>
        <li>Choose a <strong>quiet environment</strong>.</li>
      </ul>
      <p>Click "Start Test" when ready.</p>
      <button id="envNext" class="btn">Start Test</button>
    </div>
  `;
  progressBar.style.width = "0%";

  document.getElementById("envNext").addEventListener("click", startTest);
}

// *****************************************************
// 6) START THE 2AFC TEST
// *****************************************************
function startTest() {
  buildTrials();
  loadTrial();
}

// *****************************************************
// 7) LOAD A TRIAL
// *****************************************************
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

  const localPlayCount = {
    [trial.sampleA]: 0,
    [trial.sampleB]: 0
  };

  // Enforce 2-play
  const audioA = document.getElementById("audioA");
  const audioB = document.getElementById("audioB");

  audioA.addEventListener("play", () => handlePlay(trial.sampleA, audioA, localPlayCount));
  audioB.addEventListener("play", () => handlePlay(trial.sampleB, audioB, localPlayCount));

  // Choice
  document.getElementById("buttonA").addEventListener("click", () => handleResponse("A"));
  document.getElementById("buttonB").addEventListener("click", () => handleResponse("B"));
}

// *****************************************************
// 8) ENFORCE TWO-PLAY
// *****************************************************
function handlePlay(url, audioElem, localPlayCount) {
  localPlayCount[url]++;
  if (localPlayCount[url] > 2) {
    audioElem.pause();
    audioElem.currentTime = 0;
    audioElem.controls = false;
  }
}

// *****************************************************
// 9) HANDLE A RESPONSE
// *****************************************************
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

// *****************************************************
// 10) END TEST
// *****************************************************
function endTest() {
  progressBar.style.width = "100%";
  showQuestionnaire();
}

// *****************************************************
// 11) QUESTIONNAIRE
// *****************************************************
function showQuestionnaire() {
  container.innerHTML = `
    <div class="text-slide" style="text-align:left;">
      <h2>Final Questionnaire</h2>
      <p>Please answer these questions.</p>

      <!-- New Sex Field -->
      <label>Sex:</label><br>
      <select id="sexSelect">
        <option value="">-- Select --</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br><br>

      <label>Do you have normal hearing?</label><br>
      <select id="hearingSelect">
        <option value="">-- Select --</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="Unsure">Unsure</option>
      </select>
      <br><br>

      <label>Musical Training (years)?</label><br>
      <select id="musicSelect">
        <option value="">-- Select --</option>
        <option value="0">0</option>
        <option value="1-3">1-3</option>
        <option value="4-6">4-6</option>
        <option value="7plus">7+</option>
      </select>
      <br><br>

      <label>Audio Production Experience?</label><br>
      <select id="productionSelect">
        <option value="">-- Select --</option>
        <option value="None">None</option>
        <option value="Basic">Basic</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Professional">Professional</option>
      </select>
      <br><br>

      <label>Listening Device?</label><br>
      <select id="deviceSelect">
        <option value="">-- Select --</option>
        <option value="Headphones">Headphones</option>
        <option value="Speakers">Speakers</option>
      </select>
      <br><br>

      <label>Listening Environment?</label><br>
      <select id="envSelect">
        <option value="">-- Select --</option>
        <option value="Quiet">Quiet</option>
        <option value="Some Noise">Some Noise</option>
        <option value="Noisy">Noisy</option>
      </select>
      <br><br>

      <label>Overall Confidence? (1=low, 5=high)</label><br>
      <select id="confidenceSelect">
        <option value="">-- Select --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br><br>

      <label>Difficulty? (1=easy, 5=hard)</label><br>
      <select id="difficultySelect">
        <option value="">-- Select --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br><br>

      <label>Fatigue? (1=none, 5=extreme)</label><br>
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

// *****************************************************
// 12) COLLECT & SUBMIT FORM
// *****************************************************
function collectQuestionnaireAndSend() {
  // Collect user data
  userData.sex               = document.getElementById("sexSelect").value;       // <-- Capture the sex field
  userData.hearing           = document.getElementById("hearingSelect").value;
  userData.musicTrainingYears= document.getElementById("musicSelect").value;
  userData.productionExp     = document.getElementById("productionSelect").value;
  userData.device            = document.getElementById("deviceSelect").value;
  userData.environment       = document.getElementById("envSelect").value;
  userData.confidence        = document.getElementById("confidenceSelect").value;
  userData.difficulty        = document.getElementById("difficultySelect").value;
  userData.fatigue           = document.getElementById("fatigueSelect").value;

  // Combine everything
  const fullData = {
    userData: userData,
    forcedChoiceResponses: responses
  };

  // Put JSON string into the hidden input
  const hiddenInput = document.getElementById("hiddenData");
  hiddenInput.value = JSON.stringify(fullData);

  // Submit the form
  document.getElementById("myForm").submit();
}

// *****************************************************
// INIT
// *****************************************************
window.onload = showIntro;
</script>

</body>
</html>
