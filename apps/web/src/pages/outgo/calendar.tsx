import { FormEvent } from 'react'
import Card from "@/components/card";
import Container from "@/components/container";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Swal from 'sweetalert2';
import moment from 'moment';
import Link from 'next/link';
import Button from '@/components/button';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [calendar, setCalendar] = useState()
  const [files, setFiles] = useState<File[]>([]);

  const deleteSubmit = async () => {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/outgo/clear/calendar`, {
      method: 'DELETE',
      headers: {
        Authorization: `bearer ${getCookie('whenDinner-session')}`
      }
    }).then(() => {
      Swal.fire({
        text: '정상적으로 초기화가 작동 되었습니다.',
        icon: 'success',
        didClose: () => {
          router.reload();
        }
      })
    }).catch((Err) => {
      Swal.fire({
        text: Err.response.data.message,
        icon: 'error',
        didClose: () => {
          router.reload()        
        }
      })
    })
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  async function uploadCalendar(e: FormEvent) {
    e.preventDefault();
    if (!files[0]) 
      return Swal.fire({
        title: '파일을 올려주세요.',
        text:'xlsx Error: required xlsx',
        icon: 'error'
      })
    if (files[0].name.split('.')[files[0].name.split('.').length-1] !== 'xlsx' && files[0].name.split('.')[files[0].name.split('.').length-1] !== 'excel')
      return Swal.fire({
        title: '엑셀 파일만을 올려주세요.',
        text:'xlsx Error: required xlsx',
        icon: 'error'
      })
    const formData = new FormData();
    formData.append("file", files[0]);

    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/outgo/update/calendar`, formData, {
      headers: {
        Authorization: `Bearer ${getCookie('whenDinner-session')}`,
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      return Swal.fire({
        title: '정상적으로 캘린더가 업데이트 되었습니다.',
        icon: 'success'
      })
    }).catch((err) => {
      return Swal.fire({
        title: err.response.data.message,
        icon: 'error'
      })
    })
  }

  async function getCalendar() {
    await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/outgo/get/calendars`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      setCalendar(res.data.calendar)
    }).catch((err) => console.error(err))
  }

  useEffect(() => {
    getCalendar()
  }, [])

  return (
    <Container>
      <Card title="잔류, 귀가 리스트 넣기">
        <div>
          <form onSubmit={uploadCalendar}>
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>파일을 이곳에 드롭하세요!</p>
              ) : (
                <>
                  <p>파일을 드래그 앤 드롭하거나 클릭하여 업로드하세요.</p>
                  <p>파일은 하나만 업로드 하세요.</p>
                </>
                
              )}
              {files.length > 0 && (
                <ul>
                  <br/>
                  {files.map((file) => (
                    <>
                      <li key={file.name}>{file.name}</li><br/>
                    </>
                  ))}
                </ul>
              )}
            </DropzoneContainer>
            <UploadButton>파일 업로드</UploadButton>
          </form>
        </div>
      </Card>
      <Card title='잔류, 귀가 리스트'>
      <Button type="button" text="초기화" color="rgb(229, 44, 87)" fontColor="#fff" onClick={(e) => { e.preventDefault(); deleteSubmit() }}></Button>
        {calendar && Object.values(calendar).map((value: any, index: number) => (
          <Link href={`/outgo/calendar/${value.uuid}`}>
            <Card title={value.type} key={index}>
              <ul style={{ color: 'black' }}>
                <li>{value.uuid}</li><br/>
                <li>{moment(value.date).format('YYYY년 MM월 DD일')}</li>
              </ul>
            </Card>
          </Link>
        ))}
      </Card>
    </Container>
  )
}

const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eeeeee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const UploadButton = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 30px;
  border: 0;
  cursor: pointer;
`