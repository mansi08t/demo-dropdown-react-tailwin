import './App.css';
import Dropdown from './components/Dropdown/Dropdown';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Custom Dropdown</h1>
      <Dropdown />
    </div>
  );
}

export default App;


