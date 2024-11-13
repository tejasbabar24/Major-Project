import React from 'react';
import { Avatar } from '@mui/material';

function Announcements({ classData, assignment }) {
  // Format the createdAt date
  const formattedDate = new Date(assignment.createdAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="p-4 space-y-6 mt-6">
      <div
        className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition transform hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="p-4">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Avatar
                className="w-12 h-12"
                alt={classData.owner}
                src="/static/images/avatar/1.jpg" // Replace with actual avatar URL if available
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{classData.owner.toUpperCase()}</h3>
                <p className="text-sm text-gray-500">Posted an assignment</p>
              </div>
            </div>
            {/* Date Section */}
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>
          {/* Content Section */}
          <h4 className="text-xl font-medium text-gray-800 mb-2">{assignment.title}</h4>
          {assignment.attachment && (
            <img
              className="h-36 w-36 max-w-md rounded-lg object-cover"
              src={assignment.attachment}
              alt={assignment.title}
            />
          )}
        </div>
        {/* Footer Section */}
        <div className="bg-gray-50 p-3 border-t border-gray-200">
          <p className="text-sm text-gray-500">Class ID: {classData.classCode}</p>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
