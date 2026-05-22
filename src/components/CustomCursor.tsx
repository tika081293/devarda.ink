import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile touchscreens to avoid jumping or lagging layouts
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setHidden(false);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Dynamic hover effects when interacting with buttons/anchors
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.style.cursor === "pointer"
      ) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Inner Red Core dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-red-500 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      
      {/* Outer Golden/Red ambient tracking ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          clicked
            ? "w-6 h-6 bg-red-500/10 border border-red-500 scale-90"
            : isHoveringLink
            ? "w-9 h-9 bg-amber-500/5 border border-amber-400 scale-110"
            : "w-7 h-7 border border-amber-500/60"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
}
