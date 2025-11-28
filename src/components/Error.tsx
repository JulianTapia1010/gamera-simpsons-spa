interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
      <h2 className="text-xl font-bold text-red-700 mb-2">❌ Error</h2>
      <p className="text-gray-700">{message}</p>
    </div>
  );
}