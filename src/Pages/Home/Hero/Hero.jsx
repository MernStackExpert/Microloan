// src/components/Hero.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { AuthContext } from "../../../Provider/AuthContext";

const Hero = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="bg-primary text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Get Your Loan <br /> Fast & Easy
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Apply for personal, home, or business loans effortlessly. Our platform is secure, fast, and available 24/7.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="btn btn-secondary btn-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="btn btn-secondary btn-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/all-loans" 
                    className="btn btn-ghost btn-lg rounded-full shadow hover:shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    Explore Loans
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img 
              src="/hero-loan.png" 
              alt="Hero Illustration" 
              className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
