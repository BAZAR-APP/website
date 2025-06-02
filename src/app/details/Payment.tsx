import Button from '@/components/Button/Button'
import React from 'react'

type PaymentProps = {
  onNext: () => void
}
const Payment: React.FC<PaymentProps> = ({ onNext }) => {
  return (
    <div>
      Payment
      <Button onClick={() => onNext()} className='bg-green-500'>Next</Button>
    </div>
  )
}

export default Payment
