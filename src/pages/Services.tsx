import Header from "../Components/Header"; 
import Footer from "../Components/Footer"; 
import "../App.css";

function Services() {
  return (
    <div>
      <Header />
      <div className="bg-[#f393ae] min-h-screen">
        <section className="relative flex flex-col items-center text-center">
          <div className="absolute mt-30 w-full relative">
            <div className="relative">
              <img 
                src="/src/assets/services/service_banner.png" 
                alt="Shop Banner" 
                className="w-full"
              />
            
              <img 
                src="/src/assets/services/service_text.png" 
                alt="Shop Overlay" 
                className="absolute w-1/3 top-[35%] left-1/2 -translate-x-1/2 z-1"
              />
            </div>
            
            <img 
                src="/src/assets/shop/BG.png" 
                alt="clouds" 
                className="absolute top-0 left-0 w-full opacity-100"
                style={{
                  maskImage: "linear-gradient(to top, white 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to top, white 40%, transparent 100%)"
                }}
              />
            
            <div className="relative z-1 pt-60 pb-0">
              <div className="flex flex-wrap justify-center gap-10 justify-between overflow-x-auto space-x-4 p-4">
                {/* Image 1 */}
                <div className="flex justify-center shrink-0">
                  <img 
                    src="/src/assets/services/arch4.png"
                    alt="Arch 4"
                    className="object-contain max-w-[90%] md:max-w-[45%] lg:max-w-[80%] transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Image 2 */}
                <div className="flex justify-center shrink-0">
                  <img 
                    src="/src/assets/services/arch3.png"
                    alt="Arch 3"
                    className="object-contain max-w-[90%] md:max-w-[45%] lg:max-w-[80%] transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Image 3 */}
                <div className="flex justify-center shrink-0">
                  <img 
                    src="/src/assets/services/arch2.png"
                    alt="Arch 2"
                    className="object-contain max-w-[90%] md:max-w-[45%] lg:max-w-[80%] transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Image 4 */}
                <div className="flex justify-center shrink-0">
                  <img 
                    src="/src/assets/services/arch1.png"
                    alt="Arch 1"
                    className="object-contain max-w-[90%] md:max-w-[45%] lg:max-w-[80%] transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Image 5 */}
                <div className="flex justify-center shrink-0">
                  <img 
                    src="/src/assets/services/arch.png"
                    alt="Arch"
                    className="object-contain max-w-[90%] md:max-w-[45%] lg:max-w-[80%] transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            <div className="relative w-full">
              {/* Background Image with Responsive Sizing */}
              <img 
                src="/src/assets/services/footbanner.png" 
                alt="circle" 
                className="w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[800px] object-cover"
              />

              {/* Fixed Overlay Text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl text-center">
                <h2 className="text-gray-800 text-1xl sm:text-3xl font-bold mb-0 mt-35">
                  Why Choose Love, Rivi?
                </h2>
                <div className="bg-[#FEC9D1] p-6 rounded-lg shadow-md
                w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] xl:w-[95%] 
                mx-auto my-6 sm:my-8">
                  <ul className="text-gray-700 space-y-4 
                text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl 
                text-start leading-relaxed">
                    <li><strong>● Personalized Creations:</strong> Every product can be customized to fit your style, theme, and preferences.</li>
                    <li><strong>● Craftsmanship:</strong> We use quality materials to ensure that each item is made to last and be treasured.</li>
                    <li><strong>● Passion for Detail:</strong> From color to design, we add thoughtful details to make each product unique.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
