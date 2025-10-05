import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Briefcase, GraduationCap, Code, FolderOpen, FileText,
    Plus, Trash2, Download, Save, Share2, RefreshCw, Eye, EyeOff,
    ChevronLeft, ChevronRight, Menu, X, ZoomIn, ZoomOut, Star
} from 'lucide-react';


// Project: Official Resume Builder — <ResumeBuilderDashboard>

// Goal:
// Build a production-ready, official Resume Builder web application component in React (v18+) with Tailwind CSS styling and Framer Motion animations. The UI must be professional, accessible, and print/export-ready. Provide modular, well-documented code that can be integrated into an existing platform. Focus on UX clarity, data validation, performance, and cross-browser/print fidelity.

// Core Requirements:
// - Single exported React component: <ResumeBuilderDashboard>
// - Use functional components, React Hooks, and context where appropriate.
// - Use Tailwind CSS for styling and Framer Motion for animations.
// - Use Charting only if needed for analytics — primary preview must be markup/CSS for reliable PDF/DOCX export.
// - Provide clear prop-types or TypeScript types (prefer TypeScript) and inline documentation comments.
// - Include a lightweight, mock data service (or Axios stubs) and demonstrate save/load to localStorage. Code should be easy to swap for API integration.

// 1. Layout & Shell
// - Split-screen responsive layout:
//   - Left panel (Form Builder): 40% width on desktop, full width on mobile (collapsible/slide-out).
//   - Right panel (Live Preview): 60% width on desktop, initially hidden on narrow screens with a toggle to view.
// - App shell includes:
//   - Sticky header with product title: "Resume Builder — Official"
//   - Breadcrumb or step indicator for multi-step flow
//   - Sticky bottom action bar for primary actions on larger screens
// - Mobile behaviour:
//   - Left panel collapsible into a top-down stepper
//   - Preview toggle button pinned for quick switch

// 2. Left Panel — Form Builder (Official, Validated)
// - Stepper/tabs for sections with clear labels and microcopy:
//   - Personal Info: Full Name, Job Title, Location, Email, Phone, Portfolio, LinkedIn/GitHub
//   - Summary / Objective: multi-line with length counter and writing tips
//   - Work Experience: multiple entries (Role, Company, Location, Start/End, Responsibilities, Achievements). Support bullet lists with rich-text-lite (bold, italic, link).
//   - Education: multiple entries (Degree, Institution, Location, Start/End, Notes)
//   - Skills: tag-based input + proficiency level (0–5) and optional keywords per skill
//   - Projects: title, short description, tech stack, URL, role
//   - Certifications / Awards: title, issuer, date
//   - Additional sections: Languages, Volunteering, Hobbies (optional)
// - UX details:
//   - Add / Remove / Reorder entries with accessible controls (drag handle + keyboard fallback)
//   - Inline validation and unobtrusive error messages (email format, required fields)
//   - Autosave to localStorage, explicit “Save” to backend via a provided save handler
//   - Progress indicator showing completion % and missing critical fields for an ATS-ready resume
//   - Helper text & examples per field (e.g., “Use achievement-oriented phrases with metrics”)
//   - Option to mark sections as private or public (controls export visibility)
// - Accessibility:
//   - Proper labels, aria-* attributes, focus management, keyboard navigation
//   - Contrast checks for text and controls
//   - Screen reader friendly announcements for dynamic changes (e.g., entry added)

