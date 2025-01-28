import React from 'react';
import { useParams } from 'react-router-dom';

const DetailProject = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Detail Project Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default DetailProject;
