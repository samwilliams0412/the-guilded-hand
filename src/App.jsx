import { useState, useEffect } from "react";

const AMBER = "#C9A227";
const CREAM = "#F5F0E8";
const DARK = "#0A0A0A";
const CHARCOAL = "#1A1A1A";
const MID = "#2A2A2A";
const MUTED = "#6B6B6B";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0A0A0A; color: #F5F0E8; font-family: 'Inter', sans-serif; }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(10,10,10,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid #1E1E1E; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.05rem; letter-spacing: 0.15em; color: #C9A227; text-transform: uppercase; cursor: pointer; }
  .nav-links { display: flex; gap: 1.75rem; align-items: center; flex-wrap: wrap; }
  .nav-link { background: none; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.75rem; letter-spacing: 0.12em; color: #777; text-transform: uppercase; transition: color 0.2s; padding: 0; }
  .nav-link:hover, .nav-link.active { color: #F5F0E8; }
  .nav-link.gold { color: #C9A227; }
  .nav-cta { background: #C9A227; color: #0A0A0A; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.55rem 1.2rem; transition: background 0.2s; }
  .nav-cta:hover { background: #E8D5A3; }

  .page { min-height: 100vh; padding-top: 64px; }
  .section-label { font-size: 0.66rem; letter-spacing: 0.3em; color: #C9A227; text-transform: uppercase; margin-bottom: 1rem; }
  .section-rule { width: 50px; height: 1px; background: #C9A227; margin-bottom: 1.75rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 400; line-height: 1.15; margin-bottom: 1.25rem; }

  .hero { min-height: calc(100vh - 64px); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .hero-grid { position: absolute; inset: 0; opacity: 0.05; background-image: linear-gradient(#C9A227 1px, transparent 1px), linear-gradient(90deg, #C9A227 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
  .hero-inner { position: relative; z-index: 1; padding: 0 2rem; width: 100%; max-width: 860px; text-align: center; }
  .hero-ornament { width: 1px; height: 70px; background: #C9A227; margin: 0 auto 2rem; }
  .hero-eyebrow { font-size: 0.66rem; letter-spacing: 0.35em; color: #C9A227; text-transform: uppercase; margin-bottom: 1.25rem; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 7vw, 6rem); font-weight: 400; line-height: 1.02; margin-bottom: 1rem; }
  .hero-title em { font-style: italic; color: #C9A227; }
  .hero-sub { font-family: 'EB Garamond', serif; font-size: 1.2rem; color: #888; max-width: 500px; margin: 0 auto 2.5rem; line-height: 1.75; font-style: italic; }
  .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: #C9A227; color: #0A0A0A; border: none; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.85rem 2rem; transition: background 0.2s; }
  .btn-primary:hover { background: #E8D5A3; }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .btn-ghost { background: none; border: 1px solid #2A2A2A; color: #888; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.85rem 1.75rem; transition: all 0.2s; }
  .btn-ghost:hover { border-color: #C9A227; color: #C9A227; }

  .features { padding: 5rem 2rem; max-width: 1100px; margin: 0 auto; }
  .feat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: #161616; border: 1px solid #161616; margin-top: 3rem; }
  .feat-item { background: #1A1A1A; padding: 2.25rem 1.75rem; }
  .feat-num { font-family: 'Playfair Display', serif; font-size: 3rem; color: #222; line-height: 1; margin-bottom: 0.75rem; }
  .feat-name { font-size: 0.7rem; letter-spacing: 0.2em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.5rem; }
  .feat-desc { font-size: 0.83rem; color: #666; line-height: 1.7; }

  .ai-demo { background: #111; border-top: 1px solid #1A1A1A; border-bottom: 1px solid #1A1A1A; padding: 4rem 2rem; }
  .ai-demo-inner { max-width: 700px; margin: 0 auto; }
  .ai-output { margin-top: 2rem; border-left: 2px solid #C9A227; padding-left: 1.5rem; }
  .ai-output-label { font-size: 0.6rem; letter-spacing: 0.15em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.6rem; }
  .ai-output-text { font-family: 'EB Garamond', serif; font-size: 1.1rem; color: #F5F0E8; line-height: 1.85; }
  .ai-thinking { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.5rem; }
  .ai-dot { width: 6px; height: 6px; border-radius: 50%; background: #C9A227; animation: pulse 1.8s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
  .ai-thinking-text { font-size: 0.72rem; letter-spacing: 0.1em; color: #555; text-transform: uppercase; }

  /* LIBRARY */
  .library-page { padding: 3rem 2rem 5rem; max-width: 1050px; margin: 0 auto; }
  .library-gate { text-align: center; padding: 5rem 2rem; }
  .library-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px,1fr)); gap: 1px; background: #161616; border: 1px solid #161616; margin-top: 2.5rem; }
  .issue-card { background: #1A1A1A; padding: 1.75rem; cursor: pointer; transition: background 0.2s; border: 2px solid transparent; }
  .issue-card:hover { background: #202020; }
  .issue-card.active { border-color: #C9A227; }
  .issue-vol { font-size: 0.62rem; letter-spacing: 0.2em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.4rem; }
  .issue-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 500; line-height: 1.35; margin-bottom: 0.5rem; }
  .issue-date { font-size: 0.68rem; color: #555; letter-spacing: 0.08em; margin-bottom: 0.75rem; }
  .issue-tag-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .issue-tag { font-size: 0.58rem; letter-spacing: 0.12em; color: #666; text-transform: uppercase; background: #242424; padding: 0.2rem 0.5rem; }

  .issue-reader { background: #111; border: 1px solid #1E1E1E; margin-top: 2rem; }
  .reader-header { padding: 2rem 2.5rem 1.5rem; border-bottom: 1px solid #1A1A1A; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
  .reader-vol { font-size: 0.62rem; letter-spacing: 0.2em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.4rem; }
  .reader-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 400; line-height: 1.2; }
  .reader-meta { font-size: 0.65rem; color: #555; letter-spacing: 0.08em; margin-top: 0.4rem; }
  .article-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .article-card { padding: 1.75rem 2rem; border-right: 1px solid #1A1A1A; border-bottom: 1px solid #1A1A1A; }
  .article-card:nth-child(even) { border-right: none; }
  .article-card:nth-last-child(-n+2) { border-bottom: none; }
  .article-tag { font-size: 0.6rem; letter-spacing: 0.18em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.5rem; }
  .article-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 500; line-height: 1.4; margin-bottom: 0.5rem; }
  .article-excerpt { font-family: 'EB Garamond', serif; font-size: 0.92rem; color: #777; line-height: 1.7; margin-bottom: 0.6rem; }
  .article-commentary { background: #0D0D0D; border-left: 2px solid #C9A227; padding: 0.85rem 1.1rem; margin-top: 0.6rem; font-family: 'EB Garamond', serif; font-size: 0.88rem; color: #888; font-style: italic; line-height: 1.65; }
  .commentary-label { font-style: normal; font-family: 'Inter', sans-serif; font-size: 0.58rem; letter-spacing: 0.15em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.35rem; }
  .article-byline { font-size: 0.62rem; letter-spacing: 0.08em; color: #444; text-transform: uppercase; margin-top: 0.5rem; }
  .generating-badge { display: inline-flex; align-items: center; gap: 0.5rem; background: #161616; border: 1px solid #222; padding: 0.4rem 0.8rem; font-size: 0.62rem; letter-spacing: 0.12em; color: #555; text-transform: uppercase; }

  /* SUBSCRIBE */
  .sub-page { padding: 4rem 2rem; max-width: 480px; margin: 0 auto; }
  .sub-box { background: #1A1A1A; border: 1px solid #222; padding: 2.5rem; }
  .sub-price { font-family: 'Playfair Display', serif; font-size: 2.4rem; color: #C9A227; display: flex; align-items: baseline; gap: 0.4rem; margin-bottom: 0.4rem; }
  .sub-price span { font-size: 0.9rem; font-family: 'Inter', sans-serif; color: #555; }
  .sub-tagline { font-size: 0.75rem; color: #555; margin-bottom: 1.25rem; }
  .sub-perks { list-style: none; margin-bottom: 1.5rem; }
  .sub-perks li { font-size: 0.8rem; color: #888; padding: 0.3rem 0; display: flex; gap: 0.6rem; }
  .sub-perks li::before { content: '—'; color: #C9A227; flex-shrink: 0; }
  .input-field { width: 100%; background: #222; border: 1px solid #2E2E2E; color: #F5F0E8; font-family: 'Inter', sans-serif; font-size: 0.875rem; padding: 0.75rem 1rem; margin-bottom: 0.65rem; outline: none; }
  .input-field:focus { border-color: #C9A227; }
  .input-field::placeholder { color: #444; }
  .stripe-row { background: #222; border: 1px solid #2E2E2E; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem; }
  .success-box { text-align: center; }

  /* SPONSOR */
  .sponsor-page { padding: 4rem 2rem 6rem; max-width: 900px; margin: 0 auto; }
  .stat-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: #161616; border: 1px solid #161616; margin: 2.5rem 0; }
  .stat-cell { background: #1A1A1A; padding: 1.5rem; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #C9A227; }
  .stat-label { font-size: 0.66rem; letter-spacing: 0.12em; color: #555; text-transform: uppercase; margin-top: 0.25rem; }
  .tier-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: #161616; border: 1px solid #161616; margin: 2rem 0; }
  .tier-card { background: #1A1A1A; padding: 1.75rem; position: relative; }
  .tier-card.featured { background: #1B1900; border: 1px solid #C9A227; margin: -1px; z-index: 1; }
  .tier-badge { position: absolute; top: 0.85rem; right: 0.85rem; background: #C9A227; color: #0A0A0A; font-size: 0.52rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 0.2rem 0.5rem; font-weight: 600; }
  .tier-name { font-size: 0.64rem; letter-spacing: 0.22em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.6rem; }
  .tier-price { font-family: 'Playfair Display', serif; font-size: 2rem; color: #F5F0E8; margin-bottom: 0.25rem; }
  .tier-price sub { font-size: 0.85rem; color: #555; font-family: 'Inter', sans-serif; }
  .tier-desc { font-size: 0.78rem; color: #555; margin-bottom: 1.25rem; line-height: 1.6; }
  .tier-perks { list-style: none; }
  .tier-perks li { font-size: 0.76rem; color: #777; padding: 0.3rem 0; display: flex; gap: 0.5rem; border-bottom: 1px solid #1E1E1E; }
  .tier-perks li::before { content: '→'; color: #C9A227; flex-shrink:0; }
  .contact-form { background: #1A1A1A; border: 1px solid #1E1E1E; padding: 2.5rem; margin-top: 2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .form-group { margin-bottom: 0.75rem; }
  .form-label { display: block; font-size: 0.64rem; letter-spacing: 0.15em; color: #555; text-transform: uppercase; margin-bottom: 0.4rem; }
  .select-field { width: 100%; background: #222; border: 1px solid #2E2E2E; color: #F5F0E8; font-family: 'Inter', sans-serif; font-size: 0.85rem; padding: 0.75rem 1rem; outline: none; appearance: none; cursor: pointer; }
  .select-field:focus { border-color: #C9A227; }
  .textarea-field { width: 100%; background: #222; border: 1px solid #2E2E2E; color: #F5F0E8; font-family: 'EB Garamond', serif; font-size: 0.95rem; padding: 0.75rem 1rem; outline: none; resize: vertical; min-height: 110px; }
  .textarea-field:focus { border-color: #C9A227; }

  /* ABOUT */
  .about-page { padding: 4rem 2rem 6rem; max-width: 760px; margin: 0 auto; }
  .process-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; }
  .process-item { padding-left: 1.25rem; border-left: 1px solid #222; }
  .process-step { font-size: 0.64rem; letter-spacing: 0.2em; color: #C9A227; text-transform: uppercase; margin-bottom: 0.4rem; }

  .footer { background: #111; border-top: 1px solid #161616; padding: 2.5rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-logo { font-family: 'Playfair Display', serif; font-size: 0.85rem; letter-spacing: 0.15em; color: #C9A227; text-transform: uppercase; }
  .footer-copy { font-size: 0.68rem; color: #333; }
  .footer-links { display: flex; gap: 1.25rem; }
  .footer-link { background: none; border: none; cursor: pointer; font-size: 0.68rem; color: #333; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; padding: 0; }
  .footer-link:hover { color: #C9A227; }
`;

// ── Issue generation helpers ──────────────────────────────────────────────────

function getSundaysBefore(n) {
  const sundays = [];
  const d = new Date();
  d.setHours(0,0,0,0);
  // rewind to last Sunday
  d.setDate(d.getDate() - d.getDay());
  for (let i = 0; i < n; i++) {
    sundays.push(new Date(d));
    d.setDate(d.getDate() - 7);
  }
  return sundays;
}

function formatDate(d) {
  return d.toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
}

// Seeded pseudo-random so each issue always gets the same "random" content
function seededRand(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const TOPICS = [
  { tag:"Debut · Watches & Wonders", brands:["Patek Philippe","A. Lange & Söhne","Jaeger-LeCoultre","Vacheron Constantin","Audemars Piguet"] },
  { tag:"Independent · Atelier", brands:["F.P. Journe","MB&F","H. Moser & Cie","De Bethune","Voutilainen"] },
  { tag:"Market · Auction Intelligence", brands:["Phillips Geneva","Christie's","Sotheby's","Antiquorum","Bonhams"] },
  { tag:"Movement · Engineering", brands:["Rolex","Breguet","IWC","Glashütte Original","Zenith"] },
  { tag:"Story · Provenance", brands:["Cartier","Omega","Universal Genève","Gruen","LeCoultre"] },
  { tag:"Revival · Lost Craft", brands:["Kari Voutilainen","Roger Smith","Philippe Dufour","George Daniels","Laurent Ferrier"] },
];

const TITLES = [
  "builds a movement so small it required a new class of tool to assemble",
  "revives a grand complication last seen in the 1920s — and improves it",
  "releases a dial made entirely from a meteorite found in Greenland in 1897",
  "unveils a perpetual calendar with a correction mechanism so elegant it needs no pushers",
  "creates a tourbillon for a collector who asked for something nobody had ever seen",
  "presents a watch with a case machined from a single block of Damascus steel",
  "builds its first pocket watch in forty years — and the world pays attention",
  "produces a minute repeater that sounds like nothing manufactured in this century",
  "discovers a forgotten movement in an estate sale and restores it to working order",
  "announces a collaboration with a Japanese lacquer master nobody in Geneva had heard of",
];

const EXCERPTS = [
  "The result is a piece that sits entirely outside the contemporary conversation about what a watch should be — and is better for it.",
  "What appears effortless on the wrist conceals a three-year engineering struggle that nearly halted the project entirely.",
  "The provenance alone would justify the price. That it also keeps remarkable time is almost incidental.",
  "In an era of algorithmic design, this piece feels like an act of deliberate, principled stubbornness.",
  "The dial alone required eleven separate artisanal processes, each one nearly extinct.",
  "Collectors who saw it at preview described it as the most quietly extraordinary object in the room.",
  "Nothing about it announces itself. Everything about it rewards attention.",
  "The movement, once examined under a loupe, reveals a standard of finishing that has no contemporary parallel.",
];

const COMMENTARIES = [
  "This is what independent watchmaking exists to produce: the object nobody asked for that everyone, once they see it, cannot stop thinking about.",
  "There is a particular courage in building slowly, building beautifully, and refusing to explain yourself. This piece has that courage.",
  "The best complications are the ones you forget are there — until you need them, and they work with such grace that you feel the watchmaker's presence across time.",
  "What moves me is not the technical achievement, which is considerable, but the restraint. They could have said more. They chose not to.",
  "When a maker this careful produces something this unusual, the correct response is silence first. Appreciation later. Questions never.",
  "A watch like this does not ask to be understood. It asks only to be held, worn, and occasionally contemplated with the appropriate reverence.",
  "Horology at its finest is time made tangible. This piece understands that.",
  "This is the sort of object that makes you want to slow down — which, given its subject matter, feels entirely right.",
];

function generateIssueContent(seed, volume, issueNum) {
  const rng = seededRand(seed);
  const articles = [];
  for (let i = 0; i < 4; i++) {
    const topic = TOPICS[Math.floor(rng() * TOPICS.length)];
    const brand = topic.brands[Math.floor(rng() * topic.brands.length)];
    const title = TITLES[Math.floor(rng() * TITLES.length)];
    const excerpt = EXCERPTS[Math.floor(rng() * EXCERPTS.length)];
    const commentary = COMMENTARIES[Math.floor(rng() * COMMENTARIES.length)];
    articles.push({ tag: topic.tag, title: brand + " " + title, excerpt, commentary });
  }
  return articles;
}

function buildLibrary() {
  const sundays = getSundaysBefore(22);
  return sundays.map((date, idx) => {
    const issueNum = 22 - idx;
    const volume = Math.ceil(issueNum / 52);
    const seed = issueNum * 999983 + volume * 31337;
    const headlines = [
      "The Independent Watchmakers Are Winning",
      "When Complications Become Poetry",
      "The Auction That Changed Three Collectors' Lives",
      "On the Art of the Invisible Mechanism",
      "The Dial That Took Three Years to Perfect",
      "A Movement Nobody Believed Was Possible",
      "The Last Craftsman of a Dying Technique",
      "What Patek Didn't Say — and Why It Mattered",
      "The Watch That Sold for Silence",
      "Against the Algorithm: A Case for Handwork",
      "The Tourbillon as Metaphor",
      "When Steel Outshines Gold",
      "The Collector Who Refused to Sell",
      "A Minute Repeater in a World of Noise",
      "The Enamel Dial Renaissance",
      "Independence and Its Discontents",
      "The Movement That Took a Decade",
      "On Wearing Something Irreplaceable",
      "The Edition of One",
      "Finishing as Philosophy",
      "The Watchmaker Who Said No to Everyone",
      "What Remains When Trends Disappear",
    ];
    return {
      issueNum,
      volume,
      date,
      headline: headlines[(issueNum - 1) % headlines.length],
      articles: generateIssueContent(seed, volume, issueNum),
      tags: ["Watches & Wonders","Independent","Auction","Movement"].slice(0, 2 + (issueNum % 3)),
    };
  });
}

const LIBRARY = buildLibrary();

// ── Component ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [subName, setSubName] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(LIBRARY[0]);
  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [sponsorForm, setSponsorForm] = useState({ name:"",company:"",email:"",tier:"Grand Complication — £750/month",budget:"",message:"" });
  const [sponsorSent, setSponsorSent] = useState(false);

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubLoading(false);
    setIsSubscribed(true);
  }

  async function generateInsight() {
    setAiLoading(true);
    setAiOutput("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role:"user", content:`You are the AI editor of "The Guilded Hand", a luxury watch newsletter with a literary, storytelling voice. Write one fresh, compelling editorial insight (4-6 sentences) about the current state of haute horlogerie in 2026. Focus on something unusual, surprising, or underreported — an independent watchmaker, an unexpected material, a dying technique being revived, or an unlikely cultural crossover. Write in first-person editorial voice: authoritative, romantic, slightly opinionated. No bullet points. Pure prose. End with a single evocative one-line observation as a pull-quote.` }]
        })
      });
      const data = await res.json();
      setAiOutput(data.content?.find(b=>b.type==="text")?.text || "Unable to generate insight at this time.");
    } catch {
      setAiOutput("The mechanism is wound — but the signal is momentarily lost. Please try again.");
    }
    setAiLoading(false);
  }

  async function handleSponsorSubmit(e) {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 900));
    setSponsorSent(true);
  }

  const nav = (p) => { setPage(p); window.scrollTo(0,0); };

  return (
    <div style={{background:DARK, minHeight:"100vh", color:CREAM}}>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="nav-logo" onClick={()=>nav("home")}>The Guilded Hand</div>
        <div className="nav-links">
          <button className={`nav-link ${page==="home"?"active":""}`} onClick={()=>nav("home")}>Home</button>
          <button className={`nav-link ${page==="latest"?"active":""}`} onClick={()=>nav("latest")}>Latest Issue</button>
          {isSubscribed && <button className={`nav-link gold ${page==="library"?"active":""}`} onClick={()=>nav("library")}>Library</button>}
          <button className={`nav-link ${page==="about"?"active":""}`} onClick={()=>nav("about")}>About</button>
          <button className={`nav-link ${page==="sponsor"?"active":""}`} onClick={()=>nav("sponsor")}>Advertise</button>
          <button className="nav-cta" onClick={()=>nav("subscribe")}>Subscribe — £1/mo</button>
        </div>
      </nav>

      {/* ── HOME ── */}
      {page==="home" && (
        <div className="page">
          <div className="hero">
            <div className="hero-grid"/>
            <div className="hero-inner">
              <div className="hero-ornament"/>
              <div className="hero-eyebrow">The Guilded Hand · Est. 2026 · Every Sunday</div>
              <h1 className="hero-title">Watches Worth <em>Obsessing</em> Over</h1>
              <p className="hero-sub">A weekly letter about extraordinary timepieces you haven't heard of yet — and the stories they carry inside them.</p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={()=>nav("subscribe")}>Subscribe — £1 / month</button>
                <button className="btn-ghost" onClick={()=>nav("latest")}>Read Latest Issue</button>
              </div>
            </div>
          </div>

          <div className="features">
            <div className="section-rule"/>
            <div className="section-label">The Concept</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3rem",alignItems:"start"}}>
              <h2 className="section-title">The world's most interesting watches — collected every Sunday by AI, curated by obsession.</h2>
              <div>
                <p style={{fontFamily:"'EB Garamond',serif",fontSize:"1.1rem",color:"#777",lineHeight:1.85}}>Every Sunday our system reads five hundred sources — auction houses, independent ateliers, collector forums spoken in whispers — and returns with the pieces, the stories, and the arguments worth having.</p>
                <p style={{fontFamily:"'EB Garamond',serif",fontSize:"1.1rem",color:"#777",lineHeight:1.85,marginTop:"1rem"}}>Not every release. Not the obvious. Just the extraordinary.</p>
              </div>
            </div>
            <div className="feat-grid">
              {[
                {num:"01",name:"AI-Assisted Discovery",desc:"Each week our editor uses AI search across auction houses, brand newsrooms, collector forums, and horological journals to surface the stories worth telling."},
                {num:"02",name:"Editorial Synthesis",desc:"Raw news becomes narrative. Each item is summarised, contextualised, and given an opinionated editorial take you won't read anywhere else."},
                {num:"03",name:"Sunday Delivery",desc:"Every Sunday at 8:00 AM GMT, a new issue is compiled and delivered. Archived permanently in your subscriber Library."},
              ].map(f=>(
                <div key={f.num} className="feat-item">
                  <div className="feat-num">{f.num}</div>
                  <div className="feat-name">{f.name}</div>
                  <p className="feat-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-demo">
            <div className="ai-demo-inner">
              <div className="section-label">Live Demonstration</div>
              <h2 className="section-title" style={{fontSize:"1.7rem",marginBottom:"0.75rem"}}>The same engine that writes your Sunday issue — live.</h2>
              <p style={{fontFamily:"'EB Garamond',serif",fontSize:"0.95rem",color:"#666",marginBottom:"1.5rem",fontStyle:"italic"}}>Click below to generate a fresh editorial insight right now.</p>
              <button className="btn-primary" onClick={generateInsight} disabled={aiLoading} style={{width:"auto"}}>
                {aiLoading ? "Thinking…" : "Generate Today's Insight →"}
              </button>
              {aiLoading && <div className="ai-thinking"><div className="ai-dot"/><span className="ai-thinking-text">Reading the horological world…</span></div>}
              {aiOutput && (
                <div className="ai-output">
                  <div className="ai-output-label">AI Editorial · Live</div>
                  <p className="ai-output-text">{aiOutput}</p>
                </div>
              )}
            </div>
          </div>

          <div style={{padding:"4rem 2rem",textAlign:"center"}}>
            <div style={{width:1,height:60,background:AMBER,margin:"0 auto 1.75rem"}}/>
            <div className="section-label" style={{textAlign:"center"}}>Begin</div>
            <h2 className="section-title" style={{textAlign:"center",marginBottom:"0.6rem"}}>A remarkable habit. For £1 a month.</h2>
            <p style={{fontFamily:"'EB Garamond',serif",fontSize:"1rem",color:"#666",marginBottom:"2rem",fontStyle:"italic"}}>Cancel anytime. Every issue saved to your Library forever.</p>
            <button className="btn-primary" onClick={()=>nav("subscribe")}>Subscribe Now</button>
          </div>
        </div>
      )}

      {/* ── LATEST ISSUE ── */}
      {page==="latest" && (
        <div className="page" style={{padding:"3rem 2rem 5rem"}}>
          <div style={{maxWidth:980,margin:"0 auto"}}>
            <div className="section-label">The Guilded Hand — Latest Issue</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"2rem",flexWrap:"wrap",gap:"1rem"}}>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.6rem,3.5vw,2.6rem)",fontWeight:400}}>
                Vol. {LIBRARY[0].volume} · Issue {LIBRARY[0].issueNum} — {LIBRARY[0].headline}
              </h1>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:"0.65rem",letterSpacing:"0.15em",color:MUTED,textTransform:"uppercase",marginBottom:"0.3rem"}}>{formatDate(LIBRARY[0].date)}</div>
                <div style={{fontSize:"0.65rem",letterSpacing:"0.15em",color:AMBER,textTransform:"uppercase"}}>4 Stories · 12 min</div>
              </div>
            </div>
            <div style={{background:"#111",border:"1px solid #1A1A1A",overflow:"hidden"}}>
              <div className="reader-header">
                <div>
                  <div className="reader-vol">Vol. {LIBRARY[0].volume} · Issue {LIBRARY[0].issueNum}</div>
                  <div className="reader-title">{LIBRARY[0].headline}</div>
                  <div className="reader-meta">{formatDate(LIBRARY[0].date)} · AI-curated & written</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"0.5rem",alignItems:"flex-end"}}>
                  <div style={{background:AMBER,color:DARK,fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",padding:"0.28rem 0.6rem",fontWeight:600}}>Current Issue</div>
                  <div className="generating-badge"><div className="ai-dot"/>&nbsp;AI Generated</div>
                </div>
              </div>
              <div className="article-grid">
                {LIBRARY[0].articles.map((a,i)=>(
                  <div key={i} className="article-card">
                    <div className="article-tag">{a.tag}</div>
                    <div className="article-title">{a.title}</div>
                    <div className="article-excerpt">{a.excerpt}</div>
                    <div className="article-commentary">
                      <div className="commentary-label">Editorial Commentary</div>
                      {a.commentary}
                    </div>
                    <div className="article-byline">AI correspondent · sourced from Hodinkee, SJX, Revolution, Monochrome</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginTop:"1.5rem",padding:"1.75rem",background:CHARCOAL,border:"1px solid #1E1E1E",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
              <div>
                <p style={{fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:"#666",fontSize:"0.92rem",marginBottom:"0.25rem"}}>This is a preview. Subscribers get the full issue plus access to all 22 back issues in the Library.</p>
                <div style={{fontSize:"0.64rem",letterSpacing:"0.1em",color:MUTED,textTransform:"uppercase"}}>£1/month · Cancel anytime</div>
              </div>
              <button className="btn-primary" onClick={()=>nav("subscribe")}>Subscribe — £1/month</button>
            </div>
          </div>
        </div>
      )}

      {/* ── LIBRARY (subscribers only) ── */}
      {page==="library" && (
        <div className="page">
          {!isSubscribed ? (
            <div className="library-gate">
              <div style={{fontSize:"2.5rem",marginBottom:"1.25rem",opacity:0.3}}>🔒</div>
              <div className="section-label" style={{textAlign:"center"}}>Subscriber Exclusive</div>
              <h2 className="section-title" style={{textAlign:"center",maxWidth:460,margin:"0 auto 1rem"}}>The Library is for subscribers</h2>
              <p style={{fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:"#666",marginBottom:"2rem"}}>Every issue, every Sunday, archived forever. £1/month.</p>
              <button className="btn-primary" onClick={()=>nav("subscribe")}>Subscribe to unlock</button>
            </div>
          ) : (
            <div className="library-page">
              <div className="section-rule"/>
              <div className="section-label">Subscriber Library</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem",marginBottom:"0.5rem"}}>
                <h1 className="section-title" style={{marginBottom:0}}>All Issues · Vol. 1</h1>
                <div style={{fontSize:"0.65rem",letterSpacing:"0.1em",color:MUTED,textTransform:"uppercase"}}>{LIBRARY.length} issues archived</div>
              </div>
              <p style={{fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:"#666",marginBottom:"0.5rem",fontSize:"0.95rem"}}>A new issue is added every Sunday at 8:00 AM GMT automatically.</p>

              <div className="library-grid">
                {LIBRARY.map((issue)=>(
                  <div key={issue.issueNum} className={`issue-card ${selectedIssue?.issueNum===issue.issueNum?"active":""}`} onClick={()=>setSelectedIssue(issue)}>
                    <div className="issue-vol">Vol. {issue.volume} · Issue {issue.issueNum}</div>
                    <div className="issue-title">{issue.headline}</div>
                    <div className="issue-date">{formatDate(issue.date)}</div>
                    <div className="issue-tag-row">{issue.tags.map(t=><span key={t} className="issue-tag">{t}</span>)}</div>
                  </div>
                ))}
              </div>

              {selectedIssue && (
                <div className="issue-reader">
                  <div className="reader-header">
                    <div>
                      <div className="reader-vol">Vol. {selectedIssue.volume} · Issue {selectedIssue.issueNum}</div>
                      <div className="reader-title">{selectedIssue.headline}</div>
                      <div className="reader-meta">{formatDate(selectedIssue.date)} · AI-curated & written</div>
                    </div>
                    {selectedIssue.issueNum===LIBRARY[0].issueNum && (
                      <div style={{background:AMBER,color:DARK,fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",padding:"0.28rem 0.6rem",fontWeight:600,alignSelf:"flex-start"}}>Latest Issue</div>
                    )}
                  </div>
                  <div className="article-grid">
                    {selectedIssue.articles.map((a,i)=>(
                      <div key={i} className="article-card">
                        <div className="article-tag">{a.tag}</div>
                        <div className="article-title">{a.title}</div>
                        <div className="article-excerpt">{a.excerpt}</div>
                        <div className="article-commentary">
                          <div className="commentary-label">Editorial Commentary</div>
                          {a.commentary}
                        </div>
                        <div className="article-byline">AI correspondent · sourced from Hodinkee, SJX, Revolution, Monochrome</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── SUBSCRIBE ── */}
      {page==="subscribe" && (
        <div className="page">
          <div className="sub-page">
            <div style={{textAlign:"center",marginBottom:"2rem"}}>
              <div className="section-label" style={{textAlign:"center"}}>Membership</div>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(1.8rem,4vw,2.8rem)",fontWeight:400,marginBottom:"0.5rem"}}>One price. Everything.</h1>
              <p style={{fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:"#666",fontSize:"0.95rem"}}>No tiers. No upsells. Just the letter.</p>
            </div>
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe}>
                <div className="sub-box">
                  <div className="sub-price">£1 <span>/ month</span></div>
                  <div className="sub-tagline">Less than a coffee. Better than most.</div>
                  <ul className="sub-perks">
                    <li>New issue every Sunday at 8:00 AM GMT</li>
                    <li>AI-curated from 500+ sources weekly</li>
                    <li>Editorial commentary found nowhere else</li>
                    <li>Rare auction alerts & collector intelligence</li>
                    <li>Full Library — every back issue, forever</li>
                    <li>Cancel anytime, keep everything you've received</li>
                  </ul>
                  <input className="input-field" placeholder="Your name" value={subName} onChange={e=>setSubName(e.target.value)}/>
                  <input className="input-field" type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} required/>
                  <div className="stripe-row">
                    <span style={{fontSize:"0.78rem",color:"#555"}}>Payment secured by Stripe</span>
                    <span style={{fontSize:"0.66rem",color:MUTED}}>🔒 SSL Encrypted</span>
                  </div>
                  <button className="btn-primary" type="submit" disabled={subLoading}>
                    {subLoading ? "Processing…" : "Begin Subscription — £1/month"}
                  </button>
                  <div style={{fontSize:"0.64rem",color:MUTED,textAlign:"center",marginTop:"0.6rem"}}>Cancel anytime. No questions asked.</div>
                </div>
              </form>
            ) : (
              <div className="sub-box success-box">
                <div style={{fontSize:"2rem",marginBottom:"1rem"}}>⌚</div>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:400,color:AMBER,marginBottom:"0.6rem"}}>Welcome to The Guilded Hand</h2>
                <p style={{fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:"#666",lineHeight:1.7,marginBottom:"1.5rem"}}>Your first issue arrives this Sunday at 8:00 AM. In the meantime, your Library is open — all 22 issues are waiting.</p>
                <div style={{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap"}}>
                  <button className="btn-primary" onClick={()=>nav("library")}>Open Library →</button>
                  <button className="btn-ghost" onClick={()=>nav("latest")}>Read Latest Issue</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ABOUT ── */}
      {page==="about" && (
        <div className="page">
          <div className="about-page">
            <div className="section-rule"/>
            <div className="section-label">About this letter</div>
            <h1 className="section-title" style={{fontSize:"clamp(1.8rem,3.5vw,3rem)"}}>Why we built a watch newsletter that writes itself.</h1>
            <p style={{fontFamily:"'EB Garamond',serif",fontSize:"1.1rem",color:"#777",lineHeight:1.85,marginTop:"1.25rem"}}>The horological world generates more remarkable stories each week than any single editor could read. New movements from ateliers no one has heard of. Auction lots with provenance that reads like fiction. Techniques that died in 1952 being revived by someone in their garage in Geneva.</p>
            <p style={{fontFamily:"'EB Garamond',serif",fontSize:"1.1rem",color:"#777",lineHeight:1.85,marginTop:"0.85rem"}}>We built The Guilded Hand to find them all — and deliver them every Sunday morning, without fail.</p>
            <div style={{borderTop:"1px solid #1A1A1A",marginTop:"2.5rem",paddingTop:"2.5rem"}}>
              <div className="section-label">The Sunday Process</div>
              <div className="process-grid">
                {[
                  {step:"Research",desc:"Each Sunday, our editor uses AI-powered search to scan auction houses, brand newsrooms, collector forums, and horological journals for the week's most remarkable stories."},
                  {step:"Filter",desc:"Only the unusual survives. Is it new? Is it strange? Is it a story you haven't read elsewhere? Anything ordinary is discarded."},
                  {step:"Summarise",desc:"Selected stories are summarised — essential facts, context, provenance — stripped of PR language and padding."},
                  {step:"Editorialize",desc:"Our AI writes commentary for each piece: an opinion, an observation, the question worth asking. The editor reviews and refines every word."},
                  {step:"Archive",desc:"Every finished issue is saved permanently to the subscriber Library the moment it publishes."},
                  {step:"Deliver",desc:"At 8:00 AM GMT every Sunday, the issue is emailed to every subscriber and added to the Library simultaneously."},
                ].map(s=>(
                  <div key={s.step} className="process-item">
                    <div className="process-step">{s.step}</div>
                    <p style={{fontFamily:"'EB Garamond',serif",fontSize:"0.95rem",color:"#666",lineHeight:1.7}}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SPONSOR ── */}
      {page==="sponsor" && (
        <div className="page">
          <div className="sponsor-page">
            <div className="section-rule"/>
            <div className="section-label">Advertising & Partnerships</div>
            <h1 className="section-title">Reach people who care about watches <em style={{fontStyle:"italic",color:AMBER}}>deeply.</em></h1>
            <p style={{fontFamily:"'EB Garamond',serif",fontSize:"1.05rem",color:"#777",maxWidth:580,lineHeight:1.8}}>Our subscribers are collectors, enthusiasts, and informed buyers. They read every word. If you make, sell, service, or write about watches, this is the most attentive audience in newsletter publishing.</p>
            <div className="stat-row">
              <div className="stat-cell"><div className="stat-num">4,200+</div><div className="stat-label">Active Subscribers</div></div>
              <div className="stat-cell"><div className="stat-num">71%</div><div className="stat-label">Average Open Rate</div></div>
              <div className="stat-cell"><div className="stat-num">£38k</div><div className="stat-label">Avg. Annual Watch Spend</div></div>
            </div>
            <div className="tier-grid">
              {[
                {name:"Ebauche",price:"£250",per:"/issue",desc:"Single-issue placement. Perfect for launches and limited releases.",perks:["Classified ad (100 words)","Link in footer","Post-send metrics"],featured:false},
                {name:"Grand Complication",price:"£750",per:"/month",desc:"Monthly partner. Sustained presence across four Sunday issues.",perks:["4 issues/month","Branded editorial segment","Header logo","Monthly report","Optional product feature"],featured:true},
                {name:"Maison Partner",price:"Custom",per:"",desc:"Deep editorial integration for established brands.",perks:["Quarterly exclusivity","Co-authored editorial","Dedicated issue theming","Social amplification","Full creative control"],featured:false},
              ].map(t=>(
                <div key={t.name} className={`tier-card ${t.featured?"featured":""}`}>
                  {t.featured && <div className="tier-badge">Most Popular</div>}
                  <div className="tier-name">{t.name}</div>
                  <div className="tier-price">{t.price}<sub>{t.per}</sub></div>
                  <p className="tier-desc">{t.desc}</p>
                  <ul className="tier-perks">{t.perks.map((p,i)=><li key={i}>{p}</li>)}</ul>
                </div>
              ))}
            </div>
            {!sponsorSent ? (
              <div className="contact-form">
                <div className="section-label" style={{marginBottom:"1rem"}}>Get in touch</div>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:400,marginBottom:"1.5rem"}}>Start a conversation about partnership</h2>
                <form onSubmit={handleSponsorSubmit}>
                  <div className="form-row" style={{marginBottom:"0.75rem"}}>
                    <div className="form-group" style={{marginBottom:0}}>
                      <label className="form-label">Your Name</label>
                      <input className="input-field" style={{marginBottom:0}} value={sponsorForm.name} onChange={e=>setSponsorForm({...sponsorForm,name:e.target.value})} placeholder="James Harrington"/>
                    </div>
                    <div className="form-group" style={{marginBottom:0}}>
                      <label className="form-label">Company / Brand</label>
                      <input className="input-field" style={{marginBottom:0}} value={sponsorForm.company} onChange={e=>setSponsorForm({...sponsorForm,company:e.target.value})} placeholder="Harrington Timepieces"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="input-field" type="email" value={sponsorForm.email} onChange={e=>setSponsorForm({...sponsorForm,email:e.target.value})} placeholder="james@harrington.co.uk"/>
                  </div>
                  <div className="form-row" style={{marginBottom:"0.75rem"}}>
                    <div className="form-group" style={{marginBottom:0}}>
                      <label className="form-label">Preferred Tier</label>
                      <select className="select-field" value={sponsorForm.tier} onChange={e=>setSponsorForm({...sponsorForm,tier:e.target.value})}>
                        <option>Ebauche — £250/issue</option>
                        <option>Grand Complication — £750/month</option>
                        <option>Maison Partner — Custom</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                    <div className="form-group" style={{marginBottom:0}}>
                      <label className="form-label">Approximate Budget</label>
                      <select className="select-field" value={sponsorForm.budget} onChange={e=>setSponsorForm({...sponsorForm,budget:e.target.value})}>
                        <option value="">Select range</option>
                        <option>Under £500</option>
                        <option>£500 – £1,500</option>
                        <option>£1,500 – £5,000</option>
                        <option>£5,000+</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tell us about your goals</label>
                    <textarea className="textarea-field" value={sponsorForm.message} onChange={e=>setSponsorForm({...sponsorForm,message:e.target.value})} placeholder="What are you launching? Who are you trying to reach?"/>
                  </div>
                  <button className="btn-primary" type="submit" style={{width:"auto",padding:"0.85rem 2rem"}}>Send Enquiry →</button>
                  <p style={{fontSize:"0.64rem",color:MUTED,marginTop:"0.6rem"}}>We respond within 24 hours on business days.</p>
                </form>
              </div>
            ) : (
              <div className="contact-form" style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",color:AMBER,marginBottom:"0.6rem"}}>Received.</div>
                <p style={{fontFamily:"'EB Garamond',serif",fontStyle:"italic",color:"#666"}}>We'll be in touch within one business day.</p>
                <button className="btn-ghost" style={{marginTop:"1.25rem"}} onClick={()=>nav("latest")}>Read Latest Issue →</button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-logo">The Guilded Hand</div>
        <div className="footer-copy">© 2026 · The Guilded Hand · Every Sunday · Powered by AI</div>
        <div className="footer-links">
          <button className="footer-link" onClick={()=>nav("home")}>Home</button>
          <button className="footer-link" onClick={()=>nav("latest")}>Issues</button>
          <button className="footer-link" onClick={()=>nav("sponsor")}>Advertise</button>
          <button className="footer-link" onClick={()=>nav("subscribe")}>Subscribe</button>
        </div>
      </footer>
    </div>
  );
}
