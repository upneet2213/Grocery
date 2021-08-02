import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name,setName]=useState('')
  const [list,setList]= useState([])
  const [alert,setAlert]= useState({show:true,msg:'', type: ''})
  const [isEditing,setIsEditing]= useState(false)
  const [editID, setEditId]= useState(null)
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!name){
      //
      showAlert(true, 'danger', 'Please enter a value')
    }
    else if(name && isEditing){
      //
      setList(list.map((item)=>{
        if(item.id===editID){
          return {...item,title:name}
        }
        return item
      }))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Value Changed')
    }
    else{
      showAlert(true, 'success', 'New Item added')
    const newItem = {id: new Date().getTime().toString(), title: name}
    setList([...list,newItem])}
    setName('')
  }
  const showAlert=(show=false,type='',msg='')=>{
    setAlert({show,type,msg})
  }
  const clearList=()=>{
    showAlert(true, 'danger', 'Empty List')
    setList([])
  }
  const removeItem=(id)=>{
    showAlert(true, 'danger', 'Item Removed')
    setList(list.filter((item)=>item.id!==id))
  }
  const editItem=(id)=>{
    const specificItem = list.find((item)=>item.id===id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title)
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  return <section className="section-center">
      <form className="grocery-form">
        {alert.show&&<Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className="form-control">
        <input type="text" name="" id="" className="grocery" value={name}  onChange={(e)=>{
          setName(e.target.value)
        }} placeholder="e.g. eggs"/>
        <button className="submit-btn" type="submit" onClick={handleSubmit}>{isEditing?"edit":"submit"}</button>
        </div> 
      </form>
      {
        list.length>0 && (
          <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button className="clear-btn" onClick={clearList}>Clear Items</button>
        </div>
        )
      }
      

  </section>
}

export default App
