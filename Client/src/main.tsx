import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.ts";
import FirebaseContext from "./Firebase/FirebaseContext.ts";
import { app } from "./Firebase/firebase.config.ts";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <FirebaseContext.Provider value={app}>
          <App />
        </FirebaseContext.Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
