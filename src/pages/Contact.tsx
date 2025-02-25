
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { FloatingShape } from "@/components/ui/3d/FloatingShape";

const Contact = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div className="relative min-h-screen">
      <FloatingShape />
      <div className="container mx-auto px-4 py-8">
        <ContactHeader />
        <motion.div 
          className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ scale }}
        >
          <motion.div 
            className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ContactForm />
          </motion.div>
          <motion.div 
            className="bg-card/50 backdrop-blur-sm p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ContactInfo />
          </motion.div>
        </motion.div>
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
