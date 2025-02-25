
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          About Us
        </h1>
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-muted-foreground text-center">
            We are committed to providing the best financial management tools to help you achieve your financial goals.
          </p>
          <div className="bg-card/50 backdrop-blur-sm p-8 rounded-lg shadow-lg space-y-6">
            <p className="text-lg">
              Our mission is to empower individuals and businesses with the insights and resources they need to make informed financial decisions.
            </p>
            <p className="text-lg">
              We believe that everyone deserves access to clear, reliable financial information. That's why we've created a platform that's both user-friendly and comprehensive.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact">
            <Button size="lg" className="px-8">
              Contact Us
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
