import React from 'react';
import ProfileCard from './components/ProfileCard.jsx';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ProfileCard
        name="Sophia Martinez"
        age={34}
        bio="Sophia is a passionate UX designer who loves creating intuitive user experiences. In her free time, she enjoys painting, cycling, and mentoring junior designers in her community."
      />
    </div>
  );
}

export default App;
