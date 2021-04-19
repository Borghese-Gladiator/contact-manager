import { useRef} from 'react'
// custom components
import InlineEdit from './InlineEdit';
// generate unique IDs for items
import { v4 as uuidv4 } from 'uuid';

export default function NotesContainer({ itemList, setItemList }) {
  return (
    <div className="song-list">
      <ItemList itemList={itemList} setItemList={setItemList} />
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
    <form onSubmit={addItem}>
      <input name="addItem" placeholder="Add item" ref={inputRef} />
      <button type="submit">Submit</button>
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
          className="song-item"
          key={item.id}
          style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
        >
          <span className="song-item-link">
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
    <div style={{ margin: '5px' }}>
      <button onClick={deleteItem}>x</button>
    </div>
  )
}