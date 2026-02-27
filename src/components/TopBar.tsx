import { useAuth } from '@/lib/auth';
import { Bell, Search, Menu } from 'lucide-react';
import { toPersianNum } from '@/lib/persian';

interface TopBarProps {
  title: string;
  onMenuToggle: () => void;
}

export default function TopBar({ title, onMenuToggle }: TopBarProps) {
  const { adminName } = useAuth();

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="lg:hidden text-muted-foreground hover:text-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-secondary/50 rounded-lg px-3 py-1.5 gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="جستجوی سریع..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-40"
          />
        </div>

        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -left-1 w-4 h-4 gradient-primary rounded-full text-[10px] flex items-center justify-center text-primary-foreground font-bold">
            {toPersianNum(3)}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            م
          </div>
          <span className="hidden sm:inline text-sm text-muted-foreground">{adminName}</span>
        </div>
      </div>
    </header>
  );
}
