import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Box } from "@mui/joy";
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { Feature } from "@/components/ui/Features";
import { TypewriterEffect } from "@/components/layout/TypingEffect";
import { HostelTypes } from "@/components/ui/HostelTypes";

export default function Home() {
  return (
    <Box>
    <div className="pb-20 gap-16 bg-[url(/BackgroundImage.jpg)] h-screen bg-cover bg-center bg-no-repeat mb-24 ">
       <Header />
      <main className="p-24 flex flex-col gap-8 row-start-2 justify-center items-center sm:items-start">
      <div className="mx-auto sm:text-left mt-24">
        <Typography fontFamily={"inherit"} color="danger" className="text-2xl font-semibold tracking-tighter md:text-3xl lg:text-5xl text-center mb-4">
          Welcome to <br/> ACity Hostel Management System
        </Typography>
        <TypewriterEffect />
      </div>
      <Button color="danger" href="/login" className="rounded-full px-4 py-2 xs:text-lg lg:text-2xl shadow-2xl flex gap-4 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 mx-auto">
        <Typography fontFamily={"inherit"} sx={{color: "white"}} >Get Started</Typography> 
      </Button>
      </main>
    </div>
    <Feature />
    <HostelTypes />
    <Footer />
    </Box>
  );
}


