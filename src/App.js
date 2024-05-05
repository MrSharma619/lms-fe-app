import FrontPage from "./components/front-page";
import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";

function App() {
  const user = true;

  return (
    <div>
      {user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <FrontPage />
      )}
    </div>
  );
}

export default App;
