'use client'

/**
 * SystemVisual — interactive digital twin diagram for the "Our Mission" section.
 *
 * Motion language: synchronization, prediction, feedback between physical system
 * and its digital twin. Every interaction reinforces that conceptual relationship.
 *
 * Architecture:
 *  - SVG  : structural layers (grid dots, rings, edges, nodes, labels)
 *  - Canvas: traveling data particles (overlaid, never triggers React re-renders)
 *  - RAF loop: smooth parallax via direct DOM setAttribute (no setState per frame)
 *  - React state: only for hover (node id + tooltip) — infrequent, fine to re-render
 */

import { useRef, useEffect, useState, useCallback } from 'react'

export type PillarKey = 'twins' | 'efficient' | 'predictive' | null

// ─── Geometry ───────────────────────────────────────────────────────────────
// Pentagon (r=140) + center, in a 400×400 SVG viewBox
const OUTER = [
  { id: 0, x: 200, y:  58, tip: ['BIOMECH_SIG',  'alignment: 98.2%'  ] },
  { id: 1, x: 333, y: 157, tip: ['ROBO_MOTION',  'estimate: ±0.3 mm' ] },
  { id: 2, x: 284, y: 313, tip: ['SIM_DELTA',    'update: 4.2 ms'    ] },
  { id: 3, x: 116, y: 313, tip: ['MDL_CONV',     'residual: 0.008'   ] },
  { id: 4, x:  67, y: 157, tip: ['PRED_STATE',   'conf: 96.7%'       ] },
]
const CTR = { id: 5, x: 200, y: 200, tip: ['TWIN_STATE', 'Δx → Δf · active'] }
const ALL = [...OUTER, CTR]

// Pentagon perimeter + spokes to center
const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,0],   // perimeter
  [0,5],[1,5],[2,5],[3,5],[4,5],   // spokes
]

// ─── Parallax depths ─────────────────────────────────────────────────────────
// Each layer shifts by (mouse offset × depth) — creates layered depth illusion
const D = {
  grid:   0.014,   // slowest — background
  rings:  0.026,
  edges:  0.048,
  nodes:  0.066,
  labels: 0.088,   // fastest — foreground labels
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  edge: number        // index into EDGES
  t: number           // 0→1 position along edge
  speed: number
  opacity: number
  dir: 1 | -1
}

