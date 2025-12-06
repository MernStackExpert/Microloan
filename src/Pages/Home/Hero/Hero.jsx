import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-30 -z-10"></div>

      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
              Fastest Microloan Approval in Bangladesh
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Get Your <br />
              <span className="text-primary">Dream Loan</span> <br />
              in <span className="text-secondary">24 Hours</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              No paperwork. No waiting. Apply online and get approved instantly. 
              LoanLink helps small businesses and individuals grow with flexible EMI plans.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/all-loans"
                className="btn btn-primary btn-lg rounded-full px-10 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-3 text-lg font-bold"
              >
                Apply for Loan <FiArrowRight className="text-xl" />
              </Link>
              <Link
                to="/all-loans"
                className="btn btn-outline btn-lg rounded-full px-10 hover:bg-primary hover:text-white transition-all"
              >
                Explore Loans
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-base-300 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-primary">10K+</h3>
                <p className="text-sm text-base-content/70 mt-1">Happy Borrowers</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-secondary">$5M+</h3>
                <p className="text-sm text-base-content/70 mt-1">Total Disbursed</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-success">98%</h3>
                <p className="text-sm text-base-content/70 mt-1">Approval Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Image + Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-base-200">
              <img
                src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2070&auto=format&fit=crop"
                alt="Happy borrower receiving loan approval"
                className="w-full h-[500px] lg:h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Floating Approval Card */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-10 bg-white dark:bg-base-200 border border-base-300 shadow-2xl rounded-2xl p-5 flex items-center gap-4 max-w-xs"
            >
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 text-3xl">
                <FiCheckCircle />
              </div>
              <div>
                <p className="text-sm font-medium text-base-content/70">Just Now</p>
                <p className="text-lg font-bold text-base-content">Loan Approved!</p>
                <p className="text-xs text-success">BDT 50,000 disbursed</p>
              </div>
            </motion.div>

            {/* Decorative Circle */}
            <div className="absolute top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-20 -left-16 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;