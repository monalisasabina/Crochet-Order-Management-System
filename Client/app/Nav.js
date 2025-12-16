// use client tells next to run that file in the browser
// lets you use hooks like useState and useEffect
'use client';

import Link from 'next/link';
import Image from 'next/image';
import "./NavBar.css"
import logo from './IMAGES/Logo design featurin.png'
import { usePathname } from 'next/navigation';

 
 export default function Nav() {
 
    // pathname tells us which page the user is on 
    const pathname = usePathname();

    return(
        <nav className="nav-cont">

            {/* logo */}
            <Link
                 href="/"
                 className='nav-logo'
                 >
                 <Image 
                      src={logo} 
                      alt="crochet Logo"
                    width={120} 
                      height={120}/>

            </Link>
 
            <Link 
                 href="/"
                 className={`nav-link ${pathname === '/' ? 'active' : ''}`} 
                 >DASHBOARD
            </Link>

            <Link 
                  href="/orders"
                  className={`nav-link ${pathname === '/orders' ? 'active' : ''}`}
                  > ORDERS
            </Link>

            <Link 
                  href="/clients"
                  className={`nav-link ${pathname === '/clients' ? 'active' : ''}`}
                  > CLIENTS
            </Link>

            <Link 
                  href="/addOrder"
                  className={`nav-link ${pathname === '/addOrder' ? 'active' : ''}`}
                  > ADD AN ORDER
            </Link>

               <Link 
                  href="/addClient"
                  className={`nav-link ${pathname === '/addClient' ? 'active' : ''}`}
                  > ADD CLIENT
            </Link>
        </nav>
    )
}  
