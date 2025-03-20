import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the notes page
  redirect("/notes")
}

