import React from 'react'
import { Flex, Link, Text } from '@radix-ui/themes'

const Navigation = () => {
  return (
    <Flex gap="5" align="center">
      <Link href="#" underline="none">
        <Text size="2" weight="medium" color="indigo">
          Home
        </Text>
      </Link>
      <Link href="#" underline="none">
        <Text size="2" weight="medium" color="indigo">
          Explore
        </Text>
      </Link>
      <Link href="#" underline="none">
        <Text size="2" weight="medium" color="indigo">
          My Bookings
        </Text>
      </Link>
      <Link href="#" underline="none">
        <Text size="2" weight="medium" color="indigo">
          Loyalty Points
        </Text>
      </Link>
    </Flex>
  )
}

export default Navigation
