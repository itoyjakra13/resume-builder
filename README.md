<div align="center">

# CV-Craft (Resume Builder)

A modern, client-side resume builder built with React 19, Vite 8, and Tailwind CSS v4.

Create, customize, preview, and export professional resumes directly from the browser.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Oxlint](https://img.shields.io/badge/Oxlint-Fast-orange?logo=eslint&logoColor=white)](https://oxc.rs/)
[![License](https://img.shields.io/badge/License-Educational-green)]()

</div>

---

## Overview

CV-Craft is a fully client-side resume builder that enables users to create professional resumes using an interactive editor with a real-time preview, style customization, and a built-in ATS scanner. 

The application is built using modern frontend technologies and features a component-based architecture, responsive design principles, custom layout templates, local storage persistence, and browser-based PDF generation via print-media styles—eliminating the need for any backend infrastructure.

---

## Preview

> Add screenshots of the application here.

```
docs/
    home.png
    editor.png
    preview.png
```

Example:

```markdown
![Home](docs/home.png)
```

---

## Features

- **Live Resume Preview:** See layout, content, and styling updates in real time with interactive zoom and fit controls.
- **6 Professional Templates:** Choose from elegantly crafted styles: *Corporate*, *Creative*, *Creative Header*, *Elegant*, *Minimal*, and *Modern*.
- **ATS Optimizer:** Scan your resume in real time for keywords, word counts, contact completeness, and action verbs to maximize visibility.
- **Style Customization:** Dynamically configure accent colors, font families (Sans, Serif, Mono), font sizes (Small, Medium, Large), and page margins.
- **Local Storage Persistence:** Progress is automatically saved locally so that work remains intact upon refreshing the browser.
- **JSON Import/Export:** Back up and restore entire resume configurations using simple JSON configuration files.
- **Clean PDF Export:** High-fidelity document rendering via native browser print stylesheets.
- **Dynamic Form Sections:** Easily add, edit, or reorder entries for Education, Work Experience, Projects, Skills, and Custom Sections.
- **Sample Data Loader:** Load pre-populated professional details instantly to test layout and templates.
- **Form Validation:** Embedded email, URL, and dates checking to ensure there are no formatting errors.

---

## Technology Stack

| Category | Technology |
|-----------|------------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | JavaScript (ES6+ / JSX) |
| Styling | Tailwind CSS v4 |
| Linting | Oxlint |
| Persistence | LocalStorage API |
| PDF Generation | Native Browser Print Engine (`window.print()`) |
| Package Manager | npm |

---

## Folder Structure

```
resume-builder
├── public
│   ├── favicon.svg
│   └── icons.svg
└── src
    ├── assets
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components
    │   ├── Accordion
    │   │   └── Accordion.jsx
    │   ├── Button
    │   │   └── Button.jsx
    │   ├── Header
    │   │   └── Header.jsx
    │   ├── Input
    │   │   └── Input.jsx
    │   └── ResumeBuilderApp.jsx
    ├── constants
    │   └── mockData.js
    ├── context
    │   └── ResumeContext.jsx
    ├── features
    │   └── resume-builder
    │       └── components
    │           ├── AtsOptimizer.jsx
    │           ├── CustomSectionsForm.jsx
    │           ├── EducationForm.jsx
    │           ├── ExperienceForm.jsx
    │           ├── FormPanel.jsx
    │           ├── PersonalInfoForm.jsx
    │           ├── PreviewPanel.jsx
    │           ├── ProjectsForm.jsx
    │           └── SkillsForm.jsx
    ├── hooks
    │   └── useLocalStorage.js
    ├── templates
    │   ├── CorporateTemplate.jsx
    │   ├── CreativeHeaderTemplate.jsx
    │   ├── CreativeTemplate.jsx
    │   ├── ElegantTemplate.jsx
    │   ├── MinimalTemplate.jsx
    │   ├── ModernTemplate.jsx
    │   └── TemplateRenderer.jsx
    ├── utils
    │   ├── dataExporter.js
    │   └── validation.js
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/itoyjakra13/resume-builder.git
```

Navigate into the project directory:

```bash
cd resume-builder
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Application Workflow

```
User Input
      │
      ▼
React State (Persisted in LocalStorage)
      │
      ▼
Live Resume Preview & Customization (Theme, Fonts, Spacing)
      │
      ▼
ATS Score Analysis & Action Word Check
      │
      ▼
Print Layout Stylesheet Application
      │
      ▼
Native Print PDF Generation
```

---

## Design Principles

- **Component Reusability:** Modular components for inputs, buttons, accordions, and form blocks.
- **Fast Build Times:** Powered by Vite 8 for fast HMR and Oxlint for lightning-fast linting.
- **Zero Backend Dependency:** All logic runs directly inside the client's browser, maximizing speed and user privacy.
- **Responsive Layout:** Adaptive sidebar editor and navigation tabs optimized for mobile and desktop screens.
- **Separation of Concerns:** Business logic isolated in Context and Hooks, template views isolated in the templates module.

---

## Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✔ |
| Edge | ✔ |
| Firefox | ✔ |
| Brave | ✔ |
| Opera | ✔ |

---

## Known Limitations

- PDF layout formatting depends on the browser's native print-to-PDF rendering behavior.
- Legacy Internet Explorer versions are not supported.

---

## Future Improvements

- Drag-and-drop section reordering.
- Rich text styling capabilities for description fields.
- Multi-page resume auto-overflow adjustment.
- Additional customization settings (e.g. customized font integrations).

---

## Development Notes

This project runs 100% locally and stores data in your browser. No personal information is sent to third-party servers.

---

## Contributing

Contributions are welcome. Feel free to open an issue or submit a pull request if you have ideas, features, or bug fixes.

---

## Author

**Arkajyoti Rakshit**  
*Bachelor of Technology*  
*Computer Science & Engineering*  

GitHub: [github.com/itoyjakra13](https://github.com/itoyjakra13)

---

## License

This project is released for educational and learning purposes.
