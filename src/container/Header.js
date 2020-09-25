import React from 'react';
import { ReactComponent as NoclopeLogo } from '../svg/app-logo-noclope.svg';
import { ReactComponent as DisconnectIcon } from '../svg/disconnect.svg';
import { useHistory, Link } from "react-router-dom";

function Header() {
    let history = useHistory();
    const links = [
        {
            key: "Metrics", path: "/"
        },
        {
            key: "Dashboard", path: "/Dashboard"
        },
        {
            key: "Coach", path: "/Coach"
        },
        {
            key: "Notifications", path: "/Notifs"
        }
    ]
    return (
        <header>
            <div className="bg-noclope-green flex items-center px-6 py-4 xl:px-32 relative fixed z-10">
                <NoclopeLogo />
                {history.location.pathname === "/SignIn" && (
                    <p className="text-white font-semibold text-xl flex-1 text-right">
                        Admin
                    </p>
                )}
                {history.location.pathname !== "/SignIn" && (
                    <div className="absolute top-0 h-full flex justify-center items-center" style={{left: "50%", transform: "translateX(-50%)"}}>
                        {links.map(link => (
                            <div className="mx-12 relative">
                                {history.location.pathname === link.path && (
                                    <div className="bg-white h-2 w-full absolute -mt-6" style={{borderRadius: "0 0 10px 10px"}}></div>
                                )}
                                <Link className="text-white text-xl font-semibold hover:text-white" to={link.path}>
                                    {link.key}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {history.location.pathname !== "/SignIn" && (
                    <div className="flex-1 flex justify-end" >
                        <button onClick={() => history.push('/SignIn')}>
                            <DisconnectIcon />
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
