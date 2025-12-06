// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingUsd, FaShieldAlt, FaChartLine, FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 opacity-40"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Who We Are</span>
              <h1 className="text-5xl lg:text-6xl font-extrabold mt-4 mb-6 leading-tight">
                Empowering Your <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Financial Freedom
                </span>
              </h1>
              <p className="text-lg text-base-content/80 mb-8 leading-relaxed">
                LoanLink is a revolutionary microloan platform that connects dreams with opportunities. 
                We provide fast, fair, and fully digital financial solutions to individuals and small businesses 
                who are overlooked by traditional banks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/all-loans" 
                  className="btn btn-primary btn-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Explore Loans
                </Link>
                <Link 
                  to="/contact" 
                  className="btn btn-outline rounded-full hover:bg-primary hover:text-white transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-300">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070"
                  alt="Financial Freedom"
                  className="w-full h-[500px] object-cover hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <p className="text-white text-xl font-bold flex items-center gap-3">
                    <FaQuoteLeft className="text-primary" />
                    Trusted by Thousands of Dreamers
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "10K+", label: "Active Borrowers", color: "text-primary" },
              { number: "$5M+", label: "Total Disbursed", color: "text-secondary" },
              { number: "98%", label: "Approval Rate", color: "text-accent" },
              { number: "24hrs", label: "Avg. Approval Time", color: "text-success" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-base-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <h3 className={`text-5xl font-extrabold ${stat.color}`}>{stat.number}</h3>
                <p className="mt-3 text-base-content/70 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">Why Choose LoanLink?</h2>
            <p className="mt-4 text-xl text-base-content/70 max-w-3xl mx-auto">
              We don't just give loans — we give hope, opportunity, and a path to financial independence.
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: FaHandHoldingUsd, title: "Lightning Fast Approval", desc: "Get approved in as little as 2 hours. No waiting, no stress.", color: "bg-blue-500" },
              { icon: FaShieldAlt, title: "Bank-Level Security", desc: "Your data is encrypted and protected with industry-leading security.", color: "bg-green-500" },
              { icon: FaChartLine, title: "Flexible & Fair Rates", desc: "No hidden fees. Transparent terms designed for your success.", color: "bg-purple-500" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 border border-base-300"
              >
                <div className="card-body items-center text-center p-10">
                  <div className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg`}>
                    <item.icon />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-base-content/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
                alt="Our Journey"
                className="rounded-3xl shadow-2xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold uppercase tracking-wider">Our Journey</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                From Vision to Reality
              </h2>
              <p className="text-lg text-base-content/80 mb-6 leading-relaxed">
                Founded in 2024, LoanLink was created with one mission: to democratize access to credit. 
                We saw millions of hardworking people denied loans due to outdated systems. 
                Today, we're proud to have helped thousands achieve their dreams.
              </p>
              <div className="space-y-4">
                {["Paperless Process", "No Collateral Required", "Flexible Repayment", "24/7 Support"].map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <span className="text-lg font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <blockquote className="mt-10 p-6 bg-base-200 rounded-2xl border-l-4 border-primary italic text-base-content/80">
                "Financial freedom isn't a privilege — it's a right. We're here to make it happen."
                <footer className="mt-4 text-primary font-bold">— Founder & CEO, LoanLink</footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;