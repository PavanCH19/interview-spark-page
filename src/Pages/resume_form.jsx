// import React, { useState } from 'react';
// import {
//     User, Mail, Phone, MapPin, Briefcase, GraduationCap,
//     Plus, X, Save, Edit3, RotateCcw, Search, CheckCircle,
//     Calendar, Building, GripVertical, Trash2
// } from 'lucide-react';

// const EditableProfile = ({ onComplete }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [showToast, setShowToast] = useState(false);
//     const [toastMessage, setToastMessage] = useState('');
//     const [searchSkill, setSearchSkill] = useState('');
//     const [draggedIndex, setDraggedIndex] = useState(null);

//     // Profile Data
//     const [profile, setProfile] = useState({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         phone: '+1 234 567 8900',
//         location: 'San Francisco, CA'
//     });

//     const [skills, setSkills] = useState([
//         'JavaScript', 'React', 'Node.js', 'Python', 'SQL'
//     ]);

//     const [education, setEducation] = useState([
//         {
//             id: 1,
//             degree: 'Bachelor of Computer Science',
//             college: 'Stanford University',
//             startYear: '2015',
//             endYear: '2019'
//         },
//         {
//             id: 2,
//             degree: 'Master of Software Engineering',
//             college: 'MIT',
//             startYear: '2019',
//             endYear: '2021'
//         }
//     ]);

//     const [experience, setExperience] = useState([
//         {
//             id: 1,
//             role: 'Senior Software Engineer',
//             company: 'Google',
//             startDate: '2021-01',
//             endDate: '2023-12',
//             current: false
//         },
//         {
//             id: 2,
//             role: 'Software Engineer',
//             company: 'Facebook',
//             startDate: '2023-01',
//             endDate: '',
//             current: true
//         }
//     ]);

//     const [errors, setErrors] = useState({});

//     // Available skills for autocomplete
//     const availableSkills = [
//         'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++',
//         'SQL', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular', 'Django',
//         'Flask', 'Express', 'AWS', 'Docker', 'Kubernetes', 'Git',
//         'HTML', 'CSS', 'TailwindCSS', 'Bootstrap', 'REST API', 'GraphQL'
//     ];

//     const filteredSkills = availableSkills.filter(
//         skill =>
//             !skills.includes(skill) &&
//             skill.toLowerCase().includes(searchSkill.toLowerCase())
//     );

//     // Validation
//     const validateProfile = () => {
//         const newErrors = {};

//         if (!profile.name.trim()) newErrors.name = 'Name is required';
//         if (!profile.email.trim()) newErrors.email = 'Email is required';
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
//             newErrors.email = 'Invalid email format';
//         }

//         experience.forEach((exp, idx) => {
//             if (!exp.role.trim()) newErrors[`exp_role_${idx}`] = 'Role is required';
//             if (!exp.company.trim()) newErrors[`exp_company_${idx}`] = 'Company is required';
//             if (!exp.startDate) newErrors[`exp_start_${idx}`] = 'Start date is required';
//         });

//         education.forEach((edu, idx) => {
//             if (!edu.degree.trim()) newErrors[`edu_degree_${idx}`] = 'Degree is required';
//             if (!edu.college.trim()) newErrors[`edu_college_${idx}`] = 'College is required';
//         });

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // Handlers
//     const handleSave = () => {
//         if (validateProfile()) {
//             setIsEditing(false);
//             showSuccessToast('Profile saved successfully!');
//         } else {
//             showSuccessToast('Please fix all errors before saving');
//         }
//     };

//     const handleReset = () => {
//         setProfile({
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//             phone: '+1 234 567 8900',
//             location: 'San Francisco, CA'
//         });
//         setErrors({});
//         showSuccessToast('Profile reset to original values');
//     };

//     const showSuccessToast = (message) => {
//         setToastMessage(message);
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);
//     };

