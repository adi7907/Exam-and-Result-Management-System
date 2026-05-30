import { useState } from "react";
import "./index.css";
import Cover from "./components/Cover/Cover";
import Login from "./components/Login/Login";
import FacultyDash from "./components/Faculty/FacultyDash";
import StudentDash from "./components/Student/StudentDash";

export default function App() {
  const [view, setView] = useState("cover");
  const [user, setUser] = useState(null);

  return (
    <>
      {view === "cover" && <Cover setView={setView} />}
      {view === "login" && <Login setView={setView} setUser={setUser} />}
      {view === "faculty" && <FacultyDash setView={setView} />}
      {view === "student" && <StudentDash setView={setView} userId={user} />}
    </>
  );
}