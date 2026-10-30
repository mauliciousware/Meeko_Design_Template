/* eslint-disable @next/next/no-img-element -- Preserve the source's locally archived image assets and exact crops. */
import type { CSSProperties } from "react";
import styles from "./lower-sections.module.css";

const source = "https://clear-spinosaurus-552655.framer.app";
const assets = "/sites/meeko/";
const skills = [
  { name: "UI Design", value: 95, color: "#e3f2ff" },
  { name: "Web Design", value: 97, color: "#edf7c8" },
  { name: "Framer", value: 85, color: "#fae3f8" },
  { name: "Wordpress", value: 80, color: "#e3e3ff" },
  { name: "Photoshop", value: 90, color: "#e0f4ed" },
  { name: "Illustration", value: 65, color: "#ffecb2" },
];
const capabilities = ["Mobile Design", "UX & Product Design", "Identity & Branding", "Illustration", "Web Development", "Shopify Integration", "Digital Solutions"];
const posts = [
  { title: "Design choices that age well and the ones you will regret later.", description: "Useful takeaways for product and web design work. From layout rhythm to final finishing touches.", category: "Design", slug: "design-choices-that-age-well-and-the-ones-you-will-regret-later", image: "blog-design-choices.jpg" },
  { title: "Small design decisions that quietly change the entire experience.", description: "A curated mix of patterns I return to often. Use them to improve clarity, consistency, and flow.", category: "Illustration", slug: "small-design-decisions-that-quietly-change-the-entire-experience", image: "blog-small-decisions.jpg" },
];

function AvailabilityBadge({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`${styles.availability} ${footer ? styles.footerAvailability : ""}`} href={`${source}/contact`} aria-label="I am available for freelance work — contact me">
      <img className={styles.circularText} src={`${assets}availability-text.svg`} width="100" height="100" alt="" />
      <img className={styles.envelope} src={`${assets}envelope.svg`} width="28" height="19" alt="" />
    </a>
  );
}

export function LowerSections() {
  return (
    <>
      <section id="about" className={styles.about} aria-labelledby="about-heading">
        <div className={`site-container ${styles.aboutInner}`}>
          <div className={styles.aboutColumns}>
            <div className={styles.portrait}>
              <img className={styles.portraitPhoto} src={`${assets}about-portrait.jpg`} width="1120" height="1120" alt="Cheerful dreamy woman with bob hairstyle" loading="lazy" />
              <img className={styles.portraitOutline} src={`${assets}about-decoration.svg`} width="600" height="600" alt="" />
              <img className={styles.tape} src={`${assets}tape.svg`} width="247" height="62" alt="" />
              <AvailabilityBadge />
            </div>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <h2 id="about-heading" className={styles.heading}>Hey! That’s me.</h2>
                <p>I am Meeko, a multidisciplinary designer and blogger based in the vibrant city of Los Angeles. With a keen eye for aesthetics and a knack for innovative solutions, I thrive in the dynamic intersection of design.</p>
                <p>My journey in this dynamic and ever-evolving field has been a testament to my unwavering passion for meticulously crafting meaningful user experiences, leveraging cutting-edge technologies, and fearlessly pushing the boundaries of digital creativity.</p>
              </div>
              <div className={styles.skills}>
                {skills.map((skill) => (
                  <div className={styles.skill} key={skill.name}>
                    <div className={styles.skillLabel}><span>{skill.name}</span><span>{skill.value}%</span></div>
                    <div className={styles.skillTrack} role="meter" aria-label={skill.name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.value}>
                      <span style={{ "--skill-value": `${skill.value}%`, "--skill-color": skill.color } as CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.capabilities}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.heading}>My capabilities</h2>
              <p>The services I offer are meticulously crafted and tailored to cater specifically to your <strong>unique needs</strong> and <strong>requirements</strong>.</p>
            </div>
            <ul className={styles.capabilityList}>
              {capabilities.map((name, index) => <li key={name}><img src={`${assets}capability-${index + 1}.svg`} width="24" height="24" alt="" /><h3>{name}</h3></li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.blog} aria-labelledby="blog-heading">
        <div className={`site-container ${styles.blogInner}`}>
          <div className={styles.sectionIntro}>
            <h2 id="blog-heading" className={styles.heading}>From the blog</h2>
            <p>Here I share my insights as a freelancer, offering valuable <strong>tips</strong>, <strong>tricks</strong>, and <strong>experiences</strong> on navigating the freelancing landscape.</p>
          </div>
          <div className={styles.blogCards}>
            {posts.map((post, index) => (
              <a href={`${source}/blog/${post.slug}`} className={styles.post} key={post.slug}>
                <div className={styles.postImage}><img src={`${assets}${post.image}`} width="2400" height="1590" alt={`Blog image ${index + 1}`} loading="lazy" /><span aria-hidden="true">↗</span></div>
                <div className={styles.postContent}>
                  <div className={styles.postText}><h3>{post.title}</h3><p>{post.description}</p></div>
                  <div className={styles.postMeta}><time dateTime="2026-02-07">Feb 7, 2026</time><span aria-hidden="true" /><span>{post.category}</span></div>
                </div>
              </a>
            ))}
          </div>
          <a className="site-button" href={`${source}/contact`}>See All Posts</a>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={`site-container ${styles.footerInner}`}>
          <AvailabilityBadge footer />
          <div className={styles.footerMain}>
            <img className={styles.speech} src={`${assets}speech-bubble.svg`} width="79" height="61" alt="" />
            <div className={styles.footerText}>
              <h2>Let&apos;s talk about your project.</h2>
              <p>Got a project in mind? Let&apos;s create something great. We can transform that idea into real product.</p>
            </div>
            <div className={styles.contactButton}>
              <a className="site-button" href={`${source}/contact`}>Get in Touch</a>
              <div className={styles.annotation} aria-hidden="true"><img src={`${assets}curved-arrow.svg`} width="43" height="36" alt="" /><span>and make it<br />real together</span></div>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>© Meeko by <a href="https://framer.link/a3IT8z9">elemis</a>. Powered by Framer.</p>
            <nav aria-label="Footer navigation"><a href={`${source}/projects`}>Portfolio</a><a href="#about">About Me</a></nav>
          </div>
        </div>
      </footer>
    </>
  );
}
