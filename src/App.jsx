import axios from "axios";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { myList } from "./listjson";

function App() {
  const [list, setList] = useState([]);
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/babynames?gender=boy", {
        headers: { "X-Api-Key": apiKey },
      })
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // own json

  const uniqueList = Array.from(new Set(myList));
  const countOccurrences = (array, value) => {
    return array.filter((item) => item === value).length;
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <table style={{ marginRight: "100px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          {list.map((item, index) => (
            <tbody key={index}>
              <tr
                key={index}
                style={{
                  background:
                    myList.filter((name) => name === item).length > 10
                      ? "green" 
                      : myList.filter((name) => name === item).length >= 3
                      ? "yellow" 
                      : "red", 
                }}
              >
                <td>{item}</td>
                <td>{countOccurrences(list, item)}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          {uniqueList.map((item, index) => (
            <tbody key={index}>
              <tr
                key={index}
                style={{
                  background:
                    myList.filter((name) => name === item).length > 10
                      ? "green" 
                      : myList.filter((name) => name === item).length >= 3
                      ? "yellow" 
                      : "red", 
                }}
              >
                {" "}
                <td>{item}</td>
                <td>{myList.filter((name) => name === item).length}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default App;
