import './App.css';
import Attaque from './component/attaque';
import Lancement from './component/lancement';
import './images/luffy-pixel.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      
      </header>
      <main>
      <div className = "attaque">
        <Attaque />
      </div>
      </main>
    </div>
  );
}

export default App;
