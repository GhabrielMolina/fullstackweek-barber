import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopsPagePros {
  searchParams: {
    search?: string;
  }
}

// Essa função é chamada toda vez que a página é acessada
// Pelo campo de pesquisa no seguinte link 'http://localhost:3000/barbershops?search=vintage'

const BarbershopsPage = async ({searchParams} : BarbershopsPagePros) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-gray-400 text-xs font-bold uppercase">Resultados para "{searchParams.search}"</h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map(barbershop => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem  barbershop={barbershop} />
            </div>
          ))}  
        </div>
      </div>
    </>
  )
}
 
export default BarbershopsPage;