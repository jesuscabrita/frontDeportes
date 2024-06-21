import React, { ReactNode, useContext } from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Context from "../../../context/contextPrincipal";

export const ButtonNavbar = ({ children, href, handleOpenRuta, mobile }: { children: ReactNode, href: string, handleOpenRuta: () => void, mobile: boolean }) => {
    const [light] = useContext(Context);
    const { asPath } = useRouter();
    const isActive = asPath === href;

    const buttonStyles = {
        display: "block",
        padding: "8px 12px 8px 12px",
        borderRadius: "6px",
        fontSize: mobile ? "12px" : '14px',
        background: "transparent",
        color: isActive ? "var(--marcaRed)" : light ? "var(--dark2)" : "#aab4be",
        textDecoration: "none",
        cursor: "pointer",
        letterSpacing: '2px',
        fontWeight: light ? '900' : '400'
    };

    return (
        <Link href={href}>
            <Disclosure.Button
                onClick={mobile ? handleOpenRuta : undefined}
                style={buttonStyles}
                aria-current={isActive ? "page" : undefined}
                title={`Enlace a ${children}`}
                rel="noopener noreferrer"
            >
                {children}
            </Disclosure.Button>
        </Link>
    );
};