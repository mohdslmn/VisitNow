import React, { useState,useEffect } from 'react';
import { Calendar, Clock, Activity, User, FileText, Bell,  MessageCircle, Tag ,Stethoscope} from 'lucide-react';
import { Button} from '@/components/ui/button';
import { Input } from "@/components/ui/input"

// import Input from 'postcss/lib/input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
 



  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const tabs = [
    { id: 'overview', name: 'Overview', icon: <Activity className="w-5 h-5" /> },
    { id: 'appointments', name: 'Appointments', icon: <Calendar className="w-5 h-5" /> },
    { id: 'status', name: 'Status', icon: <Clock className="w-5 h-5" /> },
    { id: 'profile', name: 'Profile', icon: <User className="w-5 h-5" /> },
  ];
  

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'appointments':
        return <AppointmentsContent />;
      case 'status':
        return <StatusContent />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <OverviewContent />;
    }
  };
  

  return (
    <div className="flex h-screen bg-slate-900 ">
      {/* Sidebar */}
      <div  className={`w-64 bg-slate-800 p-6 ${isLoaded ? 'animate-slide-in' : 'opacity-0'}`}>
        
        <h1 className="text-2xl font-bold mb-8">VisitNow</h1>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full py-3 px-4 mb-2 rounded-lg transition-colors ${

                activeTab === tab.id ? 'bg-slate-700' : 'hover:bg-slate-700'
              }`}
            >
              {tab.icon}
              <span className="ml-3">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className={`flex-1 p-8 overflow-y-auto ${isLoaded ? 'animate-slide-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">{tabs.find(tab => tab.id === activeTab).name}</h2>
          <button className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};




const OverviewContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate=useNavigate();
  const handleBookingClick=()=>{
    navigate('/department');
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>
        <Card className="bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-8 h-8 mr-3" />
              Upcoming Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">Dr. Smith</p>
            <p className="text-slate-400">Tomorrow, 10:00 AM</p>
          </CardContent>
        </Card>
      </div>

      <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
        <Card className='bg-slate-800'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-8 h-8 mr-3" />
              Latest Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">Blood Test Results</p>
            <p className="text-slate-400">Received yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
        <Card className='bg-slate-800'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-8 h-8 mr-3" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <button onClick={handleBookingClick} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
              Book New Appointment
            </button>
          </CardContent>
        </Card>
      </div>

      <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>
        <PromotedServices />
      </div>
      <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
        <PatientTestimonials />
      </div>
      <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
        <SpecialOffers />
      </div>
    </div>
  );
};
const SpecialOffers = () => (
  <Card className="bg-slate-800 min-h-full">
  <CardHeader>
    <CardTitle className="flex items-center">
      <Tag className="w-8 h-8 mr-3" />
      Special Offers
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* ... existing content ... */}
    <div className="mt-4 space-y-4">
  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-lg">
    <p className="font-bold text-lg">20% Off Health Checkups</p>
    <p className="text-sm mt-1">Book a comprehensive health checkup this month and get 20% off!</p>
    <button className="mt-3 bg-white text-purple-700 py-1 px-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors">
      Learn More
    </button>
  </div>
  <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-lg">
    <p className="font-bold text-lg">Free Dental Consultation</p>
    <p className="text-sm mt-1">Schedule a free dental consultation with our experienced dentists.</p>
    <button className="mt-3 bg-white text-green-700 py-1 px-3 rounded text-sm font-semibold hover:bg-gray-100 transition-colors">
      Book Now
    </button>
  </div>
</div>

    
    
  </CardContent>
</Card>

);

