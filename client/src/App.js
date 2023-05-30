// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import Contact from "./pages/Contact";
// import Policy from "./pages/Policy";
// import PageNotFound from "./pages/PageNotFound";
// import Register from "./pages/Auth/Register";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/user/Dashboard";
// import PrivateRoute from "./components/Routes/Private.js";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import Activity from "./pages/user/Activity";
// import Profile from "./pages/user/Profile";
// import UpdateActivity from "./components/UpdateActivity";
// import SignInSide from "./pages/Auth/SignInSide";
// import { AuthProvider } from "./context/auth";
// const App = () => {
//   return (
//     <AuthProvider>
//       {" "}
//       {/* Provide the AuthProvider here */}
//       <>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/dashboard" element={<PrivateRoute />}>
//             <Route path="" element={<Dashboard />} />
//           </Route>
//           <Route path="/activity" element={<PrivateRoute />}>
//             <Route path="" element={<Activity />} />
//           </Route>
//           <Route path="/updateactivity" element={<UpdateActivity />} />
//           <Route path="/profile" element={<PrivateRoute />}>
//             <Route path="" element={<Profile />} />
//           </Route>
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/signInSide" element={<SignInSide />} />
//           <Route path="/policy" element={<Policy />} />

//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </>
//     </AuthProvider>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import Contact from "./pages/Contact";
// import Policy from "./pages/Policy";
// import PageNotFound from "./pages/PageNotFound";
// import Register from "./pages/Auth/Register";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from "./pages/Auth/Login";
// import Dashboard from "./pages/user/Dashboard";
// import PrivateRoute from "./components/Routes/Private.js";
// import ForgotPassword from "./pages/Auth/ForgotPassword";
// import Activity from "./pages/user/Activity";
// import Profile from "./pages/user/Profile";
// import UpdateActivity from "./components/UpdateActivity";
// import SignInSide from "./pages/Auth/SignInSide";
// import { AuthProvider } from "./context/auth";

// const App = () => {
//   return (
//     <AuthProvider>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/dashboard" element={<PrivateRoute />}>
//           <Route path="" element={<Dashboard />} />
//         </Route>
//         <Route path="/activity" element={<PrivateRoute />}>
//           <Route path="" element={<Activity />} />
//         </Route>
//         <Route path="/updateactivity" element={<UpdateActivity />} />
//         <Route path="/profile" element={<PrivateRoute />}>
//           <Route path="" element={<Profile />} />
//         </Route>
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/signInSide" element={<SignInSide />} />
//         <Route path="/policy" element={<Policy />} />

//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </AuthProvider>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Activity from "./pages/user/Activity";
import Profile from "./pages/user/Profile";
import UpdateActivity from "./components/UpdateActivity";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/activity" element={<PrivateRoute />}>
          <Route path="" element={<Activity />} />
        </Route>
        <Route path="/updateactivity" element={<UpdateActivity />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
