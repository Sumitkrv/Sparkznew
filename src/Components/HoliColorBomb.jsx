import React, { useRef, useEffect, useState, useCallback } from "react";

// ================================================================
//  HOLI GULAL SPLASH — Google-style powder-on-glass
//
//  Philosophy: Powder HITS → SPREADS → STICKS → STAINS
//  NOT fireworks. NOT smoke. NOT cinematic.
//
//  CHANGED from original:
//  ✅ Lifetime: 5500ms → 2200ms (powder settles fast)
//  ✅ Particles FREEZE after ~800ms (they stick to screen)
//  ✅ Travel distance cut 60% (powder doesn't fly far)
//  ✅ Removed: floating dust, screen shake, powder trails
//  ✅ Added: STAIN layer that persists 4s after splash
//  ✅ Added: Dense radial bloom (0–300ms)
//  ✅ Added: Thick opaque center cluster
//  ✅ All particles are circles — pure round powder
// ================================================================

const PALETTES = [
  { main: "#FF1493", hi: "#FF69B4", lo: "#C2185B", mid: "#FF4DB8" }, // hot pink gulal
  { main: "#FFD600", hi: "#FFEE58", lo: "#F9A825", mid: "#FFE030" }, // bright yellow
  { main: "#2979FF", hi: "#64B5F6", lo: "#1565C0", mid: "#448AFF" }, // electric blue
  { main: "#00E676", hi: "#69F0AE", lo: "#00C853", mid: "#00E676" }, // neon green
  { main: "#FF6D00", hi: "#FFB74D", lo: "#E65100", mid: "#FF9100" }, // deep orange
  { main: "#D500F9", hi: "#EA80FC", lo: "#AA00FF", mid: "#E040FB" }, // bright purple
  { main: "#FF1744", hi: "#FF5252", lo: "#D50000", mid: "#FF4569" }, // fiery red
  { main: "#00BCD4", hi: "#4DD0E1", lo: "#00838F", mid: "#26C6DA" }, // vivid teal
];

