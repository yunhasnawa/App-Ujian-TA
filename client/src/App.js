import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import EditView from "./components/EditView";
import Create from "./components/create";
import HomeView from "./components/HomeView";
import Edit from "./components/edit";

const App = () => {
    let params = useParams();
    let navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<HomeView />} />
                <Route path="/edit/:id" element={<EditView params={params} navigate={navigate} />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </div>
    );
};

export default App;