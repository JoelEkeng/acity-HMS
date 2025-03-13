import Typography from '@mui/joy/Typography';
import Image from 'next/image';

const date = new Date();
const year = date.getFullYear();

export default function Footer() {
    return (
        <footer className='border-t border-red-600'>
            <div className='flex flex-col items-start justify-center gap-y-12 pt-2 lg:flex-row lg:items-center lg:py-4'>
            <Image src="/logo.png" alt="logo" width={200} height={200} />
            <div className="flex flex-col items-center gap-2">
                <Typography fontFamily={"inherit"} level='body-md' variant='plain' sx={{maxWidth: 300}}>ACityHost</Typography>
                <p className="text-center ">Your no.1 Hostel Management System</p>
            </div>
            </div>
            <div className='flex flex-col items-center pb-12 pt-8  md:justify-between md:pt-6'>
                <Typography fontFamily={"inherit"} level='body-lg' variant='plain'>Academic City University, Agbogba &copy; {year}</Typography>
            </div>
        </footer>
    )
}
