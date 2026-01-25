"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import { format, subDays, addDays, isToday, parseISO } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { GroupedScreenshotsInfo, Screenshot } from "@/types/screenshot";
import { useScreenshots } from "@/queries/screenshots";
import ScreenshotCard from "../screenshot/ScreenshotCard";

type ViewMode = "timeline" | "hourly" | "detailed";

export default function EmployeeScreenshotsPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params?.id as string;

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");

  const [expandedHours, setExpandedHours] = useState<Set<number>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Modal state
  const [, setModalOpen] = useState(false);
  const [, setModalScreenshot] = useState<Screenshot | null>(null);

  const { data, isPending: isLoading, error } = useScreenshots(Number(employeeId), selectedDate)

  // Convert API response to flat array of groups
  const getGroups = (): GroupedScreenshotsInfo[] => {
    if (!data) return [];
    const groups: GroupedScreenshotsInfo[] = [];

    data.groupedScreenshotsArray.forEach((groupedScreenshots) => {
      groups.push(groupedScreenshots);
   });

    return groups.sort((a, b) => {
      if (a.hour !== b.hour) return a.hour - b.hour;
      return a.minuteBucket - b.minuteBucket;
    });
  };
  const groupedScreenshots = getGroups();

  const getHourlyGroups = () => {
    const groups = getGroups();
    const hourlyMap = new Map<number, GroupedScreenshotsInfo[]>();

    groups.forEach((group) => {
      if (!hourlyMap.has(group.hour)) {
        hourlyMap.set(group.hour, []);
      }
      hourlyMap.get(group.hour)!.push(group);
    });

    return Array.from(hourlyMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([hour, groups]) => ({
        hour,
        groups,
        totalCount: groups.reduce((sum, g) => sum + g.count, 0),
      }));
  };

  const toggleHour = (hour: number) => {
    const newExpanded = new Set(expandedHours);
    if (newExpanded.has(hour)) {
      newExpanded.delete(hour);
    } else {
      newExpanded.add(hour);
    }
    setExpandedHours(newExpanded);
  };

  const toggleGroup = (hour: number, minuteBucket: number) => {
    const key = `${hour}-${minuteBucket}`;
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedGroups(newExpanded);
  };

  const expandAll = () => {
    if (!data) return;
    if (viewMode === "hourly") {
      const allHours = new Set(data.groupedScreenshotsArray.map(g => g.hour));
      setExpandedHours(allHours);
    } else {
      const allGroups = new Set<string>();
      data.groupedScreenshotsArray.forEach((group) => {
         allGroups.add(`${group.hour}-${group.minuteBucket}`);
      });
      setExpandedGroups(allGroups);
    }
  };

  const collapseAll = () => {
    setExpandedHours(new Set());
    setExpandedGroups(new Set());
  };

  const goToPreviousDay = () => {
    const date = parseISO(selectedDate);
    setSelectedDate(format(subDays(date, 1), "yyyy-MM-dd"));
  };

  const goToNextDay = () => {
    const date = parseISO(selectedDate);
    const nextDay = addDays(date, 1);
    if (nextDay <= new Date()) {
      setSelectedDate(format(nextDay, "yyyy-MM-dd"));
    }
  };

  const goToToday = () => {
    setSelectedDate(format(new Date(), "yyyy-MM-dd"));
  };

  const openModal = (screenshot: Screenshot) => {
    setModalScreenshot(screenshot);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {data?.employee.name || "Employee"} - Screenshots
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousDay}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                title="Previous day"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={format(new Date(), "yyyy-MM-dd")}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />

              <button
                onClick={goToNextDay}
                disabled={isToday(parseISO(selectedDate))}
                className="p-2 hover:bg-gray-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next day"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              {!isToday(parseISO(selectedDate)) && (
                <button
                  onClick={goToToday}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                  Today
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  viewMode === "timeline"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setViewMode("hourly")}
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  viewMode === "hourly"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Hourly
              </button>
              <button
                onClick={() => setViewMode("detailed")}
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  viewMode === "detailed"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {data && !isLoading && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {format(parseISO(selectedDate), "MMMM d, yyyy")}
                  {isToday(parseISO(selectedDate)) && (
                    <span className="ml-2 text-blue-600 font-medium">(Today)</span>
                  )}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {data.statistics.totalScreenshots} screenshot
                  {data.statistics.totalScreenshots !== 1 ? "s" : ""}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {data.statistics.hoursActive} hour{data.statistics.hoursActive !== 1 ? 's' : ''} active
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-600 font-medium">Error loading screenshots</p>
              <p className="text-sm text-red-600 mt-1">{error.message}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading screenshots...</p>
          </div>
        )}

        {!isLoading && data && groupedScreenshots.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No screenshots found</h3>
          </div>
        )}

        {/* Timeline View */}
        {!isLoading && data && groupedScreenshots.length > 0 && viewMode === "timeline" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {groupedScreenshots.flatMap((group) => group.screenshots).map((screenshot) =>
               <ScreenshotCard
                  key={crypto.randomUUID()}
                  screenshot={screenshot}
                  openModal={openModal}
               />
            )}
          </div>
        )}

        {/* Hourly View */}
        {!isLoading && data && groupedScreenshots.length > 0 && viewMode === "hourly" && (
          <div className="space-y-4">
            {getHourlyGroups().map(({ hour, groups, totalCount }) => {
              const isExpanded = expandedHours.has(hour);

              return (
                <div key={hour} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleHour(hour)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}

                      <div className="text-left">
                        <div className="text-xl font-bold text-gray-900">
                          {String(hour).padStart(2, "0")}:00
                        </div>
                        <div className="text-sm text-gray-600">
                          {totalCount} screenshot{totalCount !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {groups.flatMap((group) => group.screenshots.map((screenshot) => 
                           <ScreenshotCard
                              key={crypto.randomUUID()}
                              screenshot={screenshot}
                              openModal={openModal}
                           />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed View */}
        {!isLoading && data && groupedScreenshots.length > 0 && viewMode === "detailed" && (
          <div className="space-y-4">
            {groupedScreenshots.map((group) => {
              const isExpanded = expandedGroups.has(`${group.hour}-${group.minuteBucket}`);

              return (
                <div key={`${group.hour}-${group.minuteBucket}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleGroup(group.hour, group.minuteBucket)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}

                      <div className="text-left">
                        <div className="text-lg font-semibold text-gray-900">{group.timeRange}</div>
                        <div className="text-sm text-gray-600">
                          {group.count} screenshot{group.count !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {group.screenshots.map((screenshot) => 
                           <ScreenshotCard
                              key={crypto.randomUUID()}
                              screenshot={screenshot}
                              openModal={openModal}
                           />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}