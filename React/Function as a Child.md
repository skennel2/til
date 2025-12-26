# Function as a Child

리액트 훅(Hooks)이 나오기 전(2018년 이전)에 엄청나게 유행했던 패턴, 상태관리는 부모에서하고 자식에서 렌더링로직만 관리하기 위함 
  
Function as a Child 패턴
```javascript
<PDFDownloadLink document={<Doc />}>
  {({ loading }) => (loading ? 'Loading...' : 'Download')}
</PDFDownloadLink>
```
  
Hook 패턴
```javascript
const [instance, updateInstance] = usePDF({ document: <Doc /> });

if (instance.loading) return <div>Loading...</div>;
return <a href={instance.url}>Download</a>;
```