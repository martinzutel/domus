import Profile from '@/components/interests/profile';
import React from 'react';

export default function Page() {
  return (
    <div>
      <Profile
        id="1"
        name="John Doe"
        about="I am a software engineer with over a decade of experience in developing robust web applications. My expertise spans across various technologies, including React, Node.js, and Python. I am passionate about open-source projects, continuously contributing to the community by developing tools and libraries that make developers' lives easier. When I’m not coding, you can find me exploring the latest trends in technology, reading sci-fi novels, or hiking in the mountains."
        image="https://via.placeholder.com/300" // Example URL; replace with actual image URL
        interests={['Coding', 'Open-Source', 'Sci-Fi', 'Hiking']}
      />
    </div>
  );
}
