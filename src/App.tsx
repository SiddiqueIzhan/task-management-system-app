import { useEffect, useState } from "react";
import "./App.css";
import Login, { auth } from "./Pages/login";
import TaskPage from "./Pages/TaskPage";
import { onAuthStateChanged, User } from "firebase/auth";
import { ContextProvider } from "./Context/appContext";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userD) => {
      if (userD) {
        setUser(userD);
      } else setUser(null);
    });
  }, []);

  if (user === null) return <Login />;

  return (
    <ContextProvider>
      <TaskPage user={user} />
    </ContextProvider>
  );
}

export default App;
