
interface Props {
  pitanje: string
  setPitanje: (v: string) => void
  onSubmit: () => void
  loading: boolean
}

export default function ChatForm({ pitanje, setPitanje, onSubmit, loading }: Props) {
  return (
    <div className="flex gap-2 mt-6 w-full max-w-xl">
      <input
        type="text"
        value={pitanje}
        onChange={(e) => setPitanje(e.target.value)}
        className="flex-1 px-4 py-2 rounded-l-xl border border-green-400 text-black"
        placeholder="Postavite pitanje..."
      />
      <button
        onClick={onSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-xl"
        disabled={loading}
      >
        {loading ? '...čeka se' : 'Pitaj'}
      </button>
    </div>
  )
}
