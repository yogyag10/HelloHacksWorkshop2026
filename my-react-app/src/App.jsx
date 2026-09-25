import { useState } from 'react'

const types = [
  { name: 'Fire', color: 'bg-orange-100 text-orange-800 ring-orange-200', icon: '🔥' },
  { name: 'Water', color: 'bg-sky-100 text-sky-800 ring-sky-200', icon: '💧' },
  { name: 'Grass', color: 'bg-green-100 text-green-800 ring-green-200', icon: '🌿' },
  { name: 'Ground', color: 'bg-amber-100 text-amber-900 ring-amber-200', icon: '⛰️' },
]

function App() {
  const [matchup, setMatchup] = useState(null)
  const [selectedType, setSelectedType] = useState('')

  async function getMatchup(type) {
    try {
      const response = await fetch(`http://localhost:5001/api/matchup/${encodeURIComponent(type.toLowerCase())}`)

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`)
      }

      return await response.json()
    } catch (error) {
      return { error: error.message || 'Could not load the matchup.' }
    }
  }

  async function handleTypeClick(type) {
    setSelectedType(type)
    const response = await getMatchup(type)
    setMatchup(response)
  }

  function formatTypes(typeNames) {
    if (!Array.isArray(typeNames) || typeNames.length === 0) return 'none'

    return typeNames
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(', ')
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-12 text-slate-900">
      <section className="w-full max-w-lg rounded-3xl border-4 border-slate-800 bg-white p-7 shadow-[0_10px_0_#1e293b] sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <div aria-hidden="true" className="relative size-11 overflow-hidden rounded-full border-[3px] border-slate-900 bg-white">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-red-500" />
            <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-slate-900" />
            <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-slate-900 bg-white" />
          </div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Battle assistant</p>
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Who's the opponent?</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Choose their type to get ready for battle.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {types.map(({ name, color, icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => handleTypeClick(name)}
              className={`flex min-h-14 items-center justify-center gap-2 rounded-xl font-bold ring-1 ring-inset transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 ${color}`}
            >
              <span aria-hidden="true">{icon}</span>
              {name}
            </button>
          ))}
        </div>

        {matchup && (
          <div className="mt-5 rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-700" aria-live="polite">
            {matchup.error ? (
              <p>{matchup.error}</p>
            ) : (
              <>
                <p>
                  Your {selectedType} moves deal half damage to:{' '}
                  {formatTypes(matchup.half_damage_to)}.
                </p>
                <p className="mt-2">
                  This Pokémon takes double damage from:{' '}
                  {formatTypes(matchup.double_damage_from)}.
                </p>
              </>
            )}
          </div>
        )}

        <p className="mt-8 border-t border-slate-100 pt-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          Choose wisely, trainer
        </p>
      </section>
    </main>
  )
}

export default App
