'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getVisiblePages } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const navButtonStyles =
    'flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <nav className="flex items-center justify-between mt-8 flex-wrap gap-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={navButtonStyles}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      <div
        className="flex flex-row items-start p-0 gap-[2px]"
        role="group"
        aria-label="Page numbers"
      >
        {getVisiblePages(currentPage, totalPages).map((page) => {
          const isActive = page === currentPage
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-[40px] h-[40px] text-sm font-medium flex items-center justify-center ${isActive
                ? 'bg-[#E1F3FF] text-[#000] rounded-full'
                : 'bg-white text-gray-700 rounded-[8px] border border-gray-300 hover:bg-gray-50' // inactive page
                }`}
            >
              {page}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={navButtonStyles}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </nav>
  )
}

export default Pagination
