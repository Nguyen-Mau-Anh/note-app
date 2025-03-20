import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteContent from './NoteContent';

describe('NoteContent Component', () => {
  const mockNote = {
    id: '1',
    title: 'Test Note',
    content: 'Test content',
    date: '2024-03-20',
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
    isDeleted: false
  };

  const mockProps = {
    selectedNote: mockNote,
    onTitleChange: jest.fn(),
    onContentChange: jest.fn(),
    onSave: jest.fn(),
    selected: true,
    isSidebarOpen: true,
    isTrashOpen: false,
    onCreateNote: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note content when a note is selected', () => {
    render(<NoteContent {...mockProps} />);
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test content')).toBeInTheDocument();
  });

  it('shows empty state when no note is selected', () => {
    render(<NoteContent {...mockProps} selectedNote={null} selected={false} />);
    expect(screen.getByText('Welcome to Note App')).toBeInTheDocument();
    expect(screen.getByText('Create a new note')).toBeInTheDocument();
  });

  it('handles title changes', async () => {
    render(<NoteContent {...mockProps} />);
    const titleInput = screen.getByDisplayValue('Test Note');
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    expect(mockProps.onTitleChange).toHaveBeenCalledWith('Updated Title');
  });

  it('handles content changes', async () => {
    render(<NoteContent {...mockProps} />);
    const contentInput = screen.getByDisplayValue('Test content');
    fireEvent.change(contentInput, { target: { value: 'Updated content' } });
    expect(mockProps.onContentChange).toHaveBeenCalledWith('Updated content');
  });

  it('disables editing in trash view', () => {
    render(<NoteContent {...mockProps} isTrashOpen={true} />);
    const titleInput = screen.getByDisplayValue('Test Note');
    const contentInput = screen.getByDisplayValue('Test content');
    expect(titleInput).toHaveAttribute('readOnly');
    expect(contentInput).toHaveAttribute('readOnly');
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  it('shows save button when not in trash view', () => {
    render(<NoteContent {...mockProps} />);
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    expect(mockProps.onSave).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      title: 'Test Note',
      content: 'Test content'
    }));
  });
}); 