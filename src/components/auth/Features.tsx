
import { motion } from "framer-motion";
import { Code, Server, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Smart Analytics",
      description: "Powerful insights into your spending patterns and financial habits."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-grade security to protect your sensitive financial data."
    },
    {
      icon: Server,
      title: "Real-time Tracking",
      description: "Monitor your expenses and income in real-time with instant updates."
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-6 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
