import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || { name: 'Standard', price: '₹2,999' };

  return (
    <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-12 pb-12 text-center space-y-6">
          {/* Success Icon */}
          <div className="mx-auto h-24 w-24 rounded-full bg-success/10 flex items-center justify-center animate-fade-in">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for subscribing to {plan.name}
            </p>
          </div>

          {/* Subscription Details */}
          <Card className="bg-muted/50 border-0">
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold">{plan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subscription Valid Until</span>
                <span className="font-semibold">Feb 15, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-semibold">Feb 15, 2026</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <Button
              variant="outline"
              className="flex-1 h-11"
              onClick={() => {}}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button
              className="flex-1 h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            A confirmation email has been sent to your registered email address
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
