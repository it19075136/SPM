import React, { useState } from 'react'
import { Button, Checkbox, Divider, Form, Header, Icon, Modal, Segment } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import hashPassword from 'password-hash'
import jwt from 'jsonwebtoken'
import ImageUploading from 'react-images-uploading';

// constructor(props){
//   super(props);
//   this.state={
//      name :"" ,
//       email :"" ,
//       phoneNumber:"",
//       type:"buyerSeller"
//   }
// }
function UserProfile() {
    const item = localStorage.getItem("user");
    const decodeItem = jwt.decode(item);


    const [user, setUser] = useState({
        name: decodeItem.name,
        email: decodeItem.email,
        phoneNumber: decodeItem.phoneNumber,
        image: decodeItem.image ? decodeItem.image : []
    })
    const [repassword, setRepassword] = useState("");
    const [newPassword, setNewPassword] = useState({
        password: ""
    });
    const [currentPassword, setCurrentPassword] = useState("");
    const [iconState, setIconState] = useState({
        name: false,
        email: false,
        phoneNumber: false
    });
    const [imageList, setimageList] = useState([]);
    const [imagestate, setImagestate] = useState({
        imgModalOpen: false
    });
    // setUser(decodeItem);
    // const [repassword, setRepassword] = useState("");
    // const responseGoogle = (response) => {
    //     setUser({
    //         name: response.name,
    //         email: response.email,
    //         phoneNumber: response.phoneNumber,
    //         // type:"buyerSeller"
    //     })
    // }
    const formHandler = (e) => {
        // setUser({
        //   ...this.user,
        //   [e.target.name]:e.target.value
        // })
        setUser(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const submitHandler = (e) => {
        // console.log(user, "user");
        e.preventDefault();
        // const password = hashPassword.generate(user.password);
        console.log('in promise in addNewPAssword')
        axios.post(`http://localhost:5000/user/update/${decodeItem._id}`, user).then((res) => {
            console.log('in post');
            const { token } = res.data;
            if (token) {
                localStorage.setItem('user', token);
                const userResponds = jwt.decode(token);
                const userDetails = {
                    _id: userResponds._id,
                    name: userResponds.name,
                    email: userResponds.email,
                    type: userResponds.type,
                    phoneNumber: userResponds.phoneNumber,
                    wishList:userResponds.wishList,
                    image:userResponds.image,
                    password:userResponds.password
                }
                console.log(userDetails);
                
                // dispatch({type:'ADD_USER',payload:userDetails});
                // resolve(userDetails);
            }
        }).catch((err) => {
            // reject(err)
        })

    }
    const passwordHandler = (e) => {
        console.log(newPassword, "newPassword");
        console.log(currentPassword, "currentPassword");
        e.preventDefault();

        if (newPassword.password === repassword && hashPassword.verify(currentPassword, decodeItem.password)) {
            console.log('in promise in addNewPAssword')
            newPassword.password = hashPassword.generate(newPassword.password);
            axios.post(`http://localhost:5000/user/update/${decodeItem._id}`, newPassword).then((res) => {
                console.log('in post');
                const { token } = res.data;
                if (token) {
                    localStorage.setItem('user', token);
                    const userResponds = jwt.decode(token);
                    const userDetails = {
                        _id: userResponds._id,
                        name: userResponds.name,
                        email: userResponds.email,
                        type: userResponds.type,
                        phoneNumber: userResponds.phoneNumber,
                        password: userResponds.password
                    }
                    console.log(userDetails);
                    // dispatch({type:'ADD_USER',payload:userDetails});
                    // resolve(userDetails);
                }
            }).catch((err) => {
                // reject(err)
            })
        }
    }
    return (
        <div className="profile-main">
            <div>
                <Header as='h2' icon textAlign='center' style={{marginRight: '-300px', color: '#076AE0'}}>
                    <Icon name='user' circular />
                    <Header.Content>User Profile</Header.Content>
                </Header>
                <Form className='user-profile-form-centered'>
                    {user.image.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" className="img-content" />
                        </div>
                    ))}
                    <Modal
                        closeIcon
                        open={imagestate.imgModalOpen}
                        trigger={<Button color='blue' type='button'><Icon name='camera' />Profile Image</Button>}
                        onClose={() => setImagestate({ ...imagestate, imgModalOpen: false })}
                        onOpen={() => setImagestate({ ...imagestate, imgModalOpen: true })}
                    >
                        <Header icon='image' content='Update Images' />
                        <Modal.Content>

                            <ImageUploading
                                multiple
                                value={user.image}
                                onChange={(imageList, addUpdateIndex) => setUser({ ...user, image: imageList })}
                                maxNumber={2}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    <div className="upload__image-wrapper">
                                        <div className='uploader-area'>
                                            <Segment
                                                className='dnd-image-area'
                                                style={isDragging ? { backgroundColor: '#076AE0', color: 'white' } : { backgroundColor: '#ddd' }}
                                                textAlign='center'
                                                onClick={onImageUpload}
                                                {...dragProps}>
                                                Click or Drop Images here
                                            </Segment>
                                            &nbsp;
                                            <Button color='red' type='button' disabled={user.image.length < 1} onClick={onImageRemoveAll} ><Icon name='trash' />Remove  image</Button>
                                        </div>
                                        <div className="image-list">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <div className="image-item__btn-wrapper">
                                                        <Button color='grey' size='mini' type='button' icon='pencil' onClick={() => onImageUpdate(index)} />
                                                        <Button color='red' size='mini' type='button' icon='trash' onClick={() => onImageRemove(index)} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='green' onClick={() => setImagestate({ ...imagestate, imgModalOpen: false })}>
                                <Icon name='checkmark' /> Done
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    <br />
                    {/* <div >
                            <div>
                                 Change Photo
                                <Button color='orange' type='button'><Icon name='edit' />Images</Button>
                                 <input type="file" name="file"  />
                            </div>
                        </div> */}
                    <Form.Field>
                        <div>
                            <Icon name="user" />
                            <label>Name</label>
                        </div>
                        <div className='form-edit-field'>
                            <Icon
                                name={iconState.name ? 'save' : 'edit'}
                                // name={'edit'}
                                onClick={() => setIconState({ ...iconState, name: !iconState.name })}
                            />
                            <input placeholder='Name' name="name" onChange={formHandler} value={user.name}
                                // contentEditable={iconState.name ? true:false}  
                                disabled={iconState.name ? false : true}
                            />
                        </div>


                        {/* <div className='form-edit-field'>
                            <Icon
                                name={this.iconState.name ?  'save':'edit'}
                                // name={'edit'}
                                onClick={() => this.setIconState({ ...this.iconState, name: !this.iconState.name })}
                            />
                            <Form.Field required
                                width='16'
                                id='title'
                                name="title"
                                // control={Input}
                                label='Advertisement Title'
                                placeholder='Add an advertisement title'
                                editeble
                                disabled={this.state.titleState ? this.state.titleState : false}
                                // onChange={handleChange}
                            />
                        </div> */}
                        <div>
                            <Icon name="mail" />
                            <label>Email</label>
                        </div>
                        <div className='form-edit-field'>
                            <Icon
                                name={iconState.email ? 'save' : 'edit'}
                                // name={'edit'}
                                onClick={() => setIconState({ ...iconState, email: !iconState.email })}
                            />
                            <input placeholder='Email' name="email" onChange={formHandler} value={user.email}
                                disabled={iconState.email ? false : true}
                            />
                        </div>

                    </Form.Field>
                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>phoneNumber</label>
                        </div>
                        <div className='form-edit-field'>
                            <Icon
                                name={iconState.phoneNumber ? 'save' : 'edit'}
                                // name={'edit'}
                                onClick={() => setIconState({ ...iconState, phoneNumber: !iconState.phoneNumber })}
                            />
                            <input placeholder='phoneNumber' name="phoneNumber" onChange={formHandler} value={user.phoneNumber}
                                disabled={iconState.phoneNumber ? false : true}
                            />
                        </div>


                    </Form.Field>
                    {/* <Button type='submit' onClick={submitHandler}>Update Profile</Button><br /><br /> */}
                    <Form.Field
                        primary
                        id='submit'
                        name="formSubmit"
                        type='submit'
                        className='form-update-btn'
                        control={Button}
                        onClick={submitHandler}
                        content='Update Profile'
                    /><br /><br />
                </Form>
            </div>
            {/* <Divider vertical /> */}
            <div className="updateProfile">
                <Form className='user-profile-password-form-centered'>
                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>Current Password</label>
                        </div>
                        <input placeholder='Current Password' name="password" type="password" onChange={(e) => { setCurrentPassword(e.target.value) }} />
                    </Form.Field>
                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>New Password</label>
                        </div>
                        <input placeholder='New Password' name="password" type="password" onChange={(e) => { setNewPassword({ password: e.target.value }) }} />
                    </Form.Field>

                    <Form.Field>
                        <div>
                            <Icon name="key" />
                            <label>confirm Password</label>
                        </div>
                        <input placeholder='confirm Password' name="password" type="password" onChange={(e) => { setRepassword(e.target.value) }} />
                    </Form.Field>
                    {/* <Button type='submit' onClick={submitHandler}>Change Password</Button><br /><br /> */}
                    <Form.Field
                        primary
                        id='submit'
                        name="formSubmit"
                        type='submit'
                        className='form-update-btn'
                        control={Button}
                        onClick={passwordHandler}
                        content='Change Password'
                    /><br /><br />
                </Form>
            </div>
        </div>
    )
}

