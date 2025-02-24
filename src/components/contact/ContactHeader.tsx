
import { motion } from "framer-motion";

export const ContactHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
    </motion.div>
  );
};
