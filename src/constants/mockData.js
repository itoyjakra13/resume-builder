export const DEFAULT_RESUME_DATA = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    summary: '',
    avatar: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: []
};

export const SAMPLE_RESUME_DATA = {
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Frontend Engineer',
    email: 'alex.morgan@devmail.com',
    phone: '+1 (555) 234-5678',
    website: 'https://alexmorgan.dev',
    location: 'San Francisco, CA',
    summary: 'Passionate and detail-oriented Frontend Engineer with 5+ years of experience specializing in React, Tailwind CSS, and accessible web application design. Proven track record of improving site performance and building responsive UI architectures.',
    avatar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%234f46e5"/><path d="M50,20 A15,15 0 0,0 35,35 A15,15 0 0,0 50,50 A15,15 0 0,0 65,35 A15,15 0 0,0 50,20 Z M50,56 C30,56 12,68 12,82 C12,85 14,88 17,88 L83,88 C86,88 88,85 88,82 C88,68 70,56 50,56 Z" fill="%23ffffff"/><circle cx="42" cy="35" r="2.5" fill="%231e1b4b"/><circle cx="58" cy="35" r="2.5" fill="%231e1b4b"/><path d="M46,42 Q50,45 54,42" stroke="%231e1b4b" stroke-width="2" fill="none"/></svg>',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'InnovateTech Solutions',
      role: 'Senior React Developer',
      location: 'San Francisco, CA',
      startDate: '2023-05',
      endDate: '',
      current: true,
      description: '• Spearheaded migration of legacy dashboards to Vite + React, improving dev compile times by 70% and user load times by 40%.\n• Managed a team of 4 frontend engineers, defining code quality metrics, unit testing standards, and CI/CD pipelines.\n• Built an accessible reusable component library using Tailwind CSS, achieving WCAG AA conformance.'
    },
    {
      id: 'exp-2',
      company: 'WebCraft Agency',
      role: 'Frontend Engineer',
      location: 'Remote',
      startDate: '2021-06',
      endDate: '2023-04',
      current: false,
      description: '• Developed responsive, pixel-perfect user interfaces for 12+ high-traffic client websites.\n• Optimized web asset rendering, decreasing web vital CLS by 15% and LCP by 25%.\n• Collaborated with UX designers to translate Figma design mockups into functional HTML/CSS templates.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2017-09',
      endDate: '2021-05',
      grade: '3.85 GPA'
    }
  ],
  skills: [
    { id: 'skill-1', name: 'React.js', level: 5, category: 'Frontend' },
    { id: 'skill-2', name: 'JavaScript (ES6+)', level: 5, category: 'Languages' },
    { id: 'skill-3', name: 'Tailwind CSS', level: 5, category: 'Design/CSS' },
    { id: 'skill-4', name: 'HTML5 & Semantic CSS', level: 5, category: 'Design/CSS' },
    { id: 'skill-5', name: 'TypeScript', level: 4, category: 'Languages' },
    { id: 'skill-6', name: 'Git & GitHub', level: 4, category: 'Tools' },
    { id: 'skill-7', name: 'Web Accessibility (a11y)', level: 4, category: 'Frontend' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Accessible Task Manager',
      description: 'A fully accessible web-based task scheduler utilizing ARIA roles and keyboard loops. Keyboard focus is strictly managed, allowing complete screen-reader compatibility.',
      technologies: ['React', 'Tailwind CSS', 'Aria-Live'],
      link: 'https://github.com/alexmorgan/task-manager'
    },
    {
      id: 'proj-2',
      name: 'Tailwind Theme generator',
      description: 'A client-side styling tool that compiles custom CSS theme palettes using HSL config mapping. Exportable directly in utility classes.',
      technologies: ['React', 'CSS Variables', 'Tailwind'],
      link: 'https://github.com/alexmorgan/theme-gen'
    }
  ],
  customSections: [
    {
      id: 'cust-1',
      sectionTitle: 'Certifications',
      items: [
        {
          id: 'cust-item-1',
          title: 'AWS Certified Cloud Practitioner',
          subtitle: 'Amazon Web Services',
          date: '2024-03',
          description: 'Validation of foundational cloud concepts, security, and technology services.'
        }
      ]
    }
  ]
};

export const DEFAULT_METADATA = {
  templateId: 'modern',
  themeColor: '#3b82f6', // Tailwind blue-500
  fontFamily: 'sans',    // 'sans' | 'serif' | 'mono'
  fontSize: 'medium',    // 'small' | 'medium' | 'large'
  pageMargins: 'compact', // Use compact margins by default for A4 page fit
  contentDensity: 'compact', // Use compact spacing by default for A4 page fit
};