//     // Skills handlers
//     const addSkill = (skill) => {
//         if (skill && !skills.includes(skill)) {
//             setSkills([...skills, skill]);
//             setSearchSkill('');
//         }
//     };

//     const removeSkill = (skillToRemove) => {
//         setSkills(skills.filter(s => s !== skillToRemove));
//     };

//     // Education handlers
//     const addEducation = () => {
//         setEducation([...education, {
//             id: Date.now(),
//             degree: '',
//             college: '',
//             startYear: '',
//             endYear: ''
//         }]);
//     };

//     const removeEducation = (id) => {
//         setEducation(education.filter(e => e.id !== id));
//     };

//     const updateEducation = (id, field, value) => {
//         setEducation(education.map(e =>
//             e.id === id ? { ...e, [field]: value } : e
//         ));
//     };

//     // Experience handlers
//     const addExperience = () => {
//         setExperience([...experience, {
//             id: Date.now(),
//             role: '',
//             company: '',
//             startDate: '',
//             endDate: '',
//             current: false
//         }]);
//     };

//     const removeExperience = (id) => {
//         setExperience(experience.filter(e => e.id !== id));
//     };

//     const updateExperience = (id, field, value) => {
//         setExperience(experience.map(e =>
//             e.id === id ? { ...e, [field]: value } : e
//         ));
//     };

//     // Drag and drop handlers
//     const handleDragStart = (index) => {
//         setDraggedIndex(index);
//     };

//     const handleDragOver = (e, index) => {
//         e.preventDefault();
//         if (draggedIndex === null || draggedIndex === index) return;

//         const newExperience = [...experience];
//         const draggedItem = newExperience[draggedIndex];
//         newExperience.splice(draggedIndex, 1);
//         newExperience.splice(index, 0, draggedItem);

//         setExperience(newExperience);
//         setDraggedIndex(index);
//     };

//     const handleDragEnd = () => {
//         setDraggedIndex(null);
//     };

//     return (
//         <div className="min-h-screen  from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
//             {/* Toast Notification */}
//             {showToast && (
//                 <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 bg-green-500 text-white rounded-xl shadow-2xl animate-slide-in">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">{toastMessage}</span>
//                 </div>
//             )}

//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         <div>
//                             <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Dashboard</h1>
//                             <p className="text-gray-600">Manage your professional information</p>
//                         </div>
//                         <div className="flex gap-3">
//                             {!isEditing ? (
//                                 <>
//                                     <button
//                                         onClick={() => setIsEditing(true)}
//                                         className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         <Edit3 className="w-5 h-5" />
//                                         Edit Profile
//                                     </button>

//                                     <button
//                                         onClick={onComplete} // define handleNext for navigation/step
//                                         className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         Next
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <button
//                                         onClick={handleReset}
//                                         className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
//                                     >
//                                         <RotateCcw className="w-5 h-5" />
//                                         Reset
//                                     </button>
//                                     <button
//                                         onClick={handleSave}
//                                         className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         <Save className="w-5 h-5" />
//                                         Save
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Basic Info */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//                         <User className="w-6 h-6 text-blue-600" />
//                         Basic Information
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                             <input
//                                 type="text"
//                                 disabled={!isEditing}
//                                 value={profile.name}
//                                 onChange={(e) => setProfile({ ...profile, name: e.target.value })}
//                                 className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
//                                     } ${errors.name ? 'border-red-500' : ''}`}
//                             />
//                             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                             <input
//                                 type="email"
//                                 disabled={!isEditing}
//                                 value={profile.email}
//                                 onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//                                 className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
//                                     } ${errors.email ? 'border-red-500' : ''}`}
//                             />
//                             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                             <input
//                                 type="tel"
//                                 disabled={!isEditing}
//                                 value={profile.phone}
//                                 onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
//                                 className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
//                                     }`}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
//                             <input
//                                 type="text"
//                                 disabled={!isEditing}
//                                 value={profile.location}
//                                 onChange={(e) => setProfile({ ...profile, location: e.target.value })}
//                                 className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
//                                     }`}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Skills Section */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//                         <Briefcase className="w-6 h-6 text-purple-600" />
//                         Skills
//                     </h2>

