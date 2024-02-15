// npx shadcn-ui@latest init
// Mover pastas para app e renomear
// Alterar tambem em components.json
// "components": "@/app/_components",
// "utils": "@/app/_lib/utils"


import Image from "next/image";
import Header from "../_components/header";

export default function Home() {
  return (
    <div>
      <Header />
    </div>
  );
}
