import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [targetJob, setTargetJob] = useState(null);
  const [assessmentData, setAssessmentData] = useState({});

  return (
    <UserContext.Provider value={{ targetJob, setTargetJob, assessmentData, setAssessmentData }}>
      {children}
    </UserContext.Provider>
  );
};
