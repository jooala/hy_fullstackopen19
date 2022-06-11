import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        props.createAnecdote(content)
        props.showNotification(`you added anecdote: ${content}`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    showNotification
}

export default connect(null,
    mapDispatchToProps
)(AnecdoteForm)