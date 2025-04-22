
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Heart, Award, Users, Shield } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-smartpaw-purple to-smartpaw-dark-purple text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About SmartPaw</h1>
            <p className="text-xl text-white/90 mb-8">
              Building a better world for pets and their owners through technology and community.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                SmartPaw began with a simple observation: pet owners were juggling multiple apps, services, and platforms to care for their pets. We believed there had to be a better way.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2023 by a team of pet lovers and tech enthusiasts, SmartPaw was created to simplify pet ownership by bringing everything together in one seamless platform.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're proud to connect thousands of pet owners with quality service providers and products, while offering innovative tools to monitor pet care and health.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Dogs playing"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-smartpaw-pink p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-semibold text-gray-800">Founded by pet lovers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Values</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              At SmartPaw, we're guided by a set of core values that influence everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-smartpaw-green rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Pet Wellbeing First</h3>
              <p className="text-gray-700">
                We believe every pet deserves the best care possible. Every decision we make puts the wellbeing of pets at the forefront.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-smartpaw-yellow rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Community Connection</h3>
              <p className="text-gray-700">
                We create meaningful connections between pet owners, service providers, and fellow pet lovers to build a supportive community.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-smartpaw-peach rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Quality & Trust</h3>
              <p className="text-gray-700">
                We carefully vet all service providers and products to ensure we're connecting pet owners with only the best options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {  /* <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The passionate people behind SmartPaw who are dedicated to making pet care easier and more enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900">Sarah Johnson</h3>
              <p className="text-smartpaw-purple font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm mb-4">
                Pet lover and tech enthusiast with a passion for creating innovative solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Michael Rodriguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900">Michael Rodriguez</h3>
              <p className="text-smartpaw-purple font-medium mb-3">CTO</p>
              <p className="text-gray-600 text-sm mb-4">
                Tech visionary focused on building scalable and user-friendly platforms.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Emma Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900">Emma Chen</h3>
              <p className="text-smartpaw-purple font-medium mb-3">Head of Operations</p>
              <p className="text-gray-600 text-sm mb-4">
                Organizational expert ensuring smooth experiences for all SmartPaw users.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="James Wilson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900">James Wilson</h3>
              <p className="text-smartpaw-purple font-medium mb-3">Head of Partnerships</p>
              <p className="text-gray-600 text-sm mb-4">
                Relationship builder connecting SmartPaw with quality service providers and brands.
              </p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Testimonials */}
      <section className="py-16 bg-smartpaw-gray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What People Say</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Stories from our community of pet owners and service providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm relative">
              <div className="mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "SmartPaw has been a game-changer for my busy schedule. I can book grooming appointments, order food, and monitor my dog's care all in one place."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Alicia Martinez</h4>
                  <p className="text-sm text-gray-600">Pet Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm relative">
              <div className="mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "As a dog walker, SmartPaw has helped me grow my business tremendously. I've connected with many new clients and the activity tracking feature impresses pet parents."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Service Provider"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">David Thompson</h4>
                  <p className="text-sm text-gray-600">Dog Walker</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm relative">
              <div className="mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "I love how I can track all my cat's activities when I'm traveling. The detailed logs give me peace of mind and help me ensure she's getting proper care."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sophie Kim</h4>
                  <p className="text-sm text-gray-600">Cat Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Get in Touch</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Have questions or suggestions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-smartpaw-purple bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-smartpaw-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Email Us</h3>
              <p className="text-gray-700">
                <a href="mailto:hello@smartpaw.com" className="hover:text-smartpaw-purple">
                  hello@smartpaw.com
                </a>
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-smartpaw-purple bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-smartpaw-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Call Us</h3>
              <p className="text-gray-700">
                <a href="tel:+1-800-SMARTPAW" className="hover:text-smartpaw-purple">
                  +1-800-SMARTPAW
                </a>
              </p>
            </div>

            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-smartpaw-purple bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-smartpaw-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Visit Us</h3>
              <p className="text-gray-700">
                123 Pet Street, Suite 100<br />
                San Francisco, CA 94107
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-smartpaw-purple">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Join the SmartPaw Community
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ready to simplify pet care and join thousands of happy pet owners?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-white text-smartpaw-purple hover:bg-gray-100 px-8 py-6 h-auto text-lg">
                Create an Account
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 h-auto text-lg">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
