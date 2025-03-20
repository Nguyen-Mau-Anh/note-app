# Note App

A modern note-taking application built with React, TypeScript, and SCSS. This application allows users to create, edit, delete, and organize their notes with a clean and intuitive interface.

## Features

- 📝 Create and edit notes with rich text support
- 🔍 Search through notes
- 🗑️ Trash system for deleted notes
- 🌓 Dark theme support
- 📱 Responsive design for mobile and desktop
- 🔄 Auto-save functionality
- ⌨️ Keyboard shortcuts

## Tech Stack

- React 18
- TypeScript
- SCSS for styling
- Jest for testing
- React Testing Library for component testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/note-app.git
cd note-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Testing

The application includes a comprehensive test suite using Jest and React Testing Library. The tests cover:

- Component rendering
- User interactions
- State management
- Edge cases

### Running Tests

To run the test suite:

```bash
npm test
# or
yarn test
```

To run tests in watch mode (recommended during development):

```bash
npm test -- --watch
# or
yarn test --watch
```

### Test Coverage

To generate a test coverage report:

```bash
npm test -- --coverage
# or
yarn test --coverage
```

### Test Structure

The test suite is organized by component:

- `App.test.tsx`: Tests for the main application component
- `NoteContent.test.tsx`: Tests for the note editor component
- `Sidebar.test.tsx`: Tests for the sidebar component
- `Toast.test.tsx`: Tests for the notification component

Each test file includes:
- Component rendering tests
- User interaction tests
- State management tests
- Edge case handling

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 