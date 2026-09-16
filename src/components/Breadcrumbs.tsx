import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigate } = useRouter();

  if (!items || items.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://nharire.com/',
      },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.label,
        ...(item.href ? { item: `https://nharire.com${item.href}` } : {}),
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500">
        <li className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 hover:text-[#0B5D3B] transition-colors focus:outline-none focus:ring-1 focus:ring-[#0B5D3B] rounded px-1 py-0.5"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </button>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="text-gray-900 font-semibold px-1 py-0.5" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(item.href!)}
                  className="hover:text-[#0B5D3B] transition-colors focus:outline-none focus:ring-1 focus:ring-[#0B5D3B] rounded px-1 py-0.5"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
