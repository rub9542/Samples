import React from 'react';
import {Button} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const RedButton = (props) => (
  <Button
    onClick={props.onClick ? props.onClick : null}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 73,
      boxShadow: props.shadowString || null,
      backgroundColor: '#FF4365',
      color: 'white',
      border: 'none',
      fontWeight: 500,
      borderRadius: 5,
      margin: props.margin,
      ...props.style
    }}
    disabled={props.disabled}
    >
    {props.children} {props.loading ? <LoadingOutlined style={{paddingLeft: 3}} /> : null}
  </Button>
)

export default RedButton
