// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Clock, User, Info, Gift } from 'lucide-react';
// import { fetchWaitingAppointments, updateAppointmentStatus, removeCompletedAppointments, updateWaitTimes, cancelAppointment } from '../db/apiAuth';
// import supabase from '../db/supabase';
// import { toast } from 'react-hot-toast';

// const LiveQueue = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [currentStatus, setCurrentStatus] = useState('');

//   const fetchAppointments = async () => {
//     try {
//       const data = await fetchWaitingAppointments();
//       setAppointments(data);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//       toast.error('Failed to fetch appointments');
//     }
//   };

//   const updateAppointmentStatusHandler = async (appointment) => {
//     const currentTime = new Date();
//     const startTime = new Date(appointment.probable_start_time);
//     const estimatedCompletionTime = new Date(startTime.getTime() + (appointment.estimated_wait_time * 60000));

//     if (currentTime >= startTime && appointment.status === 'waiting') {
//       await updateAppointmentStatus(appointment.id, 'in-progress');
//       setCurrentStatus('Your turn for OPD!');
//     }

//     if (currentTime >= estimatedCompletionTime && appointment.status === 'in-progress') {
//       await updateAppointmentStatus(appointment.id, 'completed');
//       setCurrentStatus('Your OPD is completed.');
//       await removeCompletedAppointments();
//     }
//   };

//   const handleCancelAppointment = async (appointmentId) => {
//     try {
//       await cancelAppointment(appointmentId);
//       toast.success('Appointment cancelled successfully');
//       await fetchAppointments();
//     } catch (error) {
//       console.error('Error cancelling appointment:', error);
//       toast.error('Failed to cancel appointment');
//     }
//   };

//   useEffect(() => {
//     const setupRealTimeUpdates = async () => {
//       await fetchAppointments();

//       const subscription = supabase
//         .channel('appointments')
//         .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, fetchAppointments)
//         .subscribe();

//       const updateInterval = setInterval(async () => {
//         await updateWaitTimes();
//         for (const appointment of appointments) {
//           await updateAppointmentStatusHandler(appointment);
//         }
//       }, 60000); // Update every minute

//       return () => {
//         supabase.removeChannel(subscription);
//         clearInterval(updateInterval);
//       };
//     };

//     setupRealTimeUpdates();
//   }, []);

//   // Live timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setAppointments(prevAppointments => 
//         prevAppointments.map(appointment => ({
//           ...appointment,
//           estimated_wait_time: Math.max(0, appointment.estimated_wait_time - 1)
//         }))
//       );
//     }, 60000); // Update every minute

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8 space-y-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="bg-slate-800 text-white max-w-2xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">Live Queue Tracking</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4 card-content">
//             <div className="flex items-center space-x-2">
//               <Clock className="w-5 h-5 text-yellow-400" />
//               <p>Current Status: {currentStatus || 'Waiting'}</p>
//             </div>
//             {appointments.length === 0 ? (
//               <div className="text-center">
//                 <p className="text-2xl font-bold">No appointments in queue</p>
//                 <p>Estimated Wait Time: 0 minutes</p>
//                 <p>Status: Ready for next patient</p>
//               </div>
//             ) : (
//               appointments.map((appointment) => (
//                 <div key={appointment.id} className="flex items-center justify-between space-x-2">
//                   <div className="flex items-center space-x-2">
//                     <User className="w-5 h-5 text-green-400" />
//                     <p>{appointment.patient_name} - Status: {appointment.status}</p>
//                   </div>
//                   <p>Estimated Wait: {appointment.estimated_wait_time} mins</p>
//                   <Button 
//                     onClick={() => handleCancelAppointment(appointment.id)} 
//                     className="bg-red-600 hover:bg-red-700 text-white"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               ))
//             )}
//             <div className="text-center mt-6 space-x-4">
//               <Button onClick={fetchAppointments} className="bg-blue-600 hover:bg-blue-700 text-white">
//                 Refresh Status
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Tips and Offers sections remain unchanged */}
//            <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <Card className="bg-slate-800 text-white max-w-2xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">Tips While You Wait <span role="img" aria-label="lightbulb">💡</span></CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4 card-content">
//             <div className="flex items-center space-x-2">
//               <Info className="w-5 h-5 text-green-400" />
//               <p>Stay hydrated and relax. Your turn will come soon. <span role="img" aria-label="water">💧</span></p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Info className="w-5 h-5 text-green-400" />
//               <p>Review your symptoms and any questions you have for the doctor. <span role="img" aria-label="notebook">📒</span></p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Info className="w-5 h-5 text-green-400" />
//               <p>Check out our health tips and articles in the waiting area. <span role="img" aria-label="book">📚</span></p>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.4 }}
//       >
//         <Card className="bg-slate-800 text-white max-w-2xl mx-auto">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">Special Offers <span role="img" aria-label="gift">🎁</span></CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4 card-content">
//             <div className="flex items-center space-x-2">
//               <Gift className="w-5 h-5 text-red-400" />
//               <p>Get 20% off on your next appointment if you book today! <span role="img" aria-label="discount">💸</span></p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Gift className="w-5 h-5 text-red-400" />
//               <p>Free health check-up for your family members. <span role="img" aria-label="family">👨‍👩‍👧‍👦</span></p>
//             </div>
//             <div className="text-center mt-6">
//               <Button onClick={() => alert('Offer claimed!')} className="bg-red-600 hover:bg-red-700 text-white">
//                 Claim Offer
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
      
//     </div>
//   );
// };

// export default LiveQueue;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Info, Gift } from 'lucide-react';
import { fetchWaitingAppointments, updateAppointmentStatus, removeCompletedAppointments, updateWaitTimes, cancelAppointment } from '../db/apiAuth';
import supabase from '../db/supabase';
import { toast } from 'react-hot-toast';

const LiveQueue = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('');

  const fetchAppointments = async () => {
    try {
      const data = await fetchWaitingAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments');
    }
  };

  const updateAppointmentStatusHandler = async () => {
    const currentTime = new Date();
    for (const appointment of appointments) {
      const startTime = new Date(appointment.probable_start_time);
      const estimatedCompletionTime = new Date(startTime.getTime() + 60000); // 1 minute OPD time

      if (currentTime >= startTime && appointment.status === 'waiting') {
        await updateAppointmentStatus(appointment.id, 'in-progress');
        setCurrentStatus(`${appointment.patient_name}'s turn for OPD!`);
      }

      if (currentTime >= estimatedCompletionTime && appointment.status === 'in-progress') {
        await updateAppointmentStatus(appointment.id, 'completed');
        setCurrentStatus(`${appointment.patient_name}'s OPD is completed.`);
        await removeCompletedAppointments();
        await fetchAppointments(); // Refresh the list after removing completed appointments
      }
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      toast.success('Appointment cancelled successfully');
      await fetchAppointments(); // Refresh the list after cancelling
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    }
  };

  useEffect(() => {
    const setupRealTimeUpdates = async () => {
      await fetchAppointments();

      const subscription = supabase
        .channel('appointments')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, fetchAppointments)
        .subscribe();

      const updateInterval = setInterval(async () => {
        await updateWaitTimes();
        await updateAppointmentStatusHandler();
      }, 10000); // Update every 10 seconds for testing purposes

      return () => {
        supabase.removeChannel(subscription);
        clearInterval(updateInterval);
      };
    };

    setupRealTimeUpdates();
  }, []);

  // Live timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAppointments(prevAppointments => 
        prevAppointments.map((appointment, index) => ({
          ...appointment,
          estimated_wait_time: Math.max(0, index * 1 - Math.floor((new Date() - new Date(appointment.probable_start_time)) / 60000))
        }))
      );
    }, 1000); // Update every second for a smoother countdown

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-slate-800 text-white max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Live Queue Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 card-content">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <p>Current Status: {currentStatus || 'Waiting'}</p>
            </div>
            {appointments.length === 0 ? (
              <div className="text-center">
                <p className="text-2xl font-bold">No appointments in queue</p>
                <p>Estimated Wait Time: 0 minutes</p>
                <p>Status: Ready for next patient</p>
              </div>
            ) : (
              appointments.map((appointment, index) => (
                <div key={appointment.id} className="flex items-center justify-between space-x-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-green-400" />
                    <p>{appointment.patient_name} - Status: {appointment.status}</p>
                  </div>
                  <p>Estimated Wait: {index === 0 ? 'Now' : `${appointment.estimated_wait_time} mins`}</p>
                  <Button 
                    onClick={() => handleCancelAppointment(appointment.id)} 
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Cancel
                  </Button>
                </div>
              ))
            )}
            <div className="text-center mt-6 space-x-4">
              <Button onClick={fetchAppointments} className="bg-blue-600 hover:bg-blue-700 text-white">
                Refresh Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tips and Offers sections remain unchanged */}
    </div>
  );
};

export default LiveQueue;