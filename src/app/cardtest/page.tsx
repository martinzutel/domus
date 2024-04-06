import CardComponent from "@/components/cardcomponent";

const YourPage = () => {
  // Simulated data
  const mockData = [
    {
      title: 'nacho vigi',
      description: 'yo le ensenio a martin todo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },
    {
      title: 'gal gadot',
      description: 'me gusta mucho el pollo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },

    {
      title: 'nacho vigi',
      description: 'yo le ensenio a martin todo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },
    {
      title: 'gal gadot',
      description: 'me gusta mucho el pollo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },

    {
      title: 'nacho vigi',
      description: 'yo le ensenio a martin todo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },
    {
      title: 'gal gadot',
      description: 'me gusta mucho el pollo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },

    {
      title: 'nacho vigi',
      description: 'yo le ensenio a martin todo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },
    {
      title: 'gal gadot',
      description: 'me gusta mucho el pollo',
      image: '/images/puppys.jpg', // Replace this with your image URL
    },
    // Add more objects as needed
  ];

  return (
    <div className="grid gap-x-2 gap-y-8 grid-cols-6 content-start justify-items-center bg-maincolor h-screen px-20 py-20">
      {mockData.map((item, index) => (
        <CardComponent
          key={index}
          title={item.title}
          description={item.description}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default YourPage;
