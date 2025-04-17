import Typography from '@mui/joy/Typography';

const date = new Date();
const year = date.getFullYear();

export default function Footer() {
    return (
        <footer className='border-t border-red-600'>
            <div className='flex flex-col items-center pb-12 pt-8  md:justify-between md:pt-6'>
                <Typography fontFamily={"inherit"} level='body-lg' variant='plain'>Academic City University, Agbogba &copy; {year}</Typography>
            </div>
        </footer>
    )
}
