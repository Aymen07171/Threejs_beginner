import React from 'react'
import ThreeScene from './Threescene'

const ContainerScene = () => {
    return (
        <div>
            <ThreeScene />
            <h1 className='text-white z-10 absolute font-bold text-5xl left-[50%] top-[85%] -translate-x-1/2 -translate-y-1/2'>
                Give it a spin
            </h1>
        </div>
    )
}

export default ContainerScene
