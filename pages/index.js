import CustomCheckbox from "@/components/CustomCheckbox";
import CustomPagination from "@/components/CustomPagination";
import { getUser } from "@/utils/auth";
import { generateData } from "@/utils/constants";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const user = getUser();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data?.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, data]);

  useEffect(()=>{
    setData(user?.interests)
  }, [currentPage])

  console.log(data)

  return (
    <main className="w-full max-w-lg mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-[32px] font-bold text-gray-800 dark:text-white">
              Please mark your interests!
            </h1>
            <br />
            <p>We will keep you notified.</p>
          </div>
          <div className="mt-10 space-y-6 overflow-hidden">
            <p className="text-xl text-black">My saved interests!</p>
            <CustomCheckbox data={currentItems} currentPage={currentPage} />
            <CustomPagination
              currentPage={currentPage}
              totalCount={data?.length}
              pageSize={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
