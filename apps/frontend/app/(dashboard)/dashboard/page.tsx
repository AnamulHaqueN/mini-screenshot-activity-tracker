"use client";
import EmployeeSelect from "@/components/admin/Employees";
import { useEmployee } from "@/queries/employees";

function Page () {
  const { data, isPending, isError, error } = useEmployee();

  return (
    <div>
       <div className="max-w-md p-4">
          <EmployeeSelect />
       </div>
      {/* {data?.map((employee) => (
        <p key={employee.id}>Name - {employee.name}</p>
      ))} */}
    </div>
  );
};

export default Page
