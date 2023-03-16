import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [field, setField] = useState("");
  const [arrayAdvices, setArrayAdvices] = useState([]);
  //console.log("Field:", field);

  const data = async (field) => {
    const response = await axios.get(
      `https://api.adviceslip.com/advice/search/${field}`
    );
    const advices = response.data.slips;
    //console.log("response", advices);
    setArrayAdvices(advices);
  };

  useEffect(() => {
    field === "" ? <p>"Click a button"</p> : data(field);
  }, [data(field)]);

  //console.log("advices", arrayAdvices);

  //cheese, love, friends, sleep, food, spiders, regret, work
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

  return (
    <div className="App">
      <h1>Welcome to Solid Advice!</h1>
      {buttons.map((button) => (
        <button
          key={button}
          onClick={() => {
            setField(button);

            data(field);
          }}
        >
          {button}
        </button>
      ))}

      {field && <h3>Here's some solid advice 'bout {field}:</h3>}

      <ol>
        {arrayAdvices ? (
          arrayAdvices.map((advice) => <li key={advice.id}>{advice.advice}</li>)
        ) : (
          <p>Loading</p>
        )}
      </ol>
    </div>
  );
}

export default App;