const pick  = () => PALETTES[Math.floor(Math.random() * PALETTES.length)];
const rand  = (a, b) => a + Math.random() * (b - a);
const randI = (a, b) => Math.floor(rand(a, b + 1));
const hex2rgb = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;
const lerpRgb = (a, b, t) => [
  Math.round(a[0]+(b[0]-a[0])*t),
  Math.round(a[1]+(b[1]-a[1])*t),
  Math.round(a[2]+(b[2]-a[2])*t),
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
const easeInQuad   = (t) => t * t;

// CHANGED: Splash life 5500→2200ms. Stain persists separately.
const SPLASH_LIFE = 2200;
const STAIN_LIFE  = 5000;  // stain lingers after splash
const TOTAL_LIFE  = SPLASH_LIFE + STAIN_LIFE;
const MAX_EXPLOSIONS = 8;
// CHANGED: Particles slow down after this time but keep falling
const FREEZE_AT = 1200;

// ================================================================
class GulalSplash {
  constructor(x, y, vw, vh, scrollY = 0) {
    this.x = x;
    this.y = y;
    this.scrollY = scrollY; // scroll position when created
    this.born = performance.now();
    this.dead = false;
    this.frozen = false; // CHANGED: flag — once true, physics stop

    const pal = pick();
    this.rgb    = hex2rgb(pal.main);
    this.rgbHi  = hex2rgb(pal.hi);
    this.rgbLo  = hex2rgb(pal.lo);
    this.rgbMid = hex2rgb(pal.mid);
    this.shades = [this.rgbLo, this.rgb, this.rgbMid, this.rgbHi];

    const mob = vw < 768;
    const sm  = mob ? 0.65 : 1;
    this.sm = sm;

    // CHANGED: Bloom radius bigger for explosive feel
    this.bloomMaxR = rand(120, 200) * sm;

    // L1: Dense center blob (NEW — thick opaque cluster)
    this.centerDots = this._genCenter(sm);

    // L2: Splash streaks — kept but SHORTER travel
    this.streaks = this._genStreaks(sm);

    // L3: Powder grains — kept but LESS travel, MORE density near center
    this.grains = this._genGrains(sm, mob);

    // L4: Splatter — kept but SHORTER range
    this.splatter = this._genSplatter(sm, mob);

    // REMOVED: floating dust (L5), powder trails (L6), screen shake
  }

  _getShade(t) {
    const idx = Math.min(3, Math.floor(t * 4));
    const frac = (t * 4) - idx;
    const next = Math.min(3, idx + 1);
    return lerpRgb(this.shades[idx], this.shades[next], frac);
  }

  // NEW: Dense center cluster — thick powder that barely moves
  _genCenter(sm) {
    const n = randI(40, 70);
    return Array.from({ length: n }, () => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.3, 2.5) * sm; // very slow — stays near center
      return {
        ox: 0, oy: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: rand(4, 12) * sm, // big chunky dots
        shade: rand(0, 1),
      };
    });
  }

  // CHANGED: Streaks — real splash arcs, longer and faster
  _genStreaks(sm) {
    const n = randI(8, 14);
    return Array.from({ length: n }, () => {
      const angle = rand(0, Math.PI * 2);
      const len = rand(80, 200) * sm; // was 40-120 — longer!
      const dotCount = randI(10, 18);
      return {
        angle, len, dotCount,
        dots: Array.from({ length: dotCount }, (_, i) => ({
          t: i / dotCount,
          ox: 0, oy: 0,
          spread: rand(-4, 4) * sm,
          size: rand(1.5, 5) * sm * (1 - i/dotCount * 0.4),
          shade: rand(0, 1),
        })),
        vx: Math.cos(angle),
        vy: Math.sin(angle),
        curSpeed: rand(6, 16) * sm,  // was 3-9 — faster!
        drag: rand(0.90, 0.95),     // was 0.88-0.94
      };
    });
  }

  // CHANGED: Grains - EXPLOSIVE burst, chaotic spread, gravity pulls down
  _genGrains(sm, mob) {
    const n = mob ? randI(200, 300) : randI(350, 500);
    return Array.from({ length: n }, () => {
      const angle = rand(0, Math.PI * 2);
      // CHANGED: Much higher initial speed for explosive feel
      const speedMul = Math.pow(Math.random(), 0.4); // was 0.8
      const speed = rand(3, 18) * sm * speedMul;    // was 0.8-7
      return {
        ox: 0, oy: 0,
        vx: Math.cos(angle) * speed + rand(-2, 2),  // chaotic
        vy: Math.sin(angle) * speed + rand(-2, 2),
        drag: rand(0.96, 0.985),  // less drag - flies farther
        gravity: rand(0.08, 0.18), // ADDED BACK - powder falls!
        r: rand(1.5, 6.5) * sm,
        shade: rand(0, 1),
        delay: rand(0, 40),
      };
    });
  }

  // CHANGED: Splatter - explosive secondary burst with gravity
  _genSplatter(sm, mob) {
    const n = mob ? randI(50, 80) : randI(80, 140);
    return Array.from({ length: n }, () => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(5, 20) * sm; // was 2-10 - much faster!
      return {
        ox: 0, oy: 0,
        vx: Math.cos(angle) * speed + rand(-2, 2),
        vy: Math.sin(angle) * speed + rand(-3, 3),
        drag: rand(0.94, 0.98),  // was 0.90-0.96
        gravity: rand(0.1, 0.22), // heavy particles fall fast
        r: rand(2, 7.5) * sm,
        shade: rand(0, 1),
        delay: rand(20, 100),
      };
    });
  }

  // CHANGED: Physics — particles slow down after FREEZE_AT but gravity still pulls
  update(now) {
    const age = now - this.born;
    if (age > TOTAL_LIFE) { this.dead = true; return; }

    // After FREEZE_AT ms, kill horizontal velocity but gravity still acts
    if (age > FREEZE_AT && !this.frozen) {
      this.frozen = true;
      // Kill horizontal momentum - particles "stick" to vertical fall
      for (const g of this.grains) {
        g.vx *= 0.05;  // almost stop horizontal
      }
      for (const sp of this.splatter) {
        sp.vx *= 0.05;
      }
    }

    // Center dots — minimal movement
    for (const c of this.centerDots) {
      c.vx *= 0.92;
      c.vy *= 0.92;
      c.ox += c.vx;
      c.oy += c.vy;
    }

    // Streaks
    for (const s of this.streaks) {
      s.curSpeed *= s.drag;
      for (const dot of s.dots) {
        const along = dot.t * s.curSpeed * 0.5;
        dot.ox += s.vx * along * 0.025;
        dot.oy += s.vy * along * 0.025;
      }
    }

    // Grains — WITH GRAVITY (powder falls!)
    for (const g of this.grains) {
      if (!this.frozen) {
        g.vx *= g.drag;
        g.vy *= g.drag;
      }
      g.vy += g.gravity; // always apply gravity
      g.ox += g.vx;
      g.oy += g.vy;
    }

    // Splatter — WITH GRAVITY
    for (const sp of this.splatter) {
      if (!this.frozen) {
        sp.vx *= sp.drag;
        sp.vy *= sp.drag;
      }
      sp.vy += sp.gravity; // always apply gravity
      sp.ox += sp.vx;
      sp.oy += sp.vy;
    }
  }

  draw(ctx, currentScrollY = 0) {
    if (this.dead) return;
    const now = performance.now();
    const age = now - this.born;
    const t = age / TOTAL_LIFE;

    // Calculate position offset based on scroll
    const scrollOffset = this.scrollY - currentScrollY;
    
    // If splash is off-screen due to scroll, don't render
    const adjustedY = this.y + scrollOffset;
    if (adjustedY < -200 || adjustedY > window.innerHeight + 200) {
      return; // off-screen, skip rendering
    }

    // CHANGED: Two-phase alpha
    // Phase 1 (0–SPLASH_LIFE): fully visible, powder spreading
    // Phase 2 (SPLASH_LIFE–TOTAL_LIFE): stain slowly fades
    let masterAlpha;
    if (age < SPLASH_LIFE) {
      masterAlpha = 1;
    } else {
      const stainAge = age - SPLASH_LIFE;
      const stainT = stainAge / STAIN_LIFE;
      // Stain holds at 0.85 opacity for 70%, then fades
      if (stainT < 0.7) masterAlpha = 0.85;
      else masterAlpha = 0.85 * (1 - easeInQuad((stainT - 0.7) / 0.3));
    }
    if (masterAlpha <= 0) return;

    const { x, rgbHi, rgb, rgbLo } = this;
    const y = adjustedY; // Use scroll-adjusted Y position

    // ============================
    //  NEW: RADIAL BLOOM (0–300ms)
    //  Thick colored burst that expands fast — like powder
    //  packet exploding on impact. Dense, not airy.
    // ============================
    if (age < 500) {
      const bt = Math.min(1, age / 250); // was 300 - faster expansion
      const br = this.bloomMaxR * easeOutQuint(bt);
      // Hold opacity, don't fade during bloom
      const ba = age < 250 ? 0.75 : 0.75 * (1 - (age - 250) / 250);
      if (ba > 0.01) {
        ctx.save();
        ctx.globalAlpha = ba * masterAlpha;
        const bg = ctx.createRadialGradient(x, y, 0, x, y, br);
        bg.addColorStop(0, rgba(rgb, 1));
        bg.addColorStop(0.2, rgba(rgb, 0.85));
        bg.addColorStop(0.45, rgba(rgb, 0.5));
        bg.addColorStop(0.7, rgba(rgbHi, 0.25));
        bg.addColorStop(1, rgba(rgbHi, 0));
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(x, y, br, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ============================
    //  NEW: DENSE CENTER CLUSTER
    //  Thick opaque dots near impact point — the
    //  heavy powder pile. Barely moves, high opacity.
    // ============================
    {
      ctx.save();
      for (const c of this.centerDots) {
        ctx.globalAlpha = masterAlpha * 1;
        ctx.fillStyle = rgba(this._getShade(c.shade), 1);
        ctx.beginPath();
        ctx.arc(x + c.ox, y + c.oy, c.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ============================
    //  L2: SPLASH STREAKS
    //  Directional powder lines — shorter, settle fast
    // ============================
    {
      const streakAlpha = masterAlpha * 0.95;
      if (streakAlpha > 0.01) {
        ctx.save();
        for (const s of this.streaks) {
          for (const dot of s.dots) {
            const expandT = Math.min(1, age / 400);
            const dist = dot.t * s.len * easeOutCubic(expandT);
            const dx = x + s.vx * dist + dot.ox + Math.cos(s.angle + Math.PI/2) * dot.spread;
            const dy = y + s.vy * dist + dot.oy + Math.sin(s.angle + Math.PI/2) * dot.spread;
            const c = this._getShade(dot.shade);
            ctx.globalAlpha = streakAlpha * (1 - dot.t * 0.1);
            ctx.fillStyle = rgba(c, 1);
            ctx.beginPath();
            ctx.arc(dx, dy, dot.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }
    }

    // ============================
    //  L3: POWDER GRAINS — main gulal body
    //  Particles expand then FREEZE in place
    // ============================
    {
      ctx.save();
      for (const g of this.grains) {
        if (age < g.delay) continue;
        ctx.globalAlpha = masterAlpha * 0.95;
        ctx.fillStyle = rgba(this._getShade(g.shade), 1);
        ctx.beginPath();
        ctx.arc(x + g.ox, y + g.oy, g.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ============================
    //  L4: SPLATTER — outer ring dots
    // ============================
    {
      ctx.save();
      for (const sp of this.splatter) {
        if (age < sp.delay) continue;
        ctx.globalAlpha = masterAlpha * 0.92;
        ctx.fillStyle = rgba(this._getShade(sp.shade), 1);
        ctx.beginPath();
        ctx.arc(x + sp.ox, y + sp.oy, sp.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // REMOVED: screen shake
  getShake() { return null; }
}

// ================================================================
//  REACT COMPONENT — unchanged structure
// ================================================================
const HoliColorBomb = React.memo(() => {
  const canvasRef  = useRef(null);
  const explosions = useRef([]);
  const rafRef     = useRef(null);
  const runningRef = useRef(false);
  const dprRef     = useRef(1);
  const [enabled, setEnabled] = useState(true);

  const resize = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    c.width  = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    c.style.width  = window.innerWidth + "px";
    c.style.height = window.innerHeight + "px";
  }, []);

  const loop = useCallback(() => {
    const c = canvasRef.current;
    if (!c) { runningRef.current = false; return; }
    const ctx = c.getContext("2d");
    const dpr = dprRef.current;
    const now = performance.now();

    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.setTransform(dpr,0,0,dpr,0,0);

    // REMOVED: screen shake logic

    const alive = [];
    const currentScrollY = window.scrollY;
    for (const e of explosions.current) {
      e.update(now);
      if (!e.dead) { e.draw(ctx, currentScrollY); alive.push(e); }
    }
    explosions.current = alive;

    if (explosions.current.length > 0) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
    }
  }, []);

  const handleInteraction = useCallback((e) => {
    if (!enabled) return;
    let px, py;
    if (e.touches && e.touches.length > 0) {
      px = e.touches[0].clientX; py = e.touches[0].clientY;
    } else {
      px = e.clientX; py = e.clientY;
    }
    if (explosions.current.length >= MAX_EXPLOSIONS) explosions.current.shift();
    explosions.current.push(new GulalSplash(px, py, window.innerWidth, window.innerHeight, window.scrollY));
    if (!runningRef.current) {
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(loop);
    }
  }, [enabled, loop]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      explosions.current = [];
      runningRef.current = false;
    };
  }, [resize]);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [enabled, handleInteraction]);

  return (
    <>
      <canvas ref={canvasRef} style={{
        position:"fixed",top:0,left:0,width:"100%",height:"100%",
        pointerEvents:"none",zIndex:99999,
      }}/>
      <button
        onClick={(e) => { e.stopPropagation(); setEnabled(p => !p); }}
        style={{
          position:"fixed",bottom:24,right:24,zIndex:100000,
          width:52,height:52,borderRadius:"50%",border:"none",
          cursor:"pointer",display:"flex",alignItems:"center",
          justifyContent:"center",padding:0,color:"#fff",
          background: enabled
            ? "linear-gradient(135deg, #E84393, #FDCB6E)"
            : "rgba(255,255,255,0.15)",
          backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
          boxShadow: enabled
            ? "0 4px 20px rgba(232,67,147,0.4), 0 0 0 3px rgba(255,255,255,0.1)"
            : "0 2px 12px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.06)",
          transition:"all 0.3s ease, transform 0.2s ease",
          transform: enabled ? "scale(1)" : "scale(0.9)",
        }}
        aria-label={enabled ? "Disable Holi Effect" : "Enable Holi Effect"}
        title={enabled ? "Holi: ON" : "Holi: OFF"}
      >
        <span style={{
          fontSize:24,lineHeight:1,
          filter: enabled ? "none" : "grayscale(1) opacity(0.5)",
          transition:"filter 0.3s ease",
        }} role="img" aria-label="holi">{"🎨"}</span>
      </button>
    </>
  );
});

HoliColorBomb.displayName = "HoliColorBomb";
export default HoliColorBomb;