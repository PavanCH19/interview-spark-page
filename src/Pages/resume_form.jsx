// import React, { useState, useEffect } from 'react';
// import {
//     User, Mail, Phone, MapPin, Briefcase, GraduationCap,
//     Plus, X, Save, Edit3, RotateCcw, Search, CheckCircle, AlertCircle,
//     Calendar, Building, GripVertical, Trash2, Loader
// } from 'lucide-react';
// import axios from "axios"
// import { Notification } from '../components/Notifications';

// const API_BASE = 'http://localhost:3000/api/auth';



// const EditableProfile = ({ onComplete }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [notification, setNotification] = useState(null);
//     const [searchSkill, setSearchSkill] = useState('');
//     const [draggedIndex, setDraggedIndex] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     // Single source of truth for all data
//     const [data, setData] = useState({
//         profile: { name: '', email: '', phone: '', location: '' },
//         skills: [],
//         education: [],
//         experience: []
//     });

//     const [errors, setErrors] = useState({});

//     const availableSkills = [
//         'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++',
//         'SQL', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular', 'Django',
//         'Flask', 'Express', 'AWS', 'Docker', 'Kubernetes', 'Git',
//         'HTML', 'CSS', 'TailwindCSS', 'Bootstrap', 'REST API', 'GraphQL'
//     ];

//     // Fetch user data on mount
//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const getAuthHeader = () => ({
//         Authorization: localStorage.getItem('token'),
//     });

//     const fetchUserData = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`${API_BASE}/getUserDetails`, {
//                 headers: getAuthHeader(),
//             });

//             const userData = response.data.data;
//             setData(userData);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             showNotification('Failed to load profile', 'error');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const showNotification = (message, type = 'info') => {
//         setNotification({ message, type });
//     };

//     const validateProfile = () => {
//         const newErrors = {};

