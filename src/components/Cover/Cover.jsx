export default function Cover({ setView }) {
  return (
    <div className="card">
      <h1 style={{ color: "#2980b9" }}>Exam & Result System</h1>
      <p>Digital Academic Performance Tracker</p>
      <button onClick={() => setView("login")}>Enter Portal</button>
    </div>
  );
}