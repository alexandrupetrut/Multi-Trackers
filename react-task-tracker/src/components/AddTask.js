import {useState} from 'react'

const AddTask = ({onAdd}) => {

    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!description) {
            alert('Please enter a description') 
            return
        }

        onAdd ({description, date, reminder})

        setDescription('')
        setDate('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>

            <div className='form-control'>
                <label> Task </label>
                <input type='text' placeholder='Add Task' 
                    value={description} onChange = { (e) => setDescription (e.target.value)} />
            </div>
            <div className='form-control'>
                <label> Day & Time </label>
                <input type='text' placeholder='Add Day & Time' 
                    value={date} onChange = { (e) => setDate (e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label> Set Reminder </label>
                <input type='checkbox' checked={reminder}
                    value={reminder} onChange = { (e) => setReminder (e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        
        </form>
    )
}

export default AddTask