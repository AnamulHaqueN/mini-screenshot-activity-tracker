"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import {addEmployeeSchema, AddEmployeeInput} from "../../schemas/employee"
import { useAddEmployee } from "@/queries/employees";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type FieldErrors = {
  name?: string
  email?: string;
  password?: string;
}

export default function AddEmployeeModal({
  isOpen,
  onClose,
  onSuccess,
}: AddEmployeeModalProps) {
  
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const {mutateAsync, isPending, isError, error} = useAddEmployee();
  const router = useRouter();
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const validatedData: AddEmployeeInput = addEmployeeSchema.parse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });

      await mutateAsync(validatedData);
      
      onSuccess();
      onClose();
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: FieldErrors = {};
        
        for (const issue of err.issues) {
          const field = issue.path[0];
          
          if (typeof field === "string") {
            errors[field as keyof FieldErrors] = issue.message;
          }
        }
        
        setFieldErrors(errors);
      }
      // 2. Axios / backend validation errors (422)
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          const errors: FieldErrors = {};
          const apiErrors = err.response.data?.errors;
          
          if (Array.isArray(apiErrors)) {
            apiErrors.forEach((apiError: any) => {
              if (apiError.field) {
                errors[apiError.field as keyof FieldErrors] =
                apiError.message;
              }
            });
          }
          
          setFieldErrors(errors);
        }
      }
      
    }
  };
  
  const handleClose = () => {
    if (!isPending) {
      setFieldErrors({});
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Employee</h2>
          <button
            onClick={handleClose}
            disabled={isPending}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={isPending}
            />
            {fieldErrors.name && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {fieldErrors.name}
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={isPending}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-red-600 text-sm mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password *
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={isPending}
            />
            {fieldErrors.password && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {fieldErrors.password}
                </p>
              )}
            {/* <p className="text-xs text-gray-500 mt-1">Minimum 4 characters</p> */}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}