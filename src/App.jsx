import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@components/layouts/Header";
import Form from "@pages/form/Form";
import Updates from "@pages/list/Updatelist";
import View from "@pages/list/View";
import Edit from "@pages/list/Edit"; 

function App() {
  return (
    <Router>
      <Header />
      <div className="flex min-h-screen bg-[#222]">
        <div className="hidden md:block md:w-[14rem] bg-[#333]"></div>

        {/* Main content area */}
        <div className="flex-1 pt-20 px-4 md:px-10 flex items-center justify-center">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/view/:id" element={<View />} />
              <Route path="/edit/:id" element={<Edit />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
