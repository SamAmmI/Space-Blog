import Spaceapi from './Spaceapi';
import './index.css'

function App() {
  return(
    <>
      <div className="stars"></div>
      <div className="twinkling"></div>
      <header>
        <div className="header-left">
          <img className="head-logo" src="/OCPR.png" alt="Logo"></img>
          <h1>The MFR Space Blog</h1>
        </div>
      </header>
      
      <main className="Middle">
        <Spaceapi/>
      </main>

      <footer>

      </footer>
    
    </>
  );
}

export default App
