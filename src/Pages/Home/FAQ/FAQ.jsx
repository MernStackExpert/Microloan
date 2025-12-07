import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How long does it take to get approved?",
    answer: "Most loan applications are approved within 24 hours after submitting all required documents."
  },
  {
    question: "What documents do I need to apply?",
    answer: "You will need a valid ID, proof of income, and bank account details to apply for a loan."
  },
  {
    question: "Can I repay my loan early?",
    answer: "Yes, early repayment is allowed and may reduce the total interest you pay."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, LoanLink is transparent. All fees and interest rates are disclosed upfront."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-0 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-base-content/70 mt-4 max-w-2xl mx-auto">
            Find answers to the most common questions about LoanLink services.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-base-200 rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-lg focus:outline-none"
              >
                {faq.question}
                {openIndex === index ? <FiMinus /> : <FiPlus />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-base-content/70">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
