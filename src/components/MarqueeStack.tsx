import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  SiPhp, SiLaravel, SiReact, SiTypescript, SiNodedotjs, SiTailwindcss,
  SiDocker, SiRedis, SiMysql, SiSupabase, SiJavascript, SiHtml5,
  SiPostgresql, SiGithubactions, SiRabbitmq, SiOpenai, SiGit, SiPrisma
} from 'react-icons/si';

const allIcons = [
  { Icon: SiPhp, name: 'PHP' },
  { Icon: SiLaravel, name: 'Laravel' },
  { Icon: SiReact, name: 'React' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiNodedotjs, name: 'Node.js' },
  { Icon: SiTailwindcss, name: 'Tailwind' },
  { Icon: SiDocker, name: 'Docker' },
  { Icon: SiRedis, name: 'Redis' },
  { Icon: SiMysql, name: 'MySQL' },
  { Icon: SiSupabase, name: 'Supabase' },
  { Icon: SiJavascript, name: 'JavaScript' },
  { Icon: SiHtml5, name: 'HTML5' },
  { Icon: SiPostgresql, name: 'Postgres' },
  { Icon: SiGithubactions, name: 'GitHub Actions' },
  { Icon: SiRabbitmq, name: 'RabbitMQ' },
  { Icon: SiOpenai, name: 'OpenAI' },
  { Icon: SiGit, name: 'Git' },
  { Icon: SiPrisma, name: 'Prisma' },
];

interface RowProps {
  direction: 'left' | 'right';
  faded: boolean;
}

const Row = ({ direction, faded }: RowProps) => {
  const isLeft = direction === 'left';
  return (
    <div className={`flex whitespace-nowrap overflow-hidden w-full py-3 ${faded ? 'opacity-40 blur-[1.5px]' : 'opacity-100'}`}>
      <motion.div
        className="flex whitespace-nowrap gap-14 items-center shrink-0 pr-14"
        animate={{ x: isLeft ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
      >
        {allIcons.concat(allIcons).map(({ Icon }, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center w-14 h-14 rounded-2xl border transition-all duration-300 group hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor:     'var(--border-subtle)',
              color:           'var(--text-muted)',
            }}
          >
            <Icon className="w-7 h-7 transition-colors duration-300 group-hover:text-[var(--accent)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const MarqueeStack = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      className="w-full overflow-hidden border-y py-10 transition-colors duration-400"
      style={{
        backgroundColor: isDark ? '#0c0c0e' : '#f3f4f6',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="relative flex flex-col gap-4">
        <Row direction="right" faded />
        <Row direction="left"  faded={false} />
        <Row direction="right" faded />

        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
          style={{ background: `linear-gradient(to right, ${isDark ? '#0c0c0e' : '#f3f4f6'}, transparent)` }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
          style={{ background: `linear-gradient(to left, ${isDark ? '#0c0c0e' : '#f3f4f6'}, transparent)` }}
        />
      </div>
    </section>
  );
};
