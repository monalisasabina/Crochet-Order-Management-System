 import Link from 'next/link';
 
 export default function Nav() {
    return(
        <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
            <Link href="/" className="text-blue-500 hover:underline">Home</Link>
            <Link href="/about" className="text-blue-500 hover:underline">About</Link>
            <Link href="/orders" className="text-blue-500 hover:underline">Orders</Link>
        </nav>
    )
}