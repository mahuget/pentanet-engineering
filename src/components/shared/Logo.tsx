"use client";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "color" | "white" | "dark";
}

/**
 * Pentanet Engineering PLC — SVG Logo
 *
 * Point-down pentagon with pentagram star lines.
 * Five blue nodes; the bottom node is orange/gold (brand accent).
 * Dark navy filled circle at the geometric center.
 *
 * variant="color" → navy text  (use on light backgrounds)
 * variant="white" → white text (use on dark/navy backgrounds)
 * variant="dark"  → light text (use on dark surfaces)
 */
export function Logo({ className, variant = "color" }: LogoProps) {
  const isWhite = variant === "white";

  const lineStroke = isWhite ? "rgba(255,255,255,0.85)" : "#2563EB";
  const nodeFill   = isWhite ? "rgba(255,255,255,0.15)" : "#EFF6FF";
  const nodeStroke = isWhite ? "rgba(255,255,255,0.85)" : "#2563EB";
  const centerFill = isWhite ? "rgba(255,255,255,0.2)"  : "#102A43";
  const textMain   = isWhite ? "#FFFFFF" : "#102A43";
  const textSub    = isWhite ? "rgba(255,255,255,0.65)" : "#64748B";

  // Point-down pentagon: center (cx,cy)=(38,32), radius=28
  // Bottom node at 90°, going clockwise: 90°, 162°, 234°, 306°, 18°
  const cx = 38, cy = 32, r = 27;
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const deg = 90 + i * 72;
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  });
  // nodes[0] = bottom (orange), nodes[1]=lower-left, nodes[2]=upper-left, nodes[3]=upper-right, nodes[4]=lower-right

  // Pentagram star (connect every-other node)
  const starLines: [number, number][] = [
    [0, 2], [2, 4], [4, 1], [1, 3], [3, 0],
  ];

  // Pentagon outer frame
  const frameLines: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  ];

  return (
    <svg
      viewBox="0 0 200 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto", className)}
      aria-label="Pentanet Engineering PLC"
      role="img"
    >
      {/* Outer pentagon frame */}
      {frameLines.map(([a, b], i) => (
        <line
          key={`frame-${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={lineStroke}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />
      ))}

      {/* Star (pentagram) lines */}
      {starLines.map(([a, b], i) => (
        <line
          key={`star-${i}`}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke={lineStroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}

      {/* Center dark circle */}
      <circle cx={cx} cy={cy} r="5.5" fill={centerFill} stroke={nodeStroke} strokeWidth="1" />

      {/* Node circles — blue except bottom = orange */}
      {nodes.map((n, i) => (
        <circle
          key={`node-${i}`}
          cx={n.x}
          cy={n.y}
          r={i === 0 ? 5.5 : 4.5}
          fill={i === 0 ? "#F97316" : nodeFill}
          stroke={i === 0 ? "#EA580C" : nodeStroke}
          strokeWidth="1.5"
        />
      ))}

      {/* PENTANET text */}
      <text
        x="77"
        y="30"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontWeight="800"
        fontSize="21"
        fill={textMain}
        letterSpacing="-0.3"
      >
        PENTANET
      </text>

      {/* ENGINEERING PLC text */}
      <text
        x="77"
        y="47"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontWeight="400"
        fontSize="9"
        fill={textSub}
        letterSpacing="2.8"
      >
        ENGINEERING PLC
      </text>

      {/* Tagline */}
      <text
        x="77"
        y="62"
        fontFamily="'Segoe UI', system-ui, sans-serif"
        fontWeight="400"
        fontSize="7.5"
        fill="#F97316"
        letterSpacing="0.4"
        fontStyle="italic"
      >
        Build · Connect · Energize
      </text>
    </svg>
  );
}
