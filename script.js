const slides = [];
const responses = [];

// Load samples from folders
const drumSamples = ["drum_samples/sample1.wav", "drum_samples/sample2.wav"];
const kickTomSamples = ["Kick_Tom/sample1.wav", "Kick_Tom/sample2.wav"];
const tomSnareSamples = ["Tom_Snare/sample1.wav", "Tom_Snare/sample2.wav"];
const snareHihatSamples = ["Snare_Hihat/sample1.wav", "Snare_Hihat/sample2.wav"];

// Define metrics
const individualMetrics = ["Punch/Impact", "Resonance", "Texture", "Clarity", "Overall Preference"];
const layerMetrics = ["Blend vs. Separation", "Rhythmic Sync", "Texture and Depth", "Spatial Impression"];

// Define the slide structure
slides.push({ type: "text", content: "Lorem ipsum page 1" });
slides.push({ type: "text", content: "Lorem ipsum page 2" });

// Individual samples phase
drumSamples.forEach(sample => {
    slides.push({ type: "audio", sample: sample, metrics: individualMetrics });
});

slides.push({ type: "text", content: "Lorem ipsum page 3" });

// Layered samples phase
slides.push({ type: "text", content: "Lorem ipsum page 4" });

kickTomSamples.forEach(sample => {
    slides.push({ type: "audio", sample: sample, metrics: layerMetrics });
});

slides.push({ type: "text", content: "Lorem ipsum page 5" });

tomSnareSamples.forEach(sample => {
    slides.push({ type: "audio", sample: sample, metrics: layerMetrics });
});

slides.push({ type: "text", content: "Lorem ipsum page 6" });

snareHihatSamples.forEach(sample => {
    slides.push({ type: "audio", sample: sample, metrics: layerMetrics });
});

let currentSlide = 0;

function loadSlide() {
    const container = document.getElementById("slide-container");
    container.innerHTML = ""; // Clear previous slide
    const slide = slides[currentSlide];
    
    if (slide.type === "text") {
        container.innerHTML = `<p>${slide.content}</p>`;
    } else if (slide.type === "audio") {
        container.innerHTML = `<audio controls src="${slide.sample}"></audio>`;
        slide.metrics.forEach(metric => {
            container.innerHTML += `<label>${metric}</label><input type="range" min="1" max="5" step="1" value="3" data-metric="${metric}"><br>`;
        });
    }
}

function saveResponse() {
    const slide = slides[currentSlide];
    if (slide.type === "audio") {
        const audioResponses = { sample: slide.sample };
        document.querySelectorAll("input[type=range]").forEach(input => {
            audioResponses[input.dataset.metric] = input.value;
        });
        responses.push(audioResponses);
    }
}

function nextSlide() {
    saveResponse();
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        loadSlide();
    } else {
        exportResults();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        loadSlide();
    }
}

function exportResults() {
    const blob = new Blob([JSON.stringify(responses, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize the first slide
loadSlide();
