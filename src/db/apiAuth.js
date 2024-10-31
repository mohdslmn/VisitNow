// import supabase from "./supabase";

// export async function login({email,password}) {
//    const [data , error] = await supabase.auth.signInWithPassword({
//         email,
//         password,
//     });
//     if(error) throw new Error(error.message);

//     return data;

// }
import { data } from "autoprefixer";
import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getCurrentUsers() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}
export async function signup({ name, email, password, profile_pic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);
 const {data,error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });
  if(error) throw new Error(error.message);

  return data;
}
export async function logout() {
  const {error} = await supabase.auth.signOut();
  if(error) throw new Error(error.message);
  
}

// export async function bookAppointment(appointmentData) {
//   console.log('Appointment data being sent:', appointmentData);

//   // Check user session
//   const { data: { session }, error: sessionError } = await supabase.auth.getSession();
//   if (sessionError) {
//     console.error('Session error:', sessionError);
//     throw new Error('Failed to get user session');
//   }
//   console.log('User session:', session);

//   if (!session) {
//     throw new Error('User is not authenticated');
//   }

//   const { doctor_id } = appointmentData; // Extract doctor ID from appointment data

//   // Fetch the last appointment for the doctor
//   const { data: lastAppointment } = await supabase
//     .from('appointments')
//     .select('probable_start_time')
//     .eq('doctor_id', doctor_id)
//     .order('probable_start_time', { ascending: false })
//     .limit(1);

//   // Calculate the probable start time
//   const { data: clinicData } = await supabase
//     .from('doctors')
//     .select('clinic_start_time')
//     .eq('id', doctor_id)
//     .single();

//   const probableStartTime = lastAppointment.length > 0
//     ? new Date(new Date(lastAppointment[0].probable_start_time).getTime() + 15 * 60000) // Add 15 minutes
//     : new Date(clinicData.clinic_start_time); // Use clinic start time if no last appointment

//   // Attempt to insert the appointment with the calculated probable start time
//   const { data, error } = await supabase
//     .from('appointments')
//     .insert({
//       ...appointmentData,
//       probable_start_time: probableStartTime,
//       status: 'waiting',
//     })
//     .select();

//   if (error) {
//     console.error('Supabase error:', error);
//     // Log more details about the error
//     if (error.details) console.error('Error details:', error.details);
//     if (error.hint) console.error('Error hint:', error.hint);
//     throw error;
//   }

//   console.log('Inserted appointment:', data);
//   return data;
// }

// // export async function fetchWaitingAppointments() {
// //   const { data, error } = await supabase
// //     .from('appointments')
// //     .select('*')
// //     .eq('status', 'waiting',"in_progress");

// //   if (error) {
// //     console.error('Error fetching appointments:', error);
// //     throw error;
// //   }

// //   return data;
// // }
// export async function fetchWaitingAppointments() {
//   try {
//     const { data, error } = await supabase
//       .from('appointments')
//       .select('*')
//       .or('status.eq.waiting,status.eq.in_progress');

//     if (error) {
//       console.error('Error fetching appointments:', error);
//       throw error; // Rethrow the error for further handling
//     }

//     // Check if data is null or undefined
//     if (!data) {
//       console.error('No data returned from fetchWaitingAppointments');
//       return []; // Return an empty array if no data
//     }

//     return data;
//   } catch (err) {
//     console.error('Error fetching appointments:', err);
//     throw err; // Rethrow the error for further handling
//   }
// }
// // Change Status to In Progress
// // When it's time for a patient's appointment to start (after their estimated wait time), update their status from "Waiting" to "In Progress".

// export const updateAppointmentStatus = async (appointmentId, newStatus) => {
//   const { error } = await supabase
//     .from('appointments')
//     .update({ status: newStatus })
//     .eq('id', appointmentId);

//   if (error) {
//     console.error('Error updating status:', error);
//   }
// };

// // Automatically Change Status After Estimated Time
// // You can set up a timer or use an interval to check the current time against the probable_start_time of each appointment. When the current time exceeds this value, change the status.
// const checkAndUpdateAppointments = async () => {
//   const { data: appointments } = await supabase
//     .from('appointments')
//     .select('*')
//     .or('status.eq.waiting,status.eq.in-progress');

//   appointments.forEach(async (appointment) => {
//     const currentTime = new Date();
//     const startTime = new Date(appointment.probable_start_time);
//     const estimatedCompletionTime = new Date(startTime.getTime() + (appointment.estimated_wait_time * 60000)); // Convert minutes to milliseconds
//     console.log(`Current Time: ${currentTime}, Start Time: ${startTime}, Estimated Completion: ${estimatedCompletionTime}, Status: ${appointment.status}`);

//     if (currentTime >= estimatedCompletionTime && appointment.status === 'in-progress') {
//       await updateAppointmentStatus(appointment.id, 'completed');
//     } else if (currentTime >= startTime && appointment.status === 'waiting') {
//       await updateAppointmentStatus(appointment.id, 'in-progress');
//     }
//   });
// };

