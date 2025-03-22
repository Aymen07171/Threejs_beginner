import React, { useEffect, useRef } from 'react'
import ThreeScene from './Threescene'
import gsap from 'gsap'

const ContainerScene = () => {
    const h1Ref = useRef(null);

    useEffect(() => {
        // Animation Timeline
        const tl = gsap.timeline({ defaults: { duration: 1.5 } });
        
        tl.fromTo(h1Ref.current,
            { 
                y: 100,
                opacity: 0
            },
            { 
                y: 0,
                opacity: 1,
                ease: "elastic.out(1, 0.3)",
                delay: 1 // Délai pour laisser le temps à la sphère de s'animer
            }
        );
    }, []);

    return (
        <div>
            <ThreeScene />
            <h1 
                ref={h1Ref}
                className='text-white z-10 absolute font-bold text-5xl left-[50%] top-[85%] -translate-x-1/2 -translate-y-1/2 opacity-0'
            >
                Give it a spin ...
            </h1>
        </div>
    )
}

export default ContainerScene