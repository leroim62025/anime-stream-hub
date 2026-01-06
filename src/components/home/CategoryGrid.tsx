import { Link } from 'react-router-dom';
import { categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            to={`/browse?genre=${category.id}`}
            className={cn(
              "group relative flex flex-col items-center justify-center p-4 rounded-xl",
              "glass hover:bg-muted/50 transition-all duration-300 hover-lift",
              "animate-fade-in"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">
              {category.icon}
            </span>
            <span className="text-sm font-medium text-center">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
