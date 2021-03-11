import React, {useRef, useEffect} from 'react';
import {TextField, OutlinedTextFieldProps} from '@material-ui/core';


interface ItemProps extends OutlinedTextFieldProps {
  index: number;
  focus?: boolean;
  onValueChanged: (index: number, value: string) => void;
  onEnterClicked: (index: number) => void;
  onBackSpaceClicked: (index: number) => void;
  onFocused: () => void;
}

function Item(props: ItemProps) {
    // IF focused, then focus.
    // Then call ClearLastIdx.
    const {index, onValueChanged, onEnterClicked, onBackSpaceClicked, onFocused, focus, ...rest} = props;
    
    const ref = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        ref.current?.focus()
        onFocused();
    }, [focus]);
    
    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChanged(index, e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          onEnterClicked(index);
        } else if (e.key === "Backspace") {          
          if (!ref.current?.value) {
            onBackSpaceClicked(index);
          }
        }
    }

  return (      
      <TextField {...rest} inputRef={ref} onChange={handleItemChange} onKeyDown={handleKeyDown} />
  );
};

export default Item;