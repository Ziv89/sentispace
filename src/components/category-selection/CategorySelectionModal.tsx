import classes from "./CategorySelect.module.scss";
import { ArrowLeft } from "@phosphor-icons/react";

import { createPortal } from "react-dom";
import { IndexableType } from "dexie";
import TextField from "../input/text-field/TextField";
import { useContext, useMemo, useState } from "react";
import { CategoriesContext } from "../../data/contexts/CategoriesContext";
import CategoryBadge from "./category-badge/CategoryBadge";
import CategoryItem from "./CategoryItem";
import { CategorySelectionFunction } from "./CategorySelect";
import CategoryModal from "../shared/CategoryModal";
import Button from "../input/button/Button";

type CategorySelectionModalProps = {
  onClose: () => void;
  categoryIds: IndexableType[];
  onCategoriesChange: (categories: IndexableType[]) => void;
};

const CategorySelectionModal = ({
  onClose,
  categoryIds,
  onCategoriesChange,
}: CategorySelectionModalProps) => {
  const [searchQuery, setSearchQuery] = useState<string>();
  const { categories } = useContext(CategoriesContext);
  const filteredCategories = useMemo(() => categories?.filter(c => c.name.toLocaleLowerCase().includes(searchQuery?.toLocaleLowerCase() ?? '')), [searchQuery, categories]);

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] =
    useState<boolean>(false);

  const handleOnClick = () => {
    setIsNewCategoryModalOpen(true);
  };

  const handleCategorySelection: CategorySelectionFunction = (
    categoryId,
    operation
  ) => {
    switch (operation) {
      case "add":
        onCategoriesChange([...categoryIds, categoryId]);
        break;
      case "remove":
        onCategoriesChange(categoryIds.filter((id) => id !== categoryId));
        break;
    }
  };

  return createPortal(
    <div className="fullscreen-modal">
      <div className="header">
        <ArrowLeft size={24} onClick={onClose} />
        <h1 className={`title ${classes.title}`}>Category Selection</h1>
      </div>
      <div className={classes.modalContent}>
        <TextField
          placeholder="Type in what you're looking for"
          iconKey={"Binoculars"}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div className={classes.categoryBadges}>
          {categories
            ?.filter(({ id }) => categoryIds.includes(id))
            .map((cat) => (
              <CategoryBadge
                {...cat}
                onClick={() => handleCategorySelection(cat.id, "remove")}
                deletable
                key={cat.id.toString()}
              />
            ))}
        </div>
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
      <div className={`buttons-panel ${classes.buttons}`}>
        <Button
          variant="secondary"
          onClick={onClose}
          underline
        >
          Close
        </Button>
      </div>
    </div>,
    document.body
  );
};

export default CategorySelectionModal;