// // Call this function periodically (e.g., every minute)
// setInterval(checkAndUpdateAppointments, 60000);

// // Handling New Appointments
// // When a new patient books an appointment, calculate their wait time based on existing appointments that have not yet been completed or are in progress. The calculation should consider both "In Progress" and "Waiting" statuses.

// export const calculateWaitTimeForNewAppointment = async () => {
//   const { data: waitingAppointments } = await supabase
//     .from('appointments')
//     .select('*')
//     .or('appointment_status.eq.waiting,appointment_status.eq.in-progress');

//   const waitingCount = waitingAppointments.length;
//   const averageDuration = 1; // Assume each appointment takes 15 minutes

//   return waitingCount * averageDuration; // Total estimated wait time in minutes
// };


// export async function bookAppointment(appointmentData) {
//   console.log('Appointment data being sent:', appointmentData);

//   const { data: { user } } = await supabase.auth.getUser()
//   if (!user) throw new Error('User not authenticated')

  

//   const { data: { session }, error: sessionError } = await supabase.auth.getSession();
//   if (sessionError) {
//     console.error('Session error:', sessionError);
//     throw new Error('Failed to get user session');
//   }

//   if (!session) {
//     throw new Error('User is not authenticated');
//   }

//   const { doctor_id, patient_name, age, problem } = appointmentData;

//   // Fetch the last appointment for the doctor
//   const { data: lastAppointment, error: lastAppointmentError } = await supabase
//     .from('appointments')
//     .select('probable_start_time')
//     .eq('doctor_id', doctor_id)
//     .order('probable_start_time', { ascending: false })
//     .limit(1);

//   if (lastAppointmentError) {
//     console.error('Error fetching last appointment:', lastAppointmentError);
//     throw lastAppointmentError;
//   }

//   // Fetch the doctor's clinic start time
//   const { data: doctorData, error: doctorError } = await supabase
//     .from('doctors')
//     .select('clinic_start_time')
//     .eq('id', doctor_id)
//     .single();

//   if (doctorError) {
//     console.error('Error fetching doctor data:', doctorError);
//     throw doctorError;
//   }

//   const now = new Date();
//   const clinicStartTime = new Date(now.toDateString() + ' ' + doctorData.clinic_start_time);
  
//   let probableStartTime;
//   let estimatedWaitTime;

//   if (lastAppointment && lastAppointment.length > 0) {
//     probableStartTime = new Date(lastAppointment[0].probable_start_time);
//     probableStartTime.setMinutes(probableStartTime.getMinutes() + 15); // Add 15 minutes for next appointment
//     estimatedWaitTime = Math.max(0, Math.ceil((probableStartTime.getTime() - now.getTime()) / (1000 * 60)));
//   } else {
//     probableStartTime = clinicStartTime > now ? clinicStartTime : now;
//     estimatedWaitTime = 0; // First appointment of the day
//   }

//   // Attempt to insert the appointment
//   const { data, error } = await supabase
//     .from('appointments')
//     .insert({
//       doctor_id,
//       patient_name,
//       age,
//       problem,
//       probable_start_time: probableStartTime.toISOString(),
//       estimated_wait_time: estimatedWaitTime,
//       status: estimatedWaitTime === 0 ? 'in-progress' : 'waiting',
//     })
//     .select();

//   if (error) {
//     console.error('Supabase error:', error);
//     throw error;
//   }

//   console.log('Inserted appointment:', data);
//   return data;
// }

export async function bookAppointment(appointmentData) {
  console.log('Appointment data being sent:', appointmentData);

  // Get authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error('User error:', userError);
    throw new Error('Failed to get user data');
  }

  // Extract user email for RLS
  const userEmail = user.email;
  if (!userEmail) {
    throw new Error('User email not found');
  }

  const { doctor_id, patient_name, age, problem } = appointmentData;

  // Fetch the last appointment for the doctor
  const { data: lastAppointment, error: lastAppointmentError } = await supabase
    .from('appointments')
    .select('probable_start_time')
    .eq('doctor_id', doctor_id)
    .order('probable_start_time', { ascending: false })
    .limit(1);

  if (lastAppointmentError) {
    console.error('Error fetching last appointment:', lastAppointmentError);
    throw lastAppointmentError;
  }

  // Fetch the doctor's clinic start time
  const { data: doctorData, error: doctorError } = await supabase
    .from('doctors')
    .select('clinic_start_time')
    .eq('id', doctor_id)
    .single();

  if (doctorError) {
    console.error('Error fetching doctor data:', doctorError);
    throw doctorError;
  }

  const now = new Date();
  const clinicStartTime = new Date(now.toDateString() + ' ' + doctorData.clinic_start_time);
  
  let probableStartTime;
  let estimatedWaitTime;

  if (lastAppointment && lastAppointment.length > 0) {
    probableStartTime = new Date(lastAppointment[0].probable_start_time);
    probableStartTime.setMinutes(probableStartTime.getMinutes() + 15); // Add 15 minutes for next appointment
    estimatedWaitTime = Math.max(0, Math.ceil((probableStartTime.getTime() - now.getTime()) / (1000 * 60)));
  } else {
    probableStartTime = clinicStartTime > now ? clinicStartTime : now;
    estimatedWaitTime = 0; // First appointment of the day
  }

  // Attempt to insert the appointment with user_email
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      doctor_id,
      patient_name,
      age,
      problem,
      probable_start_time: probableStartTime.toISOString(),
      estimated_wait_time: estimatedWaitTime,
      status: estimatedWaitTime === 0 ? 'in-progress' : 'waiting',
      user_email: userEmail, // Add user email for RLS
    })
    .select();

  if (error) {
    console.error('Supabase error:', error);
    throw error;
  }

  console.log('Inserted appointment:', data);
  return data;
}
export async function fetchWaitingAppointments() {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .or('status.eq.waiting,status.eq.in_progress')
      .order('probable_start_time', { ascending: true });

    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching appointments:', err);
    throw err;
  }
}

