 import Image from 'next/image'; import { useEffect, useState } from 'react'; import agentsData from '@/data/agents.json'; import backgroundImage from '@/public/images/matrix_bg.png'; import operatorImage from '@/public/images/operator_live.png';

export default function Home() { const [showWelcome, setShowWelcome] = useState(true); const [questionAsked, setQuestionAsked] = useState(false);

useEffect(() => { const timeout = setTimeout(() => setShowWelcome(false), 4000); const dialAudio = new Audio('/sounds/dial.mp3'); dialAudio.playbackRate = 1.8; dialAudio.play(); return () => clearTimeout(timeout); }, []);

const handleAsk = () => { setQuestionAsked(true); const glitchAudio = new Audio('/sounds/glitch.wav'); glitchAudio.play(); };

return ( <div className="min-h-screen bg-black relative text-white"> <Image
src={backgroundImage}
alt="Matrix background"
layout="fill"
objectFit="cover"
className="opacity-30 -z-10"
/> {showWelcome ? ( <div className="flex flex-col items-center justify-center h-screen"> <p className="text-lg tracking-widest text-green-400 animate-pulse"> Uspostavljanje veze sa Centralom... </p> </div> ) : ( <div className="flex flex-col items-center py-6"> <Image src={operatorImage} alt="Operaterka" width={300} height={300} className={rounded-full shadow-xl transition-opacity duration-700 ${questionAsked ? 'opacity-80 animate-pulse' : 'opacity-100'}} /> <p className="text-center mt-4 text-green-300 text-xl"> -- Dobro Došli u AI svet -- <br /> gde-kako.rs <br /> Odgovora na pitanja <br /> Specijalnih AI Agenata </p> {!questionAsked && ( <button
onClick={handleAsk}
className="mt-6 px-4 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700"
> PITAJ </button> )} <div className="flex flex-row flex-wrap justify-center gap-4 mt-8"> {agentsData.map((agent) => ( <div key={agent.id} className={flex flex-col items-center transition-all duration-700 ease-in-out  ${questionAsked ? 'opacity-100' : 'opacity-40'} } > <Image src={/images/${agent.slika}} alt={agent.ime} width={questionAsked ? 120 : 80} height={questionAsked ? 120 : 80} className="rounded-full shadow-lg" /> <span className="mt-2 text-sm text-center text-green-300">{agent.ime}</span> </div> ))} </div> </div> )} </div> ); }


