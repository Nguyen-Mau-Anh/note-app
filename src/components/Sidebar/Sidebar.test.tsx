import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  const mockNotes = [
    {
      id: '1',
      title: 'Test Note 1',
      date: '2024-03-20',
      isDeleted: false
    },
    {
      id: '2',
      title: 'Test Note 2',
      date: '2024-03-21',
      isDeleted: false
    }
  ];

  const mockProps = {
    notes: mockNotes,
    selectedNote: null,
    onNoteSelect: jest.fn(),
    onNewNote: jest.fn(),
    onDeleteNote: jest.fn(),
    onRestoreNote: jest.fn(),
    onPermanentDelete: jest.fn(),
    isTrashOpen: false,
    onToggleTrash: jest.fn(),
    trashCount: 0,
    onHome: jest.fn(),
    searchQuery: '',
    onSearch: jest.fn(),
    isOpen: false,
    onToggle: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sidebar with notes', () => {
    render(<Sidebar {...mockProps} />);
    expect(screen.getByText('Test Note 1')).toBeInTheDocument();
    expect(screen.getByText('Test Note 2')).toBeInTheDocument();
  });

  it('handles note selection', () => {
    render(<Sidebar {...mockProps} />);
    const noteItem = screen.getByText('Test Note 1');
    fireEvent.click(noteItem);
    expect(mockProps.onNoteSelect).toHaveBeenCalledWith('1');
  });

  it('shows create note button when not in trash', () => {
    render(<Sidebar {...mockProps} />);
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    expect(mockProps.onNewNote).toHaveBeenCalled();
  });

  it('handles search input', () => {
    render(<Sidebar {...mockProps} />);
    const searchInput = screen.getByPlaceholderText('Search notes...');
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    expect(mockProps.onSearch).toHaveBeenCalledWith('Test');
  });

  it('shows trash count when there are trashed notes', () => {
    render(<Sidebar {...mockProps} trashCount={2} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('toggles sidebar on mobile', () => {
    render(<Sidebar {...mockProps} />);
    const toggleButton = screen.getByText('menu');
    fireEvent.click(toggleButton);
    expect(mockProps.onToggle).toHaveBeenCalled();
  });

  it('shows trash view when trash is open', () => {
    render(
      <Sidebar
        notes={[]}
        selectedNote={null}
        onNoteSelect={mockProps.onNoteSelect}
        onNewNote={mockProps.onNewNote}
        onDeleteNote={mockProps.onDeleteNote}
        onRestoreNote={mockProps.onRestoreNote}
        onPermanentDelete={mockProps.onPermanentDelete}
        isTrashOpen={true}
        onToggleTrash={mockProps.onToggleTrash}
        trashCount={0}
        onHome={mockProps.onHome}
        searchQuery=""
        onSearch={mockProps.onSearch}
        isOpen={true}
        onToggle={mockProps.onToggle}
      />
    );
    
    const trashButton = screen.getByRole('button', { name: /trash/i });
    expect(trashButton).toHaveClass('active');
  });

  it('handles home button click', () => {
    render(<Sidebar {...mockProps} />);
    const homeButton = screen.getByText('Home');
    fireEvent.click(homeButton);
    expect(mockProps.onHome).toHaveBeenCalled();
  });
}); 