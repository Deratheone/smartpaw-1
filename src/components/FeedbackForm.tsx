import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Star, Send } from 'lucide-react';

interface FeedbackFormProps {
  onSubmit?: (feedback: FeedbackData) => void;
  className?: string;
}

interface FeedbackData {
  type: 'bug' | 'feature' | 'general' | 'compliment';
  rating: number;
  message: string;
  page: string;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, className }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FeedbackData>({
    type: 'general',
    rating: 5,
    message: '',
    page: window.location.pathname
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter your feedback message.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically send to your backend or analytics service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve SmartPaw for everyone."
      });
      
      // Reset form
      setFormData({
        type: 'general',
        rating: 5,
        message: '',
        page: window.location.pathname
      });
      
    } catch (error) {
      toast({
        title: "Failed to submit feedback",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Share Your Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="feedback-type">Feedback Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: any) => setFormData(prev => ({...prev, type: value}))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">🐛 Bug Report</SelectItem>
                <SelectItem value="feature">💡 Feature Request</SelectItem>
                <SelectItem value="general">💬 General Feedback</SelectItem>
                <SelectItem value="compliment">❤️ Compliment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Overall Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({...prev, rating: star}))}
                  className={`p-1 transition-colors ${
                    star <= formData.rating 
                      ? 'text-yellow-400 hover:text-yellow-500' 
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="feedback-message">Your Message</Label>
            <Textarea
              id="feedback-message"
              placeholder="Tell us what you think..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
              rows={4}
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Feedback
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
