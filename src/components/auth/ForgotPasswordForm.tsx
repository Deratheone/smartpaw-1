
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent!",
        description: "Check your email for a link to reset your password.",
      });

      onBack();
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: "Error sending reset email",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Reset Email"}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onBack}
      >
        Back to Login
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
