import Spaceapi from './Spaceapi';
import './index.css'

function App() {
  return(
    <>
      <div className="stars" aria-hidden="true"></div>
      <div className="twinkling" aria-hidden="true"></div>

      
      
      <div className="app-container">
        <aside className="sidebar sidebar-left" aria-label="Left sidebar"></aside>
        
        <main>
          <header>
            <div id="logoparent">
              <a href="https://mfrspace.blog">
                <img className="head-logo" id="logo" src="/OCPR.png" alt="MFR Space Blog Logo"></img>
              </a>
            </div>
              <h1>The MFR Space Blog</h1>

          </header>
          <Spaceapi/>
        </main>
        
        <aside className="sidebar sidebar-right" aria-label="Right sidebar"></aside>
      </div>
    </>
  );
}

export default App
