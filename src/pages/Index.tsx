import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Я обработал ваш запрос. В полной версии здесь будет подключение к реальной AI-модели.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

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

  const faqItems = [
    {
      question: 'Как работает AI-платформа?',
      answer: 'Наша платформа использует передовые языковые модели для обработки ваших запросов и предоставления точных ответов в режиме реального времени.',
    },
    {
      question: 'Какие модели AI доступны?',
      answer: 'Мы предоставляем доступ к нескольким моделям: базовая модель для простых задач, продвинутая для сложного анализа, и возможность кастомизации для бизнес-клиентов.',
    },
    {
      question: 'Безопасны ли мои данные?',
      answer: 'Да, мы используем шифрование end-to-end и не храним ваши персональные данные без вашего согласия. Все данные обрабатываются в соответствии с GDPR.',
    },
    {
      question: 'Можно ли интегрировать с другими сервисами?',
      answer: 'Да, мы предоставляем REST API для интеграции с вашими существующими системами. Доступно на тарифах Профи и Бизнес.',
    },
  ];

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
        {activeTab === 'home' && (
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
                    onClick={() => setActiveTab('chat')}
                  >
                    <Icon name="MessageSquare" size={20} className="mr-2" />
                    Начать диалог
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8"
                    onClick={() => setActiveTab('pricing')}
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
        )}

        {activeTab === 'chat' && (
          <div className="container mx-auto px-4 py-8 animate-fade-in">
            <Card className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageSquare" size={24} />
                  Чат с AI
                </CardTitle>
                <CardDescription>Задайте любой вопрос - получите мгновенный ответ</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 animate-slide-up ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-secondary to-accent'
                            : 'bg-gradient-to-br from-primary to-secondary'
                        }`}
                      >
                        <Icon
                          name={message.role === 'user' ? 'User' : 'Bot'}
                          size={16}
                          className="text-primary-foreground"
                        />
                      </div>
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-secondary to-accent text-secondary-foreground'
                            : 'bg-card border border-border'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-60 mt-1 block">
                          {message.timestamp.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Введите ваш вопрос..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'pricing' && (
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
        )}

        {activeTab === 'support' && (
          <div className="container mx-auto px-4 py-20 animate-fade-in">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Центр поддержки</h2>
                <p className="text-muted-foreground text-lg">
                  Ответы на частые вопросы и форма обратной связи
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="HelpCircle" size={24} />
                    Частые вопросы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" size={24} />
                    Связаться с нами
                  </CardTitle>
                  <CardDescription>
                    Не нашли ответ? Напишите нам, и мы ответим в течение 24 часов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                    }}
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ваше имя</label>
                      <Input placeholder="Иван Иванов" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Тема обращения</label>
                      <Input placeholder="Опишите проблему кратко" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Сообщение</label>
                      <Textarea
                        placeholder="Опишите вашу проблему или вопрос подробно..."
                        rows={6}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name="Mail" size={24} className="text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">support@aiplatform.com</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name="MessageCircle" size={24} className="text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">Telegram</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">@aiplatform_support</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Icon name="Clock" size={24} className="text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">Время работы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">24/7 для всех тарифов</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
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
