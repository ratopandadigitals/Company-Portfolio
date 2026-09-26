import React from 'react';
import { Target, Palette, Cpu, Compass, LucideIcon } from 'lucide-react';

interface PillProps {
  label: string;
  icon: LucideIcon;
}

function Pill({ label, icon: Icon }: PillProps) {
  return (
    <div className="px-5 py-2.5 rounded-full icon-s text-heading text-sm font-medium border-border-subtle- shadow-md flex items-center gap-2.5 justify-center">
      <Icon className="w-4 h-4 text-heading/80" />
      <span>{label}</span>
    </div>
  );
}

export default function RatoPandaSection() {
  return (
    <section className="w-full bg-surface-page py-16 px-6 flex flex-col items-center justify-center text-center">
      <div className="w-full min-w-0 max-w-4xl mx-auto flex flex-col items-center gap-4">
        
        {/* Top Accent: Brackets with Center Icon */}
        <div className="flex items-center gap-2 text-primary text-3xl font-highlight font-m">
          <span>(</span>
        <span className="text-primary font-semibold font-serif italic" >Hello</span>
          <span>)</span>
        </div>

        {/* Statement with Token Colors */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.15]">
          <span className="text-heading">
            We combine strategy, creative design and technology to{' '}
          </span>
          <span className="text-caption]">
            create refned digital experiences, products and technology solutions.
          </span>
        </h2>

        {/* Pills Layout with Lucide Icons */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Pill label="Strategy" icon={Target} />
            <Pill label="Design" icon={Palette} />
            <Pill label="Technology" icon={Cpu} />
          </div>
          <Pill label="Experience" icon={Compass} />
        </div>

      </div>
    </section>
  );
}