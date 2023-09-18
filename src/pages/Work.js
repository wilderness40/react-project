import React, { useState } from "react";
import '../styles/Work.css'
import { Header, Footer, Workpad } from "../components";

function Work() {
  return (
    <div className="work">
      <Header></Header>
      <Workpad></Workpad>
      <Footer></Footer>
    </div>
  )
}

export default Work