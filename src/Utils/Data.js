import {MdOutlineDashboardCustomize,MdDashboard} from 'react-icons/md'
import {FaUserAlt,FaUserCog} from 'react-icons/fa'
import {AiTwotoneShop,AiFillSetting} from 'react-icons/ai'
import {SiLogstash} from 'react-icons/si'
import {BiLogOut} from 'react-icons/bi'
import {MdOutlineDesignServices,MdRealEstateAgent,MdNotifications} from 'react-icons/md'
import {RiAdvertisementFill,RiGitPullRequestFill} from 'react-icons/ri'
import {GiVerticalBanner} from 'react-icons/gi'
export const sideBarLinks=[
    {
        title:'Dashboard',
        links:[
            {
                name:'dashboard',
                link:'dashboard',
                icon :<MdDashboard size={22} className=' text-[#96a0af]'/>
            }
        ]
    },
    {
        title:'Lists',
        links:[
            {
                name:'services',
                link:'services',
                icon :<MdOutlineDesignServices size={18} className=' text-[#96a0af]'/>
            },
            {
                name:'banner',
                link:'banner',
                icon :<GiVerticalBanner size={18} className=' text-[#96a0af]'/>
            },
        
          
        ]
    },
  
   
]