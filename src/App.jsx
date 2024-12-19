// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

// import React from "react";

import CartHeader from "./components/CartHeader";
import ShopList from "./components/ShopList";
import CartInput from "./components/CartInput";
import BoughtList from "./components/BoughtList";
import CartFooter from "./components/CartFooter";
// import './App.css'

function App() {
  return (
    <div>
      <CartHeader />
      <main>
        <section>
          <h2>전체 목록</h2>
        </section>
        <ShopList />

        <CartInput />
        <input type="checkbox" id="show-bought-items" />
        <label>산 물건 보기</label>
        <BoughtList />
      </main>
      <CartFooter />

      {/* <BoughtList></BoughtList>
    <CartFooter></CartFooter>
    <CartHeader></CartHeader>
    <CartInput></CartInput>
    <ShopList></ShopList> */}
    </div>
  );
}

export default App;
