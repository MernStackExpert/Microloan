import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

const GetStarted = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-base-200">
      <div className=" px-2 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center space-y-10 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                    Ready to Get Your <span className="text-primary">Loan Today?</span>
                  </h2>
                  <p className="mt-6 text-xl text-base-content/80 leading-relaxed max-w-xl">
                    Join thousands of happy customers who trusted LoanLink. Fast approval, no hidden fees, fully digital process.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-4 text-lg">
                    <FiCheckCircle className="text-success text-2xl flex-shrink-0" />
                    <span>Instant approval in as little as 2 hours</span>
                  </div>
                  <div className="flex items-center gap-4 text-lg">
                    <FiCheckCircle className="text-success text-2xl flex-shrink-0" />
                    <span>100% online application – no paperwork</span>
                  </div>
                  <div className="flex items-center gap-4 text-lg">
                    <FiCheckCircle className="text-success text-2xl flex-shrink-0" />
                    <span>Flexible EMI plans that suit your budget</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6 flex-wrap"
                >
                  <Link
                    to="/all-loans"
                    className="btn btn-primary btn-lg rounded-full px-10 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg font-bold flex items-center justify-center gap-3"
                  >
                    Apply for Loan Now
                    <FiArrowRight className="text-xl" />
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-outline btn-lg rounded-full px-10 hover:bg-primary hover:text-white transition-all duration-300 text-lg font-bold"
                  >
                    Create Free Account
                  </Link>
                </motion.div>
              </div>

              <div className="relative hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=2070&auto=format&fit=crop"
                  alt="Happy customer receiving loan"
                  className="w-full h-full object-cover rounded-r-3xl"
                />
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-base-300 max-w-xs">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center text-success text-3xl">
                      <FiCheckCircle />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold">98% Approval Rate</p>
                      <p className="text-base-content/70">Most applications approved instantly</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent rounded-r-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
