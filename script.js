const slides = [];
const responses = [];

// Define drum types with their specific metrics and samples
const drumTypes = [
    {
        name: 'Kick Drum',
        intro: 'You will now be shown kick drums over different frequencies.',
        evaluationCriteria: `
            <h3>Kick Drum Evaluation Criteria</h3>
            <p><strong>Punch/Impact:</strong> Think of the "thump" you feel in your chest when you hear a strong kick drum. Does it feel powerful and energetic?</p>
            
            <p><strong>Sub-Resonance:</strong> This is the deep, bassy "boom" that makes the kick sound full and heavy. Does it feel rich and deep, or thin and weak?</p>
            
            <p><strong>Decay/Tightness:</strong> After the kick hits, how quickly does the sound fade? A "tight" kick fades quickly, while a resonant kick lasts longer.</p>
            
            <p><strong>Clarity:</strong> Can you hear the details in the kick, or does it sound muddy or unclear?</p>
            
            <p><strong>Overall Preference:</strong> Simply, how much do you like this kick drum?</p>
        `,
        metrics: [
            { name: "Punch/Impact", leftLabel: "Reference is punchier", rightLabel: "Test sample is punchier" },
            { name: "Sub-Resonance", leftLabel: "Reference has more sub-resonance", rightLabel: "Test sample has more sub-resonance" },
            { name: "Decay/Tightness", leftLabel: "Reference has tighter decay", rightLabel: "Test sample has tighter decay" },
            { name: "Clarity", leftLabel: "Reference is clearer", rightLabel: "Test sample is clearer" },
            { name: "Overall Preference", leftLabel: "Prefer reference", rightLabel: "Prefer test sample" }
        ],
        samples: [
            {
                ref: "drum_samples/Kick_50Hz_50Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Kick_50Hz_45Hz_Close.wav",
                    "drum_samples/Kick_50Hz_55Hz_Close.wav",
                    "drum_samples/Kick_50Hz_70Hz_Distant.wav",
                    "drum_samples/Kick_50Hz_90Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Kick_60Hz_60Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Kick_60Hz_55Hz_Close.wav",
                    "drum_samples/Kick_60Hz_65Hz_Close.wav",
                    "drum_samples/Kick_60Hz_80Hz_Distant.wav",
                    "drum_samples/Kick_60Hz_90Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Kick_70Hz_70Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Kick_70Hz_65Hz_Close.wav",
                    "drum_samples/Kick_70Hz_75Hz_Close.wav",
                    "drum_samples/Kick_70Hz_85Hz_Distant.wav",
                    "drum_samples/Kick_70Hz_95Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Kick_80Hz_80Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Kick_80Hz_75Hz_Close.wav",
                    "drum_samples/Kick_80Hz_85Hz_Close.wav",
                    "drum_samples/Kick_80Hz_90Hz_Distant.wav",
                    "drum_samples/Kick_80Hz_100Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Kick_90Hz_90Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Kick_90Hz_85Hz_Close.wav",
                    "drum_samples/Kick_90Hz_95Hz_Close.wav",
                    "drum_samples/Kick_90Hz_100Hz_Distant.wav",
                    "drum_samples/Kick_90Hz_120Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Kick_100Hz_100Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Kick_100Hz_95Hz_Close.wav",
                    "drum_samples/Kick_100Hz_105Hz_Close.wav",
                    "drum_samples/Kick_100Hz_110Hz_Distant.wav",
                    "drum_samples/Kick_100Hz_120Hz_Far Distant.wav"
                ]
            }
        ]
    },
    {
        name: 'Snare Drum',
        intro: 'You will now be shown snare drums over different frequencies.',
        evaluationCriteria: `
            <h3>Snare Drum Evaluation Criteria</h3>
            <p><strong>Crack/Snap:</strong> This is the sharp "pop" or "crack" you hear when the snare is hit. Does it cut through sharply or feel dull?.</p>
            
            <p><strong>Body:</strong> This refers to the snare’s warmth and fullness beyond the initial crack. Does it feel balanced and rich or thin and empty?.</p>
            
            <p><strong>Texture/Grain:</strong> The subtle "buzz" or "sizzle" in the snare’s sound, often from the snare wires. Does it sound lively and textured or flat?.</p>
            
            <p><strong>Decay/Gate:</strong> How long does the sound last after the initial hit? A short decay feels punchier, while a longer one adds resonance..</p>
            
            <p><strong>Overall Preference:</strong> Your personal enjoyment of the sound.</p>
        `,
        metrics: [
            { name: "Crack/Snap", leftLabel: "Reference has more crack/snap", rightLabel: "Test sample has more crack/snap" },
            { name: "Body", leftLabel: "Reference has fuller body", rightLabel: "Test sample has fuller body" },
            { name: "Texture/Grain", leftLabel: "Reference is less textured", rightLabel: "Test sample is more textured" },
            { name: "Decay/Gate", leftLabel: "Reference has longer decay/gate", rightLabel: "Test sample has longer decay/gate" },
            { name: "Overall Preference", leftLabel: "Prefer reference", rightLabel: "Prefer test sample" }
        ],
        samples: [
            {
                ref: "drum_samples/Snare_150Hz_150Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Snare_150Hz_140Hz_Close.wav",
                    "drum_samples/Snare_150Hz_160Hz_Close.wav",
                    "drum_samples/Snare_150Hz_180Hz_Distant.wav",
                    "drum_samples/Snare_150Hz_200Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Snare_200Hz_200Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Snare_200Hz_190Hz_Close.wav",
                    "drum_samples/Snare_200Hz_210Hz_Close.wav",
                    "drum_samples/Snare_200Hz_230Hz_Distant.wav",
                    "drum_samples/Snare_200Hz_250Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Snare_250Hz_250Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Snare_250Hz_240Hz_Close.wav",
                    "drum_samples/Snare_250Hz_260Hz_Close.wav",
                    "drum_samples/Snare_250Hz_280Hz_Distant.wav",
                    "drum_samples/Snare_250Hz_300Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Snare_300Hz_300Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Snare_300Hz_290Hz_Close.wav",
                    "drum_samples/Snare_300Hz_310Hz_Close.wav",
                    "drum_samples/Snare_300Hz_330Hz_Distant.wav",
                    "drum_samples/Snare_300Hz_350Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Snare_350Hz_350Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Snare_350Hz_340Hz_Close.wav",
                    "drum_samples/Snare_350Hz_360Hz_Close.wav",
                    "drum_samples/Snare_350Hz_370Hz_Distant.wav",
                    "drum_samples/Snare_350Hz_400Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Snare_400Hz_400Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Snare_400Hz_390Hz_Close.wav",
                    "drum_samples/Snare_400Hz_410Hz_Close.wav",
                    "drum_samples/Snare_400Hz_430Hz_Distant.wav",
                    "drum_samples/Snare_400Hz_450Hz_Far Distant.wav"
                ]
            }
        ]
    },
    {
        name: 'Tom Drum',
        intro: 'You will now be shown tom drums over different frequencies.',
        evaluationCriteria: `
            <h3>Tom Drum Evaluation Criteria</h3>
            <p><strong>Body/Resonance:</strong> This is the round, full sound of the tom. Does it feel rich and warm or hollow and empty?</p>
            
            <p><strong>Depth:</strong> How deep and powerful the sound feels.</p>
            
            <p><strong>Attack Detail:</strong> Sharpness of the initial hit.</p>
            
            <p><strong>Texture:</strong> Layering or richness of overtones.</p>
            
            <p><strong>Overall Preference:</strong> Your personal enjoyment of the sound.</p>
        `,
        metrics: [
            { name: "Body/Resonance", leftLabel: "Reference has more body/resonance", rightLabel: "Test sample has more body/resonance" },
            { name: "Depth", leftLabel: "Reference is deeper", rightLabel: "Test sample is deeper" },
            { name: "Attack Detail", leftLabel: "Reference has more attack detail", rightLabel: "Test sample has more attack detail" },
            { name: "Texture", leftLabel: "Reference is less textured", rightLabel: "Test sample is more textured" },
            { name: "Overall Preference", leftLabel: "Prefer reference", rightLabel: "Prefer test sample" }
        ],
        samples: [
            {
                ref: "drum_samples/Tom_120Hz_120Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Tom_120Hz_110Hz_Close.wav",
                    "drum_samples/Tom_120Hz_130Hz_Close.wav",
                    "drum_samples/Tom_120Hz_150Hz_Distant.wav",
                    "drum_samples/Tom_120Hz_180Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Tom_150Hz_150Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Tom_150Hz_140Hz_Close.wav",
                    "drum_samples/Tom_150Hz_160Hz_Close.wav",
                    "drum_samples/Tom_150Hz_180Hz_Distant.wav",
                    "drum_samples/Tom_150Hz_200Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Tom_200Hz_200Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Tom_200Hz_190Hz_Close.wav",
                    "drum_samples/Tom_200Hz_210Hz_Close.wav",
                    "drum_samples/Tom_200Hz_230Hz_Distant.wav",
                    "drum_samples/Tom_200Hz_250Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Tom_300Hz_300Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Tom_300Hz_290Hz_Close.wav",
                    "drum_samples/Tom_300Hz_310Hz_Close.wav",
                    "drum_samples/Tom_300Hz_320Hz_Distant.wav",
                    "drum_samples/Tom_300Hz_350Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Tom_350Hz_350Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Tom_350Hz_340Hz_Close.wav",
                    "drum_samples/Tom_350Hz_360Hz_Close.wav",
                    "drum_samples/Tom_350Hz_370Hz_Distant.wav",
                    "drum_samples/Tom_350Hz_400Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/Tom_400Hz_400Hz_Exact.wav",
                comparisons: [
                    "drum_samples/Tom_400Hz_390Hz_Close.wav",
                    "drum_samples/Tom_400Hz_410Hz_Close.wav",
                    "drum_samples/Tom_400Hz_430Hz_Distant.wav",
                    "drum_samples/Tom_400Hz_450Hz_Far Distant.wav"
                ]
            }
        ]
    },
    {
        name: 'Hi-Hat',
        intro: 'You will now be shown hi-hats over different frequencies.',
        evaluationCriteria: `
            <h3>Hi-Hat Evaluation Criteria</h3>
            <p><strong>Brightness:</strong> Does the hi-hat sound crisp and high-pitched, or dull and muted?</p>
            
            <p><strong>Sharpness/Attack:</strong> How clearly can you hear the initial hit? Is it snappy and crisp, or soft and unclear?</p>
            
            <p><strong>Decay:</strong> Does the sound fade quickly (like a closed hi-hat) or linger (like an open hi-hat)?</p>
            
            <p><strong>Clarity:</strong> Is the hi-hat sound clean and easy to distinguish, or does it feel noisy or muffled?</p>
            
            <p><strong>Overall Preference:</strong> How much do you like this hi-hat?</p>
        `,
        metrics: [
            { name: "Brightness", leftLabel: "Reference is brighter", rightLabel: "Test sample is brighter" },
            { name: "Sharpness/Attack", leftLabel: "Reference has sharper attack", rightLabel: "Test sample has sharper attack" },
            { name: "Decay", leftLabel: "Reference has longer decay", rightLabel: "Test sample has longer decay" },
            { name: "Clarity", leftLabel: "Reference is clearer", rightLabel: "Test sample is clearer" },
            { name: "Overall Preference", leftLabel: "Prefer reference", rightLabel: "Prefer test sample" }
        ],
        samples: [
            {
                ref: "drum_samples/HiHat_5000Hz_5000Hz_Exact.wav",
                comparisons: [
                    "drum_samples/HiHat_5000Hz_4900Hz_Close.wav",
                    "drum_samples/HiHat_5000Hz_5100Hz_Close.wav",
                    "drum_samples/HiHat_5000Hz_5300Hz_Distant.wav",
                    "drum_samples/HiHat_5000Hz_5500Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/HiHat_7000Hz_7000Hz_Exact.wav",
                comparisons: [
                    "drum_samples/HiHat_7000Hz_6900Hz_Close.wav",
                    "drum_samples/HiHat_7000Hz_7100Hz_Close.wav",
                    "drum_samples/HiHat_7000Hz_7300Hz_Distant.wav",
                    "drum_samples/HiHat_7000Hz_7500Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/HiHat_8000Hz_8000Hz_Exact.wav",
                comparisons: [
                    "drum_samples/HiHat_8000Hz_7900Hz_Close.wav",
                    "drum_samples/HiHat_8000Hz_8100Hz_Close.wav",
                    "drum_samples/HiHat_8000Hz_8300Hz_Distant.wav",
                    "drum_samples/HiHat_8000Hz_8500Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/HiHat_10000Hz_10000Hz_Exact.wav",
                comparisons: [
                    "drum_samples/HiHat_10000Hz_9900Hz_Close.wav",
                    "drum_samples/HiHat_10000Hz_10100Hz_Close.wav",
                    "drum_samples/HiHat_10000Hz_10300Hz_Distant.wav",
                    "drum_samples/HiHat_10000Hz_10500Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/HiHat_12000Hz_12000Hz_Exact.wav",
                comparisons: [
                    "drum_samples/HiHat_12000Hz_11900Hz_Close.wav",
                    "drum_samples/HiHat_12000Hz_12100Hz_Close.wav",
                    "drum_samples/HiHat_12000Hz_12300Hz_Distant.wav",
                    "drum_samples/HiHat_12000Hz_12500Hz_Far Distant.wav"
                ]
            },
            {
                ref: "drum_samples/HiHat_15000Hz_15000Hz_Exact.wav",
                comparisons: [
                    "drum_samples/HiHat_15000Hz_14900Hz_Close.wav",
                    "drum_samples/HiHat_15000Hz_15100Hz_Close.wav",
                    "drum_samples/HiHat_15000Hz_15300Hz_Distant.wav",
                    "drum_samples/HiHat_15000Hz_15500Hz_Far Distant.wav"
                ]
            }
        ]
    }
];


// Define introductory slides with centered text and drum emojis
slides.push({ 
    type: "text", 
    content: "<div class='centered'>🥁 Welcome to the Drum Sound Perception Test 🥁</div>" 
});
slides.push({ 
    type: "text", 
    content: "<div class='centered'>This test investigates how frequency and modulation changes affect the perceived characteristics of produced drum sounds. We highlight the special qualities of every sound, including their interactions within the critical bandwidth—that is, the region where sounds merge or stand out. <br><br> You will assess four different drum sounds, each with certain standards stated at the beginning of its portion. Every sound will have a reference for comparison; you will rate it depending on the stated standards. You can review and change your responses anytime during the test.</div>" 
});

// Dynamically add slides for each drum type
drumTypes.forEach(drumType => {
    // Add introductory slide for the drum type
    slides.push({ type: "text", content: drumType.intro });
    
    // Add evaluation criteria slide on the same page
    slides.push({ type: "text", content: drumType.evaluationCriteria });
    
    // Add comparison slides for each sample set
    drumType.samples.forEach(sampleSet => {
        sampleSet.comparisons.forEach(compSample => {
            slides.push({
                type: "comparison",
                drumType: drumType.name,
                refSample: sampleSet.ref,
                compSample: compSample,
                metrics: drumType.metrics
            });
        });
    });
});

// Add final thank you slide with centered text and drum emojis
slides.push({ 
    type: "text", 
    content: "<div class='centered'>Thank you for participating! Your responses have been saved. 🥁</div>" 
});

let currentSlide = 0;

// Load saved responses from localStorage (if any)
const savedResponses = localStorage.getItem("drumTestResponses");
if (savedResponses) {
    responses.push(...JSON.parse(savedResponses));
}

// Function to load the current slide
function loadSlide() {
    const container = document.getElementById("slide-container");
    container.innerHTML = ""; // Clear previous slide
    const slide = slides[currentSlide];

    // Update progress bar
    updateProgressBar();

    if (slide.type === "text") {
        container.innerHTML = `<div class="text-slide">${slide.content}</div>`;
    } else if (slide.type === "comparison") {
        container.innerHTML = `
            <h2>${slide.drumType} Evaluation</h2>
            <div class="audio-container">
                <div class="audio-player">
                    <h3>Reference</h3>
                    <audio controls src="${slide.refSample}"></audio>
                </div>
                <div class="audio-player">
                    <h3>Test Sample</h3>
                    <audio controls src="${slide.compSample}"></audio>
                </div>
            </div>
        `;

        slide.metrics.forEach(metric => {
            container.innerHTML += `
                <div class="metric-section">
                    <label class="metric-label">${metric.name}</label>
                    <div class="slider-container">
                        <span class="slider-label left">${metric.leftLabel}</span>
                        <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            step="0.1" 
                            value="3" 
                            data-metric="${metric.name}" 
                            aria-label="${metric.name}"
                        >
                        <span class="slider-label right">${metric.rightLabel}</span>
                    </div>
                </div>
            `;
        });

        // Restore previous responses if navigating back
        const response = responses.find(r => 
            r.drumType === slide.drumType && 
            r.refSample === slide.refSample && 
            r.compSample === slide.compSample
        );
        if (response) {
            slide.metrics.forEach(metric => {
                const slider = document.querySelector(`input[data-metric="${metric.name}"]`);
                if (slider && response[metric.name]) {
                    slider.value = response[metric.name];
                }
            });
        }
    }

    // Update navigation buttons
    updateNavButtons();
}

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = ((currentSlide) / (slides.length - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

// Function to update the navigation buttons' state and text
function updateNavButtons() {
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    // Disable Previous button on the first slide
    if (currentSlide === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    // Change Next button text to "Submit" on the last slide
    if (currentSlide === slides.length - 1) {
        nextButton.textContent = "Submit";
    } else {
        nextButton.textContent = "Next";
    }
}

// Function to save the current response
function saveResponse() {
    const slide = slides[currentSlide];
    if (slide.type === "comparison") {
        const audioResponses = { 
            drumType: slide.drumType, 
            refSample: slide.refSample, 
            compSample: slide.compSample 
        };
        document.querySelectorAll("input[type=range]").forEach(input => {
            audioResponses[input.dataset.metric] = parseFloat(input.value);
        });

        // Remove existing response for the same comparison to prevent duplicates
        const existingIndex = responses.findIndex(r => 
            r.drumType === audioResponses.drumType && 
            r.refSample === audioResponses.refSample && 
            r.compSample === audioResponses.compSample
        );
        if (existingIndex !== -1) {
            responses.splice(existingIndex, 1);
        }

        responses.push(audioResponses);

        // Save to localStorage
        localStorage.setItem("drumTestResponses", JSON.stringify(responses));
    }
}

// Function to go to the next slide
function nextSlide() {
    saveResponse();
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        loadSlide();
    } else {
        exportResults();
    }
}

// Function to go to the previous slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        loadSlide();
    }
}

// Function to export the results as a JSON file and clear localStorage
function exportResults() {
    const blob = new Blob([JSON.stringify(responses, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json";
    a.click();
    URL.revokeObjectURL(url);

    // Show a completion message
    const container = document.getElementById("slide-container");
    container.innerHTML = `<div class="centered">Thank you for completing the test! Your responses have been saved. 🥁</div>`;

    // Disable navigation buttons after submission
    const navButtons = document.getElementById("nav-buttons");
    navButtons.innerHTML = ""; // Remove buttons

    // Clear localStorage
    localStorage.removeItem("drumTestResponses");
}

// Initialize the first slide on page load
window.onload = loadSlide;
