// src/components/Features.jsx
import React from "react";
import { FiShield, FiTrendingUp, FiClock, FiPhone } from "react-icons/fi";
import { motion } from "framer-motion";

const features = [
  {
    icon: FiClock,
    title: "Instant Approval",
    desc: "Get your loan approved in as fast as 24 hours with minimal paperwork.",
  },
  {
    icon: FiTrendingUp,
    title: "Flexible Plans",
    desc: "Choose EMI plans that suit your business or personal needs.",
  },
  {
    icon: FiShield,
    title: "Secure & Reliable",
    desc: "Your data is protected with top-notch security standards.",
  },
  {
    icon: FiPhone,
    title: "24/7 Support",
    desc: "Our support team is available round the clock to assist you.",
  },
];

const Features = () => {
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
            Why Choose <span className="text-primary">LoanLink</span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 mt-4 max-w-2xl mx-auto">
            We make borrowing easy, fast, and reliable for individuals and small businesses.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-base-200 dark:bg-base-300 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary text-3xl mb-4">
                <feature.icon />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-base-content/70 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
