import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NoteContent from './components/NoteContent/NoteContent';
import Toast from './components/Toast/Toast';
import './App.scss';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to Note App',
      content: 'Start writing your notes here...',
      date: '1/1/2023',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      isDeleted: false
    },
    {
      id: '2',
      title: 'Meeting Notes',
      content: 'Meeting agenda and action items...',
      date: '1/3/2023',
      createdAt: '2023-01-03T00:00:00.000Z',
      updatedAt: '2023-01-03T00:00:00.000Z',
      isDeleted: false
    },
    {
      id: '3',
      title: 'Shopping List',
      content: 'Items to buy...',
      date: '1/5/2023',
      createdAt: '2023-01-05T00:00:00.000Z',
      updatedAt: '2023-01-05T00:00:00.000Z',
      isDeleted: false
    }
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState<string | undefined>();
  const [draftNote, setDraftNote] = useState<Note | undefined>();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update draft when selecting a new note
  useEffect(() => {
    const currentNote = isTrashOpen 
      ? trashedNotes.find(note => note.id === selectedNoteId)
      : notes.find(note => note.id === selectedNoteId);
    setDraftNote(currentNote);
  }, [selectedNoteId, notes, trashedNotes, isTrashOpen]);

  const handleNoteSelect = (id: string) => {
    if (unsavedChanges) {
      const confirmSwitch = window.confirm('You have unsaved changes. Do you want to switch notes without saving?');
      if (!confirmSwitch) {
        return;
      }
    }
    setSelectedNoteId(id);
    setUnsavedChanges(false);
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled',
      content: '',
      date: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false
    };
    setNotes(prev => [...prev, newNote]);
    setSelectedNoteId(newNote.id);
    setDraftNote(newNote);
    setUnsavedChanges(false);
  };

  const handleNoteChange = (updatedNote: { title: string; content: string }) => {
    if (!draftNote) return;
    
    const updatedDraftNote = {
      ...draftNote,
      ...updatedNote
    };
    setDraftNote(updatedDraftNote);
    setUnsavedChanges(true);
  };

  const handleSaveNote = (note: Note) => {
    setNotes(prev => prev.map(n => {
      if (n.id === note.id) {
        return {
          ...n,
          title: note.title,
          content: note.content,
          updatedAt: new Date().toISOString()
        };
      }
      return n;
    }));
    setSelectedNoteId(note.id);
    setDraftNote(note);
    setShowToast(true);
  };

  const handleDeleteNote = (id: string) => {
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete) {
      // Remove from active notes
      setNotes(notes.filter(note => note.id !== id));
      // Add to trashed notes
      setTrashedNotes([...trashedNotes, noteToDelete]);
      if (selectedNoteId === id) {
        setSelectedNoteId(undefined);
      }
      setUnsavedChanges(false);
    }
  };

  const handleRestoreNote = (id: string) => {
    const noteToRestore = trashedNotes.find(note => note.id === id);
    if (noteToRestore) {
      // Remove from trashed notes
      setTrashedNotes(trashedNotes.filter(note => note.id !== id));
      // Add back to active notes
      setNotes([...notes, noteToRestore]);
      if (selectedNoteId === id) {
        setSelectedNoteId(undefined);
      }
      setUnsavedChanges(false);
    }
  };

  const handlePermanentDelete = (id: string) => {
    // Remove from trashed notes permanently
    setTrashedNotes(trashedNotes.filter(note => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(undefined);
    }
    setUnsavedChanges(false);
  };

  const toggleTrash = () => {
    setIsTrashOpen(!isTrashOpen);
  };

  const handleTitleChange = (title: string) => {
    handleNoteChange({
      title,
      content: draftNote?.content || ''
    });
  };

  const handleContentChange = (content: string) => {
    handleNoteChange({
      title: draftNote?.title || '',
      content
    });
  };

  const handleHome = () => {
    if (unsavedChanges) {
      const confirmSwitch = window.confirm('You have unsaved changes. Do you want to switch notes without saving?');
      if (!confirmSwitch) {
        return;
      }
    }
    setSelectedNoteId(undefined);
    setDraftNote(undefined);
    setUnsavedChanges(false);
    setIsTrashOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredNotes = notes.filter(note => {
    const searchLower = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.content.toLowerCase().includes(searchLower)
    );
  });

  const filteredTrashedNotes = trashedNotes.filter(note => {
    const searchLower = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.content.toLowerCase().includes(searchLower)
    );
  });

  const selectedNote = isTrashOpen 
    ? filteredTrashedNotes.find(note => note.id === selectedNoteId) || null
    : filteredNotes.find(note => note.id === selectedNoteId) || null;

  const toastMessage = 'Note saved successfully!';

  return (
    <div className="app">
      <Sidebar
        notes={isTrashOpen ? filteredTrashedNotes : filteredNotes}
        selectedNote={selectedNote}
        onNoteSelect={handleNoteSelect}
        onNewNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        onRestoreNote={handleRestoreNote}
        onPermanentDelete={handlePermanentDelete}
        isTrashOpen={isTrashOpen}
        onToggleTrash={toggleTrash}
        trashCount={trashedNotes.length}
        onHome={handleHome}
        searchQuery={searchQuery}
        onSearch={handleSearch}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <NoteContent
        selectedNote={selectedNote}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
        onSave={handleSaveNote}
        selected={!!selectedNoteId}
        isSidebarOpen={isSidebarOpen}
        isTrashOpen={isTrashOpen}
        onCreateNote={handleCreateNote}
      />
      <Toast 
        message={toastMessage} 
        show={showToast} 
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default App; 