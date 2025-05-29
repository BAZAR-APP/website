'use client'
import Header from '@/components/Header/Header';
import React from 'react';

const Index = () => {
  // const { properties, loading } = useProperties();
  // const [currentPage, setCurrentPage] = useState(1);
  // // const [sortBy, setSortBy] = useState('recommended');
  
  // const propertiesPerPage = 9;
  // const totalPages = Math.ceil(properties.length / propertiesPerPage);
  
  // const currentProperties = properties.slice(
  //   (currentPage - 1) * propertiesPerPage,
  //   currentPage * propertiesPerPage
  // );

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <Header />
  //       {/* <SearchHeader /> */}
  //       <div className="flex">
  //         <div className="w-80 bg-white border-r border-gray-200 p-6">
  //           <div className="animate-pulse">
  //             <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
  //             <div className="space-y-2">
  //               {[...Array(8)].map((_, i) => (
  //                 <div key={i} className="h-3 bg-gray-200 rounded w-full"></div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex-1 p-6">
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //             {[...Array(9)].map((_, i) => (
  //               <div key={i} className="bg-white rounded-xl shadow-md animate-pulse">
  //                 <div className="h-48 bg-gray-200 rounded-t-xl"></div>
  //                 <div className="p-4">
  //                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
  //                   <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
  //                   <div className="h-3 bg-gray-200 rounded w-full"></div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#FDFDFE]">
      <Header />
      {/* <SearchHeader /> */}
      
      <div className="flex">
        {/* <FilterSidebar /> */}
        
        <div className="flex-1 p-6">
          {/* <ResultsHeader
            location="Al Khobar"
            totalResults={2555}
            sortBy={sortBy}
            onSortChange={setSortBy}
          /> */}
          
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div> */}
          
          {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
