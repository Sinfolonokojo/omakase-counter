import { Home, History, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export const Navigation = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'counter', icon: Home, label: t('navCounter') },
    { id: 'types', icon: UtensilsCrossed, label: t('navTypes') },
    { id: 'history', icon: History, label: t('navHistory') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-gray safe-bottom">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 py-2 px-6 transition-colors ${
                isActive ? 'text-charcoal' : 'text-gray-400 hover:text-gray-600'
              }`}
              aria-label={tab.label}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
