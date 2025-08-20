import "./App.css";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/chatWindow";
import { ChatProvider } from "./context/chatContext";
export default function App() {
  return (
   <ChatProvider>
    <div className="app">
        <h1>Gemini AI Chat</h1>
       <ChatInput/>
       <ChatWindow/>
      </div>
   </ChatProvider>
  );
}
