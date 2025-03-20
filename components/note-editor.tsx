"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { updateNote } from "@/lib/notes"
import { Save } from "lucide-react"

interface Note {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export function NoteEditor({ note }: { note: Note }) {
  const [content, setContent] = useState(note.content)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateNote(note.id, { content })
      // In a real app, you might want to show a toast notification
    } catch (error) {
      console.error("Failed to save note:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-full min-h-[calc(100vh-200px)] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Write your note here..."
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  )
}

