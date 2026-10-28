import React from 'react'
import WorkHero from '@/components/sections/works/WorkHero'
import SelectedWork from '@/components/sections/works/SelectedWork'

const WorksPage = () => {
  return (
    <div>
      <WorkHero />
      <SelectedWork title="All Projects" />
    </div>
  )
}

export default WorksPage