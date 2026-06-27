import { Highlighter } from "@/components/magicui/highlighter";
import { ToolBar } from "@/components/toolbar";

function App() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="text-4xl font-semibold tracking-tight">
          Welcome to your{" "}
          <Highlighter action="highlight" color="rgba(230,205,0,0.3)">
            Notes App
          </Highlighter>
        </h1>
        <p className="mt-6 text-lg text-neutral-600">
          Built with React, Vite, Tailwind, and{" "}
          <Highlighter action="underline" color="rgba(220,10,30,0.8)">
            Magic UI
          </Highlighter>
          . Start building from here.
        </p>

        <ToolBar />
      </div>
    </main>
  );
}

export default App;
