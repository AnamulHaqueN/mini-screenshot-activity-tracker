"use client";
import EmployeeSelect from "@/components/employee-select";
import { useEmployee } from "@/queries/employees";
import React from "react";

const page = () => {
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

export default page;
