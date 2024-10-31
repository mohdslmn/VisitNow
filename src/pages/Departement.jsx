// import React from 'react'

// const Departement = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Departement

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Bone, Eye,  Stethoscope, Baby, Scissors } from 'lucide-react';

const departments = [
  { id: 1, name: 'Cardiology', icon: Heart, color: 'text-red-500', description: 'Heart health specialists', waitTime: '10 min' },
  { id: 2, name: 'Neurology', icon: Brain, color: 'text-purple-500', description: 'Brain and nervous system experts', waitTime: '15 min' },
  { id: 3, name: 'Orthopedics', icon: Bone, color: 'text-yellow-500', description: 'Bone and joint care', waitTime: '20 min' },
  { id: 4, name: 'Ophthalmology', icon: Eye, color: 'text-blue-500', description: 'Eye care professionals', waitTime: '25 min' },
  { id: 5, name: 'Dentistry', icon: Eye, color: 'text-green-500', description: 'Dental health specialists', waitTime: '30 min' },
  { id: 6, name: 'General Medicine', icon: Stethoscope, color: 'text-indigo-500', description: 'Comprehensive health care', waitTime: '5 min' },
  { id: 7, name: 'Pediatrics', icon: Baby, color: 'text-pink-500', description: 'Child health experts', waitTime: '15 min' },
  { id: 8, name: 'Surgery', icon: Scissors, color: 'text-orange-500', description: 'Surgical specialists', waitTime: '35 min' },
];

const DepartmentList = () => {
  const navigate = useNavigate();

  const handleDepartmentClick = (departmentId) => {
    navigate(`/doctorlist/${departmentId}`);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Choose a Department</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {departments.map((dept) => (
          <motion.div
            key={dept.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="bg-slate-800  hover:bg-slate-700 transition-colors duration-300 cursor-pointer h-full flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <dept.icon className={`w-8 h-8 ${dept.color}`} />
                  <Badge variant="secondary" className="bg-slate-600">
                    {dept.waitTime} wait
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-white mb-2">{dept.name}</CardTitle>
                <CardDescription className="text-slate-300">{dept.description}</CardDescription>
              </CardHeader>
              <div className="p-4 mt-auto">
                <Button 
                  onClick={() => handleDepartmentClick(dept.id)} 
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                >
                  Book Available Docs
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
