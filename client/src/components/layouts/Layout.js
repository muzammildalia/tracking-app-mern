import React from "react";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster, Tosster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Tracking-App",
  description: "mern project",
  keywords: "mern,node,react,mongodb",
  author: "Muzammil Dalia,Muhammad Danish & Abdul Wahab",
};

export default Layout;
