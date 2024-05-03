import React, { useContext, useState } from 'react';
import { myContext } from '../src/App';

const Task = () => {
    const [data, setData] = useContext(myContext);
    const [cardCounts, setCardCounts] = useState([{ id: 1, count: 0 }, { id: 2, count: 0 }, { id: 3, count: 0 }, { id: 4, count: 0 }, { id: 5, count: 0 }]);
    const [totalCart, setTotalCart] = useState(0);
    const [totalPrices, setTotalPrice] = useState(0);


    const totalPrice = data.reduce((total, data) => total + (data.price || 0) * (data.quantity || 0), 0);
    const totalQuantity = data.reduce((total, data) => total + (data.quantity || 0), 0);

    const handleIncrease = (id, quantity) => {
        setData(preData => {
            const newData = preData.map((item) => {
                if (item.id === id ) {
                    return { ...item, quantity: (item.quantity || 0) + 1 };
                }

                return item
            })
            setTotalCart(totalCart + 1); // Increment total cart quantity
            return newData;
        })
    }
    const handleDecrease = (id, quantity) => {
        setData(preData => {

            const newData = preData.map((item) => {
                if (item.id === id && (item.quantity || quantity) > 0) {
                    return { ...item, quantity: (item.quantity - 1) }
                }

                return item
            });

        
            setTotalCart(totalCart - 1); // Decrease total cart quantity
            const item = preData.find(item => item.id === id);
            if (item && item.quantity && item.quantity > 0) {
                setTotalPrice(totalPrice - item.price); // Decrease total price
            }
            return newData;
        })
    }

    const updateCount = (id, value) => {
        const updatedCounts = cardCounts.map(card => {
            if (card.id === id) {
                const newCount = card.count + value;
                return { ...card, count: Math.max(newCount, 0) };
            }
            return card;
        });
        
        setCardCounts(updatedCounts);
    };

    const updatetotalCart = (price) => {
        setTotalPrice(totalPrices + price); // Update total price
    };
    const updateTotalCart = (price) => {
        setTotalCart(totalCart + 1); // Update total cart quantity
        setTotalPrice(totalPrices + price); // Update total price
    };


    return (
        <div>
            {/* <h1>CArt Comp</h1> */}
            <h3 className='total'>Total Cart :{totalQuantity}</h3>
            <h3 className='total'> Total Price :{totalPrice}</h3>

            {data.map((item, index) => {
                return (
                    // parent box
                    <div className='card-container' key={item.id}>
                        <div className="item-image">
                            <img src={item.images} alt={item.title} />
                        </div>
                        <div className="item-details">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <div className=''>
                                <div>
                                    <p>Price: {item.price}</p>
                                </div>
                                <div>
                                    <p>Rating: {item.rating}/5</p>
                                </div>
                            </div>
                        </div>

                        {cardCounts.map(card => (
                            card.id === item.id &&
                            <div key={card.id} className="item-cart">
                                <div className='cartflex'>
                                    <button onClick={() => updateCount(card.id, -1)}>-</button>
                                    <p>{card.count}</p>
                                    <button onClick={() => updateCount(card.id, +1)}>+</button>
                                </div>
                                <button onClick={() => handleIncrease(item.id)}>Add to Cart</button>
                                <button onClick={() => handleDecrease(item.id)}>Remove from Cart</button>
                            </div>
                        ))}

                    </div>
                )
            })}
        </div>
    );
};

export default Task;



