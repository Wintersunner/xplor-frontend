import PropTypes from "prop-types";
import logo from "../assets/logo.png"
import FindModal from "../components/FindModal.jsx";
import {useState} from "react";

Layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default function Layout({children}) {

    const [showModal, setShowModal] = useState(false);
    const hideMe = () => {
        setShowModal(false);
    }

    return (
        <div className={"bg-gray-100 flex flex-col min-h-screen px-4"}>
            <header>
                <div className={"container mx-auto"}>
                    <div className={"flex items-center"}>
                        <div className={"flex items-center"}>
                            <img className={"w-20"} src={logo}/>
                            <div className={"font-bold"}>Xplor Assignment</div>
                        </div>
                        <div className={"flex-grow flex justify-end"}>
                            <button onClick={() => setShowModal(true)}
                                    className={"bg-xplor px-6 py-3 rounded-md hover:bg-red-600 transition-all text-white font-semibold text-xs md:text-sm"}>Find
                                FizzBuzz By ID
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className={"container mx-auto grow"}>
                {children}
            </main>
            <footer className={"container mx-auto text-center py-4 border-t border-gray-300 text-sm font-medium"}>
                Xplor Assignment - {new Date().getFullYear()}
            </footer>
            {showModal ? <FindModal hideMe={hideMe}/> : null}
        </div>
    )
}