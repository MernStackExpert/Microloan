import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";

const AllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 6;

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get("http://localhost:3000/loans");
        const data = res.data.data || res.data;
        setLoans(data);
        setFilteredLoans(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  useEffect(() => {
    let temp = [...loans];
    if (categoryFilter !== "all") {
      temp = temp.filter((loan) => loan.category === categoryFilter);
    }
    if (searchTerm.trim() !== "") {
      temp = temp.filter(
        (loan) =>
          loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loan.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredLoans(temp);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, loans]);

  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstLoan, indexOfLastLoan);
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base-100">
        <span className="text-lg font-semibold text-primary">Loading...</span>
      </div>
    );
  }

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
            All <span className="text-primary">Loans</span>
          </h2>
          <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
            Explore all available microloan options. Choose the one that fits your needs and apply with ease.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by title or category"
            className="input input-bordered w-full sm:w-1/2 bg-base-200 text-base-content placeholder-base-content/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select select-bordered w-full sm:w-1/4 bg-base-200 text-base-content"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {Array.from(new Set(loans.map((loan) => loan.category))).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {currentLoans.length === 0 ? (
            <p className="text-center col-span-full text-lg text-base-content/70">
              No loans found.
            </p>
          ) : (
            currentLoans.map((loan, index) => (
              <motion.div
                key={loan._id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="card bg-base-100 shadow-md border border-base-300 rounded-3xl overflow-hidden transition-all duration-300 h-full flex flex-col">
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

                  <div className="card-body p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-base-content mb-2">
                      {loan.title}
                    </h3>
                    <p className="text-base-content/70 line-clamp-4 flex-grow">
                      {loan.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-base-content/60">
                          Max Amount
                        </span>
                        <p className="text-2xl font-extrabold text-primary mt-1">
                          ৳{loan.maxLoanLimit}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-base-content/60">
                          Interest
                        </span>
                        <p className="text-xl font-bold text-secondary">
                          {loan.interestRate}% <small className="text-xs">/year</small>
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link
                        to={`/loan-details/${loan._id}`}
                        className="btn btn-primary w-full rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`btn btn-sm ${num === currentPage ? "btn-primary" : "btn-outline"}`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLoans;