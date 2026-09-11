import React from 'react'
import WorkHero from '@/components/sections/works/WorkHero'
import SelectedWork from '@/components/sections/works/SelectedWork'
import { WORK_ITEMS } from '@/data/works'

const WorksPage = () => {
  return (
    <div>
    <WorkHero />
    <SelectedWork title="All Projects" items={WORK_ITEMS} />
    </div>
  )
}

export default WorksPage