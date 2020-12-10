import './App.css';
import Bucket from './Bucket.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Bucket bucket={[1,1,3,4]}/>
        <Bucket bucket={[1,2,3,3]}/>
        <Bucket bucket={[1,2,4,4]}/>
        <Bucket bucket={[2,2,3,4]}/>
      </header>
    </div>
  );
}

export default App;