//                     {isEditing && (
//                         <div className="mb-6 relative">
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                 <input
//                                     type="text"
//                                     value={searchSkill}
//                                     onChange={(e) => setSearchSkill(e.target.value)}
//                                     onKeyPress={(e) => e.key === 'Enter' && addSkill(searchSkill)}
//                                     placeholder="Search and add skills..."
//                                     className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
//                                 />
//                             </div>
//                             {searchSkill && filteredSkills.length > 0 && (
//                                 <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
//                                     {filteredSkills.map((skill) => (
//                                         <button
//                                             key={skill}
//                                             onClick={() => addSkill(skill)}
//                                             className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
//                                         >
//                                             {skill}
//                                         </button>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     <div className="flex flex-wrap gap-3">
//                         {skills.map((skill, index) => (
//                             <div
//                                 key={index}
//                                 className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
//                             >
//                                 <span>{skill}</span>
//                                 {isEditing && (
//                                     <button
//                                         onClick={() => removeSkill(skill)}
//                                         className="w-5 h-5 flex items-center justify-center bg-purple-200 rounded-full hover:bg-purple-300 transition-colors duration-200"
//                                     >
//                                         <X className="w-3 h-3" />
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Education Timeline */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                             <GraduationCap className="w-6 h-6 text-green-600" />
//                             Education
//                         </h2>
//                         {isEditing && (
//                             <button
//                                 onClick={addEducation}
//                                 className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
//                             >
//                                 <Plus className="w-5 h-5" />
//                                 Add
//                             </button>
//                         )}
//                     </div>

//                     <div className="space-y-6">
//                         {education.map((edu, index) => (
//                             <div key={edu.id} className="relative pl-8 border-l-4 border-green-300 animate-fade-in">
//                                 <div className="absolute -left-2.5 top-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
//                                 <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
//                                             <input
//                                                 type="text"
//                                                 disabled={!isEditing}
//                                                 value={edu.degree}
//                                                 onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     } ${errors[`edu_degree_${index}`] ? 'border-red-500' : ''}`}
//                                             />
//                                             {errors[`edu_degree_${index}`] && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors[`edu_degree_${index}`]}</p>
//                                             )}
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">College/University</label>
//                                             <input
//                                                 type="text"
//                                                 disabled={!isEditing}
//                                                 value={edu.college}
//                                                 onChange={(e) => updateEducation(edu.id, 'college', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     } ${errors[`edu_college_${index}`] ? 'border-red-500' : ''}`}
//                                             />
//                                             {errors[`edu_college_${index}`] && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors[`edu_college_${index}`]}</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-4">
//                                         <div className="flex-1">
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
//                                             <input
//                                                 type="text"
//                                                 disabled={!isEditing}
//                                                 value={edu.startYear}
//                                                 onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     }`}
//                                             />
//                                         </div>
//                                         <div className="flex-1">
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
//                                             <input
//                                                 type="text"
//                                                 disabled={!isEditing}
//                                                 value={edu.endYear}
//                                                 onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     }`}
//                                             />
//                                         </div>
//                                         {isEditing && (
//                                             <button
//                                                 onClick={() => removeEducation(edu.id)}
//                                                 className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
//                                             >
//                                                 <Trash2 className="w-5 h-5" />
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Experience Section */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                             <Building className="w-6 h-6 text-blue-600" />
//                             Experience
//                         </h2>
//                         {isEditing && (
//                             <button
//                                 onClick={addExperience}
//                                 className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
//                             >
//                                 <Plus className="w-5 h-5" />
//                                 Add
//                             </button>
//                         )}
//                     </div>

