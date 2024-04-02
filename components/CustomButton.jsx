export default function CustomButton({
  children,
  className,
  loading,
  ...rest
}) {
  return (
    <button
      className={`uppercase w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-black text-white hover:bg-black disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></span>
      )}
      {children}
    </button>
  );
}
