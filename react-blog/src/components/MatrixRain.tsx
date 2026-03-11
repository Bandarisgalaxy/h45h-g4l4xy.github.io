"use client";
import { useEffect, useRef } from "react";

export default function MatrixRain({ opacity = 0.07 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "01アイウエオABCDEF!@#$%^&*()";
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array(cols).fill(1);

    const draw = () => {
      cols = Math.floor(canvas.width / fontSize);
      if (drops.length !== cols) drops = Array(cols).fill(1);
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px Roboto Mono`;
      ctx.globalAlpha = 0.6;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      ctx.globalAlpha = 1;
    };

    const id = setInterval(draw, 50);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
}
