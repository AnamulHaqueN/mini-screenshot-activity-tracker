"use client";
import { useEmployee } from "@/queries/employees";

function Page () {
  const { data, isPending, isError, error } = useEmployee();

  return (
    <div>
      {data?.map((employee) => (
        <p key={employee.id}>Name - {employee.name}</p>
      ))}
    </div>
  );
};

export default Page
