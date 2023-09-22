
import coder from '../img/coder.png'
import { Link } from "react-router-dom";
// import Navbar from '../components/Navbar';



const Home = () => {


    return (
        <>


            {/* The rest of your Home component content */}
            <header className="bg-opacity-0 py-5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="shadow-xl rounded-xl border-indigo-500 bg-opacity-50 bg-[#71C9CE] px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold drop-shadow-xl tracking-tight text-gray-900 text-center">Dashboard</h1>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-20">
                    <div className="order-2 md:order-1">
                        <div className="p-4 pl-0 md:p-10 md:mt-10 text-center md:text-left">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-5 ">
                                    Practical Solutions for Every <span className="text-[#71C9CE] font-extrabold drop-shadow-xl">Student</span>
                                </h1>
                                <Link to={'/subject'}>
                                    <button className="bg-white hover:bg-gray-500 hover:text-white shadow-xl text-gray-800 font-semibold w-[10rem] h-[3.4rem] py-2 px-4 border border-gray-400 rounded-xl">
                                        Button
                                    </button>
                                </Link>

                            </div>

                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="p-4 md:p-10 md:pt-10 text-center md:text-left">
                            <img className="mx-auto md:mx-0 drop-shadow-xl" src={coder} alt="" />
                        </div>
                    </div>
                </div>
            </main>


        </>
    )
}

export default Home
