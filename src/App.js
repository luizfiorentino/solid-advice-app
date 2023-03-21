import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [field, setField] = useState("");
  const [arrayAdvices, setArrayAdvices] = useState([]);
  console.log("Field:", field);

  useEffect(() => {
    try {
      const data = async () => {
        const response = await axios.get(
          `https://api.adviceslip.com/advice/search/${field}`
        );
        const advices = response.data.slips;
        //console.log("response", advices);
        setArrayAdvices(advices);
      };
      data();
    } catch (e) {
      console.log(e.message);
    }
  }, [field]);

  const buttons = [
    "cheese",
    "love",
    "friends",
    "sleep",
    "food",
    "spiders",
    "regret",
    "work",
  ];

  console.log("array advices", arrayAdvices);

  return (
    <div className="App">
      <h1>Welcome to Solid Advice!</h1>
      <div className="buttons">
        {buttons.map((button) => (
          <button
            className="btn"
            key={button}
            onClick={() => {
              setField(button);
            }}
          >
            {button}
          </button>
        ))}
      </div>
      {field && <h3>Here's some solid advice 'bout {field}:</h3>}

      <ol>
        {arrayAdvices !== [] ? (
          arrayAdvices.map((advice) => <li key={advice.id}>{advice.advice}</li>)
        ) : (
          <li>Choose a field above to get some wise advice</li>
        )}
      </ol>
    </div>
  );
}

export default App;
