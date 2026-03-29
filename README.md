# OW Who Said It

A fast, browser-based Overwatch quote quiz where you guess which hero said the line.

Built with React and Tailwind.

## Overview

OW Who Said It is a lightweight game project inspired by the classic "Who said it?" challenge.  
Each round gives you:

- One voice line
- Two hero options
- One correct answer

Pick the right hero to keep your streak alive. One wrong guess ends the run.

## Features

- Randomized quote rounds using real Overwatch hero quote data
- Two-choice gameplay for quick sessions
- Local high score tracking via browser localStorage

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```text
src/
	components/      # Shared UI components (Navbar)
	pages/           # Route pages (Home, Game, About)
	services/        # Hero + quote data loading logic
	json/            # Hero metadata and quote JSON files
	models/          # TypeScript model types
```

## Disclaimer

Overwatch and related character names are trademarks and property of Blizzard Entertainment.  
This project is a fan-made educational/personal project and is not affiliated with or endorsed by Blizzard Entertainment.