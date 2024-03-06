import classes from './CategorySelect.module.scss'

import Button from '@input/button/Button'
import TextField from '@input/text-field/TextField'
import FullscreenModal from '@modals/FullscreenModal'
import { ArrowLeft } from '@phosphor-icons/react'
import { IndexableType } from 'dexie'
import { useContext, useMemo, useState } from 'react'
import { CategoriesContext, ICategoriesContext } from '../CategoriesContext'
import CategoryModal from '../category-edit-modal/CategoryModal'
import CategoryBadge from './category-badge/CategoryBadge'
import CategoryItem from './CategoryItem'
import { CategorySelectionFunction } from './CategorySelect'

type CategorySelectionModalProps = {
  onClose: () => void
  categoryIds: IndexableType[]
  onCategoriesChange: (categories: IndexableType[]) => void
}

const CategorySelectionModal = ({
  onClose,
  categoryIds,
  onCategoriesChange,
}: CategorySelectionModalProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { categories } = useContext<ICategoriesContext>(CategoriesContext)
  const filteredCategories = useMemo(
    () =>
      categories?.filter((c) =>
        c.name
          .toLocaleLowerCase()
          .includes(searchQuery?.toLocaleLowerCase() ?? ''),
      ),
    [searchQuery, categories],
  )

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] =
    useState<boolean>(false)

  const handleOnClick = () => {
    setIsNewCategoryModalOpen(true)
  }

  const handleCategorySelection: CategorySelectionFunction = (
    categoryId,
    operation,
  ) => {
    switch (operation) {
      case 'add':
        onCategoriesChange([...categoryIds, categoryId])
        break
      case 'remove':
        onCategoriesChange(categoryIds.filter((id) => id !== categoryId))
        break
    }
  }

  return (
    <FullscreenModal>
      <FullscreenModal.Header>
        <ArrowLeft size={24} onClick={onClose} />
        <FullscreenModal.Title className={classes.modalTitle}>
          Category Selection
        </FullscreenModal.Title>
      </FullscreenModal.Header>
      <div className={classes.modalContent}>
        <TextField
          placeholder="Type in what you're looking for"
          iconKey={'Binoculars'}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div className={classes.selectionList}>
          <div className={classes.selectItem}>
            <div
              tabIndex={0}
              className={classes.createNewCategory}
              onClick={handleOnClick}
            >
              Create a new category
            </div>
            {isNewCategoryModalOpen && (
              <CategoryModal onClose={() => setIsNewCategoryModalOpen(false)} />
            )}
          </div>
          {filteredCategories
            ?.filter(({ id }) => !categoryIds.includes(id))
            .map(({ id, name, color }) => (
              <CategoryItem
                name={name}
                color={color}
                id={id}
                key={id.toString()}
                onChange={handleCategorySelection}
              />
            ))}
        </div>
      </div>
      <FullscreenModal.ButtonsPanel className={classes.buttons}>
        <div className={classes.categoryBadges}>
          {categories
            ?.filter(({ id }) => categoryIds.includes(id))
            .map((cat) => (
              <CategoryBadge
                {...cat}
                onClick={() => handleCategorySelection(cat.id, 'remove')}
                deletable
                key={cat.id.toString()}
              />
            ))}
        </div>
        <Button variant="secondary" onClick={onClose} underline>
          Go Back
        </Button>
      </FullscreenModal.ButtonsPanel>
    </FullscreenModal>
  )
}

export default CategorySelectionModal
