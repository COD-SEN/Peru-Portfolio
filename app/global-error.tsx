"use client"

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 font-sans text-white">
        <main className="flex min-h-screen items-center justify-center px-6 py-12 text-center">
          <section className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-300">Portfolio recovery</p>
            <h1 className="mt-4 text-3xl font-bold text-balance">The portfolio needs a quick restart.</h1>
            <p className="mt-4 leading-6 text-slate-300">A workspace failed to load, but your saved content is safe. Restart the view to continue.</p>
            <button type="button" onClick={() => reset()} className="mt-8 rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">Restart portfolio</button>
          </section>
        </main>
      </body>
    </html>
  )
}
