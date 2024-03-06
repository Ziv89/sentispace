import { deepEqual } from '@utils/functions'
import { useContext, useMemo, useState } from 'react'
import ModalPopup, { ButtonType } from '../../../components/generic/modals/ModalPopup'
import Checkbox from '../../../components/input/checkbox/Checkbox'
import { CategoriesContext, ICategoriesContext } from '../CategoriesContext'
import { Category } from '../Category.interface'
import classes from './CategoryFilterModal.module.scss'

interface FilterModalProps {
  onClose: () => void
}

const CategoryFilterModal = ({ onClose }: FilterModalProps) => {
  const { categories, selectedCategories, setSelectedCategories } =
    useContext<ICategoriesContext>(CategoriesContext)

  const [temporarilySelectedCategories, setTemporarilySelectedCategories] =
    useState(selectedCategories)

  const disabledPrimaryButton = useMemo(
    () => deepEqual(temporarilySelectedCategories, selectedCategories),
    [temporarilySelectedCategories, selectedCategories],
  )

  const onButtonClick = (button: ButtonType) => {
    switch (button) {
      case 'primary':
        setSelectedCategories(temporarilySelectedCategories)
        break
      case 'secondary':
        setSelectedCategories(() => [])
        setTemporarilySelectedCategories(() => [])
        break
      case 'close':
        onClose()
        break
    }
  }

  const handleCheckboxChange = (id: Category['id']) => {
    if (!id) return

    if (temporarilySelectedCategories.includes(id)) {
      setTemporarilySelectedCategories((prev) => [
        ...prev.filter((categoryId) => categoryId !== id),
      ])
    } else {
      setTemporarilySelectedCategories((prev) => [...prev, id])
    }
  }

  const handleCheckboxState = (id: Category['id']) =>
    id ? temporarilySelectedCategories.includes(id) : false

  const allCategories: boolean =
    temporarilySelectedCategories.length > 0 ? false : true

  const handleAllCategoriesCheckboxChange = (): void => {
    if (temporarilySelectedCategories.length > 0)
      setTemporarilySelectedCategories(() => [])
  }

  return (
    <ModalPopup
      title="Filter Categories"
      primaryButtonText="Save"
      secondaryButtonText="Reset"
      onButtonClick={onButtonClick}
      disabledPrimaryButton={disabledPrimaryButton}
    >
      <span className={classes.contentHeading}>Select categories</span>
      <div className={classes.checkboxesContainer}>
        <label className={classes.checkboxLabel}>
          <Checkbox
            label={'All categories'}
            checked={allCategories}
            onChange={handleAllCategoriesCheckboxChange}
          />
        </label>
        {categories?.map(({ name, id }) => (
          <Checkbox
            label={name}
            key={id.toString()}
            name={name}
            checked={handleCheckboxState(id)}
            onChange={() => handleCheckboxChange(id)}
          />
        ))}
      </div>
    </ModalPopup>
  )
}

export default CategoryFilterModal
