import React from "react";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import useLocalStorage from "./hooks/useLocalStorage";
import { SocketProvider } from "./contexts/SocketProvider";

export default function App() {
  const [id, setId] = useLocalStorage("id");

  const HomeStack = (
    <SocketProvider id={id}>
      <Home id={id} />
      {/* <OtherComponents /> */}
    </SocketProvider>
  );

  return id ? HomeStack : <Auth onSubmitId={setId} />;
}
