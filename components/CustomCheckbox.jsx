import { getUser, setUser } from "@/utils/auth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CustomCheckbox({ data, currentPage }) {
  const [checkData, setCheckData] = useState(data);

  useEffect(() => {
    setCheckData(data);
  }, [data, currentPage]);

  const handleCheckboxChange = (id) => {
    const user = getUser();
    const newData = [...checkData];
  
    const updatedData = newData.map(item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setCheckData(updatedData);
  
    const updatedInterests = user.interests.map(interest => {
      if (interest.id === id) {
        return { ...interest, checked: !interest.checked };
      }
      return interest;
    });
    setUser({ ...user, interests: updatedInterests });
  
    toast.success("Saved", {
      icon: '👍',
    });
  };

  return (
    <div className="space-y-4 h-[224px]">
      {(checkData || []).map((i, index) => (
        <div key={index} className="flex items-center">
          <input
            type="checkbox"
            className="shrink-0 w-6 h-6 border-gray-200 rounded text-black focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-offset-gray-800"
            id={`hs-default-checkbox-${i?.id}`}
            checked={checkData[index]?.checked}
            onChange={() => handleCheckboxChange(i?.id)}
          />
          <label
            htmlFor={`hs-default-checkbox-${i?.id}`}
            className="text-base text-gray-500 ms-3 dark:text-gray-400"
          >
            {i?.interest}
          </label>
        </div>
      ))}
    </div>
  );
}
