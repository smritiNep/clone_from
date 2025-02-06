import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@components/layouts/Header";
import Form from "@pages/form/Form";
import Updatelist from "@pages/list/Updatelist";
import View from "@pages/list/View";
import Edit from "@pages/list/Edit";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Header onSearch={handleSearch} />
      <div className="flex min-h-screen bg-[#222]">
        <div className="w-[5rem] bg-[#333]"></div>
        <div className="ml-[1rem] flex-1 pt-16 px-4 md:px-10">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/updates" element={<Updatelist searchQuery={searchQuery} />} />
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