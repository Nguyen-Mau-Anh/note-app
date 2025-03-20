"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, FileText, Home, MoreVertical, Plus, Search, Settings, Trash } from "lucide-react"
import { getAllNotes, createNote } from "@/lib/notes"
import type { Note } from "@/types"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Fetch notes on component mount and when pathname changes
    setNotes(getAllNotes())
  }, [pathname])

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateNote = () => {
    const newNote = createNote()
    router.push(`/notes/${newNote.id}`)
  }

  return (
    <div className="w-64 border-r bg-background h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Book className="h-5 w-5" />
          <h1 className="font-semibold">Note App</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-sm font-medium">Notes</h2>
        <Button variant="ghost" size="icon" onClick={handleCreateNote}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Create note</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2 py-1">
          {filteredNotes.length > 0 ? (
            <div className="space-y-1">
              {filteredNotes.map((note) => (
                <NoteItem key={note.id} note={note} isActive={pathname === `/notes/${note.id}`} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              {searchQuery ? "No notes found" : "No notes yet"}
            </p>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <nav className="space-y-1">
          <Link href="/notes" passHref>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <span>
                <Home className="mr-2 h-4 w-4" />
                Home
              </span>
            </Button>
          </Link>
          <Link href="/notes/trash" passHref>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <span>
                <Trash className="mr-2 h-4 w-4" />
                Trash
              </span>
            </Button>
          </Link>
          <Link href="/notes/settings" passHref>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <span>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </span>
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  )
}

function NoteItem({ note, isActive }: { note: Note; isActive: boolean }) {
  const router = useRouter()

  return (
    <div className="flex group">
      <Link
        href={`/notes/${note.id}`}
        className={cn(
          "flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm",
          isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50 hover:text-accent-foreground",
        )}
      >
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="truncate flex-1">{note.title}</span>
        <span className="text-xs text-muted-foreground">{new Date(note.updatedAt).toLocaleDateString()}</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

