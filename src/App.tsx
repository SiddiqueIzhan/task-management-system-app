import "./App.css";
import Loading from "./Components/Loading";
import { useAppContext } from "./Context/appContext";
import Login from "./Pages/login";
import TaskPage from "./Pages/TaskPage";

function App() {
  const { user, authLoading } = useAppContext();

  if (authLoading) return <Loading />;

  if (user === null) return <Login />;

  return <TaskPage user={user} />;
}

export default App;
