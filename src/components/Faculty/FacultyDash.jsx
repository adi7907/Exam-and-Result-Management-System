import { useState, useEffect } from "react";

export default function FacultyDash({ setView }) {
  const [db, setDb] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", age: "" });

  const loadDB = () => fetch("http://localhost:3000/api/all").then(r => r.json()).then(d => setDb(d.students));
  useEffect(() => { loadDB(); }, []);

  const addStudent = () => fetch("http://localhost:3000/api/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }).then(loadDB);
  const updateMark = (id, sub, val) => fetch(`http://localhost:3000/api/students/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sub, val }) }).then(loadDB);
  const clearData = () => { if(confirm("Wipe database?")) fetch("http://localhost:3000/api/clear", { method: "DELETE" }).then(loadDB); };

  // Dynamically sort students by highest total score
  const ranked = [...db].sort((a, b) => (b.maths + b.cs) - (a.maths + a.cs));

  return (
    <div className="card large" style={{ maxWidth: "800px" }}>
      <h2>Faculty Console & Rank Board</h2>
      <div style={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
        <input placeholder="ID" onChange={e => setForm({...form, id: e.target.value})} />
        <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Age" onChange={e => setForm({...form, age: e.target.value})} />
        <button style={{ margin: 0 }} onClick={addStudent}>Insert</button>
      </div>
      <table className="table">
        <tbody>
          <tr><th>Rank</th><th>ID</th><th>Name</th><th>Maths</th><th>CS</th><th>Total</th></tr>
          {ranked.map((s, i) => (
            <tr key={s.id}>
              <td style={{ color: "#e67e22" }}><b>#{i + 1}</b></td>
              <td>{s.id}</td><td>{s.name}</td>
              <td><input type="number" defaultValue={s.maths} onBlur={e => updateMark(s.id, 'maths', e.target.value)} style={{ width: "60px", margin: 0 }}/></td>
              <td><input type="number" defaultValue={s.cs} onBlur={e => updateMark(s.id, 'cs', e.target.value)} style={{ width: "60px", margin: 0 }}/></td>
              <td><b>{s.maths + s.cs}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button className="secondary" onClick={() => setView("login")}>Logout</button>
        <button style={{ background: "#f39c12" }} onClick={() => window.open("/db_viewer.html", "_blank")}>🗄️ Open DB Viewer</button>
        <button style={{ background: "#e74c3c" }} onClick={clearData}>Wipe Database</button>
      </div>
    </div>
  );
}