//                     <div className="space-y-4">
//                         {experience.map((exp, index) => (
//                             <div
//                                 key={exp.id}
//                                 draggable={isEditing}
//                                 onDragStart={() => handleDragStart(index)}
//                                 onDragOver={(e) => handleDragOver(e, index)}
//                                 onDragEnd={handleDragEnd}
//                                 className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 ${isEditing ? 'cursor-move' : ''
//                                     } ${draggedIndex === index ? 'opacity-50' : ''}`}
//                             >
//                                 <div className="flex items-start gap-4">
//                                     {isEditing && (
//                                         <div className="pt-2">
//                                             <GripVertical className="w-5 h-5 text-gray-400" />
//                                         </div>
//                                     )}
//                                     <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
//                                             <input
//                                                 type="text"
//                                                 disabled={!isEditing}
//                                                 value={exp.role}
//                                                 onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     } ${errors[`exp_role_${index}`] ? 'border-red-500' : ''}`}
//                                             />
//                                             {errors[`exp_role_${index}`] && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors[`exp_role_${index}`]}</p>
//                                             )}
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
//                                             <input
//                                                 type="text"
//                                                 disabled={!isEditing}
//                                                 value={exp.company}
//                                                 onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     } ${errors[`exp_company_${index}`] ? 'border-red-500' : ''}`}
//                                             />
//                                             {errors[`exp_company_${index}`] && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors[`exp_company_${index}`]}</p>
//                                             )}
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
//                                             <input
//                                                 type="month"
//                                                 disabled={!isEditing}
//                                                 value={exp.startDate}
//                                                 onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     } ${errors[`exp_start_${index}`] ? 'border-red-500' : ''}`}
//                                             />
//                                             {errors[`exp_start_${index}`] && (
//                                                 <p className="text-red-500 text-sm mt-1">{errors[`exp_start_${index}`]}</p>
//                                             )}
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
//                                             <input
//                                                 type="month"
//                                                 disabled={!isEditing || exp.current}
//                                                 value={exp.endDate}
//                                                 onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
//                                                 className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing && !exp.current ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                     }`}
//                                             />
//                                         </div>
//                                         {isEditing && (
//                                             <div className="md:col-span-2 flex items-center gap-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     id={`current-${exp.id}`}
//                                                     checked={exp.current}
//                                                     onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
//                                                     className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                                                 />
//                                                 <label htmlFor={`current-${exp.id}`} className="text-sm font-medium text-gray-700">
//                                                     I currently work here
//                                                 </label>
//                                             </div>
//                                         )}
//                                     </div>
//                                     {isEditing && (
//                                         <button
//                                             onClick={() => removeExperience(exp.id)}
//                                             className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
//                                         >
//                                             <Trash2 className="w-5 h-5" />
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//         @keyframes slide-in {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }
//         .animate-slide-in {
//           animation: slide-in 0.3s ease-out;
//         }
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default EditableProfile;


import React, { useState } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase, GraduationCap,
    Plus, X, Save, Edit3, RotateCcw, Search, CheckCircle,
    Calendar, Building, GripVertical, Trash2
} from 'lucide-react';

