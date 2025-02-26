import React from "react"

const Shimmer = ({ count }: { count: number }) => {
  const ShimmerBlock = (
    <div className="flex flex-col w-full  animate-pulse m-auto px-5 py-11 rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-11 rounded bg-gray-200"></div>
        <div className="col-span-1 h-11 rounded bg-gray-200"></div>
      </div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-10 mt-4 rounded bg-gray-200"></div>
        <div className="flex justify-end gap-x-4">
          <div className="w-20 h-11 bg-gray-200 rounded"></div>
          <div className="w-20 h-11 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-4 rounded bg-gray-200"></div>
            <div className="col-span-1 h-4 rounded bg-gray-200"></div>
          </div>
          <div className="h-11 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, idx) => (
        <React.Fragment key={`block-${idx}`}>{ShimmerBlock}</React.Fragment>
      ))}
    </div>
  )
}

export default Shimmer
