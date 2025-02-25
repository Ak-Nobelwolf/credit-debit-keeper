
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ContactHeader />
      <div className="grid gap-8 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
      <div className="mt-8">
        <Link to="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;
