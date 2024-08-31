import Image from 'next/image';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-5">
      <div className="text-center">
        <Image
          src="/Pokebola.png" 
          alt="Pokébola"
          width={100}
          height={100}
          className="animate-spin mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">¡Oh no!</h1>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
