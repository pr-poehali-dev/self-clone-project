import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

const HomePage = ({ onNavigate }: HomePageProps) => {
  return (
    <div className="animate-fade-in">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge className="mb-4 animate-pulse-glow" variant="outline">
            <Icon name="Zap" size={16} className="mr-1" />
            Новое поколение AI
          </Badge>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-slide-up">
            Будущее AI уже здесь
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Мощная AI-платформа для решения любых задач. Быстро, умно, надёжно.
          </p>
          <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8"
              onClick={() => onNavigate('chat')}
            >
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Начать диалог
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              onClick={() => onNavigate('pricing')}
            >
              Выбрать тариф
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Возможности платформы</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: 'Brain',
              title: 'Умный AI',
              description: 'Передовые языковые модели для точных ответов',
            },
            {
              icon: 'Zap',
              title: 'Мгновенно',
              description: 'Ответы в режиме реального времени',
            },
            {
              icon: 'Shield',
              title: 'Безопасно',
              description: 'Шифрование данных и полная конфиденциальность',
            },
            {
              icon: 'Code',
              title: 'API доступ',
              description: 'Интеграция с вашими сервисами',
            },
            {
              icon: 'Users',
              title: 'Для команд',
              description: 'Совместная работа и управление проектами',
            },
            {
              icon: 'TrendingUp',
              title: 'Аналитика',
              description: 'Детальная статистика использования',
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="hover:scale-105 transition-transform duration-300 border-border/50 bg-card/50 backdrop-blur"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} size={24} className="text-primary-foreground" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
