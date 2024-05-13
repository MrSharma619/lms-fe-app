import { useState } from "react";
import './style.css';
import LoginSegment from "../login";
import RegisterSegment from "../register";

const FrontPage = ({ setLoading }) => {

    const [isRegister, setIsRegister] = useState(false);

    const togglePanel = () => {
        setIsRegister(!isRegister);
    }

    return ( 
        <div className="front-page flex justify-center h-screen items-center overflow-hidden">
            <div className="box  lg:max-w-4xl">
                <div className={`cover ${isRegister ? "rotate-active" : ""}`}>

                    <div className="front-login">
                        <img src="loginImg.jpg" alt="login-here" />
                        

                    </div>

                    <div className="back-register">
                        <img src="registerImg.jpg" alt="register-here" />

                    </div>

                </div>

                <div className="forms h-full">
                    <div className="form-content h-full">
                        <div className="login-form">
                            <LoginSegment setLoading={setLoading} togglePanel={togglePanel} />
                        </div>

                        <div className="register-form">
                            <RegisterSegment setLoading={setLoading} togglePanel={togglePanel} />
                        </div>

                    </div>

                </div>

            </div>

        </div>
     );
}
 
export default FrontPage;