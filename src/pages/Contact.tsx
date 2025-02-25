
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContactHeader />
      <motion.div 
        className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <ContactForm />
        </div>
        <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <ContactInfo />
        </div>
      </motion.div>
      <div className="mt-8 text-center">
        <Link to="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;
