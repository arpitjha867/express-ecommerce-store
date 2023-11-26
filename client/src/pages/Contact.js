import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            How to connect to me :
          </p>
          <p className="mt-3">
            <BiMailSend /> : arpitjha867@gmail.com
          </p>
          <p className="mt-3">
            <FaGithub /> : <a className="fw-bold" href="https://github.com/arpitjha867">My GitHub</a>
          </p>
          <p className="mt-3">
            <FaLinkedin /> : <a className="fw-bold" href="https://www.linkedin.com/in/arpitjha867">My LinkedIn</a>
          </p>
          <p className="mt-3">
          <CgWebsite /> : <a className="fw-bold" href="https://arpit-jha-portfolio.netlify.app/">My Portfolio</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
