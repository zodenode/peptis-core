"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type ContinuityCinemaPhase = {
  number: string;
  phase: string;
  need: string;
  action: string;
};

const phaseVisuals = [
  {
    image: "/peptis-glp-continuity-hero.webp",
    cue: "BASELINE",
    signal: "Map the starting point",
    tags: ["Goals", "Risks", "Baseline"],
  },
  {
    image: "/peptis-nutrition-ritual.webp",
    cue: "ADAPT",
    signal: "Make lower appetite workable",
    tags: ["Protein", "Fluids", "Tolerance"],
  },
  {
    image: "/peptis-strength-scene.webp",
    cue: "BUILD",
    signal: "Protect strength and function",
    tags: ["Train", "Recover", "Measure"],
  },
  {
    image: "/peptis-bridge-transition.webp",
    cue: "BRIDGE",
    signal: "Keep the system intact",
    tags: ["Navigate", "Monitor", "Escalate"],
  },
  {
    image: "/peptis-maintenance-routine.webp",
    cue: "MAINTAIN",
    signal: "Prepare before the transition",
    tags: ["Routine", "Readiness", "Follow-up"],
  },
] as const;

export function ContinuityCinema({ phases }: { phases: readonly ContinuityCinemaPhase[] }) {
  const [activePhase, setActivePhase] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const leadingEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (leadingEntry) {
          setActivePhase(Number((leadingEntry.target as HTMLElement).dataset.phaseIndex ?? 0));
        }
      },
      { rootMargin: "-22% 0px -34%", threshold: [0.2, 0.45, 0.7] },
    );

    chapterRefs.current.forEach((chapter) => chapter && observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  const activeVisual = phaseVisuals[activePhase] ?? phaseVisuals[0];
  const progress = ((activePhase + 1) / Math.max(phases.length, 1)) * 100;

  return (
    <div className="continuity-cinema" data-reveal>
      <div className="cinema-stage-shell">
        <div className="cinema-stage" aria-hidden="true">
          <div className="cinema-image-stack">
            {phaseVisuals.slice(0, phases.length).map((visual, index) => (
              <i
                className={index === activePhase ? "is-active" : ""}
                key={visual.cue}
                style={{ backgroundImage: `url(${visual.image})` }}
              />
            ))}
          </div>
          <div className="cinema-stage-scrim" />
          <div className="cinema-stage-header">
            <span>PEPTIS CONTINUITY · FIVE MOVEMENTS</span>
            <span>{String(activePhase + 1).padStart(2, "0")} / {String(phases.length).padStart(2, "0")}</span>
          </div>
          <div className="cinema-phase-dial">
            <svg viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" pathLength="100" />
              <circle
                className="cinema-phase-progress"
                cx="22"
                cy="22"
                r="18"
                pathLength="100"
                style={{ "--cinema-progress": progress } as CSSProperties}
              />
            </svg>
            <strong>{String(activePhase + 1).padStart(2, "0")}</strong>
          </div>
          <div className="cinema-stage-copy" key={activeVisual.cue}>
            <span>{activeVisual.cue}</span>
            <strong>{activeVisual.signal}</strong>
            <div>{activeVisual.tags.map((tag) => <b key={tag}>{tag}</b>)}</div>
          </div>
          <div className="cinema-stage-rail">
            {phases.map((phase, index) => (
              <button
                aria-label={`Go to phase ${index + 1}: ${phase.phase}`}
                aria-pressed={index === activePhase}
                className={index === activePhase ? "is-active" : ""}
                data-pressable
                key={phase.number}
                onClick={() => chapterRefs.current[index]?.scrollIntoView({
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                  block: "center",
                })}
                type="button"
              ><i /></button>
            ))}
          </div>
          <div className="cinema-scroll-cue"><i /><span>SCROLL THROUGH THE JOURNEY</span></div>
        </div>
      </div>

      <div className="cinema-chapters">
        {phases.map((phase, index) => {
          const visual = phaseVisuals[index] ?? phaseVisuals[0];
          return (
            <article
              className={`cinema-chapter ${index === activePhase ? "is-active" : ""}`}
              data-phase-index={index}
              key={phase.phase}
              ref={(node) => { chapterRefs.current[index] = node; }}
            >
              <div className="cinema-mobile-image" style={{ backgroundImage: `url(${visual.image})` }} aria-hidden="true">
                <span>{visual.cue}</span>
              </div>
              <div className="cinema-chapter-meta"><span>{phase.number}</span><i /><small>{visual.cue}</small></div>
              <h3>{phase.phase}</h3>
              <p>{phase.need}</p>
              <strong>{phase.action}</strong>
            </article>
          );
        })}
      </div>
    </div>
  );
}
