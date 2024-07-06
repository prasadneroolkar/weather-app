import { useState } from "react";
import "./App.css";
import { IoIosSearch } from "react-icons/io";

function App() {
  const [query, setQuery] = useState("");

  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <>
      <div className="search-box">
        <input
          type="text"
          value={query}
          placeholder="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <IoIosSearch onClick={handleClick} />
      </div>
    </>
  );
}

export default App;
