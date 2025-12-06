// src/components/PopularLoans.jsx (এখন PopularLoans নামে রাখো)
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Dummy 6 Loans Data (পরে API দিয়ে রিপ্লেস করবে)
const dummyLoans = [
  {
    _id: "1",
    title: "Personal Loan",
    description: "Quick cash for personal needs, medical emergency, travel or any urgent requirement.",
    maxLimit: 200000,
    interestRate: 12,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    category: "Personal"
  },
  {
    _id: "2",
    title: "Business Startup Loan",
    description: "Start or expand your small business with flexible repayment and low documentation.",
    maxLimit: 1000000,
    interestRate: 14,
    image: "https://images.unsplash.com/photo-1559526324-c1f1664c4e0f?w=800&q=80",
    category: "Business"
  },
  {
    _id: "3",
    title: "Education Loan",
    description: "Fund your or your child's higher education with easy EMI and zero processing fee.",
    maxLimit: 500000,
    interestRate: 10,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    category: "Education"
  },
  {
    _id: "4",
    title: "Emergency Loan",
    description: "Instant approval for medical emergencies, repairs, or any urgent financial need.",
    maxLimit: 100000,
    interestRate: 15,
    image: "https://images.unsplash.com/photo-1556742111-a22e8c2d7d3f?w=800&q=80",
    category: "Emergency"
  },
  {
    _id: "5",
    title: "Home Renovation Loan",
    description: "Upgrade your home with modern interiors, furniture or repair works.",
    maxLimit: 800000,
    interestRate: 13,
    image: "https://images.unsplash.com/photo-1600563438655-e5af06288119?w=800&q=80",
    category: "Home"
  },
  {
    _id: "6",
    title: "Agriculture Loan",
    description: "Support for farmers - buy seeds, equipment, or expand farming operations.",
    maxLimit: 600000,
    interestRate: 11,
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
    category: "Agriculture"
  }
];

const PopularLoans = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" }
    })
  };

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Available <span className="text-primary">Loans</span>
          </h2>
          <p className="mt-5 text-lg md:text-xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
            Choose from our carefully curated microloan options. Fast approval, transparent terms, and flexible EMI plans designed for your success.
          </p>
        </motion.div>

        {/* Loans Grid - 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {dummyLoans.map((loan, index) => (
            <motion.div
              key={loan._id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="card bg-base-100 shadow-xl border border-base-300 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <figure className="h-56 overflow-hidden bg-base-200">
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary badge-lg font-bold shadow-lg">
                      {loan.category}
                    </span>
                  </div>
                </figure>

                {/* Card Body */}
                <div className="card-body p-7 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                    {loan.title}
                  </h3>

                  <p className="text-base-content/70 mt-3 line-clamp-3 flex-grow">
                    {loan.description}
                  </p>

                  {/* Max Limit */}
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-base-content/60">Max Amount</span>
                      <p className="text-3xl font-extrabold text-primary mt-1">
                        ৳{loan.maxLimit.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-base-content/60">Interest</span>
                      <p className="text-2xl font-bold text-secondary">
                        {loan.interestRate}% <small className="text-xs">/year</small>
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="card-actions mt-6">
                    <Link
                      to={`/loan-details/${loan._id}`}
                      className="btn btn-primary w-full rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
                    >
                      View Details
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            to="/all-loans"
            className="btn btn-outline btn-primary btn-lg rounded-full px-14 shadow-xl hover:shadow-2xl hover:bg-primary hover:text-white transition-all duration-300 text-lg font-bold"
          >
            View All Available Loans
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularLoans;