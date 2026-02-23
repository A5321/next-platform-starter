export default function Home() {
  return (
    <main style={{ maxWidth: 800, margin: "40px auto", padding: "0 16px" }}>
      <h1>See your relationship patterns on one screen.</h1>
      <p>
        Choose a scenario, answer a few questions, and get a structured AI report
        on your relationship dynamics.
      </p>

      <h2>Start a free checkup:</h2>
      <ul>
        <li><a href="/test/current-relationship">Current relationship checkup</a></li>
        <li><a href="/test/repeating-pattern">Repeating breakup pattern</a></li>
      </ul>
    </main>
  );
}
