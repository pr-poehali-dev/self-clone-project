import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatPageProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (value: string) => void;
  sendMessage: () => void;
}

const ChatPage = ({ messages, inputMessage, setInputMessage, sendMessage }: ChatPageProps) => {
  return (
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
  );
};

export default ChatPage;
