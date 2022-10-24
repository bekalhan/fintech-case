import './App.css';
import Countries from './components/Countries';
import React,{useEffect,useState} from 'react';
import axios from 'axios';



function App() {
  const [query,setQuery] = useState("");
  const [allquery,setAllquery] = useState("");
  const [filteredCountries,setFilteredCountries] = useState([]);
  const [status,setStatus] = useState(false);
  const [cls,setCls] = useState("opt");
  const [cls2,setCls2] = useState("opt active");


  const search = (data) =>{
    return data.filter((item)=>item.capital.toLowerCase().includes(query));
  }

  const searchAll = (data) =>{
    return data.filter((item)=>
    item.capital.toLowerCase().includes(allquery) ||
    item.name.toLowerCase().includes(allquery) ||
    item.region.toLowerCase().includes(allquery)
    );
  }

  const fetchAllCountries = async () =>{
    try{
      console.log("girdi");
      const res = await axios.get("https://restcountries.com/v2/all");
      let data = 0;
      res.data.map((value)=>{
        if(value.capital !== undefined){
          data++;
          setFilteredCountries(filteredCountries => [...filteredCountries,value]);
        }
      });
      console.log("data :",data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
      fetchAllCountries();
    },[]);

    const changeStatusToTrue = () => {
      setStatus(true);
      setCls("opt active");
      setCls2("opt");
    }

    const changeStatusToFalse = () => {
      setStatus(false);
      setCls("opt")
      setCls2("opt active")

    }

    console.log("status : ",filteredCountries);
    

  return (
    <div className="app">
    <div>
      <h2>All Countries</h2>
    </div>
      <div className='app-top'>
        <div className="filter">
          <div className={cls2} onClick={()=>{changeStatusToFalse()}}>
              Filter by capital
          </div>
          <div className={cls} style={{marginLeft:"0.3em"}} onClick={()=>{changeStatusToTrue()}}>
              Filter by all
          </div>
        </div>
        <div className='search-top'>
          {status === false ?(
              <input
              type="text"
              placeholder="Filter by capital..."
              style={{marginRight:"15rem"}}
              onChange={(e)=>setQuery(e.target.value)}
              className='search' />
          ):(
           <input
            type="text"
            placeholder="Filter by all..."
            style={{marginRight:"15rem"}}
            onChange={(e)=>setAllquery(e.target.value)}
            className='search' />
          )}

        </div>
      </div>

        {query !== "" ?(
          <Countries data={search(filteredCountries)}  /> 
        ):(
          <Countries data={searchAll(filteredCountries)} />
        )}
    </div>
  );
}

export default App;
