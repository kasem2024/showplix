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
  skills: Skill[];
  contacts: Contact[];
  bio: string;
  projects: Project[];
  template: string;
  userId?: string;
};

type TemplateNames = 'classic' | 'modern' | 'minimal';

export default function EditPortfolioForm({ params }: { params: Promise<{ template: TemplateNames }> }) {
  const router = useRouter();
  const { template } = use(params);
  const [userId, setUserId] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioForm>({
    title: '',
    bio: '',
    projects: [{ name: '', description: '', image: '' }],
    skills: [],
    contacts: [],
    template: template || 'classic',
  });
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updated = [...form.projects];
    updated[index][field] = value;
    setForm({ ...form, projects: updated });
  };

const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result;

    const res = await fetch(`${process.env.BASE_URL}/api/upload`, {
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
  const addProject = () => {
    setForm({ ...form, projects: [...form.projects, { name: '', description: '', image: '' }] });
  };

  const removeProject = (index: number) => {
    const updated = form.projects.filter((_, i) => i !== index);
    setForm({ ...form, projects: updated });
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
    const updated = [...form.skills];
    updated[index][field] = value;
    setForm({ ...form, skills: updated });
  };

  const addSkill = () => {
    setForm({ ...form, skills: [...form.skills, { name: '', icon: '' }] });
  };

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const updated = [...form.contacts];
    updated[index][field] = value;
    setForm({ ...form, contacts: updated });
  };

  const addContact = () => {
    setForm({ ...form, contacts: [...form.contacts, { type: '', value: '' ,link:'' }] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!userId) {
      alert('User not authenticated');
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, userId }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/templates/myportfolio');
    } else {
      alert('Failed to save. Please try again.');
    }
  };
  console.log(form , username)
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Build Your Portfolio</h1>

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
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, i)}
                className="w-full"
              />
              {project.image && (
                <img src={project.image} alt="Project" className="w-32 h-32 object-cover mt-2" />
              )}
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
                     <div>  skill{index + 1}.png</div>
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="button" onClick={addSkill} className="text-blue-600 hover:underline text-sm">
            + Add Skill
          </button>
        </div>

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
          <button type="button" onClick={addContact} className="text-blue-600 hover:underline text-sm">
            + Add Contact
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            {loading ? 'Saving...' : 'Publish Your Portfolio'}
          </button>
        </div>
      </form>
    </div>
  );
}
