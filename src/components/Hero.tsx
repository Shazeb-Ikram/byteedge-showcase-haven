
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            <span className="text-foreground">Innovative Software Solutions for </span>
            <span className="text-byteblue">Global Businesses</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 animate-fade-in animation-delay-100">
            ByteEdge connects talented remote developers with clients worldwide to deliver premium
            web and mobile applications that drive business growth.
          </p>
          
          <Link to="/contact">
            <Button 
              className="button-primary animate-scale-in animation-delay-200"
              size="lg"
            >
              Request a Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
