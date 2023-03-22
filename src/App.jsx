import "./App.css";
import AppBanner from "./components/appBanner/AppBanner";
import AppFooter from "./components/appFooter/AppFooter";
import AppHeader from "./components/appHeader/AppHeader";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        <AppBanner />
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
