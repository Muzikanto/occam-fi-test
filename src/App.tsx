import React from "react";
import "./App.css";
import VirtualizedList from "./components/Virtualized/VirtualizedList";
import { VirtualizeInstance } from "./components/Virtualized/hook";
// import logo from "./logo.svg";

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

const testRows = new Array(200000).fill(0) as number[];

function App() {
  const listRef = React.useRef<VirtualizeInstance | null>();

  const handleRandomScroll = () => {
    if (listRef.current) {
      listRef.current.scrollTo(getRandomInt(testRows.length - 1));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <VirtualizedList
          ref={listRef}
          itemHeight={70}
          options={testRows}
          spaceItems={6}
          renderOption={(item, i) => (
            <div style={{ height: 70, display: "flex", alignItems: "center" }}>
              <img
                src="https://ui-cdn.digitalocean.com/aurora/assets/images/cloud-logo--white-ddc0eb211b605dc641fef57ca3526f77.svg"
                alt={`img-${i}`}
                style={{ width: 30, height: 30, marginRight: 16 }}
              />
              <span>{`Item - ${i}`}</span>
            </div>
          )}
          style={{
            width: 400,
            height: 630,
            padding: "0px 16px",
            border: "solid 1px black",
          }}
        />

        <button style={{ marginTop: 24 }} onClick={handleRandomScroll}>
          Random scroll
        </button>

        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>
    </div>
  );
}

export default App;
