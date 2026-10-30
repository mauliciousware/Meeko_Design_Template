/* eslint-disable @next/next/no-img-element -- Preserve the source's locally archived image assets and exact crops. */
import type { CSSProperties } from "react";
import styles from "./lower-sections.module.css";

const source = "https://www.theknot.com/marketplace/dj-good-vibes-binghamton-ny-2098269";
const assets = "/sites/meeko/";
const skills = [
  { name: "Disco & funk", value: 95, color: "#b9dfff" },
  { name: "Pop favorites", value: 97, color: "#c8edb3" },
  { name: "House & dance", value: 85, color: "#bcecec" },
  { name: "Old-school classics", value: 80, color: "#c5dcff" },
  { name: "Your must-plays", value: 90, color: "#b8edd5" },
  { name: "Something new", value: 65, color: "#ffe397" },
];
const capabilities = ["Wedding DJ", "Private Parties", "MC Services", "Custom Playlists", "Sound & Lighting", "School Dances", "Community Events"];
const posts = [
  { title: "A little light. A lot of personality.", description: "Meet the signature jacket and bow tie that bring an extra spark to the celebration.", category: "Behind the decks", slug: "signature-style", image: "illuminated.jpg", href: "https://www.facebook.com/p/DJ-Good-Vibes-61581679859264/" },
  { title: "Your people, together in one place.", description: "Good music and a room full of familiar faces. Take a look at DJ Good Vibes in action.", category: "Real celebrations", slug: "celebrations", image: "celebration.jpg", href: "https://www.gigsalad.com/dj_good_vibes_binghamton" },
];

function AvailabilityBadge({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`${styles.availability} ${footer ? styles.footerAvailability : ""}`} href={source} aria-label="Ask about your event date">
      <img className={styles.circularText} src="/sites/tyler/availability-text.svg" width="100" height="100" alt="" />
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
              <img className={styles.portraitPhoto} src="/sites/tyler/portrait.png" width="1120" height="1120" alt="Tyler, known as DJ Good Vibes, in his illuminated bow tie" loading="lazy" />
              <img className={styles.portraitOutline} src={`${assets}about-decoration.svg`} width="600" height="600" alt="" />
              <img className={styles.tape} src={`${assets}tape.svg`} width="247" height="62" alt="" />
              <AvailabilityBadge />
            </div>
            <div className={styles.aboutContent}>
              <div className={styles.aboutText}>
                <h2 id="about-heading" className={styles.heading}>Hey! That’s me.</h2>
                <p>I’m Tyler, also known as Ty and DJ Good Vibes, based in Binghamton, New York. Music has always been a big part of my life, from disco and funk at family parties to discovering house music behind the decks.</p>
                <p>That love of music became a way to share positive energy. Whether it’s a wedding or a birthday, I’m here to make it personal, get people together, and give everyone a reason to smile and dance.</p>
              </div>
              <div className={styles.skills}>
                {skills.map((skill) => (
                  <div className={styles.skill} key={skill.name}>
                    <div className={styles.skillLabel}><span>{skill.name}</span><span aria-hidden="true">♪</span></div>
                    <div className={styles.skillTrack} aria-hidden="true">
                      <span style={{ "--skill-value": `${skill.value}%`, "--skill-color": skill.color } as CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.capabilities}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.heading}>What I bring to the party</h2>
              <p>Music and a personal touch for your <strong>favorite people</strong> and <strong>big moments</strong>. Let’s find the right mix for your event.</p>
            </div>
            <ul className={styles.capabilityList}>
              {capabilities.map((name, index) => <li key={name}><img src={`/sites/tyler/${["record", "headphones", "microphone"][index % 3]}.svg`} width="24" height="24" alt="" /><h3>{name}</h3></li>)}
            </ul>
          </div>
        </div>
      </section>
      <section id="moments" className={styles.blog} aria-labelledby="blog-heading">
        <div className={`site-container ${styles.blogInner}`}>
          <div className={styles.sectionIntro}>
            <h2 id="blog-heading" className={styles.heading}>A little more good vibes</h2>
            <p>A few glimpses of the <strong>music</strong>, the <strong>people</strong>, and the <strong>personality</strong> behind DJ Good Vibes.</p>
          </div>
          <div className={styles.blogCards}>
            {posts.map((post) => (
              <a href={post.href} className={styles.post} key={post.slug}>
                <div className={styles.postImage}><img src={`/sites/tyler/${post.image}`} width="2400" height="1590" alt={post.title} loading="lazy" /><span aria-hidden="true">↗</span></div>
                <div className={styles.postContent}>
                  <div className={styles.postText}><h3>{post.title}</h3><p>{post.description}</p></div>
                  <div className={styles.postMeta}><span>DJ Good Vibes</span><span aria-hidden="true" /><span>{post.category}</span></div>
                </div>
              </a>
            ))}
          </div>
          <a className="site-button" href={source}>Plan Your Celebration</a>
        </div>
      </section>
      <footer id="contact" className={styles.footer}>
        <div className={`site-container ${styles.footerInner}`}>
          <AvailabilityBadge footer />
          <div className={styles.footerMain}>
            <img className={styles.speech} src={`${assets}speech-bubble.svg`} width="79" height="61" alt="" />
            <div className={styles.footerText}>
              <h2>Let&apos;s talk about your party.</h2>
              <p>Got a date in mind? Tell me what you’re celebrating. Let&apos;s bring your people together with music that feels like you.</p>
            </div>
            <div className={styles.contactButton}>
              <a className="site-button" href={source}>Get in Touch</a>
              <div className={styles.annotation} aria-hidden="true"><img src={`${assets}curved-arrow.svg`} width="43" height="36" alt="" /><span>and bring the<br />good vibes</span></div>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>© DJ Good Vibes. Binghamton, NY.</p>
            <nav aria-label="Footer navigation"><a href="https://linktr.ee/djgoodvibesny">All My Links</a><a href="#about">About Me</a></nav>
          </div>
        </div>
      </footer>
    </>
  );
}
