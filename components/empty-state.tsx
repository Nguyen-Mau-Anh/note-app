"use client"

import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createNote } from "@/lib/notes"
import { useRouter } from "next/navigation"

export function EmptyState() {
  const router = useRouter()

  const handleCreateNote = () => {
    const newNote = createNote()
    router.push(`/notes/${newNote.id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <FileText className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold">No note selected</h2>
      <p className="mt-2 text-muted-foreground">Select a note from the sidebar or create a new one to get started.</p>
      <Button className="mt-6" onClick={handleCreateNote}>
        <Plus className="mr-2 h-4 w-4" />
        Create a new note
      </Button>
    </div>
  )
}

