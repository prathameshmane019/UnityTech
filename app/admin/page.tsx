import React from 'react'
import DashboardCard from '../components/DashBoardCard'

const page = () => {
  return (
    <div>
      <DashboardCard  title='Users' value='4'/>
      <DashboardCard  title='Services' value='2'/>
      <DashboardCard  title='Subscriptions' value='6'/>
    </div>
  )
}

export default page
