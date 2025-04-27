import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, UserRoundPlus } from 'lucide-react';



const links = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Contact Us',
        href: '/contact'
    }
];

const accounts = [
    {
        name: 'Login',
        href: '/login',
        icon: <ArrowRight />
    },
    {
        name: 'Register',
        href: '/register',
        icon: <UserRoundPlus />
    }
]

export const Header: React.FC = () => {
    return (
        <div className='flex justify-evenly items-center p-4 '>
            <Image src="/logo.png" alt="logo" width={150} height={150} />
            <div className='flex justify-between items-center space-x-8 rounded-full p-4 shadow-2xl font-semibold'>
                {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className='flex justify-between items-center space-x-4  font-semibold' >
                {accounts.map((account) => (
                    <Link key={account.href} href={account.href} className='rounded-full p-4 shadow-2xl flex gap-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>
                        {account.name} {account.icon}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Header;