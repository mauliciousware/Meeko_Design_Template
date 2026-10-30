"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./middle-sections.module.css";

const testimonials = [
  {
    name: "Daniel Foster",
    role: "Startup Founder",
    quote: "I’ve worked with many designers before, but this experience was on another level. The attention to detail and thoughtful approach made the process smooth and enjoyable.",
  },
  {
    name: "Natalie Brooks",
    role: "Marketing Manager",
    quote: "From the very beginning the collaboration felt effortless. Every idea was carefully refined into something meaningful, and the final result was exactly what we hoped for.",
  },
  {
    name: "Ethan Caldwell",
    role: "Product Director",
    quote: "I wasn’t sure what to expect at first, but everything turned out better than expected. Communication was clear, timelines were respected, and the final result felt modern.",
  },
];

const processSteps = [
  {
    title: "Problem Framing",
    description: "I explore insights, and market context to clearly define the problem. Research findings are translated into ideas that shape direction, inform decisions, and establish a strong foundation for the project.",
  },
  {
    title: "Shaping the Idea",
    description: "Here, I refine initial ideas into clear concepts by aligning strategy and creativity. I develop structural directions that balance innovation with feasibility, while supporting both brand goals and user expectations.",
  },
  {
    title: "Testing the Experience",
    description: "In this phase, I bring concepts to life through prototyping and real-world testing. I validate functionality, usability, and clarity by iterating on feedback, refining details, and resolving issues before final delivery.",
  },
  {
    title: "Polishing the Outcome",
    description: "In the final stage of design, thorough attention is given to refine the product, ensuring it meets high standards of quality and functionality through testing, tweaking, and iteration to address any remaining issues.",
  },
];

const statistics = [
  ["98%", "Satisfied happy customers"],
  ["15", "Years of work experience"],
  ["80+", "Successful projects done"],
  ["10+", "Design awards received"],
  ["45", "Travelled around the country"],
];

export function MiddleSections() {
  const [selected, setSelected] = useState(1);
  const stack = useRef<HTMLDivElement>(null);
  const testimonial = testimonials[selected];

  useEffect(() => {
    const cards = Array.from(stack.current?.querySelectorAll<HTMLElement>("[data-process-card]") ?? []);
    const desktop = window.matchMedia("(min-width: 1300px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      cards.forEach((card, index) => {
        const content = card.firstElementChild as HTMLElement | null;
        if (!content) return;
        if (!desktop.matches || reducedMotion.matches) {
          content.style.transform = "none";
          return;
        }
        const next = cards[index + 1];
        const progress = next ? Math.max(0, Math.min(1, (500 - next.getBoundingClientRect().top) / 320)) : 0;
        content.style.transform = `scale(${1 - progress * 0.065})`;
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <>
      <section className={styles.testimonials} aria-label="Client testimonials">
        <div className={styles.testimonialInner}>
          <Image src="/sites/meeko/quote.svg" alt="" width={35} height={25} />
          <div className={styles.testimonialText} aria-live="polite" aria-atomic="true">
            <blockquote className={styles.quote} key={testimonial.name}>“{testimonial.quote}”</blockquote>
            <div className={styles.author}>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.role}</p>
            </div>
          </div>
          <div className={styles.avatars} aria-label="Choose a testimonial">
            {testimonials.map((person, index) => (
              <button
                key={person.name}
                type="button"
                className={styles.avatar}
                aria-label={`Read testimonial from ${person.name}`}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <Image src={`/sites/meeko/testimonial-${index + 1}.jpg`} alt={person.name} width={80} height={80} />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.processSection} aria-labelledby="process-heading">
        <div className={styles.container}>
          <div className={styles.processLayout}>
            <div className={styles.processIntro}>
              <div className={styles.introText}>
                <h2 id="process-heading">High-quality work with real value considered.</h2>
                <p>My working process revolves around an approach aimed at maximizing productivity and creativity with clarity and focus. It begins with thorough research and planning, where I gather relevant information and outline key objectives.</p>
              </div>
              <a className="site-button" href="https://clear-spinosaurus-552655.framer.app/contact">Learn More</a>
            </div>
            <div className={styles.processCards} ref={stack}>
              {processSteps.map((step, index) => (
                <article className={styles.processCard} key={step.title} data-process-card>
                  <div className={styles.cardSurface}>
                    <div className={styles.cardTop}>
                      <div className={styles.iconCircle}>
                        <Image src={`/sites/meeko/process-${index + 1}.svg`} alt="" width={48} height={48} />
                      </div>
                      <span>(0{index + 1})</span>
                    </div>
                    <div className={styles.cardText}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className={styles.facts}>
            <div className={styles.factsIntro}>
              <h2>My numbers say it all</h2>
              <p>These numbers reflect the <strong>experience</strong> and <strong>consistency</strong>, and measurable impact behind the work I’ve delivered over the years.</p>
            </div>
            <div className={styles.statistics}>
              {statistics.map(([value, label]) => (
                <div className={styles.statistic} key={label}>
                  <span className={styles.number}>{value}</span>
                  <span className={styles.statisticLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
