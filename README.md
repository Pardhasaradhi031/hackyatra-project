# Project Setup Guide

## Prerequisites

Before running this project, make sure you have the following installed:

### 1. Node.js

* Install the latest **LTS** version (recommended: Node.js 22.x LTS).
* Verify installation:

```bash
node -v
npm -v
```

### 2. Git

* Install Git.
* Verify installation:

```bash
git --version
```

### 3. Visual Studio Code (Recommended)

Recommended extensions:

* ESLint
* Tailwind CSS IntelliSense
* Prettier
* GitLens

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
```

### Open the project

```bash
cd <project-folder>
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open your browser at:

```
http://localhost:3000
```

## Available Scripts

Start development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

Run ESLint:

```bash
npm run lint
```

## Project Requirements

* Node.js (LTS)
* npm (comes with Node.js)
* Git
* Internet connection (for installing packages)

## Team Workflow

1. Pull the latest changes before starting work:

```bash
git pull origin main
```

2. Create a new feature branch:

```bash
git checkout -b feature/<feature-name>
```

3. Commit your changes:

```bash
git add .
git commit -m "Describe your changes"
```

4. Push your branch:

```bash
git push origin feature/<feature-name>
```

5. Create a Pull Request to merge into `main`.
