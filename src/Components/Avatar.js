import React, { useState } from 'react';
import { Avatar, Upload, Modal } from 'antd';
import AvatarEditor from 'react-avatar-editor';

const MyAvatar = () => {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSave = () => {
    if (editorRef) {
      const canvas = editorRef.getImage();
      // Here you can save the canvas image
      // e.g. upload to server or update user's profile
      setVisible(false);
    }
  };

  let editorRef;

  return (
    <>
      <Avatar size={128} src={image} onClick={() => setVisible(true)} />
      <Modal
        title="Edit Avatar"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <AvatarEditor
          ref={ref => (editorRef = ref)}
          image={image}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          onImageChange={setImage}
          rotate={0}
        />
        <div>
          <Upload
            showUploadList={false}
            beforeUpload={file => {
              const reader = new FileReader();
              reader.onload = e => {
                setImage(e.target.result);
              };
              reader.readAsDataURL(file);
              return false;
            }}
          >
            <button>Choose Image</button>
          </Upload>
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={scale}
            onChange={e => setScale(parseFloat(e.target.value))}
          />
        </div>
      </Modal>
    </>
  );
};

export default MyAvatar;
