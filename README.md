<div align="center">
  <img src="public/cover.png" width="100%" alt="Synthetica Banner" />

  # SYNTHETICA
  ### The Equation-Based Digital Audio Workstation

  [Demo](https://synthecia-168810048178.us-central1.run.app) • [Vibe-Coding #JuaraVibeCoding](https://ai.studio)
</div>

---

**Synthetica** is a professional-grade Digital Audio Workstation (DAW) where sound is not sampled, but solved. Built for the #JuaraVibeCoding event, it leverages mathematical functions to generate high-fidelity audio in real-time.

## 🚀 Key Features

- **Math-to-Sound Engine**: Write pure JavaScript math functions to generate complex waveforms.
- **Producer Studio**: A multi-track timeline for arranging clips, complete with volume automation and master reverb.
- **Project Persistence**: Save and load your compositions directly in the browser via LocalStorage.
- **Vibe-Coding Integration**: Powered by Gemini API for natural language sound synthesis and orchestration.

## 🛠 Tech Stack

- **Core**: [Next.js 15](https://nextjs.org/) & [React 19](https://react.dev/)
- **Audio Engine**: [Tone.js](https://tonejs.github.io/) & Custom Web Audio Worklets
- **AI**: [Google Gemini API](https://ai.google.dev/)
- **Infrastructure**: [Google Cloud Run](https://cloud.google.com/run) & [Docker](https://www.docker.com/)

## 💻 Getting Started

### Prerequisites
- Node.js 20+
- Google Cloud SDK (for deployment)

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set your environment variables in `.env.local`:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
3. Run the development server:
   ```bash
   make dev
   ```

## 🚢 Deployment

The project is optimized for **Google Cloud Run**. Use the included `Makefile` for automated deployment:

```bash
make deploy
```

---

<div align="center">
  Built with 🎹 and 📐 for #JuaraVibeCoding
</div>
