import { useRef} from 'react'
// custom components
import InlineEdit from '../InlineEdit';
// generate unique IDs for items
import { v4 as uuidv4 } from 'uuid';
// styling
import styles from './NoteList.module.css'
// icons
import { AiOutlineEnter } from 'react-icons/ai';

export default function ItemListContainer({ itemList, setItemList }) {
  return (
    <div className={styles.root_container}>
      <ItemList itemList={itemList} setItemList={setItemList} />
      <br />
      <AddItem itemList={itemList} setItemList={setItemList} />
    </div>
  )
}

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
      <textarea id="txtid" name="addItem" rows="4" cols="50" maxlength="200" ref={inputRef} style={{flexGrow: 1}}>
        A nice day is a nice day.
        Lao Tseu
      </textarea>
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
          className={styles.item_container}
          style={{
            textDecoration: item.isCompleted ? "line-through" : "",
         }}
        >
          <span style={{ flexGrow: 1 }}>
            <InlineEdit
              text={item.text}
              onSetText={text => updateItem(item.id, text)}
            />
          </span>
          <DeleteItem id={item.id} itemList={itemList} setItemList={setItemList} />
        </div>
      ))}
    </div>
  )
}

function DeleteItem({ id, itemList, setItemList }) {
  function deleteItem() {
    setItemList(itemList.filter((t) => t.id !== id))
  }

  return (
    <div>
      <button onClick={deleteItem}>x</button>
    </div>
  )
}