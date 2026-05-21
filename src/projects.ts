export const GITHUB_USER = 'monkmoshpit';

export const githubRepoUrl = (repo: string) =>
  `https://github.com/${GITHUB_USER}/${repo}`;

export interface Project {
  id: string;
  type: 'case' | 'project';
  title: string;
  subtitle?: { pt: string; en: string };
  description: { pt: string; en: string };
  badges: string[];
  /** Repo name on GitHub, e.g. `paygate` */
  githubRepo?: string;
}

export const projectsData: Project[] = [
  {
    id: "make-acelerador",
    type: "case",
    title: "Make Acelerador de Vendas",
    subtitle: {
      pt: "Full Stack Developer (Março 2024 - Abril 2026)",
      en: "Full Stack Developer (March 2024 - April 2026)"
    },
    description: {
      pt: "Liderei a modernização técnica da infraestrutura core da empresa. Conduzi de forma 100% independente a migração crítica de um CRM em produção de PHP 5 para PHP 7 com zero downtime, processando mais de 1.000 leads diários e impactando 70% da operação interna. Comandei a rearquitetura completa de um SaaS legado para uma estrutura multitenant moderna usando React, TypeScript e Supabase, reduzindo drasticamente o tempo de navegação e atrito dos usuários. Desenvolvi agentes de IA customizados (OpenAI/Claude API) via n8n automatizando a qualificação de leads direto no WhatsApp.",
      en: "Led the technical modernization of the company's core infrastructure. Independently conducted a critical production CRM migration from PHP 5 to PHP 7 with zero downtime, handling 1,000+ daily leads and impacting 70% of internal operations. Spearheaded the complete re-architecture of a legacy SaaS into a modern multitenant platform using React, TypeScript, and Supabase, drastically reducing user navigation time and friction. Developed custom AI agents (OpenAI/Claude API) orchestrated via n8n to automate lead qualification directly within WhatsApp."
    },
    badges: ["PHP", "Laravel", "React", "TypeScript", "PostgreSQL", "MySQL", "n8n", "OpenAI API", "Claude API", "Redis"]
  },
  {
    id: "multicampus",
    type: "project",
    title: "MultiCampus",
    description: {
      pt: "Sistema de Gestão Escolar Multi-tenant de alta performance. Desenvolvido com Laravel 12, React 19 e TypeScript, o projeto garante isolamento completo de dados por instituição através de arquitetura multitenancy nativa. Conta com portais de acessos customizados por nível de permissão (Admin, Professor, Aluno) e esteira de CI/CD 100% automatizada.",
      en: "High-performance Multi-tenant School Management System. Built with Laravel 12, React 19, and TypeScript, featuring strict data isolation per institution via native multitenancy. Includes customized access portals mapped to specific roles (Admin, Teacher, Student) and a 100% automated CI/CD pipeline."
    },
    badges: ["Laravel", "PHP", "React", "TypeScript", "Vite", "Tailwind CSS", "MySQL"],
    githubRepo: 'multicampus',
  },
  {
    id: "paygate",
    type: "project",
    title: "PayGate",
    description: {
      pt: "Gateway de pagamentos focado em resiliência e alta consistência de dados. Uma API-first robusta desenvolvida em Laravel para simular fluxos financeiros complexos em cenários de instabilidade real. Implementa mecanismos de idempotência estrita, processamento assíncrono orientado a filas com Redis e orquestração de rollback automático (Saga) em caso de falhas parciais.",
      en: "Resilient, API-first payment gateway built for high data consistency. Developed with Laravel to simulate complex financial workflows under real-world infrastructure instability. Implements strict idempotency, Redis-driven async queue processing, and automated compensation workflows (Saga) to guarantee state consistency during partial failures."
    },
    badges: ["Laravel", "PHP", "Redis", "MySQL", "PHPUnit"],
    githubRepo: 'paygate',
  },
  {
    id: "readmeforge",
    type: "project",
    title: "readMeForge",
    description: {
      pt: "Ferramenta SaaS inteligente que resolve o problema de documentação de repositórios através de Inteligência Artificial. Construída em React e TypeScript, a plataforma consome metadados de qualquer repositório público do GitHub e usa modelos Llama 3 via Groq API para gerar documentações profissionais (READMEs) em paralelo (PT, EN, ES) via streaming de dados em tempo real.",
      en: "Smart SaaS tool designed to eliminate repository documentation bottlenecks using Artificial Intelligence. Built with React and TypeScript, the platform fetches metadata from public GitHub repositories and leverages Llama 3 models via Groq API to stream professional, multi-language READMEs (EN, PT, ES) in real-time."
    },
    badges: ["React", "TypeScript", "Tailwind CSS", "Groq API", "i18next"],
    githubRepo: 'readmeforge',
  }
];
