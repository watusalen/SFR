import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "./domain/simulation-engine/index.ts"
createRoot(document.getElementById("root")!).render(<App />);
