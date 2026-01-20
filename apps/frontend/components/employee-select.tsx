"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

import { Search, UserPlus, Users, Activity } from "lucide-react";
//import AddEmployeeModal from "../../components/admin/AddEmployeeModal";
// import { addHours, format, parseISO } from "date-fns";
import { Employee } from "@/types/employee";
import { useDeleteEmployee, useEmployee, useSearchEmployee } from "@/queries/employees";
import { useAuthContext } from "@/providers/AuthProvider";

export default function AdminEmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const {data: employees = [], isPending, isError, error} = useEmployee()
  const {data: searchedEmployees = [], isPending: isSearching} = useSearchEmployee(searchTerm);
  
  console.log(employees.length)

  const isLoading = false; // isPending || isSearching;
  

//   const handleViewEmployee = (employeeId: number) => {
//     navigate(`/admin/employees/${employeeId}/screenshots`);
//   };

  const {mutateAsync} = useDeleteEmployee();

  const handleDeleteEmployee = async (id: number, name:string) => {
    if(!confirm(`Delete ${name}?`)) return;
    try {
        await mutateAsync(id);
    } catch (err) {
        alert("Failed to delete employee");
    }
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <form onSubmit={() => {}} className="flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees by name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={() => {}}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Clear
              </button>
            )}
          </form>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error.message}</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading employees...</p>
          </div>
        )}

        {!isLoading && employees.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search"
                : "Get started by adding your first employee"}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>
            )}
          </div>
        )}

        {!isLoading && employees.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Screenshots
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {employee.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {employee.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {
                            //employee.screenshot_count || 0
                            0
                            }
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {/* {employee.last_screenshot_at
                            ? format(
                                addHours(
                                  parseISO(employee.last_screenshot_at),
                                  -6
                                ),
                                "MMM d, yyyy HH:mm"
                              )
                            : "Never"} */
                            "Never"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                        //   onClick={() => handleViewEmployee(employee.id)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <span className="cursor-pointer">View</span>
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteEmployee(employee.id, employee.name)
                          }
                        //   disabled={deleteLoading === employee.id}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          {/* {deleteLoading === employee.id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                              <span>Deleting...</span>
                            </>
                          ) : (
                            <>
                              <span className="cursor-pointer">Delete</span>
                            </>
                          )} */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          useSearchEmployee(searchTerm);
        }}
      /> */}
    </div>
  );
}