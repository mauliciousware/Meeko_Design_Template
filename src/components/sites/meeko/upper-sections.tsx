"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./upper-sections.module.css";

const origin = "https://clear-spinosaurus-552655.framer.app";
const navigation = [["Home", "/"], ["Home II", `${origin}/home-2`], ["Home III", `${origin}/home-3`], ["Work I", `${origin}/projects`], ["Work II", `${origin}/projects-2`], ["Blog", `${origin}/blog`], ["Contact", `${origin}/contact`]];
const information = [
  { title: "My Portfolio", text: "Explore selected projects and my approach to design.", icon: "card-portfolio", href: `${origin}/projects` },
  { title: "About Me", text: "A closer look at my background, skills, and creative journey.", icon: "card-about", href: "#about" },
  { title: "Contact Me", text: "Let’s work together to bring your ideas and vision to life.", icon: "card-contact", href: `${origin}/contact` },
];
const projects = [
  { title: "The Big Shake", slug: "the-big-shake", asset: "project-big-shake", category: "Brand Design, Framer", text: "Built around clarity and consistency, this work defines a refined visual identity shaped by modern aesthetics and cohesive brand expression throughout.", alt: "Manage all your bills, accounts" },
  { title: "Transparent Things", slug: "transparent-things", asset: "project-transparent-things", category: "Web Design, Typography", text: "With an emphasis on precision and structure, this work brings clarity and modern aesthetics together within a consistent visual system framework.", alt: "I'm here to capture your memories" },
  { title: "Phantom Limb", slug: "phantom-limb", asset: "project-phantom-limb", category: "Logo Design, Wordpress", text: "By combining clarity with contemporary design thinking, the project delivers a considered visual identity with strong and consistent brand alignment.", alt: "We're a creative agency" },
  { title: "Heat Lightning", slug: "heat-lightning", asset: "project-heat-lightning", category: "Webflow, UX Design", text: "This project is driven by a refined design approach that balances clarity and intention with contemporary visuals and overall cohesive brand harmony.", alt: "Grow your business" },
];

function Artwork({ name, width, height, className = "" }: {name: string; width: number; height: number; className?: string}) {
  return <Image src={`/sites/meeko/${name}.svg`} alt="" width={width} height={height} className={className} unoptimized />;
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
        <Link href="/" aria-label="Meeko home"><Artwork name="logo" width={90} height={24} className={styles.logo} /></Link>
        <nav aria-label="Main navigation" className={styles.desktopNav}>{navigation.map(([name, href]) => <a key={name} href={href}><span>{name}</span></a>)}</nav>
        <div className={styles.socials}>{[["x", "https://x.com/elemisthemes", "X"], ["dribbble", "https://dribbble.com/elemis", "Dribbble"], ["instagram", "https://instagram.com/", "Instagram"]].map(([name, href, label]) => <a href={href} key={name} aria-label={label}><Artwork name={`social-${name}`} width={18} height={18} /></a>)}</div>
        <button ref={menuButton} type="button" className={styles.menuButton} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><span className={menuOpen ? styles.menuClose : ""}><i /><i /></span></button>
      </div>
      {menuOpen && <nav ref={mobileNav} id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">{navigation.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav>}
    </header>
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroInner}>
        <h1 id="hero-title"><span className={styles.firstLine}><span className={styles.hello}>Hello!</span><span className={styles.portrait}>{[1, 2, 3].map(n => <Image key={n} src={`/sites/meeko/hero-${n}.jpg`} alt="" width={105} height={105} priority />)}</span><span>I&apos;m Meeko,</span></span><span className={styles.secondLine}>a product designer.</span></h1>
        <p>I specialize in <strong>HTML</strong>, <strong>CSS</strong>, <strong>WordPress</strong>, and <strong>Framer</strong>, with a strong track record of converting designs into responsive websites.</p>
        <div className={styles.development} aria-hidden="true"><span>Web Development</span><Artwork name="sparkle" width={33} height={40} /><Artwork name="motion-lines" width={17} height={22} /></div>
        <Artwork name="pen" width={76} height={76} className={styles.pen} />
        <Artwork name="drink" width={46} height={74} className={styles.drink} />
        <div className={styles.noCode} aria-hidden="true"><span>No-code Design</span><Artwork name="peace-hand" width={21} height={26} /><Artwork name="accent-lines" width={26} height={24} /></div>
      </div>
    </section>
    <section className={styles.infoSection} aria-label="Explore Meeko">
      <div className={styles.infoBackground} />
      <div ref={info} className={styles.infoCards}>
        {information.map(item => <article className={styles.infoCard} key={item.title}>
          <Artwork name={item.icon} width={92} height={68} />
          <h3>{item.title}</h3><p>{item.text}</p>
          <a href={item.href} aria-label={item.title} className={styles.circleLink}><Artwork name="arrow" width={17} height={12} /></a>
        </article>)}
      </div>
    </section>
    <section className={styles.portfolio} id="works" aria-labelledby="works-title">
      <div className="site-container">
        <div className={styles.sectionIntro}><h2 id="works-title">My selected works</h2><p>With my keen eye for detail and sharp critical thinking skills, I specialize in crafting captivating <strong>websites</strong>, <strong>products</strong>, and <strong>experiences</strong>.</p></div>
        <div ref={stack} className={styles.projectStack}>{projects.map(project => <article className={styles.project} key={project.slug}>
          <div className={styles.projectCopy}><h2>{project.title}</h2><p className={styles.category}>{project.category}</p><p className={styles.description}>{project.text}</p><a className="site-button" href={`${origin}/projects/${project.slug}`}>View Project</a></div>
          <a className={styles.projectImage} href={`${origin}/projects/${project.slug}`}><Image src={`/sites/meeko/${project.asset}.jpg`} alt={project.alt} width={1200} height={880} sizes="(min-width:1300px) 600px, (min-width:810px) 1000px, 100vw" /></a>
        </article>)}</div>
        <div className={styles.more}><p>Are you ready to see more?</p><a className="site-button" href={`${origin}/projects`}>See All Works</a></div>
      </div>
    </section>
  </>;
}
