import { useState, useEffect } from 'react'
// import { Redirect, withRouter } from 'react-router-dom'
import TableRow from './TableRow'

const HomePage = ({ token, userPresent, setUserPresent }) => {
    const NEW_MOVIE_DATA = [
        { name: 'movie_name', value: "", type: "text" },
        { name: 'rating', value: "", type: "number" },
        { name: 'casting', value: "", type: "text" },
        { name: 'genre', value: "", type: "text" },
        { name: 'release_date', value: "", type: "date" },
    ]
    const [userMovieData, setUserMovieData] = useState([])
    const [newMovieDataInput, setNewMovieDataInput] = useState([...NEW_MOVIE_DATA])

    const handleNewMovieInputChange = (e, idx) => {
        const { value } = e.target
        const newArray = [...newMovieDataInput]
        newArray[idx].value = value
        setNewMovieDataInput([...newArray])
    }

    const handleMovieAdd = async () => {
        await fetch(`http://localhost:9000/movie/add`, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Authorization': token.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...Object.fromEntries(newMovieDataInput.map(data => [data.name, data.value])),
                // user_id: userPresent?.user_id
            })
        })
        setUserPresent(JSON.parse(localStorage.getItem('userData')))
        setNewMovieDataInput(NEW_MOVIE_DATA)
    }

    const getAllMovieData = async () => {
        const fetchData = await fetch(`http://localhost:9000/movie/all`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Authorization': token.token,
                'Content-Type': 'application/json'
            },
        })
        const fetchDataJson = await fetchData.json()
        setUserMovieData(fetchDataJson.message)
    }

    useEffect(() => {
        if (userPresent.token) {
            getAllMovieData()
        }
    }, [userPresent])

    return (
        <div>
            <button onClick={() => {
                localStorage.removeItem('userData')
                setUserPresent(JSON.parse(localStorage.getItem('userData')))
            }}> Log Out
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Rating</th>
                        <th>Casting</th>
                        <th>Genre</th>
                        <th>Release Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {newMovieDataInput.map((field, idx) => <td key={field.name}>
                            <input name={field.name} value={field.value} placeholder={field.name} type={field.type} onChange={(e) => handleNewMovieInputChange(e, idx)} /></td>)}
                        <td><button onClick={handleMovieAdd}>Add</button></td>
                    </tr>
                    {userMovieData.map((movieData, idx) => {
                        return <TableRow token={token} NEW_MOVIE_DATA={NEW_MOVIE_DATA} setUserPresent={setUserPresent} key={movieData.movie_id} movieData={movieData} />
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default HomePage