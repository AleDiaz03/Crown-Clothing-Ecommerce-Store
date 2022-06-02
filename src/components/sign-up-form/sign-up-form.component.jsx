import {useState} from 'react'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    const handleChange = (event) => { 
        const {name, value} = event.target
        // Basically, we pass in the formfields object which is the state.
        // [name] is targetting the attribute that is to change. name comes from the event and it is the field that is updating
        // [name]:value is setting the targetted field e.g email to the value.
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => {}}>
                <label>Display Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email}/>
                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>
                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm