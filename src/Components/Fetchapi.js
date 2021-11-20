import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Fetchapi() {
    const [state, setstate] = useState([]);
    const [Show, setShow] = useState([]);
    const [Pages, setPages] = useState([]);
    const [Search, setSearch] = useState([])
    const getPages = Math.ceil(state.length / 6)

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then((data) => {

            setstate(data.data)
            // console.log(data.data)

        })

    }, []);
    useEffect(() => {
        let toshow
        // console.log(getPages)
        if (Pages.length === 0) {
            let arr = []
            for (let i = 1; i <= getPages; i++) {
                arr.push(i)
            }
            setPages(arr)
        }
        toshow = state.slice(0, 6)
        setShow(toshow)
        setSearch(toshow)
        console.log(Show)
    }, [state, Pages])


  
    const SortPages = (e) => {
        //   console.log(e)
        let toshow
        if(e===1){
            toshow = state.slice(0, 6)
            setShow(toshow)
            setSearch(toshow)

        }
        else if (e === 2) {
            toshow = state.slice(6, 12)
            setShow(toshow)
            setSearch(toshow)
        } else if (e === 3) {
            toshow = state.slice(12, 18)
            setShow(toshow)
            setSearch(toshow)
        } else {
            toshow = state.slice(18)
            setShow(toshow)
            setSearch(toshow)
         }
      
    }
    const Searchholder=(e)=>{
        let showitem=Search
        if(e.target.value!==""){
        setShow(showitem.filter((items)=>(
            // items.title===e.target.value
            items.title.toLowerCase().includes(e.target.value.toLowerCase())
           
        )))
        console.log(Show)

        }else{
            setShow(Search)
        }        

  }
    return (
        <div className="maindiv">
            <div>
                <h1>JumboStore</h1>
                <input  onChange={Searchholder} type="text" placeholder="Type to find product" /><span><button >Search</button></span>
            </div>
            <div className="card" >
              {

                    Show.map((ele) => (
                        <div className="card-body">
                            <img src={ele.image} alt="" />
                            {/* <p>{ele.description}</p> */}
                            <h4>price: {ele.price}</h4>
                            < h3  ><span>{ele.id} </span>{ele.title}</h3>
                        </div>
                    ))
                }
            </div>
            <div className="pages">

                {
                    Pages.map((e) => (
                        <div onClick={() => SortPages(e)} className="pageno">{e}</div>
                    ))
                }
            </div>
             </div>
    )
}

export default Fetchapi
