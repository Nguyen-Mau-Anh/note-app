import React, { useState } from 'react';
import './Sidebar.scss';

interface Note {
  id: string;
  title: string;
  date: string;
  isDeleted?: boolean;
}

interface SidebarProps {
  notes: Note[];
  selectedNote: Note | null;
  onNoteSelect: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
  onRestoreNote: (id: string) => void;
  onPermanentDelete: (id: string) => void;
  isTrashOpen: boolean;
  onToggleTrash: () => void;
  trashCount: number;
  onHome: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  selectedNote,
  onNoteSelect,
  onNewNote,
  onDeleteNote,
  onRestoreNote,
  onPermanentDelete,
  isTrashOpen,
  onToggleTrash,
  trashCount,
  onHome,
  searchQuery,
  onSearch,
  isOpen,
  onToggle
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const filteredNotes = notes.filter(note => {
    const searchLower = searchQuery.toLowerCase();
    return note.title.toLowerCase().includes(searchLower);
  });

  return (
    <>
      <button className={`sidebar-toggle ${isOpen ? 'hidden' : ''}`} onClick={onToggle}>
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="app-title">
            <span className="material-symbols-outlined">note</span>
            Note App
          </div>
          <div className="search-bar">
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        <div className="notes-section" role="region" aria-label="Notes">
          <div className="notes-header">
            <h2>{isTrashOpen ? 'Trash' : 'Notes'}</h2>
            {!isTrashOpen && (
              <button onClick={onNewNote} data-testid="create-note-button">
                <span className="material-symbols-outlined">add</span>
              </button>
            )}
          </div>

          <div className="notes-list">
            {notes.length === 0 ? (
              <div className="no-results">
                {searchQuery ? 'No notes found' : 'No notes yet'}
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
                  onClick={() => {
                    onNoteSelect(note.id);
                    onToggle(); // Close sidebar on mobile after selecting a note
                  }}
                >
                  <div className="note-content">
                    <span className="material-symbols-outlined">note</span>
                    <div className="note-info">
                      <div className="note-title">{note.title}</div>
                      <div className="note-date">{note.date}</div>
                    </div>
                  </div>
                  <div className="note-actions">
                    {isTrashOpen ? (
                      <>
                        <button
                          className="action-button restore"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRestoreNote(note.id);
                          }}
                          title="Restore note"
                          aria-label={`Restore ${note.title}`}
                        >
                          <span className="material-symbols-outlined">restore</span>
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPermanentDelete(note.id);
                          }}
                          title="Delete permanently"
                          aria-label={`Permanently delete ${note.title}`}
                        >
                          <span className="material-symbols-outlined">delete_forever</span>
                        </button>
                      </>
                    ) : (
                      <button
                        className="action-button delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteNote(note.id);
                        }}
                        title="Move to trash"
                        aria-label={`Delete ${note.title}`}
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="nav-button" onClick={onHome}>
            <span className="material-symbols-outlined">home</span>
            Home
          </button>
          <button 
            className={`nav-button ${isTrashOpen ? 'active' : ''}`} 
            onClick={onToggleTrash}
          >
            <span className="material-symbols-outlined">delete</span>
            Trash
            {trashCount > 0 && <span className="trash-count">{trashCount}</span>}
          </button>
        </div>
      </div>
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
    </>
  );
};

export default Sidebar; 