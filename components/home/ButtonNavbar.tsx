import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const ButtonNav = ({ children, href }) => {
    const { asPath } = useRouter();
    const isActive = asPath === href;

    return (
        <Link 
            href={href} 
            style={{ color: isActive ? "red" : 'blue'}}>
            {children}
        </Link>
    )
}
export const ButtonNavbar = ({ children, href }) => {
    const { asPath } = useRouter();
    const isActive = asPath == href;

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Link 
            href={href} 
            style={{color: isActive ? "var(--danger)" : 'var(--primario)'}} 
            >
                <Disclosure.Button
                as="a"
                className={classNames(
                    isActive ? 'bg-gray-900 text-red' : 'text-blue hover:bg-gray-700 hover:text-white',
                'block px-3 py-2 rounded-md text-base font-medium'
                )}
                aria-current={isActive ? 'page' : undefined}
                >
                {children}
                </Disclosure.Button>
        </Link>
        
    );
};