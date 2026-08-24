"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";

type ProblemSolutionPair = {
  number: string;
  problem: string;
  evidence: string;
  solution: string;
  label: string;
};

const articleRoutes = [
  "/blog/does-ozempic-cause-muscle-loss",
  "/blog/how-much-protein-on-glp-1",
  "/blog/two-day-glp-1-strength-plan",
  "/blog/glp-1-low-appetite-food-plan",
  "/blog/ozempic-face-loose-skin-science",
  "/blog/what-happens-after-stopping-semaglutide",
] as const;

export function ProblemSolutionTheatre({
  pairs,
  mode = "recomposition",
}: {
  pairs: readonly ProblemSolutionPair[];
  mode?: "recomposition" | "continuity";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveSelection(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % pairs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + pairs.length) % pairs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = pairs.length - 1;

    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  const progress = ((activeIndex + 1) / Math.max(pairs.length, 1)) * 100;

  return (
    <div className={`problem-solution-theatre ${mode}`} data-reveal>
      <div className="theatre-index" role="tablist" aria-label="Choose a Peptis problem and response">
        {pairs.map((pair, index) => (
          <button
            aria-controls={`problem-panel-${mode}-${index}`}
            aria-selected={index === activeIndex}
            className={index === activeIndex ? "is-active" : ""}
            data-pressable
            id={`problem-tab-${mode}-${index}`}
            key={pair.number}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => moveSelection(event, index)}
            ref={(node) => { tabRefs.current[index] = node; }}
            role="tab"
            tabIndex={index === activeIndex ? 0 : -1}
            type="button"
          >
            <span>{pair.number}</span>
            <strong>{pair.label.split("→")[0]?.trim()}</strong>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="theatre-stage">
        <div className="theatre-stage-progress" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
        {pairs.map((pair, index) => (
          <article
            aria-labelledby={`problem-tab-${mode}-${index}`}
            className="theatre-panel"
            hidden={index !== activeIndex}
            id={`problem-panel-${mode}-${index}`}
            key={pair.number}
            role="tabpanel"
          >
            <div className="theatre-map" aria-hidden="true">
              <div className="theatre-node problem-node"><span>PROBLEM</span><strong>{pair.number}</strong></div>
              <div className="theatre-connector"><i /><b>evidence</b></div>
              <div className="theatre-node response-node"><span>RESPONSE</span><strong>↗</strong></div>
              <div className="theatre-orbits"><i /><i /><i /></div>
            </div>

            <div className="theatre-copy">
              <div className="theatre-meta"><span>{pair.label}</span><b>{String(index + 1).padStart(2, "0")} / {String(pairs.length).padStart(2, "0")}</b></div>
              <h3>{pair.problem}</h3>
              <div className="theatre-evidence"><span>WHAT THE EVIDENCE SAYS</span><p>{pair.evidence}</p></div>
              <div className="theatre-response"><span>THE PEPTIS RESPONSE</span><strong>{pair.solution}</strong></div>
              <div className="theatre-actions">
                <Link data-pressable href={articleRoutes[index] ?? "/blog"}>Read the full guide <span>↗</span></Link>
                <Link href={mode === "continuity" ? "#founding-list" : "/?start=1"}>{mode === "continuity" ? "Join continuity" : "Build my plan"}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
