// Componente que da para interagir

// npx shadcn-ui@latest add input

// https://ui.shadcn.com/docs/components/form
// npx shadcn-ui@latest add form
"use client";

import { Button } from "@/app/_components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
<<<<<<< HEAD

import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z.string({ required_error: "Campo Obrigatório." }).trim().min(1, "Campo Obrigatório."),
})

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>;
}

const Search = ({defaultValues} : SearchProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busque por uma barbearia..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
}

=======

import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z.string({ required_error: "Campo Obrigatório." }).trim().min(1, "Campo Obrigatório."),
})

const Search = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`);
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busque por uma barbearia..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="default" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
}

>>>>>>> 64afae752fdb92dbc4ce6e5a45fb8d574eddb05f
export default Search;