// 'use client';

// import { useState, useEffect, use } from 'react';
// import { useRouter } from 'next/navigation';
// import { div } from 'framer-motion/client';
// import Link from 'next/link';

// type Project = {
//   name: string;
//   description: string;
// };

// type PortfolioForm = {
//   title: string;
//   bio: string;
//   projects: Project[];

//   userId?: string; 
// };

// type TemplateNames = 'classic' | 'modern' | 'minimal';

// export default function EditPortfolioForm({ params }: { params: Promise<{ portfolioId: string }> }) {
//   const router = useRouter();
//   const { portfolioId } = use(params); 
//   const [userId, setUserId] = useState<string | null>(null); 
//   const [form, setForm] = useState<PortfolioForm>({
//     title: '',
//     bio: '',
//     projects: [{ name: '', description: '' }], 
//   });
//   const [userName , setUserName] = useState('')
//   const [loading, setLoading] = useState(false);
 
//  console.log("from template page.tsx",userId)

//   useEffect(() => {
//     async function fetchPortfolio() {
//       try {
//         const res = await fetch(`/api/portfolio/${userName}/${portfolioId}`);
//         const {result} = await res.json();
//         console.log("data from update" , result[0])
//        if (res.ok) {
//         const safeProjects = Array.isArray(result[0].projects) ? result[0].projects : [{ name: '', description: '' }];
//         setForm({
//           title: result[0].title || '',
//           bio: result[0].bio || '',
//           projects: safeProjects,
        
//           userId: result[0].userId || userId, // optional
//         });
//       }
//       } catch (error) {
//         console.error('Error loading portfolio:', error);
//       }
//     }

