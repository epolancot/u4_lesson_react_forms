import { useState } from 'react'
import axios from 'axios'

const Form = ({getIssues}) => {
    const initialState = {
        issueType: '',
        subject: '',
        message: ''
    }
    const [formState, setFormState] = useState(initialState)

    const handleChange = (e) => {
        setFormState({... formState, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/issues', formState)
        setFormState(initialState)
        getIssues()
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="issueType">Type of Issue:</label>
            <select id="issueType" onChange={handleChange} value={formState.issueType}>
                <option value="outage">Service Outage</option>
                <option value="billing">Billing</option>
                <option value="cancel">Cancel Service</option>
            </select>
            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" onChange={handleChange} value={formState.subject}/>
            <label htmlFor="message">Message</label>
            <textarea id="message" cols="30" rows="10" onChange={handleChange} value={formState.message}></textarea>
            <button type="submit">Send</button>
        </form>
    )
}

export default Form
