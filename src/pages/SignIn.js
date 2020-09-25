import React from 'react';
import { ReactComponent as AdminIcon } from '../svg/admin-icon.svg';
import { Form, Input, Button } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

function SignIn() {
    let history = useHistory();
    const signUser = () => {
        localStorage.setItem("tokenNoclope", "test");
        history.push('/')
    }
    return (
        <div className="min-h-screen flex items-center justify-center -mt-20">
            <div className="w-full text-center" style={{maxWidth: "450px"}}>
                <AdminIcon className="mx-auto" />
                <p className="w-full text-2xl mt-8 mb-12 font-semibold">
                    Accéder à l'espace administrateur
                </p>
                <Form>
                    <Input fluid className="text-2xl mb-4 border-none shadow-md rounded-md" placeholder="Identifiant"></Input>
                    <Input fluid className="text-2xl border-none shadow-md rounded-md" placeholder="Mot de passe"></Input>
                    <Button className="text-2xl text-white bg-noclope-green mt-12 shadow-md rounded-md" onClick={signUser}>
                        Se connecter
                    </Button>
                </Form>
            </div>
            <p className="w-full absolute bottom-0 text-center py-8 text-gray-500 text-sm">
                NO CLOPE 2020
            </p>
        </div>
    )
}

export default SignIn
