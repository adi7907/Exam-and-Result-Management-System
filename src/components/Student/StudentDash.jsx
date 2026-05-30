import { useState, useEffect } from "react";

export default function StudentDash({ setView, userId }) {
  const [db, setDb] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/all").then(r => r.json()).then(data => {
      // Sort the entire class by total score
      const sorted = data.students.sort((a, b) => (b.maths + b.cs) - (a.maths + a.cs));
      setDb(sorted);
      setMe(sorted.find(s => s.id === userId));
    });
  }, [userId]);

  if (!me) return <p>Loading...</p>;
  
  // Find the student's exact rank after sorting
  const myRank = db.findIndex(s => s.id === userId) + 1;

  return (
    <div className="card large" style={{ maxWidth: "800px" }}>
      <h2>Public Class Board</h2>
      <h3 style={{ color: "#2980b9" }}>{me.name} | ID: {me.id} | Class Rank: #{myRank}</h3>
      
      <h4 style={{ textAlign: "left", marginTop: "20px", color: "#7f8c8d" }}>All Students Subject-Wise Performance</h4>
      <table className="table" style={{ textAlign: "center" }}>
        <tbody>
          <tr><th>Rank</th><th>Name</th><th>Maths</th><th>CS</th><th>Total Score</th></tr>
          {db.map((s, i) => (
            <tr key={s.id} style={{ background: s.id === userId ? "#e8f4f8" : "transparent" }}>
              <td style={{ color: "#e67e22", fontWeight: "bold" }}>#{i + 1}</td>
              <td style={{ fontWeight: s.id === userId ? "bold" : "normal" }}>{s.name}</td>
              <td>{s.maths}</td>
              <td>{s.cs}</td>
              <td><b>{s.maths + s.cs}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button className="secondary" onClick={() => setView("login")}>Logout</button>
    </div>
  );
}