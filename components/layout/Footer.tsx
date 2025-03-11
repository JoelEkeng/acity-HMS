import Typography from '@mui/joy/Typography';
import Image from 'next/image';

const date = new Date();
const year = date.getFullYear();

export default function Footer() {
    return (
        <footer className='bg-black p-4 text-white'>
            <div className='flex justify-around items-center text-center'>
            <Image src="/logo.png" alt="logo" width={200} height={200} />
            <Typography fontFamily={"inherit"} level='body-lg' variant='plain' sx={{maxWidth: 300, color:"white"}}>At Academic City University student well being is our priority on and off campus</Typography>
            </div>
            <div className='flex justify-center items-center p-4 text-black'>
                <Typography fontFamily={"inherit"} level='title-lg' variant='plain' sx={{color: "white"}}>Academic City University, Agbogba &copy; {year}</Typography>
            </div>
        </footer>
    )
}