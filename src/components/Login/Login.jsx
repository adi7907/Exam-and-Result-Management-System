import { useState } from "react";

export default function Login({ setView, setUser }) {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    if (!name) return alert("Please enter your name!");
    if (pass !== "123456") return alert("Incorrect Password!");
    
    if (role === "student") {
      const res = await fetch("http://localhost:3000/api/all");
      const data = await res.json();
      if (!data.students.find(s => s.id === id)) return alert("ID not found!");
      setUser(id);
    }
    setView(role);
  };

  return (
    <div className="card">
      <h2>System Login</h2>
      
      {/* Side-by-Side Role Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button 
          style={{ background: role === "student" ? "#2980b9" : "#ecf0f1", color: role === "student" ? "white" : "#333", marginTop: 0 }} 
          onClick={() => setRole("student")}>Student
        </button>
        <button 
          style={{ background: role === "faculty" ? "#2980b9" : "#ecf0f1", color: role === "faculty" ? "white" : "#333", marginTop: 0 }} 
          onClick={() => setRole("faculty")}>Faculty
        </button>
      </div>
      
      <input placeholder="Enter your Name" onChange={e => setName(e.target.value)} />
      {role === "student" && <input placeholder="Student ID (e.g. 1)" onChange={e => setId(e.target.value)} />}
      <input type="password" placeholder="Password (123456)" onChange={e => setPass(e.target.value)} />
      
      <button onClick={handleLogin}>Login</button>
      <button className="secondary" onClick={() => setView("cover")}>Back</button>
    </div>
  );
}