import React from "react";
import { FiUsers, FiDollarSign, FiFileText, FiCheckCircle } from "react-icons/fi";

const Stats = () => {
  const statsData = [
    { id: 1, label: "Total Borrowers", value: "1,200+", icon: <FiUsers />, color: "text-primary" },
    { id: 2, label: "Total Disbursed", value: "৳50M+", icon: <FiDollarSign />, color: "text-secondary" },
    { id: 3, label: "Loan Requests", value: "4,500+", icon: <FiFileText />, color: "text-accent" },
    { id: 4, label: "Approval Rate", value: "98%", icon: <FiCheckCircle />, color: "text-success" },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="card bg-base-100 shadow-xl border border-base-300 p-8 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className={`text-4xl flex justify-center mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-base-content">
                {stat.value}
              </h3>
              <p className="text-base-content/60 mt-2 font-bold uppercase tracking-widest text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;