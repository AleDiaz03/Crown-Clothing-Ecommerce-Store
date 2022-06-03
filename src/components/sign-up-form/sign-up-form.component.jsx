import {useState} from 'react'
import { createAuthUserWithEmailAndPassword,
          createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        if (password != confirmPassword){
            alert("Passwords don't match")
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            const userDocRef = await createUserDocumentFromAuth(user,{displayName})
            resetFormFields()
        }catch (error){
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else if (error.code == 'auth/weak-password'){
                alert('Cannot create user, password is too weak')
            }else{
                console.log("error")
            }
        }
    }

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
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm