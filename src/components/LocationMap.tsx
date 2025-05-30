import { MapPin } from 'lucide-react'

const LocationMap = () => {
  return (
    <div className="border-b border-gray-200 pb-8 pt-8">
      <h2 className="text-xl font-semibold mb-6">Location</h2>

      <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-red-500 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Lake Tahoe, California</p>
            <p className="text-sm text-gray-500">Interactive map will load here</p>
          </div>
        </div>

        <div className="absolute top-4 left-4 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-6 right-6 w-12 h-12 bg-green-200 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-yellow-200 rounded-full opacity-50"></div>
      </div>


    </div>
  )
}

export default LocationMap
