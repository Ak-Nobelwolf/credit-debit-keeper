
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-muted-foreground">support@financeapp.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-muted-foreground">
                123 Finance Street<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
