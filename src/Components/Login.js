import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import UserData from "./UserData";
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function () {
    const [login, setLogin] = useState(true);
    const [signup, setSignup] = useState(false);
    const [logged, setLogged] = useState(false);
    const [prevPass, setPrevPass] = useState("")

    var initialVal1 = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeat_password: ""
    }
    var initialVal2 = {
        username: "",
        email: "",
        password: ""
    }

    var valSchema1 = yup.object().shape({
        // first_name: yup.string().required('First name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        // last_name: yup.string().required('Last name is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        first_name: yup.string().required('First name is Required!'),
        last_name: yup.string().required('Last name is Required!'),
        email: yup.string().required('Email is Required'),
        password: yup.string().required('Password is Required'),
        repeat_password: yup.string().required('Password is Required').matches(prevPass, "both password shouild nbe same"),

    });
    var valSchema2 = yup.object().shape({
        // username: yup.string().required('Username is Required!').matches(/^([A-Z])([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/, "Invalid Name").min(3, "Invalid Name"),
        username: yup.string().required('Username is Required!'),
        email: yup.string().required('Email is Required'),
        password: yup.string().required('Password is Required'),
    });

    const handleChange1 = (e, setFieldValue) => {
        // console.log(e.target.value, 'value')
        if (e.target.name == "password") {
            setPrevPass(e.target.value)
            setFieldValue(e.target.name, e.target.value)
        }
        else {
            setFieldValue(e.target.name, e.target.value)
        }
    }

    const handleChange2 = (e, setFieldValue) => {
        // console.log(e.target.value, 'value for login')
        setFieldValue(e.target.name, e.target.value)
    }

    const handleSubmit1 = (values) => {
        // console.log(values, 'vals sign up')
        var userInfo = [];
        if (JSON.parse(localStorage.getItem('userInfo')) != null) {
            var data = JSON.parse(localStorage.getItem('userInfo'))
            // console.log("data h ", data)
            data.push(values)
            localStorage.setItem('userInfo', JSON.stringify(data))
        } else {
            userInfo.push(values)
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
        setLogged(true)
    }

    const handleSubmit2 = async (values) => {
        // console.log(values, 'vals login')
        if (JSON.parse(localStorage.getItem('userInfo')) != null) {
            var data = JSON.parse(localStorage.getItem('userInfo'))
            // console.log("data h ", data)
            data.forEach(element => {
                if (element.email == values.email && element.password == values.password) {
                    console.log("loggin successfully")
                    setLogged(true)
                } else {
                    alert('Incorrect email id or password')
                }
            });
        } else {
            alert('User is not exists, Please sign up')
        }
    }

    return (
        <>
            {logged ?
                <UserData /> :
                <Modal
                    isOpen={login}
                    modalTransition={{ timeout: 1000 }}
                    backdropTransition={{ timeout: 2000 }}
                    toggle={() => setLogin(!login)}
                >
                    <ModalHeader>
                        {signup ? "Create" : "Login"} Your Account
                        <Button className="navbar-btn heading" onClick={() => setSignup(!signup)} >
                            {signup ? "Login" : "Sign-up"}
                        </Button>
                    </ModalHeader>
                    {signup ?
                        <Formik initialValues={initialVal1} validationSchema={valSchema1} onSubmit={handleSubmit1} >
                            {
                                (props) =>
                                (<Form >
                                    <ModalBody>
                                        <div>
                                            <h6>First Name</h6>
                                            <Field onChange={(e) => handleChange1(e, props.setFieldValue)} type={'text'} name='first_name' className='navbar-input mb-3' placeholder="First name" />
                                            <ErrorMessage name="first_name">{msg => <div className='err'>{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div>
                                            <h6>Last Name</h6>
                                            <Field type={'text'} name='last_name' onChange={(e) => handleChange1(e, props.setFieldValue)} className='navbar-input mb-3' placeholder="Last name" />
                                            <ErrorMessage name="last_name">{msg => <div className='err'>{msg}</div>}</ErrorMessage>
                                        </div>


                                        <div>
                                            <h6>Email</h6>
                                            <Field type={'text'} name='email' onChange={(e) => handleChange1(e, props.setFieldValue)} className='navbar-input mb-3' placeholder="Email" /><br></br>
                                            <ErrorMessage name="email">{msg => <div className='err' >{msg}</div>}</ErrorMessage>
                                        </div>
                                        <div>
                                            <h6>Password</h6>
                                            <Field type={'text'} name='password' onChange={(e) => handleChange1(e, props.setFieldValue)} className='navbar-input mb-3' placeholder="Password" />
                                            <ErrorMessage name="password">{msg => <div className='err'>{msg}</div>}</ErrorMessage>
                                        </div>

                                        <div>
                                            <h6>Repeat Password</h6>
                                            <Field type={'text'} name='repeat_password' onChange={(e) => handleChange1(e, props.setFieldValue)} className='navbar-input mb-3' placeholder="Password" />
                                            <ErrorMessage name="repeat_password">{msg => <div className='err'>{msg}</div>}</ErrorMessage>
                                        </div>


                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className="navbar-btn heading" type="submit">Sign-up</Button>
                                        <Button type="button" color="secondary" className="navbar-btn heading" onClick={() => setLogin(false)}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Form>
                                )
                            }
                        </Formik> :
                        <>
                            <Formik initialValues={initialVal2} validationSchema={valSchema2} onSubmit={handleSubmit2} >
                                {
                                    (props) =>
                                    (<Form >
                                        <ModalBody>

                                            <div>
                                                <h6>User Name</h6>
                                                <Field type={'text'} onChange={(e) => handleChange2(e, props.setFieldValue)} name='username' className='navbar-input mb-3' placeholder="Username" />
                                                <ErrorMessage name="username">{msg => <div className='err'>{msg}</div>}</ErrorMessage>
                                            </div>

                                            <div>
                                                <h6>Email</h6>
                                                <Field type={'text'} onChange={(e) => handleChange2(e, props.setFieldValue)} name='email' className='navbar-input mb-3' placeholder="Email" /><br></br>
                                                <ErrorMessage name="email">{msg => <div className='err'>{msg}</div>}</ErrorMessage>
                                            </div>
                                            <div>
                                                <h6>Password</h6>
                                                <Field type={'text'} onChange={(e) => handleChange2(e, props.setFieldValue)} name='password' className='navbar-input mb-3' placeholder="Password" />
                                                <ErrorMessage name="password">{msg => <div className='err'>{msg}</div>}</ErrorMessage>
                                            </div>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button className="navbar-btn heading" type="submit">Login</Button>
                                            <Button color="secondary" type="button" className="navbar-btn heading" onClick={() => setLogin(false)}>
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Form>
                                    )
                                }
                            </Formik>
                        </>
                    }
                </Modal>
            }
        </>
    );
}