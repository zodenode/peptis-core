"use client";

import { useEffect, type CSSProperties } from "react";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function CinematicExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll, [data-reveal]"),
    );
    const parallaxTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const counterTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count-to]"),
    );
    const frames = new Set<number>();
    const depthCleanups = new Map<HTMLElement, () => void>();
    let revealOrder = revealTargets.length;
    let pressedTarget: HTMLElement | null = null;

    root.classList.add("cinematic-ready");
    revealTargets.forEach((target, index) => {
      target.style.setProperty("--reveal-order", String(index % 6));
      target.dataset.cinematicRevealBound = "true";
    });
    parallaxTargets.forEach((target) => { target.dataset.cinematicParallaxBound = "true"; });
    counterTargets.forEach((target) => { target.dataset.cinematicCounterBound = "true"; });

    const depthSelector = [
      ".research-card",
      ".system-card",
      ".contents-card",
      ".problem-solution-card",
      ".benefit-stat-grid article",
      ".article-card",
      ".article-quick-fact-grid article",
      ".proof-card",
      ".member-proof-grid article",
    ].join(",");

    function springDepthHome(target: HTMLElement) {
      let x = Number(target.dataset.depthX ?? 0);
      let y = Number(target.dataset.depthY ?? 0);
      let velocityX = 0;
      let velocityY = 0;
      let previous = performance.now();
      const stiffness = 235;
      const damping = 29;

      const settle = (now: number) => {
        const delta = Math.min((now - previous) / 1000, 0.032);
        previous = now;
        velocityX += (-stiffness * x - damping * velocityX) * delta;
        velocityY += (-stiffness * y - damping * velocityY) * delta;
        x += velocityX * delta;
        y += velocityY * delta;
        target.dataset.depthX = String(x);
        target.dataset.depthY = String(y);
        target.style.setProperty("--depth-x", x.toFixed(3));
        target.style.setProperty("--depth-y", y.toFixed(3));

        if (Math.abs(x) + Math.abs(y) + Math.abs(velocityX) + Math.abs(velocityY) > 0.02) {
          const frame = window.requestAnimationFrame(settle);
          frames.add(frame);
        } else {
          target.dataset.depthX = "0";
          target.dataset.depthY = "0";
          target.style.setProperty("--depth-x", "0");
          target.style.setProperty("--depth-y", "0");
        }
      };

      const frame = window.requestAnimationFrame(settle);
      frames.add(frame);
    }

    function bindDepth(target: HTMLElement) {
      if (reducedMotion || target.dataset.depthBound === "true") return;
      target.dataset.depthBound = "true";
      target.dataset.depthX = "0";
      target.dataset.depthY = "0";

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = target.getBoundingClientRect();
        const x = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
        const y = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
        target.dataset.depthX = String(x);
        target.dataset.depthY = String(y);
        target.style.setProperty("--depth-x", x.toFixed(3));
        target.style.setProperty("--depth-y", y.toFixed(3));
      };
      const onPointerLeave = () => springDepthHome(target);

      target.addEventListener("pointermove", onPointerMove);
      target.addEventListener("pointerleave", onPointerLeave);
      depthCleanups.set(target, () => {
        target.removeEventListener("pointermove", onPointerMove);
        target.removeEventListener("pointerleave", onPointerLeave);
      });
    }

    document.querySelectorAll<HTMLElement>(depthSelector).forEach(bindDepth);

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      const candidate = (event.target as Element | null)?.closest<HTMLElement>(
        "button:not(:disabled), a[href], summary, [data-pressable]",
      );
      if (!candidate) return;
      pressedTarget?.classList.remove("is-pointer-down");
      pressedTarget = candidate;
      candidate.classList.add("is-pointer-down");
    };

    const releasePress = () => {
      pressedTarget?.classList.remove("is-pointer-down");
      pressedTarget = null;
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", releasePress, { passive: true });
    window.addEventListener("pointercancel", releasePress, { passive: true });
    window.addEventListener("blur", releasePress);

    function animateCounter(target: HTMLElement) {
      if (target.dataset.counted === "true") return;
      target.dataset.counted = "true";
      const finalValue = Number(target.dataset.countTo ?? 0);
      const decimals = Number(target.dataset.countDecimals ?? 0);
      const prefix = target.dataset.countPrefix ?? "";
      const suffix = target.dataset.countSuffix ?? "";
      const started = performance.now();
      const duration = 1050;

      const tick = (now: number) => {
        const progress = clamp((now - started) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        target.textContent = `${prefix}${(finalValue * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1) {
          const frame = window.requestAnimationFrame(tick);
          frames.add(frame);
        }
      };

      const frame = window.requestAnimationFrame(tick);
      frames.add(frame);
    }

    function completeCounter(target: HTMLElement) {
      const finalValue = Number(target.dataset.countTo ?? 0);
      const decimals = Number(target.dataset.countDecimals ?? 0);
      const prefix = target.dataset.countPrefix ?? "";
      const suffix = target.dataset.countSuffix ?? "";
      target.dataset.counted = "true";
      target.textContent = `${prefix}${finalValue.toFixed(decimals)}${suffix}`;
    }

    if (reducedMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      counterTargets.forEach(completeCounter);
    }

    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const target = entry.target as HTMLElement;
              target.classList.add("is-visible");
              if (target.hasAttribute("data-count-to")) animateCounter(target);
              target.querySelectorAll<HTMLElement>("[data-count-to]").forEach(animateCounter);
              observer?.unobserve(target);
            });
          },
          { rootMargin: "0px 0px -12%", threshold: 0.14 },
        );

    revealTargets.forEach((target) => observer?.observe(target));
    counterTargets.forEach((target) => observer?.observe(target));

    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll, [data-reveal]").forEach((target) => {
        if (target.dataset.cinematicRevealBound === "true") return;
        target.dataset.cinematicRevealBound = "true";
        target.style.setProperty("--reveal-order", String(revealOrder % 6));
        revealOrder += 1;
        revealTargets.push(target);
        if (reducedMotion) target.classList.add("is-visible");
        else observer?.observe(target);
      });

      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((target) => {
        if (target.dataset.cinematicParallaxBound === "true") return;
        target.dataset.cinematicParallaxBound = "true";
        parallaxTargets.push(target);
      });

      document.querySelectorAll<HTMLElement>("[data-count-to]").forEach((target) => {
        if (target.dataset.cinematicCounterBound === "true") return;
        target.dataset.cinematicCounterBound = "true";
        counterTargets.push(target);
        if (reducedMotion) completeCounter(target);
        else observer?.observe(target);
      });

      document.querySelectorAll<HTMLElement>(depthSelector).forEach(bindDepth);
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      const documentHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const pageProgress = clamp(window.scrollY / documentHeight, 0, 1);
      root.style.setProperty("--page-progress", pageProgress.toFixed(4));
      root.classList.toggle("site-scrolled", window.scrollY > 24);

      if (!reducedMotion) {
        parallaxTargets.forEach((target) => {
          const rect = target.getBoundingClientRect();
          const localProgress = clamp(
            (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
            0,
            1,
          );
          target.style.setProperty("--parallax-y", `${(localProgress - 0.5) * 34}px`);
        });
      }
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", releasePress);
      window.removeEventListener("pointercancel", releasePress);
      window.removeEventListener("blur", releasePress);
      depthCleanups.forEach((cleanup) => cleanup());
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      root.classList.remove("cinematic-ready");
      root.classList.remove("site-scrolled");
    };
  }, []);

  return (
    <>
      <div className="cinematic-progress" aria-hidden="true"><span /></div>
      <div className="cinematic-grain" aria-hidden="true" />
    </>
  );
}

export function RecompositionHeroCluster() {
  return (
    <div className="hero-interface-cluster" data-reveal aria-hidden="true">
      <div className="interface-card interface-card-strength apple-material">
        <span><i className="interface-live-dot" />STRENGTH SIGNAL</span>
        <svg viewBox="0 0 170 58"><path d="M4 48 C25 44 30 35 50 38 S79 25 96 29 S128 12 166 8" /><circle cx="166" cy="8" r="4" /></svg>
        <strong>Capability, rising.</strong>
      </div>
      <div className="interface-card interface-card-rhythm apple-material"><i /><i /><i /><i /><span>4 nutrition anchors</span></div>
      <div className="interface-card interface-card-week apple-material"><span>YOUR SYSTEM</span><strong>12 weeks, mapped</strong><b>↗</b></div>
      <div className="interface-orbit" aria-hidden="true"><i /><i /><span>PLAN</span></div>
    </div>
  );
}

export function ContinuityHeroCluster() {
  return (
    <div className="continuity-interface-cluster" data-reveal aria-hidden="true">
      <div className="continuity-orbit"><i /><i /><i /><i /><i /><strong>CONTINUITY</strong></div>
      <div className="continuity-cluster-label apple-material"><span><i className="interface-live-dot" />SUPPORT STATUS</span><b>System stays active</b><small>Across starts, changes and maintenance</small></div>
    </div>
  );
}

export function CompositionStudyGraph() {
  return (
    <div className="motion-graph composition-study-graph" data-reveal role="img" aria-label="Animated stacked bar showing about 75 percent fat mass and 25 percent lean mass among weight lost in the substudy">
      <div className="graph-scale"><span>0</span><span>25</span><span>50</span><span>75</span><span>100%</span></div>
      <div className="composition-stack"><i className="fat-segment" /><i className="lean-segment" /></div>
      <div className="graph-legend"><span><i className="fat-key" />Fat mass · 75%</span><span><i className="lean-key" />Lean mass · 25%</span></div>
    </div>
  );
}

export function RegainStudyGraph() {
  return (
    <div className="motion-graph regain-study-graph" data-reveal role="img" aria-label="Animated line showing an initial weight-loss phase followed by regain of about two thirds of the prior loss during the extension">
      <svg viewBox="0 0 420 170" preserveAspectRatio="none">
        <defs><linearGradient id="regainFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d28c68" stopOpacity=".35" /><stop offset="1" stopColor="#d28c68" stopOpacity="0" /></linearGradient></defs>
        <path className="graph-grid-line" d="M10 40 H410 M10 85 H410 M10 130 H410" />
        <path className="regain-area" d="M10 28 C80 40 120 106 192 133 C258 151 305 104 410 75 L410 160 L10 160 Z" />
        <path className="regain-path" d="M10 28 C80 40 120 106 192 133 C258 151 305 104 410 75" />
        <circle className="regain-point point-one" cx="192" cy="133" r="6" />
        <circle className="regain-point point-two" cx="410" cy="75" r="6" />
      </svg>
      <div className="regain-labels"><span>Loss phase</span><span>Study support stopped</span><span>1-year extension</span></div>
    </div>
  );
}

export function TwelveWeekGraph() {
  return (
    <div className="motion-graph week-study-graph" data-reveal role="img" aria-label="Animated twelve-week programme timeline with four phases">
      <div className="week-track"><span /><i /><i /><i /><i /></div>
      <div className="week-phases"><span><b>1–2</b>Learn</span><span><b>3–6</b>Build</span><span><b>7</b>Recover</span><span><b>8–12</b>Progress</span></div>
    </div>
  );
}

export function TrialBars({
  treatment,
  comparator,
  treatmentLabel,
  comparatorLabel,
  inverted = false,
}: {
  treatment: number;
  comparator: number;
  treatmentLabel: string;
  comparatorLabel: string;
  inverted?: boolean;
}) {
  const maximum = Math.max(treatment, comparator) * 1.12;
  return (
    <div className={`trial-bars ${inverted ? "inverted" : ""}`} data-reveal aria-hidden="true">
      <div><span>{treatmentLabel}</span><i style={{ "--bar-size": `${(treatment / maximum) * 100}%` } as CSSProperties} /><b>{treatment}%</b></div>
      <div><span>{comparatorLabel}</span><i style={{ "--bar-size": `${(comparator / maximum) * 100}%` } as CSSProperties} /><b>{comparator}%</b></div>
    </div>
  );
}

export function SystemConstellation() {
  const nodes = ["ASSESS", "BUILD", "TRAIN", "RECOVER", "MEASURE"];
  return (
    <div className="system-constellation" data-reveal aria-hidden="true">
      <svg viewBox="0 0 900 250" preserveAspectRatio="none">
        <path d="M450 125 L92 48 M450 125 L268 212 M450 125 L450 24 M450 125 L632 212 M450 125 L808 48" />
      </svg>
      <strong>CONTINUITY</strong>
      {nodes.map((node, index) => <span key={node} style={{ "--node-index": index } as CSSProperties}>{node}</span>)}
    </div>
  );
}

export function EditorialSignal() {
  return (
    <div className="editorial-signal" data-reveal aria-hidden="true">
      <div className="signal-rings"><i /><i /><i /></div>
      <div className="signal-cards"><span>PRIMARY TRIALS</span><span>REAL LIMITS</span><span>USEFUL ACTION</span></div>
      <strong className="signal-core">EVIDENCE<br />IN CONTEXT</strong>
    </div>
  );
}
