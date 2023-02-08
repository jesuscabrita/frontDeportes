import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AiOutlineVerticalRight as ArrowP, AiOutlineVerticalLeft as ArrowN } from "react-icons/ai";

const featuredImages = [
    "https://images6.alphacoders.com/550/550393.jpg",
    "https://media.istockphoto.com/id/1364342125/es/foto/vista-a%C3%A9rea-del-estadio-de-f%C3%BAtbol-estadio-de-f%C3%BAtbol-diurno-vista-a%C3%A9rea-del-estadio-de.jpg?b=1&s=170667a&w=0&k=20&c=5wC7etw6l8L-dr0KYUBP1jss-3YHKFXTgw6kqIXmdKs=",
    "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80",
];

let count = 0;
let slideInterval;

const Carousel = () => {
    const handleOnNextClick = () => {
        count = (count + 1) % featuredImages.length;
        setCurrentIndex(count);
    };

    const handleOnPrevClick = () => {
        const productsLength = featuredImages.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        startSlider();
        slideRef.current.addEventListener("animationend", removeAnimation);
        slideRef.current.addEventListener("mouseenter", pauseSlider);
        slideRef.current.addEventListener("mouseleave", startSlider);

        return () => {
            clearInterval(slideInterval);
        };
    }, []);

    const startSlider = () => {
        slideInterval = setInterval(() => {
            handleOnNextClick();
        }, 3000);
    };

    const slideRef: any = useRef();

    const removeAnimation = () => {
        slideRef.current.classList.remove("fade-anim");
    };

    const pauseSlider = () => {
        clearInterval(slideInterval);
    };

    return (
        <Grid sx={{maxWidth:'800px'}}>
            <Grid sx={{userSelect:'none', position:'relative'}} ref={slideRef}>  
                <Grid sx={{
                    background:'linear-gradient(0deg,#3b5956 0%, rgba(33,46,54,0)100%)',
                    position:'absolute',
                    top:0,
                    height:'400px', 
                    width:'800px',
                    }}>
                </Grid>
                <img 
                    src={featuredImages[currentIndex]} 
                    alt="..." 
                    style={{
                        height:'400px', 
                        width:'900px',
                        
                        }}/>
                <Grid sx={{
                    position:'absolute',
                    width:'100%',
                    top:'50%',
                    padding:'12px',
                    display:'flex',
                    justifyContent:'space-between',
                    }}>
                    <Grid
                        onClick={handleOnPrevClick}
                        sx={{
                            background:'black',
                            color:'white',
                            padding:'4px',
                            borderRadius:'9999px',
                            opacity:'0.5',
                            cursor:'pointer',
                            '&:hover':{opacity:'1'}
                        }}>
                        <ArrowP size={35} />
                    </Grid>
                    <Grid
                        onClick={handleOnNextClick}
                        sx={{
                            background:'black',
                            color:'white',
                            padding:'4px',
                            borderRadius:'9999px',
                            opacity:'0.5',
                            cursor:'pointer',
                            '&:hover':{opacity:'1'}
                        }}>
                        <ArrowN size={35} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Carousel;