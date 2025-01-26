import { useDroppable } from "@dnd-kit/core";
import { cardItemType } from "../../Utils/types";
import styles from "../CardContainer/CardContainer.module.scss";
import { useAppContext } from "../../Context/appContext";

interface EmptyPlaceholderProps {
  cardItem: cardItemType; // Adjust the type based on your data
}

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({ cardItem }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: cardItem.status as string, // Use a unique identifier for the droppable area
    data: { status: cardItem.status },
  });
  const { listView } = useAppContext();

  return (
    <div
      ref={setNodeRef}
      className={`${!listView ? styles.emptyPlaceholder : styles.emptyList} ${
        isOver ? styles.isOver : ""
      }`}
    >
      Drop tasks here
    </div>
  );
};

export default EmptyPlaceholder;