//     if(userName){
//       fetchPortfolio();
//     }
//   }, [userName]);
//   useEffect(() => {
//       const fetchUser = async () => {
//         const res = await fetch('/api/auth/loginuser');
//         if (res.ok) {
//           const data = await res.json();
//           setUserId(data?.user?.id);
//           setUserName(data.user?.username)
//         }
//       };
//       fetchUser();
//     }, []);


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//   const handleProjectChange = (index: number, field: keyof Project, value: string) => {
//     const updated = [...form.projects];
//     updated[index][field] = value;
//     setForm({ ...form, projects: updated });
//   };
//   const addProject = () => {
//     setForm({ ...form, projects: [...form?.projects, { name: '', description: '' }] });
//   };
//   const removeProject = (index: number) => {
//     const updated = form.projects.filter((_, i) => i !== index);
//     setForm({ ...form, projects: updated });
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     if (!userId) {
//       alert('User not authenticated');
//       return;
//     }
//     const res = await fetch('/api/portfolio', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ ...form, portfolioId   }),
//     })

//     setLoading(false);

//     if (res.ok) {
//       router.push(`/${userName}/${portfolioId}`);
//     } else {
//       alert('Failed to save. Please try again.');
//     }
//   };



//   return (
//    <div>
//      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Update Your Portfolio</h1>

//       <input
//         name="title"
//         value={form.title || ''}
//         onChange={handleChange}
//         placeholder="Title"
//         className="w-full border p-2 rounded"
//       />

//       <textarea
//         name="bio"
//         value={form.bio || ''}
//         onChange={handleChange}
//         placeholder="Bio"
//         className="w-full border p-2 rounded"
//         rows={4}
//       />

//       <div>
//         <label className="block font-semibold mb-1">Projects</label>
//         {form?.projects?.map((project, i) => (
//           <div key={i} className="mb-3 space-y-2 border p-3 rounded bg-gray-50">
//             <input
//               type="text"
//               placeholder="Project Name"
//               value={project?.name || ''}
//               onChange={(e) => handleProjectChange(i, 'name', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             <textarea
//               placeholder="Project Description"
//               value={project?.description || ''}
//               onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
//               className="w-full p-2 border rounded"
//             />
//             <button
//               type="button"
//               onClick={() => removeProject(i)}
//               className="text-sm text-red-600 hover:underline"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addProject}
//           className="text-blue-600 hover:underline text-sm mt-2"
//         >
//           + Add Project
//         </button>
//       </div>

//     <div className='flex justify-between items-center'>
//         <button
//         type="submit"
//         disabled={loading}
//         className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//       >
//         {loading ? 'Saving...' : 'publish your portfolio'}
//       </button>
//     </div>
//     </form>

//    </div>
//   );
// }
'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

type Project = {
  name: string;
  description: string;
  image?: string;
};

type Skill = {
  name: string;
  icon: string;
};

type Contact = {
  type: string;
  value: string;
  link:string
};

type PortfolioForm = {
  title: string;
  bio: string;
  projects: Project[];
  skills: Skill[];
  contacts: Contact[];
  template: string;
  userId?: string;
};

// type TemplateNames = 'classic' | 'modern' | 'minimal';

export default function EditPortfolioForm({ params }: { params: Promise<{ portfolioId: string }> }) {
  const router = useRouter();
  const { portfolioId } = use(params);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<PortfolioForm>({
    title: '',
    bio: '',
    projects: [{ name: '', description: '', image: '' }],
    skills: [],
    contacts: [],
    template: 'classic',
  });

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`${process.env.BASE_URL}/api/auth/loginuser`);
      if (res.ok) {
        const data = await res.json();
        setUserId(data?.user?.id);
        setUserName(data.user?.username);
      }
    };
    fetchUser();
  }, []);

  // Load existing portfolio
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!username || !portfolioId) return;

      try {
        const res = await fetch(`${process.env.BASE_URL}/api/portfolio/${username}/${portfolioId}`);
        const { result } = await res.json();
        const data = result[0];
        setForm({
          title: data.title || '',
          bio: data.bio || '',
          projects: Array.isArray(data.projects) ? data.projects : [{ name: '', description: '', image: '' }],
          skills: data.skills || [],
          contacts: data.contacts || [],
          template: data.template || 'classic',
          userId: data.userId || userId,
        });
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    };

    fetchPortfolio();
  }, [username, portfolioId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await res.json();
      if (data.url) {
        const updated = [...form.projects];
        updated[index].image = data.url;
        setForm({ ...form, projects: updated });
      }
    };

    reader.readAsDataURL(file);
  };

  const addProject = () => setForm({ ...form, projects: [...form.projects, { name: '', description: '', image: '' }] });
  const removeProject = (i: number) => setForm({ ...form, projects: form.projects.filter((_, idx) => idx !== i) });

  const handleSkillChange = (i: number, field: keyof Skill, value: string) => {
    const updated = [...form.skills];
    updated[i][field] = value;
    console.log("from handleSkillChange" , updated)
    setForm({ ...form, skills: updated });
  };
  const addSkill = () => setForm({ ...form, skills: [...form.skills, { name: '', icon: '' }] });

  const handleContactChange = (i: number, field: keyof Contact, value: string) => {
    const updated = [...form.contacts];
    updated[i][field] = value;
    setForm({ ...form, contacts: updated });
  };
  const addContact = () => setForm({ ...form, contacts: [...form.contacts, { type: '', value: '' ,link:'' }] });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${process.env.BASE_URL}/api/portfolio`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, portfolioId }),
    });

    setLoading(false);

    if (res.ok) {
      router.push(`/${username}/${portfolioId}`);
    } else {
      alert('Failed to update. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Update Your Portfolio</h1>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full border p-2 rounded"
          rows={4}
        />

        {/* PROJECTS */}
        <div>
          <label className="block font-semibold mb-1">Projects</label>
          {form.projects.map((project, i) => (
            <div key={i} className="mb-4 space-y-2 border p-3 rounded bg-gray-50">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => handleProjectChange(i, 'name', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} />
              {project.image && <img src={project.image} className="w-32 h-32 object-cover mt-2" />}
              <button onClick={() => removeProject(i)} className="text-red-600 text-sm hover:underline" type="button">
                Remove
              </button>
            </div>
          ))}
          <button onClick={addProject} className="text-blue-600 hover:underline text-sm" type="button">
            + Add Project
          </button>
        </div>

        {/* SKILLS */}
        <div>
          <label className="block font-semibold mb-1">Skills</label>
          {form.skills.map((skill, i) => (
            <div key={i} className="flex space-x-2 items-center mb-2">
              <input
                type="text"
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) => handleSkillChange(i, 'name', e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <select
                value={skill.icon}
                onChange={(e) => handleSkillChange(i, 'icon', e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">Select Icon</option>
                {Array.from({ length: 6 }).map((_, index) => (
                  <option key={index} value={`skill${index + 1}.png`}>
                    skill{index + 1}.png
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button onClick={addSkill} className="text-blue-600 hover:underline text-sm" type="button">
            + Add Skill
          </button>
        </div>

        {/* CONTACTS */}
        <div>
          <label className="block font-semibold mb-1">Contacts</label>
          {form.contacts.map((contact, i) => (
            <div key={i} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Type (e.g. Email)"
                value={contact.type}
                onChange={(e) => handleContactChange(i, 'type', e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Value"
                value={contact.value}
                onChange={(e) => handleContactChange(i, 'value', e.target.value)}
                className="flex-1 p-2 border rounded"
              />
                 <input
                type="text"
                placeholder="Link"
                value={contact.link}
                onChange={(e) => handleContactChange(i, 'link', e.target.value)}
                className="flex-1 p-2 border rounded"
              />
            </div>
          ))}
          <button onClick={addContact} className="text-blue-600 hover:underline text-sm" type="button">
            + Add Contact
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {loading ? 'Saving...' : 'Update Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
}
