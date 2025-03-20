// This is a mock implementation. In a real app, you would use a database.

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface NoteVersion {
  id: string
  noteId: string
  content: string
  timestamp: string
  changeDescription?: string
}

// Mock data
const notes: Note[] = [
  {
    id: "1",
    title: "Welcome to Note App",
    content: "This is your first note. Start writing!",
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
  },
  {
    id: "2",
    title: "Meeting Notes",
    content: "Discuss project timeline\nAssign tasks\nSet next meeting",
    createdAt: "2023-01-02T10:00:00Z",
    updatedAt: "2023-01-03T15:30:00Z",
  },
  {
    id: "3",
    title: "Shopping List",
    content: "- Milk\n- Eggs\n- Bread\n- Apples",
    createdAt: "2023-01-05T09:15:00Z",
    updatedAt: "2023-01-05T09:15:00Z",
  },
]

const noteHistory: Record<string, NoteVersion[]> = {
  "2": [
    {
      id: "v3",
      noteId: "2",
      content: "Discuss project timeline\nAssign tasks\nSet next meeting",
      timestamp: "2023-01-03T15:30:00Z",
      changeDescription: "Added next meeting note",
    },
    {
      id: "v2",
      noteId: "2",
      content: "Discuss project timeline\nAssign tasks",
      timestamp: "2023-01-02T14:20:00Z",
      changeDescription: "Added task assignments",
    },
    {
      id: "v1",
      noteId: "2",
      content: "Discuss project timeline",
      timestamp: "2023-01-02T10:00:00Z",
      changeDescription: "Created note",
    },
  ],
}

// API functions
export function getAllNotes(): Note[] {
  return [...notes]
}

export function getNoteById(id: string): Note | undefined {
  return notes.find((note) => note.id === id)
}

export function createNote(): Note {
  const newNote: Note = {
    id: Date.now().toString(),
    title: "Untitled Note",
    content: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  notes.push(newNote)
  return newNote
}

export function updateNote(id: string, data: Partial<Note>): Promise<Note> {
  return new Promise((resolve, reject) => {
    const index = notes.findIndex((note) => note.id === id)

    if (index === -1) {
      reject(new Error("Note not found"))
      return
    }

    // Create a history entry before updating
    const oldNote = notes[index]
    const versionId = `v${Date.now()}`

    if (!noteHistory[id]) {
      noteHistory[id] = []
    }

    noteHistory[id].unshift({
      id: versionId,
      noteId: id,
      content: oldNote.content,
      timestamp: oldNote.updatedAt,
      changeDescription: "Updated note",
    })

    // Update the note
    const updatedNote = {
      ...notes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    notes[index] = updatedNote

    // Simulate network delay
    setTimeout(() => {
      resolve(updatedNote)
    }, 500)
  })
}

export function getNoteHistory(noteId: string): Promise<NoteVersion[]> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(noteHistory[noteId] || [])
    }, 500)
  })
}

export function restoreNoteVersion(noteId: string, versionId: string): Promise<Note> {
  return new Promise((resolve, reject) => {
    if (!noteHistory[noteId]) {
      reject(new Error("Note history not found"))
      return
    }

    const version = noteHistory[noteId].find((v) => v.id === versionId)

    if (!version) {
      reject(new Error("Version not found"))
      return
    }

    // Update the note with the content from this version
    return updateNote(noteId, { content: version.content }).then(resolve).catch(reject)
  })
}

