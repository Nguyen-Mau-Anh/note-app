import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    // Clear any mocks and reset window.confirm
    jest.clearAllMocks();
    const mockConfirm = jest.fn(() => true);
    window.confirm = mockConfirm;
  });

  it('renders the app with initial state', () => {
    render(<App />);
    // Check for the welcome note in the sidebar
    expect(screen.getByRole('button', { name: /welcome to note app/i })).toBeInTheDocument();
    
    // Check for the create note button in the notes header
    expect(screen.getByTestId('create-note-button')).toBeInTheDocument();
    
    // Check for the search input
    expect(screen.getByPlaceholderText('Search notes...')).toBeInTheDocument();
  });

  it('creates a new note when clicking the create button', () => {
    render(<App />);
    const createButton = screen.getByText('Create a new note');
    userEvent.click(createButton);
    expect(screen.getByPlaceholderText('Untitled')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Start writing your note...')).toBeInTheDocument();
  });

  it('handles note editing', () => {
    render(<App />);
    // Create a new note
    const createButton = screen.getByText('Create a new note');
    userEvent.click(createButton);
    
    // Edit the title
    const titleInput = screen.getByPlaceholderText('Untitled');
    userEvent.clear(titleInput);
    userEvent.type(titleInput, 'Test Note');
    expect(titleInput).toHaveValue('Test Note');
    
    // Edit the content
    const contentInput = screen.getByPlaceholderText('Start writing your note...');
    userEvent.type(contentInput, 'Test Content');
    expect(contentInput).toHaveValue('Test Content');

    // Save the note
    const saveButton = screen.getByText('Save');
    userEvent.click(saveButton);
    expect(screen.getByText('Note saved successfully!')).toBeInTheDocument();
  });

  it('handles note deletion and trash functionality', () => {
    const noteTitle = 'Note to Delete';
    render(<App />);
    // Create and save a note
    const createButton = screen.getByText('Create a new note');
    userEvent.click(createButton);
    
    const titleInput = screen.getByPlaceholderText('Untitled');
    userEvent.clear(titleInput);
    userEvent.type(titleInput, noteTitle);
    
    const saveButton = screen.getByText('Save');
    userEvent.click(saveButton);
    
    // Delete the note using aria-label
    const deleteButton = screen.getByLabelText(`Delete ${noteTitle}`);
    userEvent.click(deleteButton);
    
    // Open trash
    const trashButton = screen.getByText('Trash');
    userEvent.click(trashButton);
    
    // Verify note is in trash
    expect(screen.getByText(noteTitle)).toBeInTheDocument();
  });

  it('handles note restoration from trash', () => {
    const noteTitle = 'Note to Restore';
    render(<App />);
    // Create and delete a note
    const createButton = screen.getByText('Create a new note');
    userEvent.click(createButton);
    
    const titleInput = screen.getByPlaceholderText('Untitled');
    userEvent.clear(titleInput);
    userEvent.type(titleInput, noteTitle);
    
    const saveButton = screen.getByText('Save');
    userEvent.click(saveButton);
    
    // Delete the note using aria-label
    const deleteButton = screen.getByLabelText(`Delete ${noteTitle}`);
    userEvent.click(deleteButton);
    
    // Open trash
    const trashButton = screen.getByText('Trash');
    userEvent.click(trashButton);
    
    // Restore the note using aria-label
    const restoreButton = screen.getByLabelText(`Restore ${noteTitle}`);
    userEvent.click(restoreButton);
    
    // Go back to notes
    const homeButton = screen.getByText('Home');
    userEvent.click(homeButton);
    
    // Verify note is restored
    expect(screen.getByText(noteTitle)).toBeInTheDocument();
  });

  it('handles search functionality', () => {
    const noteTitle = 'Searchable Note';
    render(<App />);
    // Create a searchable note
    const createButton = screen.getByText('Create a new note');
    userEvent.click(createButton);
    
    const titleInput = screen.getByPlaceholderText('Untitled');
    userEvent.clear(titleInput);
    userEvent.type(titleInput, noteTitle);
    
    // Save the note first
    const saveButton = screen.getByText('Save');
    userEvent.click(saveButton);
    
    // Perform search
    const searchInput = screen.getByPlaceholderText('Search notes...');
    userEvent.type(searchInput, 'Search');
    
    // Verify search results
    expect(screen.getByText(noteTitle)).toBeInTheDocument();
  });

  it('handles unsaved changes warning', () => {
    const noteTitle = 'Unsaved Note';
    render(<App />);
    // Create a note
    const createButton = screen.getByText('Create a new note');
    userEvent.click(createButton);
    
    // Make changes
    const titleInput = screen.getByPlaceholderText('Untitled');
    userEvent.type(titleInput, noteTitle);
    
    // Try to go home
    const homeButton = screen.getByText('Home');
    userEvent.click(homeButton);
    
    // Verify confirm was called
    expect(window.confirm).toHaveBeenCalledWith(
      'You have unsaved changes. Do you want to switch notes without saving?'
    );
  });
}); 