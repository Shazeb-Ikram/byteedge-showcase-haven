
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="page-transition min-h-screen">
      <section className="py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            About ByteEdge
          </h1>
          
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="text-lg text-muted-foreground">
              We're a team of passionate developers, designers, and project managers dedicated to delivering
              exceptional software solutions.
            </p>
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-4">
                Founded in 2025, ByteEdge began with a simple mission: to connect talented remote developers with businesses
                seeking high-quality software development services. What started as a small team of passionate technologists
                has grown into a global network of skilled professionals delivering exceptional digital solutions.
              </p>
              <p className="text-muted-foreground mb-4">
                We understand that every business is unique, with its own set of challenges and goals. That's why we take a
                personalized approach to each project, working closely with our clients to understand their specific needs and
                deliver tailored solutions that drive real business value.
              </p>
            </div>
          </div>
          
          <div className="bg-card p-10 rounded-lg shadow-md max-w-4xl mx-auto mb-20">
            <blockquote className="relative">
              <div className="absolute left-0 top-0 text-byteblue opacity-20 text-6xl">"</div>
              <p className="text-xl italic text-foreground ml-8 relative z-10">
                Our mission is to empower businesses with cutting-edge technology solutions, ensuring
                seamless digital transformation and growth.
              </p>
            </blockquote>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