export default UserProfile





// const userResponds =jwt.decode(token);
// const userDetails ={
//     _id:userResponds._id,
//     name :userResponds.name,
//     email : userResponds.email,
//     gender : userResponds.gender,
//     type : userResponds.type,
//     phoneNumber :userResponds.phoneNumber
// }
// user.password = hashPassword.generate(user.password);
// const item=localStorage.getItem("user");
//         const decodeItem = jwt.decode(item);


// import React, { useState } from 'react'
// function UserProfile (props){
//     return (
// <div class="container emp-profile">
//             <form method="post">
//                 <div class="row">
//                     <div class="col-md-4">
//                         <div class="profile-img">
//                             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
//                             <div class="file btn btn-lg btn-primary">
//                                 Change Photo
//                                 <input type="file" name="file"/>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="col-md-6">
//                         <div class="profile-head">
//                                     <h5>
//                                         Kshiti Ghelani
//                                     </h5>
//                                     <h6>
//                                         Web Developer and Designer
//                                     </h6>
//                                     <p class="proile-rating">RANKINGS : <span>8/10</span></p>
//                             <ul class="nav nav-tabs" id="myTab" role="tablist">
//                                 <li class="nav-item">
//                                     <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
//                                 </li>
//                                 <li class="nav-item">
//                                     <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div class="col-md-2">
//                         <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
//                     </div>
//                 </div>
//                 <div class="row">
//                     <div class="col-md-4">
//                         <div class="profile-work">
//                             <p>WORK LINK</p>
//                             <a href="">Website Link</a><br/>
//                             <a href="">Bootsnipp Profile</a><br/>
//                             <a href="">Bootply Profile</a>
//                             <p>SKILLS</p>
//                             <a href="">Web Designer</a><br/>
//                             <a href="">Web Developer</a><br/>
//                             <a href="">WordPress</a><br/>
//                             <a href="">WooCommerce</a><br/>
//                             <a href="">PHP, .Net</a><br/>
//                         </div>
//                     </div>
//                     <div class="col-md-8">
//                         <div class="tab-content profile-tab" id="myTabContent">
//                             <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>User Id</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>Kshiti123</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Name</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>Kshiti Ghelani</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Email</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>kshitighelani@gmail.com</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Phone</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>123 456 7890</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Profession</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>Web Developer and Designer</p>
//                                             </div>
//                                         </div>
//                             </div>
//                             <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Experience</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>Expert</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Hourly Rate</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>10$/hr</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Total Projects</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>230</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>English Level</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>Expert</p>
//                                             </div>
//                                         </div>
//                                         <div class="row">
//                                             <div class="col-md-6">
//                                                 <label>Availability</label>
//                                             </div>
//                                             <div class="col-md-6">
//                                                 <p>6 months</p>
//                                             </div>
//                                         </div>
//                                 <div class="row">
//                                     <div class="col-md-12">
//                                         <label>Your Bio</label><br/>
//                                         <p>Your detail description</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>           
//         </div>
//         );
// }
// export default UserProfile