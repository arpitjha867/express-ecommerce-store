import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend } from "react-icons/bi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/profile.jpeg"
            alt="contactus"
            style={{ width: "450px" , height:"450px" , borderRadius:"50%"}}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          <h4 className="text-black text-start">Full Stack Software Engineer with skills in MERN stack. Strong analytical and problem-solving skills to create data-driven products. Passionate about making world a better place with the use of technology and open source contributions.</h4>
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
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
