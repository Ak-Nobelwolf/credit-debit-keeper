
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import ErrorBoundary from "@/components/ErrorBoundary";

const Contact = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 animate-gradient" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
          <ContactHeader />
          <div className="grid md:grid-cols-2 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Contact;
