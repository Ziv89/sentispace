import classes from './TemplateSelection.module.scss'

import FullscreenModal from '../shared/FullscreenModal'
import Button from '../input/button/Button'
import { db } from '../../data/Database'
import { useLiveQuery } from 'dexie-react-hooks'
import { Activity as IActivity } from '../../data/interfaces'
import Activity from '../activity/Activity'
import { IndexableType } from 'dexie'
import { useState } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'

interface TemplateSelectionProps {
  onClose: () => void
}

const TemplateSelection = ({ onClose }: TemplateSelectionProps) => {
  const activities =
    useLiveQuery<IActivity[]>(() =>
      db.activities.where('isTemplate').equals(1).toArray(),
    ) ?? []

  const [selectedActivity, setSelectedActivity] = useState<IndexableType>(0)

  return (
    <FullscreenModal className={classes.modal}>
      <FullscreenModal.Header>
        <ArrowLeft size={24} onClick={onClose} />
        <FullscreenModal.Title className={classes.modalTitle}>
          Template Selection
        </FullscreenModal.Title>
      </FullscreenModal.Header>
      <div className={classes.activitiesWrapper}>
        <div className={classes.activitiesContainer}>
          {activities.map((activity) => (
            <Activity
              key={activity.id.toString()}
              {...activity}
              isSelected={activity.id === selectedActivity}
              onSelectedActivityChange={setSelectedActivity}
              templateView
              onCloseTemplateModal={onClose}
            />
          ))}
        </div>
      </div>
      <FullscreenModal.ButtonsPanel>
        <Button variant="secondary" onClick={onClose} underline>
          Go Back
        </Button>
      </FullscreenModal.ButtonsPanel>
    </FullscreenModal>
  )
}

export default TemplateSelection
