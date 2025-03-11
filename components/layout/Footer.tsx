import Typography from '@mui/joy/Typography';

const date = new Date();
const year = date.getFullYear();

export default function Footer() {
    return (
        <footer>
            <div className='flex justify-center items-center p-4 text-black'>
                <Typography level='title-lg' variant='plain'>Academic City University, Agbogba &copy; {year}</Typography>
                </div>
        </footer>
    )
}