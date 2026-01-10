import React from "react";
import { FiArrowRight } from "react-icons/fi";

const LatestNews = () => {
  const blogs = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=500",
      tag: "Business",
      title: "How to Grow Your Small Business",
      desc: "Our SME loans are designed to fuel your dreams with minimal paperwork and fast approval."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=500",
      tag: "Finance",
      title: "The Future of Digital Microloans",
      desc: "Instant approval and digital processing are making financial aid accessible to everyone."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1454165833767-027ffea7025c?q=80&w=500",
      tag: "Tips",
      title: "5 Tips for Faster Loan Approval",
      desc: "Keep your credit history clean and follow our simple guide for instant fund disbursement."
    }
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold">Financial <span className="text-primary">Insights</span></h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div key={blog.id} className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden group">
              <figure className="h-56 relative">
                <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={blog.title} />
                <div className="absolute top-4 left-4 badge badge-primary font-bold p-3 uppercase text-xs">
                  {blog.tag}
                </div>
              </figure>
              <div className="card-body p-8">
                <h3 className="card-title text-2xl font-bold mb-3">{blog.title}</h3>
                <p className="text-base-content/70 text-sm mb-6 leading-relaxed">{blog.desc}</p>
                <div className="card-actions">
                  <button className="flex items-center gap-2 text-primary font-black hover:gap-4 transition-all text-sm uppercase">
                    Read More <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;