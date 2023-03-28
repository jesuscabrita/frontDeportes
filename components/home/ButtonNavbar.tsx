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
    const buttonClassNames = isActive
        ? "text-red"
        : "text-blue hover:bg-gray-700 hover:text-white";
    const buttonStyles = {
        display: "block",
        padding: "8px 12px 8px 12px",
        borderRadius: "6px",
        fontSize: "16px",
        background: isActive ? "rgb(17 24 39)" : undefined,
        color: isActive ? "var(--danger)" : "var(--primario)",
    };

    return (
        <Link href={href}>
            <Disclosure.Button 
                className={buttonClassNames}
                style={buttonStyles}
                aria-current={isActive ? "page" : undefined}
            >
            {children}
            </Disclosure.Button>
        </Link>
        
    );
};