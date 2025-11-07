
import { Card, CardContent, CardHeader, CardTitle } from "ui";

export const DashboardSkeleton = () => {
  return (
    <div className="w-screen animate-pulse">
      <div className="text-3xl text-[#6a51a6] pt-4 mb-4 font-bold">
        <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-48"></div>
      </div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-24"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-48"></div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-24"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-48"></div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-24"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-48"></div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-24"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded-md dark:bg-gray-700 w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-48"></div>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-3xl lg:ml-32">
          <div className="h-96 bg-gray-200 rounded-md dark:bg-gray-700"></div>
        </div>
      </main>
    </div>
  );
};
