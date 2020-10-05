import React, { useState } from 'react';
import { ReactComponent as AdminIcon } from '../svg/admin-icon.svg';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

function SignIn() {
    let history = useHistory();
    const [login, setlogin] = useState();
    const [password, setpassword] = useState();
    const [error, seterror] = useState(false)
    const signUser = () => {
        if(login === "admin-noclope" && password === "noclope") {
            localStorage.setItem("tokenNoclope", "test");
            history.push('/');
        } else {
            seterror(true);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full text-center" style={{maxWidth: "450px"}}>
                <AdminIcon className="mx-auto" />
                <p className="w-full text-2xl mt-8 mb-12 font-semibold">
                    Accéder à l'espace administrateur
                </p>
                <Form error>
                    <Input name="login" fluid className="text-2xl mb-4 border-none shadow-md rounded-md" placeholder="Identifiant" onChange={(e) => {setlogin(e.target.value); seterror(false)}}></Input>
                    <Input name="password" fluid className="text-2xl border-none shadow-md rounded-md" placeholder="Mot de passe" onChange={(e) => {setpassword(e.target.value); seterror(false)}}></Input>
                    {error && (
                        <Message
                            className="text-left mb-0"
                            error
                            header='Erreur'
                            content='Identifiant ou mot de passe incorrect.'
                        />
                    )}
                    <Button className="text-2xl text-white bg-noclope-green mt-12 shadow-md rounded-md hover:bg-noclope-darkgreen" onClick={signUser}>
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