//         if (!data.profile.name?.trim()) newErrors.name = 'Name is required';
//         if (!data.profile.email?.trim()) newErrors.email = 'Email is required';
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.profile.email)) {
//             newErrors.email = 'Invalid email format';
//         }

//         data.experience.forEach((exp, idx) => {
//             if (!exp.role?.trim()) newErrors[`exp_role_${idx}`] = 'Role is required';
//             if (!exp.company?.trim()) newErrors[`exp_company_${idx}`] = 'Company is required';
//             if (!exp.startDate) newErrors[`exp_start_${idx}`] = 'Start date is required';
//         });

//         data.education.forEach((edu, idx) => {
//             if (!edu.degree?.trim()) newErrors[`edu_degree_${idx}`] = 'Degree is required';
//             if (!edu.college?.trim()) newErrors[`edu_college_${idx}`] = 'College is required';
//         });

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSave = async () => {
//         if (!validateProfile()) {
//             showNotification('Please fix all errors before saving', 'error');
//             return;
//         }

//         setIsSaving(true);
//         try {
//             await axios.post(`${API_BASE}/updateUserDetails`, data, {
//                 headers: getAuthHeader(),
//             });

//             showNotification('Profile saved successfully!', 'success');
//             setIsEditing(false);
//         } catch (error) {
//             console.error('Error saving profile:', error);
//             showNotification('Failed to save profile', 'error');
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleReset = () => {
//         fetchUserData();
//         setIsEditing(false);
//         setErrors({});
//         showNotification('Profile reset to original values', 'success');
//     };

//     const handleNext = () => {
//         if (!validateProfile()) {
//             showNotification('Please complete your profile before proceeding', 'error');
//             return;
//         }
//         onComplete();
//     };

//     // Update helpers with data structure
//     const updateProfile = (field, value) => {
//         setData(prev => ({
//             ...prev,
//             profile: { ...prev.profile, [field]: value }
//         }));
//     };

//     const addSkill = (skill) => {
//         if (skill && !data.skills.includes(skill)) {
//             setData(prev => ({
//                 ...prev,
//                 skills: [...prev.skills, skill]
//             }));
//             setSearchSkill('');
//         }
//     };

//     const removeSkill = (skillToRemove) => {
//         setData(prev => ({
//             ...prev,
//             skills: prev.skills.filter(s => s !== skillToRemove)
//         }));
//     };

//     const addEducation = () => {
//         setData(prev => ({
//             ...prev,
//             education: [...prev.education, {
//                 id: Date.now(),
//                 degree: '',
//                 college: '',
//                 startYear: '',
//                 endYear: ''
//             }]
//         }));
//     };

//     const updateEducation = (id, field, value) => {
//         setData(prev => ({
//             ...prev,
//             education: prev.education.map(e =>
//                 e.id === id ? { ...e, [field]: value } : e
//             )
//         }));
//     };

//     const removeEducation = (id) => {
//         setData(prev => ({
//             ...prev,
//             education: prev.education.filter(e => e.id !== id)
//         }));
//     };

//     const addExperience = () => {
//         setData(prev => ({
//             ...prev,
//             experience: [...prev.experience, {
//                 id: Date.now(),
//                 role: '',
//                 company: '',
//                 startDate: '',
//                 endDate: '',
//                 current: false
//             }]
//         }));
//     };

//     const updateExperience = (id, field, value) => {
//         setData(prev => ({
//             ...prev,
//             experience: prev.experience.map(e =>
//                 e.id === id ? { ...e, [field]: value } : e
//             )
//         }));
//     };

//     const removeExperience = (id) => {
//         setData(prev => ({
//             ...prev,
//             experience: prev.experience.filter(e => e.id !== id)
//         }));
//     };

//     const handleDragStart = (index) => setDraggedIndex(index);

//     const handleDragOver = (e, index) => {
//         e.preventDefault();
//         if (draggedIndex === null || draggedIndex === index) return;

//         setData(prev => {
//             const newExp = [...prev.experience];
//             const draggedItem = newExp[draggedIndex];
//             newExp.splice(draggedIndex, 1);
//             newExp.splice(index, 0, draggedItem);
//             return { ...prev, experience: newExp };
//         });
//         setDraggedIndex(index);
//     };

//     const handleDragEnd = () => setDraggedIndex(null);

//     const filteredSkills = availableSkills.filter(
//         skill =>
//             !data.skills.includes(skill) &&
//             skill.toLowerCase().includes(searchSkill.toLowerCase())
//     );

//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//                 <div className="flex flex-col items-center gap-4">
//                     <Loader className="w-8 h-8 animate-spin text-blue-600" />
//                     <p className="text-gray-600">Loading your profile...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
//             {/* Notification */}
//             {notification && (
//                 <Notification
//                     message={notification.message}
//                     type={notification.type}
//                     onClose={() => setNotification(null)}
//                 />
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
//                                         onClick={handleNext}
//                                         disabled={isSaving}
//                                         className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
//                                     >
//                                         Next
//                                     </button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <button
//                                         onClick={handleReset}
//                                         disabled={isSaving}
//                                         className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
//                                     >
//                                         <RotateCcw className="w-5 h-5" />
//                                         Reset
//                                     </button>
//                                     <button
//                                         onClick={handleSave}
//                                         disabled={isSaving}
//                                         className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
//                                     >
//                                         {isSaving ? (
//                                             <>
//                                                 <Loader className="w-5 h-5 animate-spin" />
//                                                 Saving...
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Save className="w-5 h-5" />
//                                                 Save
//                                             </>
//                                         )}
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Basic Info Section */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//                         <User className="w-6 h-6 text-blue-600" />
//                         Basic Information
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {['name', 'email', 'phone', 'location'].map(field => (
//                             <div key={field}>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
//                                 <input
//                                     type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
//                                     disabled={!isEditing}
//                                     value={data.profile[field]}
//                                     onChange={(e) => updateProfile(field, e.target.value)}
//                                     className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'
//                                         } ${errors[field] ? 'border-red-500' : ''}`}
//                                 />
//                                 {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
//                             </div>
//                         ))}
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
//                         {data.skills.map((skill, index) => (
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

//                 {/* Education Section */}
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
//                         {data.education.length === 0 ? (
//                             <p className="text-gray-500">No education information added yet.</p>
//                         ) : (
//                             data.education.map((edu, index) => (
//                                 <div key={edu.id} className="relative pl-8 border-l-4 border-green-300 animate-fade-in">
//                                     <div className="absolute -left-2.5 top-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
//                                     <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                             {['degree', 'college'].map(field => (
//                                                 <div key={field}>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
//                                                     <input
//                                                         type="text"
//                                                         disabled={!isEditing}
//                                                         value={edu[field]}
//                                                         onChange={(e) => updateEducation(edu.id, field, e.target.value)}
//                                                         className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                             } ${errors[`edu_${field}_${index}`] ? 'border-red-500' : ''}`}
//                                                     />
//                                                     {errors[`edu_${field}_${index}`] && (
//                                                         <p className="text-red-500 text-sm mt-1">{errors[`edu_${field}_${index}`]}</p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div className="flex items-center gap-4">
//                                             {['startYear', 'endYear'].map(field => (
//                                                 <div key={field} className="flex-1">
//                                                     <label className="block text-sm font-medium text-gray-700 mb-2">{field === 'startYear' ? 'Start Year' : 'End Year'}</label>
//                                                     <input
//                                                         type="text"
//                                                         disabled={!isEditing}
//                                                         value={edu[field]}
//                                                         onChange={(e) => updateEducation(edu.id, field, e.target.value)}
//                                                         className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300"
//                                                     />
//                                                 </div>
//                                             ))}
//                                             {isEditing && (
//                                                 <button
//                                                     onClick={() => removeEducation(edu.id)}
//                                                     className="mt-6 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
//                                                 >
//                                                     <Trash2 className="w-5 h-5" />
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
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
//                         {data.experience.length === 0 ? (
//                             <p className="text-gray-500">No experience information added yet.</p>
//                         ) : (
//                             data.experience.map((exp, index) => (
//                                 <div
//                                     key={exp.id}
//                                     draggable={isEditing}
//                                     onDragStart={() => handleDragStart(index)}
//                                     onDragOver={(e) => handleDragOver(e, index)}
//                                     onDragEnd={handleDragEnd}
//                                     className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 ${isEditing ? 'cursor-move' : ''
//                                         } ${draggedIndex === index ? 'opacity-50' : ''}`}
//                                 >
//                                     <div className="flex items-start gap-4">
//                                         {isEditing && <GripVertical className="w-5 h-5 text-gray-400 mt-2" />}
//                                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//                                             {['role', 'company'].map(field => (
//                                                 <div key={field}>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
//                                                     <input
//                                                         type="text"
//                                                         disabled={!isEditing}
//                                                         value={exp[field]}
//                                                         onChange={(e) => updateExperience(exp.id, field, e.target.value)}
//                                                         className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                             } ${errors[`exp_${field}_${index}`] ? 'border-red-500' : ''}`}
//                                                     />
//                                                     {errors[`exp_${field}_${index}`] && (
//                                                         <p className="text-red-500 text-sm mt-1">{errors[`exp_${field}_${index}`]}</p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                             {['startDate', 'endDate'].map(field => (
//                                                 <div key={field}>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-2">{field === 'startDate' ? 'Start Date' : 'End Date'}</label>
//                                                     <input
//                                                         type="month"
//                                                         disabled={!isEditing || (field === 'endDate' && exp.current)}
//                                                         value={exp[field]}
//                                                         onChange={(e) => updateExperience(exp.id, field, e.target.value)}
//                                                         className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing && !(field === 'endDate' && exp.current) ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'
//                                                             } ${errors[`exp_${field}_${index}`] ? 'border-red-500' : ''}`}
//                                                     />
//                                                     {errors[`exp_${field}_${index}`] && (
//                                                         <p className="text-red-500 text-sm mt-1">{errors[`exp_${field}_${index}`]}</p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                             {isEditing && (
//                                                 <div className="md:col-span-2 flex items-center gap-2">
//                                                     <input
//                                                         type="checkbox"
//                                                         id={`current-${exp.id}`}
//                                                         checked={exp.current}
//                                                         onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
//                                                         className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
//                                                     />
//                                                     <label htmlFor={`current-${exp.id}`} className="text-sm font-medium text-gray-700">
//                                                         I currently work here
//                                                     </label>
//                                                 </div>
//                                             )}
//                                         </div>
//                                         {isEditing && (
//                                             <button
//                                                 onClick={() => removeExperience(exp.id)}
//                                                 className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
//                                             >
//                                                 <Trash2 className="w-5 h-5" />
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//                 @keyframes slide-in {
//                     from { transform: translateX(100%); opacity: 0; }
//                     to { transform: translateX(0); opacity: 1; }
//                 }
//                 .animate-slide-in { animation: slide-in 0.3s ease-out; }
//                 @keyframes fade-in {
//                     from { opacity: 0; transform: translateY(-10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fade-in { animation: fade-in 0.3s ease-out; }
//             `}</style>
//         </div>
//     );
// };

// export default EditableProfile;


import React, { useState, useEffect } from 'react';
import {
    User, Mail, Phone, MapPin, Briefcase, GraduationCap,
    Plus, X, Save, Edit3, RotateCcw, Search, CheckCircle, AlertCircle,
    Calendar, Building, GripVertical, Trash2, Loader, Code, ExternalLink
} from 'lucide-react';
import axios from "axios"
import { Notification } from '../components/Notifications';

const API_BASE = 'http://localhost:3000/api/auth';

const EditableProfile = ({ onComplete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [notification, setNotification] = useState(null);
    const [searchSkill, setSearchSkill] = useState('');
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState({
        profile: { name: '', email: '', phone: '', location: '' },
        skills: [],
        education: [],
        experience: [],
        projects: []
    });

    const [errors, setErrors] = useState({});

    const availableSkills = [
        'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++',
        'SQL', 'MongoDB', 'TypeScript', 'Vue.js', 'Angular', 'Django',
        'Flask', 'Express', 'AWS', 'Docker', 'Kubernetes', 'Git',
        'HTML', 'CSS', 'TailwindCSS', 'Bootstrap', 'REST API', 'GraphQL'
    ];

    useEffect(() => {
        fetchUserData();
    }, []);

    const getAuthHeader = () => ({
        Authorization: localStorage.getItem('token'),
    });

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE}/getUserDetails`, {
                headers: getAuthHeader(),
            });
            const userData = response.data.data;
            // Ensure all arrays exist and are initialized properly
            setData({
                profile: userData?.profile || { name: '', email: '', phone: '', location: '' },
                skills: Array.isArray(userData?.skills) ? userData.skills : [],
                education: Array.isArray(userData?.education) ? userData.education : [],
                experience: Array.isArray(userData?.experience) ? userData.experience : [],
                projects: Array.isArray(userData?.projects) ? userData.projects : []
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            showNotification('Failed to load profile', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
    };

    const validateProfile = () => {
        const newErrors = {};

        if (!data.profile.name?.trim()) newErrors.name = 'Name is required';
        if (!data.profile.email?.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.profile.email)) {
            newErrors.email = 'Invalid email format';
        }

        data.experience.forEach((exp, idx) => {
            if (!exp.role?.trim()) newErrors[`exp_role_${idx}`] = 'Role is required';
            if (!exp.company?.trim()) newErrors[`exp_company_${idx}`] = 'Company is required';
            if (!exp.startDate) newErrors[`exp_start_${idx}`] = 'Start date is required';
        });

        data.education.forEach((edu, idx) => {
            if (!edu.degree?.trim()) newErrors[`edu_degree_${idx}`] = 'Degree is required';
            if (!edu.college?.trim()) newErrors[`edu_college_${idx}`] = 'College is required';
        });

        data.projects.forEach((proj, idx) => {
            if (!proj.title?.trim()) newErrors[`proj_title_${idx}`] = 'Project title is required';
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateProfile()) {
            showNotification('Please fix all errors before saving', 'error');
            return;
        }
        setIsSaving(true);
        try {
            await axios.post(`${API_BASE}/updateUserDetails`, data, {
                headers: getAuthHeader(),
            });
            showNotification('Profile saved successfully!', 'success');
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving profile:', error);
            showNotification('Failed to save profile', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        fetchUserData();
        setIsEditing(false);
        setErrors({});
        showNotification('Profile reset to original values', 'success');
    };

    const handleNext = () => {
        if (!validateProfile()) {
            showNotification('Please complete your profile before proceeding', 'error');
            return;
        }
        onComplete();
    };

    const updateProfile = (field, value) => {
        setData(prev => ({
            ...prev,
            profile: { ...prev.profile, [field]: value }
        }));
    };

    const addSkill = (skill) => {
        if (skill && !data.skills.includes(skill)) {
            setData(prev => ({
                ...prev,
                skills: [...prev.skills, skill]
            }));
            setSearchSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    };

    const addEducation = () => {
        setData(prev => ({
            ...prev,
            education: [...prev.education, {
                id: Date.now(),
                degree: '',
                college: '',
                startYear: '',
                endYear: ''
            }]
        }));
    };

    const updateEducation = (id, field, value) => {
        setData(prev => ({
            ...prev,
            education: prev.education.map(e =>
                e.id === id ? { ...e, [field]: value } : e
            )
        }));
    };

    const removeEducation = (id) => {
        setData(prev => ({
            ...prev,
            education: prev.education.filter(e => e.id !== id)
        }));
    };

    const addExperience = () => {
        setData(prev => ({
            ...prev,
            experience: [...prev.experience, {
                id: Date.now(),
                role: '',
                company: '',
                startDate: '',
                endDate: '',
                current: false
            }]
        }));
    };

    const updateExperience = (id, field, value) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(e =>
                e.id === id ? { ...e, [field]: value } : e
            )
        }));
    };

    const removeExperience = (id) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.filter(e => e.id !== id)
        }));
    };

    const addProject = () => {
        setData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                id: Date.now(),
                title: '',
                description: '',
                technologies: [],
                startDate: '',
                endDate: '',
                link: '',
                github: ''
            }]
        }));
    };

    const updateProject = (id, field, value) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(p =>
                p.id === id ? { ...p, [field]: value } : p
            )
        }));
    };

    const removeProject = (id) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.filter(p => p.id !== id)
        }));
    };

    const addProjectTech = (projectId, tech) => {
        if (tech?.trim()) {
            setData(prev => ({
                ...prev,
                projects: prev.projects.map(p =>
                    p.id === projectId ? {
                        ...p,
                        technologies: [...new Set([...p.technologies, tech])]
                    } : p
                )
            }));
        }
    };

    const removeProjectTech = (projectId, tech) => {
        setData(prev => ({
            ...prev,
            projects: prev.projects.map(p =>
                p.id === projectId ? {
                    ...p,
                    technologies: p.technologies.filter(t => t !== tech)
                } : p
            )
        }));
    };

    const handleDragStart = (index) => setDraggedIndex(index);

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        setData(prev => {
            const newExp = [...prev.experience];
            const draggedItem = newExp[draggedIndex];
            newExp.splice(draggedIndex, 1);
            newExp.splice(index, 0, draggedItem);
            return { ...prev, experience: newExp };
        });
        setDraggedIndex(index);
    };

    const handleDragEnd = () => setDraggedIndex(null);

    const filteredSkills = availableSkills.filter(
        skill =>
            !data.skills.includes(skill) &&
            skill.toLowerCase().includes(searchSkill.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
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
                                        onClick={handleNext}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleReset}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        Reset
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader className="w-5 h-5 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Save
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basic Info Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['name', 'email', 'phone', 'location'].map(field => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
                                <input
                                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                    disabled={!isEditing}
                                    value={data.profile[field]}
                                    onChange={(e) => updateProfile(field, e.target.value)}
                                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-gray-50 border-gray-200'} ${errors[field] ? 'border-red-500' : ''}`}
                                />
                                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                            </div>
                        ))}
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
                        {data.skills.map((skill, index) => (
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

                {/* Education Section */}
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
                        {data.education.length === 0 ? (
                            <p className="text-gray-500">No education information added yet.</p>
                        ) : (
                            data.education.map((edu, index) => (
                                <div key={edu.id} className="relative pl-8 border-l-4 border-green-300 animate-fade-in">
                                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            {['degree', 'college'].map(field => (
                                                <div key={field}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
                                                    <input
                                                        type="text"
                                                        disabled={!isEditing}
                                                        value={edu[field]}
                                                        onChange={(e) => updateEducation(edu.id, field, e.target.value)}
                                                        className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-green-500 focus:outline-none' : 'bg-white border-gray-200'} ${errors[`edu_${field}_${index}`] ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors[`edu_${field}_${index}`] && (
                                                        <p className="text-red-500 text-sm mt-1">{errors[`edu_${field}_${index}`]}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {['startYear', 'endYear'].map(field => (
                                                <div key={field} className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">{field === 'startYear' ? 'Start Year' : 'End Year'}</label>
                                                    <input
                                                        type="text"
                                                        disabled={!isEditing}
                                                        value={edu[field]}
                                                        onChange={(e) => updateEducation(edu.id, field, e.target.value)}
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-300"
                                                    />
                                                </div>
                                            ))}
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
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
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
                        {data.experience.length === 0 ? (
                            <p className="text-gray-500">No experience information added yet.</p>
                        ) : (
                            data.experience.map((exp, index) => (
                                <div
                                    key={exp.id}
                                    draggable={isEditing}
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 ${isEditing ? 'cursor-move' : ''} ${draggedIndex === index ? 'opacity-50' : ''}`}
                                >
                                    <div className="flex items-start gap-4">
                                        {isEditing && <GripVertical className="w-5 h-5 text-gray-400 mt-2" />}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {['role', 'company'].map(field => (
                                                <div key={field}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{field}</label>
                                                    <input
                                                        type="text"
                                                        disabled={!isEditing}
                                                        value={exp[field]}
                                                        onChange={(e) => updateExperience(exp.id, field, e.target.value)}
                                                        className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'} ${errors[`exp_${field}_${index}`] ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors[`exp_${field}_${index}`] && (
                                                        <p className="text-red-500 text-sm mt-1">{errors[`exp_${field}_${index}`]}</p>
                                                    )}
                                                </div>
                                            ))}
                                            {['startDate', 'endDate'].map(field => (
                                                <div key={field}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">{field === 'startDate' ? 'Start Date' : 'End Date'}</label>
                                                    <input
                                                        type="month"
                                                        disabled={!isEditing || (field === 'endDate' && exp.current)}
                                                        value={exp[field]}
                                                        onChange={(e) => updateExperience(exp.id, field, e.target.value)}
                                                        className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing && !(field === 'endDate' && exp.current) ? 'border-gray-300 focus:border-blue-500 focus:outline-none' : 'bg-white border-gray-200'} ${errors[`exp_${field}_${index}`] ? 'border-red-500' : ''}`}
                                                    />
                                                    {errors[`exp_${field}_${index}`] && (
                                                        <p className="text-red-500 text-sm mt-1">{errors[`exp_${field}_${index}`]}</p>
                                                    )}
                                                </div>
                                            ))}
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

                {/* Projects Section */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Code className="w-6 h-6 text-orange-600" />
                            Projects
                        </h2>
                        {isEditing && (
                            <button
                                onClick={addProject}
                                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300"
                            >
                                <Plus className="w-5 h-5" />
                                Add
                            </button>
                        )}
                    </div>

                    <div className="space-y-6">
                        {data.projects.length === 0 ? (
                            <p className="text-gray-500">No projects added yet.</p>
                        ) : (
                            data.projects.map((proj, index) => (
                                <div key={proj.id} className="relative pl-8 border-l-4 border-orange-300 animate-fade-in">
                                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-white"></div>
                                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                                        {/* Project Title */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                value={proj.title}
                                                onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                                                className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-orange-500 focus:outline-none' : 'bg-white border-gray-200'} ${errors[`proj_title_${index}`] ? 'border-red-500' : ''}`}
                                            />
                                            {errors[`proj_title_${index}`] && (
                                                <p className="text-red-500 text-sm mt-1">{errors[`proj_title_${index}`]}</p>
                                            )}
                                        </div>

                                        {/* Project Description */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                            <textarea
                                                disabled={!isEditing}
                                                value={proj.description}
                                                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                                                rows="3"
                                                className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 resize-none ${isEditing ? 'border-gray-300 focus:border-orange-500 focus:outline-none' : 'bg-white border-gray-200'}`}
                                                placeholder="Describe your project..."
                                            />
                                        </div>

                                        {/* Dates */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            {['startDate', 'endDate'].map(field => (
                                                <div key={field}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        {field === 'startDate' ? 'Start Date' : 'End Date'}
                                                    </label>
                                                    <input
                                                        type="month"
                                                        disabled={!isEditing}
                                                        value={proj[field]}
                                                        onChange={(e) => updateProject(proj.id, field, e.target.value)}
                                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-300"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            {['link', 'github'].map(field => (
                                                <div key={field}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                                        {field === 'link' ? 'Project Link' : 'GitHub URL'}
                                                    </label>
                                                    <input
                                                        type="url"
                                                        disabled={!isEditing}
                                                        value={proj[field]}
                                                        onChange={(e) => updateProject(proj.id, field, e.target.value)}
                                                        className={`w-full px-4 py-2 border-2 rounded-lg transition-all duration-300 ${isEditing ? 'border-gray-300 focus:border-orange-500 focus:outline-none' : 'bg-white border-gray-200'}`}
                                                        placeholder={field === 'link' ? 'https://example.com' : 'https://github.com/...'}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Technologies */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                                            {isEditing && (
                                                <div className="flex gap-2 mb-3">
                                                    <input
                                                        type="text"
                                                        id={`tech-input-${proj.id}`}
                                                        placeholder="Add technology..."
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                addProjectTech(proj.id, e.target.value);
                                                                e.target.value = '';
                                                            }
                                                        }}
                                                        className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-300"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            const input = document.getElementById(`tech-input-${proj.id}`);
                                                            addProjectTech(proj.id, input.value);
                                                            input.value = '';
                                                        }}
                                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
                                                    >
                                                        <Plus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-2">
                                                {proj.technologies.map((tech, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-200 to-amber-200 text-orange-700 rounded-full text-sm font-medium"
                                                    >
                                                        <span>{tech}</span>
                                                        {isEditing && (
                                                            <button
                                                                onClick={() => removeProjectTech(proj.id, tech)}
                                                                className="hover:text-orange-900"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-end gap-2">
                                            {proj.link && !isEditing && (
                                                <a
                                                    href={proj.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Visit
                                                </a>
                                            )}
                                            {proj.github && !isEditing && (
                                                <a
                                                    href={proj.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300"
                                                >
                                                    <Code className="w-4 h-4" />
                                                    GitHub
                                                </a>
                                            )}
                                            {isEditing && (
                                                <button
                                                    onClick={() => removeProject(proj.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
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
            </div>

            <style jsx>{`
                @keyframes slide-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in { animation: slide-in 0.3s ease-out; }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default EditableProfile;