import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import Login from './Login';


export default function UserData() {
    const [userData, setUserData] = useState([]);
    const [logout, setLogout] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        userList()
    }, [])

    async function userList() {
        const result = await axios.get(
            "https://restcountries.com/v2/all"
        );
        // console.log(result.data, 'data')
        setUserData(result.data);
        localStorage.setItem('userData', JSON.stringify(result.data))
    };

    return (
        <>
            <div className="table-div">
                {logout ? <Login /> :
                    <>
                        <div className='search'>
                            <input type='text' className='navbar-input mb-3' style={{width:"35%"}} placeholder='Search country name' value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button color="secondary" className="navbar-btn heading"
                                onClick={() => setLogout(true)}
                            >
                                Logout
                            </Button>
                        </div>
                        <table responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Country Name</th>
                                    <th>Capital</th>
                                    <th>Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // userData.map((product, index) =>
                                    userData.filter(item => (item.name.toLowerCase()).includes(search.toLowerCase())).map((product, index) => (

                                        <tr style={{ background: (index % 2 == 0) ? "#8695da" : "#86da86" }}>
                                            <td><b>{index + 1}</b></td>
                                            <td>{product.name}</td>
                                            <td>{product.capital}</td>
                                            <td>{product.currencies ? product.currencies[0]['name'] : ""}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                }
            </div>
        </>
    )
}