// 3. Right Panel — Live Preview (Print & ATS Friendly)
// - Real-time HTML/CSS preview that mirrors exported output; preview must be print/PDF/DOCX faithful:
//   - Use semantic HTML (h1–h3, p, ul/li, time) and CSS page-break rules for PDF export.
//   - Provide layout templates:
//     - Classic (single column — conservative spacing)
//     - Modern (two-column with sidebar for contact/skills)
//     - Minimalist (clean, single-column)
//     - Professional (ATS-friendly, simple fonts)
// - Template & typography controls:
//   - Template selector dropdown with visual thumbnail previews
//   - Font selector (system fonts + Google Fonts list); ensure fallback stack
//   - Font size and line-height controls (small / medium / large)
//   - Color theme presets (Neutral/Blue/Slate/Pastel) and custom primary color picker
// - Layout options:
//   - Single-column vs two-column toggle
//   - Toggle section visibility (hide/show Projects, Certifications, etc.)
//   - Drag-and-drop reordering of major sections (sidebar aside for two-column templates)
// - Profile image:
//   - Upload, crop, and circular/rounded corner options; fallback initials avatar
//   - Option to hide photo for ATS export
// - Preview controls:
//   - Zoom control (fit, 100%, 75%, 50%)
//   - Page size selector for preview (A4 / Letter) with print margins
//   - "View as PDF" quick render using the same preview markup for accurate export

// 4. Exports, Sharing & Persistence
// - Exports:
//   - Download PDF: generate server-like print PDF client-side (html2pdf or print stylesheet; ensure proper page-breaks)
//   - Download DOCX: prepare an accessible DOCX export (basic template or library integration note)
//   - Export options must respect hidden/private sections and template choices
// - Share:
//   - Generate shareable link (slug/UUID) that persists current resume state (simulate via localStorage + copy-to-clipboard with notification)
// - Persistence:
//   - Autosave and explicit Save to server via a pluggable API handler (provide example Axios call commented)
//   - Version history / undo support (at least 5 previous snapshots in local storage)
// - Security & Privacy:
//   - Do not store PII in logs in examples
//   - Provide opt-in for sharing or public resume generation

// 5. Customization & Advanced Controls
// - Drag-and-drop to reorder sections via accessible drag handles (react-beautiful-dnd or similar)
// - Toggle visibility on per-section basis and per-field basis for export configuration
// - Styling controls:
//   - Font family, weight, size
//   - Color palette and accent color
//   - Margins and spacing presets
//   - Watermark toggle (e.g., "DRAFT" or custom text, with opacity control)
// - Print/Export fidelity options:
//   - Embed fonts vs system fonts
//   - High DPI images handling
//   - Inline CSS suitable for PDF generation

// 6. UX, Motion & Visual Design
// - Visual language should be professional and conservative (suitable for recruiters & enterprise):
//   - Glassy accent for controls only; primary emphasis on legibility and whitespace
//   - Headline fonts bold, body fonts neutral and readable
//   - Pastel accents optional but not required for official templates
// - Animations:
//   - Framer Motion: subtle entrance, smooth form transitions, gentle micro-interactions for buttons and toasts
//   - Accessibility: provide "Reduce motion" support
// - Microcopy & Guidance:
//   - Contextual tips for writing bullets (use metrics), recommended word counts, ATS keywords suggestions
//   - Error handling and recovery messaging (e.g., export failed — retry)

// 7. Developer Experience & Quality
// - Use TypeScript or PropTypes; prefer TypeScript with clear interfaces for resume data shape
// - Separate presentational components vs stateful logic (use context or Redux for state if necessary)
// - Unit tests for key behaviors (form validation, export triggers) – example test files (Jest + React Testing Library)
// - Accessibility tests (axe-core integration example)
// - Well-structured CSS via Tailwind utility classes with a central theme token file
// - Document components with README & usage examples:
//   - How to plug into backend endpoints (save, publish)
//   - How to integrate PDF/DOCX services
//   - How to add new templates

// 8. Analytics & Admin Hooks (Optional)
// - Emit events for: Save, Export (PDF/DOCX), TemplateChange, Share, SwitchTemplate
// - Include example telemetry hooks, with GDPR-compliant opt-out notes

// 9. Deliverable
// - A self-contained React component folder:
//   - /components
//     - ResumeBuilderDashboard.tsx
//     - FormTabs/*.tsx
//     - Preview/*.tsx
//     - Controls/*.tsx
//     - Modals/*.tsx
//   - /hooks (e.g., useAutosave, useExport)
//   - /services (localStorage mock, api stubs)
//   - /styles (tailwind.config additions, theme tokens)
//   - README.md with integration instructions, known limitations, and extension points
//   - Example tests (unit + accessibility)
// - Provide inline comments and a short usage example showing how to wire save/load handlers.

