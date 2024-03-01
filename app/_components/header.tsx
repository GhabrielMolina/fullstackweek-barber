"use client"

import Image from 'next/image';
import { Card, CardContent } from "./ui/card";
// https://ui.shadcn.com/docs/components/card
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import SideMenu from './side-menu';
import Link from 'next/link';
// https://ui.shadcn.com/docs/components/button


// Digitar sfc para criar o molde de componente
const Header = () => {

    

    return ( 
        <Card>
            <CardContent className='p-5 flex flex-row justify-between items-center'>
                <Link href='/'>
                    <Image src='/logo.png' alt='FSW Barber' height={22} width={120} />
                </Link>
                                   
                <Sheet>
                {/**asChild == esse Button que vai ser o Trigger e abrir o Sheet */} 
                    <SheetTrigger asChild> 
                        <Button variant='outline' size='icon'>
                            <MenuIcon size={16} />
                        </Button> 
                    </SheetTrigger>

                    <SheetContent className='p-0'> 
                        <SideMenu />
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
     );
}

// https://ui.shadcn.com/docs/components/sheet
// npx shadcn-ui@latest add sheet


export default Header;