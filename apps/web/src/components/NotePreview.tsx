interface Props {
  title: string
  words: number
}

const highlightColors = ['bg-highlight-yellow', 'bg-highlight-pink', 'bg-highlight-green', 'bg-highlight-blue', 'bg-highlight-orange']

function generateLines(words: number) {
  const lines = []
  let remaining = words

  while (remaining > 0 && lines.length < 30) {
    const lineWords = Math.min(remaining, Math.floor(Math.random() * 6) + 4)
    const width = Math.round((lineWords / 10) * 60) + 40
    const highlight = Math.random() < 0.2 ? highlightColors[Math.floor(Math.random() * highlightColors.length)] : null
    lines.push({ width, highlight })
    remaining -= lineWords
  }

  return lines
}

export default function NotePreview({ title, words }: Props) {
  const lines = generateLines(words)

  return (
    <div className="w-100 aspect-5/7 bg-paper-100 rounded-md shadow-2xl p-8 flex flex-col gap-6">
      <h1 className="text-xl font-medium tracking-wide text-ink-900">{title}</h1>
      <div className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${line.highlight ?? 'bg-ink-200'}`}
            style={{ width: `${line.width}%` }}
          />
        ))}
      </div>
    </div>
  )
}
