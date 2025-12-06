// src/components/OurServices.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiUserCheck, FiCreditCard } from "react-icons/fi";

const services = [
  {
    icon: FiAward,
    title: "Trusted by Thousands",
    desc: "Our clients trust us for transparent processes and reliable loans every time.",
    color: "text-primary",
  },
  {
    icon: FiTrendingUp,
    title: "Boost Your Growth",
    desc: "Get financial support to expand your business or achieve personal goals quickly.",
    color: "text-secondary",
  },
  {
    icon: FiUserCheck,
    title: "Easy Verification",
    desc: "Simple KYC process ensures fast approval without unnecessary paperwork.",
    color: "text-accent",
  },
  {
    icon: FiCreditCard,
    title: "Flexible Loan Options",
    desc: "Multiple plans and EMIs tailored to your needs. You stay in control.",
    color: "text-success",
  },
];

const OurServices = () => {
  return (
    <section className="bg-base-100 py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 mt-4 max-w-2xl mx-auto">
            We offer tailored solutions for individuals and businesses. Fast, reliable, and convenient.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-base-200 dark:bg-base-300 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full text-3xl mb-4 ${service.color}`}>
                <service.icon />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-base-content/70">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;