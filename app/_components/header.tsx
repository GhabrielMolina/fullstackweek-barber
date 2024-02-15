import Image from 'next/image';
import { Card, CardContent } from "./ui/card";
// https://ui.shadcn.com/docs/components/card
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
// https://ui.shadcn.com/docs/components/button


// Digitar sfc para criar o molde de componente
const Header = () => {
    return ( 
        <Card>
            <CardContent className='p-5 flex flex-row justify-between items-center'>
                <Image src='/logo.png' alt='FSW Barber' height={22} width={120} />
                <Button variant='outline' size='icon' className='h-6 w-8'>
                    <MenuIcon size={16}/>
                </Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;