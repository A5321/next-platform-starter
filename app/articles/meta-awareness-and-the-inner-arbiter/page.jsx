import Link from "next/link";

const pageStyle = {
  minHeight: "100vh",
  background: "#f5f7fb",
  color: "#10131a",
};

const containerStyle = {
  width: "100%",
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "24px 16px 72px",
  boxSizing: "border-box",
};

const innerStyle = {
  width: "100%",
  maxWidth: "1020px",
  margin: "0 auto",
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "44px",
};

const brandStyle = {
  fontSize: "18px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textDecoration: "none",
  color: "#10131a",
};

const navLinksStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const navLinkStyle = {
  color: "#3f4a5f",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(16,19,26,0.12)",
  borderRadius: "999px",
};

const activeNavLinkStyle = {
  color: "#10131a",
  textDecoration: "none",
  fontSize: "14px",
  padding: "10px 14px",
  border: "1px solid rgba(16,19,26,0.16)",
  background: "#ffffff",
  borderRadius: "999px",
};

const articleStyle = {
  background: "#ffffff",
  border: "1px solid rgba(16,19,26,0.08)",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 14px 40px rgba(16,19,26,0.05)",
};

const categoryStyle = {
  display: "inline-block",
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#4e5fce",
  marginBottom: "10px",
};

const metaStyle = {
  fontSize: "13px",
  color: "#667085",
  marginBottom: "12px",
};

const titleStyle = {
  fontSize: "clamp(34px, 6vw, 56px)",
  lineHeight: 1.04,
  margin: "0 0 16px",
};

const descriptionStyle = {
  fontSize: "19px",
  lineHeight: 1.7,
  color: "#465065",
  margin: "0 0 24px",
  maxWidth: "36ch",
};

const tagsStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  margin: "0 0 24px",
};

const tagStyle = {
  display: "inline-block",
  fontSize: "12px",
  color: "#344054",
  background: "#f2f4f7",
  borderRadius: "999px",
  padding: "6px 10px",
};

const leadStyle = {
  fontSize: "20px",
  lineHeight: 1.8,
  color: "#1e2430",
  margin: "0 0 28px",
};

const h2Style = {
  fontSize: "28px",
  lineHeight: 1.15,
  margin: "36px 0 14px",
};

const paragraphStyle = {
  fontSize: "17px",
  lineHeight: 1.9,
  color: "#334155",
  margin: "0 0 18px",
};

const listStyle = {
  fontSize: "17px",
  lineHeight: 1.9,
  color: "#334155",
  margin: "0 0 18px 18px",
};

const listItemStyle = {
  marginBottom: "6px",
};

const relatedSectionStyle = {
  marginTop: "40px",
  paddingTop: "24px",
  borderTop: "1px solid rgba(16,19,26,0.08)",
};

const relatedTitleStyle = {
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#667085",
  marginBottom: "14px",
};

const relatedLinkStyle = {
  display: "block",
  color: "#10131a",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: 700,
  lineHeight: 1.4,
  marginBottom: "10px",
};

