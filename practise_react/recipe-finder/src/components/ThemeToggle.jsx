import {useTheme} from "../context/ThemeContext";
function ThemeToggle(){
  const {theme,toggleTheme}=useTheme();

  return(
    <button onClick={toggleTheme}
    style={{
      padding:"8px 12px",
      marginBottom:"20px",
      cursor:"pointer",
      background: theme==="light" ? "#333" : "#ddd",
      color:theme==="light" ? "#fff" : "#000",
      border:"none",
      borderRadius:"5px",
      fontWeight:"bold"
    }}>
      Switch to {theme==="light" ? "Dark":"Light"} Mode
    </button>
  )
}
export default ThemeToggle;