interface Props {
  hoveredPillar: PillarKey
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function SystemVisual({ hoveredPillar }: Props) {
  // DOM refs
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const glowRef      = useRef<HTMLDivElement>(null)

  // SVG layer group refs — parallax applied via setAttribute, never React state
  const gGrid   = useRef<SVGGElement>(null)
  const gRings  = useRef<SVGGElement>(null)
  const gEdges  = useRef<SVGGElement>(null)
  const gNodes  = useRef<SVGGElement>(null)
  const gLabels = useRef<SVGGElement>(null)

  // Mutable animation state (all live in refs to avoid render churn)
  const mouse  = useRef({ x: 0, y: 0 })   // normalized mouse offset (–0.5 → 0.5)
  const par    = useRef({ x: 0, y: 0 })   // smoothed parallax value
  const parts  = useRef<Particle[]>([])
  const rafId  = useRef(0)
  const frame  = useRef(0)                 // frame counter for spawn rate

  // Ref mirror of prop — so RAF closure always reads latest pillar without re-subscribing
  const pillarRef = useRef<PillarKey>(null)
  useEffect(() => { pillarRef.current = hoveredPillar }, [hoveredPillar])

  // React state — only for tooltip/highlight (infrequent user events)
  const [hovNode, setHovNode] = useState<number | null>(null)
  const hovNodeRef = useRef<number | null>(null)

  // ── Mouse tracking (direct DOM, no React) ──────────────────────────────────
  const onMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    // Normalize to [–0.5, 0.5] relative to container center
    mouse.current = {
      x: (e.clientX - rect.left  - rect.width  / 2) / rect.width,
      y: (e.clientY - rect.top   - rect.height / 2) / rect.height,
    }
    // Move cursor proximity glow directly in DOM (avoids React state)
    if (glowRef.current) {
      glowRef.current.style.left    = `${e.clientX - rect.left}px`
      glowRef.current.style.top     = `${e.clientY - rect.top}px`
      glowRef.current.style.opacity = '1'
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    mouse.current = { x: 0, y: 0 }
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  // ── Apply parallax transforms to SVG layer groups ─────────────────────────
  const applyLayers = () => {
    const p = par.current
    const set = (el: SVGGElement | null, depth: number) => {
      if (el) el.setAttribute('transform',
        `translate(${p.x * 400 * depth} ${p.y * 400 * depth})`)
    }
    set(gGrid.current,   D.grid)
    set(gRings.current,  D.rings)
    set(gEdges.current,  D.edges)
    set(gNodes.current,  D.nodes)
    set(gLabels.current, D.labels)
  }

  // ── Particle system ───────────────────────────────────────────────────────
  const spawnParticle = () => {
    const edge = Math.floor(Math.random() * EDGES.length)
    const dir: 1 | -1 = Math.random() > 0.5 ? 1 : -1
    parts.current.push({
      edge,
      t: dir === 1 ? 0.01 : 0.99,
      speed: 0.0028 + Math.random() * 0.0038,
      opacity: 0,
      dir,
    })
  }

  const tickParticles = () => {
    frame.current++
    // "data-efficient" pillar: more frequent sparse pulses
    const rate = pillarRef.current === 'efficient' ? 4 : 13
    if (frame.current % rate === 0 && parts.current.length < 14) spawnParticle()

    // Advance + fade particles, remove finished ones
    parts.current = parts.current.filter(p => {
      p.t += p.speed * p.dir
      const prog = p.dir === 1 ? p.t : 1 - p.t
      // Smooth fade-in over first 12%, fade-out over last 12%
      p.opacity = prog < 0.12 ? prog / 0.12 : prog > 0.88 ? (1 - prog) / 0.12 : 1
      return p.t > 0 && p.t < 1
    })
  }

  const drawParticles = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const cw  = canvas.width  / dpr
    const ch  = canvas.height / dpr
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Scale factors: SVG viewBox (400×400) → canvas pixels
    const sx = cw / 400
    const sy = ch / 400

    // Match the parallax offset of the edges/nodes layer
    const px = par.current.x * 400 * D.edges * sx
    const py = par.current.y * 400 * D.edges * sy

    // Pillar-driven color
    const col = pillarRef.current === 'predictive' ? '129,140,248' : '56,189,248'
    const baseAlpha = pillarRef.current === 'efficient' ? 0.45 : 0.65

    for (const p of parts.current) {
      const [ai, bi] = EDGES[p.edge]
      const a = ALL[ai], b = ALL[bi]
      const x = (a.x + (b.x - a.x) * p.t) * sx + px
      const y = (a.y + (b.y - a.y) * p.t) * sy + py
      const alpha = p.opacity * baseAlpha

      // Soft glow halo
      const g = ctx.createRadialGradient(x, y, 0, x, y, 6 * sx)
      g.addColorStop(0, `rgba(${col},${alpha})`)
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, 6 * sx, 0, Math.PI * 2)
      ctx.fill()

      // Sharp core dot
      ctx.beginPath()
      ctx.arc(x, y, 1.5 * sx, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(186,230,253,${alpha})`
      ctx.fill()
    }
  }

  // ── Main RAF loop ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = containerRef.current
    if (!el) return
    el.addEventListener('mousemove',  onMouseMove,  { passive: true })
    el.addEventListener('mouseleave', onMouseLeave)

    const loop = () => {
      // Exponential smoothing toward mouse target
      par.current.x += (mouse.current.x - par.current.x) * 0.07
      par.current.y += (mouse.current.y - par.current.y) * 0.07

      applyLayers()
      tickParticles()
      drawParticles()

      rafId.current = requestAnimationFrame(loop)
    }
    rafId.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId.current)
      el.removeEventListener('mousemove',  onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseMove, onMouseLeave])

  // ── Canvas resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = canvas.offsetWidth  * dpr
      canvas.height = canvas.offsetHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── Node hover handlers ───────────────────────────────────────────────────
  const onNodeEnter = (id: number) => { hovNodeRef.current = id; setHovNode(id) }
  const onNodeLeave = ()           => { hovNodeRef.current = null; setHovNode(null) }

  // ── Derived render helpers ────────────────────────────────────────────────

  // Is this edge highlighted? (node hover or pillar "twins" emphasises spokes)
  const isEdgeHighlighted = (ai: number, bi: number) => {
    if (hovNode !== null && (ai === hovNode || bi === hovNode)) return true
    if (hoveredPillar === 'twins' && (ai === 5 || bi === 5)) return true
    return false
  }

  // Glow intensity for outer nodes
  const outerGlowLevel = (id: number): 'hover' | 'medium' | 'default' => {
    if (hovNode === id) return 'hover'
    if (hoveredPillar === 'predictive') return 'medium'
    return 'default'
  }

  // Ring stroke color — shifts to indigo on "predictive" pillar
  const ringStroke = (baseAlpha: number, boostAlpha: number) =>
    hoveredPillar === 'predictive'
      ? `rgba(129,140,248,${baseAlpha + boostAlpha})`
      : hoveredPillar === 'twins'
        ? `rgba(56,189,248,${baseAlpha + boostAlpha * 0.5})`
        : `rgba(56,189,248,${baseAlpha})`

  // Tooltip anchor position (percent of container, adjusted for overflow)
  const tooltipStyle = (id: number): React.CSSProperties => {
    const n   = ALL[id]
    const lp  = (n.x / 400) * 100
    const tp  = (n.y / 400) * 100
    const flipX = lp > 65   // nodes on the right: tooltip to the left
    const flipY = tp > 68   // nodes at bottom: tooltip above
    return {
      position: 'absolute',
      left:      `${lp}%`,
      top:       `${tp}%`,
      transform: `translate(${flipX ? '-115%' : '14px'}, ${flipY ? '-120%' : '-50%'})`,
    }
  }

  return (
    <div ref={containerRef}
      className="relative w-full max-w-md mx-auto lg:ml-auto select-none cursor-default">
      <div className="relative aspect-square bg-[#0d0d16]/80 border border-white/[0.05] rounded-[3px] overflow-hidden">

        {/* ── SVG: all structural layers ── */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">

          {/* LAYER 0 — background grid dots (slowest parallax) */}
          <g ref={gGrid}>
            {Array.from({ length: 7 }, (_, r) =>
              Array.from({ length: 7 }, (_, c) => (
                <circle key={`${r}-${c}`}
                  cx={c * 64 + 32} cy={r * 64 + 32} r="0.8"
                  fill="rgba(255,255,255,0.05)" />
              ))
            )}
          </g>

          {/* LAYER 1 — concentric rings */}
          <g ref={gRings}>
            {[175, 118, 62].map((r, i) => (
              <ellipse key={r} cx="200" cy="200" rx={r} ry={r} fill="none"
                strokeWidth="0.8"
                stroke={ringStroke(0.05 + i * 0.02, 0.10 + i * 0.02)}
                style={{ transition: 'stroke 0.7s ease' }} />
            ))}
          </g>

          {/* LAYER 2 — edges */}
          <g ref={gEdges}>
            {EDGES.map(([ai, bi], i) => {
              const a  = ALL[ai], b = ALL[bi]
              const hl = isEdgeHighlighted(ai, bi)
              return (
                <line key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={hl ? 'rgba(56,189,248,0.55)' : 'rgba(56,189,248,0.16)'}
                  strokeWidth={hl ? '0.9' : '0.45'}
                  style={{ transition: 'stroke 0.22s ease, stroke-width 0.22s ease' }} />
              )
            })}
          </g>

          {/* LAYER 3 — nodes */}
          <g ref={gNodes}>

            {/* Outer pentagon nodes */}
            {OUTER.map(n => {
              const gl  = outerGlowLevel(n.id)
              const hov = gl === 'hover'
              return (
                <g key={n.id} style={{ cursor: 'crosshair' }}
                  onMouseEnter={() => onNodeEnter(n.id)}
                  onMouseLeave={onNodeLeave}>

                  {/* Outer glow disk */}
                  <circle cx={n.x} cy={n.y}
                    r={hov ? 22 : gl === 'medium' ? 15 : 12}
                    fill={`rgba(56,189,248,${hov ? 0.13 : gl === 'medium' ? 0.07 : 0.035})`}
                    style={{ transition: 'r 0.3s ease, fill 0.3s ease' }} />

                  {/* Core dot */}
                  <circle cx={n.x} cy={n.y}
                    r={hov ? 5 : 3}
                    fill={`rgba(186,230,253,${hov ? 1 : 0.68})`}
                    style={{ transition: 'r 0.22s ease, fill 0.22s ease' }} />

                  {/* Hover ring pulse */}
                  {hov && (
                    <circle cx={n.x} cy={n.y} r="9.5" fill="none"
                      stroke="rgba(56,189,248,0.35)" strokeWidth="0.6" />
                  )}
                </g>
              )
            })}

            {/* Center node — the computational fusion core */}
            {(() => {
              const n            = CTR
              const hov          = hovNode === 5
              const twinsActive  = hoveredPillar === 'twins'
              const active       = hov || twinsActive
              return (
                <g style={{ cursor: 'crosshair' }}
                  onMouseEnter={() => onNodeEnter(5)}
                  onMouseLeave={onNodeLeave}>

                  {/* Outer ambient field */}
                  <circle cx={n.x} cy={n.y}
                    r={active ? 38 : 26}
                    fill={`rgba(56,189,248,${active ? 0.08 : 0.04})`}
                    style={{ transition: 'r 0.5s ease, fill 0.5s ease' }} />

                  {/* Mid halo */}
                  <circle cx={n.x} cy={n.y}
                    r={active ? 22 : 15}
                    fill={`rgba(56,189,248,${active ? 0.14 : 0.07})`}
                    style={{ transition: 'r 0.35s ease, fill 0.35s ease' }} />

                  {/* Core */}
                  <circle cx={n.x} cy={n.y}
                    r={active ? 7.5 : 5.5}
                    fill={`rgba(186,230,253,${active ? 1 : 0.85})`}
                    style={{ transition: 'r 0.2s ease, fill 0.2s ease' }} />

                  {/* Rotating dashed orbit ring — only on direct hover */}
                  {hov && (
                    <circle cx={n.x} cy={n.y} r="30" fill="none"
                      stroke="rgba(56,189,248,0.32)" strokeWidth="0.7"
                      strokeDasharray="6 3"
                      style={{
                        transformBox:    'fill-box',
                        transformOrigin: 'center',
                        animation:       'spinRing 5s linear infinite',
                      }} />
                  )}
                </g>
              )
            })()}
          </g>

          {/* LAYER 4 — labels (fastest parallax) */}
          <g ref={gLabels} style={{ pointerEvents: 'none' }}>
            {/* Top: physical system marker */}
            <text x="200" y="17" textAnchor="middle" fontSize="7.5"
              fontFamily="ui-monospace,monospace" letterSpacing="2.5"
              fill={hoveredPillar === 'twins' ? 'rgba(56,189,248,0.65)' : 'rgba(56,189,248,0.25)'}
              style={{ transition: 'fill 0.65s ease' }}>
              PHYSICAL SYSTEM
            </text>

            {/* Bottom: digital twin marker */}
            <text x="200" y="397" textAnchor="middle" fontSize="7.5"
              fontFamily="ui-monospace,monospace" letterSpacing="2.5"
              fill={hoveredPillar === 'twins' ? 'rgba(56,189,248,0.65)' : 'rgba(56,189,248,0.20)'}
              style={{ transition: 'fill 0.65s ease' }}>
              DIGITAL TWIN
            </text>

            {/* Center delta label */}
            <text x="200" y="220" textAnchor="middle" fontSize="8"
              fontFamily="ui-monospace,monospace" letterSpacing="1"
              fill={hovNode === 5 || hoveredPillar === 'twins'
                ? 'rgba(56,189,248,0.55)'
                : 'rgba(56,189,248,0.20)'}
              style={{ transition: 'fill 0.35s ease' }}>
              Δx → Δf
            </text>
          </g>
        </svg>

        {/* ── Canvas: traveling data particles ── */}
        <canvas ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* ── Cursor proximity glow ── */}
        <div ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width:          '130px',
            height:         '130px',
            transform:      'translate(-50%,-50%)',
            opacity:        0,
            background:     'radial-gradient(circle, rgba(56,189,248,0.055) 0%, transparent 70%)',
            borderRadius:   '50%',
            transition:     'opacity 0.4s ease',
          }} />

        {/* ── Status readouts ── */}
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ boxShadow: '0 0 5px rgba(52,211,153,0.7)' }} />
            <span className="text-[10px] font-mono text-emerald-400/60 tracking-wider uppercase">
              Model Active
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-700 mt-0.5">Δt = 0.02 ms</div>
        </div>
        <div className="absolute bottom-4 right-4 text-right pointer-events-none">
          <div className="text-[10px] font-mono text-slate-700">STATE_v3.1</div>
        </div>

        {/* ── Node tooltip ── */}
        {hovNode !== null && (
          <div className="pointer-events-none z-10" style={tooltipStyle(hovNode)}>
            <div className="px-3 py-2 bg-[#070710]/95 border border-sky-400/20 rounded-[2px] whitespace-nowrap"
              style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.65), 0 0 0 1px rgba(56,189,248,0.06)' }}>
              <div className="text-[9px] font-mono text-sky-400/50 tracking-[0.2em] uppercase mb-0.5">
                {ALL[hovNode].tip[0]}
              </div>
              <div className="text-[12px] font-mono text-slate-200 tracking-wide">
                {ALL[hovNode].tip[1]}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
