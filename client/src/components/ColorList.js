import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../api/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log("This is a list of colors: ", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);



  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put(`api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log("ColorList.js saveEdit: res: ", res)
      axiosWithAuth().get('http://localhost:5000/api/colors')
      .then(res => {
        updateColors(res.data)
      })
      .catch(error => console.log("ColorList.js saveEdit: err: ", error))
    })
  };
 

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`api/colors/${color.id}`, color)
    .then(res => {
      console.log("ColorList.js deleteColor: res: ", res);
      updateColors(colors.filter(colorId => colorId.id !== color.id ));
      setNewColor(initialColor);
    })
    .catch(err => {
      console.error("ColorList.js deleteColor: err: ", err);
    })

  };

  const submitNewColor = e => {
    e.preventDefault();
    axiosWithAuth().post('api/colors', newColor)
    .then(res => {
      updateColors(res.data)
      setNewColor(initialColor);
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit
          }>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">
              save
            </button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={submitNewColor}>
        <div className="new-color">
        <label htmlFor='color'>Color: </label>
        <input type='text' className="color-inpt" name='color' id='color' value={newColor.color} onChange={(event) => {
          setNewColor({
            ...newColor,
            color: event.target.value
          })
        }} /></div>
        <div className="new-color">
        <label htmlFor='hex'>Hex: </label>
        <input type='text' className="color-inpt" name='hex' id='hex' value={newColor.code.hex} onChange={(event) => {
          setNewColor({
            ...newColor,
            code: { hex: event.target.value}
          })
        }} /></div>
        <button className="add-btn" type='submit'>Add New Bubble!</button>
      </form>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
