import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Star, Calendar } from 'lucide-react';
import BookingModal from '../pages/BookingModal';

// ... (keep the mockDoctorsByDepartment data)
export const mockDoctorsByDepartment = {
  1: [ // Cardiology
    { id: 101, name: 'Dr. Emily Johnson', specialty: 'Cardiologist', rating: 4.8, experience: '15 years', nextAvailable: '2023-06-10', image: 'https://randomuser.me/api/portraits/women/68.jpg' ,location: 'City Hospital', availableUntil: '7 PM' ,waitTime: '10 min' },
    { id: 102, name: 'Dr. Robert Smith', specialty: 'Cardiologist', rating: 4.7, experience: '12 years', nextAvailable: '2023-06-11', image: 'https://randomuser.me/api/portraits/men/32.jpg',location: 'Heart Care Clinic', availableUntil: '7 PM' ,waitTime: '15 min'  },
  ],
  2: [ // Neurology
    { id: 201, name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.9, experience: '20 years', nextAvailable: '2023-06-11', image: 'https://randomuser.me/api/portraits/men/45.jpg' ,location: 'Neuro Health Center', availableUntil: '6 PM'},
    { id: 202, name: 'Dr. Sarah Patel', specialty: 'Neurologist', rating: 4.7, experience: '12 years', nextAvailable: '2023-06-09', image: 'https://randomuser.me/api/portraits/women/22.jpg',location: 'Brain Clinic', availableUntil: '7 PM' },
  ],
  3: [ // Orthopedics
    { id: 301, name: 'Dr. David Kim', specialty: 'Orthopedic Surgeon', rating: 4.6, experience: '10 years', nextAvailable: '2023-06-12', image: 'https://randomuser.me/api/portraits/men/22.jpg' ,location: 'Brain Clinic', availableUntil: '7 PM'},
    { id: 302, name: 'Dr. Lisa Rodriguez', specialty: 'Orthopedic Surgeon', rating: 4.9, experience: '18 years', nextAvailable: '2023-06-10', image: 'https://randomuser.me/api/portraits/women/28.jpg' ,location: 'Brain Clinic', availableUntil: '7 PM'},
  ],
};


const DoctorList = () => {
  const { departmentId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // ... (keep the useEffect hook)
  useEffect(() => {
    const departmentDoctors = mockDoctorsByDepartment[departmentId] || [];
    setDoctors(departmentDoctors);
  
    const departmentNames = {
      1: 'Cardiology',
      2: 'Neurology',
      3: 'Orthopedics',
    };
    setDepartmentName(departmentNames[departmentId] || 'Unknown Department');
  }, [departmentId]);
  

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-center text-white">{departmentName}</h1>
      <h2 className="text-2xl font-semibold mb-8 text-center text-slate-300">Available Doctors</h2>
      {doctors.length === 0 ? (
        <p className="text-center text-white">No doctors available for this department.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="bg-slate-800 hover:bg-slate-700 transition-colors duration-300 cursor-pointer h-full flex flex-col justify-between">
                {/* ... (keep the existing card content) */}
                <CardHeader>
  <div className="flex items-center justify-start space-x-4 mb-4">
    <img src={doctor.image} alt={doctor.name} className="w-20 h-20 mb-2 rounded-full" />
   
    <div>
      <CardTitle className="text-xl font-semibold text-white">{doctor.name}</CardTitle>
      
      <CardDescription className="text-slate-300">{doctor.specialty}</CardDescription>
       <p className="text-slate-300">{doctor.location}</p> {/* Display location */}
                      <p className="text-slate-300">Available until: {doctor.availableUntil}</p> {/* Display availability */}
    </div>
    {/* <div className=''>
    <Badge variant="secondary" className="bg-slate-600  sm:mb-12">
                    {doctor.waitTime} wait
                  </Badge>
    </div> */}
  </div>
  <div className="flex items-center space-x-2 mb-2">
    <Star className="w-5 h-5 text-yellow-400" />
    <span className="text-white">{doctor.rating}</span>
    <Badge variant="secondary" className="bg-slate-600 ml-2">
      {doctor.experience}
    </Badge>
  </div>
</CardHeader>

                <CardContent>
                  <div className="flex items-center space-x-2 text-slate-300 mb-4">
                    <Calendar className="w-5 h-5" />
                    <span>Next Available: {doctor.nextAvailable}</span>
                  </div>
                  <Button 
                    onClick={() => handleBookAppointment(doctor)} 
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default DoctorList;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Button } from "../components/ui/button";
// import { Star, Calendar } from 'lucide-react';

// // Mock data for doctors by department
// const mockDoctorsByDepartment = {
//   1: [ // Cardiology
//     { id: 101, name: 'Dr. Emily Johnson', specialty: 'Cardiologist', rating: 4.8, experience: '15 years', nextAvailable: '2023-06-10', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
//     { id: 102, name: 'Dr. Robert Smith', specialty: 'Cardiologist', rating: 4.7, experience: '12 years', nextAvailable: '2023-06-11', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
//     // Add more cardiologists...
//   ],
//   2: [ // Neurology
//     { id: 201, name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.9, experience: '20 years', nextAvailable: '2023-06-11', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
//     { id: 202, name: 'Dr. Sarah Patel', specialty: 'Neurologist', rating: 4.7, experience: '12 years', nextAvailable: '2023-06-09', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
//     // Add more neurologists...
//   ],
//   3: [ // Orthopedics
//     { id: 301, name: 'Dr. David Kim', specialty: 'Orthopedic Surgeon', rating: 4.6, experience: '10 years', nextAvailable: '2023-06-12', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
//     { id: 302, name: 'Dr. Lisa Rodriguez', specialty: 'Orthopedic Surgeon', rating: 4.9, experience: '18 years', nextAvailable: '2023-06-10', image: 'https://randomuser.me/api/portraits/women/28.jpg' },
//     // Add more orthopedic surgeons...
//   ],
//   // Add more departments...
// };

// const DoctorList = () => {
//   const { departmentId } = useParams();
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);
//   const [departmentName, setDepartmentName] = useState('');

//   useEffect(() => {
//     // In a real application, fetch doctors based on departmentId from an API
//     // For now, we'll use our mock data
//     const departmentDoctors = mockDoctorsByDepartment[departmentId] || [];
//     setDoctors(departmentDoctors);

//     // Set department name (in a real app, you'd fetch this from an API or store)
//     const departmentNames = {
//       1: 'Cardiology',
//       2: 'Neurology',
//       3: 'Orthopedics',
//       // Add more departments...
//     };
//     setDepartmentName(departmentNames[departmentId] || 'Unknown Department');
//   }, [departmentId]);

//   const handleBookAppointment = (doctorId) => {
//     navigate(`/book-appointment/${doctorId}`);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-2 text-center text-white">{departmentName}</h1>
//       <h2 className="text-2xl font-semibold mb-8 text-center text-slate-300">Available Doctors</h2>
//       {doctors.length === 0 ? (
//         <p className="text-center text-white">No doctors available for this department.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {doctors.map((doctor) => (
//             <motion.div
//               key={doctor.id}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Card className="bg-slate-800 hover:bg-slate-700 transition-colors duration-300 cursor-pointer h-full flex flex-col justify-between">
//                 <CardHeader>
//                   <div className="flex items-center space-x-4 mb-4">
//                     <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full" />
//                     <div>
//                       <CardTitle className="text-xl font-semibold text-white">{doctor.name}</CardTitle>
//                       <CardDescription className="text-slate-300">{doctor.specialty}</CardDescription>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2 mb-2">
//                     <Star className="w-5 h-5 text-yellow-400" />
//                     <span className="text-white">{doctor.rating}</span>
//                     <Badge variant="secondary" className="bg-slate-600 ml-2">
//                       {doctor.experience}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-2 text-slate-300 mb-4">
//                     <Calendar className="w-5 h-5" />
//                     <span>Next Available: {doctor.nextAvailable}</span>
//                   </div>
//                   <Button 
//                     onClick={() => handleBookAppointment(doctor.id)} 
//                     className="w-full bg-slate-700 hover:bg-slate-600 text-white"
//                   >
//                     Book Appointment
//                   </Button>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorList;
