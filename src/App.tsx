import "./App.css";
import { useAppContext } from "./Context/appContext";
import Login from "./Pages/login";
import TaskPage from "./Pages/TaskPage";

function App() {
  const { user } = useAppContext();
  if (user === null) return <Login />;

  return <TaskPage user={user} />;
}

export default App;
