import { useState } from 'react'

const TableRow = ({ token, movieData, setUserPresent, NEW_MOVIE_DATA }) => {
    const { movie_id, user_id, ...filteredMovieData } = movieData
    const [movieDataInput, setMovieDataInput] = useState({
        ...filteredMovieData,
        release_date: new Date(filteredMovieData.release_date).toLocaleDateString().split('/').reverse().join('-')
    })
    const [rowDirty, setRowDirty] = useState(false)

    const handleInputChange = (e) => {
        setRowDirty(true)
        const { name, value } = e.target
        setMovieDataInput(prev => ({ ...prev, [name]: value }))
    }

    const handleUpdate = async () => {
        const sendRequest = await fetch(`http://localhost:9000/movie/update?movieid=${movie_id}`, {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Authorization': token.token,
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                ...movieDataInput
            })
        })
        await sendRequest.json()
        setUserPresent(JSON.parse(localStorage.getItem('userData')))
        setRowDirty(false)
    }

    const handleDelete = async () => {
        const deleteMovie = await fetch(`http://localhost:9000/movie/delete?movieid=${movieData.movie_id}`, {
            method: "DELETE",
            headers: {
                'Authorization': token.token,
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors'
        })
        await deleteMovie.json()
        setUserPresent(JSON.parse(localStorage.getItem('userData')))
    }
    return (
        <>
            <tr>
                {Object.keys(movieDataInput).map(field => (
                    <td key={field}>
                        <input type={NEW_MOVIE_DATA.find(data => data.name === field).type} disabled={field === 'movie_id' || field === 'user_id'} name={field} value={movieDataInput[field] || ''} onChange={handleInputChange} />
                    </td>
                ))}
                {rowDirty && (
                    <>
                        <td><button onClick={handleUpdate}>Save</button></td>
                        <td><button onClick={() => {
                            setRowDirty(false)
                            setMovieDataInput({ ...filteredMovieData, release_date: new Date(filteredMovieData.release_date).toLocaleDateString().split('/').reverse().join('-') })
                        }}>Cancel</button></td>
                    </>
                )}
                <td><button onClick={() => {
                    handleDelete()
                }}>Delete</button></td>
            </tr>
        </>
    )
}

export default TableRow