// single selection
// multiple selection

import { useState } from "react"
import data from "./data";
import './styles.css'


export default function Accordion() {
    const [selected, setSelected] = useState(null);
    //This line creates a state variable selected (with a default value of null) and its corresponding setter function setSelected. This state will track which accordion item is selected in single-selection mode. If selected equals an item’s id, it will display that item’s content.
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    //This state variable tracks whether the accordion is in multiple-selection mode. If it's true, multiple accordion items can be selected at once. If it's false, only one item can be selected at a time.
    const [multiple, setMultiple] = useState([]);
    //This state variable tracks the currently selected items in multiple-selection mode. It is initialized as an empty array. When an item's id is added to this array, its content will be displayed.


    function handleSingleSelection(getCurrentId){
        console.log(getCurrentId);
        setSelected(getCurrentId === selected ? null : getCurrentId);
        //This logic checks if the currently clicked item is already selected (i.e., getCurrentId equals the selected state). If it is, it sets selected to null (deselects the item). If it is not, it sets selected to getCurrentId (selects the clicked item).
    }

    function handleMultiSelection(getCurrentId){
        let cpyMultiple = [...multiple]
        //A copy of the multiple array is created. This is necessary because state should not be mutated directly in React. We need to work with a copy when modifying state.
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId)
        //This finds the index of the current id in the cpyMultiple array. If the id is not found, it returns -1.
        console.log(findIndexOfCurrentId);
        if(findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId)
            //If the id is not found in the array (i.e., it hasn't been selected yet), we add it to the array.
            else cpyMultiple.splice(findIndexOfCurrentId,1);
            //If the id is already in the array (i.e., it's selected), we remove it using the splice() method.

        setMultiple(cpyMultiple);
        //we update the multiple state with the modified array.
        
    }

    console.log(selected,multiple);

    return (
    <div className="wrapper">
        <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
        {/* When clicked, it toggles the value of enableMultiSelection between true and false. This allows the user to switch between single and multiple selection modes. */}
        <div className="accordion">
            {
                data && data.length > 0 ? 
                data.map(dataItem => <div className="item">
                    {/* checks if the data array is not empty. If it has items, the code maps over the data array and renders each accordion item. Each item consists of a question (dataItem.question) and an answer (dataItem.answer). */}
                    <div onClick={enableMultiSelection ? ()=> handleMultiSelection(dataItem.id) : ()=>handleSingleSelection(dataItem.id)} className="title">
                        {/* When an accordion item is clicked, it triggers either handleMultiSelection() or handleSingleSelection() depending on whether multi-selection is enabled or not. It passes the current item’s id to the respective function. */}
                        <h3>{dataItem.question}</h3>
                        <span>+</span>
                    </div>

                    {
                        enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1 && (
                            <div className="content">{dataItem.answer}</div>
                        )
                        : selected === dataItem.id && (
                            <div className="content">{dataItem.answer}</div>
                        )
                    }
                    {/* If multi-selection is enabled, the content of the accordion item is displayed if its id is in the multiple array (i.e., multiple.indexOf(dataItem.id) !== -1). */}
                    {/* If multi-selection is not enabled, the content is displayed if the id matches the selected state (i.e., selected === dataItem.id). */}
                    
                    {/* {
                        selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? 
                        <div className="content">{dataItem.answer}</div>
                        : null
                    } */}

                </div>)
                : <div>No data found</div>
            }
            {/* If there is no data to display (i.e., data.length === 0), a fallback message "No data found" is shown. */}
        </div>
    </div>
    )
}