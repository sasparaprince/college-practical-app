import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Earth from '../components/canvas/Earth'; // Import the Earth component
import '../App.css'


const Home = () => {
    return (
        <>



            <Navbar />
            <Helmet>
                <meta charSet="utf-8" />
                <title>College Practical Hub</title>
                <meta name="description" content="College Practical Hub" />
            </Helmet>

            <header className="bg-opacity-0 py-5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-xl border-indigo-500 bg-opacity-50 shadow-lg shadow-slate-700 bg-[#71C9CE] px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold drop-shadow-xl tracking-tight text-white text-center">Explore College Practical Solutions</h1>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 h-[32rem] md:h-[25rem] gap-4 md:gap-8 lg:gap-12 xl:gap-16">
    <div className="order-2 md:order-1">
      <div className="p-4 md:p-10 md:mt-10 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Practical Solutions for Every{" "}
          <span className="text-[#71C9CE] font-extrabold drop-shadow-lg">
            Student
          </span>
        </h1>
        <Link to="/subject">
          <button className="bg-white mt-5 hover:bg-gray-500 hover:text-white shadow-lg shadow-slate-700 text-gray-800 font-semibold w-[10rem] sm:w-[12rem] h-12 sm:h-14 py-2 px-4 border border-gray-400 rounded-xl">
            Subjects
          </button>
        </Link>
      </div>
    </div>

    <div className="order-1 md:order-2 centered-earth">
      <Earth />
    </div>
  </div>
</main>




            <Footer />

        </>
    )
}

export default Home;
