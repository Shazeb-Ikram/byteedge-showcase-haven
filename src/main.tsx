
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("Starting app initialization");

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  console.log("Root element found, rendering app");
  const root = createRoot(rootElement);
  root.render(<App />);
  console.log("App rendered successfully");
}
