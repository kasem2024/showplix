
import { templates } from '@/component/templates';
import Link from 'next/link';
import React from 'react'
type TemplateNames =  "classic" | "modern" | "minimal";
 

const   TemplateLiveDemo= ({params}:{params:{template:TemplateNames}}) => {
     
  const validTemplates: TemplateNames[] = ["classic", "modern", "minimal"];

  if (!validTemplates.includes(params.template as TemplateNames)) {
    return <div className='w-screen h-screen flex justify-center items-center'>
      <p className='text-base md:text-lg lg:text-xl xl:text-2xl text-neutral-700'>There is no template with this name.</p>
    </div>;
  }
   const TemplateComponent = templates[params.template]; // fallback to classic
 
   return <div>
    <div className='fixed top-6 right-12'><Link href={`/templates/edit/${params.template}`} className='p-2 bg-blue-500 rounded-sm text-white'>Edit</Link>

    </div>
           <TemplateComponent  title="Jane Doe"
                bio="Hi! I am a passionate full-stack developer with 5 years of experience..."
                projects={[
                  {  image: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',name: "Project Alpha", description: "An innovative app for ...", link: "https://alpha.example.com" },
                  { image:"https://images.unsplash.com/photo-1659540805961-e80e2f20d72d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxVdW9XSXk2OWlqY3x8ZW58MHx8fHx8", name: "Beta Blog", description: "A personal blog platform..." },
                ]}
                skills={[
                  { name: "JavaScript", icon: "skill1" },
                  { name: "React", icon: "kill2" },
                  { name: "Node.js", icon: "kill3" },
                ]}
                contacts={[{
                  type: "jane@example.com",
                  value: "kasem2023mohareb@gmail.com",
                  link:''
                }]}
                template="classic"/>;
   </div>
}

export default TemplateLiveDemo