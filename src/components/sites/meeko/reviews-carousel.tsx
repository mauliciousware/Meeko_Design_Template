"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./reviews-carousel.module.css";

type Review = {
  name: string;
  rating: number;
  text?: { text: string };
  authorAttribution: { displayName: string; uri: string };
  googleMapsUri: string;
};
type Reviews = { rating: number; userRatingCount: number; googleMapsUri: string; reviews: Review[] };
const mapsUrl = "https://maps.google.com/?cid=2830253966827909521";

export function ReviewsCarousel() {
  const section = useRef<HTMLElement>(null);
  const [data, setData] = useState<Reviews | null>(null);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let requested = false;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting || requested) return;
      requested = true;
      fetch("/api/reviews", { signal: controller.signal })
        .then(response => {
          if (!response.ok) throw new Error("Reviews unavailable");
          return response.json();
        })
        .then(result => {
          if (!result.reviews?.length) throw new Error("No reviews");
          setData(result);
        })
        .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    }, { rootMargin: "150px" });
    observer.observe(section.current!);
    return () => { observer.disconnect(); controller.abort(); };
  }, []);

  return <section ref={section} id="reviews" className={styles.section} aria-labelledby="reviews-title">
    <div className={`site-container ${styles.heading}`}>
      <div><h2 id="reviews-title">Good music. Happy people.</h2>
        <p>{data ? `${data.rating.toFixed(1)} out of 5 · ${data.userRatingCount} ratings on Google Maps` : "A few words from the people behind the celebrations."}</p>
        <a href={data?.googleMapsUri || mapsUrl} target="_blank" rel="noreferrer">Read our reviews on Google Maps ↗</a>
      </div>
      {data && <button className={`site-button ${styles.pause}`} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume reviews" : "Pause reviews"}</button>}
    </div>
    {data ? <div className={styles.viewport}>
      <div className={styles.track} data-paused={paused || !visible || expanded !== null}>
        {[0, 1].map(copy => <div key={copy} className={styles.group} aria-hidden={copy === 1 || undefined}>
          {data.reviews.map(review => <article key={review.name} className={styles.card}>
            <div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.round(review.rating))}</div>
            <blockquote className={expanded === review.name ? styles.full : styles.quote}>{review.text?.text || "A star rating shared on Google Maps."}</blockquote>
            {review.text && review.text.text.length > 240 && <button tabIndex={copy ? -1 : 0} className={styles.readMore} aria-expanded={expanded === review.name} onClick={() => setExpanded(expanded === review.name ? null : review.name)}>{expanded === review.name ? "Show less" : "Read full review"}</button>}
            <div className={styles.author}><span className={styles.initial} aria-hidden="true">{review.authorAttribution.displayName.slice(0, 1)}</span><a tabIndex={copy ? -1 : 0} href={review.authorAttribution.uri} target="_blank" rel="noreferrer">{review.authorAttribution.displayName}</a></div>
            <a tabIndex={copy ? -1 : 0} className={styles.source} href={review.googleMapsUri} target="_blank" rel="noreferrer">Google Maps review ↗</a>
          </article>)}
        </div>)}
      </div>
    </div> : <p className={`site-container ${styles.status}`} role="status">{failed ? "Reviews are taking a little longer to load. You can read them on Google Maps." : "Loading Google reviews…"}</p>}
  </section>;
}
