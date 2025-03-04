
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ExpertAdviceRequest } from "@/components/dashboard/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  question: z.string().min(20, { message: "Your question must be at least 20 characters." }),
  contactConsent: z.boolean()
});

interface ExpertAdviceFormProps {
  careerField: string;
}

const ExpertAdviceForm = ({ careerField }: ExpertAdviceFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: user?.email || "",
      question: "",
      contactConsent: false
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Create a properly typed ExpertAdviceRequest object
    const request: ExpertAdviceRequest = {
      name: values.name,
      email: values.email,
      question: values.question,
      careerField,
      contactConsent: values.contactConsent
    };
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('expert_advice_requests')
        .insert({
          name: values.name,
          email: values.email,
          question: values.question,
          career_field: careerField,
          contact_consent: values.contactConsent
        });
        
      if (error) throw error;
      
      form.reset();
      
      toast({
        title: "Request Submitted",
        description: "An expert in this field will contact you within 3-5 business days.",
      });
    } catch (error) {
      console.error("Error submitting expert advice request:", error);
      toast({
        title: "Error Submitting Request",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Question</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={`What would you like to know about being a ${careerField}?`}
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Be specific to receive the most helpful advice from industry experts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to be contacted by a career professional via email
                </FormLabel>
                <FormDescription>
                  Your information will only be used to respond to your inquiry.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Request Expert Advice"}
        </Button>
      </form>
    </Form>
  );
};

export default ExpertAdviceForm;
