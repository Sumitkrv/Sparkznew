import React, { useRef, useEffect, useState, useCallback } from "react";

// ================================================================
//  HOLI COLOR BOMB — Cinematic Powder Explosion
//
//  5-LAYER EXPLOSION per click:
//
//    L1  CORE FLASH        0–120ms   Bright white→color flash
//    L2  SHOCKWAVE RING    0–350ms   Expanding translucent ring
//    L3  CLOUD MASS        0–6s      6-10 thick soft blobs that
//                                    expand outward with drag,
//                                    irregular shapes via bezier
//    L4  POWDER CHUNKS     0–4s      40-60 medium irregular lumps
//                                    flying outward with air
//                                    resistance + slight gravity
//    L5  FINE DUST         200ms–7s  80-120 tiny particles that
//                                    float slowly, linger longest
//
//  PHYSICS:
//    - Fast initial velocity (burst), heavy air drag slows it
//    - Slight downward gravity on chunks/dust
//    - Organic randomness in all spread directions
//    - Scale variation for pseudo-3D depth
//
//  Canvas API | 60fps | Max 6 concurrent | No external libs
// ================================================================

/* ---- Vibrant Holi powder colors ---- */
const PALETTES = [
  // Each palette = [main, highlight, dark] for a color family
  { main: "#FF1493", hi: "#FFB6DD", lo: "#8B0A50" }, // hot pink
  { main: "#FFD600", hi: "#FFFDE7", lo: "#F9A825" }, // golden yellow
  { main: "#2979FF", hi: "#BBDEFB", lo: "#0D47A1" }, // vivid blue
  { main: "#00E676", hi: "#B9F6CA", lo: "#1B5E20" }, // green
  { main: "#FF6D00", hi: "#FFE0B2", lo: "#BF360C" }, // deep orange
  { main: "#D500F9", hi: "#F3E5F5", lo: "#6A1B9A" }, // purple
  { main: "#F50057", hi: "#FCE4EC", lo: "#880E4F" }, // magenta
  { main: "#00BCD4", hi: "#E0F7FA", lo: "#006064" }, // teal
];

/* ---- Helpers ---- */
const pick   = () => PALETTES[Math.floor(Math.random() * PALETTES.length)];
const rand   = (a, b) => a + Math.random() * (b - a);
const randI  = (a, b) => Math.floor(rand(a, b + 1));
const hex2rgb = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];
const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

/* ---- Easing ---- */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
const easeInQuad   = (t) => t * t;

/* ---- Timings ---- */
const EXPLOSION_LIFE = 6500; // total ms before auto-remove
const MAX_EXPLOSIONS = 6;

// ================================================================
//  EXPLOSION CLASS
//  One "color bomb" = all 5 layers managed together.
// ================================================================
class Explosion {
  constructor(x, y, vw, vh) {
    this.x = x;
    this.y = y;
    this.born = performance.now();
    this.dead = false;

    const pal = pick();
    this.rgb     = hex2rgb(pal.main);
    this.rgbHi   = hex2rgb(pal.hi);
    this.rgbLo   = hex2rgb(pal.lo);
    this.mainHex = pal.main;

    const mob = vw < 768;
    const sm  = mob ? 0.55 : 1;
    this.sm = sm;

    // Intensity varies by position (center = stronger)
    const cx = Math.abs(x - vw / 2) / (vw / 2);
    const cy = Math.abs(y - vh / 2) / (vh / 2);
    const edgeDist = 1 - Math.max(cx, cy) * 0.3; // 0.7–1.0
    this.intensity = edgeDist;

    // L1: Core flash
    this.flashR = rand(60, 120) * sm * edgeDist;

    // L2: Shockwave ring
    this.ringMaxR  = rand(150, 280) * sm * edgeDist;
    this.ringWidth = rand(3, 7) * sm;

    // L3: Cloud mass (6-10 large soft blobs)
    this.clouds = this._genClouds(sm, edgeDist);

    // L4: Powder chunks (40-60 medium irregular lumps)
    this.chunks = this._genChunks(sm, edgeDist, mob);

    // L5: Fine dust (80-120 tiny particles)
    this.dust = this._genDust(sm, edgeDist, mob);

    // Screen shake
    this.shakeDur = rand(100, 200);
    this.shakeI   = rand(4, 8) * edgeDist;
  }

  /* ---- L3: Cloud blobs ---- */
  _genClouds(sm, intensity) {
    const n = randI(6, 10);
    return Array.from({ length: n }, () => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.8, 3.5) * sm * intensity;
      const maxR  = rand(50, 130) * sm * intensity;
      return {
        // Position offset from explosion center (animated)
        ox: 0, oy: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        drag: rand(0.965, 0.985),
        gravity: rand(0.002, 0.008),
        // Blob visual
        maxR,
        currentR: 0,           // will expand
        expandSpeed: rand(0.6, 1.4),
        // Organic shape: 8-12 radii that wobble
        lobeCount: randI(8, 12),
        lobes: Array.from({ length: randI(8, 12) }, () => rand(0.65, 1.35)),
        rotation: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.003, 0.003),
        // Depth (scale variation for 3D feel)
        depth: rand(0.7, 1.3),
      };
    });
  }

  /* ---- L4: Powder chunks ---- */
  _genChunks(sm, intensity, mob) {
    const n = mob ? randI(30, 45) : randI(45, 65);
    return Array.from({ length: n }, () => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(2, 10) * sm * intensity;
      return {
        ox: 0, oy: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(0.5, 2),
        drag: rand(0.955, 0.98),
        gravity: rand(0.015, 0.05),
        r: rand(3, 12) * sm,
        // Irregular shape: slight elongation + rotation
        scaleX: rand(0.6, 1.4),
        scaleY: rand(0.6, 1.4),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.08, 0.08),
        depth: rand(0.6, 1.4),
        // Chunk fades slower than cloud edge
        fadeDelay: rand(0, 0.15),
      };
    });
  }

  /* ---- L5: Fine dust ---- */
  _genDust(sm, intensity, mob) {
    const n = mob ? randI(60, 80) : randI(90, 130);
    return Array.from({ length: n }, () => {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(0.3, 4) * sm * intensity;
      return {
        ox: 0, oy: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(0.1, 0.8),
        drag: rand(0.985, 0.998),
        gravity: rand(0.002, 0.015),
        r: rand(0.8, 3.5) * sm,
        depth: rand(0.5, 1.5),
        delay: rand(0, 300), // some dust appears slightly later
        drift: rand(-0.15, 0.15), // slow horizontal drift
      };
    });
  }

  /* ---- UPDATE (per frame) ---- */
  update(now) {
    const age = now - this.born;
    if (age > EXPLOSION_LIFE) {
      this.dead = true;
      return;
    }

    // Cloud physics
    for (const c of this.clouds) {
      c.vx *= c.drag;
      c.vy *= c.drag;
      c.vy += c.gravity;
      c.ox += c.vx;
      c.oy += c.vy;
      c.rotation += c.rotSpeed;
      // Expand cloud radius over first ~800ms
      if (c.currentR < c.maxR) {
        c.currentR = Math.min(c.maxR, c.currentR + c.maxR * c.expandSpeed * 0.04);
      }
    }

    // Chunk physics
    for (const ch of this.chunks) {
      ch.vx *= ch.drag;
      ch.vy *= ch.drag;
      ch.vy += ch.gravity;
      ch.ox += ch.vx;
      ch.oy += ch.vy;
      ch.rot += ch.rotSpeed;
    }

    // Dust physics
    for (const d of this.dust) {
      d.vx *= d.drag;
      d.vy *= d.drag;
      d.vy += d.gravity;
      d.vx += d.drift * 0.01; // slow drift
      d.ox += d.vx;
      d.oy += d.vy;
    }
  }

  /* ---- DRAW ---- */
  draw(ctx) {
    if (this.dead) return;
    const age = performance.now() - this.born;
    const t = age / EXPLOSION_LIFE;

    // Master fade: hold full for first 60%, then fade over last 40%
    let masterAlpha;
    if (t < 0.6) masterAlpha = 1;
    else masterAlpha = 1 - easeInQuad((t - 0.6) / 0.4);
    if (masterAlpha <= 0) return;

    const { x, y, rgb, rgbHi, rgbLo } = this;

    // ============================
    //  L1: CORE FLASH (0–120ms)
    // ============================
    if (age < 120) {
      const ft = age / 120;
      const fr = this.flashR * easeOutCubic(ft);
      const fa = (1 - ft) * 0.85;
      ctx.save();
      ctx.globalAlpha = fa;
      const fg = ctx.createRadialGradient(x, y, 0, x, y, fr);
      fg.addColorStop(0, "rgba(255,255,255,0.98)");
      fg.addColorStop(0.3, rgba(rgbHi, 0.8));
      fg.addColorStop(0.7, rgba(rgb, 0.4));
      fg.addColorStop(1, rgba(rgb, 0));
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.arc(x, y, fr, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // ============================
    //  L2: SHOCKWAVE RING (0–350ms)
    // ============================
    if (age < 350) {
      const rt = age / 350;
      const rr = this.ringMaxR * easeOutQuart(rt);
      const ra = (1 - rt) * 0.45 * masterAlpha;
      if (ra > 0.005) {
        ctx.save();
        ctx.globalAlpha = ra;
        ctx.strokeStyle = rgba(rgbHi, 0.6);
        ctx.lineWidth = this.ringWidth * (1 - rt * 0.6);
        ctx.beginPath();
        ctx.arc(x, y, rr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // ============================
    //  L3: CLOUD MASS
    //  Each cloud = organic blob drawn as a closed bezier
    //  curve with random "lobe" radii, plus soft radial gradient.
    // ============================
    for (const c of this.clouds) {
      const cr = c.currentR * c.depth;
      if (cr < 2) continue;

      // Cloud alpha: full → fade with master
      const cloudAlpha = masterAlpha * 0.65;
      if (cloudAlpha < 0.005) continue;

      const cx = x + c.ox;
      const cy = y + c.oy;

      ctx.save();
      ctx.globalAlpha = cloudAlpha;
      ctx.translate(cx, cy);
      ctx.rotate(c.rotation);

      // Build organic shape path
      const n = c.lobes.length;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle0 = (Math.PI * 2 * (i % n)) / n;
        const angle1 = (Math.PI * 2 * ((i + 1) % n)) / n;
        const r0 = cr * c.lobes[i % n];
        const r1 = cr * c.lobes[(i + 1) % n];
        const px0 = Math.cos(angle0) * r0;
        const py0 = Math.sin(angle0) * r0;

        if (i === 0) {
          ctx.moveTo(px0, py0);
        }

        // Smooth curve to next lobe point
        const midAngle = (angle0 + angle1) / 2;
        const midR = ((r0 + r1) / 2) * rand(0.9, 1.1);
        const cpx = Math.cos(midAngle) * midR * 1.15;
        const cpy = Math.sin(midAngle) * midR * 1.15;
        const px1 = Math.cos(angle1) * r1;
        const py1 = Math.sin(angle1) * r1;
        ctx.quadraticCurveTo(cpx, cpy, px1, py1);
      }
      ctx.closePath();

      // Fill with radial gradient (dense center → soft edge)
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, cr);
      g.addColorStop(0, rgba(rgb, 0.85));
      g.addColorStop(0.4, rgba(rgb, 0.55));
      g.addColorStop(0.7, rgba(rgb, 0.25));
      g.addColorStop(1, rgba(rgb, 0));
      ctx.fillStyle = g;
      ctx.fill();

      // Inner highlight for volume
      const hlg = ctx.createRadialGradient(
        -cr * 0.15, -cr * 0.15, 0,
        -cr * 0.15, -cr * 0.15, cr * 0.5
      );
      hlg.addColorStop(0, rgba(rgbHi, 0.3));
      hlg.addColorStop(1, rgba(rgbHi, 0));
      ctx.fillStyle = hlg;
      ctx.fill();

      ctx.restore();
    }

    // Soft ambient glow behind everything
    if (age < 3000) {
      const glowT = Math.min(1, age / 3000);
      const glowR = this.ringMaxR * 1.2 * easeOutCubic(Math.min(1, age / 600));
      const glowA = masterAlpha * (1 - glowT) * 0.2;
      if (glowA > 0.005 && glowR > 5) {
        ctx.save();
        ctx.globalAlpha = glowA;
        const gg = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        gg.addColorStop(0, rgba(rgb, 0.35));
        gg.addColorStop(0.5, rgba(rgb, 0.12));
        gg.addColorStop(1, rgba(rgb, 0));
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ============================
    //  L4: POWDER CHUNKS
    //  Irregular lumps with elongation + rotation.
    // ============================
    {
      ctx.save();
      ctx.fillStyle = this.mainHex;

      for (const ch of this.chunks) {
        // Chunk alpha: fade based on age + individual delay
        const chunkLife = 4500;
        const chT = Math.max(0, age - ch.fadeDelay * chunkLife) / chunkLife;
        if (chT >= 1) continue;

        let chAlpha;
        if (chT < 0.5) chAlpha = 1;
        else chAlpha = 1 - easeInQuad((chT - 0.5) / 0.5);
        chAlpha *= masterAlpha * 0.9;
        if (chAlpha < 0.01) continue;

        ctx.globalAlpha = chAlpha;

        const cx2 = x + ch.ox;
        const cy2 = y + ch.oy;
        const r = ch.r * ch.depth;

        ctx.save();
        ctx.translate(cx2, cy2);
        ctx.rotate(ch.rot);
        ctx.scale(ch.scaleX, ch.scaleY);

        // Draw as rounded rectangle (irregular lump)
        const hw = r;
        const hh = r * 0.7;
        const cr2 = r * 0.35;
        ctx.beginPath();
        ctx.moveTo(-hw + cr2, -hh);
        ctx.lineTo(hw - cr2, -hh);
        ctx.arcTo(hw, -hh, hw, -hh + cr2, cr2);
        ctx.lineTo(hw, hh - cr2);
        ctx.arcTo(hw, hh, hw - cr2, hh, cr2);
        ctx.lineTo(-hw + cr2, hh);
        ctx.arcTo(-hw, hh, -hw, hh - cr2, cr2);
        ctx.lineTo(-hw, -hh + cr2);
        ctx.arcTo(-hw, -hh, -hw + cr2, -hh, cr2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
    }

    // ============================
    //  L5: FINE DUST
    //  Tiny circles that linger longest.
    // ============================
    {
      ctx.save();
      ctx.fillStyle = rgba(rgbHi, 1);

      for (const d of this.dust) {
        if (age < d.delay) continue;
        const dustAge = age - d.delay;
        const dustLife = EXPLOSION_LIFE - d.delay;
        const dT = dustAge / dustLife;
        if (dT >= 1) continue;

        // Dust fades: hold 70% → fade 30%
        let dAlpha;
        if (dT < 0.7) dAlpha = 1;
        else dAlpha = 1 - easeInQuad((dT - 0.7) / 0.3);
        dAlpha *= masterAlpha * 0.7;
        if (dAlpha < 0.01) continue;

        ctx.globalAlpha = dAlpha;

        const dr = d.r * d.depth;
        ctx.beginPath();
        ctx.arc(x + d.ox, y + d.oy, dr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  /* ---- Screen shake ---- */
  getShake(now) {
    const age = now - this.born;
    if (age > this.shakeDur) return null;
    const d = 1 - age / this.shakeDur;
    const I = this.shakeI * d * d;
    return {
      x: (Math.random() - 0.5) * I * 2,
      y: (Math.random() - 0.5) * I * 2,
    };
  }
}

// ================================================================
//  REACT COMPONENT
// ================================================================
const HoliColorBomb = React.memo(() => {
  const canvasRef    = useRef(null);
  const explosions   = useRef([]);
  const rafRef       = useRef(null);
  const runningRef   = useRef(false);
  const dprRef       = useRef(1);
  const [enabled, setEnabled] = useState(true);

  /* ---- Resize ---- */
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

  /* ---- Animation loop ---- */
  const loop = useCallback(() => {
    const c = canvasRef.current;
    if (!c) { runningRef.current = false; return; }
    const ctx = c.getContext("2d");
    const dpr = dprRef.current;
    const now = performance.now();

    // Clear
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Screen shake aggregate
    let sx = 0, sy = 0;
    for (const e of explosions.current) {
      const sh = e.getShake(now);
      if (sh) { sx += sh.x; sy += sh.y; }
    }
    sx = Math.max(-6, Math.min(6, sx));
    sy = Math.max(-6, Math.min(6, sy));
    if (sx || sy) { ctx.save(); ctx.translate(sx, sy); }

    // Update + draw
    const alive = [];
    for (const e of explosions.current) {
      e.update(now);
      if (!e.dead) {
        e.draw(ctx);
        alive.push(e);
      }
    }
    explosions.current = alive;

    if (sx || sy) ctx.restore();

    if (explosions.current.length > 0) {
      rafRef.current = requestAnimationFrame(loop);
    } else {
      runningRef.current = false;
    }
  }, []);

  /* ---- Click / touch handler ---- */
  const handleInteraction = useCallback(
    (e) => {
      if (!enabled) return;
      let px, py;
      if (e.touches && e.touches.length > 0) {
        px = e.touches[0].clientX;
        py = e.touches[0].clientY;
      } else {
        px = e.clientX;
        py = e.clientY;
      }

      // Enforce max concurrent
      if (explosions.current.length >= MAX_EXPLOSIONS) {
        explosions.current.shift();
      }
      explosions.current.push(
        new Explosion(px, py, window.innerWidth, window.innerHeight)
      );

      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(loop);
      }
    },
    [enabled, loop]
  );

  /* ---- Lifecycle ---- */
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
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
      {/* Floating circle toggle button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEnabled((p) => !p);
        }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 100000,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          color: "#fff",
          background: enabled
            ? "linear-gradient(135deg, #D500F9, #FF6D00)"
            : "rgba(255,255,255,0.15)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: enabled
            ? "0 4px 20px rgba(213,0,249,0.45), 0 0 0 3px rgba(255,255,255,0.1)"
            : "0 2px 12px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.06)",
          transition: "all 0.3s ease, transform 0.2s ease",
          transform: enabled ? "scale(1)" : "scale(0.9)",
        }}
        aria-label={enabled ? "Disable Holi Effect" : "Enable Holi Effect"}
        title={enabled ? "Holi: ON — Click to turn off" : "Holi: OFF — Click to turn on"}
      >
        <span
          style={{
            fontSize: 24,
            lineHeight: 1,
            filter: enabled ? "none" : "grayscale(1) opacity(0.5)",
            transition: "filter 0.3s ease",
          }}
          role="img"
          aria-label="holi"
        >
          {"🎨"}
        </span>
      </button>
    </>
  );
});

HoliColorBomb.displayName = "HoliColorBomb";
export default HoliColorBomb;
