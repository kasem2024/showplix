
import { templates } from '@/component/templates';
import { apiClient } from '@/lib/apiClient';

export default async function PortfolioPage({ params }: { params: { username: string } }) {

  const {data:{result}} = await apiClient.get( `/api/portfolio/${params.username}`)
  console.log(result)
  if (!result) return <div>404</div>;

  const TemplateComponent = templates["classic"]; // fallback to classic

  return <TemplateComponent  title="Jane Doe"
  bio="Hi! I am a passionate full-stack developer with 5 years of experience..."
  projects={[
    {  image: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',name: "Project Alpha", description: "An innovative app for ...", link: "https://alpha.example.com" },
    { image:"https://images.unsplash.com/photo-1659540805961-e80e2f20d72d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxVdW9XSXk2OWlqY3x8ZW58MHx8fHx8", name: "Beta Blog", description: "A personal blog platform..." },
  ]}
  skills={[
    { name: "JavaScript", level: "Expert" },
    { name: "React", level: "Advanced" },
    { name: "Node.js", level: "Advanced" },
  ]}
  contact={{
    email: "jane@example.com",
    phone: "+1234567890",
    website: "https://janedoe.dev",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
  }}
  template="classic"/>;

}