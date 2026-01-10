import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Newsletter = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    toast.success("Subscribed successfully!");
    reset();
  };

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="bg-primary rounded-[2.5rem] p-10 md:p-20 text-center shadow-xl border border-primary">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary-content mb-6">
            Never Miss an Update!
          </h2>
          <p className="text-primary-content/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Subscribe to our newsletter and get the latest loan offers and financial news delivered to your inbox.
          </p>

          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="input input-lg flex-1 rounded-full px-8 bg-base-100 text-base-content border-none focus:outline-none focus:ring-4 focus:ring-white/20"
              required
              {...register("email")}
            />
            <button
              type="submit"
              className="btn btn-neutral btn-lg rounded-full px-10 font-bold shadow-lg hover:scale-105 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;