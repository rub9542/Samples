import React from 'react';
import {Button, Input, Radio} from 'antd';
import { IoIosClose } from 'react-icons/io';
import '../design/layout.css';
import './styles.css'

const OptionBox = ({
  data,
  index,
  isSelected,
  setAdminAnswer,
  setAdminOptionValue,
  deleteAdminOption,
}) => (
  <div
    style={{
      border: isSelected ? '1px solid transparent' : '1px solid #A5AAB5',
      borderRadius: 15,
      backgroundColor: isSelected ? '#e2dfed' : 'white'
    }}
    className='p-5 p-l-10 p-r-10 r-c-fs m-10'
  >
    <Radio
      onClick={setAdminAnswer}
      checked={isSelected}
    />
    <Input
      className='optionBox'
      onChange={(e) => setAdminOptionValue(e.target.value)}
      value={data}
    />
    <Button
      shape='circle'
      size='small'
      onClick={deleteAdminOption}
      style={{
        marginLeft: 10,
        border: 'none',
        fontWeight: 500,
        backgroundColor: '#FF4365',
        color: 'white',
      }}>
      <IoIosClose />
    </Button>
  </div>
)

export default OptionBox
