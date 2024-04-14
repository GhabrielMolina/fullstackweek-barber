
import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";

interface BarbershopsPagePros {
  searchParams: {
    search?: string;
  }
}

// Essa função é chamada toda vez que a página é acessada
// Pelo campo de pesquisa no seguinte link 'http://localhost:3000/barbershops?search=vintage'

const BarbershopsPage = async ({ searchParams }: BarbershopsPagePros) => {
  if (!searchParams.search) {
    return redirect("/"); // Redireciona para a página inicial caso não tenha nada no campo de pesquisa
  }

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

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{
          search: searchParams.search,
        }}/>

        <h1 className="text-gray-400 text-xs font-bold uppercase">Resultados para &quot;{searchParams.search}&quot;</h1>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map(barbershop => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage;