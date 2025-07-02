import {
  ArrowLeft,
  BarChart3,
  CreditCard,
  Globe,
  Lock,
  Shield,
  Smartphone,
  Users,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

const FeaturesPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description:
        'Your financial data is protected with enterprise-level encryption and multi-factor authentication.',
      details: [
        '256-bit SSL encryption',
        'Biometric authentication support',
        'Real-time fraud detection',
        'Secure data centers',
      ],
    },
    {
      icon: CreditCard,
      title: 'Digital Cards',
      description:
        'Issue virtual and physical cards instantly with complete control over spending.',
      details: [
        'Instant virtual card creation',
        'Contactless payments',
        'Spending limits and controls',
        'Real-time transaction notifications',
      ],
    },
    {
      icon: BarChart3,
      title: 'Financial Analytics',
      description:
        'Comprehensive insights into your spending patterns and financial health.',
      details: [
        'Detailed spending categorization',
        'Monthly and yearly reports',
        'Budget tracking and alerts',
        'Investment portfolio analysis',
      ],
    },
    {
      icon: Users,
      title: 'Multi-User Management',
      description:
        'Manage multiple accounts and users with granular permission controls.',
      details: [
        'Role-based access control',
        'Team spending management',
        'Approval workflows',
        'Audit trails and logging',
      ],
    },
    {
      icon: Globe,
      title: 'Global Transactions',
      description:
        'Send and receive money worldwide with competitive exchange rates.',
      details: [
        'Support for 100+ currencies',
        'Real-time exchange rates',
        'International wire transfers',
        'Low transaction fees',
      ],
    },
    {
      icon: Smartphone,
      title: 'Mobile Banking',
      description: 'Full-featured mobile app for banking on the go.',
      details: [
        'iOS and Android apps',
        'Offline transaction viewing',
        'Push notifications',
        'Mobile check deposits',
      ],
    },
    {
      icon: Zap,
      title: 'Instant Transfers',
      description:
        'Lightning-fast transfers between accounts and to external banks.',
      details: [
        'Real-time domestic transfers',
        'Same-day ACH transfers',
        'Instant peer-to-peer payments',
        'Scheduled recurring transfers',
      ],
    },
    {
      icon: Lock,
      title: 'Privacy Controls',
      description:
        'Complete control over your data with transparent privacy settings.',
      details: [
        'Granular privacy controls',
        'Data export capabilities',
        'GDPR compliance',
        'Zero data selling policy',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}
              Modern Banking
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Discover how NextFin revolutionizes your financial management with
            cutting-edge technology, unparalleled security, and intuitive
            design.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300 mt-2">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="bg-slate-800/30 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Technical Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-slate-300">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                &lt;200ms
              </div>
              <div className="text-slate-300">API Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                ISO 27001
              </div>
              <div className="text-slate-300">Security Certified</div>
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Seamless Integrations
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect with your favorite tools and services through our
            comprehensive API and pre-built integrations.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'QuickBooks',
              'Stripe',
              'PayPal',
              'Salesforce',
              'Slack',
              'Microsoft',
              'Google',
              'Zapier',
            ].map((integration) => (
              <div
                key={integration}
                className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
              >
                <div className="text-slate-300 font-medium">{integration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using NextFin to streamline
            their financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
