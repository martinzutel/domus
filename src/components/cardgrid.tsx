import CardComponent from "@/components/cardcomponent";

const CardGrid = () => {
  
  const mockData = [
    {
      title: "nacho vigi",
      description: "yo le ensenio a martin todo",
      image: "/images/puppys.jpg", 
    },
    {
      title: "gal gadot",
      description: "me gusta mucho el pollo",
      image: "/images/puppys.jpg",
    },

    {
      title: "nacho vigi",
      description: "yo le ensenio a martin todo",
      image: "/images/puppys.jpg", 
    },
    {
      title: "gal gadot",
      description: "me gusta mucho el pollo",
      image: "/images/puppys.jpg", 
    },

    {
      title: "nacho vigi",
      description: "yo le ensenio a martin todo",
      image: "/images/puppys.jpg",
    },
    {
      title: "gal gadot",
      description: "me gusta mucho el pollo",
      image: "/images/puppys.jpg", 
    },

    {
      title: "nacho vigi",
      description: "yo le ensenio a martin todo",
      image: "/images/puppys.jpg", 
    },
    {
      title: "gal gadot",
      description: "me gusta mucho el pollo",
      image: "/images/puppys.jpg",
    },
    {
      title: "nacho vigi",
      description: "yo le ensenio a martin todo",
      image: "/images/puppys.jpg",
    },
    {
      title: "gal gadot",
      description: "me gusta mucho el pollo",
      image: "/images/puppys.jpg",
    },
   
  ];

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-[40px] bg-maincolor w-[1040px] justify-center mt-[120px]">
        {mockData.map((item, index) => (
          <CardComponent
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div> 
  );
};

export default CardGrid;
