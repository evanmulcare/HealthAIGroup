import React from 'react';
import { BiHealth } from 'react-icons/bi';
import { animated, useSpring, config, useTrail } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import webdashboard from '../Assets/webdashboard.png'
import healthaiphonedashboard from '../Assets/healthaiphonedashboard.png'
import HealthAIPhoneLogin from '../Assets/HealthAIPhoneLogin.png'


const LandingPage = () => {

    const navigate = useNavigate();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    const [refTwo, inViewTwo] = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });
    const [refThree, inViewThree] = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });
    const [refFour, inViewFour] = useInView({
        triggerOnce: false,
        threshold: 0.5,
    });

    const fadeTrail = useTrail(3, {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(-20px)',
        from: { opacity: 0, transform: 'translateX(-20px)' },
        config: config.stiff,
    });

    const fadeTrailTwo = useTrail(3, {
        opacity: inViewThree ? 1 : 0,
        transform: inViewThree ? 'translateX(0)' : 'translateX(-20px)',
        from: { opacity: 0, transform: 'translateX(-20px)' },
        config: config.stiff,
    });
    const fadeTrailThree = useTrail(3, {
        opacity: inViewFour ? 1 : 0,
        transform: inViewFour ? 'translateX(0)' : 'translateX(-20px)',
        from: { opacity: 0, transform: 'translateX(-20px)' },
        config: config.stiff,
    });

    const springProps = useSpring({
        to: {
            opacity: inViewTwo ? 1 : 0,
            transform: inViewTwo ? 'scale(1)' : 'scale(0)',
        },
        from: { opacity: 0, transform: 'scale(0)' },
    });

    const logoSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(100%)',
        from: { opacity: 0, transform: 'translateX(100%)' },
    });

    const logoSpringTwo = useSpring({
        opacity: inViewThree ? 1 : 0,
        transform: inViewThree ? 'translateX(0)' : 'translateX(-100%)',
        from: { opacity: 0, transform: 'translateX(-100%)' },
    });
    const logoSpringThree = useSpring({
        opacity: inViewFour ? 1 : 0,
        transform: inViewFour ? 'translateX(0)' : 'translateX(-100%)',
        from: { opacity: 0, transform: 'translateX(-100%)' },
    });

    return (
        <div className="fixed left-0 top-0 w-full h-full bg-gray-50 overflow-y-auto overflow-hidden">
            <div className='w-screen flex justify-between top-0 p-5 z-10'>
                <div>
                    <div className="flex items-center">
                        <BiHealth className="text-3xl mr-3 text-blue-500" />
                        <span className="text-2xl text-gray-800 font-semibold">HealthAI</span>
                    </div>
                </div>
                <div className='space-x-2'>
                    <button
                        className="w-32 text-center h-10 text-blue-500 text-md rounded-md hover:text-blue-200 transition duration-300"
                        onClick={() => window.location.href = 'https://healthaidocs.web.app'}
                    >
                        <span>Documentation</span>
                    </button>
                    <button className="w-32 text-center h-10 bg-blue-500 text-md rounded-md text-white hover:text-gray-200 transition duration-300" onClick={() => navigate('/signin')}>
                        <span>GP Login</span>
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section className="mt-20 h-full flex items-center justify-center relative">

                <div ref={ref} className="relative inline-flex w-full h-full space-x-4 ">
                    <div className='w-full inline-flex flex-col md:flex-row justify-between items-top text-left space-x-4'>
                        <div className="w-full md:w-2/5 mt-10 text-center">
                            <animated.h1 style={fadeTrail[0]} className="text-4xl font-bold text-gray-800 mb-2">
                                Helping make healthcare easier.
                            </animated.h1>
                            <animated.p style={fadeTrail[1]} className="text-lg text-gray-700">
                                Because you have enough to worry about.
                            </animated.p>

                            <p className='font-semibold text-sm text-gray-800 italic p-4'>
                                "A societal transformation is taking place whereby healthcare professionals, and patients alike, are shifting
                                from reactive to predictive HealthAI care management. Rather than waiting for health problems to be manifested as life-
                                threatening conditions, AI technology enables the prediction of future health problems using datasets of patient
                                information."
                            </p>

                            <div className='flex space-x-2 mt-10 items-center w-full justify-center'>
                                <button className='px-4 py-2 text-lg bg-gray-800 text-white rounded-md' onClick={() => {
                                    const doctorSection = document.getElementById('doctorSection');
                                    if (doctorSection) {
                                        doctorSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                >I am a Doctor</button>
                                <button className='px-4 py-2 text-lg bg-gray-200 text-gray-800 border rounded-md' onClick={() => {
                                    const patientsSection = document.getElementById('patientsSection');
                                    if (patientsSection) {
                                        patientsSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                >I am a Patient</button>
                            </div>
                        </div>
                        <animated.div style={logoSpring} className="w-full md:w-3/5 h-4/5 p-4 mx-auto max-w-ful rounded-3xl">
                            <div className='relative h-3/4'>
                                <div className='p-4 h-full w-full absolute top-0 left-0 shadow-lg rounded-2xl bg-white '>
                                    <img src={webdashboard} className='object-contain w-full h-full rounded-2xl' alt="Web Dashboard" />
                                </div>
                            </div>
                        </animated.div>
                    </div>
                </div>
            </section>

            <section className="h-screen flex bg-blue-500 p-5">
                <div ref={refTwo} className="relative inline-flex w-full justify-center items-center text-center space-x-4">
                    <div className="absolute top-0 left-0 p-1 text-white text-sm font-light">
                        <div className="w-1 h-full border-l border-white absolute top-0 left-0"></div>
                        <p className="scrolling-text">Features</p>
                    </div>

                    <animated.div style={springProps} className="w-full md:w-1/2 lg:w-1/3 bg-gray-800 rounded-xl p-4 mb-4 md:mb-0">
                        <h1 className="text-3xl font-extrabold text-white mb-4">HealthAI-Predict</h1>
                        <ul className="text-white">
                            <li className="mb-4">
                                <h2 className="text-xl font-semibold">Machine Learning</h2>
                                <h2 className="text-xl font-semibold">Risk Assessments</h2>
                                <h2 className="text-xl font-semibold">Extendable Datasets</h2>
                                <h2 className="text-xl font-semibold">Accuracy Reports</h2>
                            </li>
                        </ul>
                    </animated.div>

                    <animated.div style={springProps} className="w-full md:w-1/2 lg:w-1/3 bg-gray-800 rounded-xl p-4 mb-4 md:mb-0">
                        <h1 className="text-3xl font-extrabold text-white mb-4">HealthAI-LLM</h1>
                        <ul className="text-white">
                            <li className="mb-4">
                                <h2 className="text-xl font-semibold">ChatGPT integration</h2>
                                <h2 className="text-xl font-semibold">Machine Translation</h2>
                                <h2 className="text-xl font-semibold">System Navigation</h2>
                                <h2 className="text-xl font-semibold">General Advice</h2>
                            </li>
                        </ul>
                    </animated.div>
                </div>
            </section>

            <section id="patientsSection" className="h-full flex items-center justify-center relative bg-gray-100">

                <div ref={refThree} className="relative flex flex-col-reverse md:flex-row w-full h-full space-x-4">
                    <div className="overflow-hidden w-full md:w-3/5 h-3/5 md:h-full p-4 m-4 max-w-full rounded-3xl flex items-center justify-center">
                        <div className='relative h-full w-full md:flex md:justify-between'>
                            <div className='p-4 md:w-1/2 relative'>
                                <img src={healthaiphonedashboard} className='object-contain w-full h-full rounded-2xl' alt="Web Dashboard" />
                            </div>
                            <div className='p-4 md:w-1/2 relative'>
                                <img src={HealthAIPhoneLogin} className='object-contain w-full h-full rounded-2xl' alt="Web Dashboard" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/5 mt-10 text-center">
                        <animated.h1 style={fadeTrailTwo[0]} className="text-4xl font-bold text-gray-800 mb-2">
                            For Patients.
                        </animated.h1>
                        <animated.p style={fadeTrailTwo[1]} className="text-lg text-gray-700 p-4">
                            The Patients experience is available on Mobile. Patients can store their details, contact medical professionals and insurance companies and run risk assessment based on their provided details.
                        </animated.p>
                        <div className='flex space-x-2 mt-10 items-center w-full justify-center'>
                            <button className='px-4 py-2 text-lg bg-gray-800 text-white rounded-md' onClick={() => {
                                navigate('/signin')
                            }}
                            >Download the Mobile App</button>
                        </div>
                    </div>
                </div>
            </section>



            <section id="doctorSection" className="h-full flex items-center justify-center relative bg-gray-800">

                <div ref={refFour} className="relative inline-flex w-full h-full space-x-4">
                    <div className='mt-20 w-full flex flex-col-reverse md:flex-row justify-between items-top text-left space-x-4'>

                        <div className="w-full md:w-2/5 mt-10 text-center">
                            <animated.h1 style={fadeTrailThree[0]} className="text-4xl font-bold text-white mb-2">
                                For Doctors.
                            </animated.h1>
                            <animated.p style={fadeTrailThree[1]} className="text-lg text-gray-400 p-4">
                                The medical professional experience is available on Web. Doctors can access their patients, chat with them, invite new patients and store patient files. Doctors can also run risk assessments, access the datasets used by HealthAI - for both download and extension. Accuracy reports of models are also provided to doctors.
                            </animated.p>
                            <div className='flex space-x-2 mt-10 items-center w-full justify-center'>
                                <button className='px-4 py-2 text-lg bg-gray-800 text-white border rounded-md' onClick={() => {
                                    navigate('/signin')
                                }}
                                >Go to HealthAI Web Portal</button>
                            </div>
                        </div>
                        <animated.div style={logoSpringThree} className="w-full md:w-3/5 h-4/5 p-4 mx-auto max-w-full rounded-3xl">
                            <div className='relative h-3/4'>
                                <div className='p-4 h-full w-full absolute top-0 left-0 shadow-lg rounded-2xl bg-white '>
                                    <img src={webdashboard} className='object-contain w-full h-full rounded-2xl' alt="Web Dashboard" />
                                </div>
                            </div>
                        </animated.div>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-6">
                <div className="mx-auto text-center">
                    <p>HealthAI &copy; {new Date().getFullYear()}. Luke, Charles, Finn, Evan.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
