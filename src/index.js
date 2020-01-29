import React, { useState, useReducer, useMemo } from "react";
import ReactDOM from "react-dom";
import MutatorSection from "./Editor/MutatorSection";
import Scaler from "./Editor/Scaler";
import Header from "./Theme/Widgets/Header";
import Welcome from "./Theme/Widgets/Welcome";
import About from "./Theme/Widgets/About";
import Page from "./Theme/Widgets/Page";
import Footer from "./Theme/Widgets/Footer";
import getComplementaryColors from "./Theme/themes/getComplementaryColors";
import "./styles.scss";

function reducer(zoomLevel, action) {
  switch (action.type) {
    case "increment":
      return zoomLevel + 0.1;
    case "decrement":
      return zoomLevel - 0.1;
    case "toggle":
      return zoomLevel === 1 ? 0.8 : 1;
    default:
      throw new Error();
  }
}

const widgets = [Welcome, About];

function App() {
  const [primary, setPrimary] = useState("#92211d");
  const [secondary, setSecondary] = useState("");
  const [scheme, setScheme] = useState("light");
  const [imgColors, setImgColors] = useState([]);
  const [heroColors, setHeroColors] = useState([]);
  const [zoomLevel, setZoomLevel] = useReducer(reducer, 1.0);

  const secondaryHues = useMemo(() => {
    return getComplementaryColors(primary);
  }, [primary]);

  return (
    <div className="App">
      <main id="scale-container" className="preview-container">
        {/* <ZoomSelector
          zoomLevel={zoomLevel.toFixed(1)}
          setZoomLevel={setZoomLevel}
        /> */}
        <Scaler scale={zoomLevel.toFixed(1)}>
          <div className="preview">
            <Page color={primary} secondaryColor={secondary} scheme={scheme}>
              <Header
                setHeroColors={setHeroColors}
                setImgColors={setImgColors}
              />
              {widgets.map((Widget, i) => {
                return <Widget key={i} index={i} />;
              })}
              <Footer />
            </Page>
          </div>
        </Scaler>
      </main>
      <aside>
        <MutatorSection />
      </aside>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
