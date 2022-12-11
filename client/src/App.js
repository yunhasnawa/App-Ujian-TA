import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import EditView from "./components/EditView";
import HomeView from "./components/HomeView";
import AddView from "./components/AddView";

const App = () => {
    const mainContainerStyle = {
        padding: "8px",
    };

    return (
        <div style={mainContainerStyle}>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<HomeView />} />
                <Route path="/edit/:id" element={<EditView />} />
                <Route path="/create" element={<AddView />} />
            </Routes>
        </div>
    );
};

export default App;