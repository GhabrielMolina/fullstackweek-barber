<<<<<<< HEAD
<<<<<<< HEAD

import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";
=======
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
=======
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f

interface BarbershopsPagePros {
  searchParams: {
    search?: string;
  }
}

// Essa função é chamada toda vez que a página é acessada
// Pelo campo de pesquisa no seguinte link 'http://localhost:3000/barbershops?search=vintage'

<<<<<<< HEAD
<<<<<<< HEAD
const BarbershopsPage = async ({ searchParams }: BarbershopsPagePros) => {
  if (!searchParams.search) {
    return redirect("/"); // Redireciona para a página inicial caso não tenha nada no campo de pesquisa
  }

=======
const BarbershopsPage = async ({searchParams} : BarbershopsPagePros) => {
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
=======
const BarbershopsPage = async ({searchParams} : BarbershopsPagePros) => {
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
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

<<<<<<< HEAD
<<<<<<< HEAD
      <div className="px-5 py-6 flex flex-col gap-6">
        <Search defaultValues={{
          search: searchParams.search,
        }}/>

        <h1 className="text-gray-400 text-xs font-bold uppercase">Resultados para "{searchParams.search}"</h1>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map(barbershop => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
=======
=======
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
      <div className="px-5 py-6">
        <h1 className="text-gray-400 text-xs font-bold uppercase">Resultados para "{searchParams.search}"</h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map(barbershop => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem  barbershop={barbershop} />
            </div>
          ))}  
<<<<<<< HEAD
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
=======
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
        </div>
      </div>
    </>
  )
}
<<<<<<< HEAD
<<<<<<< HEAD

=======
 
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
=======
 
>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
export default BarbershopsPage;