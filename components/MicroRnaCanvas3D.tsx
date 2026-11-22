"use client";

import { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
  type: "backbone" | "base" | "loop" | "aura";
  strand?: number;
  pairIndex?: number;
}

interface MicroRnaCanvas3DProps {
  scrollProgress: number; // 0 to 1
  theme?: "light" | "dark";
}

export function MicroRnaCanvas3D({ scrollProgress, theme = "light" }: MicroRnaCanvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // COLORS OF STRUCTURE POINTS: RED AND BLUE (Rojo y Azul)
    const colorBlue = "#0052FF";     // Electric Royal Blue
    const colorRed = "#EF4444";      // Vivid Crimson Red
    const colorBlueSoft = "#38BDF8"; // Ice Blue connecting link
    const colorRedSoft = "#F87171";  // Rose Red connecting link

    const points: Point3D[] = [];
    const stemLength = 36;
    const helixRadius = 54;
    const pitch = 14;

    // Stem: Two complementary helical strands (Strand 1 Blue, Strand 2 Red)
    for (let i = 0; i < stemLength; i++) {
      const angle = i * 0.44;
      const y = (i - stemLength / 2) * pitch;

      // Strand 1: Pure Blue
      points.push({
        x: Math.cos(angle) * helixRadius,
        y: y,
        z: Math.sin(angle) * helixRadius,
        baseX: Math.cos(angle) * helixRadius,
        baseY: y,
        baseZ: Math.sin(angle) * helixRadius,
        color: colorBlue,
        size: 3.4,
        type: "backbone",
        strand: 1,
        pairIndex: i,
      });

      // Strand 2: Pure Red
      points.push({
        x: Math.cos(angle + Math.PI) * helixRadius,
        y: y,
        z: Math.sin(angle + Math.PI) * helixRadius,
        baseX: Math.cos(angle + Math.PI) * helixRadius,
        baseY: y,
        baseZ: Math.sin(angle + Math.PI) * helixRadius,
        color: colorRed,
        size: 3.4,
        type: "backbone",
        strand: 2,
        pairIndex: i,
      });

      // Hydrogen-bonding base pairs bridging Blue & Red strands
      for (let s = 1; s <= 3; s++) {
        const factor = s / 4;
        const bx = Math.cos(angle) * helixRadius * (1 - factor) + Math.cos(angle + Math.PI) * helixRadius * factor;
        const bz = Math.sin(angle) * helixRadius * (1 - factor) + Math.sin(angle + Math.PI) * helixRadius * factor;
        points.push({
          x: bx,
          y: y,
          z: bz,
          baseX: bx,
          baseY: y,
          baseZ: bz,
          color: s <= 2 ? colorBlueSoft : colorRedSoft,
          size: 2.0,
          type: "base",
          pairIndex: i,
        });
      }
    }

    // Terminal Hairpin Loop (Connecting Blue strand to Red strand)
    const loopSteps = 22;
    const apexY = (stemLength / 2) * pitch;
    const loopRadius = helixRadius * 0.95;
    for (let j = 0; j <= loopSteps; j++) {
      const theta = (j / loopSteps) * Math.PI;
      const lx = Math.cos(theta) * loopRadius;
      const ly = apexY + Math.sin(theta) * loopRadius * 1.25;
      const lz = Math.sin(theta * 2) * 16;

      points.push({
        x: lx,
        y: ly,
        z: lz,
        baseX: lx,
        baseY: ly,
        baseZ: lz,
        color: j <= loopSteps / 2 ? colorBlue : colorRed,
        size: 3.4,
        type: "loop",
      });
    }

    // Molecular Aura: Blue and Red particles
    for (let k = 0; k < 140; k++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * stemLength * pitch * 1.35;
      const rad = helixRadius * 1.15 + Math.random() * 45;
      points.push({
        x: Math.cos(u) * rad,
        y: v,
        z: Math.sin(u) * rad,
        baseX: Math.cos(u) * rad,
        baseY: v,
        baseZ: Math.sin(u) * rad,
        color: k % 2 === 0 ? colorBlue : colorRed,
        size: Math.random() * 2.2 + 1.2,
        type: "aura",
      });
    }

    let baseTime = 0;

    const render = () => {
      baseTime += 0.014;
      ctx.clearRect(0, 0, width, height);

      const prog = scrollRef.current;
      const rotY = baseTime * 0.4 + prog * Math.PI * 3.2;
      const rotX = Math.sin(baseTime * 0.25) * 0.15 + (prog - 0.5) * 0.85;
      // Tilted ~22 degrees (-0.38 rad) to the left
      const rotZ = -0.38 + Math.cos(baseTime * 0.2) * 0.08 + prog * 0.5;
      const expansion = Math.sin(prog * Math.PI) * 1.25;

      const fov = 440;
      const cameraZ = 390 - prog * 70;
      const panY = (prog - 0.5) * 40;

      // 3D RENDER POSITION: Shifted slightly to the right (X axis) and restored Y axis
      const isDesktop = width >= 768;
      const centerX = width >= 1024 ? width * 0.67 : isDesktop ? width * 0.64 : width * 0.56;
      const centerY = height * 0.56;

      const projected = points.map((p) => {
        const wave = Math.sin(baseTime * 2 + p.baseY * 0.03) * 4;
        let px = p.baseX + wave;
        let py = p.baseY;
        let pz = p.baseZ;

        if (p.type === "backbone" || p.type === "base") {
          px *= 1 + expansion * 0.25;
          pz *= 1 + expansion * 0.25;
        }

        // 3D Rotations
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y1 = py * cosX - pz * sinX;
        const z1 = py * sinX + pz * cosX;

        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x2 = px * cosY + z1 * sinY;
        const z2 = -px * sinY + z1 * cosY;

        const cosZ = Math.cos(rotZ);
        const sinZ = Math.sin(rotZ);
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ + panY;

        const totalZ = z2 + cameraZ;
        const scale = fov / Math.max(totalZ, 50);
        const screenX = x3 * scale + centerX;
        const screenY = y3 * scale + centerY;
        const alpha = Math.min(Math.max((totalZ / 600) * 0.95, 0.35), 1);

        return {
          screenX,
          screenY,
          scale,
          totalZ,
          alpha,
          color: p.color,
          size: Math.max(p.size * scale, 1.0),
          type: p.type,
        };
      });

      projected.sort((a, b) => b.totalZ - a.totalZ);

      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        if (pt.screenX < -20 || pt.screenX > width + 20 || pt.screenY < -20 || pt.screenY > height + 20) {
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.screenX, pt.screenY, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.fill();

        if (pt.size > 2.5) {
          ctx.beginPath();
          ctx.arc(pt.screenX, pt.screenY, pt.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha * 0.18;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full pointer-events-none block"
      style={{ willChange: "transform" }}
    />
  );
}
