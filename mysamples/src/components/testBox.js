import React from 'react';
import {
  Row,
  Col
} from 'antd';
import { FcClock, FcCalendar } from 'react-icons/fc';
import { RiFileEditLine, RiDeleteBin6Line, RiEdit2Fill } from 'react-icons/ri';
import moment from 'moment';
import '../design/layout.css';
import RedButton from './redButton';
import './styles.css';
// const moment = require('moment-timezone');

const TestBox = ({
  data, index, onClickEdit, loading, onClickDelete, deleteLoading, editTest
}) => (
  <div className='p-15 m-10 inline testBox'>
    <Row align='middle' justify='space-between'>
      <div className='text-black m-r-10 bold-500'>
        {data.title}
      </div>
      <div className='text-white back-red p-5 radius-10 bold-500'>
        {data.type}
      </div>
    </Row>
    <Col xs={24} className='bold-500 r-c-fs m-t-10'>
      <div style={{width:'100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}} className="cursor-pointer">
        <div>
          <FcCalendar className='text-md m-r-5 m-t-5' />{moment(data.startTime).format('DD MMM YYYY')}
        </div>
        <div>
          <RiEdit2Fill onClick={() => editTest()}/>
        </div>
      </div>
    </Col>
    <Col xs={24} className='bold-500 r-c-fs'>
        <FcClock className='text-md m-r-5 m-t-5' />{moment(data.startTime).format('HH:mm')} - {moment(data.startTime).add(data.duration, 'minutes').format('HH:mm')}
    </Col>
    <Row justify='space-between' className='m-t-10'>
      <RedButton
        loading={loading}
        onClick={onClickEdit}
        shadowString='1px 1px 2px 1px #ff436577'
      >
        <RiFileEditLine className='text-sm' />
      </RedButton>
      <div className='m-r-10' />
      <RedButton
        loading={deleteLoading}
        onClick={onClickDelete}
        shadowString='1px 1px 2px 1px #ff436577'
      >
        <RiDeleteBin6Line className='text-sm' />
      </RedButton>
    </Row>
  </div>
);

export default TestBox;
