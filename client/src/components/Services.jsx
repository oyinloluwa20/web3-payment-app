import React from 'react';
import {BsShieldFillCheck} from 'react-icons/bs'
import {BiSearchAlt} from 'react-icons/bi'
import {RiHeart2Fill} from 'react-icons/ri'

const ServiceCard =({color,title,icon,subtitle})=>{
    <div className='flex flex-row justify-start items-center whte-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl' >
            <div className={`w-10 h-10 rounded-full justify-center items-center ${color}`}>
                {icon}
            </div>
            <div className='ml-5 flex-1 flex flex-col'>
                <h1 className='text-white text-lg mt-2'>{title}</h1>
                <p className='text-white text-sm mt-2 md:w-9/12'>{subtitle}</p>
            </div>
    </div>

}

const Services = () => {
  return(
    <div className='flex md:flex-row flex-col w-full justify-center items-center gradient-bg-services' >
    <div className='flex mf:flex-row flex-col justify-between items-center md:p-20 py-12 px-4' >
    <div className='flex-1 flex flex-col justify-start items-start' >
        <h1 className='text-white text-3xl sm:text-5xl text-gradient py-2 '>
            Services that we<br/>
            contiune to improve
        </h1>
    </div>
    </div>
    <div className='flex-1 flex flex-col justify-start items-start' >
        <ServiceCard
            color='bg-[#2952E3]'
            title='Security Guaranteed'
            icon={<BsShieldFillCheck fontSize={21} className='=text-white'/>}
            subtitle='Security is guaranted. We always maintain privacy and mainting the quality of our product'

        />
        <ServiceCard
            color='bg-[#8945F8]'
            title='Best exchange rates'
            icon={<BiSearchAlt fontSize={21} className='=text-white'/>}
            subtitle='Security is guaranted. We always maintain privacy and mainting the quality of our product'

        />
        <ServiceCard
            color='bg-[#F84550]'
            title='Fastest transactions'
            icon={<RiHeart2Fill fontSize={21} className='=text-white'/>}
            subtitle='Security is guaranted. We always maintain privacy and mainting the quality of our product'

        />
    </div>
    </div>
  );
}

export default Services;
