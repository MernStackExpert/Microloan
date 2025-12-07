import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahim Mia",
      role: "Small Business Owner",
      text: "LoanLink helped me expand my shop in just 3 days. The process was completely online and super fast!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Fatema Begum",
      role: "Student",
      text: "Thanks to the Education Loan, I could complete my nursing course without any financial stress. Highly recommended!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Abdul Karim",
      role: "Farmer",
      text: "Got an agriculture loan within 24 hours. Now I can buy better seeds and equipment. Thank you LoanLink!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/46.jpg"
    },
    {
      name: "Salma Akter",
      role: "Entrepreneur",
      text: "Best microloan platform in Bangladesh! No hidden charges, transparent process, and excellent customer support.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      name: "Mizanur Rahman",
      role: "Shop Owner",
      text: "I applied at night and got approval in the morning. The EMI options are very flexible. Great service!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/86.jpg"
    }
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
            Thousands of people across Bangladesh trust LoanLink for their financial needs
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          className="testimonials-swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card bg-base-100 shadow-xl border border-base-300 h-full mx-4">
                <div className="card-body p-8 text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-base-content/80 text-lg leading-relaxed italic mb-8">
                    "{item.text}"
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={item.avatar} alt={item.name} />
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-base-content/60">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;