// Mock data for the student portal
export type Course = {
  id: string;
  title: string;
  category: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  instructor: string;
  instructorAvatar: string;
  hours: number;
  lessons: number;
  students: number;
  rating: number;
  price: number;
  promoPrice?: number;
  cover: string;
  description: string;
  objectives: string[];
  requirements: string[];
  audience: string;
  progress?: number;
  favorite?: boolean;
  enrolled?: boolean;
  completed?: boolean;
};

const covers = [
  "linear-gradient(135deg, oklch(0.55 0.17 268), oklch(0.72 0.16 40))",
  "linear-gradient(135deg, oklch(0.6 0.14 220), oklch(0.55 0.17 268))",
  "linear-gradient(135deg, oklch(0.65 0.15 155), oklch(0.6 0.14 220))",
  "linear-gradient(135deg, oklch(0.72 0.16 40), oklch(0.7 0.15 320))",
  "linear-gradient(135deg, oklch(0.7 0.15 320), oklch(0.55 0.17 268))",
  "linear-gradient(135deg, oklch(0.6 0.14 220), oklch(0.65 0.15 155))",
];

export const CATEGORIES = ["Todos", "Neuropsicopedagogia", "TDAH", "Autismo (ABA)", "Educação Inclusiva"];
export const LEVELS = ["Todos", "Iniciante", "Intermediário", "Avançado"];

export const courses: Course[] = [
  {
    id: "c1", title: "TDAH – Transtorno do Déficit de Atenção e Hiperatividade", category: "TDAH", level: "Intermediário",
    instructor: "Profa. Dra. Marina Costa", instructorAvatar: "MC", hours: 180, lessons: 60, students: 1240, rating: 4.9,
    price: 897, promoPrice: 597, cover: covers[0],
    description: "Formação completa para identificação, avaliação e intervenção pedagógica em casos de TDAH em diferentes fases da vida.",
    objectives: ["Compreender as bases neurobiológicas do TDAH", "Aplicar instrumentos de avaliação", "Planejar intervenções pedagógicas", "Orientar famílias e escolas"],
    requirements: ["Ensino superior em andamento ou concluído"],
    audience: "Educadores, psicopedagogos, psicólogos e profissionais da saúde e da educação.",
  },
  {
    id: "c2", title: "Neuropsicopedagogia Clínica e Institucional", category: "Neuropsicopedagogia", level: "Avançado",
    instructor: "Prof. Dr. Rafael Lima", instructorAvatar: "RL", hours: 750, lessons: 180, students: 980, rating: 4.9,
    price: 3200, promoPrice: 2400, cover: covers[1],
    description: "Pós-graduação em Neuropsicopedagogia com atuação nos contextos clínico e institucional, integrando neurociência, psicologia e educação.",
    objectives: ["Fundamentos da neurociência aplicada à aprendizagem", "Avaliação neuropsicopedagógica", "Intervenção clínica e escolar", "Elaboração de laudos e devolutivas"],
    requirements: ["Graduação concluída em áreas afins"],
    audience: "Pedagogos, psicólogos, fonoaudiólogos e demais profissionais da educação e saúde.",
  },
  {
    id: "c3", title: "Análise Comportamental Aplicada ao Autismo (ABA)", category: "Autismo (ABA)", level: "Avançado",
    instructor: "Profa. Camila Souza", instructorAvatar: "CS", hours: 510, lessons: 140, students: 1560, rating: 4.8,
    price: 2600, promoPrice: 1990, cover: covers[2],
    description: "Formação em Análise do Comportamento Aplicada (ABA) para intervenção em pessoas com Transtorno do Espectro Autista (TEA).",
    objectives: ["Princípios da Análise do Comportamento", "Avaliação funcional do comportamento", "Elaboração de programas ABA", "Manejo de comportamentos-alvo"],
    requirements: ["Ensino superior em áreas correlatas"],
    audience: "Psicólogos, terapeutas, pedagogos e profissionais que atuam com o TEA.",
  },
  {
    id: "c4", title: "Educação Especial e Inclusiva", category: "Educação Inclusiva", level: "Intermediário",
    instructor: "Prof. Diego Alves", instructorAvatar: "DA", hours: 420, lessons: 120, students: 1820, rating: 4.9,
    price: 2200, promoPrice: 1690, cover: covers[3],
    description: "Formação para atuação com estudantes público-alvo da educação especial, promovendo práticas pedagógicas verdadeiramente inclusivas.",
    objectives: ["Fundamentos legais da educação inclusiva", "Adaptações curriculares e AEE", "Tecnologia assistiva", "Trabalho colaborativo com famílias e escola"],
    requirements: ["Ensino superior em andamento ou concluído"],
    audience: "Professores, coordenadores pedagógicos, gestores escolares e demais profissionais da educação.",
  },
];

