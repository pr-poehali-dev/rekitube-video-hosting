import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  timestamp: string;
  duration: string;
  thumbnail: string;
  category: string;
  videoUrl?: string;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Как создать современное веб-приложение за час',
    channel: 'Tech Masters',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
    views: '1.2M',
    timestamp: '2 дня назад',
    duration: '15:43',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    category: 'Технологии'
  },
  {
    id: '2',
    title: 'Лучшие практики UI/UX дизайна в 2024',
    channel: 'Design Pro',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=design',
    views: '850K',
    timestamp: '1 день назад',
    duration: '22:15',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    category: 'Дизайн'
  },
  {
    id: '3',
    title: 'Путешествие по Японии: Токио и Киото',
    channel: 'Travel Vlog',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
    views: '2.5M',
    timestamp: '3 дня назад',
    duration: '28:30',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    category: 'Путешествия'
  },
  {
    id: '4',
    title: 'React + TypeScript: Полный гайд для начинающих',
    channel: 'Code Academy',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=code',
    views: '950K',
    timestamp: '5 дней назад',
    duration: '45:20',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    category: 'Технологии'
  },
  {
    id: '5',
    title: 'Секреты продуктивности для разработчиков',
    channel: 'Dev Tips',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev',
    views: '670K',
    timestamp: '1 неделю назад',
    duration: '18:55',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
    category: 'Образование'
  },
  {
    id: '6',
    title: 'Кулинарный мастер-класс: Итальянская паста',
    channel: 'Kitchen Stories',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cooking',
    views: '1.8M',
    timestamp: '4 дня назад',
    duration: '12:40',
    thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    category: 'Кулинария'
  }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'upload' | 'profile' | 'subscriptions' | 'watch'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>('');
  const [uploadedVideoFile, setUploadedVideoFile] = useState<File | null>(null);

  const categories = ['Все', 'Технологии', 'Дизайн', 'Путешествия', 'Образование', 'Кулинария', 'Музыка', 'Спорт'];

  const filteredVideos = mockVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const subscriptions = [
    { name: 'Tech Masters', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech', subscribers: '2.5M' },
    { name: 'Design Pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=design', subscribers: '1.8M' },
    { name: 'Travel Vlog', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel', subscribers: '3.2M' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-md bg-opacity-90">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Rekitube
              </h1>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setCurrentView('home')}
                  className={`flex items-center gap-2 transition-colors ${
                    currentView === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Home" size={20} />
                  <span>Главная</span>
                </button>
                <button
                  onClick={() => setCurrentView('catalog')}
                  className={`flex items-center gap-2 transition-colors ${
                    currentView === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Grid3x3" size={20} />
                  <span>Каталог</span>
                </button>
                <button
                  onClick={() => setCurrentView('subscriptions')}
                  className={`flex items-center gap-2 transition-colors ${
                    currentView === 'subscriptions' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name="Users" size={20} />
                  <span>Подписки</span>
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted border-border"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setCurrentView('upload')}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Icon name="Upload" size={20} />
                <span>Загрузить</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentView('profile')}
              >
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section>
              <h2 className="text-3xl font-bold mb-6">🔥 Актуальное</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.slice(0, 3).map((video) => (
                  <VideoCard key={video.id} video={video} onVideoClick={(v) => { setSelectedVideo(v); setCurrentView('watch'); }} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">📺 Рекомендации для вас</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.map((video) => (
                  <VideoCard key={video.id} video={video} onVideoClick={(v) => { setSelectedVideo(v); setCurrentView('watch'); }} />
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary to-secondary'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} onVideoClick={(v) => { setSelectedVideo(v); setCurrentView('watch'); }} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'upload' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Загрузить видео</h2>
              
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer"
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add('border-primary');
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.classList.remove('border-primary');
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-primary');
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('video/')) {
                      setUploadedVideoFile(file);
                      setUploadedVideoUrl(URL.createObjectURL(file));
                    }
                  }}
                >
                  {uploadedVideoUrl ? (
                    <div className="space-y-4">
                      <video src={uploadedVideoUrl} controls className="w-full max-h-[400px] rounded-lg mx-auto" />
                      <p className="text-sm text-muted-foreground">Файл: {uploadedVideoFile?.name}</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setUploadedVideoUrl('');
                          setUploadedVideoFile(null);
                        }}
                      >
                        Выбрать другое видео
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg mb-2">Перетащите видео сюда</p>
                      <p className="text-sm text-muted-foreground mb-4">или</p>
                      <Button 
                        className="bg-gradient-to-r from-primary to-secondary"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'video/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              setUploadedVideoFile(file);
                              setUploadedVideoUrl(URL.createObjectURL(file));
                            }
                          };
                          input.click();
                        }}
                      >
                        Выбрать файл
                      </Button>
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название видео</label>
                    <Input placeholder="Введите название..." className="bg-muted" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Описание</label>
                    <textarea
                      className="w-full min-h-[120px] px-3 py-2 bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Расскажите о вашем видео..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Категория</label>
                    <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-6">
                    Опубликовать видео
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'profile' && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <div className="flex items-start gap-8">
                <Avatar className="w-32 h-32">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">Мой канал</h2>
                  <p className="text-muted-foreground mb-4">@mychannel • 150K подписчиков</p>
                  <p className="mb-6">Создаю контент о технологиях, программировании и дизайне</p>
                  <div className="flex gap-4">
                    <Button variant="outline">Редактировать профиль</Button>
                    <Button variant="outline">
                      <Icon name="Settings" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="w-full justify-start bg-muted">
                <TabsTrigger value="videos">Мои видео</TabsTrigger>
                <TabsTrigger value="liked">Понравившиеся</TabsTrigger>
                <TabsTrigger value="history">История</TabsTrigger>
              </TabsList>
              <TabsContent value="videos" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVideos.slice(0, 3).map((video) => (
                    <VideoCard key={video.id} video={video} onVideoClick={(v) => { setSelectedVideo(v); setCurrentView('watch'); }} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="liked" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVideos.slice(2, 5).map((video) => (
                    <VideoCard key={video.id} video={video} onVideoClick={(v) => { setSelectedVideo(v); setCurrentView('watch'); }} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVideos.slice(1, 4).map((video) => (
                    <VideoCard key={video.id} video={video} onVideoClick={(v) => { setSelectedVideo(v); setCurrentView('watch'); }} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {currentView === 'subscriptions' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">Мои подписки</h2>
            <div className="space-y-4">
              {subscriptions.map((sub) => (
                <div key={sub.name} className="bg-card border border-border rounded-xl p-6 flex items-center justify-between hover:border-primary transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={sub.avatar} />
                      <AvatarFallback>{sub.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{sub.name}</h3>
                      <p className="text-sm text-muted-foreground">{sub.subscribers} подписчиков</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Bell" size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                      Отписаться
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6">Новые видео от подписок</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockVideos.slice(0, 4).map((video) => (
                  <VideoCard key={video.id} video={video} onVideoClick={(v) => { setSelectedVideo(v); setCurrentView('watch'); }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'watch' && selectedVideo && (
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-black rounded-xl overflow-hidden aspect-video">
                  {selectedVideo.videoUrl ? (
                    <video 
                      src={selectedVideo.videoUrl} 
                      controls 
                      autoPlay
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Icon name="PlayCircle" size={64} className="mx-auto mb-4 opacity-50" />
                        <p>Видео недоступно</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h1 className="text-2xl font-bold mb-4">{selectedVideo.title}</h1>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedVideo.channelAvatar} />
                        <AvatarFallback>{selectedVideo.channel[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedVideo.channel}</p>
                        <p className="text-sm text-muted-foreground">1.5M подписчиков</p>
                      </div>
                      <Button className="ml-4 bg-gradient-to-r from-primary to-secondary">
                        Подписаться
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      <Icon name="ThumbsUp" size={16} className="mr-2" />
                      1.2K
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="ThumbsDown" size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Share2" size={16} className="mr-2" />
                      Поделиться
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="font-semibold">{selectedVideo.views} просмотров</span>
                      <span>•</span>
                      <span>{selectedVideo.timestamp}</span>
                    </div>
                    <p className="text-sm">
                      Описание видео будет здесь. В этом видео мы рассмотрим основные концепции и практические примеры.
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Комментарии</h3>
                  <VideoComments />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Рекомендации</h3>
                {mockVideos.filter(v => v.id !== selectedVideo.id).slice(0, 5).map((video) => (
                  <div 
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="flex gap-2 cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
                  >
                    <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2 mb-1">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.channel}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{video.views}</span>
                        <span>•</span>
                        <span>{video.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const VideoComments = () => {
  const [comments, setComments] = useState([
    { id: '1', author: 'Иван Петров', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ivan', text: 'Отличное видео! Очень полезная информация', likes: 24, timestamp: '2 часа назад' },
    { id: '2', author: 'Мария Сидорова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria', text: 'Спасибо за такой детальный разбор темы', likes: 15, timestamp: '5 часов назад' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: Date.now().toString(),
          author: 'Вы',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
          text: newComment,
          likes: 0,
          timestamp: 'только что'
        },
        ...comments
      ]);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Добавьте комментарий..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="bg-muted"
          />
          <Button size="sm" onClick={handleAddComment}>
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm mb-2">{comment.text}</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Icon name="ThumbsUp" size={12} className="mr-1" />
                  {comment.likes}
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  Ответить
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoCard = ({ video, onVideoClick }: { video: Video; onVideoClick?: (video: Video) => void }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: '1', author: 'Иван Петров', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ivan', text: 'Отличное видео! Очень полезная информация', likes: 24, timestamp: '2 часа назад' },
    { id: '2', author: 'Мария Сидорова', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria', text: 'Спасибо за такой детальный разбор темы', likes: 15, timestamp: '5 часов назад' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: Date.now().toString(),
          author: 'Вы',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
          text: newComment,
          likes: 0,
          timestamp: 'только что'
        },
        ...comments
      ]);
      setNewComment('');
    }
  };

  return (
    <div className="group animate-scale-in">
      <div 
        className="relative aspect-video rounded-xl overflow-hidden mb-3 cursor-pointer"
        onClick={() => onVideoClick?.(video)}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Icon name="Play" size={48} className="text-white" />
        </div>
      </div>

      <div className="flex gap-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={video.channelAvatar} />
          <AvatarFallback>{video.channel[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground">{video.channel}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{video.views} просмотров</span>
            <span>•</span>
            <span>{video.timestamp}</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Icon name="ThumbsUp" size={16} className="mr-1" />
              <span className="text-xs">125</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <Icon name="MessageCircle" size={16} className="mr-1" />
              <span className="text-xs">{comments.length}</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Icon name="Share2" size={16} />
            </Button>
          </div>

          {showComments && (
            <div className="mt-4 space-y-4 p-4 bg-muted rounded-lg animate-fade-in">
              <div className="flex gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Добавьте комментарий..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bg-background"
                  />
                  <Button size="sm" onClick={handleAddComment}>
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mb-2">{comment.text}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          <Icon name="ThumbsUp" size={12} className="mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                          Ответить
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;