export default function MetaAwarenessArticlePage() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <div style={innerStyle}>
          <header style={navStyle}>
            <Link href="/" style={brandStyle}>
              PATTERN INDEX
            </Link>

            <nav style={navLinksStyle}>
              <Link href="/tests" style={navLinkStyle}>
                TESTS
              </Link>
              <Link href="/articles" style={activeNavLinkStyle}>
                ARTICLES
              </Link>
            </nav>
          </header>

          <article style={articleStyle}>
            <Link
              href="/articles?category=inner-silence"
              style={categoryStyle}
            >
              Inner Silence
            </Link>
            <div style={metaStyle}>
              explainer · April 10, 2026 · 8 min read
            </div>

            <h1 style={titleStyle}>
              Meta-awareness and the inner arbiter: noticing thoughts without drowning in them
            </h1>

            <p style={descriptionStyle}>
              A practical explanation of what the inner “arbiter” is when you practice quieting the inner dialogue, where spontaneous thoughts come from, and how to use meta-awareness without turning it into overcontrol.
            </p>

            <div style={tagsStyle}>
              <span style={tagStyle}>meta-awareness</span>
              <span style={tagStyle}>inner-dialogue</span>
              <span style={tagStyle}>patterns</span>
            </div>

            <p style={leadStyle}>
              At some point in inner silence practice many people notice a new figure in the system: an inner “arbiter” that says “oh, a thought, cut it” or “let it run for a moment and see”. It feels like a second self watching the first one. The question is: who is that, and who generates the thoughts then?
            </p>

            <h2 style={h2Style}>
              Case: when an arbiter appears in inner silence practice
            </h2>
            <p style={paragraphStyle}>
              Imagine someone who has already installed one stable practice: walking in inner silence. A separate sitting session of quiet is not in place yet, but the walking practice is consistent. After some time they notice something new: every time a thought appears, there is a quiet internal voice that says either “thought – cut it” or “thought – let it spin a bit, let&apos;s see what happens”.
            </p>
            <p style={paragraphStyle}>
              From the inside it feels as if there is a supervising process sitting above the stream of thoughts. It evaluates whether to allow or shut down a thought. The natural question then appears: if this arbiter is me, who produces the thoughts? And if the thoughts are also me, who is this arbiter?
            </p>

            <h2 style={h2Style}>What the “arbiter” actually is</h2>
            <p style={paragraphStyle}>
              In contemporary psychology this “arbiter” is usually called meta-awareness or metacognitive awareness: the ability to notice that thinking is happening, instead of being completely fused with the content of the thought. It is not a separate mystical entity. It is a mode of attention and executive control that can switch on and off.
            </p>
            <p style={paragraphStyle}>
              On a neuroscience level, when you notice that you are thinking, regions associated with executive control and monitoring light up – frontal systems that track what the mind is doing. Phenomenologically, it feels like “mind on the balcony”: the same mind, but in a vantage point that can see both the thoughts and the way you react to them.
            </p>
            <p style={paragraphStyle}>
              So the arbiter is also you – but not as the character in the story (“I am such-and-such”), rather as the process of awareness that can reflect on its own states. The shift is not about creating a second self; it is about accessing another mode of the same system.
            </p>

            <h2 style={h2Style}>Where spontaneous thoughts come from</h2>
            <p style={paragraphStyle}>
              The fact that there is an arbiter does not mean thoughts need a separate author. A large chunk of spontaneous thinking is generated by what neuroscience calls the default mode network – a set of brain regions that become particularly active when there is no demanding external task.
            </p>
            <p style={paragraphStyle}>
              When the default mode network runs, it stitches together memories, predictions, unresolved experiences, fantasies, and background concerns. From the inside it feels like “thoughts just appear”. They are heavily shaped by previous learning and emotional patterns, and they do not require a distinct thinker sitting in the middle and deliberately choosing each thought.
            </p>
            <p style={paragraphStyle}>
              Meta-awareness – your arbiter – is the mode where this automatic stream gets noticed as a stream: “now the default narrative is running”, “now this is rumination”, “now this is fantasy”. From there you can either step out or decide to let the process unfold a bit longer on purpose.
            </p>

            <h2 style={h2Style}>
              Why this is exactly what practice aims for
            </h2>
            <p style={paragraphStyle}>
              In many contemplative and cognitive traditions, this shift from being inside the thought to seeing it as an object is the core skill. People often train for years just to have that reliable moment of “oh, this is a thought, not reality” before they act on it.
            </p>
            <p style={paragraphStyle}>
              The walking practice you mentioned already created enough signal-to-noise separation for this arbiter to appear. The emerging pattern is no longer “thought → immediate fusion → reaction” but “thought → recognition → choice”.
            </p>

            <h2 style={h2Style}>
              How not to turn the arbiter into overcontrol
            </h2>
            <p style={paragraphStyle}>
              A common trap at this stage is to treat the arbiter as a harsh internal controller whose job is to kill every thought as soon as possible. That quickly slides into tension, perfectionism, and self-monitoring that is so tight it becomes yet another form of noise.
            </p>
            <p style={paragraphStyle}>
              Instead, it helps to hold a different frame: the arbiter is not police, but a spotlight. Its task is not to suppress everything, but to ask: “Is this useful to open now?” Sometimes the wisest move is to let a thought play out under observation for a while, just to understand the pattern it belongs to.
            </p>

            <h2 style={h2Style}>
              A simple protocol to train meta-awareness
            </h2>
            <p style={paragraphStyle}>
              For the next 2–3 weeks, you can use a very simple three-step protocol in your walking or sitting practice:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                <strong>Label.</strong> As soon as you notice a thought, quietly tag it: “memory”, “planning”, “fantasy”, “self-attack”, “problem-solving”.
              </li>
              <li style={listItemStyle}>
                <strong>Decide.</strong> Ask one clean question: “Does engaging with this help right now?” If the answer is no, let it fade without fighting it. If yes, let it unfold under observation for a bit.
              </li>
              <li style={listItemStyle}>
                <strong>Return.</strong> Bring attention back to the anchor you chose: body, breath, sound, or the physical act of walking.
              </li>
            </ul>
            <p style={paragraphStyle}>
              The goal is not zero thoughts. The goal is to make the transition from stream to arbiter smoother and more frequent, so that thoughts are seen as events in the mind, not as commands.
            </p>

            <h2 style={h2Style}>
              How this connects to your pattern work
            </h2>
            <p style={paragraphStyle}>
              The same mechanism shows up in your relationship work. Before, the pattern might have been: intense feeling → story about what it means → action. Now the arbiter can step in: “this is a story, not a fact”, “this is a familiar pattern”, “this is a default narrative about loss or guilt”.
            </p>
            <p style={paragraphStyle}>
              The more often the arbiter appears in both inner dialogue and relational contexts, the less you are forced to live out every old pattern. You do not need a final metaphysical answer to “who is the thinker” to benefit from this. You only need a reliable capacity to see the thought as a thought before it dictates your behaviour.
            </p>

            <h2 style={h2Style}>Short version</h2>
            <p style={paragraphStyle}>
              The “arbiter” is your meta-awareness, not a new separate self. Default-mode processes generate a large part of your spontaneous thoughts. Practice does not try to shut that down completely; it trains the part of you that can see the stream clearly enough to decide what to feed and what to let go.
            </p>

            <div style={relatedSectionStyle}>
              <div style={relatedTitleStyle}>More in Inner Silence</div>

            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
