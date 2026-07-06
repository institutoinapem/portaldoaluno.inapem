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

export const CATEGORIES = ["Todos", "Design", "Programação", "Negócios", "Marketing", "Idiomas", "Fotografia"];
export const LEVELS = ["Todos", "Iniciante", "Intermediário", "Avançado"];

export const courses: Course[] = [
  {
    id: "c1", title: "UX/UI Design Completo do Zero ao Avançado", category: "Design", level: "Iniciante",
    instructor: "Marina Costa", instructorAvatar: "MC", hours: 42, lessons: 68, students: 12480, rating: 4.9,
    price: 397, promoPrice: 197, cover: covers[0],
    description: "Aprenda os fundamentos e as práticas modernas de design de interfaces e experiência do usuário. Do wireframe ao protótipo interativo.",
    objectives: ["Dominar Figma", "Criar design systems", "Prototipar interfaces reais", "Aplicar heurísticas de usabilidade"],
    requirements: ["Computador com internet", "Vontade de aprender"],
    audience: "Iniciantes em design, desenvolvedores e profissionais de produto.",
    progress: 62, enrolled: true, favorite: true,
  },
  {
    id: "c2", title: "React & TypeScript na Prática", category: "Programação", level: "Intermediário",
    instructor: "Rafael Lima", instructorAvatar: "RL", hours: 38, lessons: 54, students: 8930, rating: 4.8,
    price: 447, promoPrice: 247, cover: covers[1],
    description: "Construa aplicações modernas com React 19, TypeScript, Vite e as melhores práticas do mercado.",
    objectives: ["Arquitetura de componentes", "Hooks avançados", "Testes e performance", "Deploy em produção"],
    requirements: ["JavaScript básico", "Noções de HTML/CSS"],
    audience: "Desenvolvedores front-end e full-stack.",
    progress: 28, enrolled: true,
  },
  {
    id: "c3", title: "Marketing Digital Estratégico", category: "Marketing", level: "Iniciante",
    instructor: "Camila Souza", instructorAvatar: "CS", hours: 24, lessons: 36, students: 15600, rating: 4.7,
    price: 297, cover: covers[2],
    description: "Planeje campanhas eficazes, meça resultados e cresça no digital com estratégia.",
    objectives: ["Funil de vendas", "SEO e Ads", "Analytics", "Automação de marketing"],
    requirements: ["Nenhum pré-requisito"],
    audience: "Empreendedores, gestores e profissionais de marketing.",
    progress: 100, enrolled: true, completed: true,
  },
  {
    id: "c4", title: "Fotografia Profissional para Iniciantes", category: "Fotografia", level: "Iniciante",
    instructor: "Diego Alves", instructorAvatar: "DA", hours: 18, lessons: 28, students: 6200, rating: 4.9,
    price: 197, promoPrice: 97, cover: covers[3],
    description: "Aprenda composição, iluminação e edição para fotos incríveis com qualquer câmera.",
    objectives: ["Composição visual", "Iluminação natural e artificial", "Edição em Lightroom"],
    requirements: ["Câmera ou celular"],
    audience: "Aspirantes a fotógrafos.",
    favorite: true,
  },
  {
    id: "c5", title: "Inglês para Negócios", category: "Idiomas", level: "Intermediário",
    instructor: "Anna Peterson", instructorAvatar: "AP", hours: 32, lessons: 60, students: 9800, rating: 4.6,
    price: 347, cover: covers[4],
    description: "Comunicação profissional em inglês para reuniões, e-mails e apresentações.",
    objectives: ["Vocabulário de negócios", "Fluência em reuniões", "Escrita profissional"],
    requirements: ["Inglês básico"],
    audience: "Profissionais que atuam com clientes internacionais.",
    progress: 15, enrolled: true,
  },
  {
    id: "c6", title: "Gestão Financeira para Empreendedores", category: "Negócios", level: "Intermediário",
    instructor: "Paulo Ribeiro", instructorAvatar: "PR", hours: 22, lessons: 30, students: 5400, rating: 4.8,
    price: 397, promoPrice: 247, cover: covers[5],
    description: "Controle o caixa, precifique corretamente e tome decisões baseadas em dados.",
    objectives: ["Fluxo de caixa", "Precificação", "Indicadores financeiros"],
    requirements: ["Ter um negócio ou ideia"],
    audience: "Empreendedores e gestores.",
  },
  {
    id: "c7", title: "Python para Ciência de Dados", category: "Programação", level: "Avançado",
    instructor: "Julia Neves", instructorAvatar: "JN", hours: 48, lessons: 72, students: 11200, rating: 4.9,
    price: 497, cover: covers[0],
    description: "Análise de dados, visualização e machine learning com Python.",
    objectives: ["Pandas e NumPy", "Visualização com Matplotlib", "Modelos preditivos"],
    requirements: ["Programação básica"],
    audience: "Analistas e desenvolvedores.",
  },
  {
    id: "c8", title: "Design de Marca e Identidade Visual", category: "Design", level: "Intermediário",
    instructor: "Marina Costa", instructorAvatar: "MC", hours: 28, lessons: 42, students: 7300, rating: 4.7,
    price: 347, promoPrice: 197, cover: covers[2],
    description: "Crie marcas memoráveis com estratégia, tipografia e sistemas visuais.",
    objectives: ["Naming e posicionamento", "Sistemas de identidade", "Aplicações de marca"],
    requirements: ["Noções de design"],
    audience: "Designers e empreendedores.",
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
