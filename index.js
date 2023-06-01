const {useState, useEffect} = React;
function App(){
  const [booklist, setBooklist] = useState([]);
  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/")
    .then(res=>setBooklist(res.data))
    .catch(err=>{throw err})
  },[])

  function addbook(e){
    e.preventDefault();
    axios.post("https://my-json-server.typicode.com/codegym-vn/mock-api-books/books",{
      id:5,
      title:document.getElementById("title").value,
      quantity:document.getElementById("quantity").value
    })
    .then(res=>setBooklist([...booklist,res.data]))
    .catch(err=>{console.log(err)})
  }

  function delbook(id){
    console.log(id)
    axios.delete(`https://my-json-server.typicode.com/codegym-vn/mock-api-books/${id}`)
    .then(res=>{setBooklist([res.data]);})
    .catch(err=>{console.log(err)})
  }
  console.log(booklist)
  return (
    <>
    <div className="row">
      <h2 className="col-6 text-left">Library</h2>
      <button className="btn btn-success col-2">Add a new book</button>
    </div>
   
    <h2>Add a new book</h2>
    <form onSubmit={(e)=>addbook(e)}>
      <label>Title</label><br></br>
      <input id="title"></input><br></br>
      <label>Quantity</label><br></br>
      <input id="quantity" type="number"></input><br></br>
      <button className="btn btn-warning" type="submit">Add</button>
    </form>
    
    <table className="table table-striped">
      <thead>
        <th>Title</th>
        <th>Quantity</th>
        <th>Actions</th>
      </thead>
      <tbody>
        {booklist.map((item,index)=>
        <tr key={index}>
          <td>{item.title}</td>
          <td>{item.quantity}</td>
          <td><button className="btn btn-primary">Edit</button><button className="btn btn-danger" onClick={()=>delbook(item.id)}>Delete</button></td>
        </tr>)}
      </tbody>
    </table>
     
    </>
  )
}



ReactDOM.createRoot(document.getElementById('root')).render(<App/>);