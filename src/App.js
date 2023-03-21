import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [field, setField] = useState("");
  const [arrayAdvices, setArrayAdvices] = useState([]);
  //console.log("Field:", field);

  useEffect(() => {
    console.log("NEXT EVENT", field);
    const controller = new AbortController();
    console.log("controller,", controller);
    const data = async () => {
      try {
        const response = await axios.get(
          `https://api.adviceslip.com/advice/search/${field}`,
          // pass signal to request
          { signal: controller.signal }
        );
        if (response.data.slips) {
          const advices = response.data.slips;
          //console.log("response", advices);
          setArrayAdvices(advices);
          //console.log("response", response);
        } else {
          setArrayAdvices([]);
        }
      } catch (e) {
        console.log(e.message);
        setArrayAdvices([]);
      }
    };
    data();

    return () => {
      console.log("CLEANUP OF THE PREVIOUS EFFECT", field);
      console.log("GETS FIRED BEFORE THE NEXT EVENT");
    };
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

  //console.log("array advices", arrayAdvices);

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
      <input value={field} onChange={(e) => setField(e.target.value)} />
      {field && <h3>Here's some solid advice 'bout {field}:</h3>}

      <ol>
        {arrayAdvices !== [] ? (
          arrayAdvices?.map((advice) => (
            <li key={advice.id}>{advice.advice}</li>
          ))
        ) : (
          <li>Choose a field above to get some wise advice</li>
        )}
      </ol>
    </div>
  );
}

export default App;
