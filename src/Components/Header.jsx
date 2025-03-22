import React from 'react';

const Header = () => {
    return (
        <header className='text-white z-20 relative flex justify-between items-center px-8 '>
            <h1 className='text-2xl font-bold'>3D Circle</h1>
            <nav>
                <ul className='flex gap-6'>
                    <li><a href="#home" className='hover:text-gray-300 transition-colors'>Home</a></li>
                    <li><a href="#about" className='hover:text-gray-300 transition-colors'>About</a></li>
                    <li><a href="#contact" className='hover:text-gray-300 transition-colors'>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
