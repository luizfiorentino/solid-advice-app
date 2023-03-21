import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Loader = () => {
  return (
    <div>
      <Audio
        style={{ height: 100, width: 100, color: "red" }}
        ariaLabel="Loading"
      />{" "}
    </div>
  );
};

function App() {
  const [field, setField] = useState("");
  const [arrayAdvices, setArrayAdvices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("NEXT EVENT", field);
    const controller = new AbortController();
    console.log("controller,", controller);
    const data = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.adviceslip.com/advice/search/${field}`,
          // pass signal to request
          { signal: controller.signal }
        );
        if (response.data.slips) {
          const advices = response.data.slips;
          setLoading(false);
          setArrayAdvices(advices);
        } else {
          setLoading(false);
          setArrayAdvices([]);
        }
      } catch (e) {
        setLoading(false);
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

  let output;

  if (field === "") {
    output = "enter a search term or click a button";
  } else if (arrayAdvices.length === 0) {
    output = "no advice found matching this search";
  } else {
    output = arrayAdvices.map((advice) => (
      <li key={advice.id}>{advice.advice}</li>
    ));
  }

  console.log("field->", field, "arrayAdvices->", arrayAdvices);

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
      {field && <h3>Here's some solid advice 'bout :::{field}::::</h3>}
      {loading === true ? <Loader /> : undefined}
      <ol>{output}</ol>
    </div>
  );
}

export default App;