// Acceptance Criteria:
// - The preview output must be visually identical to the exported PDF (within common browser-to-PDF differences).
// - Accessibility: basic WCAG 2.1 AA compliance for forms and interactions.
// - Responsive across typical breakpoints and print-ready for A4/Letter.
// - Code is modular, documented, and ready for integration.

// Optional Enhancements (if asked):
// - ATS optimization helper that flags problematic formatting or missing fields
// - Resume scoring/feedback widget (readability, keywords, impact score)
// - Template marketplace integration for adding new paid templates



const ResumeBuilderDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [template, setTemplate] = useState('modern');
    const [fontFamily, setFontFamily] = useState('Inter');
    const [colorTheme, setColorTheme] = useState('blue');
    const [layout, setLayout] = useState('two-column');
    const [zoom, setZoom] = useState(100);
    const [fontSize, setFontSize] = useState('medium');
    const [showWatermark, setShowWatermark] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const [resumeData, setResumeData] = useState({
        personal: {
            name: '',
            email: '',
            phone: '',
            linkedin: '',
            location: '',
            website: '',
            photo: null
        },
        summary: '',
        education: [{ degree: '', school: '', year: '', gpa: '' }],
        experience: [{ role: '', company: '', duration: '', description: '', achievements: '' }],
        skills: [{ name: '', rating: 0 }],
        projects: [{ title: '', description: '', link: '' }]
    });

    const tabs = [
        { name: 'Personal Info', icon: User },
        { name: 'Summary', icon: FileText },
        { name: 'Education', icon: GraduationCap },
        { name: 'Experience', icon: Briefcase },
        { name: 'Skills', icon: Code },
        { name: 'Projects', icon: FolderOpen }
    ];

    const templates = ['Classic', 'Modern', 'Minimalist'];
    const fonts = ['Inter', 'Roboto', 'Lora', 'Playfair Display', 'Montserrat'];
    const themes = {
        blue: { primary: '#3B82F6', secondary: '#60A5FA', text: '#1E40AF' },
        black: { primary: '#000000', secondary: '#374151', text: '#111827' },
        pastel: { primary: '#A78BFA', secondary: '#C4B5FD', text: '#6D28D9' }
    };

    useEffect(() => {
        const saved = localStorage.getItem('resumeData');
        if (saved) {
            setResumeData(JSON.parse(saved));
        }
    }, []);

    const saveProgress = () => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Progress saved successfully!');
    };

    const updateField = (section, index, field, value) => {
        setResumeData(prev => {
            const newData = { ...prev };
            if (Array.isArray(newData[section])) {
                newData[section][index][field] = value;
            } else if (typeof newData[section] === 'object') {
                newData[section][field] = value;
            } else {
                newData[section] = value;
            }
            return newData;
        });
    };

    const addItem = (section) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], section === 'education' ? { degree: '', school: '', year: '', gpa: '' } :
                section === 'experience' ? { role: '', company: '', duration: '', description: '', achievements: '' } :
                    section === 'skills' ? { name: '', rating: 0 } :
                        { title: '', description: '', link: '' }]
        }));
    };

    const removeItem = (section, index) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const calculateProgress = () => {
        let filled = 0;
        let total = 0;

        Object.keys(resumeData.personal).forEach(key => {
            total++;
            if (resumeData.personal[key]) filled++;
        });

        if (resumeData.summary) filled++;
        total++;

        resumeData.education.forEach(edu => {
            Object.values(edu).forEach(val => {
                total++;
                if (val) filled++;
            });
        });

        resumeData.experience.forEach(exp => {
            Object.values(exp).forEach(val => {
                total++;
                if (val) filled++;
            });
        });

        return Math.round((filled / total) * 100);
    };

    const exportToPDF = () => {
        alert('PDF export would be implemented with a library like jsPDF or react-pdf');
    };

    const exportToDOCX = () => {
        alert('DOCX export would be implemented with a library like docx');
    };

    const shareResume = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    const resetForm = () => {
        setResumeData({
            personal: { name: '', email: '', phone: '', linkedin: '', location: '', website: '', photo: null },
            summary: '',
            education: [{ degree: '', school: '', year: '', gpa: '' }],
            experience: [{ role: '', company: '', duration: '', description: '', achievements: '' }],
            skills: [{ name: '', rating: 0 }],
            projects: [{ title: '', description: '', link: '' }]
        });
        localStorage.removeItem('resumeData');
        setShowResetModal(false);
    };

    const StarRating = ({ rating, onChange }) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-5 h-5 cursor-pointer transition-colors ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                        onClick={() => onChange(star)}
                    />
                ))}
            </div>
        );
    };

    const renderFormSection = () => {
        switch (activeTab) {
            case 0:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={resumeData.personal.name}
                                onChange={(e) => updateField('personal', 0, 'name', e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                value={resumeData.personal.email}
                                onChange={(e) => updateField('personal', 0, 'email', e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={resumeData.personal.phone}
                                onChange={(e) => updateField('personal', 0, 'phone', e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <input
                                type="text"
                                placeholder="LinkedIn"
                                value={resumeData.personal.linkedin}
                                onChange={(e) => updateField('personal', 0, 'linkedin', e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                value={resumeData.personal.location}
                                onChange={(e) => updateField('personal', 0, 'location', e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Website/Portfolio"
                                value={resumeData.personal.website}
                                onChange={(e) => updateField('personal', 0, 'website', e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </motion.div>
                );

            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <textarea
                            placeholder="Write a compelling professional summary or objective..."
                            value={resumeData.summary}
                            onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-40 resize-none"
                        />
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        {resumeData.education.map((edu, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3 relative">
                                {resumeData.education.length > 1 && (
                                    <button
                                        onClick={() => removeItem('education', index)}
                                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <input
                                    type="text"
                                    placeholder="Degree/Certification"
                                    value={edu.degree}
                                    onChange={(e) => updateField('education', index, 'degree', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="School/University"
                                    value={edu.school}
                                    onChange={(e) => updateField('education', index, 'school', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Year"
                                        value={edu.year}
                                        onChange={(e) => updateField('education', index, 'year', e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="GPA (optional)"
                                        value={edu.gpa}
                                        onChange={(e) => updateField('education', index, 'gpa', e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem('education')}
                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Education
                        </button>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        {resumeData.experience.map((exp, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3 relative">
                                {resumeData.experience.length > 1 && (
                                    <button
                                        onClick={() => removeItem('experience', index)}
                                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    value={exp.role}
                                    onChange={(e) => updateField('experience', index, 'role', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        value={exp.company}
                                        onChange={(e) => updateField('experience', index, 'company', e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duration"
                                        value={exp.duration}
                                        onChange={(e) => updateField('experience', index, 'duration', e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <textarea
                                    placeholder="Job description..."
                                    value={exp.description}
                                    onChange={(e) => updateField('experience', index, 'description', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                                />
                                <textarea
                                    placeholder="Key achievements (one per line)..."
                                    value={exp.achievements}
                                    onChange={(e) => updateField('experience', index, 'achievements', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => addItem('experience')}
                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Experience
                        </button>
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        {resumeData.skills.map((skill, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3 relative">
                                {resumeData.skills.length > 1 && (
                                    <button
                                        onClick={() => removeItem('skills', index)}
                                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <input
                                    type="text"
                                    placeholder="Skill name"
                                    value={skill.name}
                                    onChange={(e) => updateField('skills', index, 'name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">Proficiency:</span>
                                    <StarRating
                                        rating={skill.rating}
                                        onChange={(rating) => updateField('skills', index, 'rating', rating)}
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addItem('skills')}
                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Skill
                        </button>
                    </motion.div>
                );

            case 5:
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        {resumeData.projects.map((project, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3 relative">
                                {resumeData.projects.length > 1 && (
                                    <button
                                        onClick={() => removeItem('projects', index)}
                                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                                <input
                                    type="text"
                                    placeholder="Project Title"
                                    value={project.title}
                                    onChange={(e) => updateField('projects', index, 'title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <textarea
                                    placeholder="Project description..."
                                    value={project.description}
                                    onChange={(e) => updateField('projects', index, 'description', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Project Link (optional)"
                                    value={project.link}
                                    onChange={(e) => updateField('projects', index, 'link', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => addItem('projects')}
                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </button>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    const ResumePreview = () => {
        const currentTheme = themes[colorTheme];

        return (
            <div
                className="bg-white shadow-2xl rounded-lg overflow-hidden"
                style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                    fontFamily: fontFamily,
                    fontSize: fontSize === 'small' ? '0.875rem' : fontSize === 'large' ? '1.125rem' : '1rem'
                }}
            >
                <div className="p-8 space-y-6 relative">
                    {showWatermark && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <span className="text-6xl font-bold rotate-[-45deg]">CONFIDENTIAL</span>
                        </div>
                    )}

                    {layout === 'two-column' ? (
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-1 space-y-6">
                                <div>
                                    <h1 className="text-2xl font-bold" style={{ color: currentTheme.primary }}>
                                        {resumeData.personal.name || 'Your Name'}
                                    </h1>
                                    <div className="text-sm text-gray-600 space-y-1 mt-2">
                                        {resumeData.personal.email && <div>{resumeData.personal.email}</div>}
                                        {resumeData.personal.phone && <div>{resumeData.personal.phone}</div>}
                                        {resumeData.personal.location && <div>{resumeData.personal.location}</div>}
                                        {resumeData.personal.linkedin && <div>{resumeData.personal.linkedin}</div>}
                                    </div>
                                </div>

                                {resumeData.skills.some(s => s.name) && (
                                    <div>
                                        <h2 className="text-lg font-bold mb-3" style={{ color: currentTheme.text }}>Skills</h2>
                                        <div className="space-y-2">
                                            {resumeData.skills.filter(s => s.name).map((skill, i) => (
                                                <div key={i}>
                                                    <div className="text-sm font-medium">{skill.name}</div>
                                                    <div className="flex gap-1 mt-1">
                                                        {[...Array(5)].map((_, j) => (
                                                            <div
                                                                key={j}
                                                                className={`w-3 h-3 rounded-full ${j < skill.rating ? 'bg-blue-500' : 'bg-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {resumeData.education.some(e => e.degree) && (
                                    <div>
                                        <h2 className="text-lg font-bold mb-3" style={{ color: currentTheme.text }}>Education</h2>
                                        <div className="space-y-3">
                                            {resumeData.education.filter(e => e.degree).map((edu, i) => (
                                                <div key={i} className="text-sm">
                                                    <div className="font-semibold">{edu.degree}</div>
                                                    <div className="text-gray-600">{edu.school}</div>
                                                    <div className="text-gray-500 text-xs">{edu.year}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-span-2 space-y-6">
                                {resumeData.summary && (
                                    <div>
                                        <h2 className="text-lg font-bold mb-2" style={{ color: currentTheme.text }}>Professional Summary</h2>
                                        <p className="text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
                                    </div>
                                )}

                                {resumeData.experience.some(e => e.role) && (
                                    <div>
                                        <h2 className="text-lg font-bold mb-3" style={{ color: currentTheme.text }}>Experience</h2>
                                        <div className="space-y-4">
                                            {resumeData.experience.filter(e => e.role).map((exp, i) => (
                                                <div key={i}>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-semibold">{exp.role}</h3>
                                                            <div className="text-sm" style={{ color: currentTheme.secondary }}>{exp.company}</div>
                                                        </div>
                                                        <div className="text-sm text-gray-500">{exp.duration}</div>
                                                    </div>
                                                    {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
                                                    {exp.achievements && (
                                                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                                                            {exp.achievements.split('\n').filter(a => a.trim()).map((achievement, j) => (
                                                                <li key={j} className="flex gap-2">
                                                                    <span>•</span>
                                                                    <span>{achievement}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {resumeData.projects.some(p => p.title) && (
                                    <div>
                                        <h2 className="text-lg font-bold mb-3" style={{ color: currentTheme.text }}>Projects</h2>
                                        <div className="space-y-3">
                                            {resumeData.projects.filter(p => p.title).map((project, i) => (
                                                <div key={i}>
                                                    <h3 className="font-semibold text-sm">{project.title}</h3>
                                                    {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
                                                    {project.link && <a href={project.link} className="text-xs text-blue-600 mt-1 block">{project.link}</a>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold" style={{ color: currentTheme.primary }}>
                                    {resumeData.personal.name || 'Your Name'}
                                </h1>
                                <div className="text-sm text-gray-600 mt-2 flex flex-wrap justify-center gap-3">
                                    {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                                    {resumeData.personal.phone && <span>•</span>}
                                    {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                                    {resumeData.personal.location && <span>•</span>}
                                    {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                                </div>
                            </div>

                            {resumeData.summary && (
                                <div>
                                    <h2 className="text-lg font-bold mb-2 pb-2 border-b-2" style={{ borderColor: currentTheme.primary }}>
                                        Professional Summary
                                    </h2>
                                    <p className="text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
                                </div>
                            )}

                            {resumeData.experience.some(e => e.role) && (
                                <div>
                                    <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentTheme.primary }}>
                                        Experience
                                    </h2>
                                    <div className="space-y-4">
                                        {resumeData.experience.filter(e => e.role).map((exp, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold">{exp.role}</h3>
                                                        <div className="text-sm" style={{ color: currentTheme.secondary }}>{exp.company}</div>
                                                    </div>
                                                    <div className="text-sm text-gray-500">{exp.duration}</div>
                                                </div>
                                                {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
                                                {exp.achievements && (
                                                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                                                        {exp.achievements.split('\n').filter(a => a.trim()).map((achievement, j) => (
                                                            <li key={j} className="flex gap-2">
                                                                <span>•</span>
                                                                <span>{achievement}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {resumeData.education.some(e => e.degree) && (
                                <div>
                                    <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentTheme.primary }}>
                                        Education
                                    </h2>
                                    <div className="space-y-3">
                                        {resumeData.education.filter(e => e.degree).map((edu, i) => (
                                            <div key={i} className="flex justify-between">
                                                <div>
                                                    <div className="font-semibold">{edu.degree}</div>
                                                    <div className="text-sm text-gray-600">{edu.school}</div>
                                                </div>
                                                <div className="text-sm text-gray-500">{edu.year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {resumeData.skills.some(s => s.name) && (
                                <div>
                                    <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentTheme.primary }}>
                                        Skills
                                    </h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {resumeData.skills.filter(s => s.name).map((skill, i) => (
                                            <div key={i}>
                                                <div className="text-sm font-medium">{skill.name}</div>
                                                <div className="flex gap-1 mt-1">
                                                    {[...Array(5)].map((_, j) => (
                                                        <div
                                                            key={j}
                                                            className={`w-3 h-3 rounded-full ${j < skill.rating ? 'bg-blue-500' : 'bg-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {resumeData.projects.some(p => p.title) && (
                                <div>
                                    <h2 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ borderColor: currentTheme.primary }}>
                                        Projects
                                    </h2>
                                    <div className="space-y-3">
                                        {resumeData.projects.filter(p => p.title).map((project, i) => (
                                            <div key={i}>
                                                <h3 className="font-semibold text-sm">{project.title}</h3>
                                                {project.description && <p className="text-sm text-gray-700 mt-1">{project.description}</p>}
                                                {project.link && <a href={project.link} className="text-xs text-blue-600 mt-1 block">{project.link}</a>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Resume Builder
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                            <span className="text-sm font-medium text-blue-700">Progress:</span>
                            <span className="text-sm font-bold text-blue-900">{calculateProgress()}%</span>
                        </div>
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="md:hidden p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            {showPreview ? <X className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Panel - Form Builder */}
                    <motion.div
                        className={`${showPreview ? 'hidden md:block' : 'block'} w-full md:w-2/5 space-y-6`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Tab Navigation */}
                        <div className="bg-white rounded-xl shadow-lg p-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {tabs.map((tab, index) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTab(index)}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${activeTab === index
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="text-xs font-medium hidden sm:inline">{tab.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">{tabs[activeTab].name}</h2>
                            <AnimatePresence mode="wait">
                                {renderFormSection()}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-3">
                            {activeTab > 0 && (
                                <button
                                    onClick={() => setActiveTab(activeTab - 1)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </button>
                            )}
                            {activeTab < tabs.length - 1 && (
                                <button
                                    onClick={() => setActiveTab(activeTab + 1)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all ml-auto"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Panel - Preview */}
                    <motion.div
                        className={`${showPreview ? 'block' : 'hidden md:block'} w-full md:w-3/5 space-y-4`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Customization Controls */}
                        <div className="bg-white rounded-xl shadow-lg p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-gray-700 block mb-1">Template</label>
                                    <select
                                        value={template}
                                        onChange={(e) => setTemplate(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {templates.map(t => (
                                            <option key={t} value={t.toLowerCase()}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-700 block mb-1">Font</label>
                                    <select
                                        value={fontFamily}
                                        onChange={(e) => setFontFamily(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {fonts.map(f => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-700 block mb-1">Theme</label>
                                    <select
                                        value={colorTheme}
                                        onChange={(e) => setColorTheme(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="blue">Blue</option>
                                        <option value="black">Black & White</option>
                                        <option value="pastel">Pastel</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-700 block mb-1">Layout</label>
                                    <select
                                        value={layout}
                                        onChange={(e) => setLayout(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="two-column">Two Column</option>
                                        <option value="single-column">Single Column</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setZoom(Math.max(50, zoom - 10))}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <ZoomOut className="w-4 h-4" />
                                    </button>
                                    <span className="text-sm font-medium text-gray-700">{zoom}%</span>
                                    <button
                                        onClick={() => setZoom(Math.min(150, zoom + 10))}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <ZoomIn className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Font Size:</label>
                                    <select
                                        value={fontSize}
                                        onChange={(e) => setFontSize(e.target.value)}
                                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                                    >
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer ml-auto">
                                    <input
                                        type="checkbox"
                                        checked={showWatermark}
                                        onChange={(e) => setShowWatermark(e.target.checked)}
                                        className="rounded"
                                    />
                                    <span className="text-sm text-gray-700">Watermark</span>
                                </label>
                            </div>
                        </div>

                        {/* Resume Preview */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg p-6 overflow-auto max-h-[800px]">
                            <ResumePreview />
                        </div>

                        <div className="text-center text-sm text-gray-600 italic">
                            ✨ A great resume opens great doors! ✨
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={saveProgress}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                    >
                        <Save className="w-4 h-4" />
                        <span className="text-sm font-medium">Save Progress</span>
                    </button>

                    <button
                        onClick={exportToPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download PDF</span>
                    </button>

                    <button
                        onClick={exportToDOCX}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download DOCX</span>
                    </button>

                    <button
                        onClick={shareResume}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Share Link</span>
                    </button>

                    <button
                        onClick={() => setShowResetModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="text-sm font-medium">Reset</span>
                    </button>
                </div>
            </div>

            {/* Reset Confirmation Modal */}
            <AnimatePresence>
                {showResetModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowResetModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Reset Resume?</h3>
                            <p className="text-gray-600 mb-6">
                                This will delete all your progress and cannot be undone. Are you sure you want to continue?
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowResetModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={resetForm}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Reset Everything
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeBuilderDashboard