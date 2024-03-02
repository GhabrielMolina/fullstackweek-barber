import { db } from "@/app/_lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // Função que executa quando chama useSession()
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as {
        id: string;
        name: string;
        email: string;
        image: string;
      }
      return session
    },
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


// Para autenticar pelo GoogleProvider
// npm install next-auth   https://next-auth.js.org/getting-started/example
// /app/api/auth/[...nextauth]/route.ts Criar essa pasta    https://next-auth.js.org/configuration/initialization#route-handlers-app
// npm install @prisma/client @auth/prisma-adapter     https://authjs.dev/reference/adapter/prisma?_gl=1*1h59wcc*_gcl_au*ODMwMjc2NTkuMTcwODEzMjY5Ng..
// Desta mesma página copiar codigo para o schema.prisma
// Fazer uma migration npx prisma migrate dev --name add_user_tables

// Acessar https://console.cloud.google.com/
// Criar um projeto
// ir em APIs e serviços > Credenciais
// Criar Credenciais > Id do Cliente OAuth
// Configurar tela de Consentimento > Externo > Criar
//  Em Credenciais Criar Credenciais > Id do Cliente OAuth > Aplicativo da Web
// Origens JavaScript autorizadas > http://localhost:3000
// URIs de redirecionamento autorizados > Colocar da documentação do nextAuth.js (https://next-auth.js.org/providers/google
// Colocar http://localhost:3000/api/auth/callback/google
// Copiar Id Do Cliente / Chave secreta do cliente > colocar no .env

// Codar arquivo route.ts no mesmo modelo
// Criar pasta /app/_providers/auth.tsx e codar no mesmo modelo