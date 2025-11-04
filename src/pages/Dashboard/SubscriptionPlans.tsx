import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Rocket } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free Trial',
    price: '₹0',
    period: '14 days',
    icon: Zap,
    description: 'Perfect for testing the platform',
    features: [
      'Up to 2 properties',
      'Basic analytics',
      'Email support',
      'Mobile app access',
    ],
    color: 'from-muted to-muted',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: '₹2,999',
    period: 'per month',
    icon: Rocket,
    description: 'For growing hostel businesses',
    features: [
      'Up to 10 properties',
      'Advanced analytics',
      'Priority email support',
      'Mobile app access',
      'Booking management',
      'Customer database',
    ],
    color: 'from-primary to-accent',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹5,999',
    period: 'per month',
    icon: Crown,
    description: 'For large-scale operations',
    features: [
      'Unlimited properties',
      'Advanced analytics & reports',
      '24/7 priority support',
      'Mobile app access',
      'Booking management',
      'Customer database',
      'Custom integrations',
      'Dedicated account manager',
      'White-label option',
    ],
    color: 'from-accent to-primary',
    popular: false,
  },
];

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const [currentPlan] = useState('free');

  const handleSubscribe = (planId: string) => {
    if (planId === currentPlan) return;
    navigate('/dashboard/payment', { state: { planId } });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground">
          Select the perfect plan for your hostel management needs
        </p>
      </div>

      {/* Current Plan Info */}
      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Plan</p>
              <h3 className="text-2xl font-bold mt-1">Free Trial</h3>
              <p className="text-sm text-muted-foreground mt-1">Expires on: Feb 15, 2025</p>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto mt-12">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = plan.id === currentPlan;

          return (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden hover-scale ${
                plan.popular ? 'border-primary shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg bg-gradient-to-r from-primary to-accent">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div className={`h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan}
                  className={`w-full h-11 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {isCurrentPlan ? 'Current Plan' : `Subscribe to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
