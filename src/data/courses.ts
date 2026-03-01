export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  vendor: string;
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  deliveryModes: string[];
  description: string;
  highlights: string[];
  isTrending: boolean;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  courseCount: number;
  color: string;
}

export const categories: Category[] = [
  { id: "1", name: "Microsoft", slug: "microsoft", icon: "🟦", courseCount: 245, color: "from-blue-500 to-blue-700" },
  { id: "2", name: "AWS", slug: "aws", icon: "🟧", courseCount: 120, color: "from-orange-500 to-orange-700" },
  { id: "3", name: "Cisco", slug: "cisco", icon: "🔵", courseCount: 95, color: "from-cyan-500 to-cyan-700" },
  { id: "4", name: "Cybersecurity", slug: "cybersecurity", icon: "🛡️", courseCount: 180, color: "from-red-500 to-red-700" },
  { id: "5", name: "Cloud Computing", slug: "cloud", icon: "☁️", courseCount: 200, color: "from-sky-500 to-sky-700" },
  { id: "6", name: "Data Science & AI", slug: "data-science", icon: "🤖", courseCount: 150, color: "from-violet-500 to-violet-700" },
  { id: "7", name: "DevOps", slug: "devops", icon: "⚙️", courseCount: 85, color: "from-emerald-500 to-emerald-700" },
  { id: "8", name: "Project Management", slug: "project-management", icon: "📊", courseCount: 110, color: "from-amber-500 to-amber-700" },
  { id: "9", name: "VMware", slug: "vmware", icon: "🖥️", courseCount: 65, color: "from-teal-500 to-teal-700" },
  { id: "10", name: "Oracle", slug: "oracle", icon: "🔴", courseCount: 78, color: "from-red-600 to-red-800" },
  { id: "11", name: "CompTIA", slug: "comptia", icon: "✅", courseCount: 45, color: "from-green-500 to-green-700" },
  { id: "12", name: "ITIL & ITSM", slug: "itil", icon: "📋", courseCount: 55, color: "from-indigo-500 to-indigo-700" },
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Microsoft Azure Administrator (AZ-104)",
    slug: "azure-administrator-az104",
    category: "Microsoft",
    vendor: "Microsoft",
    duration: "4 Days",
    price: 1295,
    originalPrice: 1895,
    rating: 4.9,
    students: 12450,
    level: "Intermediate",
    deliveryModes: ["Live Online", "Classroom", "1-on-1"],
    description: "Master Azure administration including virtual networks, storage, compute, identity, security, and governance.",
    highlights: ["Official Microsoft curriculum", "Hands-on labs included", "Exam voucher included", "24/7 lab access"],
    isTrending: true,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "AWS Certified Solutions Architect - Associate",
    slug: "aws-solutions-architect",
    category: "AWS",
    vendor: "Amazon",
    duration: "3 Days",
    price: 1195,
    originalPrice: 1695,
    rating: 4.8,
    students: 15230,
    level: "Intermediate",
    deliveryModes: ["Live Online", "Classroom", "Self-paced"],
    description: "Design and deploy scalable, fault-tolerant systems on AWS infrastructure.",
    highlights: ["AWS official training", "Practice exams", "Cloud sandbox access", "Certificate of completion"],
    isTrending: true,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "Certified Information Systems Security Professional (CISSP)",
    slug: "cissp-certification",
    category: "Cybersecurity",
    vendor: "ISC2",
    duration: "5 Days",
    price: 2495,
    originalPrice: 3295,
    rating: 4.9,
    students: 8920,
    level: "Expert",
    deliveryModes: ["Live Online", "Classroom", "1-on-1"],
    description: "The gold standard in cybersecurity certification covering 8 domains of information security.",
    highlights: ["ISC2 authorized training", "Practice tests", "Study materials", "Money-back guarantee"],
    isTrending: true,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "Microsoft Power BI Data Analyst (PL-300)",
    slug: "power-bi-data-analyst",
    category: "Microsoft",
    vendor: "Microsoft",
    duration: "3 Days",
    price: 995,
    originalPrice: 1495,
    rating: 4.8,
    students: 18500,
    level: "Intermediate",
    deliveryModes: ["Live Online", "Classroom", "Self-paced"],
    description: "Transform data into actionable insights using Power BI dashboards and reports.",
    highlights: ["Hands-on projects", "Real datasets", "Dashboard templates", "Exam preparation"],
    isTrending: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "Cisco CCNA Certification Training",
    slug: "cisco-ccna",
    category: "Cisco",
    vendor: "Cisco",
    duration: "5 Days",
    price: 1595,
    originalPrice: 2195,
    rating: 4.7,
    students: 22100,
    level: "Beginner",
    deliveryModes: ["Live Online", "Classroom", "1-on-1"],
    description: "Build a strong networking foundation with the world's most recognized networking certification.",
    highlights: ["Lab practice included", "Cisco packet tracer", "Exam voucher", "Career support"],
    isTrending: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "Generative AI Specialty",
    slug: "generative-ai-specialty",
    category: "Data Science & AI",
    vendor: "Top in Town",
    duration: "4 Days",
    price: 1795,
    originalPrice: 2495,
    rating: 4.9,
    students: 5600,
    level: "Advanced",
    deliveryModes: ["Live Online", "1-on-1"],
    description: "Master generative AI technologies including LLMs, prompt engineering, and AI application development.",
    highlights: ["Cutting-edge curriculum", "Hands-on AI projects", "Industry expert instructors", "Portfolio projects"],
    isTrending: true,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
  },
  {
    id: "7",
    title: "PMP® Certification Training",
    slug: "pmp-certification",
    category: "Project Management",
    vendor: "PMI",
    duration: "5 Days",
    price: 1895,
    originalPrice: 2595,
    rating: 4.8,
    students: 31200,
    level: "Advanced",
    deliveryModes: ["Live Online", "Classroom", "Self-paced"],
    description: "Globally recognized project management certification that demonstrates competence leading projects.",
    highlights: ["35 PDUs included", "Practice exams", "PMI approved provider", "Pass guarantee"],
    isTrending: false,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
  },
  {
    id: "8",
    title: "ITIL® 4 Foundation",
    slug: "itil-4-foundation",
    category: "ITIL & ITSM",
    vendor: "PeopleCert",
    duration: "3 Days",
    price: 895,
    originalPrice: 1295,
    rating: 4.7,
    students: 27800,
    level: "Beginner",
    deliveryModes: ["Live Online", "Classroom", "Self-paced"],
    description: "Understand the key concepts and the four dimensions of IT service management.",
    highlights: ["PeopleCert accredited", "Exam included", "Official courseware", "Digital badge"],
    isTrending: false,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop",
  },
];

