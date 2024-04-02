import { Controller } from "react-hook-form";

const classes =
  "py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-black dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600";

const pinClasses =
  "block size-[38px] text-center border border-gray-300 rounded-md text-sm placeholder:text-gray-300 focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none dark:bg-black dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600";

export default function CustomInput({
  name,
  variant = "flat",
  radius = "sm",
  error,
  rules,
  isRequired = false,
  placeholder = ` `,
  control,
  label,
  pin = false,
  adorn,
  ...rest
}) {
  return (
    <div>
      {label && (
        <label for="username" className="block text-sm mb-2 dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        {control ? (
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
              <input
                {...(pin && { "data-hs-pin-input-item": true })}
                isRequired={isRequired}
                variant={variant}
                radius={radius}
                error={fieldState.error}
                placeholder={placeholder}
                className={` ${pin ? pinClasses : classes} ${
                  error ? "border-red-500" : ""
                }`}
                {...field}
                {...rest}
              />
            )}
          />
        ) : (
          <input
            className={`${classes} ${error ? "border-red-500" : ""}`}
            name={name}
            isRequired={isRequired}
            variant={variant}
            radius={radius}
            placeholder={placeholder}
            {...rest}
          />
        )}
        {adorn}
      </div>
      {error && error.message ? (
        <p variant="span" className="text-red-500 mt-1">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
