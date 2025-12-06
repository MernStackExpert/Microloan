// src/pages/Contact.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub 
} from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";

const Contact = () => {
  const { user } = useContext(AuthContext);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    }
  });

  const onSubmit = (data) => {
    console.log("Contact Form:", data);
    toast.success("Thank you! Your message has been sent successfully. We'll reply soon!", {
      duration: 5000,
      icon: "✉️",
    });
    reset();
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="min-h-screen bg-base-100 py-16">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Get in Touch With Us
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Have questions? Need help with your loan application? We're here 24/7 to assist you.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="card bg-base-100 shadow-2xl border border-base-300 rounded-3xl overflow-hidden">
              <div className="card-body p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">Full Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered input-primary w-full rounded-xl"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text font-semibold">Email Address</span>
                      </label>
                      <input
                        type="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="input input-bordered input-primary w-full rounded-xl"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Subject</span>
                    </label>
                    <input
                      type="text"
                      {...register("subject", { required: "Subject is required" })}
                      className="input input-bordered input-primary w-full rounded-xl"
                      placeholder="Loan Inquiry / Support / Feedback"
                    />
                    {errors.subject && <p className="text-error text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Your Message</span>
                    </label>
                    <textarea
                      {...register("message", { 
                        required: "Message is required",
                        minLength: { value: 20, message: "Message must be at least 20 characters" }
                      })}
                      className="textarea textarea-bordered textarea-primary w-full h-40 rounded-xl"
                      placeholder="Write your message here..."
                    />
                    {errors.message && <p className="text-error text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg rounded-full px-12 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { icon: FaPhoneAlt, title: "Call Us", info: "01908716502", sub: "Mon-Sun: 24 Hours Open" },
              { icon: FaEnvelope, title: "Email Us", info: "mdnirob30k@gmail.com", sub: "We reply within 1 hour" },
              { icon: FaMapMarkerAlt, title: "Visit Us", info: "Rajshahi, Bangladesh", sub: "Head Office" },
              { icon: FaClock, title: "Working Hours", info: "24 Hours / 7 Days", sub: "Always here for you" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="card bg-base-200 shadow-xl border border-base-300 p-6 rounded-2xl"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl">
                    <item.icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-xl font-semibold mt-1">{item.info}</p>
                    <p className="text-sm text-base-content/60 mt-1">{item.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <div className="card bg-primary text-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-6 text-center">Follow Us</h3>
              <div className="flex justify-center gap-6 text-3xl">
                <a href="https://www.facebook.com/nirob" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaFacebookF /></a>
                <a href="https://twitter.com/nirob" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaTwitter /></a>
                <a href="https://www.linkedin.com/in/nirob" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaLinkedinIn /></a>
                <a href="https://github.com/nirob" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaGithub /></a>
                <a href="https://www.instagram.com/nirob" target="_blank" rel="noreferrer" className="hover:scale-125 transition-transform"><FaInstagram /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <div className="container mx-auto px-6">
          <div className="bg-base-200 rounded-3xl overflow-hidden shadow-2xl border border-base-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.707667170092!2d88.60544631536923!3d24.375883084375453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdf9a1e472b6c3%3A0x72f9f9c9e0c3e1e0!2sRajshahi%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1710000000001"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LoanLink Rajshahi Location"
            ></iframe>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
