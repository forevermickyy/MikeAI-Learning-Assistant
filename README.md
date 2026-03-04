# 🧠 MikeAI: Your Neural Learning Companion

MikeAI is a high-performance, empathetic AI learning assistant built for the 2026 web. It bridges the gap between raw artificial intelligence and personalized productivity through a signature "Liquid Glass" interface and a custom neural link.



## 🚀 The Neural Stack

* **Frontend:** React 18, Tailwind CSS (utilizing `liquid-glass`), Framer Motion.
* **Backend:** Node.js, Express, MongoDB.
* **Intelligence:** Google Gemini API (Stable `v1` endpoint utilizing `gemini-2.5-flash`).
* **Icons:** React Icons (Font Awesome & HeroIcons).

---

## ✨ Key Features

### 🖥️ Signature Interface
* **Liquid Glass Sidebar:** A dynamic, expandable navigation system with nested logic for sub-tools.
* **Adaptive Theme:** Clean, white aesthetics paired with high-energy `bg-linear` red-to-orange gradients.
* **Neural Suggestions:** Pre-defined smart prompts to help users initiate growth-focused conversations.

### 🤖 MikeAI Link
* **Persistent Persona:** Custom system-level instructions that ensure MikeAI remains an expert, supportive mentor.
* **Streaming Intelligence:** Real-time text streaming (SSE) for an organic, "typing" chat experience.
* **Smart Anchoring:** Integrated "About+" section with smooth-scroll logic for premium feature discovery.

### 💎 Dashboard Modules
| Free Tier | MikeAI+ (Premium) |
| :--- | :--- |
| **Generate Quizzes** | **Transcribe Video/Audio** |
| **Make Documents (PDF/Docx)** | **Summarize Video/Audio** |
| **Summarize Notes** | **Generate Audio/Video** |
| **Generate Images** | **Neural Memory** |

---

## 🛠️ Project Evolution

### Recent Technical Fixes:
* **API Migration:** Successfully bypassed `v1beta` 404/400 errors by forcing the stable `v1` endpoint and utilizing the `startChat` history method for system instructions.
* **Sidebar Engineering:** Implemented a dual-purpose Dashboard link that supports both direct navigation and a nested expansion menu for specific tools.
* **Global State:** Integrated `UserContext` for real-time onboarding and protected route handling.

---

## 🚦 Getting Started

### 1. Prerequisites
* Node.js (v18+)
* Google AI Studio API Key (Gemini)
* MongoDB Atlas URI

### 2. Installation
```bash
# Clone the repository
git clone [https://github.com/forevermickyy/mikeai.git](https://github.com/forevermickyy/mikeai.git)

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
