import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import HomePage from '@/components/HomePage';
import ChatPage from '@/components/ChatPage';
import PricingPage from '@/components/PricingPage';
import SupportPage from '@/components/SupportPage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я AI-ассистент. Чем могу помочь?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage('');

    try {
      const response = await fetch('https://functions.poehali.dev/97c8fdf5-107b-4190-823f-88520531429f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Ошибка: ${data.error || 'Не удалось получить ответ'}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Произошла ошибка при отправке сообщения. Проверьте подключение к интернету.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-glow">
                <Icon name="Sparkles" size={24} className="text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Platform
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
              >
                Главная
              </Button>
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('chat')}
              >
                Чат с AI
              </Button>
              <Button
                variant={activeTab === 'pricing' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('pricing')}
              >
                Тарифы
              </Button>
              <Button
                variant={activeTab === 'support' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('support')}
              >
                Поддержка
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Личный кабинет
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Личный кабинет</DialogTitle>
                  <DialogDescription>
                    Управляйте своей подпиской и настройками
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Ваш тариф</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Профи</p>
                          <p className="text-sm text-muted-foreground">До 15.03.2025</p>
                        </div>
                        <Badge className="bg-primary">Активен</Badge>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Статистика</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Запросов сегодня</span>
                        <span className="font-semibold">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Всего запросов</span>
                        <span className="font-semibold">1,284</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="w-full" variant="outline">
                    Изменить тариф
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'home' && <HomePage onNavigate={setActiveTab} />}
        {activeTab === 'chat' && (
          <ChatPage
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            sendMessage={sendMessage}
          />
        )}
        {activeTab === 'pricing' && (
          <PricingPage selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
        )}
        {activeTab === 'support' && <SupportPage />}
      </main>

      <footer className="border-t border-border/40 mt-20 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={16} className="text-primary-foreground" />
                </div>
                <span className="font-bold">AI Platform</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Передовая AI-платформа для решения любых задач
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Возможности</li>
                <li>Тарифы</li>
                <li>API</li>
                <li>Документация</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Блог</li>
                <li>Карьера</li>
                <li>Пресса</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQ</li>
                <li>Контакты</li>
                <li>Политика</li>
                <li>Условия</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 AI Platform. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;