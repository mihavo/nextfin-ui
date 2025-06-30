import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Plus,
  Settings,
  Wallet,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample cards data
const sampleCards = [
  {
    id: 1,
    type: 'Credit Card',
    name: 'Nextfin Premium',
    lastFour: '4532',
    expiryDate: '12/26',
    balance: 2500.0,
    limit: 10000.0,
    status: 'Active',
    cardNetwork: 'Visa',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 2,
    type: 'Debit Card',
    name: 'Nextfin Checking',
    lastFour: '8901',
    expiryDate: '08/27',
    balance: 5678.45,
    limit: null,
    status: 'Active',
    cardNetwork: 'Visa',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 3,
    type: 'Credit Card',
    name: 'Nextfin Travel',
    lastFour: '2468',
    expiryDate: '03/25',
    balance: 1250.0,
    limit: 5000.0,
    status: 'Frozen',
    cardNetwork: 'Visa',
    color: 'from-emerald-600 to-emerald-800',
  },
  {
    id: 4,
    type: 'Virtual Card',
    name: 'Online Shopping',
    lastFour: '1357',
    expiryDate: '06/28',
    balance: 0.0,
    limit: 2000.0,
    status: 'Active',
    cardNetwork: 'Visa',
    color: 'from-orange-600 to-orange-800',
  },
];