export type LessonItem = {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "pdf" | "quiz" | "live";
};

export const lessons: LessonItem[] = [
  { id: "l1", title: "Introdução ao curso", duration: "08:12", completed: true, type: "video" },
  { id: "l2", title: "Princípios de design visual", duration: "22:40", completed: true, type: "video" },
  { id: "l3", title: "Material de apoio - Guia de tipografia", duration: "PDF", completed: true, type: "pdf" },
  { id: "l4", title: "Wireframes de baixa fidelidade", duration: "18:05", completed: true, type: "video" },
  { id: "l5", title: "Quiz - Fundamentos", duration: "10 questões", completed: false, type: "quiz" },
  { id: "l6", title: "Prototipagem com Figma", duration: "34:22", completed: false, type: "video" },
  { id: "l7", title: "Aula ao vivo: Q&A com a instrutora", duration: "60:00", completed: false, type: "live" },
  { id: "l8", title: "Design System na prática", duration: "28:14", completed: false, type: "video" },
];

export const notifications = [
  { id: "n1", title: "Nova aula disponível", desc: "Prototipagem com Figma foi adicionada ao seu curso.", time: "há 12 min", unread: true, type: "lesson" },
  { id: "n2", title: "Certificado liberado", desc: "Seu certificado de Marketing Digital está pronto.", time: "há 2h", unread: true, type: "certificate" },
  { id: "n3", title: "Correção publicada", desc: "Rafael Lima corrigiu sua entrega em React & TS.", time: "ontem", unread: false, type: "feedback" },
  { id: "n4", title: "Webinar amanhã", desc: "Tendências de UX 2026 - 19h.", time: "ontem", unread: false, type: "event" },
];

export const events = [
  { id: "e1", title: "Aula ao vivo: Q&A com Marina", date: "Hoje, 19:00", type: "Aula ao vivo" },
  { id: "e2", title: "Prova - Módulo 3 React", date: "Amanhã, 14:00", type: "Prova" },
  { id: "e3", title: "Webinar: Tendências de UX 2026", date: "Qua, 19:00", type: "Webinar" },
  { id: "e4", title: "Entrega: Projeto de Marca", date: "Sex, 23:59", type: "Entrega" },
];

export const activities = [
  { id: "a1", title: "Concluiu a aula 'Wireframes de baixa fidelidade'", course: "UX/UI Design", time: "há 1h" },
  { id: "a2", title: "Enviou trabalho 'Landing Page'", course: "React & TypeScript", time: "há 4h" },
  { id: "a3", title: "Baixou material 'Guia de tipografia'", course: "UX/UI Design", time: "ontem" },
  { id: "a4", title: "Iniciou curso 'Inglês para Negócios'", course: "Inglês", time: "há 2 dias" },
];

export const certificates = [
  { id: "cert1", course: "Marketing Digital Estratégico", instructor: "Camila Souza", hours: 24, issued: "12/10/2025", code: "CERT-MKT-2025-8842" },
  { id: "cert2", course: "Fundamentos de Design", instructor: "Marina Costa", hours: 12, issued: "03/08/2025", code: "CERT-DSG-2025-3341" },
];

export const purchases = [
  { id: "p1", course: "UX/UI Design Completo", value: 197, method: "PIX", date: "05/09/2025", status: "Aprovado" as const, invoice: "INV-0912" },
  { id: "p2", course: "React & TypeScript", value: 247, method: "Cartão de Crédito 3x", date: "18/09/2025", status: "Aprovado" as const, invoice: "INV-0987" },
  { id: "p3", course: "Marketing Digital", value: 297, method: "Boleto", date: "02/08/2025", status: "Aprovado" as const, invoice: "INV-0821" },
  { id: "p4", course: "Inglês para Negócios", value: 347, method: "Cartão de Crédito 6x", date: "22/10/2025", status: "Pendente" as const, invoice: "INV-1051" },
];
