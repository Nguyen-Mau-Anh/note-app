# Note App

A modern note-taking application built with React, TypeScript, and SCSS. This application provides a clean and intuitive interface for creating, organizing, and managing your notes with a beautiful dark theme UI.

## Features

- 📝 Create and edit notes
- 🎨 Dark theme UI
- 📱 Responsive design
- 🔍 Search functionality
- 📁 Note organization
- 💾 Local storage persistence

## Project Structure

```
note-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── styles/        # SCSS styles and theme variables
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── README.md          # Project documentation
```

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/note-app.git
```

2. Navigate to the project directory:
```bash
cd note-app
```

3. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` to view the application.

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be generated in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## Technologies Used

- React 18
- TypeScript
- SCSS
- Vite
- Material Symbols Icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 