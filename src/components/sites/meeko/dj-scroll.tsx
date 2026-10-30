"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./dj-scroll.module.css";

const moments = [
  { label: "01 / SET THE MOOD", title: "Every good night starts with a little anticipation.", text: "Your people arrive. Familiar faces, a favorite song, and that feeling that something good is about to happen.", photo: "celebration", caption: "Wedding celebrations" },
  { label: "02 / FIND THE GROOVE", title: "Then comes the song everybody knows.", text: "The shoulders start moving. Someone pulls a friend onto the floor. A birthday, a milestone, a room that’s finding its rhythm.", photo: "party", caption: "Parties & milestones" },
  { label: "03 / BRING THE ENERGY", title: "Different people. One dance floor.", text: "From school dances to community celebrations, the best part is seeing people share a moment through music.", photo: "community", caption: "Community celebrations" },
  { label: "04 / ONE MORE SONG", title: "The music stops. The good feeling stays.", text: "One last chorus with your favorite people. That’s the kind of night we’re here to create.", photo: "school", caption: "Music, memories & good company" },
];
const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function DJScroll() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const parts = (name: string) => Array.from(section.querySelectorAll<SVGElement>(`[data-motion="${name}"]`));
    const records = parts("record"), arms = parts("arm"), sliders = parts("slider"), pads = parts("pad"), speakers = parts("speaker"), notes = parts("note"), cables = parts("cable"), meters = parts("meter");
    const photos = Array.from(section.querySelectorAll<HTMLElement>("[data-photo]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const p = clamp((innerHeight * .35 - bounds.top) / (bounds.height - innerHeight * .65));
      const still = reduced.matches;
      const load = still ? 1 : clamp(p / .16);
      records.forEach((el, i) => {
        el.style.transform = `translate(${(1 - load) * (i ? 100 : -130)}px, ${(1 - load) * -210}px) rotate(${still ? 0 : p * (i ? -1080 : 1440)}deg)`;
        el.style.opacity = String(.15 + load * .85);
      });
      arms.forEach(el => { el.style.transform = `rotate(${still ? 19 : 19 * clamp((p - .1) / .1)}deg)`; });
      sliders.forEach((el, i) => { el.style.transform = `translateY(${still ? 0 : Math.sin(p * Math.PI * 8 + i * 1.8) * 19}px)`; });
      pads.forEach((el, i) => {
        const on = p > .16 && Math.sin(p * 65 + i * 2) > .25;
        el.style.opacity = still || on ? "1" : ".4";
        el.style.transform = `translateY(${!still && on ? 2 : 0}px)`;
      });
      speakers.forEach((el, i) => { el.style.transform = `scale(${still ? 1 : 1 + Math.sin(p * 90 + i) * .035 * load})`; });
      notes.forEach((el, i) => {
        const phase = (p * 3 + i / 5) % 1;
        el.style.transform = still ? "none" : `translate(${Math.sin(phase * Math.PI * 2 + i) * 15}px, ${-phase * 100}px) rotate(${Math.sin(phase * 6 + i) * 12}deg)`;
        el.style.opacity = still ? ".35" : String(Math.sin(phase * Math.PI) * load * .65);
      });
      cables.forEach(el => { el.style.transform = `translateY(${(1 - load) * 75}px)`; el.style.opacity = String(load); });
      meters.forEach((el, i) => { el.style.transform = `scaleY(${still ? .65 : .2 + Math.abs(Math.sin(p * 45 + i * .7)) * .8})`; });
      photos.forEach(el => {
        const y = el.getBoundingClientRect().top;
        el.style.transform = still ? "none" : `translateY(${Math.max(-18, Math.min(18, (innerHeight * .5 - y) * .045))}px)`;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, []);

  return <section ref={root} className={styles.section} aria-labelledby="dj-story-title">
    <div className={styles.heading}><span className={styles.eyebrow}>A LITTLE LOOK BEHIND THE MUSIC</span><h2 id="dj-story-title">Good vibes.<br />One record at a time.</h2><p>A few moments from the dance floor.<br />Keep scrolling. Let’s put a record on.</p></div>
    <div className={styles.layout}>
      <div className={styles.stories}>{moments.map(moment => <article className={styles.story} key={moment.label}>
        <span className={styles.eyebrow}>{moment.label}</span><h3>{moment.title}</h3><p>{moment.text}</p>
        <figure data-photo><Image src={`/sites/tyler/${moment.photo}.jpg`} alt={moment.caption} width={600} height={440} sizes="(max-width: 760px) 85vw, 35vw" /><figcaption>{moment.caption}<span aria-hidden="true">↗</span></figcaption></figure>
      </article>)}</div>
      <div className={styles.booth}><div className={styles.boothInner}>
        <div className={styles.deckLabel}><span>TYLER’S GOOD-VIBES MACHINE</span><span>EST. IN NY ↗</span></div>
        <Deck />
        <div className={styles.deckFooter}><span><i /> IN THE GROOVE</span><span>YOU SCROLL. WE SPIN.</span></div>
      </div></div>
    </div>
  </section>;
}

function Deck() {
  return <svg className={styles.art} viewBox="0 0 680 600" fill="none" aria-hidden="true">
    <ellipse cx="340" cy="510" rx="290" ry="28" fill="#1d1d1d" opacity=".06" />
    <g stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round">
      <g data-motion="cable"><path d="M120 380v100q0 30 40 30h30q40 0 40-30v-15M560 380v110q0 36-50 36h-30q-40 0-40-40v-20" strokeWidth="5" /><path d="M227 452h7v22h-7zM437 452h7v22h-7z" fill="var(--yellow)" /></g>
      {[52, 524].map((x, i) => <g key={x}>
        <rect x={x + 8} y="165" width="98" height="228" rx="15" fill="var(--ink)" />
        <rect x={x} y="158" width="98" height="228" rx="15" fill={i ? "var(--mint)" : "var(--blue)"} />
        <circle cx={x + 49} cy="207" r="20" fill="var(--ink)" /><circle cx={x + 49} cy="207" r="9" fill="var(--yellow)" />
        <g data-motion="speaker" style={{ transformOrigin: `${x + 49}px 306px` }}><circle cx={x + 49} cy="306" r="37" fill="var(--ink)" /><circle cx={x + 49} cy="306" r="28" stroke="#6e7f88" /><circle cx={x + 49} cy="306" r="15" fill={i ? "var(--mint)" : "var(--blue)"} /></g>
        <path d={`M${x + 38} 365h22`} strokeWidth="3" />
      </g>)}
      <rect x="89" y="285" width="506" height="184" rx="22" fill="var(--ink)" />
      <rect x="80" y="271" width="506" height="184" rx="22" fill="var(--blue)" />
      <rect x="94" y="285" width="478" height="155" rx="14" fill="#eff8ff" />
      {[201, 467].map((cx, i) => <g key={cx}>
        <circle cx={cx} cy="354" r="66" fill="#a6c8df" /><circle cx={cx} cy="354" r="60" fill="var(--ink)" />
        <g data-motion="record" style={{ transformOrigin: `${cx}px 354px` }}>
          <circle cx={cx} cy="354" r="57" fill="var(--ink)" />
          {[48, 42, 36, 30].map(r => <circle key={r} cx={cx} cy="354" r={r} stroke="#526575" strokeWidth=".8" />)}
          <path d={`M${cx - 44} 338a47 47 0 0 1 25-26M${cx + 44} 370a47 47 0 0 1-25 26`} stroke="#b9dfff" strokeWidth="3" />
          <circle cx={cx} cy="354" r="22" fill={i ? "var(--mint)" : "var(--yellow)"} /><path d={`M${cx - 13} 350h26M${cx - 8} 362h16`} strokeWidth="1" /><circle cx={cx} cy="354" r="3" fill="var(--ink)" />
        </g>
        <g data-motion="arm" style={{ transformOrigin: `${cx + 65}px 306px` }}><circle cx={cx + 65} cy="306" r="9" fill="var(--ink)" /><path d={`M${cx + 65} 306v55l-27 24`} stroke="var(--ink)" strokeWidth="7" /><path d={`M${cx + 65} 306v55l-27 24`} stroke="#fff" strokeWidth="3" /><path d={`m${cx + 40} 378-11 10 5 6 11-10z`} fill="var(--yellow)" /></g>
        <rect x={cx - 76} y="306" width="5" height="53" rx="2" fill="var(--ink)" /><rect data-motion="slider" x={cx - 81} y="329" width="15" height="8" rx="2" fill="white" />
        <rect data-motion="pad" x={cx - 76} y="405" width="20" height="12" rx="3" fill="var(--mint)" /><circle cx={cx - 41} cy="422" r="5" fill="var(--yellow)" />
      </g>)}
      <rect x="289" y="289" width="89" height="145" rx="8" fill="var(--ink)" />
      {[308, 332, 356].map((x, i) => <g key={x}><circle cx={x} cy="306" r="6" fill={i === 1 ? "var(--yellow)" : "var(--blue)"} /><path d={`M${x} 301v4`} /><path d={`M${x} 328v47`} stroke="#a5bac8" /><rect data-motion="slider" x={x - 6} y="347" width="12" height="7" rx="1" fill="var(--mint)" /></g>)}
      {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} data-motion="meter" x={302 + i * 11} y="387" width="6" height="18" rx="1" fill={i > 3 ? "var(--yellow)" : "var(--mint)"} stroke="none" style={{ transformOrigin: `${305 + i * 11}px 405px` }} />)}
      {[0, 1, 2, 3].map(i => <rect key={i} data-motion="pad" x={300 + i * 18} y="413" width="13" height="10" rx="2" fill={i % 2 ? "var(--yellow)" : "var(--pink)"} stroke="none" />)}
      <path d="M107 468v10h29v-10m399 0v10h29v-10" fill="var(--ink)" />
      {[{ x: 160, y: 160 }, { x: 320, y: 210 }, { x: 490, y: 140 }, { x: 255, y: 115 }, { x: 430, y: 225 }].map(({ x, y }, i) => <g key={i} data-motion="note" strokeWidth="2.5" strokeLinecap="round"><path d={`M${x} ${y}v-27l16-5v26m-16-20 16-5`} /><ellipse cx={x - 5} cy={y} rx="5" ry="3" fill={i % 2 ? "var(--mint)" : "var(--yellow)"} /><ellipse cx={x + 11} cy={y - 6} rx="5" ry="3" fill="var(--blue)" /></g>)}
      <path d="m40 432 8-4m-2 21 10-1m550-25 10 5m-12 12 12 1" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <text x="334" y="551" textAnchor="middle" fill="var(--ink)" fontSize="11" fontFamily="inherit" letterSpacing="3">GOOD MUSIC. GOOD PEOPLE.</text>
  </svg>;
}
