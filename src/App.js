import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [field, setField] = useState("");
  console.log("Field:", field);

  const data = async () => {
    const response = await axios.get(
      `https://api.adviceslip.com/advice/search/love`
    );
    const advices = response.data.slips;
    console.log("response", advices);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Solid Advice!</h1>
      <button onClick={() => setField("love")}>Love</button>
    </div>
  );
}

export default App;
