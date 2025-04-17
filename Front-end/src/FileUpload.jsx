import React, {useState} from 'react'
import { Button, Col, Row, Alert } from 'react-bootstrap';
import { IoMdCloudUpload } from "react-icons/io";

const FileUpload = (props) => {
  const [file, setFile] = useState(null)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const parts = e.target.value.split('\\')
    props.fileNameSetter(parts.pop())
    setFile(e.target.files?.[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newFileData = new FormData();
      newFileData.append('file', file);

      const res = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: newFileData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setMessage(await res.text())
      setStatus("success")
      setShow(true)
    } catch (err) {
      setMessage("Error : ", err)
      setStatus("danger")
      setShow(true)
    }
  };
  return (
    <div className="fileUpload">
        <h6>Upload documents</h6>
          <Row className="align-items-center">
            <Col xs={10}>          
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                method="post">
                <input type="file" name="inputFile" className="fileupload" accept=".txt" required onChange={handleChange} />
                <Button type="submit" value="upload"><IoMdCloudUpload tabIndex="0" type="submit" value="upload" size="1.5rem"/></Button>
              </form>
            </Col>
          </Row>
          { show && <Alert key={status} variant={status}  onClose={() => setShow(false)} dismissible>{message}</Alert> }
    </div>
  )
}

export default FileUpload