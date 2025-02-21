
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Users, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-secondary/10 animate-gradient" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to revolutionize personal finance management through innovative technology
            and user-centric design.
          </p>
        </motion.div>

        {/* Mission and Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Users,
              title: "Our Team",
              description: "A diverse group of financial experts and tech innovators working together to simplify finance management."
            },
            {
              icon: Award,
              title: "Our Mission",
              description: "To empower individuals with the tools and insights they need to achieve financial freedom."
            },
            {
              icon: Heart,
              title: "Our Values",
              description: "Transparency, security, and user-centricity are at the core of everything we do."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="space-y-8">
            {[
              { year: "2023", title: "Platform Launch", description: "Successfully launched our finance management platform." },
              { year: "2022", title: "Development", description: "Started developing our innovative financial solution." },
              { year: "2021", title: "Foundation", description: "Company founded with a vision to transform personal finance." }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="flex gap-4"
              >
                <div className="w-24 font-bold text-primary">{event.year}</div>
                <div>
                  <h3 className="font-semibold mb-1">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
