import React from 'react';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import '../design/layout.css';
import './styles.css'

const ListQuestionBox = ({
  data, index, onPressQues, onPressBookmark, isSet, admin
}) => (
  <div className='p-10 m-t-10'>
    {admin ? null :
      <div className='full-width r-c-fe m-b-10'>
        {data.bookmarked ?
          <BsFillBookmarkFill
            className='text-black cursor-pointer'
            onClick={() => onPressBookmark()}
          /> :
          <BsBookmark className='text-lightGrey cursor-pointer'
            onClick={() => onPressBookmark()}
          />
        }
      </div>
    }
    <div className='listQ r-c-fs cursor-pointer' onClick={() => onPressQues()}>
      <div className='m-r-10'>
        {isSet ?
          <IoIosCheckmarkCircleOutline className='text-green text-mdl' />
          :
          <div className='qindex text-black radius-100 r-c-c'>
            {index+1}
          </div>
        }
      </div>
      <div className='questionItem'>
        {admin ? null : ReactHtmlParser(data.question,
                  { transform: (node) => {
                  if (node.type === 'tag' && node.name === 'img') {
                    console.log("image tag",node.attribs.src);
                    return <img style={{maxHeight: '40vh', maxWidth: '40vh'}} src={node.attribs.src} />;
                  }
                }})}
      </div>
      {admin && data.question && data.question.length ?
        <div>
        {
          ReactHtmlParser(data.question,
                    { transform: (node) => {
                    if (node.type === 'tag' && node.name === 'img') {
                      console.log("image tag",node.attribs.src);
                      return <img style={{maxHeight: '40vh', maxWidth: '40vh'}} src={node.attribs.src} />;
                    }
                  }})
                }

        {/*<div className='questionItem' dangerouslySetInnerHTML={{ __html: data.question }}>*/}
      </div> : null}
    </div>
  </div>
);

export default ListQuestionBox;
