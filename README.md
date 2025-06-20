# SmartPaw

SmartPaw is a proprietary, internal-use web platform designed to connect pet owners with trusted pet care professionals. The platform streamlines the process of finding, booking, and managing pet care services, ensuring safety, transparency, and convenience for both pet owners and service providers.

---

## Overview

SmartPaw provides a seamless digital experience for:
- Pet Boarding with real-time updates
- Professional Grooming (Coming Soon)
- Dog Walking (Coming Soon)
- Vet Visits (Coming Soon)
- Pet Taxi (Coming Soon)
- Pet Training (Coming Soon)
- Secure user authentication and account management
- Responsive, accessible, and modern user interface
- SEO and PWA ready for optimal discoverability and usability

This project is private, protected, and intended for use only by authorized members of the SmartPaw team.

---

## Technology Stack

- **Frontend Framework:** React (with Vite for fast development)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Routing:** React Router
- **State Management:** React Context API, custom hooks
- **Authentication:** Supabase integration
- **UI Components:** Custom and modular, with accessibility in mind
- **Build Tools:** Vite, ESLint, Prettier
- **Deployment:** Vercel
- **Version Control:** Git & GitHub (private)

---

## Project Structure

```
smartpaw-1/
├── public/                  # Static assets (favicons, manifest, robots.txt, uploads)
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── lovable-uploads/
├── src/                     # Application source code
│   ├── components/          # Reusable UI components (layout, auth, booking, seller, ui)
│   ├── contexts/            # React context providers (e.g., ThemeContext)
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # Third-party integrations (e.g., Supabase)
│   ├── lib/                 # Utility libraries
│   ├── pages/               # Route-based pages (Home, Services, Profile, etc.)
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility/helper functions
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles and custom scrollbars
│   └── main.tsx             # App entry point
├── supabase/                # Supabase configuration and functions
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore rules
├── bun.lockb                # Bun package manager lockfile
├── components.json          # Component registry/config
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lockfile
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.app.json        # TypeScript config (app)
├── tsconfig.json            # TypeScript config (base)
├── tsconfig.node.json       # TypeScript config (Node)
├── vercel.json              # Vercel deployment config
├── vite.config.ts           # Vite configuration
└── README.md                # Project documentation
```

---

## Usage

This repository is private and strictly for internal use by the SmartPaw team. Unauthorized access, copying, distribution, or modification of this codebase is prohibited.

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or bun (package manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Deratheone/smartpaw-1.git
cd smartpaw-1
npm install
# or
yarn install
# or
bun install
```

### Running the Application

```bash
npm start
# or
yarn start
# or
bun run dev
```

The app will be available at http://localhost:3000 (or the port specified in your configuration).

---

## Deployment

SmartPaw is deployed using Vercel. For deployment, push to the main branch and Vercel will automatically build and deploy the latest version.

---

## License & Confidentiality

This project is proprietary and confidential. All rights reserved © 2024 SmartPaw.

Unauthorized copying, distribution, modification, or use of this code is strictly prohibited.

---

SmartPaw – Premium Pet Care, Powered by Technology.
