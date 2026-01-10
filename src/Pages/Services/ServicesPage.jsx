import React from "react";
import { motion } from "framer-motion";
import { 
  FiAward, FiTrendingUp, FiUserCheck, FiCreditCard, 
  FiShield, FiClock, FiSmartphone, FiPieChart, FiArrowRight 
} from "react-icons/fi";
import { Link } from "react-router";
import PageTitle from "../../Components/PageTitle";

const coreServices = [
  {
    icon: FiAward,
    title: "Trusted by Thousands",
    desc: "Our clients trust us for transparent processes and reliable loans every time.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: FiTrendingUp,
    title: "Boost Your Growth",
    desc: "Get financial support to expand your business or achieve personal goals quickly.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: FiUserCheck,
    title: "Easy Verification",
    desc: "Simple KYC process ensures fast approval without unnecessary paperwork.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: FiCreditCard,
    title: "Flexible Loan Options",
    desc: "Multiple plans and EMIs tailored to your needs. You stay in control.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

const extraServices = [
  {
    icon: FiShield,
    title: "Bank-Level Security",
    desc: "Your data is protected with 256-bit encryption. Safety is our priority.",
    color: "text-info",
  },
  {
    icon: FiClock,
    title: "24-Hour Disbursement",
    desc: "Once approved, funds reach your account in less than 24 working hours.",
    color: "text-warning",
  },
  {
    icon: FiSmartphone,
    title: "Fully Digital Process",
    desc: "Apply, track, and repay your loans entirely through our mobile-friendly app.",
    color: "text-error",
  },
  {
    icon: FiPieChart,
    title: "No Hidden Costs",
    desc: "Complete transparency in interest rates and processing fees. No surprises.",
    color: "text-primary",
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <PageTitle title="Our Services" />

      {/* Hero Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Financial Solutions <br /> <span className="text-primary">Tailored for You</span>
          </motion.h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-10">
            From emergency medical funds to small business expansion, we provide fast and reliable microfinance services across Bangladesh.
          </p>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold italic uppercase tracking-tighter">Premium Benefits</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-base-100 border border-base-300 rounded-[2.5rem] p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`w-20 h-20 flex items-center justify-center rounded-2xl text-4xl mx-auto mb-6 transition-transform group-hover:rotate-12 ${service.bgColor} ${service.color}`}>
                  <service.icon />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-base-content/60 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Features Section */}
      <section className="py-20 bg-base-200 rounded-[4rem] mx-4 lg:mx-10 mb-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Why Thousands Choose <br /> <span className="text-primary">LoanLink</span> Daily
              </h2>
              <p className="text-lg text-base-content/70 mb-8">
                We've redesigned microfinance to be simple, fast, and human-centric. Our technology ensures you get help when you need it most.
              </p>
              <Link to="/all-loans" className="btn btn-primary btn-lg rounded-full px-10 font-bold shadow-lg shadow-primary/30">
                Explore Loan Plans <FiArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {extraServices.map((item, i) => (
                <div key={i} className="bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm">
                  <item.icon className={`text-3xl mb-4 ${item.color}`} />
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-base-content/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Simple Steps Section (Adding more value) */}
      <section className="py-20 container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-4xl font-extrabold mb-16">Ready to Get <span className="text-secondary">Started?</span></h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-black shadow-lg shadow-primary/40">1</div>
            <h4 className="font-bold text-xl">Choose a Plan</h4>
            <p className="text-base-content/60">Browse our various loan categories and pick what suits you.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-black shadow-lg shadow-primary/40">2</div>
            <h4 className="font-bold text-xl">Apply Online</h4>
            <p className="text-base-content/60">Fill out a 2-minute application form with basic details.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto text-xl font-black shadow-lg shadow-primary/40">3</div>
            <h4 className="font-bold text-xl">Receive Funds</h4>
            <p className="text-base-content/60">Once approved, money is sent directly to your bank or mobile wallet.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;