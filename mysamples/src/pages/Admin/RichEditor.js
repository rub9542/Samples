import React from 'react';
import ReactQuill from 'react-quill';
import {StarOutlined} from '@ant-design/icons';

const CustomButton = () => <StarOutlined />;

function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
  	this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
        />
      </div>
    )
  }
}

export default Editor;
