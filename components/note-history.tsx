"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getNoteHistory, restoreNoteVersion } from "@/lib/notes"
import { Clock, RotateCcw } from "lucide-react"

interface NoteVersion {
  id: string
  noteId: string
  content: string
  timestamp: Date
  changeDescription?: string
}

export function NoteHistory({ noteId }: { noteId: string }) {
  const [history, setHistory] = useState<NoteVersion[]>([])
  const [selectedVersion, setSelectedVersion] = useState<NoteVersion | null>(null)

  useEffect(() => {
    const fetchHistory = async () => {
      const noteHistory = await getNoteHistory(noteId)
      setHistory(noteHistory)
      if (noteHistory.length > 0) {
        setSelectedVersion(noteHistory[0])
      }
    }

    fetchHistory()
  }, [noteId])

  const handleRestore = async (versionId: string) => {
    try {
      await restoreNoteVersion(noteId, versionId)
      // In a real app, you might want to show a toast notification
      // and refresh the history
    } catch (error) {
      console.error("Failed to restore version:", error)
    }
  }

  if (history.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No history yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">Changes to this note will appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex gap-6">
      <div className="w-1/3 border rounded-md">
        <div className="p-4 border-b">
          <h3 className="font-medium">Version History</h3>
        </div>
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="p-2">
            {history.map((version) => (
              <Button
                key={version.id}
                variant={selectedVersion?.id === version.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left mb-1"
                onClick={() => setSelectedVersion(version)}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm">{new Date(version.timestamp).toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">{version.changeDescription || "Updated note"}</span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 border rounded-md flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-medium">{selectedVersion && new Date(selectedVersion.timestamp).toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">{selectedVersion?.changeDescription || "Updated note"}</p>
          </div>
          {selectedVersion && (
            <Button variant="outline" size="sm" onClick={() => handleRestore(selectedVersion.id)}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Restore this version
            </Button>
          )}
        </div>
        <ScrollArea className="flex-1 p-4">
          {selectedVersion ? (
            <pre className="whitespace-pre-wrap font-sans">{selectedVersion.content}</pre>
          ) : (
            <p className="text-muted-foreground">Select a version to view</p>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

