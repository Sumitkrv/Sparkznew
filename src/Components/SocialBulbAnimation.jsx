import React from "react";
import { motion } from "framer-motion";

/*
  Asset-to-Icon mapping (from reference image analysis):
  ─────────────────────────────────────────────────────
  Asset 19  220px  →  Gear/Cog hub (center-right)
  Asset 3   213px  →  Globe hub (center-left)
  Asset 5   213px  →  Facebook (left)
  Asset 12  160px  →  Twitter (top-left)
  Asset 16  155px  →  LinkedIn (far right)
  Asset 13  162px  →  Instagram (lower-left)
  Asset 18  162px  →  Monitor/Desktop (top)
  Asset 4   175px  →  Behance (bottom-left)
  Asset 9   134px  →  Video/Play (lower-right of gear)
  Asset 15  117px  →  WhatsApp (upper-center)
  Asset 17  117px  →  Email/Envelope (upper-right)
  Asset 8   114px  →  Pinterest (center-lower)
  Asset 6    99px  →  WiFi (right)
  Asset 20   93px  →  Dollar (center-left of gear)
  Asset 11   83px  →  Chat/Message (lower-center)
  Asset 10   80px  →  Search/Magnify (near gear)
  Asset 7    84px  →  Heart (bottom)
  Asset 21   69px  →  Green dot (lower-right)
*/

/* ── All icon positions as % of container, matching the reference exactly ── */
const ICONS = [
  // TWO MAIN HUBS
  { src: "/images/4x/Asset 19@4x.png", x: 57, y: 33, w: 14, hub: true, label: "Gear Hub"  },
  { src: "/images/4x/Asset 3@4x.png",  x: 23, y: 44, w: 13, hub: true, label: "Globe Hub" },

  // LARGE ICONS
  { src: "/images/4x/Asset 12@4x.png", x: 8,  y: 24, w: 11, label: "Twitter"   },
  { src: "/images/4x/Asset 5@4x.png",  x: 21, y: 31, w: 10, label: "Facebook"  },
  { src: "/images/4x/Asset 16@4x.png", x: 87, y: 37, w: 11, label: "LinkedIn"  },

  // MEDIUM ICONS
  { src: "/images/4x/Asset 15@4x.png", x: 37, y: 21, w: 8,  label: "WhatsApp"  },
  { src: "/images/4x/Asset 13@4x.png", x: 7,  y: 54, w: 9,  label: "Instagram" },
  { src: "/images/4x/Asset 18@4x.png", x: 61, y: 12, w: 9,  label: "Monitor"   },
  { src: "/images/4x/Asset 9@4x.png",  x: 66, y: 55, w: 8,  label: "Video"     },
  { src: "/images/4x/Asset 4@4x.png",  x: 17, y: 66, w: 9,  label: "Behance"   },

  // SMALL ICONS
  { src: "/images/4x/Asset 17@4x.png", x: 76, y: 18, w: 7,  label: "Email"     },
  { src: "/images/4x/Asset 6@4x.png",  x: 83, y: 52, w: 7,  label: "WiFi"      },
  { src: "/images/4x/Asset 8@4x.png",  x: 36, y: 58, w: 7,  label: "Pinterest" },
  { src: "/images/4x/Asset 20@4x.png", x: 33, y: 40, w: 6,  label: "Dollar"    },
  { src: "/images/4x/Asset 11@4x.png", x: 29, y: 70, w: 6,  label: "Chat"      },
  { src: "/images/4x/Asset 10@4x.png", x: 47, y: 40, w: 6,  label: "Search"    },
  { src: "/images/4x/Asset 7@4x.png",  x: 44, y: 82, w: 6,  label: "Heart"     },

  // TINY DOT
  { src: "/images/4x/Asset 21@4x.png", x: 61, y: 68, w: 4,  label: "Dot"       },
];

/* ── 5 main plant stems from bottom center upward ── */
const STEMS = [
  "M 47,96 C 44,82 28,70 10,28",
  "M 48,96 C 46,82 35,68 24,46",
  "M 50,96 C 50,82 50,65 48,42",
  "M 52,96 C 53,82 55,62 58,35",
  "M 53,96 C 56,82 72,65 88,40",
];

