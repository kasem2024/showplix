'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { div } from 'framer-motion/client';
import Link from 'next/link';

type Project = {
  name: string;
  description: string;
};

type PortfolioForm = {
  title: string;
  bio: string;
  projects: Project[];
  template: string;
  userId?: string; // ✅ Add this line
};

type TemplateNames = 'classic' | 'modern' | 'minimal';

export default function EditPortfolioForm({ params }: { params: Promise<{ template: TemplateNames }> }) {
  const router = useRouter();
  const { template } = use(params); // ✅ unwrap params
  const [userId, setUserId] = useState<string | null>(null); 
  const [form, setForm] = useState<PortfolioForm>({
    title: '',
    bio: '',
    projects: [{ name: '', description: '' }],
    template: template || 'classic', // ✅ initialize from param
  });
  const [username , setUserName] = useState('')
  const [loading, setLoading] = useState(false);
 
 console.log("from template page.tsx",userId)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
       if (res.ok) {
        const safeProjects = Array.isArray(data.projects) ? data.projects : [{ name: '', description: '' }];
        setForm({
          title: data.title || '',
          bio: data.bio || '',
          projects: safeProjects,
          template: data.template || 'classic',
          userId: data.userId || userId, // optional
        });
      }
      } catch (error) {
        console.error('Error loading portfolio:', error);
      }
    }

    fetchPortfolio();
  }, []);
  useEffect(() => {
      const fetchUser = async () => {
        const res = await fetch('/api/auth/loginuser');
        if (res.ok) {
          const data = await res.json();
          setUserId(data?.user?.id);
          setUserName(data.user?.username)
        }
      };
      fetchUser();
    }, []);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };
  const addProject = () => {
    setForm({ ...form, projects: [...form?.projects, { name: '', description: '' }] });
  };
  const removeProject = (index: number) => {
    const updated = form.projects.filter((_, i) => i !== index);
    setForm({ ...form, projects: updated });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!userId) {
      alert('User not authenticated');
      return;
    }
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, userId }),
    })

    setLoading(false);

    if (res.ok) {
      router.push(`/${username}`);
    } else {
      alert('Failed to save. Please try again.');
    }
  };
console.log("here is the username " , username)
console.log(form.projects)

  return (
   <div>
     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Portfolio</h1>

      <input
        name="title"
        value={form.title || ''}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="bio"
        value={form.bio || ''}
        onChange={handleChange}
        placeholder="Bio"
        className="w-full border p-2 rounded"
        rows={4}
      />

      <div>
        <label className="block font-semibold mb-1">Projects</label>
        {form?.projects?.map((project, i) => (
          <div key={i} className="mb-3 space-y-2 border p-3 rounded bg-gray-50">
            <input
              type="text"
              placeholder="Project Name"
              value={project?.name || ''}
              onChange={(e) => handleProjectChange(i, 'name', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Project Description"
              value={project?.description || ''}
              onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => removeProject(i)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProject}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          + Add Project
        </button>
      </div>

      <div>
        <label className="block font-semibold mb-1">Template</label>
        <select
          name="template"
          value={form?.template}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="minimal">Minimal</option>
        </select>
      </div>

    <div className='flex justify-between items-center'>
        <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {loading ? 'Saving...' : 'publish your portfolio'}
      </button>
    </div>
    </form>

   </div>
  );
}
