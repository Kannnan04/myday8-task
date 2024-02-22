import React, { useContext } from 'react';
import { myContext } from '../src/App';

const Task = () => { 
    const[data,setData] = useContext(myContext);

    const totalPrice = data.reduce((total,data) =>total+data.price * (data.quantity || 1),0);
    const totalQuantity = data.reduce((total,data) =>total+ (data.quantity || 1),0);
    const handleIncrease =(id,quantity) =>{
        setData(preData =>{
                return preData.map((item) =>{
                    if(item.id===id){
                        return {...item,quantity:(item.quantity+1)}
                    }
                
                    return item
                }) 
        })
    }
     const handleDecrease =(id,quantity) =>{
         setData(preData =>{
             return preData.map((item) =>{
                 if(item.id===id && (item.quantity ||quantity) > 0){
                     return {...item,quantity:(item.quantity-1)}
                 }
      
                 return item
      }) 
     })
    }

    return (
        <div>
            {/* <h1>CArt Comp</h1> */}
            <h3 className='total'>Total Cart :{totalQuantity}</h3>
            <h3 className='total'> Total Price :{totalPrice}</h3>
           
            {data.map((item,index) =>{
                return(
                    <>
                        <div key={index}>
                            <div className='content'>
                                <li className='list-items' id='list-one'>{item.id}</li>
                                <li className='list-items' id='list-two'>{item.title}</li>
                                <li className='list-items' id='list-three'>{item.description}</li>
                                <li className='list-items' id='list-four'>{item.price}</li>
                            </div>
                            {item.images.map((img,index) =>{
                                    return(
                                        <>
                                            <div className='image' key={index}>
                                                
                                            <img src={img} />

                                            </div>
                                        </>
                                    )
                                })}
                                <button id='btn-1' onClick={() =>handleIncrease(item.id)}>+ </button>
                                <button id='btn-2'onClick={() =>handleDecrease(item.id)}>SUB</button>
                                <button className='quantity'>Total Quantity: {item.quantity}</button>

                        </div>  
                                      
                    </>
                )
            })}
        </div>
    );
};

export default Task;