/* ── Hub-to-satellite connecting lines ── */
const CONNECTIONS = [
  // From Gear hub (57, 33)
  { from: [57, 33], to: [61, 12] },
  { from: [57, 33], to: [76, 18] },
  { from: [57, 33], to: [87, 37] },
  { from: [57, 33], to: [83, 52] },
  { from: [57, 33], to: [66, 55] },
  { from: [57, 33], to: [47, 40] },
  // From Globe hub (23, 44)
  { from: [23, 44], to: [8,  24] },
  { from: [23, 44], to: [21, 31] },
  { from: [23, 44], to: [37, 21] },
  { from: [23, 44], to: [7,  54] },
  { from: [23, 44], to: [36, 58] },
  { from: [23, 44], to: [17, 66] },
  { from: [23, 44], to: [33, 40] },
  { from: [23, 44], to: [29, 70] },
];

const EASE_BOUNCE = [0.34, 1.56, 0.64, 1];

const SocialBulbAnimation = ({ prefersReducedMotion = false }) => {
  return (
    <div className="relative w-full h-full select-none" style={{ minHeight: 400 }}>
      <style>{`
        @keyframes sbF0{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes sbF1{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes sbF2{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes sbF3{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes sbPulse{
          0%,100%{filter:drop-shadow(0 0 12px rgba(124,58,237,.25));transform:scale(1)}
          50%{filter:drop-shadow(0 0 30px rgba(124,58,237,.5));transform:scale(1.03)}
        }
      `}</style>

      {/* ── SVG Layer: Stems + Connections ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="stemG" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#4B5563" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6B7280" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Main stems */}
        {STEMS.map((d, i) => (
          <motion.path
            key={`s${i}`}
            d={d}
            stroke="url(#stemG)"
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.2, delay: 0.2 + i * 0.15, ease: "easeOut" },
              opacity:    { duration: 0.3, delay: 0.2 + i * 0.15 },
            }}
          />
        ))}

        {/* Connection lines */}
        {CONNECTIONS.map((c, i) => (
          <motion.line
            key={`c${i}`}
            x1={c.from[0]} y1={c.from[1]}
            x2={c.to[0]}   y2={c.to[1]}
            stroke="#6B7280"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeOpacity="0.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              pathLength: { duration: 0.6, delay: 1.2 + i * 0.08, ease: "easeOut" },
              opacity:    { duration: 0.3, delay: 1.2 + i * 0.08 },
            }}
          />
        ))}
      </svg>

      {/* ── Icons Layer ── */}
      {ICONS.map((icon, i) => {
        const floatName = `sbF${i % 4}`;
        const floatDur  = 3.5 + (i % 5) * 0.4;
        const floatDel  = 2.8 + i * 0.12;

        return (
          <motion.div
            key={icon.label}
            className="absolute"
            style={{
              left: `${icon.x}%`,
              top:  `${icon.y}%`,
              width: `${icon.w}%`,
              transform: "translate(-50%,-50%)",
              zIndex: icon.hub ? 20 : 10,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.55,
              delay: icon.hub ? 0.8 + i * 0.2 : 1.4 + i * 0.12,
              ease: EASE_BOUNCE,
            }}
          >
            <div
              style={{
                animation: prefersReducedMotion
                  ? "none"
                  : icon.hub
                    ? `sbPulse 4s ease-in-out ${floatDel}s infinite`
                    : `${floatName} ${floatDur}s ease-in-out ${floatDel}s infinite`,
                willChange: "transform",
              }}
            >
              <img
                src={icon.src}
                alt={icon.label}
                className="w-full h-auto"
                style={{
                  filter: icon.hub
                    ? "drop-shadow(0 0 16px rgba(124,58,237,.35))"
                    : "drop-shadow(0 4px 8px rgba(0,0,0,.25))",
                }}
                loading="eager"
                draggable={false}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

SocialBulbAnimation.displayName = "SocialBulbAnimation";
export default SocialBulbAnimation;
