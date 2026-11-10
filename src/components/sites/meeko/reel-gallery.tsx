"use client";

import { useEffect, useRef, useState } from "react";
import s from "./reel-gallery.module.css";

const base = process.env.NEXT_PUBLIC_PROMO_VIDEO_BASE_URL || "/Promo Videos";
const clips = [
  ["Jubel", "DJ Good Vibes - Reel 1 Jubel.mp4"],
  ["Reel one · alternate cut", "DJ Good Vibes - Reel 1.2.mp4"],
  ["Calabria", "DJ Good Vibes - Reel 2 Calabria.mp4"],
  ["Reel two · alternate cut", "DJ Good Vibes - Reel 2.2.mp4"],
  ["Bad Romance", "DJ Good Vibes - Reel 3 Bad Romance.mp4"],
  ["Reel three · alternate cut", "DJ Good Vibes - Reel 3.2.mp4"],
  ["The full promo", "Dj Good Vibe Revised Edit compressed.mp4"],
];
const previewStartSeconds = [2, 26, 6, 31, 8, 37, 10];
const order = [0, 2, 6, 4, 1, 3, 5];

export function ReelGallery() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const manualUntil = useRef(0);
  const [focused, setFocused] = useState(false);
  const running = visible && !paused && selected === null && !reduced;
  useEffect(() => {
    const node = section.current!;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    const load = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); load.disconnect(); }
    }, { rootMargin: "300px" });
    const watch = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    load.observe(node); watch.observe(node);
    return () => { load.disconnect(); watch.disconnect(); motion.removeEventListener("change", sync); };
  }, []);
  useEffect(() => {
    rail.current?.querySelectorAll("video").forEach(video => {
      if (near && running) void video.play().catch(() => {});
      else video.pause();
    });
  }, [near, running]);
  useEffect(() => {
    if (!running || focused) return;
    const node = rail.current!;
    const first = node.children[0] as HTMLElement;
    const repeat = node.children[order.length] as HTMLElement;
    let cycle = 0;
    const measure = () => {
      cycle = repeat.getBoundingClientRect().left - first.getBoundingClientRect().left;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    let frame = 0;
    let last = performance.now();
    let residue = 0;
    const tick = (now: number) => {
      if (cycle > 0 && now >= manualUntil.current) {
        const distance = Math.min(now - last, 64) * 0.058 + residue;
        residue = distance % 1;
        node.scrollLeft = (node.scrollLeft + Math.floor(distance)) % cycle;
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [running, focused]);
  return <section ref={section} className={s.section} aria-labelledby="reel-heading"><div className="site-container">
    <div className={s.heading}><div><h2 id="reel-heading">From the dance floor.</h2><p>Watch a night with DJ Good Vibes. Open a reel for the full video and sound.</p></div>
    <div className={s.controls}>{!reduced && <button onClick={() => setPaused(!paused)} aria-label={paused ? "Resume previews" : "Pause previews"}>{paused ? "▶" : "Ⅱ"}</button>}
    </div></div>
    <div ref={rail} className={s.rail} data-ready={near} onTouchMove={() => { manualUntil.current = performance.now() + 1000; }} onWheel={() => { manualUntil.current = performance.now() + 800; }} onFocus={e => setFocused(e.target.matches(":focus-visible"))} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
    {[...order, ...order].map((id, index) => <button key={index} tabIndex={index < order.length ? 0 : -1} aria-hidden={index >= order.length || undefined} className={s.card} data-wide={id===6} aria-label={'Watch '+clips[id][0]} onClick={() => {setSelected(id); dialog.current?.showModal();}}>
      <video muted playsInline loop preload="none" onLoadedMetadata={event => {
        const video = event.currentTarget;
        video.currentTime = previewStartSeconds[id] % video.duration;
      }} poster={near ? '/reel-previews/'+(id+1)+'.jpg' : undefined} src={near ? '/reel-previews/'+(id+1)+'.mp4?v=full' : undefined}/>
      <span className={s.caption}>{clips[id][0]}<b aria-hidden="true">↗</b></span>
    </button>)}</div></div>
    <dialog className={s.dialog} ref={dialog} aria-label={selected===null ? "Video viewer" : clips[selected][0]} onClose={() => setSelected(null)} onClick={e => {if(e.target===dialog.current) dialog.current.close();}}>
      {selected!==null && <><button autoFocus className={s.close} onClick={()=>dialog.current?.close()}>Close ×</button><video key={selected} controls autoPlay playsInline src={base.replace(/\/$/,"")+'/'+encodeURIComponent(clips[selected][1])}/></>}
    </dialog></section>;
}
