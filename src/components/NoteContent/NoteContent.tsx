import React, { useEffect, useRef } from 'react';
import './NoteContent.scss';
import { Note } from '../../types/Note';

interface NoteContentProps {
  selectedNote: Note | null;
  onSave: (note: Note) => void;
  isSidebarOpen: boolean;
  isTrashOpen: boolean;
  onCreateNote: () => void;
}

const NoteContent: React.FC<NoteContentProps> = ({
  selectedNote,
  onSave,
  isSidebarOpen,
  isTrashOpen,
  onCreateNote
}) => {
  const [draftNote, setDraftNote] = React.useState<Note | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (selectedNote) {
      setDraftNote(selectedNote);
    }
  }, [selectedNote]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [draftNote?.content]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTrashOpen || !draftNote) return;
    setDraftNote(prev => prev ? { ...prev, title: e.target.value } : null);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isTrashOpen || !draftNote) return;
    setDraftNote(prev => prev ? { ...prev, content: e.target.value } : null);
  };

  const handleSave = () => {
    if (draftNote) {
      onSave(draftNote);
    }
  };

  if (!selectedNote) {
    return (
      <div className={`note-content empty ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
        <div className="empty-state">
          <span className="material-symbols-outlined empty-icon">note_alt</span>
          <h2>Welcome to Note App</h2>
          <p>Select a note from the sidebar{!isTrashOpen ? ' or create a new one' : ''} to get started.</p>
          {!isTrashOpen && (
            <button className="create-button" onClick={onCreateNote}>
              <span className="material-symbols-outlined">add</span>
              Create a new note
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`note-content ${!isSidebarOpen ? 'sidebar-closed' : ''} ${isTrashOpen ? 'trash-view' : ''}`}>
      <div className="note-header">
        <input
          type="text"
          className="note-title-input"
          value={draftNote?.title || ''}
          onChange={handleTitleChange}
          placeholder="Untitled"
          readOnly={isTrashOpen}
        />
      </div>
      <div className="note-editor">
        <textarea
          ref={textareaRef}
          value={draftNote?.content || ''}
          onChange={handleContentChange}
          placeholder="Start writing your note..."
          readOnly={isTrashOpen}
        />
      </div>
      {!isTrashOpen && (
        <div className="note-footer">
          <button className="save-button" onClick={handleSave}>
            <span className="material-symbols-outlined">save</span>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteContent; 