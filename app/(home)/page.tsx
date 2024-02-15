// npx shadcn-ui@latest init
// Mover pastas para app e renomear
// Alterar tambem em components.json
// "components": "@/app/_components",
// "utils": "@/app/_lib/utils"


//npm i date-fns
//https://date-fns.org/v3.3.1/docs/format
import { format } from 'date-fns'
import Header from "../_components/header";
import { ptBR } from 'date-fns/locale/pt-BR';
import Search from './_components/search';

export default function Home() {
  return (
    <div>
      <Header />

      <div className='px-5 pt-5'>
        <h2 className='text-xl font-bold'>Olá, Miguel</h2>
        <p className='capitalize text-sm'>
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      <div className='px-5 mt-6'>
        <Search />
      </div>
    </div>
  );
}
