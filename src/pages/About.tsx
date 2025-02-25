import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-4">
          We are committed to providing the best financial management tools to help you achieve your financial goals.
        </p>
        <p>
          Our mission is to empower individuals and businesses with the insights and resources they need to make informed financial decisions.
        </p>
        <p>
          We believe that everyone deserves access to clear, reliable financial information. That's why we've created a platform that's both user-friendly and comprehensive.
        </p>
      </div>
      <div className="mt-8">
        <Link to="/contact">
          <Button>Contact Us</Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
