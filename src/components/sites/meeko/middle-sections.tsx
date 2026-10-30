"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./middle-sections.module.css";

const testimonials = [
  { name: "Your soundtrack", role: "Music that feels like you", quote: "Your favorite songs and the memories that come with them belong at the heart of your celebration." },
  { name: "Your people", role: "Good energy for the whole room", quote: "From family favorites to a new discovery, a good night brings everyone into the moment." },
  { name: "Your celebration", role: "A little personality goes a long way", quote: "Thoughtful details, a light-up bow tie, and a personal touch make the experience feel your own." },
];
const processSteps = [
  { title: "Tell me your vision", description: "We start with your date, venue, and the celebration you have in mind. Tell me about your people and the feeling you want to create." },
  { title: "Find your soundtrack", description: "Share your favorites, your must-plays, and the songs you’d rather skip. I’ll shape a set around your taste, with room for requests along the way." },
  { title: "Plan the details", description: "We work through the timing, sound, and lighting together. Clear communication and a thoughtful setup keep the details in tune with your event." },
  { title: "Enjoy your people", description: "The plans become a celebration. I bring the music and positive energy so you can enjoy the moments you brought everyone together for." },
];
const statistics = [
  ["DJ", "Music chosen for your crowd"],
  ["MC", "A voice to guide the moments"],
  ["PA", "Quality sound for your event"],
  ["NY", "Based in Binghamton"],
  ["YOU", "At the heart of the playlist"],
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
      <section className={styles.testimonials} aria-label="The Good Vibes approach">
        <div className={styles.testimonialInner}>
          <Image src="/sites/meeko/quote.svg" alt="" width={35} height={25} />
          <div className={styles.testimonialText} aria-live="polite" aria-atomic="true">
            <p className={styles.quote} key={testimonial.name}>{testimonial.quote}</p>
            <div className={styles.author}>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.role}</p>
            </div>
          </div>
          <div className={styles.avatars} aria-label="Explore the Good Vibes approach">
            {testimonials.map((person, index) => (
              <button
                key={person.name}
                type="button"
                className={styles.avatar}
                aria-label={`Explore ${person.name}`}
                aria-pressed={selected === index}
                onClick={() => setSelected(index)}
              >
                <Image src={`/sites/tyler/${["record", "headphones", "microphone"][index]}.svg`} alt="" width={80} height={80} />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section id="process" className={styles.processSection} aria-labelledby="process-heading">
        <div className={styles.container}>
          <div className={styles.processLayout}>
            <div className={styles.processIntro}>
              <div className={styles.introText}>
                <h2 id="process-heading">A good night starts with a good plan.</h2>
                <p>From our first conversation to your last dance, we’ll keep things personal. We’ll talk music, work through the details, and make a plan that fits your celebration.</p>
              </div>
              <a className="site-button" href="#contact">Let’s Plan Together</a>
            </div>
            <div className={styles.processCards} ref={stack}>
              {processSteps.map((step, index) => (
                <article className={styles.processCard} key={step.title} data-process-card>
                  <div className={styles.cardSurface}>
                    <div className={styles.cardTop}>
                      <div className={styles.iconCircle}>
                        <Image src={`/sites/tyler/${["microphone", "record", "headphones", "record"][index]}.svg`} alt="" width={48} height={48} />
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
              <h2>A few things I bring along</h2>
              <p>A little <strong>planning</strong>, plenty of <strong>personality</strong>, and the right music for the people who matter to you.</p>
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