const PatientTestimonials = () => (
 
  <Card className="bg-slate-800  min-h-full">
<CardHeader>
<CardTitle className="flex items-center">
  <MessageCircle className="w-8 h-8 mr-3" />
  Patient Testimonials
</CardTitle>
</CardHeader>
<CardContent>
{/* ... existing content ... */}
<div className="mt-4 space-y-4">
      {[
        { name: 'John D.', text: 'Excellent care and professional staff. Highly recommended!' },
        { name: 'Sarah M.', text: 'The doctors here are knowledgeable and caring. Great experience.' },
        { name: 'Sarah M.', text: 'The doctors here are knowledgeable and caring. Great experience.' },
      ].map((testimonial, index) => (
        <div key={index} className="bg-slate-700 p-4 rounded-lg">
          <p className="italic">"{testimonial.text}"</p>
          <p className="text-right mt-2 text-slate-400">- {testimonial.name}</p>
        </div>
      ))}
    </div>
</CardContent>
</Card>
);


// const PromotedServices = () => (
//   <Card  className="bg-slate-800 min-h-full">
//     <CardHeader>
//       <CardTitle className="flex items-center">
//         <Stethoscope className="w-8 h-8 mr-3" />
//         Our Services
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//       {/* ... existing content ... */}
//       <div className="grid grid-rows-2 md:grid-rows-3 gap-4 mt-4 mr-4">
//     {['Cardiology', 'Orthopedics', 'Neurology', 'Dermatology', 'Pediatrics', 'Oncology', "Gynaecology"].map((service) => (
//       <div key={service} className="bg-slate-700 border-2 border-white  p-3 rounded-lg text-center hover:bg-slate-600 transition-colors">
//         <p className="font-semibold">{service}</p>
//       </div>
//     ))}
//   </div>
//     </CardContent>
//   </Card>

// );

