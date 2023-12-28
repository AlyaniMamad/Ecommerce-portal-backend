import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us - Akshay&Team"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contact.jpeg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@akshayAndTeam.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 6356645049
          </p>
          <p className="mt-3">
            <BiSupport /> : +91 6356645049 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;