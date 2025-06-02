import Button from '@/components/Button/Button'
import React from 'react'

type UserInfoProps = {
  onNext: () => void
}
const UserInfo: React.FC<UserInfoProps> = ({ onNext }) => {
  return (
    <div>
      UserInfo
      <Button onClick={() => onNext()} className='bg-red-600'>Next</Button>
    </div>
  )
}

export default UserInfo
