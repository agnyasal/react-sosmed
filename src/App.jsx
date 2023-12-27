/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./redux/slices/usersSlices";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtherProfile from "./pages/OtherProfile";
import Profile from "./pages/Profile";
import axios from "axios";
import { baseUrl } from "./utils/config";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const keepLogin = async () => {
    const token = localStorage.getItem("sosmed_app");

    if (token) {
      const { data } = await axios.get(baseUrl + "/users/keeplogin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(loginAction(data.data));
    }
  };

  useEffect(() => {
    keepLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        {!user.id ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : null}

        {user.id ? <Route path="/profile" element={<Profile />} /> : null}

        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<OtherProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
