import React from 'react';
import { Input } from 'antd';
import '../../design/layout.css';
import './styles.css';

const LoginInputs = ({
  label,
  after,
  disabled = false,
  value,
  onChangeText,
  type
}) => (
  <div className='text-xs text-e3'>
    <div className='m-b-5'>
      {label}
    </div>
    {type === 'password' ?
      <Input.Password
        type={type}
        value={value}
        onChange={(e) => onChangeText(e)}
        disabled={disabled}
        type='text'
        size='large'
        className='loginputs'
        suffix={after}
        placeholder="input password"
      />
      :
      <Input
        type={type}
        value={value}
        onChange={(e) => onChangeText(e)}
        disabled={disabled}
        type='text'
        size='large'
        className='loginputs'
        suffix={after}
      />
    }
  </div>
);

export default LoginInputs;
