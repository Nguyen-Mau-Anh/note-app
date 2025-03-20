import { NoteEditor } from "@/components/note-editor"
import { NoteHistory } from "@/components/note-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getNoteById } from "@/lib/notes"
import { notFound } from "next/navigation"

export default function NotePage({ params }: { params: { id: string } }) {
  const note = getNoteById(params.id)

  if (!note) {
    notFound()
  }

  return (
    <div className="h-full p-6">
      <Tabs defaultValue="editor" className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold truncate">{note.title}</h1>
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="editor" className="flex-1 mt-0">
          <NoteEditor note={note} />
        </TabsContent>

        <TabsContent value="history" className="flex-1 mt-0">
          <NoteHistory noteId={note.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

