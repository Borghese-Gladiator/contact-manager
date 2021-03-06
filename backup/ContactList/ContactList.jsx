import { useRef} from 'react'
// custom components
import InlineEdit from '../../components/InlineEdit';
// generate unique IDs for items
import { v4 as uuidv4 } from 'uuid';
// styling
import styles from './ContactList.module.css'
// icons
import { AiOutlineEnter } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
// add type checking for arguments
import PropTypes from 'prop-types';

function ItemListContainer({ itemList, setItemList }) {
  return (
    <div className={styles.root_container}>
      <ItemList itemList={itemList} setItemList={setItemList} />
      <br />
      <AddItem itemList={itemList} setItemList={setItemList} />
    </div>
  )
}

ItemListContainer.propTypes = {
  itemList: PropTypes.array,
  setItemList: PropTypes.func,
};

export default ItemListContainer;

function AddItem({ itemList, setItemList }) {
  const inputRef = useRef();
  function addItem(event) {
    event.preventDefault()
    const text = event.target.elements.addItem.value;
    const item = {
      id: uuidv4(),
      text,
      done: false
    };
    setItemList(itemList.concat(item))
    inputRef.current.value = "";
  }
  return (
    <form onSubmit={addItem} className={styles.add_item_form_container}>
      <input name="addItem" placeholder="Write contact" ref={inputRef} style={{flexGrow: 1}} />
      <button type="submit"><AiOutlineEnter /></button>
    </form>
  )
}

function ItemList({ itemList, setItemList }) {
  function updateItem(id, newText) {
    const newNoteList = itemList.map((item, idx) => {
      if (item.id === id) {
        return {
          ...item,
          text: newText
        }
      }
      return item
    })
    setItemList(newNoteList)
  }

  if (!itemList.length) {
    return <p>No items left!</p>;
  }

  return (
    <div>
      {itemList.map((item, index) => (
        <div
          key={item.id}
          className={styles.contact_item_container}
          style={{
            textDecoration: item.isCompleted ? "line-through" : "",
         }}
        >
          <FaDiscord />
          <span style={{ flexGrow: 1 }}>
            <InlineEdit
              text={item.text}
              onSetText={text => updateItem(item.id, text)}
            />
          </span>
        </div>
      ))}
    </div>
  )
}