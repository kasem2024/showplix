
import { templates } from '@/component/templates';
import { apiClient } from '@/lib/apiClient';

export default async function PortfolioPage({ params }: { params: { username: string , portfolioId:string } }) {
  const {username , portfolioId} = params
  const {data:{result}} = await apiClient.get( `/api/portfolio/${username}/${portfolioId}`)
  console.log(result)
  if (!result) return <div>404</div>;
  console.log(result[0] , "herer eerererer")
  const TemplateComponent = templates["classic"]; // fallback to classic

  return <TemplateComponent template={result[0]?.template} title={result[0]?.title} bio={result[0]?.bio} projects={result[0]?.projects} skills={result[0]?.skills} contact={result[0]?.contact}  />;

}