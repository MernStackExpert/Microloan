import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PageTitle from "../../Components/PageTitle";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [loans, setLoans] = useState([]);
  const [displayLoans, setDisplayLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 8;

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/loans");
        const data = res.data.data || res.data;
        setLoans(data);
        setDisplayLoans(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchLoans();
  }, [axiosSecure]);

  useEffect(() => {
    let filtered = [...loans];

    if (searchTerm) {
      filtered = filtered.filter((loan) =>
        loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((loan) => loan.category === category);
    }

    if (sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "low-to-high") {
      filtered.sort((a, b) => a.maxLoanLimit - b.maxLoanLimit);
    } else if (sort === "high-to-low") {
      filtered.sort((a, b) => b.maxLoanLimit - a.maxLoanLimit);
    }

    setDisplayLoans(filtered);
    setCurrentPage(1);
  }, [searchTerm, category, sort, loans]);

  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = displayLoans.slice(indexOfFirstLoan, indexOfLastLoan);
  const totalPages = Math.ceil(displayLoans.length / loansPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SkeletonCard = () => (
    <div className="card bg-base-100 shadow-md border border-base-300 rounded-[2rem] overflow-hidden h-full animate-pulse">
      <div className="h-48 bg-base-300"></div>
      <div className="p-5 space-y-4">
        <div className="h-6 bg-base-300 rounded w-3/4"></div>
        <div className="h-4 bg-base-300 rounded w-full"></div>
        <div className="flex justify-between pt-4">
          <div className="h-8 bg-base-300 rounded w-16"></div>
          <div className="h-8 bg-base-300 rounded w-16"></div>
        </div>
        <div className="h-10 bg-base-300 rounded w-full mt-4"></div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-base-200 min-h-screen">
      <PageTitle title="Explore Loans" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content">
            Explore All <span className="text-primary">Loans</span>
          </h2>
          <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
            Discover flexible microfinance options designed for your growth. Fast approval and transparent terms.
          </p>
        </div>

        <div className="bg-base-100 p-6 rounded-[2rem] shadow-sm border border-base-300 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by title or category..."
              className="input input-bordered w-full bg-base-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="select select-bordered w-full bg-base-100"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {Array.from(new Set(loans.map((loan) => loan.category))).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              className="select select-bordered w-full bg-base-100"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : currentLoans.map((loan, index) => (
                <motion.div
                  key={loan._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="h-full"
                >
                  <div className="card bg-base-100 shadow-sm hover:shadow-xl border border-base-300 rounded-[2rem] overflow-hidden transition-all duration-500 h-full flex flex-col">
                    <figure className="h-48 overflow-hidden bg-base-200 relative">
                      <img
                        src={loan.loanImage || loan.image}
                        alt={loan.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="badge badge-primary font-bold shadow-md">
                          {loan.category}
                        </span>
                      </div>
                    </figure>

                    <div className="card-body p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-base-content line-clamp-1">
                        {loan.title}
                      </h3>
                      <p className="text-sm text-base-content/70 line-clamp-2 mt-2 flex-grow">
                        {loan.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-base-200 pt-4">
                        <div>
                          <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-tighter">Max Limit</p>
                          <p className="text-lg font-black text-primary">৳{loan.maxLoanLimit}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-tighter">Interest</p>
                          <p className="text-lg font-bold text-secondary">{loan.interestRate}%</p>
                        </div>
                      </div>

                      <Link
                        to={`/loan-details/${loan._id}`}
                        className="btn btn-primary btn-block rounded-2xl mt-5 shadow-md hover:shadow-lg text-white font-bold transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {!loading && displayLoans.length === 0 && (
          <div className="text-center py-24">
            <p className="text-2xl font-bold text-base-content/30 italic">No matching loans found.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-16 gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-circle btn-outline border-base-300"
            >
              ❮
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`btn btn-circle ${
                  num === currentPage ? "btn-primary text-white" : "btn-ghost"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-circle btn-outline border-base-300"
            >
              ❯
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllLoans;