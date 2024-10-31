// import React, { useState, useEffect } from 'react';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { useNavigate } from 'react-router-dom';
// // import { bookAppointment } from '../db/apiAppointment';
// import { bookAppointment } from "@/db/apiAuth";
// import { toast } from 'react-hot-toast';
// import supabase from "../db/supabase";

// const BookingModal = ({ isOpen, onClose }) => {
//   // console.log('Doctor object:', doctor);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     problem: '',
//   });

  
//   // useEffect(() => {
//   //   console.log('Doctor object in BookingModal:', doctor);
//   // }, [doctor]);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) {
//         toast.error('Please log in to book an appointment');
//         return;
//       }
//       const appointmentData = {
//         patient_name: formData.name,
//         age: parseInt(formData.age),
//         problem: formData.problem,
//         doctor_id: 1,
//         status: 'waiting',
//         // user_id: session.user.id
//       };
//       console.log('Submitting appointment data:', appointmentData); // Add this line for debugging

//       // await bookAppointment(appointmentData);
      
//       const result = await bookAppointment(appointmentData);
//       console.log('Booking result:', result);

//       const { data, error } = await supabase
//       .from('appointments')
//       .insert(appointmentData)
//       .select();

//     if (error) {
//       console.error('Supabase error:', error);
//       throw error;
//     }

//     console.log('Booking result:', data);

//       toast.success('Appointment booked successfully!');
//       navigate('/livequeue', { state: {  formData } });
//     } catch (error) {
//       console.error('Error booking appointment:', error);
//       toast.error('Failed to book appointment. Please try again.');
//     }
//   };

//   // if (!doctor) return null;
  

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="bg-slate-800 text-white">
//         <DialogHeader>
//           <DialogTitle>Book Appointment with Dr. Dummy</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
//             <Input 
//               id="name" 
//               name="name" 
//               value={formData.name} 
//               onChange={handleInputChange} 
//               required 
//               className="mt-1 bg-slate-700 text-white" 
//             />
//           </div>
//           <div>
//             <label htmlFor="age" className="block text-sm font-medium text-slate-300">Age</label>
//             <Input 
//               id="age" 
//               name="age" 
//               type="number" 
//               value={formData.age} 
//               onChange={handleInputChange} 
//               required 
//               className="mt-1 bg-slate-700 text-white" 
//             />
//           </div>
//           <div>
//             <label htmlFor="problem" className="block text-sm font-medium text-slate-300">Describe your problem</label>
//             <Textarea 
//               id="problem" 
//               name="problem" 
//               value={formData.problem} 
//               onChange={handleInputChange} 
//               required 
//               className="mt-1 bg-slate-700 text-white" 
//             />
//           </div>
//           <DialogFooter>
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
//               Confirm Booking
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BookingModal;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { bookAppointment } from "@/db/apiAuth";
import supabase from "@/db/supabase";

const BookingModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    problem: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please log in to book an appointment');
        return;
      }

      const appointmentData = {
        patient_name: formData.name,
        age: parseInt(formData.age),
        problem: formData.problem,
        doctor_id: 1, // Hardcoded to 1 as there's only one doctor
        status: 'waiting',
      };

      console.log('Submitting appointment data:', appointmentData);

      const result = await bookAppointment(appointmentData);
      console.log('Booking result:', result);

      toast.success('Appointment booked successfully!');
      navigate('/livequeue', { state: { formData } });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Book Appointment with Dr. Dummy</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              required 
              className="mt-1 bg-slate-700 text-white" 
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-300">Age</label>
            <Input 
              id="age" 
              name="age" 
              type="number" 
              value={formData.age} 
              onChange={handleInputChange} 
              required 
              className="mt-1 bg-slate-700 text-white" 
            />
          </div>
          <div>
            <label htmlFor="problem" className="block text-sm font-medium text-slate-300">Describe your problem</label>
            <Textarea 
              id="problem" 
              name="problem" 
              value={formData.problem} 
              onChange={handleInputChange} 
              required 
              className="mt-1 bg-slate-700 text-white" 
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Confirm Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;