export async function updateAppointmentStatus(appointmentId, newStatus) {
  const { data, error } = await supabase
    .from('appointments')
    .update({ status: newStatus })
    .eq('id', appointmentId)
    .select();

  if (error) {
    console.error('Error updating status:', error);
    throw error;
  }

  return data;
}

export async function removeCompletedAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .delete()
    .eq('status', 'completed');

  if (error) {
    console.error('Error removing completed appointments:', error);
    throw error;
  }

  return data;
}

export async function updateWaitTimes() {
  const { data: appointments, error: fetchError } = await supabase
    .from('appointments')
    .select('*')
    .or('status.eq.waiting,status.eq.in_progress')
    .order('probable_start_time', { ascending: true });

  if (fetchError) {
    console.error('Error fetching appointments:', fetchError);
    throw fetchError;
  }

  const now = new Date();
  const updates = appointments.map((appointment, index) => {
    const probableStartTime = new Date(appointment.probable_start_time);
    const estimatedWaitTime = Math.max(0, index * 1); // 1 minute per patient
    const status = index === 0 ? 'in-progress' : 'waiting';

    return {
      id: appointment.id,
      estimated_wait_time: estimatedWaitTime,
      status: status,
    };
  });

  const { data, error } = await supabase
    .from('appointments')
    .upsert(updates);

  if (error) {
    console.error('Error updating wait times:', error);
    throw error;
  }

  return data;
}

export async function cancelAppointment(appointmentId) {
  const { data, error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', appointmentId);

  if (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }

  return data;
}

// export async function fetchWaitingAppointments() {
//   try {
//     const { data, error } = await supabase
//       .from('appointments')
//       .select('*')
//       .or('status.eq.waiting,status.eq.in_progress')
//       .order('probable_start_time', { ascending: true });

//     if (error) {
//       console.error('Error fetching appointments:', error);
//       throw error;
//     }

//     return data || [];
//   } catch (err) {
//     console.error('Error fetching appointments:', err);
//     throw err;
//   }
// }

// export async function updateAppointmentStatus(appointmentId, newStatus) {
//   const { data, error } = await supabase
//     .from('appointments')
//     .update({ status: newStatus })
//     .eq('id', appointmentId)
//     .select();

//   if (error) {
//     console.error('Error updating status:', error);
//     throw error;
//   }

//   return data;
// }

// export async function removeCompletedAppointments() {
//   const { data, error } = await supabase
//     .from('appointments')
//     .delete()
//     .eq('status', 'completed');

//   if (error) {
//     console.error('Error removing completed appointments:', error);
//     throw error;
//   }

//   return data;
// }

// export async function updateWaitTimes() {
//   const { data: appointments, error: fetchError } = await supabase
//     .from('appointments')
//     .select('*')
//     .or('status.eq.waiting,status.eq.in_progress')
//     .order('probable_start_time', { ascending: true });

//   if (fetchError) {
//     console.error('Error fetching appointments:', fetchError);
//     throw fetchError;
//   }

//   const now = new Date();
//   const updates = appointments.map((appointment, index) => {
//     const probableStartTime = new Date(appointment.probable_start_time);
//     const estimatedWaitTime = Math.max(0, Math.ceil((probableStartTime.getTime() - now.getTime()) / (1000 * 60)));
//     const status = index === 0 ? 'in-progress' : 'waiting';

//     return {
//       id: appointment.id,
//       estimated_wait_time: estimatedWaitTime,
//       status: status,
//     };
//   });

//   const { data, error } = await supabase
//     .from('appointments')
//     .upsert(updates);

//   if (error) {
//     console.error('Error updating wait times:', error);
//     throw error;
//   }

//   return data;
// }

// export async function cancelAppointment(appointmentId) {
//   const { data, error } = await supabase
//     .from('appointments')
//     .delete()
//     .eq('id', appointmentId);

//   if (error) {
//     console.error('Error cancelling appointment:', error);
//     throw error;
//   }

//   return data;
// }
