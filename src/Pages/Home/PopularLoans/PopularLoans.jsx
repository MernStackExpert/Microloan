import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PopularLoans = () => {
  const axiosSecure = useAxiosSecure()
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosSecure.get("/loans");
        const allData = res.data.data || res.data;

        const homePageLoans = allData
          .filter(loan => loan.showOnHome === true) 
          .slice(0, 6); 

        setLoans(homePageLoans);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-20 bg-base-200">
      <div className="  px-2 lg:px-12">
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
            Choose from our carefully curated microloan options. Fast approval,
            transparent terms, and flexible EMI plans designed for your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {loans.map((loan, index) => (
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

                <div className="card-body p-7 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                    {loan.title}
                  </h3>
                  <p className="text-base-content/70 mt-3 line-clamp-3 flex-grow">
                    {loan.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-base-content/60">
                        Max Amount
                      </span>
                      <p className="text-3xl font-extrabold text-primary mt-1">
                        ৳{loan.maxLoanLimit}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-base-content/60">
                        Interest
                      </span>
                      <p className="text-2xl font-bold text-secondary">
                        {loan.interestRate}% <small className="text-xs">/year</small>
                      </p>
                    </div>
                  </div>

                  <div className="card-actions mt-6">
                    <Link
                      to={`/loan-details/${loan._id}`}
                      className="btn btn-primary w-full rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
                    >
                      View Details
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
