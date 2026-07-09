# 🎵 AudioScape - Audio Reactive Visualizer

AudioScape is a real-time audio reactive visualizer built using **JavaScript, Web Audio API, and HTML Canvas**. It analyzes audio frequency data and transforms music into dynamic, animated visual effects.

The project focuses on real-time audio processing, creative coding, and interactive graphics to create an immersive visualization experience.

---

## ✨ Features

* 🎧 **Audio File Upload**

  * Load local audio files and visualize them in real time.

* 🌈 **RGB Spectrum Visualization**

  * Circular frequency spectrum that reacts dynamically with music.

* 🔵 **Multiple Visualization Modes**

  * RGB Spectrum
  * Deep Blue Mode
  * 3-Band Color Visualization

* ✨ **Audio Reactive Particles**

  * Floating particle system that responds to audio intensity.

* 💓 **Center Pulse Effect**

  * Dynamic pulse animation based on low-frequency audio data.

* 🎚️ **Audio Controls**

  * Play
  * Pause
  * Stop
  * Volume Control
  * Track Seeking

* ⛶ **Fullscreen Visual Mode**

  * Expand the visualizer for an immersive display experience.

* 📊 **Performance Monitoring**

  * Real-time FPS counter.

---

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **Web Audio API**
* **Canvas API**

---

## ⚙️ How It Works

AudioScape uses the browser's **Web Audio API** to analyze audio signals.

The audio pipeline:

```
Audio File
     |
     ↓
AudioContext
     |
     ↓
AnalyserNode
     |
     ↓
Frequency Data
     |
     ↓
Canvas Rendering
     |
     ↓
Real-Time Visualization
```

The frequency data extracted from the audio is used to control:

* Spectrum movement
* Particle speed
* Center pulse intensity
* Visual effects

---

## 📂 Project Structure

```
AudioScape/
│
├── index.html
├── style.css
├── script.js
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/AudioScape.git
```

### Open the project

Open:

```
index.html
```

in your browser.

No additional installation is required.

---

## 🎮 Usage

1. Upload an audio file.
2. Press Play.
3. Select different visualization modes.
4. Enable fullscreen mode for an immersive experience.

---

## 🔮 Future Improvements

* 🎤 Live audio input support
* 🎛️ MIDI controller integration
* 🥁 Beat detection and beat-synchronized effects
* 🎨 Advanced visual effects
* 🎥 DJ performance mode
* 🔊 Audio interface support

---

## 👨‍💻 Author

**Shahadat Ali**

Computer Science Engineer | Full Stack Developer | Creative Technology Enthusiast

---

⭐ If you like this project, consider giving it a star!
