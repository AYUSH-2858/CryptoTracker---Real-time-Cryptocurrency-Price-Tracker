# CryptoTracker - Real-time Cryptocurrency Price Tracker

A modern, responsive React application that tracks cryptocurrency prices in real-time, featuring live price updates, sorting capabilities, and a dark/light theme toggle.

![CryptoTracker Screenshot](https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🔄 Real-time price updates
- 📊 Sortable data columns
- 🌓 Dark/Light theme toggle
- ⭐ Favorite cryptocurrency marking
- 📱 Fully responsive design
- 📈 7-day price charts
- 💰 Market cap and volume tracking
- 🔍 Detailed supply information

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Architecture

The application follows a modern React architecture with the following structure:

```
src/
├── app/              # Redux store configuration
├── components/       # Reusable UI components
├── data/            # Static data and mock services
├── features/        # Feature-specific components and logic
│   ├── crypto/      # Cryptocurrency-related features
│   └── theme/       # Theme management
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the provided local URL

## Build for Production

```bash
npm run build
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
