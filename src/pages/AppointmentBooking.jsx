// import React from 'react'

// const AppointmentBooking = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AppointmentBooking

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Clock, Calendar, User } from 'lucide-react';

const AppointmentBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [opdStatus, setOpdStatus] = useState('');
  const { doctor, formData } = location.state || {};

  useEffect(() => {
    if (!doctor || !formData) {
      navigate('/');
      return;
    }
    // Simulate fetching OPD status
    const waitTime = Math.floor(Math.random() * 60) + 30; // Random wait time between 30-90 minutes
    setOpdStatus(`Estimated wait time: ${waitTime} minutes`);
  }, [doctor, formData, navigate]);

  if (!doctor || !formData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-slate-800 text-white max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Appointment Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-400" />
              <p>Dr. {doctor.name} - {doctor.specialty}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <p>{opdStatus}</p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg mt-4">
              <h3 className="font-semibold mb-2">Patient Details:</h3>
              <p>Name: {formData.name}</p>
              <p>Age: {formData.age}</p>
              <p>Problem: {formData.problem}</p>
            </div>
            <div className="text-center mt-6">
              <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700 text-white">
                Back to Home
              </Button>
              <Button onClick={() => navigate('/livequeue')} className="bg-green-600 hover:bg-green-700 text-white ml-4">
                Track Live Queue
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AppointmentBooking;
