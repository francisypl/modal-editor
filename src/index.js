import React, { useState, useContext, useMemo } from "react";
import ReactDOM from "react-dom";
import MutatorSection from "./Editor/MutatorSection";
import Scaler from "./Editor/Scaler";
import Header from "./Theme/Widgets/Header";
import Welcome from "./Theme/Widgets/Welcome";
import About from "./Theme/Widgets/About";
import Page from "./Theme/Widgets/Page";
import Footer from "./Theme/Widgets/Footer";
import Modal from "./Theme/Modal";
import getComplementaryColors from "./Theme/themes/getComplementaryColors";
import { AppStoreProvider } from "./common/AppStoreContext";
import "./styles.scss";

const widgets = [Welcome, About];

function App() {
  const [primary, setPrimary] = useState("#92211d");
  const [secondary, setSecondary] = useState("");
  const [scheme, setScheme] = useState("light");
  const [imgColors, setImgColors] = useState([]);
  const [heroColors, setHeroColors] = useState([]);

  const secondaryHues = useMemo(() => {
    return getComplementaryColors(primary);
  }, [primary]);

  return (
    <div className="App">
      <main id="scale-container" className="preview-container">
        <AppStoreProvider>
          {/* <ZoomSelector
          zoomLevel={zoomLevel.toFixed(1)}
          setZoomLevel={setZoomLevel}
        /> */}
          <div className="preview">
            <Page color={primary} secondaryColor={secondary} scheme={scheme}>
              <Modal />
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
        </AppStoreProvider>
      </main>
      <aside>
        <MutatorSection />
      </aside>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
