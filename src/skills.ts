export interface Skill {
  name: { pt: string; en: string };
  category: "Architecture & DevOps" | "Core Backend" | "Frontend Systems";
  description: { pt: string; en: string };
}

export const skills: Skill[] = [
  // Core Backend
  {
    name: { pt: "Laravel", en: "Laravel" },
    category: "Core Backend",
    description: {
      pt: "Backend, APIs REST, filas assíncronas, multi-tenancy e migração de sistemas legados em produção.",
      en: "Backend, REST APIs, async queues, multi-tenancy and legacy system migrations in production."
    }
  },
  {
    name: { pt: "Redis & Filas", en: "Redis & Queues" },
    category: "Core Backend",
    description: {
      pt: "Filas de transações, locks distribuídos e cache em sistemas de pagamento e CRM.",
      en: "Transaction queues, distributed locks and caching in payment and CRM systems."
    }
  },
  {
    name: { pt: "Agentes de IA & RAG", en: "AI Agents & RAG" },
    category: "Core Backend",
    description: {
      pt: "Agentes de IA com RAG integrados ao WhatsApp, qualificando leads e atendendo clientes 24h.",
      en: "RAG-powered AI agents integrated with WhatsApp for lead qualification and 24/7 support."
    }
  },
  {
    name: { pt: "PostgreSQL & MySQL", en: "PostgreSQL & MySQL" },
    category: "Core Backend",
    description: {
      pt: "Modelagem relacional, otimização de queries e schemas construídos pra escalar.",
      en: "Relational modeling, query optimization and schemas built to scale."
    }
  },

  // Frontend Systems
  {
    name: { pt: "React", en: "React" },
    category: "Frontend Systems",
    description: {
      pt: "SPAs com hooks customizados, estado global e integração com APIs REST e realtime.",
      en: "SPAs with custom hooks, global state management and REST and realtime API integration."
    }
  },
  {
    name: { pt: "TypeScript", en: "TypeScript" },
    category: "Frontend Systems",
    description: {
      pt: "Tipagem ponta a ponta em projetos React e Node, pegando bugs antes de chegar em produção.",
      en: "End-to-end typing across React and Node projects, catching bugs before they hit production."
    }
  },
  {
    name: { pt: "Tailwind CSS", en: "Tailwind CSS" },
    category: "Frontend Systems",
    description: {
      pt: "Interfaces responsivas e consistentes, do protótipo ao deploy, sem CSS espaguete.",
      en: "Responsive and consistent interfaces from prototype to deploy, no spaghetti CSS."
    }
  },
  {
    name: { pt: "Supabase & Realtime", en: "Supabase & Realtime" },
    category: "Frontend Systems",
    description: {
      pt: "Banco, auth, storage e RLS integrados em projetos multi-tenant e sistemas com IA.",
      en: "Database, auth, storage and RLS integrated in multi-tenant and AI-powered projects."
    }
  },

  // Architecture & DevOps
  {
    name: { pt: "Docker & Ambientes", en: "Docker & Environments" },
    category: "Architecture & DevOps",
    description: {
      pt: "Ambientes containerizados que funcionam igual no local e em produção.",
      en: "Containerized environments that behave the same locally and in production."
    }
  },
  {
    name: { pt: "GitHub Actions CI/CD", en: "GitHub Actions CI/CD" },
    category: "Architecture & DevOps",
    description: {
      pt: "Pipelines com testes automatizados e deploy a cada push.",
      en: "Pipelines with automated testing and deployment on every push."
    }
  },
  {
    name: { pt: "Pest & PHPUnit", en: "Pest & PHPUnit" },
    category: "Architecture & DevOps",
    description: {
      pt: "Cobertura de testes em caminhos críticos de negócio, pagamento e autenticação.",
      en: "Test coverage for critical business, payment and authentication paths."
    }
  },
  {
    name: { pt: "n8n & Automações", en: "n8n & Automations" },
    category: "Architecture & DevOps",
    description: {
      pt: "Fluxos de automação conectando CRMs, APIs de marketing e agentes de IA em produção.",
      en: "Automation workflows connecting CRMs, marketing APIs and AI agents in production."
    }
  }
];