export const deliveryModes = [
  { id: "live-online", name: "Live Online Classroom", icon: "🖥️", description: "Interactive virtual classes with live instructors" },
  { id: "classroom", name: "Classroom Training", icon: "🏫", description: "In-person training at our global centers" },
  { id: "self-paced", name: "Self-Paced Learning", icon: "📚", description: "Learn at your own pace with recorded content" },
  { id: "1-on-1", name: "1-on-1 Training", icon: "👤", description: "Personalized training with dedicated instructor" },
  { id: "fly-me", name: "Fly-Me-A-Trainer", icon: "✈️", description: "We send our trainer to your location" },
  { id: "corporate", name: "Corporate Learning", icon: "🏢", description: "Customized training for your organization" },
];

export const stats = [
  { label: "Students Trained", value: 150000, suffix: "+" },
  { label: "Courses Available", value: 5000, suffix: "+" },
  { label: "Countries Served", value: 80, suffix: "+" },
  { label: "Corporate Clients", value: 3500, suffix: "+" },
  { label: "Expert Trainers", value: 500, suffix: "+" },
  { label: "Satisfaction Rate", value: 98, suffix: "%" },
];

export const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Cloud Architect at Microsoft",
    content: "The Azure training at Top in Town was exceptional. The hands-on labs and expert instructors helped me pass AZ-104 on my first attempt.",
    rating: 5,
    avatar: "SC",
  },
  {
    id: "2",
    name: "James Rodriguez",
    role: "Security Engineer at Google",
    content: "CISSP certification training was world-class. The structured approach and real-world scenarios made complex security concepts easy to understand.",
    rating: 5,
    avatar: "JR",
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "DevOps Lead at Amazon",
    content: "The AWS Solutions Architect course gave me the confidence and skills to architect scalable cloud solutions. Highly recommended!",
    rating: 5,
    avatar: "PS",
  },
];

export const partners = [
  "Microsoft", "AWS", "Cisco", "VMware", "Oracle", "CompTIA",
  "ISC2", "PMI", "PECB", "EC-Council", "Red Hat", "PeopleCert",
];