const PromotedServices = () => {
  const navigate = useNavigate();

  const departments = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Orthopedics' },
    { id: 3, name: 'Neurology' },
    { id: 4, name: 'Dermatology' },
    { id: 5, name: 'Pediatrics' },
    { id: 6, name: 'Oncology' },
    { id: 7, name: 'Gynaecology' }
  ];
  const handleDepartmentClick = (departmentId) => {
    navigate(`/doctorlist/${departmentId}`);
  };

  return (
    <Card className="bg-slate-800 min-h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Stethoscope className="w-8 h-8 mr-3" />
          Our Services
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-rows-2 md:grid-rows-3 gap-4 mt-4 mr-4">
          {departments.map((department) => (
            <div
              key={department.id}
              className="bg-slate-700 border-2 border-white p-3 rounded-lg text-center hover:bg-slate-600 transition-colors cursor-pointer"
              onClick={() => handleDepartmentClick(department.id)}
            >
              <p className="font-semibold">{department.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


const AppointmentsContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  return(
  <div  className={`animate-fade-in-up bg-slate-800 rounded-lg p-6 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
    <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
    <div className="space-y-4">
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex justify-between items-center p-4 bg-slate-700 rounded-lg">
          <div>
            <p className="font-semibold">Dr. Johnson</p>
            <p className="text-slate-400">General Checkup</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">June 15, 2023</p>
            <p className="text-slate-400">2:30 PM</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

const StatusContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulating API call to fetch bookings
    const fetchBookings = async () => {
      // Replace this with actual API call
      const mockBookings = [
        { id: 1, doctor: "Dr. Brown", status: 'Scheduled', date: '2023-06-15', time: '14:30', color: 'bg-blue-500' },
        { id: 2, doctor: "Dr. Smith", status: 'In Progress', date: '2023-06-10', time: '10:00', color: 'bg-yellow-500' },
        { id: 3, doctor: "Dr. Johnson", status: 'Completed', date: '2023-06-05', time: '09:15', color: 'bg-green-500' },
      ];
      setBookings(mockBookings);
    };

    fetchBookings();

    // Simulating real-time updates
    const interval = setInterval(() => {
      setBookings(prevBookings => 
        prevBookings.map(booking => {
          if (booking.status === 'Scheduled' && Math.random() > 0.7) {
            return { ...booking, status: 'In Progress', color: 'bg-yellow-500' };
          }
          if (booking.status === 'In Progress' && Math.random() > 0.8) {
            return { ...booking, status: 'Completed', color: 'bg-green-500' };
          }
          return booking;
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);
  const handleBookingClick = (booking) => {
    if (booking.status === 'In Progress') {
      navigate('/livequeue', { state: { bookingId: booking.id } });
    }
  };

  return (
    <Card className={`animate-fade-in-up bg-slate-800 rounded-lg ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '50ms' }}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Appointment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div 
              key={booking.id} 
              className={`flex items-center p-4 bg-slate-700 rounded-lg ${
                booking.status === 'In Progress' ? 'cursor-pointer hover:bg-slate-600' : ''
              }`}
              onClick={() => handleBookingClick(booking)}
            >
              <div className={`w-3 h-3 rounded-full ${booking.color} mr-4`}></div>
              <div className="flex-grow">
                <p className="font-semibold">Appointment with {booking.doctor}</p>
                <p className="text-slate-400">{booking.status}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{booking.date}</p>
                <p className="text-slate-400">{booking.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}




const ProfileContent = () => {
  // const [isVisible, setIsVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "January 1, 1980",
    address: "123 Main St, Anytown, USA",
    emergencyContact: "Jane Doe: +1 (555) 987-6543",
    bloodGroup: "A+",
    allergies: "Penicillin, Peanuts",
    chronicConditions: "Hypertension, Diabetes",
    medications: "Lisinopril, Metformin",
    pastSurgeries: "Appendectomy (2010), Knee Replacement (2018)"
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // Here you would typically send the updated profile data to your backend
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  return (
    <div className={`animate-fade-in-up bg-slate-800 rounded-lg p-6 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0ms' }}>
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-slate-600 mr-4"></div>
        <div>
          <h3 className="text-2xl font-semibold">{profileData.fullName}</h3>
          <p className="text-slate-400">Patient ID: 12345</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-4">Basic Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileField 
            label="Full Name" 
            name="fullName"
            value={profileData.fullName} 
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField 
            label="Email Address" 
            name="email"
            value={profileData.email} 
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField 
            label="Phone Number" 
            name="phone"
            value={profileData.phone} 
            isEditing={isEditing}
            onChange={handleInputChange}
            />
            <ProfileField 
              label="Date of Birth" 
              name="dateOfBirth"
              value={profileData.dateOfBirth} 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <ProfileField 
              label="Address" 
              name="address"
              value={profileData.address} 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
            <ProfileField 
              label="Emergency Contact" 
              name="emergencyContact"
              value={profileData.emergencyContact} 
              isEditing={isEditing}
              onChange={handleInputChange}
            />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-4">Medical Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileField 
            label="Blood Group" 
            name="bloodGroup"
            value={profileData.bloodGroup} 
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField 
            label="Allergies" 
            name="allergies"
            value={profileData.allergies} 
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField 
            label="Chronic Conditions" 
            name="chronicConditions"
            value={profileData.chronicConditions} 
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField 
            label="Medications" 
            name="medications"
            value={profileData.medications} 
            isEditing={isEditing}
            onChange={handleInputChange}
          />
          <ProfileField 
            label="Past Surgeries" 
            name="pastSurgeries"
            value={profileData.pastSurgeries} 
            isEditing={isEditing}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-6">
        {isEditing ? (
          <>
            <Button 
              onClick={handleSaveProfile} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </Button>
            <Button 
              onClick={() => setIsEditing(false)} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit Profile
            </Button>
            <Button 
              onClick={() => alert('Change Password')} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Change Password
            </Button>
            </>
        )}
      </div>
    </div>
  );
}
  
// const ProfileField = ({ label, value }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 300);
//     return () => clearTimeout(timer);
//   }, []);
// return(
//   <div  className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
//     <p className="text-slate-400">{label} </p>
//     <p className="font-semibold">{value}</p>
//   </div>
//   )
// }


const ProfileField = ({ label, name, value, isEditing, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
      <p className="text-slate-400">{label}</p>
      {isEditing ? (
        <Input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1"
        />
      ) : (
        <p className="font-semibold">{value}</p>
      )}
    </div>
  );
}

export default AdminDashboard;
