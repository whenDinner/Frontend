import Card from "@/components/card";
import Container from "@/components/container";

export default function Home() {
  return (
    <Container>
      <Card title="WhenDinner 기숙사 시스템">
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.0107 5V16H4.01074V5H20.0107ZM20.0107 3H4.01074C2.91074 3 2.01074 3.9 2.01074 5V16C2.01074 17.1 2.91074 18 4.01074 18H20.0107C21.1107 18 22.0107 17.1 22.0107 16V5C22.0107 3.9 21.1107 3 20.0107 3Z" fill="#333333"></path><path d="M16.2905 22.0008H7.73047L9.04047 16.7607L10.9805 17.2408L10.2905 20.0008H13.7305L13.0405 17.2408L14.9805 16.7607L16.2905 22.0008Z" fill="#333333"></path><path d="M21.0107 13H3.01074V15H21.0107V13Z" fill="#333333"></path></svg>
          <br /><br />버튼을 눌러서 기능들을 확인해주세요!
        </div>
      </Card>
    </Container>
  )
}
