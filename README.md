# Mitra Mental Health Platform (Prototype)

Mitra is a prototype platform designed for peer mental health ambassadors at college campuses. It helps review, manage, and act on student mental health flags using AI-assisted insights powered by the Groq SDK.

## Features

- **Dashboard**: Track student flags, status, severity, and timeline of events.
- **Detail View**: Deep dive into active flags with AI-generated context explanations, recommended next steps, and outreach drafts.
- **Peer Check-in**: Record student check-in outcomes and log notes.
- **Escalation Flow**: Guide peer ambassadors through safe escalation protocols.
- **AI Copilot (Groq SDK)**: Utilizes a custom Node backend server interacting with the Groq API to provide supportive, non-clinical recommendations and custom question answering.

---

## How to Run the Program locally

Follow these steps to set up and run the project on your machine:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher is recommended).

### 1. Install Dependencies

Install all the required package dependencies for both the React frontend and Node backend:
```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the provided `.env.example` file to create a `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open the newly created `.env` file in your editor.
3. Replace `your_groq_api_key_here` with your actual Groq API key (you can obtain one from the [Groq Console](https://console.groq.com/keys)).
   ```env
   GROQ_API_KEY=gsk_your_actual_key_here
   GROQ_MODEL=openai/gpt-oss-20b
   ```

### 3. Start the Development Servers

Run the development command:
```bash
npm run dev
```

This command runs both the **Vite frontend** and the **Node.js backend** server concurrently:
- **Frontend (Vite)**: Accessible at [http://localhost:5173](http://localhost:5173) (or the port specified in terminal).
- **Backend (Node.js)**: Runs on [http://localhost:8787](http://localhost:8787) to serve AI requests.

---

## Production Build

To build the application for production, run:
```bash
npm run build
```

To preview the built app locally:
```bash
npm run preview
```
