"use client";
import { useEmployee } from "@/queries/employees";
import React from "react";

const page = () => {
  const { data, isPending, isError, error } = useEmployee();

  return (
    <div>
      {data?.map((employee) => (
        <p key={employee.id}>Name - {employee.name}</p>
      ))}
    </div>
  );
};

export default page;