export default function CardsPage() {
  const [showCardNumbers, setShowCardNumbers] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedCard, setSelectedCard] = useState<
    (typeof sampleCards)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCardNumber = (cardId: number) => {
    setShowCardNumbers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const openCardModal = (card: (typeof sampleCards)[0]) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="flex flex-1 flex-col gap-2 p-6 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Cards</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight mt-2">Cards</h1>
          <p className="text-muted-foreground">
            Manage your credit and debit cards
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Card
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Cards Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sampleCards.length}</div>
            <p className="text-xs text-muted-foreground">
              {sampleCards.filter((card) => card.status === 'Active').length}{' '}
              active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {sampleCards
                .reduce((sum, card) => sum + card.balance, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all cards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Credit Utilization
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">
              $3,750 of $15,000 limit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Spending
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,456</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleCards.map((card) => (
          <div
            key={card.id}
            className="group perspective-1000 max-w-lg mx-auto"
          >
            {/* Actual Credit Card Design - Clickable */}
            <div
              className={`relative w-full h-60 rounded-2xl p-6 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-pointer overflow-hidden ${
                card.color === 'from-purple-600 to-purple-800'
                  ? 'bg-gradient-to-br from-purple-600 to-purple-800'
                  : card.color === 'from-blue-600 to-blue-800'
                  ? 'bg-gradient-to-br from-blue-600 to-blue-800'
                  : card.color === 'from-emerald-600 to-emerald-800'
                  ? 'bg-gradient-to-br from-emerald-600 to-emerald-800'
                  : 'bg-gradient-to-br from-orange-600 to-orange-800'
              }`}
              style={{
                aspectRatio: '1.586/1', // Standard credit card ratio (85.60 × 53.98 mm)
                maxWidth: '520px',
                boxShadow:
                  '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
              onClick={() => openCardModal(card)}
            >
              {/* Card Network Logo */}
              <div className="absolute top-4 right-4">
                <div className="w-14 h-9 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span className="text-xs font-bold tracking-wider">
                    {card.cardNetwork.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* EMV Chip */}
              <div className="absolute top-20 left-6">
                <div className="w-12 h-9 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-lg shadow-lg">
                  <div className="w-full h-full bg-gradient-to-tr from-yellow-200 to-yellow-300 rounded-lg p-0.5">
                    <div className="w-full h-full bg-gradient-to-bl from-yellow-400 to-yellow-600 rounded-md grid grid-cols-3 gap-[1px] p-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-yellow-700 rounded-[1px] opacity-80"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contactless Payment Symbol */}
              <div className="absolute top-20 right-20">
                <div className="w-6 h-6">
                  <div className="w-6 h-6 border-2 border-white/50 rounded-full relative">
                    <div className="w-4 h-4 border-2 border-white/50 rounded-full absolute top-0.5 left-0.5">
                      <div className="w-2 h-2 border border-white/50 rounded-full absolute top-0.5 left-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Number */}
              <div className="absolute top-32 left-6 right-6">
                <p className="font-mono text-xl tracking-[0.3em] font-medium drop-shadow-sm">
                  {showCardNumbers[card.id]
                    ? `4532 1234 5678 ${card.lastFour}`
                    : `•••• •••• •••• ${card.lastFour}`}
                </p>
              </div>

              {/* Cardholder Name and Expiry */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex justify-between items-end">
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.1em] opacity-70 mb-1 font-medium">
                      Cardholder Name
                    </p>
                    <p className="text-sm font-bold uppercase tracking-[0.15em] drop-shadow-sm">
                      JOHN DOE
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold font-mono tracking-wider drop-shadow-sm">
                      {card.expiryDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Type Badge */}
              <div className="absolute top-4 left-4">
                <div className="px-2 py-1 bg-black/20 text-white border border-white/30 backdrop-blur-sm rounded-md">
                  <span className="text-xs font-semibold">{card.type}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-16 right-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    card.status === 'Active'
                      ? 'bg-green-400'
                      : card.status === 'Frozen'
                      ? 'bg-blue-400'
                      : 'bg-red-400'
                  }`}
                ></div>
              </div>

              {/* Privacy Toggle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <button
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 flex items-center justify-center backdrop-blur-sm border border-white/30"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when toggling number visibility
                    toggleCardNumber(card.id);
                  }}
                >
                  {showCardNumbers[card.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Holographic Shine Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 pointer-events-none"></div>

              {/* Subtle Pattern Overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                                   radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                }}
              ></div>
            </div>

            {/* Card Name Only - Simple Info */}
            <div className="mt-4 text-center">
              <h3 className="font-semibold text-lg text-foreground">
                {card.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Click to view details
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common card management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <Plus className="h-6 w-6" />
              Request New Card
            </Button>
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <Lock className="h-6 w-6" />
              Report Lost Card
            </Button>
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <Settings className="h-6 w-6" />
              Update PIN
            </Button>
            <Button variant="outline" className="gap-2 h-20 flex-col">
              <CreditCard className="h-6 w-6" />
              View Statements
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Card Details</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              View and manage your card information
            </DialogDescription>
          </DialogHeader>

          {selectedCard && (
            <div className="space-y-6">
              {/* Mini Card Preview */}
              <div className="flex justify-center">
                <div
                  className={`relative w-80 h-48 rounded-xl p-4 text-white shadow-lg ${
                    selectedCard.color === 'from-purple-600 to-purple-800'
                      ? 'bg-gradient-to-br from-purple-600 to-purple-800'
                      : selectedCard.color === 'from-blue-600 to-blue-800'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-800'
                      : selectedCard.color === 'from-emerald-600 to-emerald-800'
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-800'
                      : 'bg-gradient-to-br from-orange-600 to-orange-800'
                  }`}
                  style={{
                    aspectRatio: '1.586/1', // Standard credit card ratio
                  }}
                >
                  <div className="absolute top-3 right-3">
                    <div className="w-12 h-7 bg-white/10 rounded-md flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <span className="text-xs font-bold">
                        {selectedCard.cardNetwork.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-14 left-4">
                    <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg"></div>
                  </div>

                  <div className="absolute top-20 left-4 right-4">
                    <p className="font-mono text-lg tracking-[0.2em] font-medium">
                      •••• •••• •••• {selectedCard.lastFour}
                    </p>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-wide opacity-70 mb-1">
                        Cardholder Name
                      </p>
                      <p className="text-xs font-bold uppercase">JOHN DOE</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold font-mono">
                        {selectedCard.expiryDate}
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <div className="px-2 py-1 bg-black/20 text-white border border-white/30 backdrop-blur-sm rounded-md">
                      <span className="text-xs font-semibold">
                        {selectedCard.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Card Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Card Name:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedCard.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Type:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedCard.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status:
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          selectedCard.status === 'Active'
                            ? 'text-green-600'
                            : selectedCard.status === 'Frozen'
                            ? 'text-blue-600'
                            : 'text-red-600'
                        }`}
                      >
                        {selectedCard.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Expires:
                      </span>
                      <span className="text-sm font-medium">
                        {selectedCard.expiryDate}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Balance & Limits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Current Balance:
                      </span>
                      <span className="text-sm font-medium">
                        ${selectedCard.balance.toLocaleString()}
                      </span>
                    </div>
                    {selectedCard.limit && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Credit Limit:
                          </span>
                          <span className="text-sm font-medium">
                            ${selectedCard.limit.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Available Credit:
                          </span>
                          <span className="text-sm font-medium">
                            $
                            {(
                              selectedCard.limit - selectedCard.balance
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Utilization:
                            </span>
                            <span className="font-medium">
                              {Math.round(
                                (selectedCard.balance / selectedCard.limit) *
                                  100
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  (selectedCard.balance / selectedCard.limit) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="grid gap-3 md:grid-cols-3">
                <Button className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  View Transactions
                </Button>
                <Button variant="outline" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Card Settings
                </Button>
                <Button
                  variant={
                    selectedCard.status === 'Frozen' ? 'default' : 'outline'
                  }
                  className="gap-2"
                >
                  <Lock className="h-4 w-4" />
                  {selectedCard.status === 'Frozen'
                    ? 'Unfreeze Card'
                    : 'Freeze Card'}
                </Button>
              </div>

              {/* Additional Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 md:grid-cols-2">
                    <Button variant="ghost" className="justify-start gap-2">
                      <CreditCard className="h-4 w-4" />
                      Download Statement
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      Change PIN
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                      <Lock className="h-4 w-4" />
                      Report Lost/Stolen
                    </Button>
                    <Button variant="ghost" className="justify-start gap-2">
                      <Wallet className="h-4 w-4" />
                      Add to Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
