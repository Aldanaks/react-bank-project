import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import { useState } from "react";
import { useEffect } from "react";
import { getToken } from "./api/storage";
import UserContext from "./context/UserContext";
import Transactions from "./pages/Transactions";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setUser(true);
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App font-mono ">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/transactions" Component={Transactions} />
          {/* <Route path="/notes/:noteId" Component={Note} /> */} */
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/users" Component={Users} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
