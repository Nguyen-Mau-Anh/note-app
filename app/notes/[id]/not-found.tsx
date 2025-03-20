import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileX } from "lucide-react"

export default function NoteNotFound() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold">Note not found</h2>
        <p className="mt-2 text-muted-foreground">The note you're looking for doesn't exist or has been deleted.</p>
        <Button className="mt-6" asChild>
          <Link href="/notes">Go back to notes</Link>
        </Button>
      </div>
    </div>
  )
}

