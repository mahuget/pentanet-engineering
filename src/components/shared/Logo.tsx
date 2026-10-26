"use client";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "color" | "white" | "dark";
  iconOnly?: boolean;
}

/**
 * Pentanet Engineering PLC — Official Logo SVG
 *
 * Recreated from client-provided brand image:
 * - Pentagon outer frame with white/gray lines
 * - Pentagram star lines connecting all nodes
 * - White circle nodes at 4 upper points
 * - Gray filled circle in geometric center
 * - Orange filled circle at bottom point (brand accent)
 * - Arrow direction indicators on lines
 *
 * variant="color"  → dark navy background assumed (default)
 * variant="white"  → for dark backgrounds
 * variant="dark"   → for light backgrounds (navy text)
 * iconOnly         → renders only the pentagon icon, no text
 */
export function Logo({ className, variant = "color", iconOnly = false }: LogoProps) {
  const isOnDark = variant === "color" || variant === "white";

  const lineColor    = isOnDark ? "rgba(255,255,255,0.85)" : "#1e2d4a";
  const frameColor   = isOnDark ? "rgba(255,255,255,0.60)" : "#3a4f6a";
  const nodeFill     = isOnDark ? "#253550" : "#e8edf4";
  const nodeStroke   = isOnDark ? "rgba(255,255,255,0.85)" : "#1e2d4a";
  const centerFill   = isOnDark ? "#3d4f65" : "#7a8fa6";
  const textMain     = isOnDark ? "#FFFFFF" : "#102A43";
  const textSub      = isOnDark ? "rgba(255,255,255,0.60)" : "#4a6080";
  const taglineColor = "#F97316";

  // Point-down pentagon — node[0] at bottom (orange), going clockwise
  // Center at (44, 38), radius 32
  const cx = 44, cy = 37, r = 32;
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const deg = 90 + i * 72; // starts at bottom
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });
  // nodes: [0]=bottom(orange), [1]=lower-left, [2]=upper-left, [3]=upper-right, [4]=lower-right

  // Pentagon frame lines
  const frame: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,0]];
  // Pentagram star lines (skip-one connections)
  const star: [number, number][] = [[0,2],[2,4],[4,1],[1,3],[3,0]];

  // Small arrowhead helper
  function arrowhead(x1: number, y1: number, x2: number, y2: number, offset: number) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx*dx + dy*dy);
    const ux = dx/len, uy = dy/len;
    // Position ~70% along the line
    const px = x1 + ux * len * 0.68 + offset;
    const py = y1 + uy * len * 0.68;
    const size = 3.5;
    const perp = { x: -uy, y: ux };
    return {
      p: `M${px - ux*size + perp.x*size*0.5} ${py - uy*size + perp.y*size*0.5} L${px} ${py} L${px - ux*size - perp.x*size*0.5} ${py - uy*size - perp.y*size*0.5}`,
    };
  }

  const viewW = iconOnly ? 88 : 260;

  return (
    <svg
      viewBox={`0 0 ${viewW} 76`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto", className)}
      aria-label="Pentanet Engineering PLC"
      role="img"
    >
      {/* ── Pentagon outer frame ──────────────────────── */}
      {frame.map(([a, b], i) => (
        <line key={`f${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={frameColor} strokeWidth="1.5" strokeLinecap="round"
        />
      ))}

      {/* ── Pentagram star lines ──────────────────────── */}
      {star.map(([a, b], i) => (
        <line key={`s${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={lineColor} strokeWidth="1.6" strokeLinecap="round"
        />
      ))}

      {/* ── Arrowheads on star lines ─────────────────── */}
      {star.map(([a, b], i) => {
        const ah = arrowhead(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y, 0);
        return (
          <path key={`ah${i}`} d={ah.p}
            stroke={lineColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        );
      })}

      {/* ── Center circle ────────────────────────────── */}
      <circle cx={cx} cy={cy} r="6"
        fill={centerFill} stroke={frameColor} strokeWidth="1.2" />

      {/* ── Node circles — white except bottom = orange ─ */}
      {nodes.map((n, i) => (
        <circle key={`n${i}`}
          cx={n.x} cy={n.y}
          r={i === 0 ? 6 : 5}
          fill={i === 0 ? "#F97316" : nodeFill}
          stroke={i === 0 ? "#EA580C" : nodeStroke}
          strokeWidth="1.8"
        />
      ))}

      {/* ── Company name (hidden when iconOnly) ─────── */}
      {!iconOnly && (
        <>
          {/* PENTANET */}
          <text x="95" y="32"
            fontFamily="'Segoe UI', 'Arial Black', system-ui, sans-serif"
            fontWeight="900" fontSize="24" fill={textMain} letterSpacing="-0.5">
            PENTANET
          </text>

          {/* ENGINEERING PLC */}
          <text x="96" y="48"
            fontFamily="'Segoe UI', system-ui, sans-serif"
            fontWeight="400" fontSize="10" fill={textSub} letterSpacing="3.2">
            ENGINEERING PLC
          </text>

          {/* Build · Connect · Energize */}
          <text x="96" y="64"
            fontFamily="'Segoe UI', Georgia, serif"
            fontWeight="400" fontSize="9.5" fill={taglineColor}
            letterSpacing="0.5" fontStyle="italic">
            Build · Connect · Energize
          </text>
        </>
      )}
    </svg>
  );
}
