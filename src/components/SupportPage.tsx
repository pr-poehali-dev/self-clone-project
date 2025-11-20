import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const SupportPage = () => {
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
  );
};

export default SupportPage;
