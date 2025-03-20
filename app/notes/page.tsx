import { EmptyState } from "@/components/empty-state"
import { getAllNotes } from "@/lib/notes"

export default function NotesPage() {
  const notes = getAllNotes()

  return (
    <div className="flex h-full items-center justify-center p-4">
      <EmptyState />
    </div>
  )
}

