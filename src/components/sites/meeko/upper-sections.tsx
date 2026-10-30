"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DJScroll } from "./dj-scroll";
import styles from "./upper-sections.module.css";

const origin = "https://www.theknot.com/marketplace/dj-good-vibes-binghamton-ny-2098269";
const navigation = [["Home", "/"], ["Events", "#works"], ["The Process", "#process"], ["About Tyler", "#about"], ["Good Vibes", "#moments"], ["Contact", "#contact"]];
const information = [
  { title: "Your Event", text: "Your people. Your music. Your night.", icon: "record", href: "#works" },
  { title: "Meet Tyler", text: "The person behind the good vibes.", icon: "headphones", href: "#about" },
  { title: "Let’s Talk", text: "Let’s make your celebration happen.", icon: "microphone", href: "#contact" },
];
const projects = [
  { title: "Wedding celebrations", slug: "weddings", asset: "celebration", category: "Your day, your soundtrack", text: "From the first song to the last dance, let’s make the music feel like you. Share your favorites and we’ll plan a celebration with your people at its heart.", alt: "Guests gathered at a DJ Good Vibes celebration" },
  { title: "Private parties", slug: "parties", asset: "party", category: "Birthdays & milestones", text: "A birthday, a milestone, or a reason to get everyone together. Bring your favorite people and I’ll bring a set shaped around the occasion.", alt: "A private birthday celebration with DJ Good Vibes" },
  { title: "School dances", slug: "school", asset: "school", category: "Music & positive energy", text: "A room full of friends and a soundtrack to match. Thoughtful planning, quality sound, and music chosen for your crowd make the night feel special.", alt: "School dance setup by DJ Good Vibes" },
  { title: "Community events", slug: "community", asset: "community", category: "Good music, shared moments", text: "Bring the community together through music. From fundraisers to local celebrations, I help set the scene with sound, lighting, and a personal touch.", alt: "Community fundraiser for veterans with DJ Good Vibes" },
];

function Artwork({ name, width, height, className = "" }: {name: string; width: number; height: number; className?: string}) {
  return <Image src={`${["record", "headphones", "microphone"].includes(name) ? "/sites/tyler" : "/sites/meeko"}/${name}.svg`} alt="" width={width} height={height} className={className} unoptimized />;
}

export function UpperSections() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const stack = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      header.current?.style.setProperty("--header-top", `${Math.max(20, 40 - window.scrollY)}px`);
      const desktop = window.innerWidth >= 1300;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = reduced ? 1 : Math.min(1, Math.max(0, window.scrollY / 350));
      info.current?.style.setProperty("--spread", String(desktop ? progress : 1));
      const cards = stack.current?.querySelectorAll<HTMLElement>("article");
      cards?.forEach((card, index) => {
        const next = cards[index + 1];
        const overlap = next && desktop && !reduced ? Math.max(0, Math.min(1, (700 - next.getBoundingClientRect().top) / 540)) : 0;
        card.style.setProperty("--card-scale", String(1 - overlap * .05));
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const links = mobileNav.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        if (event.shiftKey && document.activeElement === menuButton.current) { event.preventDefault(); links[links.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === links[links.length - 1]) { event.preventDefault(); menuButton.current?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return <>
    {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    <header ref={header} className={styles.header}>
      <div className={styles.navbar}>
        <Link href="/" aria-label="Tyler home"><span className={styles.wordmark}>Tyler.</span></Link>
        <nav aria-label="Main navigation" className={styles.desktopNav}>{navigation.map(([name, href]) => <a key={name} href={href}><span>{name}</span></a>)}</nav>
        <div className={styles.socials}>{[["record", "https://linktr.ee/djgoodvibesny", "All DJ Good Vibes links"], ["headphones", "https://www.gigsalad.com/dj_good_vibes_binghamton", "GigSalad"], ["microphone", "https://www.facebook.com/p/DJ-Good-Vibes-61581679859264/", "Facebook"]].map(([name, href, label]) => <a href={href} key={name} aria-label={label}><Artwork name={name} width={18} height={18} /></a>)}</div>
        <button ref={menuButton} type="button" className={styles.menuButton} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><span className={menuOpen ? styles.menuClose : ""}><i /><i /></span></button>
      </div>
      {menuOpen && <nav ref={mobileNav} id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">{navigation.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>}
    </header>
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroInner}>
        <h1 id="hero-title"><span className={styles.firstLine}><span className={styles.hello}>Hello!</span><span className={styles.portrait}>{["portrait.png", "illuminated.jpg", "portrait.png"].map((photo, n) => <Image key={n} src={`/sites/tyler/${photo}`} alt="" width={105} height={105} priority />)}</span><span>I&apos;m Tyler,</span></span><span className={styles.secondLine}>your good-vibes DJ.</span></h1>
        <p>I bring <strong>good music</strong>, <strong>positive energy</strong>, and a <strong>personal touch</strong> to weddings, parties, and celebrations in Binghamton, New York.</p>
        <div className={styles.development} aria-hidden="true"><span>Good Music</span><Artwork name="sparkle" width={33} height={40} /><Artwork name="motion-lines" width={17} height={22} /></div>
        <Artwork name="headphones" width={76} height={76} className={styles.pen} />
        <Artwork name="microphone" width={46} height={74} className={styles.drink} />
        <div className={styles.noCode} aria-hidden="true"><span>Good Vibes Only</span><Artwork name="peace-hand" width={21} height={26} /><Artwork name="accent-lines" width={26} height={24} /></div>
      </div>
    </section>
    <section className={styles.infoSection} aria-label="Explore DJ Good Vibes">
      <div className={styles.infoBackground} />
      <div ref={info} className={styles.infoCards}>
        {information.map(item => <article className={styles.infoCard} key={item.title}>
          <span className={styles.recordNotes} aria-hidden="true"><i>♪</i><i>♫</i><i>♪</i></span>
          <Artwork name={item.icon} width={92} height={68} />
          <h3>{item.title}</h3><p>{item.text}</p>
          <a href={item.href} aria-label={item.title} className={styles.circleLink}><Artwork name="arrow" width={17} height={12} /></a>
        </article>)}
      </div>
    </section>
    <DJScroll />
    <section className={styles.portfolio} id="works" aria-labelledby="works-title">
      <div className="site-container">
        <div className={styles.sectionIntro}><h2 id="works-title">Good times, your way</h2><p>A personal soundtrack for your <strong>wedding</strong>, <strong>party</strong>, or <strong>celebration</strong>. Let’s make it one to remember.</p></div>
        <div ref={stack} className={styles.projectStack}>{projects.map(project => <article className={styles.project} key={project.slug}>
          <div className={styles.projectCopy}><h2>{project.title}</h2><p className={styles.category}>{project.category}</p><p className={styles.description}>{project.text}</p><a className="site-button" href={origin}>Plan Your Event</a></div>
          <a className={styles.projectImage} href={origin}><Image src={`/sites/tyler/${project.asset}.jpg`} alt={project.alt} width={1200} height={880} sizes="(min-width:1300px) 600px, (min-width:810px) 1000px, 100vw" /></a>
        </article>)}</div>
        <div className={styles.more}><p>Have something to celebrate?</p><a className="site-button" href={origin}>Let’s Talk Music</a></div>
      </div>
    </section>
  </>;
}
