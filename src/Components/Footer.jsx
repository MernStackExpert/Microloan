import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-300 py-16">
      <div className="container mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4">LoanLink</h3>
          <p className="text-base-content/70">
            Fast and reliable loan services to help you grow. Trusted by thousands of borrowers nationwide.
          </p>
          <div className="flex gap-4 mt-6 text-xl">
            <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="hover:text-primary"><FaFacebookF /></a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-primary"><FaTwitter /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-primary"><FaLinkedinIn /></a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="hover:text-primary"><FaInstagram /></a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-primary"><FaGithub /></a>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-base-content/70">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/all-loans" className="hover:text-primary">All Loans</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-4">Contact Us</h4>
          <p className="text-base-content/70 mb-2">01908716502</p>
          <p className="text-base-content/70 mb-2">mdnirob30k@gmail.com</p>
          <p className="text-base-content/70">Rajshahi, Bangladesh</p>
        </div>
      </div>

      <div className="mt-12 text-center text-base-content/50 text-sm">
        &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
