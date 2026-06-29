import GoogleSignInButton from "@/components/google/GoogleSignInButton"
import { Highlighter } from "@/components/magicui/highlighter";
import NotePreview from "@/components/NotePreview";


export default function Login() {
  return (
    <div className="flex flex-row h-screen select-none">
      <div className="w-8/15 p-12 pb-24 flex flex-col justify-between">
        <h3 className="text-3xl font-extrabold tracking-tight">Jotter</h3>
        <div className="flex flex-col gap-8">
          <h1 className="text-7xl font-semibold text-ink-900">Write it <Highlighter action="highlight" color="rgba(230,205,0,0.3)"> down.</Highlighter>
            <br /> Make it <Highlighter action="underline" color="rgba(230,0,0,1)"> yours.</Highlighter>
          </h1>
          <p className="w-120 text-ink-400 tracking-wide">Organise your notes as notes. Jotter lets you shuffle through your thoughts in a way that's as tactile as the real thing. Your ideas, laid out on paper, always how you left them.</p>
          <GoogleSignInButton/>
        </div>
      </div>
      <div className="bg-paper-400 w-7/15 relative">
        <div className="absolute w-fit left-75 top-35 rotate-6">
          <NotePreview title="Reading List" words={500}/>
        </div>
        <div className="absolute w-fit left-35 top-55 -rotate-4">
          <NotePreview title="Meeting Notes" words={120} />
        </div>
      </div>
    </div>
  )
}
