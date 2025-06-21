import '../style/about.css';

export default function About() {
  return (
    <section className="about-section">
      <div className="about-hero">
        <h1 className="about-title">About EstateEase</h1>
        <div className="about-underline"></div>
        <p className="about-subtitle">
          Your trusted partner in finding the perfect property.
        </p>
      </div>
      <div className="about-content">
        <div className="about-card">
          <h2 className="about-card-title">Who We Are</h2>
          <p>
            EstateEase is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
          </p>
        </div>
        <div className="about-card">
          <h2 className="about-card-title">Our Mission</h2>
          <p>
            Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
          </p>
        </div>
        <div className="about-card">
          <h2 className="about-card-title">Why Choose Us</h2>
          <p>
            Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
          </p>
        </div>
      </div>
    </section>
  );
}
