import { ReactNode } from 'react';

interface MobileGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  smCols?: 1 | 2 | 3 | 4 | 6;
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-2', 
  3: 'grid-cols-3',
  4: 'grid-cols-4'
};

const smColClasses = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3', 
  4: 'sm:grid-cols-4',
  6: 'sm:grid-cols-6'
};

const lgColClasses = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  8: 'lg:grid-cols-8',
  12: 'lg:grid-cols-12'
};

const gapClasses = {
  'xs': 'gap-1 sm:gap-2',
  'sm': 'gap-2 sm:gap-3',
  'md': 'gap-3 sm:gap-4 lg:gap-6',
  'lg': 'gap-4 sm:gap-6 lg:gap-8',
  'xl': 'gap-6 sm:gap-8 lg:gap-12'
};

export default function MobileGrid({
  children,
  cols = 1,
  smCols = 2,
  lgCols = 3,
  gap = 'md',
  className = ''
}: MobileGridProps) {
  const gridClasses = [
    'grid',
    colClasses[cols],
    smColClasses[smCols],
    lgColClasses[lgCols],
    gapClasses[gap],
    className
  ].join(' ');

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
}