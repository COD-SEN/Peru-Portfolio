export function WindowSkeleton() {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      <div>
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
      </div>
      
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded-lg"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}
