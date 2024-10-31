// win + . for emojis
// ctrl + shift for importing

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import img from "./../assets/feature1.png";
// import feature3 from "./../assets/feature3.png";
// import feature2 from "./../assets/feature6.png";
import placeholder from "./../assets/placeholder.png"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Rss,
  HelpCircle,
   MessageCircle, 
   Shield ,
  Calendar,
  List,
  Activity,
  Users,
  Stethoscope,
  BellPlus,
  Grid2x2Check,
  Check,
  Smartphone,
  Heart,
} from "lucide-react";
// import Image from "next/image"
// import featureText from './../constants'

const LandingPage = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedFeatures, setAnimatedFeatures] = useState([]);
  const [isVisible, setIsVisible] = useState(false)
  const [activeItem, setActiveItem] = useState(null)
  const [isVisible2, setIsVisible2] = useState(false)
  const [heartbeat, setHeartbeat] = useState(0)


  const faqs = [
    {
      icon: <MessageCircle className="h-5 w-5 text-purple-400" />,
      question: "How do I book an OPD appointment?",
      answer: "To book an OPD appointment, simply select the department and doctor you wish to consult, then follow the prompts to fill in your details and confirm your booking. You will receive a confirmation with the estimated time of your appointment.",
    },
    {
      icon: <Clock className="h-5 w-5 text-purple-400" />,
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment through the app. Go to your appointment details and select the option to cancel or reschedule. Please note that changes may affect your position in the queue.",
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-purple-400" />,
      question: "How do I know when it's my turn for the OPD?",
      answer: "Our app provides real-time updates on your position in the queue. You will receive notifications as your turn approaches, allowing you to arrive at the right time.",
    },
    {
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      question: "Is my personal information secure?",
      answer: "Absolutely. We prioritize your privacy and security. All personal information is stored securely, and our app complies with all relevant data protection regulations.",
    },
  ]

  const features = [
    {
      icon: <Clock className="h-8 w-8 text-blue-400" />,
      title: "Real-time Updates",
      description:
        "Get live updates on your appointment status, allowing you to plan your day efficiently.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-400" />,
      title: "Easy Scheduling",
      description:
        "Book appointments online and skip the long waiting room queues.",
    },
    {
      icon: <List className="h-8 w-8 text-purple-400" />,
      title: "Live Queue ",
      description:
        "Streamline OPD operations with our advanced queue management system.",
    },
    {
      icon: <Activity className="h-8 w-8 text-red-400" />,
      title: "Live Tracking",
      description:
        "Track your position in the queue in real-time for a seamless hospital visit.",
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-400" />,
      title: "Doctor Directory",
      description:
        "Access a comprehensive list of doctors and their available time slots.",
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-cyan-400" />,
      title: "Get Doctor List",
      description:
        "Browse our extensive list of qualified doctors and choose the right specialist for your needs.",
    },
    {
      icon: <BellPlus className="h-8 w-8 text-pink-400" />,
      title: "Live health tips",
      description:
        "Get Health tips daily by medical professionals.",
    },
    {
      icon: <Rss className="h-8 w-8 text-violet-400" />,
      title: "Read Health Blogs",
      description:
        "Access a comprehensive list of doctors and their available time slots.",
    },
    {
      icon: <Grid2x2Check className="h-8 w-8 text-orange-400" />,
      title: "Departments",
      description:
        "Access a comprehensive list of doctors and their available time slots.",
    },
  ];
  const whyus = [
    {
      icon: <Clock className="h-6 w-6 text-purple-400" />,
      title: "Seamless Experience",
      description: "Booking your OPD appointment has never been easier. With our user-friendly interface, you can secure your spot with just a few clicks and avoid the stress of waiting in line."
    },
    {
      icon: <Check className="h-6 w-6 text-purple-400" />,
      title: "Real-Time Updates",
      description: "Stay informed every step of the way. Our app provides real-time notifications about your position in the queue, so you'll always know when it's your turn."
    },
    {
      icon: <Smartphone className="h-6 w-6 text-purple-400" />,
      title: "Tailored for Convenience",
      description: "We designed Visit Now with your convenience in mind. Whether you're at home, at work, or on the go, you can manage your appointments anytime, anywhere."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-400" />,
      title: "Accessible to Everyone",
      description: "No need to be tech-savvy to use our app. We've made it simple and intuitive, so anyone can book appointments without any hassle."
    }
  ]

  const text = `Thhat’s why we’ve created a seamless way for you to manage
  your outpatient department (OPD) visits without the hassle  
  of waiting in long queues.`; // The text to be typed
  const textRef = useRef(null);

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('cta-section')
      if (element) {
        const position = element.getBoundingClientRect()
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible2(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Heartbeat animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat(prev => (prev + 1) % 2)
    }, 1000)

    return () => clearInterval(interval)
  }, [])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedFeatures(features);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          let index = 0;
          const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index += 1;
            if (index >= text.length) {
              clearInterval(interval);
              setHasAnimated(true); // Stop animation after it's done
            }
          }, 50); // Adjust speed here
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, text]);
  const navigate = useNavigate();
  return (
    <section className="w-full  md:py-24 lg:py-32 relative overflow-hidden ">
      {/* <Header /> */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#5a5a5a3e_2px,transparent_2px),linear-gradient(to_bottom,#3a3a3a2e_2px,transparent_2px)] bg-[size:50px_82px] [mask-image:radial-gradient(ellipse_50%_30%_at_50%_0%,#000_50%,transparent_100%)]" />
          </div>
      <h2 className="my-6 sm:my-16 text-3xl sm:text-4xl lg:text-5xl text-white text-center font-extrabold ">
        🩺Your Health Your Time⌚
        <br /> At VisitNow, we understand <br />
        that your time is valuable.
      </h2>
      <p
        ref={textRef}
        className="lg:text-2xl text-xl mb-4 text-white whitespace-pre-wrap moving-text text-center"
      >
        {/* That’s why we’ve created a seamless way for you to manage <br /> your
        outpatient department (OPD) visits without the hassle <br /> of waiting
        in long queues. */}
        {displayedText}
      </p>

      <div className="text-center">
        <button
          className="relative inline-flex h-12 w-full  md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none"
          onClick={() => navigate("/auth")}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

          {/* remove px-3 py-1, add px-5 gap-2 */}
          <span
            className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg
             bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 `}
            //  ${otherClasses}
          >
            Get Started
          </span>
        </button>
      </div>
      {/* feature */}

      <section className="w-full py-12 md:py-24 my-24 lg:py-32 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Features
            </h2>
            <p className="max-w-[900px] text-zinc-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience hassle-free OPD visits with our innovative features
              designed to save your time and improve your healthcare experience.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl  items-center gap-12 py-12 md:grid-cols-2 lg:grid-cols-3">
            {animatedFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800 w-[300px] h-[200px] border-gray-700  transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-100">
                    {feature.icon}
                    <span>{feature.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      </section>

      {/* <main > */}
        {/* ***** */}
       
       
      {/* </main> */}
      <section className="relative overflow-hidden w-full py-12 md:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent">
          Why Us?
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {whyus.map((whyus, index) => (
              <Card 
                key={index}
                className={`bg-gray-800/50 border-gray-700 p-6 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 hover:bg-gray-800/70 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="flex gap-4">
                  <div className="mt-1 bg-purple-500/10 p-2 rounded-lg">
                    {whyus.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {whyus.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {whyus.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className={`relative transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-3xl animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={placeholder}
                  alt="Medical App Features"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover rounded-3xl transform transition-transform duration-500 hover:scale-105"
                  // style={{ backgroundColor: "lightgray" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-50 pointer-events-none" />
    </section>
    <section className="relative overflow-hidden my-12 w-full py-12 md:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent inline-block">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our OPD appointment system
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 px-6 transform transition-all duration-300 hover:bg-gray-800/70"
              >
                <AccordionTrigger className="py-4 flex items-center gap-3 text-white hover:no-underline group">
                  <span className="bg-purple-500/10 p-2 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    {faq.icon}
                  </span>
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4 pl-12">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-150" />
      </div>
    </section>

    <section id="cta-section" className="relative overflow-hidden w-full py-16 md:py-24 lg:py-32 ">
      {/* Animated background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Medical-themed floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 animate-float-slow">
          <Stethoscope className="w-12 h-12 text-purple-500/20" />
        </div>
        <div className="absolute top-20 right-20 animate-float-delayed">
          <Calendar className="w-10 h-10 text-blue-500/20" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float">
          <Clock className="w-8 h-8 text-purple-500/20" />
        </div>
        <div className="absolute bottom-10 right-1/4 animate-float-slow">
          <Activity className="w-14 h-14 text-blue-500/20" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heartbeat animation */}
          <div className="flex justify-center mb-8">
            <div className={`transform transition-transform duration-200 ${
              heartbeat ? 'scale-110' : 'scale-100'
            }`}>
              <Heart className="w-16 h-16 text-purple-500" fill="#9333ea" />
            </div>
          </div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Your Health, Your Time, Your Choice
          </h2>

          <p className={`text-xl md:text-2xl text-gray-300 mb-8 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Join thousands of patients who have already transformed their OPD experience
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full group relative overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-purple-800 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Get Started Now
                <Activity className="w-5 h-5" />
              </span>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg rounded-full"
            >
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400 mb-2">30min</div>
              <div className="text-gray-400">Average Time Saved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow delay-1000" />

      {/* Custom animations */}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>

      {/* <Button>Get Started</Button> */}
    </section>
  );
};

export default LandingPage;
