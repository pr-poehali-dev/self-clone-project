import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface PricingPageProps {
  selectedPlan: string | null;
  setSelectedPlan: (plan: string) => void;
}

const PricingPage = ({ selectedPlan, setSelectedPlan }: PricingPageProps) => {
  const plans = [
    {
      name: 'Старт',
      price: '0₽',
      period: '/месяц',
      features: [
        '10 запросов в день',
        'Базовая модель AI',
        'Поддержка через FAQ',
        'История чата 7 дней',
      ],
      popular: false,
    },
    {
      name: 'Профи',
      price: '1 990₽',
      period: '/месяц',
      features: [
        'Безлимитные запросы',
        'Продвинутая модель AI',
        'Приоритетная поддержка',
        'История чата без ограничений',
        'API доступ',
      ],
      popular: true,
    },
    {
      name: 'Бизнес',
      price: '4 990₽',
      period: '/месяц',
      features: [
        'Всё из Профи',
        'Команда до 10 человек',
        'Персональный менеджер',
        'Кастомизация модели',
        'SLA 99.9%',
      ],
      popular: false,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Выберите свой тариф</h2>
        <p className="text-muted-foreground text-lg">
          Начните бесплатно или выберите план для максимальных возможностей
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative hover:scale-105 transition-all duration-300 ${
              plan.popular
                ? 'border-primary shadow-lg shadow-primary/20 animate-glow'
                : 'border-border/50'
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary">
                Популярный
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary to-secondary'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    Выбрать план
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Оформление подписки: {plan.name}</DialogTitle>
                    <DialogDescription>
                      Заполните данные для оплаты
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Номер карты</label>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Срок</label>
                        <Input placeholder="MM/ГГ" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input placeholder="123" type="password" maxLength={3} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span>Тариф {plan.name}</span>
                        <span className="font-semibold">{plan.price}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого</span>
                        <span>{plan.price}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                      onClick={() => {
                        toast.success('Подписка успешно оформлена! 🎉');
                      }}
                    >
                      Оплатить {plan.price}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
