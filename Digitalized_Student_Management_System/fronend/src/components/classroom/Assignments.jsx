import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

function Announcements({ classData, assignment }) {
  // Format the createdAt date
  const formattedDate = new Date(assignment.createdAt).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    // Extract file extension to determine file type
    const extension = assignment.attachment.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
      setFileType('image');
    } else if (['pdf'].includes(extension)) {
      setFileType('pdf');
    } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
      setFileType('video');
    } else {
      setFileType('unknown');
    }
  }, [assignment.attachment])

  const renderPreview = () => {
    switch (fileType) {
      case 'image':
        return <img className='cursor-pointer h-36 w-36' onClick={()=> {console.log("hello");
        }} src={assignment.attachment}  alt="Image Preview" />;
      case 'pdf':
        return (
          <iframe
            src={assignment.attachment}
            className='h-36 w-36'
            style={{ border: 'none' }}
            title="PDF Preview"
          />
        );
      case 'video':
        return (
          <video className='h-36 w-36'
          controls>
            <source src={assignment.attachment} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'unknown':
        return <div>File format not supported for preview</div>;
      default:
        return null;
    }
  };

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
            renderPreview()
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