const EditableProfile = ({ onComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [searchSkill, setSearchSkill] = useState('');
    const [draggedIndex, setDraggedIndex] = useState(null);

    // Initial data from JSON
    const initialData = {
        profile: {
            name: "PAVAN CHANDRAPPA HOTTIGOUDRA",
            email: "pavandvh27@gmail.com",
            phone: "+91 7483022523",
            location: ""
        },
        skills: [
            "aws", "bootstrap", "ci/cd", "express", "fastapi", "git", "java", "jwt", "lambda", "mongodb", "mysql", "node.js", "prototyping", "python", "rest api", "serverless"
        ],
        education: [],
        experience: []
    };

    // Profile Data
    const [profile, setProfile] = useState(initialData.profile);
    const [skills, setSkills] = useState(initialData.skills);
    const [education, setEducation] = useState(initialData.education);
    const [experience, setExperience] = useState(initialData.experience);
    const [errors, setErrors] = useState({});

    // Available skills for autocomplete
    const availableSkills = [
        'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++',
        'SQL', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular', 'Django',
        'Flask', 'Express', 'AWS', 'Docker', 'Kubernetes', 'Git',
        'HTML', 'CSS', 'TailwindCSS', 'Bootstrap', 'REST API', 'GraphQL'
    ];

    const filteredSkills = availableSkills.filter(
        skill =>
            !skills.includes(skill) &&
            skill.toLowerCase().includes(searchSkill.toLowerCase())
    );

    // Validation
    const validateProfile = () => {
        const newErrors = {};

        if (!profile.name.trim()) newErrors.name = 'Name is required';
        if (!profile.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
            newErrors.email = 'Invalid email format';
        }

        experience.forEach((exp, idx) => {
            if (!exp.role.trim()) newErrors[`exp_role_${idx}`] = 'Role is required';
            if (!exp.company.trim()) newErrors[`exp_company_${idx}`] = 'Company is required';
            if (!exp.startDate) newErrors[`exp_start_${idx}`] = 'Start date is required';
        });

        education.forEach((edu, idx) => {
            if (!edu.degree.trim()) newErrors[`edu_degree_${idx}`] = 'Degree is required';
            if (!edu.college.trim()) newErrors[`edu_college_${idx}`] = 'College is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handlers
    const handleSave = () => {
        if (validateProfile()) {
            setIsEditing(false);
            showSuccessToast('Profile saved successfully!');

            // Log updated data to console
            const updatedData = {
                profile,
                skills,
                education,
                experience
            };
            console.log('Updated Profile Data:', updatedData);
        } else {
            showSuccessToast('Please fix all errors before saving');
        }
    };

    const handleReset = () => {
        setProfile(initialData.profile);
        setSkills(initialData.skills);
        setEducation(initialData.education);
        setExperience(initialData.experience);
        setErrors({});
        showSuccessToast('Profile reset to original values');
    };

    const showSuccessToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Skills handlers
    const addSkill = (skill) => {
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill]);
            setSearchSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(s => s !== skillToRemove));
    };

    // Education handlers
    const addEducation = () => {
        setEducation([...education, {
            id: Date.now(),
            degree: '',
            college: '',
            startYear: '',
            endYear: ''
        }]);
    };

    const removeEducation = (id) => {
        setEducation(education.filter(e => e.id !== id));
    };

    const updateEducation = (id, field, value) => {
        setEducation(education.map(e =>
            e.id === id ? { ...e, [field]: value } : e
        ));
    };

    // Experience handlers
    const addExperience = () => {
        setExperience([...experience, {
            id: Date.now(),
            role: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false
        }]);
    };

    const removeExperience = (id) => {
        setExperience(experience.filter(e => e.id !== id));
    };

    const updateExperience = (id, field, value) => {
        setExperience(experience.map(e =>
            e.id === id ? { ...e, [field]: value } : e
        ));
    };

    // Drag and drop handlers
    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newExperience = [...experience];
        const draggedItem = newExperience[draggedIndex];
        newExperience.splice(draggedIndex, 1);
        newExperience.splice(index, 0, draggedItem);

        setExperience(newExperience);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 bg-green-500 text-white rounded-xl shadow-2xl animate-slide-in">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">{toastMessage}</span>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Dashboard</h1>
                            <p className="text-gray-600">Manage your professional information</p>
                        </div>
                        <div className="flex gap-3">
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                        Edit Profile
                                    </button>

                                    <button
                                        onClick={onComplete}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        Next
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Save className="w-5 h-5" />
                                        Save
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
                                    } ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                disabled={!isEditing}
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
                                    } ${errors.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                            <input
                                type="tel"
                                disabled={!isEditing}
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                        Skills
                    </h2>

                    {isEditing && (
                        <div className="mb-6 relative">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    value={searchSkill}
                                    onChange={(e) => setSearchSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addSkill(searchSkill)}
                                    placeholder="Search and add skills..."
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                                />
                            </div>
                            {searchSkill && filteredSkills.length > 0 && (
                                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                    {filteredSkills.map((skill) => (
                                        <button
                                            key={skill}
                                            onClick={() => addSkill(skill)}
                                            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                            >
                                <span>{skill}</span>
                                {isEditing && (
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        className="w-5 h-5 flex items-center justify-center bg-purple-200 rounded-full hover:bg-purple-300 transition-colors duration-200"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Timeline */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <GraduationCap className="w-6 h-6 text-green-600" />
                            Education
                        </h2>
                        {isEditing && (
                            <button
                                onClick={addEducation}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
                            >
                                <Plus className="w-5 h-5" />
                                Add
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {education.length === 0 ? (
                            <p className="text-gray-500">No education information added yet.</p>
                        ) : (
                            education.map((edu, index) => (
                                <div key={edu.id} className="relative pl-8 border-l-4 border-green-300 animate-fade-in">
                                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={edu.degree}
                                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        } ${errors[`edu_degree_${index}`] ? 'border-red-500' : ''}`}
                                                />
                                                {errors[`edu_degree_${index}`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`edu_degree_${index}`]}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">College/University</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={edu.college}
                                                    onChange={(e) => updateEducation(edu.id, 'college', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        } ${errors[`edu_college_${index}`] ? 'border-red-500' : ''}`}
                                                />
                                                {errors[`edu_college_${index}`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`edu_college_${index}`]}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={edu.startYear}
                                                    onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={edu.endYear}
                                                    onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                            {isEditing && (
                                                <button
                                                    onClick={() => removeEducation(edu.id)}
                                                    className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Building className="w-6 h-6 text-blue-600" />
                            Experience
                        </h2>
                        {isEditing && (
                            <button
                                onClick={addExperience}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
                            >
                                <Plus className="w-5 h-5" />
                                Add
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {experience.length === 0 ? (
                            <p className="text-gray-500">No experience information added yet.</p>
                        ) : (
                            experience.map((exp, index) => (
                                <div
                                    key={exp.id}
                                    draggable={isEditing}
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 ${isEditing ? 'cursor-move' : ''
                                        } ${draggedIndex === index ? 'opacity-50' : ''}`}
                                >
                                    <div className="flex items-start gap-4">
                                        {isEditing && (
                                            <div className="pt-2">
                                                <GripVertical className="w-5 h-5 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={exp.role}
                                                    onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        } ${errors[`exp_role_${index}`] ? 'border-red-500' : ''}`}
                                                />
                                                {errors[`exp_role_${index}`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`exp_role_${index}`]}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                                <input
                                                    type="text"
                                                    disabled={!isEditing}
                                                    value={exp.company}
                                                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        } ${errors[`exp_company_${index}`] ? 'border-red-500' : ''}`}
                                                />
                                                {errors[`exp_company_${index}`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`exp_company_${index}`]}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                                <input
                                                    type="month"
                                                    disabled={!isEditing}
                                                    value={exp.startDate}
                                                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        } ${errors[`exp_start_${index}`] ? 'border-red-500' : ''}`}
                                                />
                                                {errors[`exp_start_${index}`] && (
                                                    <p className="text-red-500 text-sm mt-1">{errors[`exp_start_${index}`]}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                                <input
                                                    type="month"
                                                    disabled={!isEditing || exp.current}
                                                    value={exp.endDate}
                                                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                                    className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing && !exp.current ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
                                                        }`}
                                                />
                                            </div>
                                            {isEditing && (
                                                <div className="md:col-span-2 flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`current-${exp.id}`}
                                                        checked={exp.current}
                                                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <label htmlFor={`current-${exp.id}`} className="text-sm font-medium text-gray-700">
                                                        I currently work here
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                        {isEditing && (
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default EditableProfile;