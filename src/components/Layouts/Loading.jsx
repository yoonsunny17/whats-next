export const Loading = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="loading loading-infinity w-20" />
      <p className="text-lg font-semibold">please wait...</p>
    </div>
  );
};
