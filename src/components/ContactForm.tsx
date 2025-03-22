
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');
    
    try {
      // Create the form data to send
      const formEncoded = new URLSearchParams();
      formEncoded.append('form-name', 'contact');
      formEncoded.append('name', formData.name);
      formEncoded.append('email', formData.email);
      formEncoded.append('subject', formData.subject);
      formEncoded.append('message', formData.message);
      // Add a hidden field with the destination email
      formEncoded.append('_replyto', 'info@byteedge.services');
      
      // Submit the form using fetch
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formEncoded.toString()
      });
      
      if (response.ok) {
        setFormStatus('success');
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        
        // Reset the form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      toast({
        title: "Message could not be sent",
        description: "Please try again later or email us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {formStatus === 'success' && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            Thank you for your message! We've received it and will get back to you within 24 hours.
          </AlertDescription>
        </Alert>
      )}
      
      {formStatus === 'error' && (
        <Alert className="mb-6 bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">
            Something went wrong. Please try again or email us directly at info@byteedge.services
          </AlertDescription>
        </Alert>
      )}
      
      <form 
        name="contact" 
        method="POST" 
        onSubmit={handleSubmit} 
        className="space-y-6 w-full"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        {/* Hidden field for Netlify form recognition */}
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="_replyto" value="info@byteedge.services" />
        
        {/* Hidden honeypot field to prevent spam */}
        <p className="hidden">
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        
        <div>
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4"
          />
        </div>
        
        <div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4"
          />
        </div>
        
        <div>
          <Input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-4"
          />
        </div>
        
        <div>
          <Textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full min-h-[200px] p-4"
          />
        </div>
        
        <Button 
          type="submit" 
          className="button-primary w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : 'Submit'}
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
